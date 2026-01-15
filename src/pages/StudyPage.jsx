import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    Upload,
    FileText,
    CheckCircle,
    AlertCircle,
    Clock,
    XCircle,
    ShieldCheck,
    FileCheck,
    Send,
    Landmark,
    Building,
    ChevronDown,
    ArrowRight,
    ArrowLeft,
    Scroll,
    Map,
    LogOut,
    User
} from 'lucide-react';
import { Toaster, toast } from 'sonner';
import { supabase } from '../lib/supabase';
import { generateRequiredDocuments } from '../lib/documentRules';
import { useAuth } from '../context/AuthContext';


// --- Constants & Config ---

const PROPERTY_TYPES = [
    { id: 'casa', label: 'Casa' },
    { id: 'departamento', label: 'Departamento' },
    { id: 'estacionamiento', label: 'Estacionamiento' },
    { id: 'bodega', label: 'Bodega' },
    { id: 'sitio_eriazo', label: 'Sitio Eriazo' },
    { id: 'parcela', label: 'Parcela' },
    { id: 'local_comercial', label: 'Local Comercial' },
];

const STUDY_PURPOSES = [
    { id: 'compraventa', label: 'Compraventa' },
    { id: 'utilidad', label: 'Utilidad del Inmueble' },
    { id: 'edificacion', label: 'Edificación' },
    { id: 'subdivision', label: 'Subdivisión' },
    { id: 'deslindes', label: 'Deslindes' },
];

const TRANSACTION_TITLES = [
    { id: 'compraventa', label: 'Compraventa' },
    { id: 'donacion', label: 'Donación' },
    { id: 'herencia', label: 'Herencia' },
    { id: 'permuta', label: 'Permuta' },
    { id: 'aporte_capital', label: 'Aporte de Capital a Empresa' },
];

const DOCTYPE_TABLE_MAP = {
    'dominio_vigente': 'ocr_dominio_vigente',
    'gp_30_anos': 'ocr_gp',
    'escritura_cv': 'ocr_escritura_cv',
    'deuda_contribuciones': 'ocr_deuda_contribuciones',
    'avaluo_fiscal': 'ocr_avaluo_fiscal',
    'recepcion_final': 'ocr_recepcion_final',
    'numero_municipal': 'ocr_certificado_numero',
    'no_expropiacion_muni': 'ocr_expropiacion_municipal',
    'no_expropiacion_serviu': 'ocr_no_expropiacion_serviu',
    'posesion_efectiva': 'ocr_posesion_efectiva',
    'cip': 'ocr_cip',
    'reglamento_copropiedad': 'ocr_reglamento_copropiedad',
    'plano_sag': 'ocr_rural_sag',
    'plano_copropiedad': 'ocr_plano_copropiedad',
    'asignacion_roles': 'ocr_asignacion_roles',
    'inscripcion_anterior': 'ocr_inscripcion_anterior',
    'impuesto_herencia': 'ocr_impuesto_herencia',
    'inscripcion_herencia': 'ocr_inscripcion_herencia',
    'constitucion_sociedad': 'ocr_constitucion_sociedad',
    'vigencia_poderes': 'ocr_poderes',
    'constitucion_servidumbre': 'ocr_inscripcion_servidumbre'
};

// --- Components ---

const StatusPanel = ({ currentStep, progress, total, stage3Requests = [] }) => {
    const percentage = currentStep === 1 ? 0 : Math.round((progress / total) * 100);

    // Check if there are active pending requests from admin
    const hasPendingS3 = stage3Requests.some(r => r.estado !== 'Completado');

    const steps = [
        { label: 'Configuración', status: currentStep === 1 ? 'current' : 'completed' },
        { label: 'Documentación', status: currentStep === 2 ? 'current' : (currentStep > 2 ? 'completed' : 'pending') },
        { label: hasPendingS3 ? 'Doc. Adicional' : 'Revisión', status: currentStep === 3 ? 'current' : (currentStep > 3 ? 'completed' : 'pending') },
        { label: 'Informe', status: 'pending' }
    ];

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                <div>
                    <h2 className="text-lg font-semibold text-slate-800">Estado del Estudio</h2>
                    <p className="text-slate-500 text-sm">
                        {currentStep === 1 ? 'Definiendo perfil de la propiedad' : 'Progreso de la carpeta legal'}
                    </p>
                </div>
                <div className="flex items-center gap-4 mt-4 md:mt-0 w-full md:w-auto">
                    <div className="flex-1 md:w-64 h-3 bg-slate-100 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-blue-600 transition-all duration-700 ease-out"
                            style={{ width: `${currentStep === 1 ? 25 : currentStep === 2 ? 25 + (percentage * 0.5) : 75 + (percentage * 0.25)}%` }}
                        />
                    </div>
                    <span className="font-bold text-blue-700">{currentStep === 1 ? '25%' : `${Math.round(25 + (percentage * 0.75))}%`}</span>
                </div>
            </div>

            <div className="flex justify-between items-center text-sm relative">
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -z-0"></div>
                {steps.map((step, idx) => {
                    const isActive = (idx + 1) === currentStep;
                    const isCompleted = (idx + 1) < currentStep;

                    return (
                        <div key={idx} className="relative z-10 flex flex-col items-center gap-2 bg-white px-2">
                            <div className={`w-3 h-3 rounded-full transition-all duration-300 ${isActive ? 'bg-blue-600 ring-4 ring-blue-50' :
                                isCompleted ? 'bg-green-500' : 'bg-slate-300'
                                }`} />
                            <span className={`text-xs sm:text-sm font-medium transition-colors ${isActive ? 'text-blue-700' :
                                isCompleted ? 'text-green-600' : 'text-slate-400'
                                }`}>
                                {step.label}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const SmartUploadCard = ({ doc, status, error, onUpload }) => {
    const [isHovering, setIsHovering] = useState(false);
    const fileInputRef = useRef(null);

    const handleDragOver = (e) => {
        e.preventDefault();
        if (status !== 'uploading' && status !== 'approved') setIsHovering(true);
    };

    const handleDragLeave = () => setIsHovering(false);

    const handleDrop = (e) => {
        e.preventDefault();
        setIsHovering(false);
        if (status === 'uploading' || status === 'approved') return;
        const file = e.dataTransfer.files?.[0];
        if (file) onUpload(doc.id, file);
    };

    const handleClick = () => {
        if (status !== 'uploading' && status !== 'approved') {
            fileInputRef.current?.click();
        }
    };

    const handleChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            onUpload(doc.id, e.target.files[0]);
        }
    };

    const isUploaded = status === 'uploaded';
    const isLoading = status === 'uploading';
    const isError = status === 'error';

    return (
        <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleClick}
            className={`
                group relative p-6 rounded-2xl border-2 transition-all duration-300
                ${isUploaded
                    ? 'bg-green-50/50 border-green-200 shadow-sm'
                    : isError
                        ? 'bg-red-50/50 border-red-200 shadow-sm'
                        : isHovering
                            ? 'bg-blue-50 border-blue-400 shadow-md scale-[1.01]'
                            : 'bg-white border-slate-100 hover:border-blue-200 hover:shadow-lg cursor-pointer border-dashed'
                }
            `}
        >
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleChange}
                className="hidden"
                accept=".pdf,.png,.jpg,.jpeg"
            />

            <div className="flex items-start gap-4">
                <div className={`
                    p-3 rounded-xl transition-colors
                    ${isUploaded ? 'bg-green-100 text-green-700' : isError ? 'bg-red-100 text-red-600' : 'bg-slate-100 text-slate-500 group-hover:bg-blue-50'}
                `}>
                    <doc.icon size={24} />
                </div>

                <div className="flex-1">
                    <div className="flex justify-between items-start">
                        <h3 className="font-bold text-slate-800 text-lg leading-tight">{doc.label}</h3>
                        <div className="flex items-center gap-2">
                            {isUploaded && <CheckCircle className="text-green-500" size={20} />}
                            {isError && <XCircle className="text-red-500" size={20} />}
                            {isLoading && <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>}
                            {!isUploaded && !isError && !isLoading && (
                                <div className={`p-2 rounded-full transition-colors ${isHovering ? 'bg-blue-600 text-white' : 'text-slate-300'}`}>
                                    <Upload size={18} />
                                </div>
                            )}
                        </div>
                    </div>

                    <p className="text-sm text-slate-500 mt-1 leading-relaxed">{doc.description}</p>

                    {doc.alert && !isUploaded && (
                        <div className="mt-3 text-[11px] font-bold px-2 py-1 bg-amber-50 text-amber-700 rounded border border-amber-100 inline-flex items-center gap-1.5 uppercase tracking-wide">
                            <AlertCircle size={12} />
                            {doc.alert}
                        </div>
                    )}

                    {isError && (
                        <div className="mt-3 text-sm text-red-600 bg-red-100/30 p-2 rounded-lg border border-red-100 flex items-start gap-2 animate-in fade-in slide-in-from-top-1">
                            <AlertCircle size={16} className="mt-0.5 shrink-0" />
                            <span className="font-medium">{error || 'Error al subir documento'}</span>
                        </div>
                    )}

                    <div className="mt-4 flex items-center gap-2 text-[10px] font-black tracking-widest uppercase transition-colors">
                        {isUploaded ? (
                            <span className="text-green-600">Documento Listo</span>
                        ) : (
                            <span className="text-slate-400 group-hover:text-blue-600">
                                Arrastra o selecciona archivo
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const Stage3UploadCard = ({ req, docState, onUpload, isSubmitting, onSubmit }) => {
    const [isHovering, setIsHovering] = useState(false);
    const fileInputRef = useRef(null);
    const isUploaded = docState?.status === 'uploaded';
    const key = `s3_${req.id}`;

    const handleDragOver = (e) => {
        e.preventDefault();
        if (!isUploaded) setIsHovering(true);
    };

    const handleDragLeave = () => setIsHovering(false);

    const handleDrop = (e) => {
        e.preventDefault();
        setIsHovering(false);
        if (isUploaded) return;
        const file = e.dataTransfer.files?.[0];
        if (file) onUpload(key, file);
    };

    const handleClick = () => {
        if (!isUploaded) fileInputRef.current?.click();
    };

    return (
        <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleClick}
            className={`
                group relative p-6 rounded-2xl border-2 transition-all duration-300
                ${isUploaded
                    ? 'bg-green-50/50 border-green-200 shadow-sm'
                    : isHovering
                        ? 'bg-blue-50 border-blue-400 shadow-md scale-[1.01]'
                        : 'bg-white border-slate-100 hover:border-blue-200 hover:shadow-lg cursor-pointer border-dashed'
                }
            `}
        >
            <input
                type="file"
                className="hidden"
                ref={fileInputRef}
                onChange={(e) => e.target.files?.[0] && onUpload(key, e.target.files[0])}
                accept=".pdf,.png,.jpg,.jpeg"
            />

            <div className="flex items-start gap-4">
                <div className={`
                    p-3 rounded-xl transition-colors
                    ${isUploaded ? 'bg-green-100 text-green-600' : 'bg-blue-50 text-blue-600 group-hover:bg-blue-100'}
                `}>
                    {['titulos', 'legal', 'escritura_cv', 'inscripcion_anterior', 'posesion_efectiva', 'hipoteca', 'gp'].includes(req.tipo_documento?.toLowerCase())
                        ? <Scroll size={24} />
                        : <FileCheck size={24} />
                    }
                </div>

                <div className="flex-1">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="font-bold text-slate-900 text-lg leading-tight">
                                {req.nombre_documento || req.tipo_documento}
                            </h3>

                            {(req.propiedad_fojas || req.propiedad_numero || req.propiedad_anio || req.propiedad_comuna) && (
                                <p className="text-xs font-bold text-blue-700 mt-1.5 uppercase tracking-wide bg-blue-50 inline-block px-2 py-0.5 rounded">
                                    {req.propiedad_fojas && `Fojas: ${req.propiedad_fojas} `}
                                    {req.propiedad_numero && `Nº: ${req.propiedad_numero} `}
                                    {req.propiedad_anio && `Año: ${req.propiedad_anio} `}
                                    {req.propiedad_comuna && ` | ${req.propiedad_comuna}`}
                                </p>
                            )}
                        </div>

                        {isUploaded ? (
                            <div className="bg-green-500 text-white p-1 rounded-full">
                                <CheckCircle size={20} />
                            </div>
                        ) : (
                            <div className={`p-2 rounded-full transition-colors ${isHovering ? 'bg-blue-600 text-white' : 'text-slate-300'}`}>
                                <Upload size={20} />
                            </div>
                        )}
                    </div>

                    {req.detalle && (
                        <p className="text-sm text-slate-500 mt-2 italic border-l-2 border-slate-200 pl-3">
                            {req.detalle}
                        </p>
                    )}

                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-50">
                        {(req.nombre_persona || req.rut_persona) ? (
                            <div className="flex items-center gap-2">
                                <div className="bg-slate-100 text-slate-500 p-1 rounded-md">
                                    <User size={14} />
                                </div>
                                <span className="text-xs font-semibold text-slate-600">
                                    {req.nombre_persona} {req.rut_persona ? `(RUT: ${req.rut_persona})` : ''}
                                </span>
                            </div>
                        ) : <div />}

                        {isUploaded ? (
                            <span className="text-[10px] font-black text-green-600 tracking-widest uppercase">Documento Listo</span>
                        ) : (
                            <span className="text-[10px] font-bold text-slate-400 group-hover:text-blue-600 transition-colors uppercase tracking-widest">
                                Arrastra o selecciona archivo
                            </span>
                        )}
                    </div>
                </div>
            </div>

        </div>
    );
};

// --- Main Study Page Component ---

export default function StudyPage() {
    const { user, signOut, profile } = useAuth();
    const navigate = useNavigate();
    const { operacionId } = useParams();

    // Dynamic docs state instead of static initialization
    const [requiredDocs, setRequiredDocs] = useState([]);
    const [docStates, setDocStates] = useState({});

    const [stage2Requests, setStage2Requests] = useState([]);
    const [stage3Requests, setStage3Requests] = useState([]);
    const [propertyName, setPropertyName] = useState('');
    const [propertyType, setPropertyType] = useState('');
    const [studyPurpose, setStudyPurpose] = useState('');
    const [hasServidumbre, setHasServidumbre] = useState(null);
    const [hasReglamento, setHasReglamento] = useState(null);
    const [transactionsCount, setTransactionsCount] = useState(1);
    const [transactionsDetails, setTransactionsDetails] = useState([{ id: 1, type: '' }]);
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDocsSaved, setIsDocsSaved] = useState(false);
    const [studyId, setStudyId] = useState(null);

    // Generate unique operation ID for new studies
    const [operationId] = useState(() => {
        if (operacionId && operacionId !== 'nuevo') {
            return operacionId;
        }
        return Math.floor(1000 + Math.random() * 9000).toString();
    });

    useEffect(() => {
        const fetchStages = async () => {
            // 1. Fetch Study Status to determine step
            const { data: studyData } = await supabase
                .from('estudios_titulos')
                .select('estado, nombre_propiedad, tipo_propiedad, finalidad_estudio, cantidad_transacciones')
                .eq('numero_operacion', operationId)
                .single();

            if (studyData) {
                setPropertyName(studyData.nombre_propiedad || '');
                setPropertyType(studyData.tipo_propiedad || '');
                setStudyPurpose(studyData.finalidad_estudio || '');
                setTransactionsCount(studyData.cantidad_transacciones || 1);

                // Logic: If explicitly in 'En Revisión' or 'Observaciones', go to Step 3
                if (['En Revisión', 'Observaciones'].includes(studyData.estado)) {
                    setCurrentStep(3);
                }
            }

            // 2. Fetch Phase 3 specific requests (solicitud_documentos)
            const { data: s3Data } = await supabase
                .from('solicitud_documentos')
                .select('*')
                .eq('operacion_id', operationId);

            if (s3Data && s3Data.length > 0) {
                setStage3Requests(s3Data);
                setDocStates(prev => {
                    const next = { ...prev };
                    s3Data.forEach(req => {
                        const key = `s3_${req.id}`;
                        if (!next[key]) {
                            next[key] = {
                                status: req.estado === 'Completado' ? 'uploaded' : 'pending',
                                error: null,
                                file: null,
                                stage: 3,
                                dbId: req.id,
                                label: req.nombre_documento,
                                dbType: req.tipo_documento,
                                personaNom: req.nombre_persona,
                                personaRut: req.rut_persona,
                                description: `Documento para ${req.nombre_persona}`,
                            };
                        }
                    });
                    return next;
                });

                // Force step 3 if we have dynamic requests, regardless of status (fallback)
                // This complies with user request: "if identified in solicitud_documentos pass to phase 3"
                setCurrentStep(3);
            }
        };
        fetchStages();

        // Realtime subscription for Phase 3 requests
        const phase3Channel = supabase
            .channel('phase3-requests')
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'solicitud_documentos',
                    filter: `operacion_id=eq.${operationId}`
                },
                (payload) => {
                    const newReq = payload.new;
                    setStage3Requests(prev => [...prev, newReq]);
                    setDocStates(prev => ({
                        ...prev,
                        [`s3_${newReq.id}`]: {
                            status: 'pending',
                            error: null,
                            file: null,
                            stage: 3,
                            dbId: newReq.id,
                            label: newReq.nombre_documento,
                            dbType: newReq.tipo_documento,
                            personaNom: newReq.nombre_persona,
                            personaRut: newReq.rut_persona,
                            description: `Documento para ${newReq.nombre_persona}`,
                        }
                    }));
                    toast.info(`Nueva solicitud documento: ${newReq.nombre_documento} para ${newReq.nombre_persona}`, { duration: 5000 });

                    // Auto-advance to Step 3 if a new request comes in
                    setCurrentStep(prev => prev < 3 ? 3 : prev);
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(phase3Channel);
        };
    }, [operationId]);

    const totalDocs = requiredDocs.length + stage2Requests.length + stage3Requests.length;
    const completedCount = Object.values(docStates).filter(s => s.status === 'uploaded').length;

    const handleUpload = (docId, file) => {
        setDocStates(prev => ({
            ...prev,
            [docId]: { ...prev[docId], status: 'uploaded', error: null, file: file }
        }));
        setIsDocsSaved(false);
        toast.success(`Documento "${file.name}" preparado`);
    };

    // Save Phase 1 form data to estudios_titulos table
    const saveFormData = async () => {
        const toastId = toast.loading('Guardando configuración...');
        try {
            const formData = {
                numero_operacion: operationId,
                user_id: user.id,
                nombre_propiedad: propertyName,
                tipo_propiedad: propertyType,
                finalidad_estudio: studyPurpose,
                tiene_servidumbre: hasServidumbre,
                tiene_reglamento: hasReglamento,
                cantidad_transacciones: transactionsCount,
                detalle_transacciones: [], // No longer asking for details in this phase
                estado: 'En Documentación'
            };

            // 1. Generate Smart Document List
            const generatedDocs = generateRequiredDocuments({
                propertyType,
                hasReglamento,
                hasServidumbre,
                inscriptionsCount: transactionsCount
            });

            setRequiredDocs(generatedDocs);

            // Re-initialize status map for new docs (Fresh start for this step)
            setDocStates(prev => {
                const next = {};
                generatedDocs.forEach(doc => {
                    if (prev[doc.id]) {
                        next[doc.id] = prev[doc.id];
                    } else {
                        next[doc.id] = { status: 'pending', error: null, file: null, stage: 1 };
                    }
                });
                return next;
            });

            // 2. Save to Supabase
            console.log('Upserting formData:', formData);
            const { data, error } = await supabase
                .from('estudios_titulos')
                .upsert(formData, { onConflict: 'numero_operacion' })
                .select();

            if (error) {
                console.error('Supabase upsert error:', error);
                throw error;
            }

            if (!data || data.length === 0) {
                console.warn('Upsert returned no data');
                throw new Error('No se recibió confirmación de la base de datos');
            }

            console.log('Upsert success, received data:', data[0]);
            setStudyId(data[0].id);
            toast.success('Configuración guardada', { id: toastId });
            return true;
        } catch (error) {
            console.error('Error in saveFormData:', error);
            const errorMsg = error.message || (typeof error === 'string' ? error : 'Error desconocido');
            toast.error(`Error al guardar: ${errorMsg}`, { id: toastId });
            return false;
        }
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        const toastId = toast.loading('Guardando documentos...');
        try {
            const updates = [];
            for (const [key, state] of Object.entries(docStates)) {
                if (state.status !== 'uploaded' || !state.file) continue;
                const file = state.file;
                const extension = file.name.split('.').pop();

                // Use consistent naming strategy
                let fileName = `${operationId}_${key}.${extension}`;

                // If it's stage 3, we use a cleaner name based on the request label if available
                if (state.stage === 3 && state.label) {
                    const cleanLabel = state.label.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, '');
                    fileName = `${cleanLabel}_${operationId}.${extension}`;
                } else if (key === 'compraventa') {
                    fileName = `${operationId}_compraventa.${extension}`;
                }

                fileName = `${operationId}/${fileName}`;
                const filePath = fileName;

                const { error: storageError } = await supabase.storage
                    .from('legal_documents')
                    .upload(filePath, file, { upsert: true });

                if (storageError) throw storageError;

                const { data: { publicUrl } } = supabase.storage
                    .from('legal_documents')
                    .getPublicUrl(filePath);

                // --- NEW LOGIC: Insert into specific OCR table ---
                // Handle dynamic keys or get from solicitud_documentos type
                let mapKey = key;
                if (key.startsWith('inscripcion_anterior_')) {
                    mapKey = 'inscripcion_anterior';
                } else if (state.stage === 3 && state.dbType) {
                    mapKey = state.dbType;
                }

                const targetTable = DOCTYPE_TABLE_MAP[mapKey];
                if (targetTable) {
                    console.log(`Inserting into ${targetTable} for doc ${key}`);
                    try {
                        const { error: insertError } = await supabase
                            .from(targetTable)
                            .insert({
                                estudio_id: studyId,
                                operacion_id: operationId,
                                user_id: user.id,
                                documento_url: publicUrl,
                                nombre_archivo: file.name,
                                estado: 'Pendiente'
                            });

                        if (insertError) {
                            console.error(`Error inserting into ${targetTable}:`, insertError);
                            // We don't block the whole flow, but we log it.
                            toast.error(`Error al registrar en tabla OCR: ${insertError.message}`);
                        } else {
                            console.log(`Successfully reserved row in ${targetTable}`);
                        }
                    } catch (err) {
                        console.error(`Exception inserting into ${targetTable}:`, err);
                    }
                }

                // Also update solicitud_documentos if it exists (for Stage 3 tracking)
                if (state.stage === 3) {
                    updates.push(supabase.from('solicitud_documentos').update({ estado: 'Completado', documento_url: publicUrl, subido: true }).eq('id', state.dbId));
                }
            }

            await Promise.all(updates);

            if (currentStep === 2 || currentStep === 3) {
                setIsDocsSaved(true);
                toast.success('Documentos guardados correctamente. Ahora puedes enviar a revisión.', { id: toastId });
            } else {
                toast.success('Documento confirmado y enviado para análisis.', { id: toastId });
            }

        } catch (error) {
            console.error("Submit error:", error);
            toast.error("Error al guardar documentos", { id: toastId });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSendToReview = async () => {
        const toastId = toast.loading('Enviando a revisión...');
        try {
            // 1. Fetch all documents via RPC
            const { data: documents, error } = await supabase
                .rpc('get_operation_documents', { p_numero_operacion: operationId });

            if (error) {
                console.error("RPC Error:", error);
                throw new Error("Error al obtener los documentos guardados.");
            }

            // 2. Prepare webhook payload
            const payload = {
                numero_operacion: operationId,
                user_id: user?.id,
                estudio_id: studyId,
                documents: documents || [],
                metadata: {
                    nombre_propiedad: propertyName,
                    tipo_propiedad: propertyType
                },
                timestamp: new Date().toISOString()
            };

            // 3. Send to Webhook via Supabase Edge Function (Proxy) to avoid CORS
            const { data: result, error: invokeError } = await supabase.functions.invoke('send-to-revision', {
                body: payload
            });

            if (invokeError || !result?.success) {
                console.error("Invoke/Railway Error:", invokeError || result);
                throw new Error(result?.data || result?.error || "Error al llamar a la función de envío.");
            }

            console.log("Send to review successful:", result);

            // 4. Update study status in database
            await supabase
                .from('estudios_titulos')
                .update({ estado: 'En Revisión' })
                .eq('numero_operacion', operationId);

            setCurrentStep(3);
            toast.success('Estudio enviado a revisión correctamente', { id: toastId });

        } catch (error) {
            console.error("Error sending to review:", error);
            toast.error(`Error al enviar a revisión: ${error.message}`, { id: toastId });
        }
    };

    // Trigger n8n webhook for document analysis
    const triggerN8nAnalysis = async (uploadedUrls) => {
        try {
            const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL;
            if (!webhookUrl) {
                console.warn('N8N webhook URL not configured - skipping analysis trigger');
                return;
            }

            await fetch(webhookUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    event: 'phase2_complete',
                    estudio_id: studyId,
                    numero_operacion: operationId,
                    uploaded_documents: Object.entries(uploadedUrls).map(([id, url]) => ({
                        doc_id: id,
                        url: url
                    })),
                    metadata: {
                        nombre_propiedad: propertyName,
                        property_type: propertyType,
                        inscriptions_count: transactionsCount,
                        has_servidumbre: hasServidumbre,
                        has_reglamento: hasReglamento
                    }
                })
            });
            console.log('n8n webhook triggered successfully');
        } catch (error) {
            console.error('Error triggering n8n webhook:', error);
        }
    };

    const handleSignOut = async () => {
        await signOut();
        navigate('/login');
    };


    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
            <Toaster position="top-right" richColors />

            <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
                <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-900 text-white p-1.5 rounded-lg">
                            <ShieldCheck size={20} />
                        </div>
                        <h1 className="font-bold text-slate-900 text-xl tracking-tight">LegalTrust <span className="text-slate-400 font-normal">| Estudio de Títulos</span></h1>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                        <span className="hidden md:inline text-slate-500">Operación #{operationId}</span>
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="text-slate-500 hover:text-slate-700 font-medium"
                        >
                            Dashboard
                        </button>
                        <button
                            onClick={handleSignOut}
                            className="flex items-center gap-1 text-slate-500 hover:text-red-600 transition-colors"
                        >
                            <LogOut size={16} />
                        </button>
                        <div className="h-8 w-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold text-xs ring-2 ring-white shadow-sm">
                            {profile?.nombre?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || 'U'}
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-3xl mx-auto px-6 py-8">
                <div className="mb-8 flex justify-between items-end">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 mb-2">
                            {operacionId === 'nuevo' ? 'Nuevo Estudio de Títulos' : `Estudio #${operationId}`}
                        </h1>
                        <p className="text-slate-500">
                            {currentStep === 1 ? 'Paso 1: Configuración de la propiedad' :
                                currentStep === 2 ? 'Paso 2: Carga de documentos' :
                                    stage3Requests.some(r => r.estado !== 'Completado') ? 'Paso 3: Carga de antecedentes adicionales' : 'Paso 3: Revisión del estudio'}
                        </p>
                    </div>
                    {currentStep === 2 && (
                        <button
                            onClick={() => {
                                setCurrentStep(1);
                            }}
                            className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center gap-1 mb-1 transition-colors"
                        >
                            <ArrowLeft size={16} /> Volver a configuración
                        </button>
                    )}
                </div>

                <StatusPanel
                    currentStep={currentStep}
                    progress={completedCount}
                    total={totalDocs}
                    stage3Requests={stage3Requests}
                />

                {currentStep === 1 ? (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                        {/* Paso 1: Configuración */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-8">
                            <label className="block text-sm font-medium text-slate-700 mb-2">Nombre de la Propiedad</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                placeholder="Ej: Departamento Vitacura, Casa Los Trapenses..."
                                value={propertyName}
                                onChange={(e) => setPropertyName(e.target.value)}
                            />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Tipo de Propiedad</label>
                                    <div className="relative">
                                        <select
                                            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg appearance-none bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                                            value={propertyType}
                                            onChange={(e) => setPropertyType(e.target.value)}
                                        >
                                            <option value="">Seleccionar...</option>
                                            {PROPERTY_TYPES.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
                                        </select>
                                        <Building className="absolute left-3 top-2.5 text-slate-400" size={18} />
                                        <ChevronDown className="absolute right-3 top-2.5 text-slate-400 pointer-events-none" size={18} />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Finalidad del Estudio</label>
                                    <div className="relative">
                                        <select
                                            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg appearance-none bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                                            value={studyPurpose}
                                            onChange={(e) => setStudyPurpose(e.target.value)}
                                        >
                                            <option value="">Seleccionar...</option>
                                            {STUDY_PURPOSES.map(p => <option key={p.id} value={p.id}>{p.label}</option>)}
                                        </select>
                                        <Map className="absolute left-3 top-2.5 text-slate-400" size={18} />
                                        <ChevronDown className="absolute right-3 top-2.5 text-slate-400 pointer-events-none" size={18} />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 border-t border-slate-100 pt-6">
                                <label className="block text-sm font-semibold text-slate-800 mb-4 tracking-tight">
                                    Sobre la Historia de la Propiedad (Inscripciones)
                                </label>

                                <div className="bg-blue-50/50 border border-blue-100 p-4 rounded-xl mb-6">
                                    <div className="flex items-start gap-3">
                                        <div className="bg-blue-100 text-blue-600 p-2 rounded-lg"><Clock size={18} /></div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-blue-900 mb-1">Periodo de Análisis: 10 Años</p>
                                            <p className="text-xs text-blue-700 leading-relaxed">
                                                Para este estudio analizaremos las inscripciones de dominio y gravámenes ocurridas en la última década.
                                                Esto determinará la base de los antecedentes que solicitaremos a continuación.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-3">
                                            ¿Cuántas inscripciones ha tenido la propiedad en los últimos 10 años? (Aproximado)
                                        </label>
                                        <div className="flex flex-wrap gap-3">
                                            {[1, 2, 3, 4, 5, '6 o más'].map((num) => (
                                                <button
                                                    key={num}
                                                    onClick={() => setTransactionsCount(num)}
                                                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-all duration-200 ${transactionsCount === num
                                                        ? 'bg-blue-600 text-white shadow-md shadow-blue-200 border-blue-600'
                                                        : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-300 hover:text-blue-600'
                                                        }`}
                                                >
                                                    {num} {num === 1 ? 'Inscripción' : 'Inscripciones'}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={async () => {
                                    if (!propertyName || !propertyType || !studyPurpose) {
                                        toast.error('Por favor completa todos los campos requeridos');
                                        return;
                                    }
                                    const success = await saveFormData();
                                    if (success) setCurrentStep(2);
                                }}
                                className="w-full mt-10 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold text-lg shadow-xl shadow-blue-200 flex items-center justify-center gap-2 transition-all transform active:scale-95 group"
                            >
                                Continuar a Documentación
                                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                ) : currentStep === 2 ? (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                        {/* Paso 2: Documentación */}
                        <div className="bg-amber-50 border border-amber-100 p-4 rounded-xl mb-6 flex items-start gap-3">
                            <AlertCircle className="text-amber-500 mt-0.5 shrink-0" size={18} />
                            <p className="text-sm text-amber-800 leading-relaxed">
                                <strong>Momento 1: Inscripciones y Gravámenes Base.</strong> Sube el Dominio Vigente y el GP para que nuestro sistema pueda identificar los títulos y escrituras requeridas en el siguiente paso.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-6 mb-12">
                            {requiredDocs.map(doc => (
                                <SmartUploadCard
                                    key={doc.id}
                                    doc={doc}
                                    status={docStates[doc.id]?.status || 'pending'}
                                    error={docStates[doc.id]?.error}
                                    onUpload={handleUpload}
                                />
                            ))}
                        </div>

                        {/* Footer de Acciones en Fase 2 */}
                        <div className="sticky bottom-4 left-0 right-0 bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-slate-200 shadow-2xl flex justify-between items-center z-50 mt-12">
                            <button
                                onClick={handleSubmit}
                                disabled={isSubmitting || Object.values(docStates).filter(s => s.status === 'uploaded').length === 0}
                                className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold transition-all ${isDocsSaved
                                    ? 'bg-orange-500 text-white hover:bg-orange-600 shadow-orange-100'
                                    : 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-100'
                                    } disabled:opacity-50 shadow-lg`}
                            >
                                {isSubmitting ? (
                                    <div className="flex items-center gap-2">
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Guardando...
                                    </div>
                                ) : isDocsSaved ? (
                                    <>Enviar a Revisión <Send size={18} /></>
                                ) : (
                                    <>Guardar Documentos <FileCheck size={18} /></>
                                )}
                            </button>

                            {isDocsSaved && (
                                <button
                                    onClick={handleSendToReview}
                                    className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all animate-bounce-subtle"
                                >
                                    Listo, Enviar para Análisis
                                </button>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-500 text-center py-12">
                        {/* Paso 3: Análisis y Revisión */}
                        <div className="bg-white p-10 rounded-3xl shadow-xl border border-slate-100 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-2 bg-blue-600"></div>
                            {stage3Requests.some(r => r.estado !== 'Completado') ? (
                                <>
                                    <div className="inline-flex items-center justify-center p-4 bg-orange-50 text-orange-600 rounded-2xl mb-8">
                                        <FileText size={48} className="animate-pulse" />
                                    </div>
                                    <h2 className="text-3xl font-bold text-slate-900 mb-4">Acción Requerida: Antecedentes Adicionales</h2>
                                    <p className="text-slate-500 text-lg leading-relaxed mb-8">
                                        El analista ha revisado tu carpeta y necesita que adjuntes los siguientes documentos para continuar con el estudio de títulos.
                                    </p>
                                </>
                            ) : (
                                <>
                                    <div className="inline-flex items-center justify-center p-4 bg-blue-50 text-blue-600 rounded-2xl mb-8">
                                        <ShieldCheck size={48} className="animate-pulse" />
                                    </div>
                                    <h2 className="text-3xl font-bold text-slate-900 mb-4">Estudio en Revisión</h2>
                                    <p className="text-slate-500 text-lg leading-relaxed mb-8">
                                        Tus documentos han sido enviados exitosamente. Actualmente nuestro sistema está procesando la información y solicitando antecedentes adicionales si es necesario.
                                    </p>
                                </>
                            )}

                            <div className="w-full space-y-4">
                                {/* Estado Base */}
                                <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl text-left border border-slate-100">
                                    <div className="bg-green-100 text-green-600 p-1.5 rounded-full"><CheckCircle size={14} /></div>
                                    <span className="text-sm font-medium text-slate-700">Documentos base recibidos</span>
                                </div>


                                {/* Solicitudes Dinámicas del Backend */}
                                {stage3Requests.length > 0 && (
                                    <div className="mt-8 pt-6 border-t border-slate-100 w-full text-left space-y-8">

                                        {/* SECCIÓN 2: Títulos y Gravámenes */}
                                        {(() => {
                                            const propertyDocs = stage3Requests.filter(req =>
                                                ['titulos', 'legal', 'escritura_cv', 'inscripcion_anterior', 'posesion_efectiva', 'hipoteca', 'gp'].includes(req.tipo_documento?.toLowerCase()) ||
                                                req.origen_solicitud === 'propiedad'
                                            );
                                            if (propertyDocs.length === 0) return null;
                                            return (
                                                <div className="animate-in fade-in slide-in-from-bottom-2">
                                                    <h3 className="text-sm font-bold text-blue-800 uppercase mb-4 tracking-wider flex items-center gap-2">
                                                        <Scroll size={16} />
                                                        MOMENTO 2: Títulos y Gravámenes Extraídos
                                                    </h3>
                                                    <div className="space-y-3">
                                                        {propertyDocs.map(req => (
                                                            <Stage3UploadCard
                                                                key={`s3_${req.id}`}
                                                                req={req}
                                                                docState={docStates[`s3_${req.id}`]}
                                                                onUpload={handleUpload}
                                                                isSubmitting={isSubmitting}
                                                                onSubmit={handleSubmit}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                            );
                                        })()}

                                        {/* SECCIÓN 3: Antecedentes Personales y Otros */}
                                        {(() => {
                                            const personalDocs = stage3Requests.filter(req =>
                                                !['titulos', 'legal', 'escritura_cv', 'inscripcion_anterior', 'posesion_efectiva', 'hipoteca', 'gp'].includes(req.tipo_documento?.toLowerCase()) &&
                                                req.origen_solicitud !== 'propiedad'
                                            );
                                            if (personalDocs.length === 0) return null;
                                            return (
                                                <div className="animate-in fade-in slide-in-from-bottom-2">
                                                    <h3 className="text-sm font-bold text-amber-700 uppercase mb-4 tracking-wider flex items-center gap-2">
                                                        <FileCheck size={16} />
                                                        MOMENTO 3: Documentación Personal y Otros
                                                    </h3>
                                                    <div className="space-y-3">
                                                        {personalDocs.map(req => (
                                                            <Stage3UploadCard
                                                                key={`s3_${req.id}`}
                                                                req={req}
                                                                docState={docStates[`s3_${req.id}`]}
                                                                onUpload={handleUpload}
                                                                isSubmitting={isSubmitting}
                                                                onSubmit={handleSubmit}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                            );
                                        })()}

                                    </div>
                                )}

                                {stage3Requests.length > 0 && stage3Requests.some(r => r.estado !== 'Completado') && (
                                    <div className="sticky bottom-4 left-0 right-0 bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-slate-200 shadow-2xl flex justify-between items-center z-50 mt-12 gap-4">
                                        <button
                                            onClick={handleSubmit}
                                            disabled={isSubmitting || isDocsSaved || !Object.entries(docStates).some(([k, s]) => k.startsWith('s3_') && s.status === 'uploaded' && s.file)}
                                            className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold transition-all ${isDocsSaved
                                                ? 'bg-green-50 text-green-700 border border-green-200'
                                                : 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-100'
                                                } disabled:opacity-50 shadow-lg transition-all`}
                                        >
                                            {isSubmitting ? (
                                                <div className="flex items-center gap-2">
                                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                    Guardando...
                                                </div>
                                            ) : isDocsSaved ? (
                                                <>Documentos Guardados <CheckCircle size={18} /></>
                                            ) : (
                                                <>Guardar Antecedentes <FileCheck size={18} /></>
                                            )}
                                        </button>

                                        {isDocsSaved && (
                                            <button
                                                onClick={handleSendToReview}
                                                className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all animate-bounce-subtle flex items-center gap-2"
                                            >
                                                Enviar a Revisión <Send size={18} />
                                            </button>
                                        )}
                                    </div>
                                )}

                                <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl text-left border border-slate-100 opacity-50">
                                    <div className="bg-slate-200 text-slate-400 p-1.5 rounded-full"><Clock size={14} /></div>
                                    <span className="text-sm font-medium text-slate-500">Generación de informe final</span>
                                </div>
                            </div>
                            <button
                                onClick={() => navigate('/dashboard')}
                                className="mt-12 text-blue-600 font-bold hover:text-blue-800 transition-colors flex items-center gap-2"
                            >
                                <ArrowLeft size={18} /> Volver al Dashboard
                            </button>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

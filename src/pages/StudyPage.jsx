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



// --- Components ---

const StatusPanel = ({ currentStep, progress, total, stage3Requests = [], stage4Requests = [] }) => {
    const percentage = currentStep === 1 ? 0 : Math.round((progress / total) * 100);

    // Check if there are active pending requests from admin
    const hasPendingS3 = stage3Requests.some(r => r.estado !== 'Completado');
    const hasPendingS4 = stage4Requests.some(r => r.estado !== 'Completado');

    const steps = [
        { label: 'Configuración', status: currentStep === 1 ? 'current' : 'completed' },
        { label: 'Documentación', status: currentStep === 2 ? 'current' : (currentStep > 2 ? 'completed' : 'pending') },
        { label: hasPendingS3 ? 'Títulos' : 'Análisis', status: currentStep === 3 ? 'current' : (currentStep > 3 ? 'completed' : 'pending') },
        { label: hasPendingS4 ? 'Identidad' : 'Final', status: currentStep === 4 ? 'current' : (currentStep > 4 ? 'completed' : 'pending') },
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
                            style={{ width: `${currentStep === 1 ? 20 : currentStep === 2 ? 20 + (percentage * 0.2) : currentStep === 3 ? 40 + (percentage * 0.2) : currentStep === 4 ? 60 + (percentage * 0.2) : 80 + (percentage * 0.2)}%` }}
                        />
                    </div>
                    <span className="font-bold text-blue-700">{currentStep === 1 ? '20%' : `${Math.round(20 * currentStep + (percentage * 0.2))}%`}</span>
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

const SmartUploadCard = ({ doc, status, error, onUpload, onSkip }) => {
    const [isHovering, setIsHovering] = useState(false);
    const [markedLocally, setMarkedLocally] = useState(false);
    const fileInputRef = useRef(null);

    const isUploaded = status === 'uploaded';
    const isSkipped = status === 'skipped' || markedLocally;
    const isLoading = status === 'uploading';
    const isError = status === 'error';

    const handleDragOver = (e) => {
        e.preventDefault();
        if (!isUploaded && !isSkipped) setIsHovering(true);
    };

    const handleDragLeave = () => setIsHovering(false);

    const handleDrop = (e) => {
        e.preventDefault();
        setIsHovering(false);
        if (isUploaded || isSkipped) return;
        const file = e.dataTransfer.files?.[0];
        if (file) onUpload(doc.id, file);
    };

    const handleClick = (e) => {
        if (e.target.closest('button')) return;
        if (!isUploaded && !isSkipped) fileInputRef.current?.click();
    };

    return (
        <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleClick}
            className={`group relative p-6 rounded-2xl border-2 transition-all duration-300 ${isUploaded ? 'bg-green-50/50 border-green-200' :
                isSkipped ? 'bg-slate-50 border-slate-200 opacity-50 grayscale' :
                    isHovering ? 'bg-blue-50 border-blue-400 scale-[1.01]' :
                        'bg-white border-slate-100 hover:border-blue-200 cursor-pointer border-dashed'
                }`}
        >
            <input
                type="file"
                className="hidden"
                ref={fileInputRef}
                onChange={(e) => e.target.files?.[0] && onUpload(doc.id, e.target.files[0])}
                accept=".pdf,.png,.jpg,.jpeg"
            />

            <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                    <div className={`p-3 rounded-xl ${isUploaded ? 'bg-green-100 text-green-600' : isSkipped ? 'bg-slate-200 text-slate-400' : 'bg-blue-50 text-blue-600'}`}>
                        {isSkipped ? <XCircle size={24} /> : (doc.icon ? <doc.icon size={24} /> : <FileCheck size={24} />)}
                    </div>
                    <div>
                        <h3 className={`font-bold text-lg leading-tight ${isSkipped ? 'text-slate-400 line-through' : 'text-slate-900'}`}>{doc.label}</h3>
                        <p className={`text-sm mt-1 ${isSkipped ? 'text-slate-300' : 'text-slate-500'}`}>{doc.description}</p>
                    </div>
                </div>
                {isUploaded && <CheckCircle className="text-green-500" size={24} />}
                {isLoading && <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>}
            </div>

            <div className="mt-6 flex items-center justify-between">
                <span className="text-[10px] font-black tracking-widest uppercase text-slate-400">
                    {isUploaded ? 'Documento Listo' : isSkipped ? 'Excluido' : 'Pendiente'}
                </span>

                <div className="flex gap-2">
                    {!isUploaded && !isSkipped && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setMarkedLocally(true);
                                onSkip(doc.id, doc.dbId);
                            }}
                            className="bg-red-50 text-red-600 border border-red-200 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all shadow-sm active:scale-95"
                        >
                            No es útil
                        </button>
                    )}
                    {isSkipped && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setMarkedLocally(false);
                                onUpload(doc.id, null);
                            }}
                            className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest shadow-md active:scale-95"
                        >
                            Habilitar
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

const Stage3UploadCard = ({ docId, req, docState, onUpload, onSkip, isSubmitting }) => {
    const [isHovering, setIsHovering] = useState(false);
    const [markedLocally, setMarkedLocally] = useState(false);
    const fileInputRef = useRef(null);

    const isUploaded = docState?.status === 'uploaded';
    const isSkipped = docState?.status === 'skipped' || markedLocally;
    const key = docId;

    const handleDragOver = (e) => {
        e.preventDefault();
        if (!isUploaded && !isSkipped) setIsHovering(true);
    };

    const handleDragLeave = () => setIsHovering(false);

    const handleDrop = (e) => {
        e.preventDefault();
        setIsHovering(false);
        if (isUploaded || isSkipped) return;
        const file = e.dataTransfer.files?.[0];
        if (file) onUpload(key, file);
    };

    const handleClick = (e) => {
        if (e.target.closest('button')) return;
        if (!isUploaded && !isSkipped) fileInputRef.current?.click();
    };

    return (
        <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleClick}
            className={`group relative p-6 rounded-2xl border-2 transition-all duration-300 ${isUploaded ? 'bg-green-50/50 border-green-200 shadow-sm' :
                isSkipped ? 'bg-slate-50 border-slate-200 opacity-50 grayscale' :
                    isHovering ? 'bg-blue-50 border-blue-400 shadow-md scale-[1.01]' :
                        'bg-white border-slate-100 hover:border-blue-200 hover:shadow-lg cursor-pointer border-dashed'
                }`}
        >
            <input
                type="file"
                className="hidden"
                ref={fileInputRef}
                onChange={(e) => e.target.files?.[0] && onUpload(key, e.target.files[0])}
                accept=".pdf,.png,.jpg,.jpeg"
            />

            <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl ${isUploaded ? 'bg-green-100 text-green-600' : isSkipped ? 'bg-slate-200 text-slate-400' : 'bg-blue-50 text-blue-600 group-hover:bg-blue-100'}`}>
                    {isSkipped ? <XCircle size={24} /> : <Scroll size={24} />}
                </div>

                <div className="flex-1">
                    <div className="flex justify-between items-start">
                        <div className="flex-1">
                            <h3 className={`font-bold text-lg leading-tight transition-all ${isSkipped ? 'text-slate-400 line-through' : 'text-slate-900'}`}>
                                {req.nombre_documento || req.tipo_documento}
                            </h3>
                            {/* Identificadores del documento */}
                            {(req.propiedad_fojas || req.propiedad_numero || req.propiedad_anio || req.doc_repertorio || req.doc_resolucion || req.doc_rol || req.doc_plano) && (
                                <div className={`mt-1 flex flex-wrap gap-x-3 gap-y-1 text-[11px] font-medium ${isSkipped ? 'text-slate-300' : 'text-blue-600'}`}>
                                    {req.propiedad_fojas && <span>Fjs: {req.propiedad_fojas}</span>}
                                    {req.propiedad_numero && <span>N°: {req.propiedad_numero}</span>}
                                    {req.propiedad_anio && <span>Año: {req.propiedad_anio}</span>}
                                    {req.propiedad_comuna && <span className="text-slate-500">• {req.propiedad_comuna}</span>}
                                    {req.doc_repertorio && <span>Rep: {req.doc_repertorio}</span>}
                                    {req.doc_resolucion && <span>Res: {req.doc_resolucion}</span>}
                                    {req.doc_rol && <span>Rol: {req.doc_rol}</span>}
                                    {req.doc_plano && <span>Plano: {req.doc_plano}</span>}
                                </div>
                            )}
                            {isSkipped && <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-100 inline-block mt-1">EXCLUIDO</span>}
                        </div>
                        {isUploaded && <CheckCircle className="text-green-500" size={24} />}
                    </div>

                    {req.detalle && <p className={`text-sm mt-2 italic border-l-2 pl-3 ${isSkipped ? 'text-slate-300 border-slate-100' : 'text-slate-500 border-slate-200'}`}>{req.detalle}</p>}

                    <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-100">
                        <div className="flex items-center gap-2">
                            {req.nombre_persona && <span className="text-xs font-semibold text-slate-600 truncate max-w-[150px]"><User size={12} className="inline mr-1" />{req.nombre_persona}</span>}
                        </div>

                        <div className="flex gap-2">
                            {!isUploaded && !isSkipped && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setMarkedLocally(true);
                                        onSkip(key, req.id);
                                    }}
                                    className="bg-red-50 text-red-600 border border-red-200 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all active:scale-95 shadow-sm"
                                >
                                    No es útil
                                </button>
                            )}
                            {isSkipped && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setMarkedLocally(false);
                                        onUpload(key, null);
                                    }}
                                    className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest shadow-md active:scale-95"
                                >
                                    Habilitar
                                </button>
                            )}
                        </div>
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
    const [stage4Requests, setStage4Requests] = useState([]);
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
                .select('id, estado, nombre_propiedad, tipo_propiedad, finalidad_estudio, cantidad_transacciones')
                .eq('numero_operacion', operationId)
                .single();

            let effectiveStep = 1;

            if (studyData) {
                setStudyId(studyData.id);
                setPropertyName(studyData.nombre_propiedad || '');
                setPropertyType(studyData.tipo_propiedad || '');
                setStudyPurpose(studyData.finalidad_estudio || '');
                setTransactionsCount(studyData.cantidad_transacciones || 1);

                // Logic to set currentStep based on DB status
                if (['En Revisión', 'Observaciones'].includes(studyData.estado)) {
                    effectiveStep = 3;
                } else if (studyData.estado === 'En Documentación') {
                    effectiveStep = 2;
                }

                setCurrentStep(effectiveStep);
            }

            // 2. Fetch all requests for the operation from solicitud_documentos
            const { data: allRequests } = await supabase
                .from('solicitud_documentos')
                .select('*')
                .eq('operacion_id', operationId);

            if (allRequests && allRequests.length > 0) {
                const s2Reqs = allRequests.filter(r => r.fase === 1 || r.fase === 2);
                const s3Reqs = allRequests.filter(r => r.fase === 3);
                const s4Reqs = allRequests.filter(r => r.fase === 4);

                setStage3Requests(s3Reqs);
                setStage4Requests(s4Reqs);

                // If we have S2 docs in DB, reconstruct requiredDocs
                if (s2Reqs.length > 0) {
                    const reconstructedDocs = s2Reqs.map(r => ({
                        id: r.tipo_documento || r.nombre_documento, // Fallback to name if tipo is missing
                        label: r.nombre_documento,
                        description: r.detalle || '',
                        category: r.tipo_documento ? 'legal' : 'otro', // Simplified category
                        icon: r.tipo_documento?.includes('dominio') ? FileCheck : (r.tipo_documento?.includes('gp') ? ShieldCheck : Scroll),
                        dbId: r.id
                    }));
                    setRequiredDocs(reconstructedDocs);
                }

                setDocStates(prev => {
                    const next = { ...prev };
                    allRequests.forEach(req => {
                        const isS3 = req.fase === 3;
                        const isS4 = req.fase === 4;
                        const key = isS3 ? `s3_${req.id}` : (isS4 ? `s4_${req.id}` : (req.tipo_documento || req.nombre_documento));

                        if (!next[key]) {
                            next[key] = {
                                status: req.estado === 'Completado' ? 'uploaded' : (req.estado === 'No Aplica' ? 'skipped' : 'pending'),
                                error: null,
                                file: null,
                                stage: req.fase,
                                dbId: req.id,
                                label: req.nombre_documento,
                                dbType: req.tipo_documento,
                                personaNom: req.nombre_persona,
                                personaRut: req.rut_persona,
                                description: req.detalle || `Documento para ${req.nombre_persona || 'la propiedad'}`,
                            };
                        }
                    });
                    return next;
                });

                // If only S3 are new, advance. If study is in 'Observaciones', it goes to Step 3.

                // --- NEW: Detect if Phase 2 is already saved ---
                if (effectiveStep === 2) {
                    const phase2Docs = allRequests.filter(r => r.fase === 2);
                    const allPhase2Completed = phase2Docs.length > 0 && phase2Docs.every(r => r.estado === 'Completado' || r.estado === 'No Aplica');
                    if (allPhase2Completed) {
                        console.log('Detected all Phase 2 documents are already completed. Setting isDocsSaved=true');
                        setIsDocsSaved(true);
                    }
                }

                if (effectiveStep === 3) {
                    const phase3Docs = allRequests.filter(r => r.fase === 3);
                    const allPhase3Completed = phase3Docs.length > 0 && phase3Docs.every(r => r.estado === 'Completado' || r.estado === 'No Aplica');
                    if (allPhase3Completed && s4Reqs.length > 0) {
                        console.log('Detected all Phase 3 documents are already completed and Phase 4 exists. Advancing to Step 4');
                        setCurrentStep(4);
                    }
                }
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
                    if (newReq.fase === 4) {
                        setStage4Requests(prev => [...prev, newReq]);
                        setDocStates(prev => ({
                            ...prev,
                            [`s4_${newReq.id}`]: {
                                status: 'pending',
                                error: null,
                                file: null,
                                stage: 4,
                                dbId: newReq.id,
                                label: newReq.nombre_documento,
                                dbType: newReq.tipo_documento,
                                personaNom: newReq.nombre_persona,
                                personaRut: newReq.rut_persona,
                                description: `Documento para ${newReq.nombre_persona}`,
                            }
                        }));
                        setCurrentStep(prev => prev < 4 ? 4 : prev);
                    } else {
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
                        setCurrentStep(prev => prev < 3 ? 3 : prev);
                    }
                    toast.info(`Nueva solicitud documento: ${newReq.nombre_documento} para ${newReq.nombre_persona}`, { duration: 5000 });
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(phase3Channel);
        };
    }, [operationId]);

    const totalDocs = requiredDocs.length + stage2Requests.length + stage3Requests.length + stage4Requests.length;
    const completedCount = Object.values(docStates).filter(s => s.status === 'uploaded' || s.status === 'skipped').length;

    const handleUpload = (docId, file) => {
        setDocStates(prev => ({
            ...prev,
            [docId]: {
                ...prev[docId],
                status: file ? 'uploaded' : 'pending',
                error: null,
                file: file
            }
        }));
        setIsDocsSaved(false);
        if (file) toast.success(`Documento "${file.name}" preparado`);
    };

    const handleSkipDocument = async (docId, dbId) => {
        try {
            setDocStates(prev => ({
                ...prev,
                [docId]: { ...prev[docId], status: 'skipped', error: null, file: null }
            }));
            setIsDocsSaved(false);

            if (dbId) {
                const { error } = await supabase
                    .from('solicitud_documentos')
                    .update({ estado: 'No Aplica' })
                    .eq('id', dbId);

                if (error) throw error;
            }
            toast.info('Documento marcado como no aplicable');
        } catch (error) {
            console.error('Error skipping document:', error);
            toast.error('Error al marcar documento');
        }
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
                        next[doc.id] = { status: 'pending', error: null, file: null, stage: 2 };
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
            const sId = data[0].id;
            setStudyId(sId);

            // 3. Register documents in solicitud_documentos (Fase 2)
            // To avoid duplicates without a strict unique constraint, we check existing ones first
            const { data: existingReqs } = await supabase
                .from('solicitud_documentos')
                .select('tipo_documento')
                .eq('operacion_id', operationId)
                .eq('fase', 2);

            const existingTypes = new Set(existingReqs?.map(r => r.tipo_documento) || []);

            const newDocRequests = generatedDocs
                .filter(doc => !existingTypes.has(doc.id))
                .map(doc => ({
                    estudio_id: sId,
                    operacion_id: operationId,
                    user_id: user.id,
                    tipo_documento: doc.id,
                    nombre_documento: doc.label,
                    detalle: doc.description,
                    fase: 2,
                    estado: 'Pendiente',
                    subido: false
                }));

            if (newDocRequests.length > 0) {
                const { data: insertedReqs, error: reqsError } = await supabase
                    .from('solicitud_documentos')
                    .insert(newDocRequests)
                    .select();

                if (reqsError) {
                    console.error('Error creating document requests:', reqsError);
                } else if (insertedReqs) {
                    // Update requiredDocs and docStates with the new dbIds
                    setRequiredDocs(prev => prev.map(doc => {
                        const dbMatch = insertedReqs.find(r => r.tipo_documento === doc.id);
                        return dbMatch ? { ...doc, dbId: dbMatch.id } : doc;
                    }));

                    setDocStates(prev => {
                        const next = { ...prev };
                        insertedReqs.forEach(r => {
                            if (next[r.tipo_documento]) {
                                next[r.tipo_documento].dbId = r.id;
                            }
                        });
                        return next;
                    });
                }
            }

            toast.success('Configuración guardada y documentos solicitados', { id: toastId });
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
            console.log(`Starting handleSubmit. Current Step: ${currentStep}`);
            const updates = [];
            for (const [key, state] of Object.entries(docStates)) {
                if (state.status !== 'uploaded' || !state.file) continue;

                // MODIFIED: Process all documents regardless of phase
                /*
                if (state.stage !== currentStep) {
                    console.log(`Skipping doc ${key} because it belongs to phase ${state.stage} (current: ${currentStep})`);
                    continue;
                }
                */
                console.log(`Processing file for ${key}: ${state.file.name}`);
                const file = state.file;
                const extension = file.name.split('.').pop();

                // Use consistent naming strategy
                let fileName = `${operationId}_${key}.${extension}`;

                // If we have a label, we use a cleaner name
                if (state.label) {
                    const cleanLabel = state.label.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, '');
                    fileName = `${cleanLabel}_${operationId}.${extension}`;
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



                // Always update solicitud_documentos if we have a dbId
                if (state.dbId) {
                    updates.push(supabase
                        .from('solicitud_documentos')
                        .update({
                            estado: 'Completado',
                            documento_url: publicUrl,
                            subido: true
                        })
                        .eq('id', state.dbId)
                    );
                }
            }

            await Promise.all(updates);

            if (currentStep === 2 || currentStep === 3 || currentStep === 4) {
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
        const toastId = toast.loading('Iniciando envío secuencial...');
        try {
            // 1. Fetch all documents for the current phase via RPC
            const { data: documents, error } = await supabase
                .rpc('get_operation_documents', {
                    p_numero_operacion: operationId
                    // p_fase: currentStep // MODIFIED: No phase filtering
                });

            if (error) {
                console.error("RPC Error:", error);
                throw new Error("Error al obtener los documentos guardados.");
            }

            console.log(`RPC get_operation_documents returned ${documents?.length || 0} docs total`);

            // 2. Filter out already sent documents
            const unsentDocs = (documents || []).filter(d => !d.enviado);

            if (unsentDocs.length === 0) {
                toast.error("No hay documentos nuevos para enviar.", { id: toastId });
                return;
            }

            // 3. Priority Sorting Logic
            const priorityDocs = [...unsentDocs].sort((a, b) => {
                const tableA = a.table?.toLowerCase() || '';
                const tableB = b.table?.toLowerCase() || '';
                const typeA = a.dbType?.toLowerCase() || '';
                const typeB = b.dbType?.toLowerCase() || '';

                // Global Priority: 1. Base (Dominio/GP) -> 2. Titles -> 3. Identity
                const getPrio = (t, ty) => {
                    const lowT = t?.toLowerCase() || '';
                    const lowTy = ty?.toLowerCase() || '';

                    // Phase 2 / Base
                    if (lowT.includes('dominio') || lowTy.includes('dominio')) return 1;
                    if (lowT.includes('gp') || lowTy.includes('gp')) return 2;

                    // Phase 3 / Titles
                    if (lowT.includes('titulo') || lowTy.includes('titulo') || lowT.includes('herencia') || lowTy.includes('herencia')) return 3;

                    // Phase 4 / Identity
                    if (lowT.includes('cedula') || lowT.includes('identidad')) return 4;

                    return 5;
                };
                return getPrio(tableA, typeA) - getPrio(tableB, typeB);
            });

            console.log(`Sending ${priorityDocs.length} documents sequentially...`);

            // 3. Sequential Submission
            for (let i = 0; i < priorityDocs.length; i++) {
                const doc = priorityDocs[i];
                const cleanName = doc.table || 'documento';

                toast.loading(`Enviando (${i + 1}/${priorityDocs.length}): ${cleanName}...`, { id: toastId });

                const payload = {
                    numero_operacion: operationId,
                    user_id: user?.id,
                    estudio_id: studyId,
                    fase: currentStep,
                    total_documentos: priorityDocs.length,
                    indice_documento: i + 1,
                    document: doc, // Sending only THIS document
                    metadata: {
                        nombre_propiedad: propertyName,
                        tipo_propiedad: propertyType
                    },
                    timestamp: new Date().toISOString()
                };

                const { data: result, error: invokeError } = await supabase.functions.invoke('send-to-revision', {
                    body: payload
                });

                if (invokeError || !result?.success) {
                    throw new Error(`Error en doc ${i + 1}: ${result?.error || invokeError?.message}`);
                }

                // 4. Mark as sent in database
                console.log(`Marking doc ${doc.id} from table ${doc.table} as sent...`);
                const { error: updateError } = await supabase
                    .from(doc.table)
                    .update({ enviado: true })
                    .eq('id', doc.id);

                if (updateError) {
                    console.warn("Failed to mark document as sent:", updateError);
                }

                // Wait 10 seconds before next one (if not the last)
                if (i < priorityDocs.length - 1) {
                    toast.loading(`Esperando 10s para el siguiente documento... (${i + 1}/${priorityDocs.length} listos)`, { id: toastId });
                    await new Promise(resolve => setTimeout(resolve, 10000));
                }
            }

            // 4. Update study status in database when all are sent
            await supabase
                .from('estudios_titulos')
                .update({ estado: 'En Revisión' })
                .eq('numero_operacion', operationId);

            // Logic to advance step or finish
            if (currentStep === 2) setCurrentStep(3);
            else if (currentStep === 3 && stage4Requests.length > 0) setCurrentStep(4);

            toast.success('Todos los documentos enviados correctamente', { id: toastId });

        } catch (error) {
            console.error("Error sending sequentially:", error);
            toast.error(`Fallo en el envío secuencial: ${error.message}`, { id: toastId });
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
                                    currentStep === 3 ? (stage3Requests.some(r => r.estado !== 'Completado') ? 'Paso 3: Carga de antecedentes adicionales' : 'Paso 3: Revisión del estudio') :
                                        (stage4Requests.some(r => r.estado !== 'Completado') ? 'Paso 4: Documentación final (Identidad y Estado Civil)' : 'Paso 4: Revisión final')}
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
                    stage4Requests={stage4Requests}
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
                                    {/* MODIFIED: Section removed as per logic change (always 1 inscription) */}
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
                ) : (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                        {/* Unified Document Management View */}
                        <div className="bg-amber-50 border border-amber-100 p-4 rounded-xl mb-6 flex items-start gap-3">
                            <AlertCircle className="text-amber-500 mt-0.5 shrink-0" size={18} />
                            <p className="text-sm text-amber-800 leading-relaxed">
                                <strong>Gestión de Documentos.</strong> Sube los antecedentes solicitados. A medida que avancemos, podrían aparecer nuevos requerimientos del analista.
                            </p>
                        </div>

                        {/* SECTION 1: Base Docs (Phase 2 Origin) */}
                        <div className="mb-12">
                            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                                <FileText size={16} /> Documentación Base
                            </h3>
                            <div className="grid grid-cols-1 gap-4">
                                {requiredDocs.map(doc => (
                                    <SmartUploadCard
                                        key={doc.id}
                                        doc={doc}
                                        status={docStates[doc.id]?.status || 'pending'}
                                        error={docStates[doc.id]?.error}
                                        onUpload={handleUpload}
                                        onSkip={handleSkipDocument}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* SECTION 2: Titles/Gravamens (Phase 3 Origin) */}
                        {(() => {
                            const propertyDocs = stage3Requests.filter(req =>
                                ['titulos', 'legal', 'escritura_cv', 'inscripcion_anterior', 'posesion_efectiva', 'hipoteca', 'gp', 'inscripcion_herencia', 'herencia'].includes(req.tipo_documento?.toLowerCase()) ||
                                req.origen_solicitud === 'propiedad'
                            );
                            if (propertyDocs.length === 0) return null;
                            return (
                                <div className="mb-12 animate-in fade-in slide-in-from-bottom-2">
                                    <h3 className="text-sm font-bold text-blue-800 uppercase mb-4 tracking-wider flex items-center gap-2">
                                        <Scroll size={16} /> Títulos y Gravámenes
                                    </h3>
                                    <div className="space-y-3">
                                        {propertyDocs.map(req => (
                                            <Stage3UploadCard
                                                key={`s3_${req.id}`}
                                                docId={`s3_${req.id}`}
                                                req={req}
                                                docState={docStates[`s3_${req.id}`]}
                                                onUpload={handleUpload}
                                                isSubmitting={isSubmitting}
                                                onSkip={handleSkipDocument}
                                            />
                                        ))}
                                    </div>
                                </div>
                            );
                        })()}

                        {/* SECTION 3: Personal/Other (Phase 3 Origin) */}
                        {(() => {
                            const personalDocs = stage3Requests.filter(req =>
                                !['titulos', 'legal', 'escritura_cv', 'inscripcion_anterior', 'posesion_efectiva', 'hipoteca', 'gp'].includes(req.tipo_documento?.toLowerCase()) &&
                                req.origen_solicitud !== 'propiedad'
                            );
                            if (personalDocs.length === 0) return null;
                            return (
                                <div className="mb-12 animate-in fade-in slide-in-from-bottom-2">
                                    <h3 className="text-sm font-bold text-amber-700 uppercase mb-4 tracking-wider flex items-center gap-2">
                                        <FileCheck size={16} /> Documentación Personal y Otros
                                    </h3>
                                    <div className="space-y-3">
                                        {personalDocs.map(req => (
                                            <Stage3UploadCard
                                                key={`s3_${req.id}`}
                                                docId={`s3_${req.id}`}
                                                req={req}
                                                docState={docStates[`s3_${req.id}`]}
                                                onUpload={handleUpload}
                                                isSubmitting={isSubmitting}
                                                onSkip={handleSkipDocument}
                                            />
                                        ))}
                                    </div>
                                </div>
                            );
                        })()}

                        {/* SECTION 4: Identity (Phase 4 Origin) */}
                        {stage4Requests.length > 0 && (
                            <div className="mb-12 animate-in fade-in slide-in-from-bottom-2">
                                <h3 className="text-sm font-bold text-indigo-800 uppercase mb-4 tracking-wider flex items-center gap-2">
                                    <User size={16} /> Antecedentes de los Comparecientes
                                </h3>
                                <div className="space-y-3">
                                    {stage4Requests.map(req => (
                                        <Stage3UploadCard
                                            key={`s4_${req.id}`}
                                            docId={`s4_${req.id}`}
                                            req={req}
                                            docState={docStates[`s4_${req.id}`]}
                                            onUpload={handleUpload}
                                            isSubmitting={isSubmitting}
                                            onSkip={handleSkipDocument}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Footer Actions */}
                        <div className="sticky bottom-4 left-0 right-0 bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-slate-200 shadow-2xl flex justify-between items-center z-50">
                            <button
                                onClick={handleSubmit}
                                disabled={isSubmitting || isDocsSaved || Object.values(docStates).filter(s => (s.status === 'uploaded' || s.status === 'skipped')).length === 0}
                                className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold transition-all ${isDocsSaved
                                    ? 'bg-green-50 text-green-600 border border-green-200'
                                    : 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-100'
                                    } disabled:opacity-50 shadow-lg`}
                            >
                                {isSubmitting ? (
                                    <div className="flex items-center gap-2">
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Guardando...
                                    </div>
                                ) : isDocsSaved ? (
                                    <>Documentos Guardados <CheckCircle size={18} /></>
                                ) : (
                                    <>Guardar Documentos <FileCheck size={18} /></>
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
                    </div>
                )}
            </main>
        </div>
    );
}

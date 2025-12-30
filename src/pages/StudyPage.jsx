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
    Landmark,
    Building,
    ChevronDown,
    ArrowRight,
    ArrowLeft,
    Scroll,
    Map,
    LogOut
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

const StatusPanel = ({ currentStep, progress, total }) => {
    const percentage = currentStep === 1 ? 0 : Math.round((progress / total) * 100);

    const steps = [
        { label: 'Configuración', status: currentStep === 1 ? 'current' : 'completed' },
        { label: 'Documentación', status: currentStep === 2 ? 'current' : (currentStep > 2 ? 'completed' : 'pending') },
        { label: 'Análisis', status: 'pending' },
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
                            style={{ width: `${currentStep === 1 ? 25 : 25 + (percentage * 0.75)}%` }}
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
        setIsHovering(true);
    };

    const handleDragLeave = () => {
        setIsHovering(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsHovering(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            if (status !== 'uploading' && status !== 'approved') {
                onUpload(doc.id, e.dataTransfer.files[0]);
            }
        }
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

    const getStatusStyles = () => {
        switch (status) {
            case 'uploaded': return 'border-green-500 bg-green-50/50';
            case 'error': return 'border-red-300 bg-red-50/50';
            case 'uploading': return 'border-blue-300 bg-blue-50/50';
            default: return isHovering ? 'border-blue-400 bg-blue-50/30' : 'border-slate-200 hover:border-slate-300 bg-white';
        }
    };

    const Icon = doc.icon;

    return (
        <div
            className={`border rounded-lg p-5 transition-all duration-200 relative group ${getStatusStyles()} ${status === 'pending' || status === 'error' ? 'cursor-pointer border-dashed' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleClick}
        >
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleChange}
                className="hidden"
                accept=".pdf,.png,.jpg,.jpeg"
            />

            <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg ${status === 'uploaded' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                    <Icon size={24} />
                </div>

                <div className="flex-1">
                    <div className="flex justify-between items-start">
                        <h3 className="font-semibold text-slate-800">{doc.label}</h3>
                        {status === 'uploaded' && <CheckCircle className="text-green-500" size={20} />}
                        {status === 'error' && <XCircle className="text-red-500" size={20} />}
                        {status === 'uploading' && <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>}
                        {status === 'pending' && <div className="h-5 w-5 rounded-full border-2 border-slate-200"></div>}
                    </div>

                    <p className="text-sm text-slate-500 mt-1">{doc.description}</p>

                    {doc.alert && status !== 'uploaded' && (
                        <div className="mt-2 text-xs font-medium px-2 py-1 bg-amber-100 text-amber-700 rounded-md inline-flex items-center gap-1">
                            <AlertCircle size={12} />
                            {doc.alert}
                        </div>
                    )}

                    {status === 'error' && (
                        <div className="mt-3 text-sm text-red-600 bg-red-50 p-2 rounded border border-red-100 flex items-start gap-2 animate-in fade-in slide-in-from-top-1">
                            <AlertCircle size={16} className="mt-0.5 shrink-0" />
                            <span>{error || 'Error al subir documento'}</span>
                        </div>
                    )}

                    {status === 'pending' && (
                        <div className="mt-4 flex items-center gap-2 text-xs text-slate-400 font-medium group-hover:text-blue-600 transition-colors">
                            <Upload size={14} />
                            <span>Arrastra tu PDF aquí o haz clic para buscar</span>
                        </div>
                    )}
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
    const [propertyType, setPropertyType] = useState('');
    const [studyPurpose, setStudyPurpose] = useState('');
    const [hasServidumbre, setHasServidumbre] = useState(null);
    const [hasReglamento, setHasReglamento] = useState(null);
    const [transactionsCount, setTransactionsCount] = useState(1);
    const [transactionsDetails, setTransactionsDetails] = useState([{ id: 1, type: '' }]);
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [studyId, setStudyId] = useState(null);

    // Generate unique operation ID for new studies
    const [operationId, setOperationId] = useState(() => {
        if (operacionId && operacionId !== 'nuevo') {
            return operacionId;
        }
        return Math.floor(1000 + Math.random() * 9000).toString();
    });

    useEffect(() => {
        const fetchStages = async () => {
            // Fase 2 is now handled differently or logic is being restructured
            // For now, we fetch Phase 3 specific requests
            const { data: s3Data } = await supabase
                .from('solicitud_fase3')
                .select('*')
                .eq('numero_operacion', operationId);

            if (s3Data) {
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
                                label: req.tipo_documento,
                                personaNom: req.nombre_persona,
                                personaRut: req.rut_persona,
                                description: `Documento para ${req.nombre_persona}`,
                            };
                        }
                    });
                    return next;
                });
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
                    table: 'solicitud_fase3',
                    filter: `numero_operacion=eq.${operationId}`
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
                            label: newReq.tipo_documento,
                            personaNom: newReq.nombre_persona,
                            personaRut: newReq.rut_persona,
                            description: `Documento para ${newReq.nombre_persona}`,
                        }
                    }));
                    toast.info(`Nueva solicitud Fase 3: ${newReq.tipo_documento} para ${newReq.nombre_persona}`, { duration: 5000 });
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
        toast.success(`Documento "${file.name}" preparado`);
    };

    // Save Phase 1 form data to estudios_titulos table
    const saveFormData = async () => {
        const toastId = toast.loading('Guardando configuración...');
        try {
            const formData = {
                numero_operacion: operationId,
                user_id: user.id,
                tipo_propiedad: propertyType,
                finalidad_estudio: studyPurpose,
                tiene_servidumbre: hasServidumbre,
                tiene_reglamento: hasReglamento,
                cantidad_transacciones: transactionsCount,
                detalle_transacciones: transactionsDetails.filter(t => t.type),
                estado: 'En Documentación'
            };

            // 1. Generate Smart Document List
            const generatedDocs = generateRequiredDocuments({
                propertyType,
                hasReglamento,
                hasServidumbre,
                transactionsDetails: transactionsDetails.filter(t => t.type)
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
            const { data, error } = await supabase
                .from('estudios_titulos')
                .upsert(formData, { onConflict: 'numero_operacion' })
                .select()
                .single();

            if (error) throw error;

            setStudyId(data.id);
            toast.success('Configuración guardada', { id: toastId });
            return true;
        } catch (error) {
            console.error('Error saving form:', error);
            toast.error('Error al guardar configuración', { id: toastId });
            return false;
        }
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        const toastId = toast.loading('Procesando documentos...');
        try {
            const stage1Urls = {};
            const updates = [];
            for (const [key, state] of Object.entries(docStates)) {
                if (state.status !== 'uploaded' || !state.file) continue;
                const file = state.file;
                const extension = file.name.split('.').pop();
                const fileName = `${operationId}_${key}.${extension}`;
                const filePath = `${operationId}/${fileName}`;

                const { error: storageError } = await supabase.storage
                    .from('legal_documents')
                    .upload(filePath, file, { upsert: true });

                if (storageError) throw storageError;

                const { data: { publicUrl } } = supabase.storage
                    .from('legal_documents')
                    .getPublicUrl(filePath);

                if (state.stage === 1) {
                    stage1Urls[key] = publicUrl;
                } else if (state.stage === 3) {
                    updates.push(supabase.from('solicitud_fase3').update({ estado: 'Completado', documento_url: publicUrl }).eq('id', state.dbId));
                }
            }

            // Phase 1 URLs are handled by individual OCR tables or a consolidated log
            // Since antecedentes_generales_doc is removed, we'll proceed with analysis trigger
            await Promise.all(updates);

            // Trigger n8n webhook for Phase 3 analysis
            if (Object.keys(stage1Urls).length > 0) {
                await triggerN8nAnalysis(stage1Urls);
            }

            toast.success('Documentos enviados correctamente', { id: toastId });

            // Redirect to dashboard after successful submission
            setTimeout(() => {
                navigate('/dashboard');
            }, 2000);
        } catch (error) {
            console.error("Submit error:", error);
            toast.error("Error al enviar documentos", { id: toastId });
        } finally {
            setIsSubmitting(false);
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
                        property_type: propertyType,
                        transactions_count: transactionsCount,
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
                            {currentStep === 1 ? 'Paso 1: Configuración de la propiedad' : 'Paso 2: Carga de documentos'}
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

                <StatusPanel currentStep={currentStep} progress={completedCount} total={totalDocs} />

                {currentStep === 1 ? (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                                <label className="block text-sm font-medium text-slate-700 mb-2">Tipo de Propiedad</label>
                                <div className="relative">
                                    <select
                                        value={propertyType}
                                        onChange={(e) => setPropertyType(e.target.value)}
                                        className="w-full appearance-none bg-slate-50 border border-slate-300 rounded-lg px-4 py-3 pr-10 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    >
                                        <option value="" disabled>Seleccione el tipo...</option>
                                        {PROPERTY_TYPES.map(type => <option key={type.id} value={type.id}>{type.label}</option>)}
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={20} />
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                                <label className="block text-sm font-medium text-slate-700 mb-2">Finalidad del Estudio</label>
                                <div className="relative">
                                    <select
                                        value={studyPurpose}
                                        onChange={(e) => setStudyPurpose(e.target.value)}
                                        className="w-full appearance-none bg-slate-50 border border-slate-300 rounded-lg px-4 py-3 pr-10 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    >
                                        <option value="" disabled>Seleccione la finalidad...</option>
                                        {STUDY_PURPOSES.map(purpose => <option key={purpose.id} value={purpose.id}>{purpose.label}</option>)}
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={20} />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-8">
                            <label className="block text-sm font-medium text-slate-700 mb-4">¿Existe alguna servidumbre sobre la propiedad?</label>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button onClick={() => setHasServidumbre(true)} className={`flex-1 py-4 px-6 rounded-xl border-2 transition-all duration-300 flex flex-col items-center gap-3 ${hasServidumbre === true ? 'bg-blue-50 border-blue-600 text-blue-700 shadow-md transform scale-[1.02]' : 'bg-white border-slate-100 text-slate-500 hover:border-slate-200'}`}>
                                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${hasServidumbre === true ? 'border-blue-600 bg-white' : 'border-slate-300'}`}>{hasServidumbre === true && <div className="w-3 h-3 bg-blue-600 rounded-full" />}</div>
                                    <span className="font-bold">Sí, existe servidumbre</span>
                                </button>
                                <button onClick={() => setHasServidumbre(false)} className={`flex-1 py-4 px-6 rounded-xl border-2 transition-all duration-300 flex flex-col items-center gap-3 ${hasServidumbre === false ? 'bg-blue-50 border-blue-600 text-blue-700 shadow-md transform scale-[1.02]' : 'bg-white border-slate-100 text-slate-500 hover:border-slate-200'}`}>
                                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${hasServidumbre === false ? 'border-blue-600 bg-white' : 'border-slate-300'}`}>{hasServidumbre === false && <div className="w-3 h-3 bg-blue-600 rounded-full" />}</div>
                                    <span className="font-bold">No existe servidumbre</span>
                                </button>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-8">
                            <label className="block text-sm font-medium text-slate-700 mb-4">¿Existe reglamento de copropiedad inscrito?</label>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button onClick={() => setHasReglamento(true)} className={`flex-1 py-4 px-6 rounded-xl border-2 transition-all duration-300 flex flex-col items-center gap-3 ${hasReglamento === true ? 'bg-blue-50 border-blue-600 text-blue-700 shadow-md transform scale-[1.02]' : 'bg-white border-slate-100 text-slate-500 hover:border-slate-200'}`}>
                                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${hasReglamento === true ? 'border-blue-600 bg-white' : 'border-slate-300'}`}>{hasReglamento === true && <div className="w-3 h-3 bg-blue-600 rounded-full" />}</div>
                                    <span className="font-bold">Sí, existe reglamento</span>
                                </button>
                                <button onClick={() => setHasReglamento(false)} className={`flex-1 py-4 px-6 rounded-xl border-2 transition-all duration-300 flex flex-col items-center gap-3 ${hasReglamento === false ? 'bg-blue-50 border-blue-600 text-blue-700 shadow-md transform scale-[1.02]' : 'bg-white border-slate-100 text-slate-500 hover:border-slate-200'}`}>
                                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${hasReglamento === false ? 'border-blue-600 bg-white' : 'border-slate-300'}`}>{hasReglamento === false && <div className="w-3 h-3 bg-blue-600 rounded-full" />}</div>
                                    <span className="font-bold">No existe reglamento</span>
                                </button>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-8">
                            <label className="block text-sm font-medium text-slate-700 mb-4">¿Cuántas transacciones ha tenido la propiedad en los últimos 10 años?</label>
                            <div className="grid grid-cols-2 sm:grid-cols-6 gap-3">
                                {[0, 1, 2, 3, 4, '5+'].map((val) => {
                                    const numVal = typeof val === 'string' ? 5 : val;
                                    const isSelected = val === '5+' ? transactionsCount >= 5 : transactionsCount === val;
                                    return (
                                        <button
                                            key={val}
                                            onClick={() => setTransactionsCount(numVal)}
                                            className={`py-3 px-2 rounded-xl border-2 transition-all duration-200 flex flex-col items-center gap-1 ${isSelected ? 'bg-blue-600 border-blue-600 text-white shadow-md transform scale-[1.05]' : 'bg-slate-50 border-slate-100 text-slate-500 hover:border-slate-200 hover:bg-white'}`}
                                        >
                                            <span className="text-xl font-bold">{val}</span>
                                            <span className="text-[10px] uppercase font-medium opacity-80">{val === 1 ? 'Título' : 'Títulos'}</span>
                                        </button>
                                    );
                                })}
                            </div>
                            <div className="mt-4 p-4 bg-slate-50 rounded-lg border border-slate-100 flex items-start gap-3">
                                <div className="bg-blue-100 p-1.5 rounded-full text-blue-600 shrink-0"><FileText size={14} /></div>
                                <p className="text-xs text-slate-600 leading-relaxed">
                                    {transactionsCount === 0 ? "Sin transacciones recientes." : transactionsCount === 1 ? "Propiedad con título único." : transactionsCount < 5 ? `Se han detectado ${transactionsCount} títulos.` : "Múltiples transacciones."}
                                </p>
                            </div>
                            {transactionsCount > 0 && (
                                <div className="mt-8 space-y-4 pt-6 border-t border-slate-100 animate-in fade-in slide-in-from-top-4">
                                    <h4 className="text-sm font-bold text-slate-800">Detalle de Títulos</h4>
                                    <div className="grid grid-cols-1 gap-3">
                                        {Array.from({ length: transactionsCount }).map((_, index) => (
                                            <div key={index} className="flex flex-col sm:flex-row sm:items-center gap-3 bg-slate-50/50 p-4 rounded-xl border border-slate-100">
                                                <span className="text-sm font-semibold text-slate-700 w-20">Título {index + 1}:</span>
                                                <select
                                                    value={transactionsDetails[index]?.type || ''}
                                                    onChange={(e) => {
                                                        const newDetails = [...transactionsDetails];
                                                        if (!newDetails[index]) newDetails[index] = { id: index + 1 };
                                                        newDetails[index].type = e.target.value;
                                                        setTransactionsDetails(newDetails);
                                                    }}
                                                    className="flex-1 bg-white border border-slate-200 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                                >
                                                    <option value="" disabled>Seleccione el acto jurídico...</option>
                                                    {TRANSACTION_TITLES.map(title => <option key={title.id} value={title.id}>{title.label}</option>)}
                                                </select>
                                                <input
                                                    type="date"
                                                    value={transactionsDetails[index]?.date || ''}
                                                    onChange={(e) => {
                                                        const newDetails = [...transactionsDetails];
                                                        if (!newDetails[index]) newDetails[index] = { id: index + 1 };
                                                        newDetails[index].date = e.target.value;
                                                        setTransactionsDetails(newDetails);
                                                    }}
                                                    className="w-full sm:w-40 bg-white border border-slate-200 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none text-slate-600"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            <div className="mt-12 flex justify-end">
                                <button
                                    onClick={async () => {
                                        if (!propertyType || !studyPurpose) {
                                            toast.error("Por favor completa los campos principales");
                                            return;
                                        }

                                        const filledTransactions = transactionsDetails.filter(t => t.type).length;
                                        if (transactionsCount > 0 && filledTransactions < transactionsCount) {
                                            toast.error(`Por favor define el tipo de acto jurídico para los ${transactionsCount} títulos.`);
                                            return;
                                        }

                                        const saved = await saveFormData();
                                        if (saved) {
                                            setCurrentStep(2);
                                            window.scrollTo(0, 0);
                                        }
                                    }}
                                    className="bg-blue-600 text-white px-10 py-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg flex items-center gap-3 group"
                                >
                                    Continuar a Documentación <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="animate-in fade-in slide-in-from-left-4 duration-500 space-y-12 pb-20">
                        {/* Header de Fase 2 */}
                        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm mb-8">
                            <h2 className="text-2xl font-bold text-slate-900 mb-2">Carga de Documentación</h2>
                            <p className="text-slate-500">A continuación, adjunta los documentos generados dinámicamente según tu configuración del PASO 1.</p>
                        </div>

                        {/* Agrupación de Documentos por Afinidad */}
                        {(() => {
                            const categoryDetails = {
                                legal: { label: 'Antecedentes Legales Base', description: 'Estado actual de la propiedad en el CBR', icon: <ShieldCheck size={20} className="text-blue-600" /> },
                                municipal: { label: 'Antecedentes Municipales y SII', description: 'Deudas fiscales, expropiaciones y regularización', icon: <Building size={20} className="text-slate-600" /> },
                                titulos: { label: 'Títulos de Dominio (Escrituras)', description: 'Antecedentes de la cadena de títulos (10 años)', icon: <Scroll size={20} className="text-amber-600" /> },
                                especial: { label: 'Documentación Técnica y Especial', description: 'Reglamentos, planos y otros antecedentes', icon: <Map size={20} className="text-emerald-600" /> }
                            };

                            const categoriesOrder = ['legal', 'municipal', 'titulos', 'especial'];
                            const grouped = requiredDocs.reduce((acc, doc) => {
                                const cat = doc.category || 'especial';
                                if (!acc[cat]) acc[cat] = [];
                                acc[cat].push(doc);
                                return acc;
                            }, {});

                            return categoriesOrder.map(catKey => {
                                const docsInCat = grouped[catKey];
                                if (!docsInCat || docsInCat.length === 0) return null;

                                const catInfo = categoryDetails[catKey];

                                return (
                                    <section key={catKey} className="space-y-4">
                                        <div className="flex items-center gap-3 border-b border-slate-100 pb-3 mb-6">
                                            <div className="p-2 bg-slate-50 rounded-lg">
                                                {catInfo.icon}
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-slate-800 text-lg uppercase tracking-tight">{catInfo.label}</h3>
                                                <p className="text-slate-500 text-sm">{catInfo.description}</p>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {docsInCat.map(doc => (
                                                <SmartUploadCard
                                                    key={doc.id}
                                                    doc={doc}
                                                    status={docStates[doc.id]?.status || 'pending'}
                                                    error={docStates[doc.id]?.error}
                                                    onUpload={handleUpload}
                                                />
                                            ))}
                                        </div>
                                    </section>
                                );
                            });
                        })()}


                        {/* Visualización de Fase 3 (Solicitudes por Persona) */}
                        {stage3Requests.length > 0 && (
                            <section className="animate-in fade-in slide-in-from-bottom-4 duration-500 mt-12 pt-12 border-t-2 border-dashed border-blue-200">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                                        <FileCheck size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-800 text-xl tracking-tight">FASE 3: DOCUMENTOS POR PERSONA</h3>
                                        <p className="text-slate-500 text-sm">Documentos específicos requeridos para personas identificadas en el estudio.</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 gap-4">
                                    {stage3Requests.map(req => {
                                        const key = `s3_${req.id}`;
                                        const state = docStates[key];

                                        return (
                                            <div key={key} className={`border rounded-xl p-5 transition-all duration-200 ${state?.status === 'uploaded' ? 'border-green-400 bg-green-50/30' : 'border-blue-200 bg-white hover:border-blue-300'}`}>
                                                <div className="flex items-start gap-4">
                                                    <div className={`p-3 rounded-lg ${state?.status === 'uploaded' ? 'bg-green-100 text-green-700' : 'bg-blue-50 text-blue-600'}`}>
                                                        <FileText size={24} />
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="flex justify-between items-start mb-2">
                                                            <div>
                                                                <h4 className="font-bold text-slate-900 text-lg">{state?.label || req.tipo_documento}</h4>
                                                                <div className="flex items-center gap-2 mt-1">
                                                                    <span className="text-sm font-medium text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                                                                        {state?.personaNom || req.nombre_persona}
                                                                    </span>
                                                                    {Number(state?.personaRut || req.rut_persona) !== 0 && (
                                                                        <span className="text-xs text-slate-400">
                                                                            RUT: {state?.personaRut || req.rut_persona}
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                {state?.status === 'uploaded' ? (
                                                                    <div className="flex items-center gap-1 text-green-600 font-bold text-sm">
                                                                        <CheckCircle size={18} />
                                                                        Listo
                                                                    </div>
                                                                ) : (
                                                                    <div className="text-amber-500 font-bold text-sm flex items-center gap-1">
                                                                        <Clock size={18} />
                                                                        Pendiente
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>

                                                        {state?.status !== 'uploaded' && (
                                                            <label className="mt-4 flex items-center gap-2 text-xs text-blue-600 font-bold cursor-pointer hover:bg-blue-50 w-fit px-3 py-2 rounded-lg border border-blue-200 transition-colors">
                                                                <Upload size={14} />
                                                                <span>SUBIR {state?.label?.toUpperCase() || req.tipo_documento?.toUpperCase()}</span>
                                                                <input
                                                                    type="file"
                                                                    className="hidden"
                                                                    accept=".pdf,.png,.jpg,.jpeg"
                                                                    onChange={(e) => {
                                                                        if (e.target.files && e.target.files[0]) {
                                                                            handleUpload(key, e.target.files[0]);
                                                                        }
                                                                    }}
                                                                />
                                                            </label>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </section>
                        )}

                        {/* Footer de Acciones en Fase 2 */}
                        <div className="sticky bottom-4 left-0 right-0 bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-slate-200 shadow-2xl flex justify-between items-center z-50 mt-12">
                            <button
                                onClick={() => {
                                    setCurrentStep(1);
                                    window.scrollTo(0, 0);
                                }}
                                className="text-slate-600 font-bold hover:text-slate-900 transition-colors flex items-center gap-2 px-4 py-2 hover:bg-slate-100 rounded-lg"
                            >
                                <ArrowLeft size={18} /> Volver a Configuración
                            </button>

                            <div className="flex items-center gap-4">
                                <div className="hidden md:block text-right">
                                    <p className="text-xs text-slate-400 font-medium uppercase">Progreso actual</p>
                                    <p className="text-sm font-bold text-slate-700">{requiredDocs.length > 0 ? Math.round((requiredDocs.filter(d => docStates[d.id]?.status === 'uploaded').length / requiredDocs.length) * 100) : 0}% Completado</p>
                                </div>
                                <button
                                    onClick={handleSubmit}
                                    disabled={isSubmitting}
                                    className="bg-blue-900 text-white px-10 py-4 rounded-xl font-bold hover:bg-blue-950 transition-all shadow-lg flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group"
                                >
                                    {isSubmitting ? (
                                        <>Cargando...</>
                                    ) : (
                                        <>
                                            Enviar Estudio Completo
                                            <CheckCircle size={20} className="group-hover:scale-110 transition-transform" />
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

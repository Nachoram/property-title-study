import React, { useState, useEffect, useRef, useMemo } from 'react';
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
    LogOut,
    User,
    Calendar,
    Hash,
    MapPin,
    Tag,
    Scroll,
    ArrowLeft,
    ArrowRight,
    ChevronDown,
    Map,
    Eye,
    Play
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
    const hasPendingS4 = stage4Requests.some(r => r.estado !== 'Completado');

    const steps = [
        { label: 'Configuración', status: currentStep === 1 ? 'current' : 'completed' },
        { label: 'Documentación', status: currentStep === 2 ? 'current' : (currentStep > 2 ? 'completed' : 'pending') },
        { label: hasPendingS4 ? 'Identidad' : 'Final', status: currentStep === 3 ? 'current' : (currentStep > 3 ? 'completed' : 'pending') },
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
                            style={{ width: `${currentStep === 1 ? 20 : currentStep === 2 ? 40 + (percentage * 0.3) : currentStep === 3 ? 80 + (percentage * 0.2) : 100}%` }}
                        />
                    </div>
                    <span className="font-bold text-blue-700">{currentStep === 1 ? '20%' : `${Math.round(currentStep === 2 ? 40 + (percentage * 0.3) : 80 + (percentage * 0.2))}%`}</span>
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

// --- Helpers ---
const formatDate = (dateString) => {
    if (!dateString) return null;
    try {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('es-CL', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        }).format(date);
    } catch (e) {
        return dateString;
    }
};

const MetadataBlock = ({ req, isSkipped }) => {
    if (!req) return null;
    return (
        <div className="flex flex-col gap-2 mt-2">
            {/* Row 1: Registration Data */}
            {(req.propiedad_fojas || req.propiedad_numero || req.propiedad_anio || req.propiedad_comuna) && (
                <div className={`flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] font-semibold ${isSkipped ? 'text-slate-300' : 'text-blue-600'}`}>
                    <div className="flex items-center gap-1 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                        <Hash size={10} />
                        <span>Fjs: {req.propiedad_fojas || '-'}</span>
                        <span className="mx-0.5">•</span>
                        <span>N°: {req.propiedad_numero || '-'}</span>
                        <span className="mx-0.5">•</span>
                        <span>Año: {req.propiedad_anio || '-'}</span>
                    </div>
                    {req.propiedad_comuna && (
                        <div className="flex items-center gap-1 text-slate-500">
                            <MapPin size={10} />
                            <span>{req.propiedad_comuna}</span>
                        </div>
                    )}
                </div>
            )}

            {/* Row 2: Origin Data (Notary, Repertory, Date) */}
            {(req.notaria_documento || req.doc_entidad || req.doc_repertorio || req.doc_fecha) && (
                <div className={`flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] font-medium ${isSkipped ? 'text-slate-300' : 'text-slate-600'}`}>
                    {(req.notaria_documento || req.doc_entidad) && (
                        <div className="flex items-center gap-1">
                            <Building size={10} className="shrink-0" />
                            <span className="truncate max-w-[200px]">{req.notaria_documento || req.doc_entidad}</span>
                        </div>
                    )}
                    {req.doc_repertorio && (
                        <div className="flex items-center gap-1">
                            <Scroll size={10} className="shrink-0" />
                            <span>Rep: {req.doc_repertorio}</span>
                        </div>
                    )}
                    {req.doc_fecha && (
                        <div className="flex items-center gap-1">
                            <Calendar size={10} className="shrink-0" />
                            <span>{formatDate(req.doc_fecha)}</span>
                        </div>
                    )}
                </div>
            )}

            {/* Row 3: Other identifiers */}
            {(req.doc_resolucion || req.doc_rol || req.doc_plano) && (
                <div className={`flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] ${isSkipped ? 'text-slate-300' : 'text-slate-400'}`}>
                    {req.doc_resolucion && <span>Resolución: {req.doc_resolucion}</span>}
                    {req.doc_rol && <span>Rol: {req.doc_rol}</span>}
                    {req.doc_plano && <span>Plano: {req.doc_plano}</span>}
                </div>
            )}
        </div>
    );
};

const PersonaTag = ({ name, rut, role, isSkipped }) => {
    if (!name) return null;
    return (
        <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ring-1 transition-all ${isSkipped ? 'bg-slate-50 text-slate-400 ring-slate-100' : 'bg-blue-50 text-blue-700 ring-blue-100'}`}>
            <User size={12} className="shrink-0" />
            <div className="flex flex-col">
                <span className="truncate max-w-[200px]">{name}</span>
                {rut && <span className="text-[9px] opacity-70 font-mono -mt-0.5">{rut}</span>}
            </div>
            {role && <span className="text-[10px] opacity-60 ml-0.5 font-normal uppercase">({role})</span>}
        </div>
    );
};

const SmartUploadCard = ({ doc, status, file, error, onUpload, onSkip, onDelete }) => {
    const [isHovering, setIsHovering] = useState(false);
    const [markedLocally, setMarkedLocally] = useState(false);
    const fileInputRef = useRef(null);

    const isUploaded = status === 'uploaded';
    const isSkipped = status === 'skipped' || markedLocally;
    const isLoading = status === 'uploading';

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

    const handlePreview = (e) => {
        e.stopPropagation();
        let url = doc.req?.documento_url;
        if (!url && file) {
            url = URL.createObjectURL(file);
        }
        if (url) {
            window.open(url, '_blank');
        } else {
            toast.error('No hay URL de vista previa disponible');
        }
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
                <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl ${isUploaded ? 'bg-green-100 text-green-600' : isSkipped ? 'bg-slate-200 text-slate-400' : 'bg-blue-50 text-blue-600'}`}>
                        {isSkipped ? <XCircle size={24} /> : (doc.icon ? <doc.icon size={24} /> : <FileCheck size={24} />)}
                    </div>
                    <div className="flex-1">
                        <h3 className={`font-bold text-lg leading-tight ${isSkipped ? 'text-slate-400 line-through' : 'text-slate-900'}`}>{doc.label}</h3>
                        <MetadataBlock req={doc.req} isSkipped={isSkipped} />
                        {doc.description && <p className={`text-sm mt-3 italic border-l-2 pl-3 py-0.5 ${isSkipped ? 'text-slate-300 border-slate-100' : 'text-slate-500 border-slate-200 bg-slate-50/50 rounded-r-lg'}`}>{doc.description}</p>}
                    </div>
                </div>
                {isUploaded && (
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handlePreview}
                            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Ver documento"
                        >
                            <Eye size={20} />
                        </button>
                        <CheckCircle className="text-green-500 shrink-0" size={24} />
                    </div>
                )}
                {isLoading && <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>}
            </div>

            <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <PersonaTag
                        name={doc.req?.nombre_persona}
                        rut={doc.req?.rut_persona}
                        role={doc.req?.rol_persona}
                        isSkipped={isSkipped}
                    />
                    {!doc.req?.nombre_persona && (
                        <span className="text-[10px] font-black tracking-widest uppercase text-slate-400">
                            {isUploaded ? 'Documento Listo' : isSkipped ? 'Excluido' : 'Pendiente'}
                        </span>
                    )}
                </div>

                <div className="flex gap-2">
                    {isUploaded && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onDelete(doc.id, doc.dbId);
                            }}
                            className="bg-slate-100 text-slate-600 border border-slate-200 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all shadow-sm active:scale-95"
                        >
                            Eliminar
                        </button>
                    )}
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

const Stage3UploadCard = ({ docId, req, docState, onUpload, onSkip, onDelete, isSubmitting }) => {
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

    const handlePreview = (e) => {
        e.stopPropagation();
        let url = req.documento_url;
        if (!url && docState?.file) {
            url = URL.createObjectURL(docState.file);
        }
        if (url) {
            window.open(url, '_blank');
        } else {
            toast.error('No hay URL de vista previa disponible');
        }
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
                            <h3 className={`font-bold text-lg leading-tight transition-all mb-1 ${isSkipped ? 'text-slate-400 line-through' : 'text-slate-900'}`}>
                                {req.nombre_documento || req.tipo_documento}
                            </h3>
                            <MetadataBlock req={req} isSkipped={isSkipped} />
                            {isSkipped && <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-100 inline-block mt-2">EXCLUIDO</span>}
                        </div>
                        {isUploaded && (
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={handlePreview}
                                    className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                    title="Ver documento"
                                >
                                    <Eye size={20} />
                                </button>
                                <CheckCircle className="text-green-500 shrink-0" size={24} />
                            </div>
                        )}
                    </div>

                    {req.detalle && <p className={`text-sm mt-3 italic border-l-2 pl-3 py-0.5 ${isSkipped ? 'text-slate-300 border-slate-100' : 'text-slate-500 border-slate-200 bg-slate-50/50 rounded-r-lg'}`}>{req.detalle}</p>}

                    <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-100">
                        <div className="flex items-center gap-2">
                            <PersonaTag
                                name={req.nombre_persona}
                                rut={req.rut_persona}
                                role={req.rol_persona}
                                isSkipped={isSkipped}
                            />
                        </div>

                        <div className="flex gap-2">
                            {isUploaded && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onDelete(key, req.id);
                                    }}
                                    className="bg-slate-100 text-slate-600 border border-slate-200 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all active:scale-95 shadow-sm"
                                >
                                    Eliminar
                                </button>
                            )}
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

// --- Deduplication Helper ---
const getDeduplicationKey = (req) => {
    // Helper to normalize strings
    const normalize = (s) => s ? String(s).toLowerCase().trim() : '';

    if (!req) return null;

    const type = normalize(req.tipo_documento || req.nombre_documento);
    const person = normalize(req.nombre_persona);
    const rut = normalize(req.rut_persona);

    // 1. Property Documents (Strongest signal: Fojas + Numero + Año)
    if (req.propiedad_fojas && req.propiedad_numero && req.propiedad_anio) {
        return `prop_${normalize(req.propiedad_fojas)}_${normalize(req.propiedad_numero)}_${normalize(req.propiedad_anio)}`;
    }

    // 2. Plano (comparing only digits as per user request)
    if (req.doc_plano) {
        const digits = req.doc_plano.replace(/\D/g, '');
        if (digits.length >= 2) {
            return `plano_${digits}`;
        }
    }

    // 3. Declaracion de Solteria
    if (type.includes('solteria') && person) {
        return `solteria_${person}`;
    }

    // 3.5 Gastos Comunes
    if (type.includes('gastos comunes')) {
        return `gastos_comunes`;
    }

    // 4. Personal Documents (Category + Person Identifier)
    if (person || rut) {
        const personKey = rut || person;
        if (type.includes('cedula') || type.includes('identidad')) return `cedula_${personKey}`;
        if (type.includes('matrimonio')) return `matrimonio_${personKey}`;
        if (type.includes('nacimiento')) return `nacimiento_${personKey}`;
        if (type.includes('defuncion')) return `defuncion_${personKey}`;
    }

    // 5. Same Name + Same Date
    if (req.nombre_documento && req.doc_fecha) {
        return `namedate_${normalize(req.nombre_documento)}_${normalize(req.doc_fecha)}`;
    }

    // Fallback: If it doesn't match specific deduplication rules, we use its ID to ensure it is NOT hidden.
    return `unique_${req.id}`;
};

const DocumentSection = ({ title, count, children, defaultOpen = false, icon: Icon = ChevronDown, className = '' }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    if (count === 0) return null;

    return (
        <div className={`mb-4 border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm transition-all ${className}`}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 transition-colors"
            >
                <div className="flex items-center gap-3">
                    <div className="bg-white p-1.5 rounded-lg border border-slate-200 text-slate-500 shadow-sm">
                        {Icon && <Icon size={18} />}
                    </div>
                    <span className="font-bold text-slate-700">{title}</span>
                    <span className="bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full text-xs font-bold">{count}</span>
                </div>
                <ChevronDown size={20} className={`text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <div className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                <div className="p-4 bg-white border-t border-slate-100">
                    <div className="grid grid-cols-1 gap-4">
                        {children}
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
    const [isTitleStudyStarted, setIsTitleStudyStarted] = useState(false); // New State
    const [isTitleStudyLoading, setIsTitleStudyLoading] = useState(false);
    const [isAnalysisInProgress, setIsAnalysisInProgress] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);


    // Generate unique operation ID for new studies
    const [operationId] = useState(() => {
        if (operacionId && operacionId !== 'nuevo') {
            return operacionId;
        }
        return Math.floor(1000 + Math.random() * 9000).toString();
    });

    const fetchOperationData = async (silent = false) => {
        if (!silent) setIsRefreshing(true);
        try {
            // 1. Fetch Study Status
            const { data: studyData } = await supabase
                .from('estudios_titulos')
                .select('id, estado, nombre_propiedad, tipo_propiedad, finalidad_estudio, cantidad_transacciones')
                .eq('numero_operacion', operationId)
                .maybeSingle();

            if (studyData) {
                setStudyId(studyData.id);
                setPropertyName(studyData.nombre_propiedad || '');
                setPropertyType(studyData.tipo_propiedad || '');
                setStudyPurpose(studyData.finalidad_estudio || '');
                setTransactionsCount(studyData.cantidad_transacciones || 1);

                // Update analysis state based on DB status
                if (studyData.estado === 'En Revisión') {
                    setIsAnalysisInProgress(true);
                } else {
                    setIsAnalysisInProgress(false);
                }

                let effectiveStep = 1;
                if (['En Revisión', 'Observaciones'].includes(studyData.estado)) {
                    effectiveStep = 3;
                } else if (studyData.estado === 'En Documentación') {
                    effectiveStep = 2;
                } else if (studyData.estado === 'En Escritura') {
                    effectiveStep = 2;
                    setIsTitleStudyStarted(true);
                }
                setCurrentStep(effectiveStep);
            }

            // 2. Fetch all requests
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

                if (s2Reqs.length > 0) {
                    const reconstructedDocs = s2Reqs.map(r => ({
                        id: r.tipo_documento || r.nombre_documento,
                        label: r.nombre_documento,
                        description: r.detalle || '',
                        category: r.tipo_documento ? 'legal' : 'otro',
                        icon: r.tipo_documento?.includes('dominio') ? FileCheck : (r.tipo_documento?.includes('gp') ? ShieldCheck : Scroll),
                        dbId: r.id,
                        req: r
                    }));
                    setRequiredDocs(reconstructedDocs);
                }

                setDocStates(prev => {
                    const next = { ...prev };
                    allRequests.forEach(req => {
                        const isS3 = req.fase === 3;
                        const isS4 = req.fase === 4;
                        const key = isS3 ? `s3_${req.id}` : (isS4 ? `s4_${req.id}` : (req.tipo_documento || req.nombre_documento));

                        next[key] = {
                            ...next[key],
                            status: req.estado === 'Completado' ? 'uploaded' : (req.estado === 'No Aplica' ? 'skipped' : 'pending'),
                            file: next[key]?.file || null,
                            stage: req.fase,
                            dbId: req.id,
                            label: req.nombre_documento,
                            dbType: req.tipo_documento,
                            personaNom: req.nombre_persona,
                            personaRut: req.rut_persona,
                            description: req.detalle || `Documento para ${req.nombre_persona || 'la propiedad'}`,
                            enviado: req.enviado || false,
                        };
                    });
                    return next;
                });
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsRefreshing(false);
        }
    };

    useEffect(() => {
        fetchOperationData();

        // Realtime for solicitud_documentos
        const requestsChannel = supabase
            .channel(`operation-requests-${operationId}`)
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'solicitud_documentos',
                    filter: `operacion_id=eq.${operationId}`
                },
                (payload) => {
                    const { eventType, new: newReq } = payload;
                    console.log('Realtime Request Change:', eventType, newReq);
                    // Silently refresh to update UI lists
                    fetchOperationData(true);

                    if (eventType === 'INSERT') {
                        toast.info(`Nuevo documento requerido: ${newReq.nombre_documento}`);
                    }
                }
            )
            .subscribe();

        // Realtime for estudios_titulos (to detect status changes)
        const studyChannel = supabase
            .channel(`study-status-${operationId}`)
            .on(
                'postgres_changes',
                {
                    event: 'UPDATE',
                    schema: 'public',
                    table: 'estudios_titulos',
                    filter: `numero_operacion=eq.${operationId}`
                },
                (payload) => {
                    console.log('Study status updated:', payload.new.estado);
                    fetchOperationData(true);
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(requestsChannel);
            supabase.removeChannel(studyChannel);
        };
    }, [operationId]);





    // --- Deduplication Logic ---
    const visibleStage3Requests = useMemo(() => {
        const seenKeys = new Set();

        // Add keys from Phase 2 (requiredDocs) to seen set
        // Note: structured req object is inside doc.req
        requiredDocs.forEach(doc => {
            const key = getDeduplicationKey(doc.req);
            if (key && !key.startsWith('unique_')) seenKeys.add(key);
        });

        return stage3Requests.filter(req => {
            if (req.repetido) return false;
            const key = getDeduplicationKey(req);
            // If it's a unique ID, always show. If it's a dedup key, check if seen.
            if (key && !key.startsWith('unique_')) {
                if (seenKeys.has(key)) return false;
                seenKeys.add(key);
            }
            return true;
        });
    }, [stage3Requests, requiredDocs]);

    const visibleStage4Requests = useMemo(() => {
        const seenKeys = new Set();

        // Add keys from Phase 2 & 3 to seen set for Phase 4 (though unlikely to overlap phase 2/3 with 4)
        requiredDocs.forEach(doc => {
            const key = getDeduplicationKey(doc.req);
            if (key && !key.startsWith('unique_')) seenKeys.add(key);
        });
        visibleStage3Requests.forEach(req => {
            const key = getDeduplicationKey(req);
            if (key && !key.startsWith('unique_')) seenKeys.add(key);
        });

        return stage4Requests.filter(req => {
            if (req.repetido) return false;
            const key = getDeduplicationKey(req);
            if (key && !key.startsWith('unique_')) {
                if (seenKeys.has(key)) return false;
                seenKeys.add(key);
            }
            return true;
        });
    }, [stage4Requests, visibleStage3Requests, requiredDocs]);


    // --- Deduplication & Grouping Logic ---
    const groupedDocs = useMemo(() => {
        const pending = [];
        const processed = [];
        const ignored = [];

        const processItem = (item, type) => {
            const key = type === 'p2' ? item.id : (type === 'p3' ? `s3_${item.id}` : `s4_${item.id}`);
            const state = docStates[key];
            const isSent = state?.enviado || item.req?.enviado; // item.req might be available for P2, direct for P3/P4
            const isSkipped = state?.status === 'skipped';

            // Wrapper object for rendering
            const wrapper = {
                key,
                type,
                data: item,
                state: state
            };

            if (isSkipped) ignored.push(wrapper);
            else if (isSent) processed.push(wrapper);
            else pending.push(wrapper);
        };

        // Phase 2
        requiredDocs.forEach(doc => processItem(doc, 'p2'));
        // Phase 3
        visibleStage3Requests.forEach(req => processItem(req, 'p3'));
        // Phase 4
        visibleStage4Requests.forEach(req => processItem(req, 'p4'));

        return { pending, processed, ignored };
    }, [requiredDocs, visibleStage3Requests, visibleStage4Requests, docStates]);


    const totalDocs = requiredDocs.length + stage2Requests.length + visibleStage3Requests.length + visibleStage4Requests.length;
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

    const handleDeleteDocument = async (docId, dbId) => {
        try {
            setDocStates(prev => ({
                ...prev,
                [docId]: {
                    ...prev[docId],
                    status: 'pending',
                    error: null,
                    file: null,
                    enviado: false
                }
            }));
            setIsDocsSaved(false);

            if (dbId) {
                const { error } = await supabase
                    .from('solicitud_documentos')
                    .update({
                        estado: 'Pendiente',
                        documento_url: null,
                        subido: false,
                        enviado: false
                    })
                    .eq('id', dbId);

                if (error) throw error;
            }
            toast.success('Documento eliminado correctamente');
        } catch (error) {
            console.error('Error deleting document:', error);
            toast.error('Error al eliminar documento');
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
                let fileName = `${operationId}_${key}_${state.dbId}.${extension}`;

                // If we have a label, we use a cleaner name
                if (state.label) {
                    const cleanLabel = state.label.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, '');
                    fileName = `${cleanLabel}_${operationId}_${state.dbId}.${extension}`;
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
                    if (lowT.includes('plano') || lowTy.includes('plano')) return 2;
                    if (lowT.includes('rol') || lowTy.includes('rol')) return 2;

                    // Phase 3 / Titles
                    if (lowT.includes('titulo') || lowTy.includes('titulo') ||
                        lowT.includes('herencia') || lowTy.includes('herencia') ||
                        lowT.includes('escritura') || lowTy.includes('escritura') ||
                        lowT.includes('constitucion') || lowTy.includes('constitucion') ||
                        lowT.includes('anterior') || lowTy.includes('anterior')) return 3;

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
                const cleanName = doc.dbType || doc.table || 'documento';

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
            // Consolidated flow: 2 (Docs) -> 3 (Final/Identity) or Finish
            if (currentStep === 2) {
                if (stage4Requests.length > 0) setCurrentStep(3);
            }
            // Start analysis state
            setIsAnalysisInProgress(true);

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

    const handleStartTitleStudy = async () => {
        setIsTitleStudyLoading(true);
        const toastId = toast.loading('Iniciando estudio de título...');

        try {
            // 1. Gather inscription data (FDIN)
            // We prioritize the 'ocr_dominio_vigente' document request or the 'ocr_inscripcion_dominio' if available
            const dominioDoc = requiredDocs.find(d => d.req?.tipo_documento?.includes('dominio') || d.req?.nombre_documento?.toLowerCase().includes('vigencia'));

            let fdin = {
                fojas: dominioDoc?.req?.propiedad_fojas,
                numero: dominioDoc?.req?.propiedad_numero,
                anio: dominioDoc?.req?.propiedad_anio,
            };

            // Fallback to what we have in metadata? (But we don't really have it in metadata cleanly yet, relying on docs)

            const payload = {
                user_id: user?.id,
                estudio_id: studyId,
                nombre_propiedad: propertyName,
                tipo_propiedad: propertyType,
                fdin: fdin
            };

            console.log('Starting Title Study with payload:', payload);

            console.log('Invoking start-title-study function...');
            const { data: result, error: invokeError } = await supabase.functions.invoke('start-title-study', {
                body: payload
            });

            console.log('Invoke finished. Error:', invokeError);
            console.log('Invoke finished. Result:', result);

            if (invokeError) {
                console.error("Invoke Error Details:", invokeError);
                throw new Error(`Error invocando función: ${invokeError.message}`);
            }

            if (result?.error) {
                console.error("Function Result Error:", result.error);
                throw new Error(`Error en función: ${result.error}`);
            }

            console.log("Function Result SUCCESS:", result);
            if (result?.railwayResponse) {
                console.log("Railway Webhook Response Body:", result.railwayResponse);
            }

            // 2. Update Local State & DB
            await supabase
                .from('estudios_titulos')
                .update({ estado: 'En Escritura' })
                .eq('id', studyId);

            setIsTitleStudyStarted(true);
            toast.success('Estudio de título iniciado correctamente', { id: toastId });

        } catch (error) {
            console.error('Error starting title study:', error);
            toast.error(`Error al iniciar estudio: ${error.message}`, { id: toastId });
        } finally {
            setIsTitleStudyLoading(false);
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
                            onClick={() => fetchOperationData()}
                            disabled={isRefreshing}
                            className={`text-slate-500 hover:text-slate-700 font-medium flex items-center gap-1 ${isRefreshing ? 'animate-pulse' : ''}`}
                        >
                            <Clock size={14} className={isRefreshing ? 'animate-spin' : ''} />
                            Refrescar
                        </button>
                        <button
                            onClick={() => navigate('/panel/dashboard')}
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
                {isAnalysisInProgress && (
                    <div className="mb-6 bg-blue-600/10 border border-blue-200 rounded-2xl p-5 flex items-center justify-between animate-in fade-in zoom-in duration-500">
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <div className="absolute inset-0 bg-blue-400 rounded-full animate-ping opacity-25"></div>
                                <div className="relative bg-blue-600 text-white p-2.5 rounded-full shadow-lg shadow-blue-200">
                                    <Clock size={22} className="animate-[spin_4s_linear_infinite]" />
                                </div>
                            </div>
                            <div>
                                <h3 className="font-bold text-blue-900 leading-tight">Análisis en Progreso</h3>
                                <p className="text-blue-700/80 text-sm">Nuestro sistema está revisando tus documentos...</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                            <button
                                onClick={() => fetchOperationData()}
                                className="bg-white px-4 py-2 rounded-xl text-xs font-bold text-blue-600 hover:bg-blue-50 transition-all border border-blue-100 shadow-sm flex items-center gap-2"
                            >
                                <Clock size={12} className={isRefreshing ? 'animate-spin' : ''} />
                                Refrescar ahora
                            </button>
                        </div>
                    </div>
                )}
                <div className="mb-8 flex justify-between items-end">
                    <div>
                        <div className="flex items-center gap-4 mb-2">
                            <h1 className="text-3xl font-bold text-slate-900">
                                {operacionId === 'nuevo' ? 'Nuevo Estudio de Títulos' : `Estudio #${operationId}`}
                            </h1>
                            {(() => {
                                const uploadedCount = Object.values(docStates).filter(s => s.status === 'uploaded').length;
                                const showButton = (currentStep === 2 || currentStep === 3) && !isTitleStudyStarted && uploadedCount > 0;
                                console.log(`DEBUG BUTTON: Step=${currentStep}, Started=${isTitleStudyStarted}, Uploaded=${uploadedCount}, Show=${showButton}`);
                                if (!showButton) return null;
                                return (
                                    <button
                                        onClick={handleStartTitleStudy}
                                        disabled={isTitleStudyLoading}
                                        className="bg-indigo-600 text-white px-3 py-1.5 rounded-lg font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all flex items-center gap-2 text-sm active:scale-95"
                                    >
                                        {isTitleStudyLoading ? 'Iniciando...' : 'Iniciar estudio de título'} <Play size={14} fill="currentColor" />
                                    </button>
                                );
                            })()}
                        </div>
                        <p className="text-slate-500">
                            {currentStep === 1 ? 'Paso 1: Configuración de la propiedad' :
                                currentStep === 2 ? 'Paso 2: Carga de documentación y títulos' :
                                    (visibleStage4Requests.some(r => r.estado !== 'Completado') ? 'Paso 3: Documentación final (Identidad y Estado Civil)' : 'Paso 3: Revisión final')}
                        </p>
                    </div>
                    {currentStep === 2 && (
                        <div className="flex items-center gap-3">

                            <button
                                onClick={() => {
                                    setCurrentStep(1);
                                }}
                                className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors"
                            >
                                <ArrowLeft size={16} /> Volver a configuración
                            </button>
                        </div>
                    )}
                </div>

                <StatusPanel
                    currentStep={currentStep}
                    progress={completedCount}
                    total={totalDocs}

                    stage3Requests={visibleStage3Requests}
                    stage4Requests={visibleStage4Requests}
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
                ) : !isTitleStudyStarted ? (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                        {/* Unified Document Management View */}
                        <div className="bg-amber-50 border border-amber-100 p-4 rounded-xl mb-6 flex items-start gap-3">
                            <AlertCircle className="text-amber-500 mt-0.5 shrink-0" size={18} />
                            <p className="text-sm text-amber-800 leading-relaxed">
                                <strong>Gestión de Documentos.</strong> Sube los antecedentes solicitados. A medida que avancemos, podrían aparecer nuevos requerimientos del analista.
                            </p>
                        </div>

                        {/* PENDING DOCUMENTS */}
                        <DocumentSection
                            title="Documentos Pendientes"
                            count={groupedDocs.pending.length}
                            defaultOpen={true}
                            icon={Clock}
                            className="border-blue-100 shadow-blue-50"
                        >
                            {groupedDocs.pending.map((item) => {
                                if (item.type === 'p2') {
                                    return (
                                        <SmartUploadCard
                                            key={item.key}
                                            doc={item.data}
                                            status={docStates[item.key]?.status || 'pending'}
                                            file={docStates[item.key]?.file}
                                            error={docStates[item.key]?.error}
                                            onUpload={handleUpload}
                                            onSkip={handleSkipDocument}
                                            onDelete={handleDeleteDocument}
                                        />
                                    );
                                } else {
                                    return (
                                        <Stage3UploadCard
                                            key={item.key}
                                            docId={item.key}
                                            req={item.data}
                                            docState={docStates[item.key]}
                                            onUpload={handleUpload}
                                            isSubmitting={isSubmitting}
                                            onSkip={handleSkipDocument}
                                            onDelete={handleDeleteDocument}
                                        />
                                    );
                                }
                            })}
                        </DocumentSection>

                        {/* PROCESSED DOCUMENTS */}
                        <DocumentSection
                            title="Documentos Procesados y Enviados"
                            count={groupedDocs.processed.length}
                            defaultOpen={false}
                            icon={CheckCircle}
                            className="border-green-100 shadow-green-50"
                        >
                            {groupedDocs.processed.map((item) => {
                                if (item.type === 'p2') {
                                    return (
                                        <SmartUploadCard
                                            key={item.key}
                                            doc={item.data}
                                            status={docStates[item.key]?.status || 'uploaded'}
                                            file={docStates[item.key]?.file}
                                            error={docStates[item.key]?.error}
                                            onUpload={handleUpload}
                                            onSkip={handleSkipDocument}
                                            onDelete={handleDeleteDocument}
                                        />
                                    );
                                } else {
                                    return (
                                        <Stage3UploadCard
                                            key={item.key}
                                            docId={item.key}
                                            req={item.data}
                                            docState={docStates[item.key]}
                                            onUpload={handleUpload}
                                            isSubmitting={isSubmitting}
                                            onSkip={handleSkipDocument}
                                            onDelete={handleDeleteDocument}
                                        />
                                    );
                                }
                            })}
                        </DocumentSection>

                        {/* NOT USEFUL / IGNORED DOCUMENTS */}
                        <DocumentSection
                            title="Documentos No Útiles / Excluidos"
                            count={groupedDocs.ignored.length}
                            defaultOpen={false}
                            icon={XCircle}
                            className="opacity-80"
                        >
                            {groupedDocs.ignored.map((item) => {
                                if (item.type === 'p2') {
                                    return (
                                        <SmartUploadCard
                                            key={item.key}
                                            doc={item.data}
                                            status={docStates[item.key]?.status || 'skipped'}
                                            file={docStates[item.key]?.file}
                                            error={docStates[item.key]?.error}
                                            onUpload={handleUpload}
                                            onSkip={handleSkipDocument}
                                            onDelete={handleDeleteDocument}
                                        />
                                    );
                                } else {
                                    return (
                                        <Stage3UploadCard
                                            key={item.key}
                                            docId={item.key}
                                            req={item.data}
                                            docState={docStates[item.key]}
                                            onUpload={handleUpload}
                                            isSubmitting={isSubmitting}
                                            onSkip={handleSkipDocument}
                                            onDelete={handleDeleteDocument}
                                        />
                                    );
                                }
                            })}
                        </DocumentSection>

                        {groupedDocs.pending.length === 0 && groupedDocs.processed.length === 0 && (
                            <div className="p-8 text-center text-slate-400 border-2 border-dashed border-slate-200 rounded-xl">
                                No se requieren documentos por ahora.
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
                ) : null}

                {/* READ ONLY VIEW FOR "EN ESCRITURA" */}
                {currentStep === 2 && isTitleStudyStarted && (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                        <div className="bg-green-50 border border-green-100 p-6 rounded-xl mb-8 flex flex-col items-center text-center gap-4">
                            <div className="bg-green-100 p-3 rounded-full text-green-600 mb-2">
                                <Play size={32} />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-green-900 mb-1">Fase de Escritura Iniciada</h2>
                                <p className="text-green-700">
                                    Se ha notificado al equipo legal. Los documentos ya no pueden ser modificados.
                                    Pronto recibirás el informe preliminar.
                                </p>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                            <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center gap-2">
                                <FileCheck className="text-slate-500" size={18} />
                                <h3 className="font-bold text-slate-700">Documentos Cargados</h3>
                            </div>
                            <div className="divide-y divide-slate-100">
                                {[...requiredDocs, ...visibleStage3Requests, ...visibleStage4Requests]
                                    .filter(d => {
                                        const status = docStates[d.id || `s3_${d.id}` || `s4_${d.id}`]?.status;
                                        return status === 'uploaded';
                                    })
                                    .map((doc, idx) => {
                                        const state = docStates[doc.id || `s3_${doc.id}` || `s4_${doc.id}`];
                                        return (
                                            <div key={idx} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                                                <div className="flex items-center gap-3">
                                                    <div className="bg-blue-50 text-blue-600 p-2 rounded-lg">
                                                        <FileText size={18} />
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-slate-900 text-sm">{doc.label || doc.nombre_documento}</p>
                                                        <p className="text-xs text-slate-500">{doc.description || doc.detalle || 'Documento adjunto'}</p>
                                                    </div>
                                                </div>
                                                {state?.file ? (
                                                    <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full border border-green-100">
                                                        Nuevo (Local)
                                                    </span>
                                                ) : (
                                                    <a
                                                        href={doc.req?.documento_url || '#'}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium"
                                                    >
                                                        <Eye size={16} /> Ver
                                                    </a>
                                                )}
                                            </div>
                                        );
                                    })}
                            </div>
                            {[...requiredDocs, ...visibleStage3Requests, ...visibleStage4Requests]
                                .filter(d => {
                                    const status = docStates[d.id || `s3_${d.id}` || `s4_${d.id}`]?.status;
                                    return status === 'uploaded';
                                }).length === 0 && (
                                    <div className="p-8 text-center text-slate-400 italic">
                                        No se han cargado documentos en este estudio.
                                    </div>
                                )}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

import React, { useState, useEffect, useRef } from 'react';
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
  Scroll
} from 'lucide-react';
import { Toaster, toast } from 'sonner';
import { supabase } from './lib/supabase';

// --- Constants & Config ---

const REQUIRED_DOCUMENTS = [
  {
    id: 'escrituras',
    label: 'Escrituras de Compraventa',
    description: 'Títulos de dominio hasta 10 años. Copia autorizada o digital con firma electrónica.',
    icon: Scroll,
  },
  {
    id: 'inscripciones',
    label: 'Inscripciones CBR',
    description: 'Copias de inscripciones de dominio con vigencia (10 años).',
    icon: Landmark,
  },
  {
    id: 'vigencia',
    label: 'Certificado de Vigencia',
    description: 'Certificado de Vigencia al día. No anterior a 60 días.',
    alert: 'No anterior a 60 días',
    icon: FileCheck,
  },
  {
    id: 'gravamenes',
    label: 'Gravámenes y Prohibiciones',
    description: 'Certificado de GP (30 años). No anterior a 60 días.',
    alert: 'No anterior a 60 días',
    icon: ShieldCheck,
  },
  {
    id: 'recepcion',
    label: 'Recepción Final',
    description: 'Certificado de Recepción Final Municipal.',
    icon: Building,
  },
  {
    id: 'contribuciones',
    label: 'Deuda de Contribuciones',
    description: 'Certificado de Deuda Tesorería General.',
    icon: FileText,
  },
  {
    id: 'expropiacion_muni',
    label: 'No Expropiación Municipal',
    description: 'Certificado emitido por la Municipalidad.',
    icon: LandPlotIcon, // Helper component below
  },
  {
    id: 'expropiacion_serviu',
    label: 'No Expropiación SERVIU',
    description: 'Certificado emitido por SERVIU.',
    icon: LandPlotIcon,
  }
];

function LandPlotIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 8-6-3-6 3v10l6 3 6-3 6 3 6-3V5l-6 3Z" />
      <path d="M12 21V8" />
    </svg>
  );
}

// --- Components ---

// --- Components ---

const StatusPanel = ({ progress, total }) => {
  const percentage = Math.round((progress / total) * 100);

  const steps = [
    { label: 'Recopilación', status: 'current' },
    { label: 'Análisis Automático', status: 'pending' },
    { label: 'Revisión', status: 'pending' },
    { label: 'Informe', status: 'pending' }
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <div>
          <h2 className="text-lg font-semibold text-slate-800">Estado del Estudio</h2>
          <p className="text-slate-500 text-sm">Progreso de la carpeta legal</p>
        </div>
        <div className="flex items-center gap-4 mt-4 md:mt-0 w-full md:w-auto">
          <div className="flex-1 md:w-64 h-3 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 transition-all duration-700 ease-out"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <span className="font-bold text-blue-700">{percentage}%</span>
        </div>
      </div>

      <div className="flex justify-between items-center text-sm relative">
        {/* Simple Step Visualization */}
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -z-0"></div>
        {steps.map((step, idx) => (
          <div key={idx} className="relative z-10 flex flex-col items-center gap-2 bg-white px-2">
            <div className={`w-3 h-3 rounded-full ${idx === 0 ? 'bg-blue-600 ring-4 ring-blue-50' : 'bg-slate-300'}`} />
            <span className={`${idx === 0 ? 'text-blue-700 font-medium' : 'text-slate-400'}`}>
              {step.label}
            </span>
          </div>
        ))}
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

  // Status Visuals
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
            {/* Status Icons */}
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

// --- Main App ---

export default function App() {
  const [docStates, setDocStates] = useState(() => {
    // Initialize state map
    const initial = {};
    REQUIRED_DOCUMENTS.forEach(doc => {
      initial[doc.id] = { status: 'pending', error: null, file: null };
    });
    return initial;
  });

  const [isSubmitting, setIsSubmitting] = useState(false);


  useEffect(() => {
    console.log('Supabase Client:', supabase);
    // Optional: Test connection
    // supabase.from('projects').select('*').limit(1).then(({ data, error }) => console.log('Test Query:', { data, error }));
  }, []);

  const completedCount = Object.values(docStates).filter(s => s.status === 'uploaded').length;

  const handleUpload = (docId, file) => {
    setDocStates(prev => ({
      ...prev,
      [docId]: { status: 'uploaded', error: null, file: file }
    }));
    toast.success(`Documento "${file.name}" preparado para el envío`);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const operationId = '8492';
    const toastId = toast.loading('Subiendo y registrando documentos...');

    try {
      const documentUrls = {};

      // 1. Upload all files and collect URLs
      for (const [docId, state] of Object.entries(docStates)) {
        if (!state.file) continue;

        const file = state.file;
        const extension = file.name.split('.').pop();
        const fileName = `${operationId}_${docId}.${extension}`;
        const filePath = `${operationId}/${fileName}`;

        const { error: storageError } = await supabase.storage
          .from('legal_documents')
          .upload(filePath, file, { upsert: true });

        if (storageError) throw storageError;

        const { data: { publicUrl } } = supabase.storage
          .from('legal_documents')
          .getPublicUrl(filePath);

        documentUrls[docId] = publicUrl;
      }

      // 2. Register a single row in 'antecedentes_generales_doc'
      const { data, error: dbError } = await supabase
        .from('antecedentes_generales_doc')
        .insert({
          numero_operacion: operationId,
          escrituras: documentUrls['escrituras'],
          inscripciones: documentUrls['inscripciones'],
          vigencia: documentUrls['vigencia'],
          gravamenes: documentUrls['gravamenes'],
          recepcion: documentUrls['recepcion'],
          contribuciones: documentUrls['contribuciones'],
          expropiacion_muni: documentUrls['expropiacion_muni'],
          expropiacion_serviu: documentUrls['expropiacion_serviu'],
          estado: 'En Revisión'
        })
        .select()
        .single();

      if (dbError) throw dbError;

      // 3. (Optional) Also keep the individual records in req_propiedad for backward compatibility if needed,
      // or using the new 'data.id' as the main ref for other tables.
      const newMainId = data.id;
      console.log("Nuevo ID principal creado:", newMainId);

      toast.success(`Carpeta #${newMainId} enviada a revisión correctamente`, { id: toastId });
    } catch (error) {
      console.error("Submit error:", error);
      toast.error("Hubo un error al enviar los documentos. Por favor reintente.", { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      <Toaster position="top-right" richColors />

      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-900 text-white p-1.5 rounded-lg">
              <ShieldCheck size={20} />
            </div>
            <h1 className="font-bold text-slate-900 text-xl tracking-tight">LegalTrust <span className="text-slate-400 font-normal">| Estudio de Títulos</span></h1>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <span className="hidden md:inline text-slate-500">Operación #8492</span>
            <div className="h-8 w-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold text-xs ring-2 ring-white shadow-sm">
              JS
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-6 py-8">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Nuevo Estudio de Títulos</h1>
          <p className="text-slate-500">Sube la documentación requerida para iniciar el análisis legal de la propiedad.</p>
        </div>

        <StatusPanel progress={completedCount} total={REQUIRED_DOCUMENTS.length} />

        <div className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-700 flex items-center gap-2">
              <FileText size={18} />
              Carpeta Legal
            </h3>
            <span className="text-xs font-medium bg-slate-200 text-slate-600 px-2 py-1 rounded-full">
              {completedCount} / {REQUIRED_DOCUMENTS.length} Requeridos
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {REQUIRED_DOCUMENTS.map(doc => (
              <SmartUploadCard
                key={doc.id}
                doc={doc}
                status={docStates[doc.id].status}
                error={docStates[doc.id].error}
                onUpload={handleUpload}
              />
            ))}
          </div>
        </div>

        {completedCount === REQUIRED_DOCUMENTS.length && (
          <div className="mt-8 p-6 bg-blue-900 rounded-xl text-white text-center animate-in fade-in zoom-in-95 duration-500">
            <CheckCircle className="mx-auto mb-4 text-blue-300" size={48} />
            <h3 className="text-2xl font-bold mb-2">Carpeta Completa</h3>
            <p className="text-blue-200 mb-6">Toda la documentación ha sido cargada y validada preliminarmente. El análisis automático comenzará en breve.</p>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-white text-blue-900 px-6 py-3 rounded-lg font-bold hover:bg-blue-50 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 mx-auto"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-900"></div>
                  Enviando...
                </>
              ) : (
                'Enviar a Revisión'
              )}
            </button>

          </div>
        )}

      </main>
    </div>
  );
}

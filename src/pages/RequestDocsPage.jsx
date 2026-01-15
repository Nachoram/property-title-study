import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Toaster, toast } from 'sonner';
import { Search, Plus, FileText, User, Trash2, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RequestDocsPage = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [studies, setStudies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedStudy, setSelectedStudy] = useState(null);
    const [requests, setRequests] = useState([]);

    // Form state
    const [form, setForm] = useState({
        nombre_documento: '',
        detalle: '',
        nombre_persona: '',
        rut_persona: '',
        tipo_documento: 'legal',
        propiedad_fojas: '',
        propiedad_numero: '',
        propiedad_anio: '',
        propiedad_comuna: ''
    });

    useEffect(() => {
        fetchStudies();
    }, []);

    useEffect(() => {
        if (selectedStudy) {
            fetchRequests(selectedStudy.numero_operacion);

            // Subscribe to changes
            const channel = supabase
                .channel('admin-requests')
                .on(
                    'postgres_changes',
                    {
                        event: '*',
                        schema: 'public',
                        table: 'solicitud_documentos',
                        filter: `operacion_id=eq.${selectedStudy.numero_operacion}`
                    },
                    (payload) => {
                        fetchRequests(selectedStudy.numero_operacion);
                    }
                )
                .subscribe();

            return () => {
                supabase.removeChannel(channel);
            };
        }
    }, [selectedStudy]);

    const fetchStudies = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('estudios_titulos')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(20);

        if (error) {
            toast.error('Error al cargar estudios');
            console.error(error);
        } else {
            setStudies(data || []);
        }
        setLoading(false);
    };

    const fetchRequests = async (operacionId) => {
        const { data, error } = await supabase
            .from('solicitud_documentos')
            .select('*')
            .eq('operacion_id', operacionId)
            .order('created_at', { ascending: true });

        if (error) {
            console.error(error);
        } else {
            setRequests(data || []);
        }
    };

    const handleCreateRequest = async (e) => {
        e.preventDefault();
        if (!selectedStudy) return;

        const newRequest = {
            estudio_id: selectedStudy.id,
            operacion_id: selectedStudy.numero_operacion,
            user_id: selectedStudy.user_id,
            nombre_documento: form.nombre_documento,
            detalle: form.detalle,
            nombre_persona: form.nombre_persona,
            rut_persona: form.rut_persona,
            tipo_documento: form.tipo_documento,
            propiedad_fojas: form.propiedad_fojas,
            propiedad_numero: form.propiedad_numero,
            propiedad_anio: form.propiedad_anio,
            propiedad_comuna: form.propiedad_comuna,
            estado: 'Pendiente',
            subido: false
        };

        const { data, error } = await supabase
            .from('solicitud_documentos')
            .insert(newRequest)
            .select();

        if (error) {
            toast.error('Error al crear solicitud: ' + error.message);
        } else {
            // Also update the study status to 'Observaciones'
            await supabase
                .from('estudios_titulos')
                .update({ estado: 'Observaciones' })
                .eq('id', selectedStudy.id);

            toast.success('Solicitud creada correctamente');
            setForm({
                nombre_documento: '',
                detalle: '',
                nombre_persona: '',
                rut_persona: '',
                tipo_documento: 'legal',
                propiedad_fojas: '',
                propiedad_numero: '',
                propiedad_anio: '',
                propiedad_comuna: ''
            });
        }
    };

    const handleDeleteRequest = async (id) => {
        if (!confirm('¿Estás seguro de eliminar esta solicitud?')) return;

        const { error } = await supabase
            .from('solicitud_documentos')
            .delete()
            .eq('id', id);

        if (error) {
            toast.error('Error al eliminar');
        } else {
            toast.success('Solicitud eliminada');
        }
    };

    const filteredStudies = studies.filter(s =>
        s.numero_operacion?.includes(searchTerm) ||
        s.nombre_propiedad?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-slate-50 p-6">
            <Toaster position="top-right" />

            <div className="max-w-6xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <button onClick={() => navigate('/dashboard')} className="p-2 hover:bg-white rounded-full transition-colors">
                        <ArrowLeft />
                    </button>
                    <h1 className="text-2xl font-bold text-slate-900">Gestor de Solicitudes (Admin)</h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Sidebar: List of Studies */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-[80vh]">
                        <div className="p-4 border-b border-slate-100 bg-slate-50">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                <input
                                    type="text"
                                    placeholder="Buscar operación..."
                                    className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="overflow-y-auto flex-1 p-2 space-y-2">
                            {loading ? (
                                <div className="text-center py-4 text-slate-400">Cargando...</div>
                            ) : filteredStudies.map(study => (
                                <div
                                    key={study.id}
                                    onClick={() => setSelectedStudy(study)}
                                    className={`p-3 rounded-lg cursor-pointer transition-all ${selectedStudy?.id === study.id
                                        ? 'bg-blue-50 border-blue-200 ring-1 ring-blue-200'
                                        : 'hover:bg-slate-50 border border-transparent'
                                        }`}
                                >
                                    <div className="flex justify-between items-start mb-1">
                                        <span className="font-bold text-slate-700 text-sm">#{study.numero_operacion}</span>
                                        <span className={`text-[10px] px-2 py-0.5 rounded-full ${study.estado === 'Completado' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                                            }`}>{study.estado}</span>
                                    </div>
                                    <p className="text-xs text-slate-500 truncate">{study.nombre_propiedad}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Main Content: Requests Editor */}
                    <div className="md:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-[80vh]">
                        {selectedStudy ? (
                            <div className="flex flex-col h-full">
                                <div className="p-6 border-b border-slate-100 bg-white">
                                    <h2 className="text-xl font-bold text-slate-800 mb-1">Operación #{selectedStudy.numero_operacion}</h2>
                                    <p className="text-slate-500 text-sm">{selectedStudy.nombre_propiedad}</p>
                                </div>

                                <div className="flex-1 overflow-y-auto p-6 bg-slate-50">
                                    <div className="mb-6">
                                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Solicitudes Activas</h3>
                                        <div className="space-y-3">
                                            {requests.length === 0 ? (
                                                <div className="text-center py-8 text-slate-400 text-sm italic border-2 border-dashed border-slate-200 rounded-lg">
                                                    No hay solicitudes adicionales creadas
                                                </div>
                                            ) : requests.map(req => (
                                                <div key={req.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex justify-between items-center group hover:border-blue-200 transition-all">
                                                    <div className="flex items-start gap-3">
                                                        <div className={`p-2 rounded-lg ${req.subido ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'}`}>
                                                            <FileText size={18} />
                                                        </div>
                                                        <div>
                                                            <p className="font-bold text-slate-800 text-sm">{req.nombre_documento}</p>
                                                            <p className="text-xs text-slate-500 italic mb-1">{req.detalle || 'Sin detalles'}</p>
                                                            {(req.propiedad_fojas || req.propiedad_numero || req.propiedad_anio) && (
                                                                <p className="text-[10px] text-blue-600 font-medium mb-1">
                                                                    Fojas: {req.propiedad_fojas || '-'} | Num: {req.propiedad_numero || '-'} | Año: {req.propiedad_anio || '-'}
                                                                    {req.propiedad_comuna && ` | ${req.propiedad_comuna}`}
                                                                </p>
                                                            )}
                                                            <div className="flex gap-2 mt-1">
                                                                <span className="text-[10px] font-medium px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded">
                                                                    {req.nombre_persona || 'Generico'}
                                                                </span>
                                                                {req.subido && <span className="text-[10px] font-bold px-1.5 py-0.5 bg-green-50 text-green-600 rounded">SUBIDO</span>}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <button
                                                        onClick={() => handleDeleteRequest(req.id)}
                                                        className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="bg-white p-6 rounded-xl border border-blue-100 shadow-sm">
                                        <h3 className="text-sm font-bold text-blue-800 uppercase tracking-wider mb-4 flex items-center gap-2">
                                            <Plus size={16} /> Nueva Solicitud
                                        </h3>
                                        <form onSubmit={handleCreateRequest} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="col-span-2 md:col-span-1">
                                                <label className="block text-xs font-semibold text-slate-500 mb-1">Nombre Documento</label>
                                                <input
                                                    type="text"
                                                    required
                                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                                    placeholder="Ej: Certificado de Matrimonio"
                                                    value={form.nombre_documento}
                                                    onChange={e => setForm({ ...form, nombre_documento: e.target.value })}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-semibold text-slate-500 mb-1">Tipo Doc.</label>
                                                <select
                                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                                    value={form.tipo_documento}
                                                    onChange={e => setForm({ ...form, tipo_documento: e.target.value })}
                                                >
                                                    <option value="legal">Legal / Propiedad</option>
                                                    <option value="personal">Personal</option>
                                                    <option value="otro">Otro</option>
                                                </select>
                                            </div>

                                            {/* Property details section in form */}
                                            <div className="col-span-2 grid grid-cols-4 gap-3 bg-slate-50 p-3 rounded-lg border border-slate-100">
                                                <div>
                                                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Fojas</label>
                                                    <input
                                                        type="text"
                                                        className="w-full px-2 py-1.5 border border-slate-200 rounded text-sm outline-none focus:border-blue-400"
                                                        placeholder="1234"
                                                        value={form.propiedad_fojas}
                                                        onChange={e => setForm({ ...form, propiedad_fojas: e.target.value })}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Número</label>
                                                    <input
                                                        type="text"
                                                        className="w-full px-2 py-1.5 border border-slate-200 rounded text-sm outline-none focus:border-blue-400"
                                                        placeholder="5678"
                                                        value={form.propiedad_numero}
                                                        onChange={e => setForm({ ...form, propiedad_numero: e.target.value })}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Año</label>
                                                    <input
                                                        type="text"
                                                        className="w-full px-2 py-1.5 border border-slate-200 rounded text-sm outline-none focus:border-blue-400"
                                                        placeholder="2020"
                                                        value={form.propiedad_anio}
                                                        onChange={e => setForm({ ...form, propiedad_anio: e.target.value })}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Comuna</label>
                                                    <input
                                                        type="text"
                                                        className="w-full px-2 py-1.5 border border-slate-200 rounded text-sm outline-none focus:border-blue-400"
                                                        placeholder="Santiago"
                                                        value={form.propiedad_comuna}
                                                        onChange={e => setForm({ ...form, propiedad_comuna: e.target.value })}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-2">
                                                <label className="block text-xs font-semibold text-slate-500 mb-1">Detalle / Instrucción</label>
                                                <input
                                                    type="text"
                                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                                    placeholder="Ej: Año 1990 en adelante..."
                                                    value={form.detalle}
                                                    onChange={e => setForm({ ...form, detalle: e.target.value })}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-semibold text-slate-500 mb-1">Nombre Persona (Opcional)</label>
                                                <input
                                                    type="text"
                                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                                    placeholder="Nombre del titular"
                                                    value={form.nombre_persona}
                                                    onChange={e => setForm({ ...form, nombre_persona: e.target.value })}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-semibold text-slate-500 mb-1">RUT Persona (Opcional)</label>
                                                <input
                                                    type="text"
                                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                                    placeholder="11.111.111-1"
                                                    value={form.rut_persona}
                                                    onChange={e => setForm({ ...form, rut_persona: e.target.value })}
                                                />
                                            </div>
                                            <div className="col-span-2 pt-2">
                                                <button
                                                    type="submit"
                                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
                                                >
                                                    <Plus size={16} /> Crear Solicitud
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-slate-400">
                                <FileText size={48} className="mb-4 opacity-20" />
                                <p>Selecciona un estudio para gestionar sus solicitudes</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RequestDocsPage;

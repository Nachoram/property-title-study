import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import {
    ShieldCheck,
    Plus,
    FileText,
    Clock,
    CheckCircle,
    AlertCircle,
    ChevronRight,
    LogOut,
    User,
    Search,
    Filter,
    LayoutDashboard,
    FileCheck,
    Loader2
} from 'lucide-react';
import { Toaster, toast } from 'sonner';

const Dashboard = () => {
    const { user, profile, signOut, loading: authLoading } = useAuth();
    const navigate = useNavigate();

    const [estudios, setEstudios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [showUserMenu, setShowUserMenu] = useState(false);

    useEffect(() => {
        if (user) {
            fetchEstudios();
        }
    }, [user]);

    const fetchEstudios = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('estudios_titulos')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false });

            if (error) throw error;
            setEstudios(data || []);
        } catch (error) {
            console.error('Error fetching estudios:', error);
            toast.error('Error al cargar los estudios');
        } finally {
            setLoading(false);
        }
    };

    const handleSignOut = async () => {
        const { error } = await signOut();
        if (error) {
            toast.error('Error al cerrar sesión');
        } else {
            navigate('/panel/login');
        }
    };

    const getStatusConfig = (estado) => {
        const configs = {
            'En Documentación': {
                color: 'bg-amber-100 text-amber-700 border-amber-200',
                icon: Clock,
                progress: 25
            },
            'En Revisión': {
                color: 'bg-blue-100 text-blue-700 border-blue-200',
                icon: FileCheck,
                progress: 60
            },
            'Completado': {
                color: 'bg-green-100 text-green-700 border-green-200',
                icon: CheckCircle,
                progress: 100
            },
            'Observaciones': {
                color: 'bg-red-100 text-red-700 border-red-200',
                icon: AlertCircle,
                progress: 40
            }
        };
        return configs[estado] || configs['En Documentación'];
    };

    const getPropertyTypeLabel = (type) => {
        const types = {
            casa: 'Casa',
            departamento: 'Departamento',
            estacionamiento: 'Estacionamiento',
            bodega: 'Bodega',
            sitio_eriazo: 'Sitio Eriazo',
            parcela: 'Parcela',
            local_comercial: 'Local Comercial'
        };
        return types[type] || type;
    };

    const filteredEstudios = estudios.filter(estudio => {
        const matchesSearch = estudio.numero_operacion?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            estudio.tipo_propiedad?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterStatus === 'all' || estudio.estado === filterStatus;
        return matchesSearch && matchesFilter;
    });

    const stats = {
        total: estudios.length,
        enDocumentacion: estudios.filter(e => e.estado === 'En Documentación').length,
        enRevision: estudios.filter(e => e.estado === 'En Revisión').length,
        completados: estudios.filter(e => e.estado === 'Completado').length
    };

    if (authLoading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50">
            <Toaster position="top-right" richColors />

            {/* Header */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-900 text-white p-1.5 rounded-lg">
                            <ShieldCheck size={20} />
                        </div>
                        <h1 className="font-bold text-slate-900 text-xl tracking-tight">
                            LegalTrust <span className="text-slate-400 font-normal">| Dashboard</span>
                        </h1>
                    </div>

                    {/* User Menu */}
                    <div className="relative">
                        <button
                            onClick={() => setShowUserMenu(!showUserMenu)}
                            className="flex items-center gap-3 hover:bg-slate-50 rounded-xl px-3 py-2 transition-colors"
                        >
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-medium text-slate-900">
                                    {profile?.nombre || user?.email?.split('@')[0]}
                                </p>
                                <p className="text-xs text-slate-500">{user?.email}</p>
                            </div>
                            <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-full flex items-center justify-center font-bold text-sm ring-2 ring-white shadow-sm">
                                {profile?.nombre?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || 'U'}
                            </div>
                        </button>

                        {showUserMenu && (
                            <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-200 py-2 animate-in fade-in slide-in-from-top-2">
                                <div className="px-4 py-3 border-b border-slate-100">
                                    <p className="font-medium text-slate-900">{profile?.nombre} {profile?.apellido}</p>
                                    <p className="text-sm text-slate-500">{user?.email}</p>
                                </div>
                                <button
                                    onClick={handleSignOut}
                                    className="w-full px-4 py-2.5 text-left text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
                                >
                                    <LogOut size={18} />
                                    Cerrar sesión
                                </button>
                                <div className="border-t border-slate-100 my-1"></div>
                                <button
                                    onClick={() => navigate('/panel/admin/requests')}
                                    className="w-full px-4 py-2.5 text-left text-blue-600 hover:bg-blue-50 flex items-center gap-2 transition-colors text-sm font-medium"
                                >
                                    <ShieldCheck size={18} />
                                    Gestionar Solicitudes (Admin)
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-8">
                {/* Welcome Section */}
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-slate-900 mb-2">
                        ¡Hola, {profile?.nombre || 'Usuario'}! 👋
                    </h2>
                    <p className="text-slate-500">
                        Aquí puedes ver y gestionar todos tus estudios de títulos.
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-slate-100 rounded-lg">
                                <LayoutDashboard size={20} className="text-slate-600" />
                            </div>
                            <span className="text-sm font-medium text-slate-500">Total</span>
                        </div>
                        <p className="text-3xl font-bold text-slate-900">{stats.total}</p>
                    </div>

                    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-amber-100 rounded-lg">
                                <Clock size={20} className="text-amber-600" />
                            </div>
                            <span className="text-sm font-medium text-slate-500">En Documentación</span>
                        </div>
                        <p className="text-3xl font-bold text-amber-600">{stats.enDocumentacion}</p>
                    </div>

                    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <FileCheck size={20} className="text-blue-600" />
                            </div>
                            <span className="text-sm font-medium text-slate-500">En Revisión</span>
                        </div>
                        <p className="text-3xl font-bold text-blue-600">{stats.enRevision}</p>
                    </div>

                    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-green-100 rounded-lg">
                                <CheckCircle size={20} className="text-green-600" />
                            </div>
                            <span className="text-sm font-medium text-slate-500">Completados</span>
                        </div>
                        <p className="text-3xl font-bold text-green-600">{stats.completados}</p>
                    </div>
                </div>

                {/* Actions Bar */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    {/* Search */}
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        <input
                            type="text"
                            placeholder="Buscar por número de operación o tipo..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        />
                    </div>

                    {/* Filter */}
                    <div className="relative">
                        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="pl-10 pr-8 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
                        >
                            <option value="all">Todos los estados</option>
                            <option value="En Documentación">En Documentación</option>
                            <option value="En Revisión">En Revisión</option>
                            <option value="Completado">Completado</option>
                            <option value="Observaciones">Observaciones</option>
                        </select>
                    </div>

                    {/* New Study Button */}
                    <Link
                        to="/panel/estudio/nuevo"
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30"
                    >
                        <Plus size={20} />
                        Nuevo Estudio
                    </Link>
                </div>

                {/* Studies List */}
                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
                    </div>
                ) : filteredEstudios.length === 0 ? (
                    <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
                        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <FileText size={36} className="text-slate-400" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">
                            {estudios.length === 0 ? 'No tienes estudios aún' : 'Sin resultados'}
                        </h3>
                        <p className="text-slate-500 mb-6">
                            {estudios.length === 0
                                ? 'Crea tu primer estudio de títulos para comenzar'
                                : 'No se encontraron estudios con los filtros aplicados'
                            }
                        </p>
                        {estudios.length === 0 && (
                            <Link
                                to="/panel/estudio/nuevo"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all"
                            >
                                <Plus size={20} />
                                Crear Primer Estudio
                            </Link>
                        )}
                    </div>
                ) : (
                    <div className="space-y-4">
                        {filteredEstudios.map((estudio) => {
                            const statusConfig = getStatusConfig(estudio.estado);
                            const StatusIcon = statusConfig.icon;

                            return (
                                <Link
                                    key={estudio.id}
                                    to={`/panel/estudio/${estudio.numero_operacion}`}
                                    className="block bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg hover:border-blue-200 transition-all group"
                                >
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                        <div className="flex items-start gap-4">
                                            <div className="p-3 bg-slate-100 rounded-xl group-hover:bg-blue-50 transition-colors">
                                                <FileText size={24} className="text-slate-600 group-hover:text-blue-600 transition-colors" />
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-3 mb-1">
                                                    <h3 className="font-bold text-slate-900 text-lg">
                                                        Operación #{estudio.numero_operacion}
                                                    </h3>
                                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusConfig.color}`}>
                                                        <StatusIcon size={12} className="inline mr-1" />
                                                        {estudio.estado}
                                                    </span>
                                                </div>
                                                <p className="text-slate-500">
                                                    {getPropertyTypeLabel(estudio.tipo_propiedad)} • {estudio.finalidad_estudio}
                                                </p>
                                                <p className="text-sm text-slate-400 mt-1">
                                                    Creado: {new Date(estudio.created_at).toLocaleDateString('es-CL')}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4">
                                            {/* Progress Bar */}
                                            <div className="hidden sm:block w-32">
                                                <div className="flex justify-between text-xs text-slate-500 mb-1">
                                                    <span>Progreso</span>
                                                    <span>{statusConfig.progress}%</span>
                                                </div>
                                                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-blue-600 transition-all duration-500"
                                                        style={{ width: `${statusConfig.progress}%` }}
                                                    />
                                                </div>
                                            </div>

                                            <ChevronRight size={24} className="text-slate-300 group-hover:text-blue-500 transition-colors" />
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                )}
            </main>
        </div>
    );
};

export default Dashboard;

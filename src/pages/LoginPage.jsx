import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, Mail, Lock, Eye, EyeOff, AlertCircle, ArrowRight } from 'lucide-react';
import { Toaster, toast } from 'sonner';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const { signIn } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/panel/dashboard';

    const validateForm = () => {
        const newErrors = {};

        if (!email) {
            newErrors.email = 'El email es requerido';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Email inválido';
        }

        if (!password) {
            newErrors.password = 'La contraseña es requerida';
        } else if (password.length < 6) {
            newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);
        setErrors({});

        try {
            const { data, error } = await signIn(email, password);

            if (error) {
                if (error.message.includes('Invalid login credentials')) {
                    toast.error('Credenciales inválidas. Verifica tu email y contraseña.');
                } else if (error.message.includes('Email not confirmed')) {
                    toast.error('Por favor confirma tu email antes de iniciar sesión.');
                } else {
                    toast.error(error.message || 'Error al iniciar sesión');
                }
                return;
            }

            toast.success('¡Bienvenido de vuelta!');
            navigate(from, { replace: true });
        } catch (error) {
            console.error('Login error:', error);
            toast.error('Error inesperado. Intenta nuevamente.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex flex-col">
            <Toaster position="top-right" richColors />

            {/* Header */}
            <header className="p-6">
                <div className="flex items-center gap-3">
                    <div className="bg-white/10 backdrop-blur-sm text-white p-2 rounded-xl">
                        <ShieldCheck size={24} />
                    </div>
                    <h1 className="font-bold text-white text-xl tracking-tight">
                        LegalTrust <span className="text-blue-300 font-normal">| Estudios de Títulos</span>
                    </h1>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex items-center justify-center px-6 py-12">
                <div className="w-full max-w-md">
                    {/* Login Card */}
                    <div className="bg-white rounded-2xl shadow-2xl p-8 backdrop-blur-sm">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold text-slate-900 mb-2">Iniciar Sesión</h2>
                            <p className="text-slate-500">Accede a tu cuenta para ver tus estudios</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Email Field */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Correo electrónico
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="tu@email.com"
                                        autoComplete="email"
                                        className={`w-full pl-11 pr-4 py-3 bg-slate-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${errors.email ? 'border-red-300 bg-red-50' : 'border-slate-200'
                                            }`}
                                    />
                                </div>
                                {errors.email && (
                                    <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
                                        <AlertCircle size={14} /> {errors.email}
                                    </p>
                                )}
                            </div>

                            {/* Password Field */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Contraseña
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        autoComplete="current-password"
                                        className={`w-full pl-11 pr-12 py-3 bg-slate-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${errors.password ? 'border-red-300 bg-red-50' : 'border-slate-200'
                                            }`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                                {errors.password && (
                                    <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
                                        <AlertCircle size={14} /> {errors.password}
                                    </p>
                                )}
                            </div>

                            {/* Forgot Password Link */}
                            <div className="text-right">
                                <a href="#" className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors">
                                    ¿Olvidaste tu contraseña?
                                </a>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`w-full py-3.5 bg-blue-600 text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${isLoading
                                    ? 'opacity-70 cursor-not-allowed'
                                    : 'hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/25'
                                    }`}
                            >
                                {isLoading ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                        Iniciando sesión...
                                    </>
                                ) : (
                                    <>
                                        Iniciar Sesión <ArrowRight size={18} />
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Register Link */}
                        <div className="mt-8 pt-6 border-t border-slate-100 text-center">
                            <p className="text-slate-500">
                                ¿No tienes cuenta?{' '}
                                <Link
                                    to="/panel/register"
                                    className="text-blue-600 hover:text-blue-800 font-semibold transition-colors"
                                >
                                    Regístrate aquí
                                </Link>
                            </p>
                        </div>
                    </div>

                    {/* Footer */}
                    <p className="text-center text-blue-200/60 text-sm mt-8">
                        © 2024 LegalTrust. Todos los derechos reservados.
                    </p>
                </div>
            </main>
        </div>
    );
};

export default LoginPage;

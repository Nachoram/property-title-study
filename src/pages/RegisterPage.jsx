import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, Mail, Lock, Eye, EyeOff, AlertCircle, ArrowRight, User, Phone } from 'lucide-react';
import { Toaster, toast } from 'sonner';

const InputField = ({ name, label, type = 'text', icon: Icon, placeholder, value, onChange, error, showToggle = false, toggleValue, onToggle }) => (
    <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
            {label}
        </label>
        <div className="relative">
            <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
                type={showToggle ? (toggleValue ? 'text' : 'password') : type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                autoComplete={type === 'password' ? (name === 'confirmPassword' ? 'new-password' : 'new-password') : (name === 'email' ? 'email' : 'on')}
                className={`w-full pl-11 pr-${showToggle ? '12' : '4'} py-3 bg-slate-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${error ? 'border-red-300 bg-red-50' : 'border-slate-200'
                    }`}
            />
            {showToggle && (
                <button
                    type="button"
                    onClick={onToggle}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                    {toggleValue ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
            )}
        </div>
        {error && (
            <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle size={14} /> {error}
            </p>
        )}
    </div>
);

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        nombre: '',
        apellido: '',
        telefono: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const { signUp } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.nombre.trim()) {
            newErrors.nombre = 'El nombre es requerido';
        }

        if (!formData.apellido.trim()) {
            newErrors.apellido = 'El apellido es requerido';
        }

        if (!formData.email) {
            newErrors.email = 'El email es requerido';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email inválido';
        }

        if (!formData.password) {
            newErrors.password = 'La contraseña es requerida';
        } else if (formData.password.length < 6) {
            newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Confirma tu contraseña';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Las contraseñas no coinciden';
        }

        if (formData.telefono && !/^[+]?[\d\s-]{8,}$/.test(formData.telefono)) {
            newErrors.telefono = 'Formato de teléfono inválido';
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
            const { data, error } = await signUp(formData.email, formData.password, {
                nombre: formData.nombre,
                apellido: formData.apellido,
                telefono: formData.telefono
            });

            if (error) {
                if (error.message.includes('already registered')) {
                    toast.error('Este email ya está registrado. Intenta iniciar sesión.');
                } else {
                    toast.error(error.message || 'Error al crear la cuenta');
                }
                return;
            }

            toast.success('¡Cuenta creada exitosamente!');

            // Check if email confirmation is required
            if (data?.user?.identities?.length === 0) {
                toast.info('Por favor revisa tu email para confirmar tu cuenta.', { duration: 5000 });
                navigate('/login');
            } else {
                navigate('/dashboard');
            }
        } catch (error) {
            console.error('Register error:', error);
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
            <main className="flex-1 flex items-center justify-center px-6 py-8">
                <div className="w-full max-w-lg">
                    {/* Register Card */}
                    <div className="bg-white rounded-2xl shadow-2xl p-8 backdrop-blur-sm">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold text-slate-900 mb-2">Crear Cuenta</h2>
                            <p className="text-slate-500">Regístrate para gestionar tus estudios de títulos</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Name Fields Row */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <InputField
                                    name="nombre"
                                    label="Nombre"
                                    icon={User}
                                    placeholder="Juan"
                                    value={formData.nombre}
                                    onChange={handleChange}
                                    error={errors.nombre}
                                />
                                <InputField
                                    name="apellido"
                                    label="Apellido"
                                    icon={User}
                                    placeholder="Pérez"
                                    value={formData.apellido}
                                    onChange={handleChange}
                                    error={errors.apellido}
                                />
                            </div>

                            {/* Email Field */}
                            <InputField
                                name="email"
                                label="Correo electrónico"
                                type="email"
                                icon={Mail}
                                placeholder="tu@email.com"
                                value={formData.email}
                                onChange={handleChange}
                                error={errors.email}
                            />

                            {/* Phone Field */}
                            <InputField
                                name="telefono"
                                label="Teléfono (opcional)"
                                type="tel"
                                icon={Phone}
                                placeholder="+56 9 1234 5678"
                                value={formData.telefono}
                                onChange={handleChange}
                                error={errors.telefono}
                            />

                            {/* Password Fields */}
                            <InputField
                                name="password"
                                label="Contraseña"
                                icon={Lock}
                                placeholder="Mínimo 6 caracteres"
                                showToggle
                                toggleValue={showPassword}
                                onToggle={() => setShowPassword(!showPassword)}
                                value={formData.password}
                                onChange={handleChange}
                                error={errors.password}
                            />

                            <InputField
                                name="confirmPassword"
                                label="Confirmar contraseña"
                                icon={Lock}
                                placeholder="Repite tu contraseña"
                                showToggle
                                toggleValue={showConfirmPassword}
                                onToggle={() => setShowConfirmPassword(!showConfirmPassword)}
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                error={errors.confirmPassword}
                            />

                            {/* Terms */}
                            <div className="flex items-start gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                                <input
                                    type="checkbox"
                                    id="terms"
                                    required
                                    className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                />
                                <label htmlFor="terms" className="text-sm text-slate-600">
                                    Acepto los{' '}
                                    <a href="#" className="text-blue-600 hover:underline font-medium">
                                        Términos de Servicio
                                    </a>{' '}
                                    y la{' '}
                                    <a href="#" className="text-blue-600 hover:underline font-medium">
                                        Política de Privacidad
                                    </a>
                                </label>
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
                                        Creando cuenta...
                                    </>
                                ) : (
                                    <>
                                        Crear Cuenta <ArrowRight size={18} />
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Login Link */}
                        <div className="mt-8 pt-6 border-t border-slate-100 text-center">
                            <p className="text-slate-500">
                                ¿Ya tienes cuenta?{' '}
                                <Link
                                    to="/login"
                                    className="text-blue-600 hover:text-blue-800 font-semibold transition-colors"
                                >
                                    Inicia sesión
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

export default RegisterPage;

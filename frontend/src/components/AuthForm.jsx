import React, { useState } from 'react';
import { Eye, EyeOff, Loader2, AlertCircle, CheckCircle2, Zap } from 'lucide-react';
import { loginUser, registerUser, saveToken, saveUser } from '../utils/api';

export default function AuthForm({ onAuthSuccess }) {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ full_name: '', email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleInputChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
        setError(null);
    };

    const handleTabChange = (loginTab) => {
        setIsLogin(loginTab);
        setError(null);
        setSuccess(null);
        setFormData({ full_name: '', email: '', password: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setSuccess(null);

        try {
            if (isLogin) {
                const response = await loginUser({ email: formData.email, password: formData.password });
                setSuccess('Authenticated! Loading your workspace...');
                saveToken(response.data.token);
                saveUser(response.data.user);
                setTimeout(() => onAuthSuccess(response.data.user), 900);
            } else {
                const response = await registerUser(formData);
                setSuccess('Account created! Taking you in...');
                saveToken(response.data.token);
                saveUser(response.data.user);
                setTimeout(() => onAuthSuccess(response.data.user), 900);
            }
        } catch (err) {
            setError(err.message || 'Something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative">
            {/* Background glow orbs */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-600/8 rounded-full blur-3xl pointer-events-none" />

            <div className="w-full max-w-md animate-fade-in-up">
                {/* Logo Area */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 mb-5 shadow-2xl shadow-indigo-500/30 animate-float">
                        <Zap className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-black text-white tracking-tight mb-2">
                        Task<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Flow</span>
                    </h1>
                    <p className="text-slate-400 text-sm font-medium">
                        {isLogin ? 'Sign in to your workspace' : 'Create your workspace account'}
                    </p>
                </div>

                {/* Auth Card */}
                <div className="glass rounded-3xl p-8 shadow-2xl">
                    {/* Tab Switch */}
                    <div className="flex bg-black/30 rounded-2xl p-1.5 mb-8 border border-white/5">
                        {[{ label: 'Sign In', val: true }, { label: 'Register', val: false }].map(tab => (
                            <button
                                key={tab.label}
                                type="button"
                                onClick={() => handleTabChange(tab.val)}
                                className={`flex-1 py-2.5 text-sm font-semibold rounded-xl transition-all duration-300 ${
                                    isLogin === tab.val
                                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/20'
                                        : 'text-slate-400 hover:text-slate-200'
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Alerts */}
                    {error && (
                        <div className="mb-5 p-4 rounded-2xl bg-red-500/8 border border-red-500/20 flex items-start gap-3 animate-scale-in">
                            <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                            <p className="text-red-300 text-sm font-medium">{error}</p>
                        </div>
                    )}
                    {success && (
                        <div className="mb-5 p-4 rounded-2xl bg-emerald-500/8 border border-emerald-500/20 flex items-start gap-3 animate-scale-in">
                            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                            <p className="text-emerald-300 text-sm font-medium">{success}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Full Name */}
                        {!isLogin && (
                            <div className="space-y-2">
                                <label className="text-xs font-semibold tracking-widest text-slate-400 uppercase" htmlFor="full_name">Full Name</label>
                                <input
                                    id="full_name" name="full_name" type="text" required
                                    value={formData.full_name}
                                    onChange={handleInputChange}
                                    placeholder="John Doe"
                                    className="input-base"
                                />
                            </div>
                        )}

                        {/* Email */}
                        <div className="space-y-2">
                            <label className="text-xs font-semibold tracking-widest text-slate-400 uppercase" htmlFor="email">Email</label>
                            <input
                                id="email" name="email" type="email" required
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="you@example.com"
                                className="input-base"
                                autoComplete="off"
                            />
                        </div>

                        {/* Password */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label className="text-xs font-semibold tracking-widest text-slate-400 uppercase" htmlFor="password">Password</label>
                                {isLogin && <a href="#forgot" className="text-xs text-indigo-400 hover:text-indigo-300 font-medium">Forgot?</a>}
                            </div>
                            <div className="relative">
                                <input
                                    id="password" name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    placeholder="••••••••"
                                    className="input-base pr-12"
                                    autoComplete="new-password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        {/* Submit */}
                        <button type="submit" disabled={isLoading} className="btn-primary w-full mt-2 flex items-center justify-center gap-2 text-sm">
                            {isLoading ? (
                                <><Loader2 className="w-4 h-4 animate-spin" /> {isLogin ? 'Authenticating...' : 'Creating account...'}</>
                            ) : (
                                isLogin ? 'Sign In to Workspace' : 'Create Account'
                            )}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="mt-7 pt-6 border-t border-white/5 text-center">
                        <p className="text-xs text-slate-500">
                            {isLogin ? "Don't have an account? " : "Already have an account? "}
                            <button
                                type="button"
                                onClick={() => handleTabChange(!isLogin)}
                                className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors"
                            >
                                {isLogin ? 'Sign up free' : 'Sign in'}
                            </button>
                        </p>
                    </div>
                </div>

                {/* Footer note */}
                <p className="text-center text-xs text-slate-600 mt-6">
                    Secured with JWT Authentication & bcrypt encryption
                </p>
            </div>
        </div>
    );
}

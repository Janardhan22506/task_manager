import React, { useState, useEffect } from 'react';
import { LogOut, Award } from 'lucide-react';
import AuthForm from './components/AuthForm';
import TaskBoard from './components/TaskBoard';
import { getUser, logout } from './utils/api';

export default function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = getUser();
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    const handleAuthSuccess = (userData) => {
        setUser(userData);
    };

    const handleLogout = () => {
        logout();
        setUser(null);
    };

    return (
        <div className="min-h-screen flex flex-col justify-between">
            {/* Header / Navbar */}
            <header className="bg-slate-900/40 backdrop-blur-md border-b border-slate-800/60 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/20">
                            T
                        </div>
                        <span className="font-bold text-lg text-white tracking-wide">
                            TaskManager
                        </span>
                    </div>

                    {user && (
                        <div className="flex items-center gap-4">
                            <div className="hidden sm:flex flex-col items-end">
                                <span className="text-sm font-semibold text-white">{user.full_name}</span>
                                <span className="text-xs text-slate-400">{user.email}</span>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 bg-slate-900 border border-slate-800 hover:bg-slate-800 hover:border-slate-700 text-slate-300 hover:text-white px-3.5 py-2 rounded-xl text-sm font-medium transition-all"
                            >
                                <LogOut className="w-4 h-4 text-rose-400" />
                                <span className="hidden xs:inline">Sign Out</span>
                            </button>
                        </div>
                    )}
                </div>
            </header>

            {/* Main Content Area */}
            <main className="flex-grow flex items-center justify-center p-6">
                {!user ? (
                    // Centered Auth Form when logged out
                    <div className="w-full py-12">
                        <AuthForm onAuthSuccess={handleAuthSuccess} />
                    </div>
                ) : (
                    // Interactive Premium Welcome Dashboard when logged in
                    <div className="w-full max-w-5xl mx-auto space-y-8 py-8 animate-fade-in">
                        {/* Welcome Hero Banner */}
                        <div className="bg-gradient-to-r from-indigo-900/40 to-purple-900/40 border border-indigo-500/20 rounded-2xl p-8 relative overflow-hidden backdrop-blur-xl">
                            <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
                            
                            <div className="max-w-2xl space-y-4">
                                <div className="inline-flex items-center gap-2 bg-indigo-500/10 text-indigo-400 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border border-indigo-500/20">
                                    <Award className="w-3.5 h-3.5" /> Getting Started
                                </div>
                                <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                                    Welcome back, {user.full_name}!
                                </h1>
                                <p className="text-slate-300 text-base leading-relaxed">
                                    Your authentication is verified and your database connection is active. You are now ready to manage your personal tasks. Let's create your workspace.
                                </p>
                            </div>
                        </div>

                        {/* Interactive Task Board */}
                        <TaskBoard />
                    </div>
                )}
            </main>

            {/* Footer */}
            <footer className="border-t border-slate-900 py-6 text-center text-xs text-slate-600 bg-slate-950/20">
                <p>&copy; 2026 TaskManager App. Premium Design Built with React & Tailwind CSS.</p>
            </footer>
        </div>
    );
}

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/footer';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            return setError('Passwords do not match');
        }

        setError('');
        setLoading(true);

        try {
            await signup(email, password, name);
            navigate('/client-portal');
        } catch (err) {
            console.error(err);
            setError('Failed to create an account. ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background text-white selection:bg-primary/30 flex flex-col">
            <Header />

            <main className="flex-1 flex items-center justify-center p-4 py-32 relative overflow-hidden">
                {/* Decorative background elements */}
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px] pointer-events-none" />
                <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[150px] pointer-events-none" />

                <div className="w-full max-w-md relative z-10">
                    <div className="p-8 md:p-12 rounded-[2.5rem] bg-zinc-900/40 border border-white/5 backdrop-blur-3xl shadow-2xl">
                        <div className="text-center mb-10">
                            <div className="w-16 h-16 bg-gradient-brand rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-primary/20">
                                <Icon name="UserPlus" size={32} color="white" />
                            </div>
                            <h1 className="text-3xl font-black tracking-tight mb-2">Create Account</h1>
                            <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs">Join Startflyer Ads Excellence</p>
                        </div>

                        {error && (
                            <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold text-center uppercase tracking-widest">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">Full Name</label>
                                <div className="relative">
                                    <Icon name="User" size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" />
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                        className="w-full bg-black/20 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-primary/50 transition-all placeholder-zinc-700"
                                        placeholder="John Doe"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">Email Address</label>
                                <div className="relative">
                                    <Icon name="Mail" size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="w-full bg-black/20 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-primary/50 transition-all placeholder-zinc-700"
                                        placeholder="name@company.com"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">Password</label>
                                <div className="relative">
                                    <Icon name="Lock" size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" />
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="w-full bg-black/20 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-primary/50 transition-all placeholder-zinc-700"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">Confirm Password</label>
                                <div className="relative">
                                    <Icon name="ShieldCheck" size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" />
                                    <input
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                        className="w-full bg-black/20 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-primary/50 transition-all placeholder-zinc-700"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>

                            <div className="pt-4">
                                <Button
                                    variant="default"
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-secondary text-white font-black py-4 rounded-2xl shadow-xl shadow-secondary/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
                                >
                                    {loading ? 'Creating Account...' : 'Initialize Onboarding'}
                                </Button>
                            </div>
                        </form>

                        <div className="mt-10 pt-10 border-t border-white/5 text-center">
                            <p className="text-sm font-medium text-zinc-500 mb-4">Already a partner?</p>
                            <Link to="/login">
                                <Button variant="ghost" className="text-[10px] font-black uppercase tracking-widest text-white hover:text-primary transition-colors">
                                    Secure Login
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Signup;

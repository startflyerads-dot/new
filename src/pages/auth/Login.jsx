import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/footer';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/client-portal";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await login(email, password);
            navigate(from, { replace: true });
        } catch (err) {
            console.error(err);
            setError('Invalid email or password. Please try again.');
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
                                <Icon name="Zap" size={32} color="white" />
                            </div>
                            <h1 className="text-3xl font-black tracking-tight mb-2">Access Portal</h1>
                            <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs">Startflyer Ads Identity</p>
                        </div>

                        {error && (
                            <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold text-center uppercase tracking-widest">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
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
                                <div className="flex justify-between items-center ml-1">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Security Key</label>
                                    <Link to="/forgot-password" size="sm" className="text-[10px] font-black uppercase tracking-widest text-primary hover:text-white transition-colors">Recover</Link>
                                </div>
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

                            <div className="pt-4">
                                <Button
                                    variant="default"
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-primary text-white font-black py-4 rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
                                >
                                    {loading ? 'Authenticating...' : 'Enter Workspace'}
                                </Button>
                            </div>
                        </form>

                        <div className="mt-10 pt-10 border-t border-white/5 text-center">
                            <p className="text-sm font-medium text-zinc-500 mb-4">New partner?</p>
                            <Link to="/signup">
                                <Button variant="ghost" className="text-[10px] font-black uppercase tracking-widest text-white hover:text-primary transition-colors">
                                    Initialize Client Account
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

export default Login;

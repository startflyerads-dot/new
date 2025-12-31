import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/footer';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ClientManagement from './components/ClientManagement';
import FinancialOverview from './components/FinancialOverview';
import AdminStats from './components/AdminStats';
import ProjectManager from './components/ProjectManager';
import AdminConversations from './components/AdminConversations';
import ClientDetailView from './components/ClientDetailView';

const AdminPortal = () => {
    const { logout, userData } = useAuth();
    const [activeTab, setActiveTab] = useState('overview');
    const [selectedClient, setSelectedClient] = useState(null);

    const tabs = [
        { id: 'overview', name: 'Overview', icon: 'LayoutDashboard' },
        { id: 'clients', name: 'Partners', icon: 'Users' },
        { id: 'projects', name: 'Operations', icon: 'Briefcase' },
        { id: 'conversations', name: 'Intelligence', icon: 'Cpu' },
        { id: 'financials', name: 'Financials', icon: 'TrendingUp' },
        { id: 'security', name: 'Security', icon: 'ShieldHalf' },
    ];

    return (
        <div className="min-h-screen bg-background text-white selection:bg-primary/30">
            <Header />
            <main className="pt-24 pb-20">
                {/* Admin Pro Hero */}
                <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-black/40 border-b border-white/5 overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(229,123,70,0.1),transparent_50%)]" />
                    <div className="max-w-7xl mx-auto relative z-10">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                            <div>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center border border-primary/20">
                                        <Icon name="Crown" size={24} className="text-primary" />
                                    </div>
                                    <span className="px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-black text-primary uppercase tracking-[0.2em]">Management Protocol</span>
                                </div>
                                <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-6 bg-gradient-to-r from-white via-white to-zinc-500 bg-clip-text text-transparent">
                                    HQ COMMAND CENTER
                                </h1>
                                <p className="text-zinc-500 font-bold uppercase tracking-widest text-sm max-w-xl leading-loose mb-8">
                                    Oversee all operational vectors, monitor financial performance, and manage client relations through the Startflyer Ads elite interface.
                                </p>
                                <Button
                                    variant="ghost"
                                    onClick={logout}
                                    className="text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-primary transition-all p-0"
                                >
                                    Terminate Command Session <Icon name="LogOut" size={12} className="ml-2" />
                                </Button>
                            </div>

                            <div className="flex items-center gap-8 bg-zinc-900/60 p-8 rounded-[2.5rem] border border-white/5 backdrop-blur-3xl shadow-2xl">
                                <div className="text-center">
                                    <div className="text-3xl font-black text-white mb-1">128</div>
                                    <div className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest text-nowrap">Active nodes</div>
                                </div>
                                <div className="w-px h-12 bg-white/5" />
                                <div className="text-center">
                                    <div className="text-3xl font-black text-emerald-400 mb-1">98%</div>
                                    <div className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest text-nowrap">Efficiency</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Global Admin Navigation */}
                <nav className="sticky top-16 z-40 bg-background/80 backdrop-blur-xl border-b border-white/5">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center space-x-2 py-4 overflow-x-auto no-scrollbar">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center space-x-3 py-3 px-8 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all duration-500 active:scale-95 ${activeTab === tab.id
                                        ? 'bg-primary text-white shadow-2xl shadow-primary/20'
                                        : 'text-zinc-500 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/5'
                                        }`}
                                >
                                    <Icon name={tab.icon} size={14} />
                                    <span>{tab.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </nav>

                {/* Dynamic Command Content */}
                <section className="py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        {activeTab === 'overview' && (
                            <div className="space-y-12">
                                <AdminStats />
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                                    <div className="space-y-8">
                                        <h3 className="text-2xl font-black tracking-tight border-b border-white/5 pb-6 uppercase tracking-[0.1em]">Recent Partners</h3>
                                        <ClientManagement limit={5} compact />
                                    </div>
                                    <div className="space-y-8">
                                        <h3 className="text-2xl font-black tracking-tight border-b border-white/5 pb-6 uppercase tracking-[0.1em]">Revenue Stream</h3>
                                        <FinancialOverview limit={5} compact />
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'clients' && (
                            <div className="space-y-10">
                                {!selectedClient ? (
                                    <>
                                        <div className="flex items-center justify-between border-b border-white/5 pb-10">
                                            <h2 className="text-4xl font-black tracking-tighter uppercase tracking-[0.1em]">Partner Directory</h2>
                                            <Button variant="default" className="bg-white text-black font-black uppercase tracking-widest px-8 rounded-xl shadow-xl hover:bg-zinc-200 transition-all">
                                                Register Client
                                            </Button>
                                        </div>
                                        <ClientManagement onSelect={setSelectedClient} />
                                    </>
                                ) : (
                                    <ClientDetailView
                                        client={selectedClient}
                                        onBack={() => setSelectedClient(null)}
                                    />
                                )}
                            </div>
                        )}

                        {activeTab === 'projects' && (
                            <div className="space-y-10">
                                <div className="flex items-center justify-between border-b border-white/5 pb-10">
                                    <h2 className="text-4xl font-black tracking-tighter uppercase tracking-[0.1em]">Global Operations</h2>
                                    <Button variant="default" className="bg-primary text-white font-black uppercase tracking-widest px-8 rounded-xl shadow-xl shadow-primary/20">
                                        Initialize Vector
                                    </Button>
                                </div>
                                <ProjectManager />
                            </div>
                        )}

                        {activeTab === 'conversations' && (
                            <div className="space-y-10">
                                <div className="flex items-center justify-between border-b border-white/5 pb-10">
                                    <h2 className="text-4xl font-black tracking-tighter uppercase tracking-[0.1em]">Neural Hub</h2>
                                    <Button variant="ghost" className="text-primary font-black uppercase tracking-widest hover:bg-primary/10 px-8 rounded-xl border border-primary/20">
                                        Broadcast Update
                                    </Button>
                                </div>
                                <AdminConversations />
                            </div>
                        )}

                        {activeTab === 'financials' && (
                            <div className="space-y-10">
                                <div className="flex items-center justify-between border-b border-white/5 pb-10">
                                    <h2 className="text-4xl font-black tracking-tighter">Fiscal Intel</h2>
                                    <Button variant="ghost" className="text-primary font-black uppercase tracking-widest hover:bg-primary/10 px-8 rounded-xl border border-primary/20">
                                        Export Ledger
                                    </Button>
                                </div>
                                <FinancialOverview />
                            </div>
                        )}

                        {activeTab === 'security' && (
                            <div className="min-h-[400px] flex items-center justify-center border border-dashed border-white/5 rounded-[3rem] bg-zinc-900/20">
                                <div className="text-center">
                                    <Icon name="ShieldAlert" size={64} className="text-zinc-800 mx-auto mb-8" />
                                    <h3 className="text-2xl font-black text-white/50 uppercase tracking-widest">Protocol Restricted</h3>
                                    <p className="text-zinc-700 font-bold uppercase tracking-widest text-[10px] mt-4">Security systems fully operational</p>
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default AdminPortal;

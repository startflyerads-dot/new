import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ClientManagement = ({ onSelect, compact = false }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const clients = [
        {
            id: '1',
            name: 'Alex Thompson',
            company: 'Peak Explorers Club',
            avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6',
            projects: 12,
            totalRevenue: '$14,200',
            status: 'active'
        },
        {
            id: '2',
            name: 'Sarah Chen',
            company: 'Eco-Trails International',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
            projects: 8,
            totalRevenue: '$9,800',
            status: 'active'
        },
        {
            id: '3',
            name: 'Marcus Miller',
            company: 'Summit Private Group',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
            projects: 5,
            totalRevenue: '$24,000',
            status: 'active'
        }
    ];

    const filteredClients = clients.filter(client =>
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.company.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            {!compact && (
                <div className="relative mb-8">
                    <Icon name="Search" size={16} className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-600" />
                    <input
                        type="text"
                        placeholder="Search partners by name or identity..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-zinc-900/60 border border-white/5 rounded-[1.5rem] py-5 pl-16 pr-6 text-sm text-white placeholder-zinc-700 focus:outline-none focus:border-emerald-500/50 transition-all shadow-2xl"
                    />
                </div>
            )}

            <div className="space-y-4">
                {filteredClients.length > 0 ? (
                    filteredClients.map((client) => (
                        <div
                            key={client.id}
                            onClick={() => onSelect?.(client)}
                            className={`group cursor-pointer flex items-center justify-between p-6 rounded-[2rem] bg-zinc-900/40 border border-white/5 backdrop-blur-3xl hover:bg-zinc-900/60 transition-all duration-500 ${compact ? 'py-4' : 'py-6'}`}
                        >
                            <div className="flex items-center gap-6">
                                <div className="relative">
                                    <img src={client.avatar} alt={client.name} className="w-14 h-14 rounded-2xl object-cover ring-2 ring-white/10 group-hover:ring-emerald-500/50 transition-all duration-500 shadow-2xl" />
                                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-[3px] border-zinc-900" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-black text-white uppercase tracking-widest mb-1 group-hover:text-emerald-500 transition-colors">{client.name}</h4>
                                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{client.company}</p>
                                </div>
                            </div>

                            {!compact && (
                                <div className="hidden md:flex items-center gap-12">
                                    <div className="text-center">
                                        <div className="text-xs font-black text-white mb-1">{client.projects}</div>
                                        <div className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Tours</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-xs font-black text-emerald-400 mb-1">{client.totalRevenue}</div>
                                        <div className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Yield</div>
                                    </div>
                                </div>
                            )}

                            <div className="flex items-center gap-3">
                                <Button variant="ghost" size="icon" className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 hover:text-emerald-500 transition-all">
                                    <Icon name="MessageSquare" size={16} />
                                </Button>
                                <Button variant="ghost" size="icon" className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 hover:text-emerald-500 transition-all">
                                    <Icon name="ExternalLink" size={16} />
                                </Button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-20 bg-white/[0.01] rounded-[2rem] border border-dashed border-white/5">
                        <p className="text-zinc-600 font-bold uppercase tracking-widest text-xs">No partners registered in sector</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ClientManagement;

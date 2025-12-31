import React from 'react';
import Icon from '../../../components/AppIcon';

const AdminStats = () => {
    const stats = [
        {
            id: 1,
            label: 'Annual Tour Yield',
            value: '$284,500',
            trend: '+12.5%',
            icon: 'Mountain',
            theme: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
        },
        {
            id: 2,
            label: 'Expedition Partners',
            value: '482',
            trend: '+14%',
            icon: 'Users',
            theme: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20'
        },
        {
            id: 3,
            label: 'Safety Rating',
            value: '99.8%',
            trend: '+0.2%',
            icon: 'ShieldCheck',
            theme: 'text-teal-400 bg-teal-500/10 border-teal-500/20'
        },
        {
            id: 4,
            label: 'Active Trails',
            value: '24',
            trend: '+3',
            icon: 'Map',
            theme: 'text-zinc-400 bg-zinc-500/10 border-zinc-500/20'
        }
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-geist">
            {stats.map((stat) => (
                <div key={stat.id} className="relative group p-8 rounded-[2rem] bg-zinc-900/40 border border-white/5 backdrop-blur-3xl hover:bg-zinc-900/60 transition-all duration-500 overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-8">
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border ${stat.theme} shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                                <Icon name={stat.icon} size={24} />
                            </div>
                            <div className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[10px] font-black text-emerald-400 uppercase tracking-widest">
                                {stat.trend}
                            </div>
                        </div>

                        <div className="space-y-1">
                            <div className="text-4xl font-black text-white tracking-tighter group-hover:text-primary transition-colors duration-500">{stat.value}</div>
                            <div className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.2em]">{stat.label}</div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AdminStats;

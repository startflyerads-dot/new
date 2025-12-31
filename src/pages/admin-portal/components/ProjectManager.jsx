import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProjectManager = () => {
    const [showAddForm, setShowAddForm] = useState(false);

    const staticClients = [
        { id: '1', name: 'Alex Thompson', company: 'Peak Explorers Club' },
        { id: '2', name: 'Sarah Chen', company: 'Eco-Trails International' },
        { id: '3', name: 'Marcus Miller', company: 'Summit Private Group' }
    ];

    const staticProjects = [
        {
            id: 'p1',
            title: "Lantau Peak Expedition",
            clientId: '1',
            status: 'completed',
            completion: 100,
            budget: '$2,400',
            deadline: '2024-06-15'
        },
        {
            id: 'p2',
            title: "Dragon's Back Cultural Walk",
            clientId: '2',
            status: 'in-progress',
            completion: 65,
            budget: '$1,800',
            deadline: '2024-07-20'
        },
        {
            id: 'p3',
            title: "Lion Rock Sunset Tour",
            clientId: '3',
            status: 'planning',
            completion: 15,
            budget: '$1,200',
            deadline: '2024-08-05'
        },
        {
            id: 'p4',
            title: "High Island Reservoir Trek",
            clientId: '1',
            status: 'review',
            completion: 90,
            budget: '$3,100',
            deadline: '2024-07-10'
        }
    ];

    const getStatusTheme = (status) => {
        switch (status) {
            case 'in-progress': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
            case 'review': return 'text-teal-400 bg-teal-500/10 border-teal-500/20';
            case 'completed': return 'text-zinc-400 bg-zinc-500/10 border-zinc-500/20';
            default: return 'text-zinc-500 bg-white/5 border-white/10';
        }
    };

    return (
        <div className="relative rounded-[2.5rem] bg-zinc-900/40 border border-white/5 backdrop-blur-3xl overflow-hidden shadow-2xl">
            <div className="p-10 border-b border-white/5">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                    <div>
                        <h3 className="text-2xl font-black text-white tracking-tight uppercase tracking-[0.1em] mb-2">Expedition Grid</h3>
                        <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest leading-none">Active Trail Logistics</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button
                            variant="default"
                            onClick={() => setShowAddForm(!showAddForm)}
                            className="bg-emerald-600 text-white font-black uppercase tracking-widest px-6 rounded-xl shadow-lg shadow-emerald-500/20"
                        >
                            {showAddForm ? 'Cancel Initialization' : 'Schedule Expedition +'}
                        </Button>
                    </div>
                </div>

                {showAddForm && (
                    <div className="mt-10 p-8 rounded-3xl bg-black/40 border border-white/5 space-y-6 animate-in fade-in slide-in-from-top-4 duration-500">
                        <p className="text-zinc-500 font-bold uppercase tracking-widest text-[10px] text-center italic">Initialization module restricted to administrative nodes only.</p>
                    </div>
                )}
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-white/5 bg-white/[0.02]">
                            <th className="p-6 text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] pl-10">Expedition Detail</th>
                            <th className="p-6 text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em]">Assignment</th>
                            <th className="p-6 text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em]">Status</th>
                            <th className="p-6 text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em]">Yield</th>
                            <th className="p-6 text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em]">Logistics</th>
                            <th className="p-6 text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] pr-10">Access</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {staticProjects.map((proj) => (
                            <tr key={proj.id} className="group hover:bg-white/[0.03] transition-colors">
                                <td className="p-6 pl-10">
                                    <div className="font-black text-white uppercase tracking-widest text-xs group-hover:text-emerald-500 transition-colors">{proj.title}</div>
                                    <div className="text-[9px] font-bold text-zinc-600 uppercase tracking-[0.1em] mt-1">ID: #HK-{proj.id.toUpperCase()}</div>
                                </td>
                                <td className="p-6 font-bold text-zinc-400 uppercase tracking-widest text-[10px]">
                                    {staticClients.find(c => c.id === proj.clientId)?.name}
                                </td>
                                <td className="p-6">
                                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg border text-[9px] font-black uppercase tracking-widest ${getStatusTheme(proj.status)}`}>
                                        <div className="w-1 h-1 rounded-full bg-current animate-pulse" />
                                        {proj.status}
                                    </div>
                                </td>
                                <td className="p-6 font-black text-zinc-300 text-xs">
                                    {proj.budget}
                                </td>
                                <td className="p-6">
                                    <div className="flex flex-col gap-2">
                                        <div className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">{proj.deadline}</div>
                                        <div className="w-24 bg-white/5 rounded-full h-1 overflow-hidden">
                                            <div
                                                className="h-full bg-emerald-500 rounded-full transition-all duration-1000"
                                                style={{ width: `${proj.completion}%` }}
                                            />
                                        </div>
                                    </div>
                                </td>
                                <td className="p-6 pr-10">
                                    <div className="flex items-center gap-2">
                                        <Button variant="ghost" size="icon" className="w-9 h-9 rounded-lg border border-white/5 hover:bg-emerald-500/10 hover:text-emerald-500">
                                            <Icon name="Settings" size={14} />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="w-9 h-9 rounded-lg border border-white/5 hover:bg-white/10">
                                            <Icon name="ArrowRight" size={14} />
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProjectManager;

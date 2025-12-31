import React from 'react';
import Icon from '../../../components/AppIcon';

const FinancialOverview = ({ limit, compact = false }) => {
    const transactions = [
        {
            id: 1,
            client: 'TechStart Solutions',
            amount: '$4,200.00',
            date: 'Oct 20, 2024',
            status: 'confirmed',
            type: 'Project Milestone'
        },
        {
            id: 2,
            client: 'Aura Media',
            amount: '$1,850.00',
            date: 'Oct 19, 2024',
            status: 'pending',
            type: 'Consultation'
        },
        {
            id: 3,
            client: 'EcoStream Systems',
            amount: '$2,400.00',
            date: 'Oct 18, 2024',
            status: 'confirmed',
            type: 'Recurring Retainer'
        }
    ];

    const displayTransactions = limit ? transactions.slice(0, limit) : transactions;

    return (
        <div className="space-y-4">
            {displayTransactions.map((tx) => (
                <div
                    key={tx.id}
                    className="group relative p-6 rounded-[2rem] bg-zinc-900/40 border border-white/5 backdrop-blur-3xl hover:bg-zinc-900/60 transition-all duration-500 overflow-hidden"
                >
                    <div className="flex items-center justify-between relative z-10">
                        <div className="flex items-center gap-6">
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${tx.status === 'confirmed' ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' : 'text-amber-400 bg-amber-500/10 border-amber-500/20'
                                }`}>
                                <Icon name={tx.status === 'confirmed' ? 'CheckCircle2' : 'Clock'} size={20} />
                            </div>
                            <div>
                                <h4 className="text-sm font-black text-white uppercase tracking-widest mb-1 group-hover:text-primary transition-colors">{tx.client}</h4>
                                <div className="flex items-center gap-3">
                                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{tx.type}</span>
                                    <span className="w-1 h-1 bg-zinc-700 rounded-full" />
                                    <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">{tx.date}</span>
                                </div>
                            </div>
                        </div>

                        <div className="text-right">
                            <div className={`text-lg font-black tracking-tight mb-1 ${tx.status === 'confirmed' ? 'text-white' : 'text-zinc-500'}`}>
                                {tx.amount}
                            </div>
                            <div className={`text-[10px] font-black uppercase tracking-widest ${tx.status === 'confirmed' ? 'text-emerald-400' : 'text-amber-500'
                                }`}>
                                {tx.status}
                            </div>
                        </div>
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </div>
            ))}
        </div>
    );
};

export default FinancialOverview;

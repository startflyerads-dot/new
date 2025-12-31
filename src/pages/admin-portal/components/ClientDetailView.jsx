const ClientDetailView = ({ client, onBack }) => {
    const projects = [
        {
            id: 'p1',
            title: "Lantau Peak Expedition",
            createdAt: { seconds: 1718234400 },
            budget: "$2,400",
            status: 'completed'
        },
        {
            id: 'p2',
            title: "Dragon's Back Cultural Walk",
            createdAt: { seconds: 1719234400 },
            budget: "$1,800",
            status: 'active'
        }
    ];

    if (!client) return null;

    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center justify-between border-b border-white/5 pb-8">
                <div className="flex items-center gap-6">
                    <Button
                        variant="ghost"
                        onClick={onBack}
                        className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 hover:text-emerald-500 transition-all"
                    >
                        <Icon name="ArrowLeft" size={20} />
                    </Button>
                    <div className="flex items-center gap-6">
                        <img src={client.avatar} className="w-20 h-20 rounded-[2rem] object-cover ring-4 ring-emerald-500/20 shadow-2xl" alt="" />
                        <div>
                            <h2 className="text-4xl font-black tracking-tighter text-white uppercase tracking-widest">{client.name}</h2>
                            <p className="text-zinc-500 font-bold uppercase tracking-widest text-sm">{client.company} • Partner ID #HK-2024</p>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <Button variant="default" className="bg-emerald-600 text-white font-black uppercase tracking-widest px-8 py-4 rounded-2xl shadow-xl shadow-emerald-500/20">
                        Trail Logistics
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    {/* Partnership Summary */}
                    <div className="p-10 rounded-[2.5rem] bg-zinc-900/40 border border-white/5 backdrop-blur-3xl">
                        <h3 className="text-xl font-black text-white uppercase tracking-widest mb-8 border-b border-white/5 pb-6">Vitals Overview</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
                            <div className="text-center p-6 rounded-3xl bg-white/[0.02] border border-white/5">
                                <div className="text-3xl font-black text-white mb-2">{client.projects}</div>
                                <div className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Completed Trails</div>
                            </div>
                            <div className="text-center p-6 rounded-3xl bg-white/[0.02] border border-white/5">
                                <div className="text-3xl font-black text-emerald-400 mb-2">{client.revenue}</div>
                                <div className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Total Yield</div>
                            </div>
                            <div className="text-center p-6 rounded-3xl bg-white/[0.02] border border-white/5">
                                <div className="text-3xl font-black text-teal-400 mb-2">9.8</div>
                                <div className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Safety Score</div>
                            </div>
                        </div>
                    </div>

                    {/* Project History */}
                    <div className="p-10 rounded-[2.5rem] bg-zinc-900/40 border border-white/5 backdrop-blur-3xl">
                        <h3 className="text-xl font-black text-white uppercase tracking-widest mb-8">Trail History</h3>
                        <div className="space-y-4">
                            {projects.length > 0 ? (
                                projects.map((proj) => (
                                    <div key={proj.id} className="flex items-center justify-between p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all">
                                        <div className="flex items-center gap-5">
                                            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500">
                                                <Icon name="Mountain" size={20} />
                                            </div>
                                            <div>
                                                <div className="font-black text-white text-sm uppercase tracking-widest">{proj.title}</div>
                                                <div className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Added {new Date(proj.createdAt?.seconds * 1000).toLocaleDateString()}</div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-sm font-black text-white mb-1">{proj.budget}</div>
                                            <div className={`text-[9px] font-black uppercase tracking-widest ${proj.status === 'completed' ? 'text-emerald-400' : 'text-teal-400'}`}>{proj.status}</div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-10">
                                    <p className="text-zinc-600 font-bold uppercase tracking-widest text-[10px]">No operational vectors recorded</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="space-y-8">
                    {/* Communication Stream */}
                    <div className="p-8 rounded-[2.5rem] bg-zinc-900/40 border border-white/5 backdrop-blur-3xl h-full">
                        <h3 className="text-xl font-black text-white uppercase tracking-widest mb-6 px-2">Intelligence</h3>
                        <div className="space-y-6">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="relative pl-6 border-l border-white/10 pb-6">
                                    <div className="absolute top-0 left-[-4.5px] w-2 h-2 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/50" />
                                    <div className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-2">October {22 - i}, 2024</div>
                                    <p className="text-xs font-medium text-zinc-400 leading-relaxed italic">"Trail conditions verified. Group logistics confirmed for upcoming High Island expedition."</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClientDetailView;

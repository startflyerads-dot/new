import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AdminConversations = () => {
    const [conversations] = useState([
        {
            id: 1,
            client: {
                name: 'Alex Thompson',
                company: 'Peak Explorers Club',
                avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6'
            },
            lastMessage: "Trail conditions for Lantau Peak are verified.",
            time: '15m ago',
            unread: 2,
            assignedManager: 'Michael R.'
        },
        {
            id: 2,
            client: {
                name: 'Sarah Chen',
                company: 'Eco-Trails International',
                avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330'
            },
            lastMessage: "When is the next safety audit scheduled?",
            time: '2h ago',
            unread: 0,
            assignedManager: 'Elena B.'
        },
        {
            id: 3,
            client: {
                name: 'Marcus Miller',
                company: 'Summit Private Group',
                avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d'
            },
            lastMessage: "The group logistics for Dragon's Back are perfect.",
            time: '5h ago',
            unread: 0,
            assignedManager: 'Michael R.'
        }
    ]);

    return (
        <div className="relative rounded-[2.5rem] bg-zinc-900/40 border border-white/5 backdrop-blur-3xl overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between p-8 border-b border-white/5">
                <h3 className="text-xl font-black text-white tracking-tight uppercase tracking-[0.1em]">Expedition Briefings</h3>
                <div className="flex items-center gap-3">
                    <Button variant="ghost" className="text-[10px] font-black uppercase bg-white/5 border border-white/10 px-4 py-2">
                        Priority Filter <Icon name="Filter" size={12} className="ml-2" />
                    </Button>
                </div>
            </div>

            <div className="divide-y divide-white/5">
                {conversations.map((chat) => (
                    <div key={chat.id} className="group relative flex items-center justify-between p-6 hover:bg-white/[0.03] transition-all duration-300">
                        <div className="flex items-center gap-6">
                            <div className="relative">
                                <img src={chat.client.avatar} alt={chat.client.name} className="w-14 h-14 rounded-2xl object-cover ring-2 ring-white/10 group-hover:ring-emerald-500 transition-all duration-500" />
                                {chat.unread > 0 && (
                                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 rounded-lg flex items-center justify-center border-2 border-zinc-900 shadow-lg shadow-emerald-500/20">
                                        <span className="text-[10px] font-black text-white">{chat.unread}</span>
                                    </div>
                                )}
                            </div>
                            <div>
                                <div className="flex items-center gap-3 mb-1">
                                    <h4 className="text-sm font-black text-white uppercase tracking-widest">{chat.client.name}</h4>
                                    <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest leading-none">@ {chat.client.company}</span>
                                </div>
                                <p className="text-xs font-medium text-zinc-500 group-hover:text-zinc-300 transition-colors">{chat.lastMessage}</p>
                                <div className="flex items-center gap-4 mt-2">
                                    <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-white/5 border border-white/5">
                                        <Icon name="Users" size={10} className="text-zinc-600" />
                                        <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">{chat.assignedManager}</span>
                                    </div>
                                    <span className="text-[9px] font-bold text-zinc-700 uppercase tracking-widest">{chat.time}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <Button variant="ghost" size="icon" className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 hover:text-emerald-500 transition-all">
                                <Icon name="Eye" size={16} />
                            </Button>
                            <Button variant="ghost" size="icon" className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 hover:text-emerald-500 transition-all">
                                <Icon name="Reply" size={16} />
                            </Button>
                        </div>

                        <div className="absolute inset-y-0 left-0 w-1 bg-emerald-500 scale-y-0 group-hover:scale-y-100 transition-transform origin-top duration-500" />
                    </div>
                ))}
            </div>

            <div className="p-8 bg-zinc-950/20 border-t border-white/5 text-center">
                <button className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600 hover:text-white transition-all">
                    Browse Logistics Archive
                </button>
            </div>
        </div>
    );
};

export default AdminConversations;

import React from 'react';
import Icon from '../../../components/AppIcon';

const QuickActions = () => {
  const actions = [
    {
      id: 1,
      title: "Schedule Sync",
      description: "Book a strategic consultation",
      icon: "Calendar",
      theme: "text-primary bg-primary/10 border-primary/20",
    },
    {
      id: 2,
      title: "File Transfer",
      description: "Share assets with your team",
      icon: "Upload",
      theme: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    },
    {
      id: 3,
      title: "Concierge Support",
      description: "Priority assistance request",
      icon: "HelpCircle",
      theme: "text-purple-400 bg-purple-500/10 border-purple-500/20",
    },
    {
      id: 4,
      title: "Financial Center",
      description: "Invoices and history",
      icon: "Receipt",
      theme: "text-orange-400 bg-orange-500/10 border-orange-500/20",
    }
  ];

  return (
    <>
      {actions?.map((action) => (
        <button
          key={action?.id}
          className="relative group p-6 rounded-3xl bg-zinc-900/40 border border-white/5 backdrop-blur-3xl hover:bg-zinc-900/60 transition-all duration-500 text-left overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

          <div className="relative z-10">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center border mb-6 group-hover:scale-110 transition-transform duration-500 ${action.theme}`}>
              <Icon name={action?.icon} size={20} />
            </div>

            <h4 className="text-sm font-black text-white uppercase tracking-widest mb-1 group-hover:text-primary transition-colors">
              {action?.title}
            </h4>
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest leading-relaxed">
              {action?.description}
            </p>
          </div>
        </button>
      ))}
    </>
  );
};

export default QuickActions;
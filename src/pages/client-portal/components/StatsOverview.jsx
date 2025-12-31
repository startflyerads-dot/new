import React from 'react';
import Icon from '../../../components/AppIcon';

const StatsOverview = ({ stats }) => {
  const getStatIcon = (type) => {
    switch (type) {
      case 'projects': return 'FolderOpen';
      case 'completed': return 'CheckCircle';
      case 'hours': return 'Clock';
      case 'team': return 'Users';
      default: return 'BarChart3';
    }
  };

  const getStatTheme = (type) => {
    switch (type) {
      case 'projects': return 'text-primary bg-primary/10 border-primary/20';
      case 'completed': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      case 'hours': return 'text-orange-400 bg-orange-500/10 border-orange-500/20';
      case 'team': return 'text-purple-400 bg-purple-500/10 border-purple-500/20';
      default: return 'text-zinc-400 bg-white/5 border-white/10';
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats?.map((stat) => {
        const themeClasses = getStatTheme(stat?.type);
        return (
          <div key={stat?.id} className="relative group p-8 rounded-[2rem] bg-zinc-900/40 border border-white/5 backdrop-blur-3xl hover:bg-zinc-900/60 transition-all duration-500 overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border ${themeClasses}`}>
                  <Icon name={getStatIcon(stat?.type)} size={24} />
                </div>
                {stat?.trend && (
                  <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${stat?.trend > 0 ? 'text-emerald-400 bg-emerald-500/10' : 'text-rose-400 bg-rose-500/10'
                    }`}>
                    <Icon name={stat?.trend > 0 ? 'TrendingUp' : 'TrendingDown'} size={12} />
                    <span>{Math.abs(stat?.trend)}%</span>
                  </div>
                )}
              </div>

              <div className="space-y-1">
                <div className="text-4xl font-black text-white tracking-tighter">{stat?.value}</div>
                <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest">{stat?.label}</div>
                {stat?.subtitle && (
                  <div className="text-[10px] font-medium text-zinc-600 mt-2">{stat?.subtitle}</div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsOverview;
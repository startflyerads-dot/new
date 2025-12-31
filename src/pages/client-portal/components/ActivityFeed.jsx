import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ActivityFeed = ({ activities }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'message': return 'MessageSquare';
      case 'file': return 'FileText';
      case 'milestone': return 'Flag';
      case 'meeting': return 'Calendar';
      case 'payment': return 'CreditCard';
      case 'update': return 'Bell';
      default: return 'Activity';
    }
  };

  const getActivityTheme = (type) => {
    switch (type) {
      case 'message': return 'text-primary bg-primary/10 border-primary/20';
      case 'file': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      case 'milestone': return 'text-purple-400 bg-purple-500/10 border-purple-500/20';
      case 'meeting': return 'text-orange-400 bg-orange-500/10 border-orange-500/20';
      case 'payment': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      default: return 'text-zinc-500 bg-white/5 border-white/10';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - activityTime) / (1000 * 60));

    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="relative p-8 rounded-[2rem] bg-zinc-900/40 border border-white/5 backdrop-blur-3xl overflow-hidden">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xl font-black text-white tracking-tight">Timeline</h3>
        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
          <Icon name="Activity" size={18} className="text-zinc-500" />
        </div>
      </div>

      <div className="space-y-6 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
        {activities?.map((activity) => (
          <div key={activity?.id} className="relative group flex items-start gap-5 p-4 rounded-2xl transition-all duration-300 hover:bg-white/[0.02]">
            <div className={`flex-shrink-0 w-12 h-12 rounded-xl border flex items-center justify-center transition-transform group-hover:scale-110 ${getActivityTheme(activity?.type)}`}>
              <Icon name={getActivityIcon(activity?.type)} size={18} />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2">
                {activity?.user?.avatar && (
                  <Image
                    src={activity?.user?.avatar}
                    alt={activity?.user?.avatarAlt}
                    className="w-5 h-5 rounded-full object-cover ring-1 ring-white/10"
                  />
                )}
                <span className="text-[10px] font-black uppercase tracking-widest text-white">{activity?.user?.name}</span>
                <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">{formatTimeAgo(activity?.timestamp)}</span>
              </div>

              <p className="text-sm font-medium text-zinc-400 group-hover:text-zinc-300 transition-colors leading-relaxed">
                {activity?.description}
              </p>

              {activity?.attachment && (
                <div className="mt-3 flex items-center gap-2 p-2 bg-black/20 rounded-lg border border-white/5 hover:border-white/10 transition-colors cursor-pointer group/file">
                  <Icon name="Paperclip" size={12} className="text-zinc-500 group-hover/file:text-primary" />
                  <span className="text-[10px] font-bold text-zinc-600 truncate group-hover/file:text-zinc-400">{activity?.attachment?.name}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-white/5">
        <button className="w-full text-[10px] font-black uppercase tracking-[0.2em] text-primary hover:text-white transition-all duration-300">
          History Explorer
        </button>
      </div>
    </div>
  );
};

export default ActivityFeed;
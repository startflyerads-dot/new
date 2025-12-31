import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UpcomingMilestones = ({ milestones }) => {
  const getPriorityTheme = (priority) => {
    switch (priority) {
      case 'high': return 'text-rose-400 bg-rose-500/10 border-rose-500/20';
      case 'medium': return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
      case 'low': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      default: return 'text-zinc-500 bg-zinc-900 border-white/5';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getDaysUntil = (dateString) => {
    const today = new Date();
    const targetDate = new Date(dateString);
    const diffTime = targetDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return 'Overdue';
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    return `${diffDays} days`;
  };

  return (
    <div className="relative p-8 rounded-[2.5rem] bg-zinc-900/40 border border-white/5 backdrop-blur-3xl overflow-hidden">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xl font-black text-white tracking-tight">Roadmap</h3>
        <Button variant="ghost" size="sm" className="text-[10px] font-black uppercase tracking-widest text-primary hover:bg-primary/10">
          Full Schedule <Icon name="Calendar" size={14} className="ml-2" />
        </Button>
      </div>

      <div className="space-y-4">
        {milestones?.map((milestone) => (
          <div key={milestone?.id} className="group relative flex items-start gap-6 p-6 rounded-2xl border border-white/5 hover:border-white/10 hover:bg-white/[0.02] transition-all duration-300">
            <div className={`flex-shrink-0 w-12 h-12 rounded-xl border flex items-center justify-center transition-transform group-hover:scale-110 ${getPriorityTheme(milestone?.priority)}`}>
              <Icon name="Flag" size={18} />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-4 mb-3">
                <h4 className="text-sm font-black text-white uppercase tracking-widest truncate">{milestone?.title}</h4>
                <div className={`flex-shrink-0 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${getDaysUntil(milestone?.dueDate) === 'Overdue' ? 'bg-rose-500 text-white'
                    : getDaysUntil(milestone?.dueDate) === 'Today' ? 'bg-amber-500 text-black' : 'bg-white/5 text-zinc-500'
                  }`}>
                  {getDaysUntil(milestone?.dueDate)}
                </div>
              </div>

              <p className="text-sm font-medium text-zinc-500 leading-relaxed mb-6">
                {milestone?.description}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <Icon name="Calendar" size={12} className="text-primary" />
                    <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">{formatDate(milestone?.dueDate)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="FolderOpen" size={12} className="text-secondary" />
                    <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest truncate max-w-[120px]">{milestone?.project}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {milestone?.assignee && (
                    <div className="flex items-center gap-2 bg-black/20 px-2 py-1 rounded-lg border border-white/5">
                      <div className="w-5 h-5 bg-primary/20 rounded-md flex items-center justify-center">
                        <span className="text-[10px] font-black text-primary">
                          {milestone?.assignee?.charAt(0)}
                        </span>
                      </div>
                      <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{milestone.assignee.split(' ')[0]}</span>
                    </div>
                  )}
                  <Button variant="ghost" size="icon" className="w-8 h-8 rounded-lg hover:bg-white/5">
                    <Icon name="ArrowRight" size={14} className="text-zinc-500" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {milestones?.length === 0 && (
        <div className="text-center py-20 bg-white/[0.01] rounded-3xl border border-dashed border-white/5">
          <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6">
            <Icon name="Calendar" size={24} className="text-zinc-600" />
          </div>
          <h4 className="text-sm font-black text-white uppercase tracking-widest mb-2">Efficiency Overload</h4>
          <p className="text-xs font-bold text-zinc-600 uppercase tracking-widest">No pending milestones detected.</p>
        </div>
      )}
    </div>
  );
};

export default UpcomingMilestones;
import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProjectCard = ({ project }) => {
  const getStatusTheme = (status) => {
    switch (status) {
      case 'completed': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      case 'in-progress': return 'text-primary bg-primary/10 border-primary/20';
      case 'pending': return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
      case 'on-hold': return 'text-rose-400 bg-rose-500/10 border-rose-500/20';
      default: return 'text-zinc-500 bg-white/5 border-white/10';
    }
  };

  const statusTheme = getStatusTheme(project?.status);

  return (
    <div className="relative group p-8 rounded-[2.5rem] bg-zinc-900/40 border border-white/5 backdrop-blur-3xl hover:bg-zinc-900/60 transition-all duration-500">
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-8">
          <div className="flex-1 pr-4">
            <h3 className="text-xl font-black text-white tracking-tight mb-2 group-hover:text-primary transition-colors">
              {project?.name}
            </h3>
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${statusTheme}`}>
              <div className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
              {project?.status?.replace('-', ' ')}
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 hover:border-primary/30 hover:text-primary transition-all">
              <Icon name="MessageSquare" size={16} />
            </Button>
          </div>
        </div>

        <p className="text-sm text-zinc-500 font-medium leading-relaxed mb-8 line-clamp-2">
          {project?.description}
        </p>

        <div className="space-y-6 pt-6 border-t border-white/5">
          <div>
            <div className="flex items-center justify-between mb-3 text-[10px] font-black uppercase tracking-widest">
              <span className="text-zinc-500">Completion</span>
              <span className="text-primary">{project?.progress}%</span>
            </div>
            <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(229,123,70,0.3)]"
                style={{ width: `${project?.progress}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 bg-white/[0.02] p-4 rounded-2xl border border-white/5">
            <div>
              <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-1">Launched</p>
              <p className="text-xs font-black text-white">{project?.startDate}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-1">Due</p>
              <p className="text-xs font-black text-white">{project?.dueDate}</p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4">
            <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
              <Icon name="Users" size={14} />
              <span>{project?.teamSize} Experts</span>
            </div>
            <Button variant="ghost" size="sm" className="text-[10px] font-black uppercase tracking-widest text-primary hover:bg-primary/10">
              Overview <Icon name="ArrowRight" size={12} className="ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
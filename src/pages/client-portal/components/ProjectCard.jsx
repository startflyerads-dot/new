import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProjectCard = ({ project }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-success text-success-foreground';
      case 'in-progress':
        return 'bg-primary text-primary-foreground';
      case 'pending':
        return 'bg-warning text-warning-foreground';
      case 'on-hold':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-secondary text-secondary-foreground';
    }
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'bg-success';
    if (progress >= 50) return 'bg-primary';
    if (progress >= 25) return 'bg-warning';
    return 'bg-error';
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6 shadow-professional hover:shadow-professional-lg transition-all duration-300 animate-elastic-hover">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-card-foreground mb-2">{project?.name}</h3>
          <p className="text-sm text-muted-foreground mb-3">{project?.description}</p>
          <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project?.status)}`}>
            <Icon name="Circle" size={8} className="mr-2" />
            {project?.status?.replace('-', ' ')?.toUpperCase()}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" iconName="MessageSquare" />
          <Button variant="ghost" size="icon" iconName="MoreVertical" />
        </div>
      </div>
      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-card-foreground">Progress</span>
            <span className="text-sm font-semibold text-primary">{project?.progress}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-500 ${getProgressColor(project?.progress)}`}
              style={{ width: `${project?.progress}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Start Date</p>
            <p className="text-sm font-medium text-card-foreground">{project?.startDate}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Due Date</p>
            <p className="text-sm font-medium text-card-foreground">{project?.dueDate}</p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center space-x-2">
            <Icon name="Users" size={16} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{project?.teamSize} team members</span>
          </div>
          <Button variant="outline" size="sm" iconName="ExternalLink" iconPosition="right">
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
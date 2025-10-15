import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UpcomingMilestones = ({ milestones }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'medium':
        return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'low':
        return 'text-green-600 bg-green-50 border-green-200';
      default:
        return 'text-muted-foreground bg-muted border-border';
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
    <div className="bg-card rounded-xl border border-border p-6 shadow-professional">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-card-foreground">Upcoming Milestones</h3>
        <Button variant="ghost" size="sm" iconName="Calendar" iconPosition="left">
          View Calendar
        </Button>
      </div>
      <div className="space-y-4">
        {milestones?.map((milestone) => (
          <div key={milestone?.id} className="flex items-start space-x-4 p-4 rounded-lg border border-border hover:shadow-professional transition-all duration-200">
            <div className="flex-shrink-0">
              <div className={`w-12 h-12 rounded-lg border flex items-center justify-center ${getPriorityColor(milestone?.priority)}`}>
                <Icon name="Flag" size={20} />
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-semibold text-card-foreground">{milestone?.title}</h4>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                  getDaysUntil(milestone?.dueDate) === 'Overdue' ?'text-red-600 bg-red-50' 
                    : getDaysUntil(milestone?.dueDate) === 'Today' ?'text-orange-600 bg-orange-50' :'text-muted-foreground bg-muted'
                }`}>
                  {getDaysUntil(milestone?.dueDate)}
                </span>
              </div>
              
              <p className="text-sm text-muted-foreground mb-3">{milestone?.description}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Icon name="Calendar" size={14} className="text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{formatDate(milestone?.dueDate)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="FolderOpen" size={14} className="text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{milestone?.project}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {milestone?.assignee && (
                    <div className="flex items-center space-x-1">
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium text-primary-foreground">
                          {milestone?.assignee?.charAt(0)}
                        </span>
                      </div>
                    </div>
                  )}
                  <Button variant="ghost" size="sm" iconName="ExternalLink">
                    View
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {milestones?.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Calendar" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h4 className="text-lg font-medium text-card-foreground mb-2">No upcoming milestones</h4>
          <p className="text-sm text-muted-foreground">All milestones are up to date</p>
        </div>
      )}
    </div>
  );
};

export default UpcomingMilestones;
import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ActivityFeed = ({ activities }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'message':
        return 'MessageSquare';
      case 'file':
        return 'FileText';
      case 'milestone':
        return 'Flag';
      case 'meeting':
        return 'Calendar';
      case 'payment':
        return 'CreditCard';
      case 'update':
        return 'Bell';
      default:
        return 'Activity';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'message':
        return 'text-blue-500 bg-blue-50';
      case 'file':
        return 'text-green-500 bg-green-50';
      case 'milestone':
        return 'text-purple-500 bg-purple-50';
      case 'meeting':
        return 'text-orange-500 bg-orange-50';
      case 'payment':
        return 'text-emerald-500 bg-emerald-50';
      case 'update':
        return 'text-primary bg-primary/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - activityTime) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d ago`;
    }
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6 shadow-professional">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-card-foreground">Recent Activity</h3>
        <Icon name="Activity" size={20} className="text-muted-foreground" />
      </div>
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {activities?.map((activity) => (
          <div key={activity?.id} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-colors duration-200">
            <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${getActivityColor(activity?.type)}`}>
              <Icon name={getActivityIcon(activity?.type)} size={16} />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                {activity?.user?.avatar && (
                  <Image 
                    src={activity?.user?.avatar} 
                    alt={activity?.user?.avatarAlt}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                )}
                <span className="text-sm font-medium text-card-foreground">{activity?.user?.name}</span>
                <span className="text-xs text-muted-foreground">{formatTimeAgo(activity?.timestamp)}</span>
              </div>
              
              <p className="text-sm text-muted-foreground mb-2">{activity?.description}</p>
              
              {activity?.attachment && (
                <div className="flex items-center space-x-2 p-2 bg-muted rounded-lg">
                  <Icon name="Paperclip" size={14} className="text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{activity?.attachment?.name}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-border">
        <button className="w-full text-sm text-primary hover:text-primary/80 font-medium transition-colors duration-200">
          View All Activity
        </button>
      </div>
    </div>
  );
};

export default ActivityFeed;
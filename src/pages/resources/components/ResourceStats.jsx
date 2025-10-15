import React from 'react';
import Icon from '../../../components/AppIcon';

const ResourceStats = ({ stats }) => {
  const statItems = [
    {
      icon: 'FileText',
      label: 'Total Resources',
      value: stats?.totalResources,
      change: '+12 this month',
      color: 'text-blue-600 bg-blue-50'
    },
    {
      icon: 'Download',
      label: 'Downloads',
      value: stats?.totalDownloads,
      change: '+2.3k this week',
      color: 'text-green-600 bg-green-50'
    },
    {
      icon: 'Users',
      label: 'Active Users',
      value: stats?.activeUsers,
      change: '+15% growth',
      color: 'text-purple-600 bg-purple-50'
    },
    {
      icon: 'Star',
      label: 'Avg Rating',
      value: stats?.avgRating,
      change: 'Excellent feedback',
      color: 'text-yellow-600 bg-yellow-50'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statItems?.map((item, index) => (
        <div
          key={index}
          className="bg-card rounded-xl border border-border p-6 hover:shadow-professional transition-all duration-300 animate-elastic-hover"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-lg ${item?.color}`}>
              <Icon name={item?.icon} size={24} />
            </div>
            <Icon name="TrendingUp" size={16} className="text-green-500" />
          </div>
          
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-1">
              {item?.value}
            </h3>
            <p className="text-sm font-medium text-muted-foreground mb-2">
              {item?.label}
            </p>
            <p className="text-xs text-green-600 font-medium">
              {item?.change}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ResourceStats;
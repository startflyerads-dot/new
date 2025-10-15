import React from 'react';
import Icon from '../../../components/AppIcon';

const StatsOverview = ({ stats }) => {
  const getStatIcon = (type) => {
    switch (type) {
      case 'projects':
        return 'FolderOpen';
      case 'completed':
        return 'CheckCircle';
      case 'hours':
        return 'Clock';
      case 'team':
        return 'Users';
      default:
        return 'BarChart3';
    }
  };

  const getStatColor = (type) => {
    switch (type) {
      case 'projects':
        return 'text-blue-600 bg-blue-50';
      case 'completed':
        return 'text-green-600 bg-green-50';
      case 'hours':
        return 'text-orange-600 bg-orange-50';
      case 'team':
        return 'text-purple-600 bg-purple-50';
      default:
        return 'text-primary bg-primary/10';
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats?.map((stat) => (
        <div key={stat?.id} className="bg-card rounded-xl border border-border p-6 shadow-professional hover:shadow-professional-lg transition-all duration-300 animate-elastic-hover">
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getStatColor(stat?.type)}`}>
              <Icon name={getStatIcon(stat?.type)} size={24} />
            </div>
            {stat?.trend && (
              <div className={`flex items-center space-x-1 text-xs font-medium ${
                stat?.trend > 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                <Icon name={stat?.trend > 0 ? 'TrendingUp' : 'TrendingDown'} size={14} />
                <span>{Math.abs(stat?.trend)}%</span>
              </div>
            )}
          </div>
          
          <div>
            <h3 className="text-2xl font-bold text-card-foreground mb-1">{stat?.value}</h3>
            <p className="text-sm text-muted-foreground">{stat?.label}</p>
            {stat?.subtitle && (
              <p className="text-xs text-muted-foreground mt-1">{stat?.subtitle}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsOverview;
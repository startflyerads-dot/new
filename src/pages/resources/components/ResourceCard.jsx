import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ResourceCard = ({ resource, onDownload, onPreview }) => {
  const getTypeIcon = (type) => {
    switch (type) {
      case 'template': return 'FileText';
      case 'calculator': return 'Calculator';
      case 'whitepaper': return 'BookOpen';
      case 'checklist': return 'CheckSquare';
      case 'guide': return 'Map';
      case 'assessment': return 'ClipboardList';
      default: return 'File';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'template': return 'text-blue-600 bg-blue-50';
      case 'calculator': return 'text-green-600 bg-green-50';
      case 'whitepaper': return 'text-purple-600 bg-purple-50';
      case 'checklist': return 'text-orange-600 bg-orange-50';
      case 'guide': return 'text-indigo-600 bg-indigo-50';
      case 'assessment': return 'text-pink-600 bg-pink-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6 hover:shadow-professional-lg transition-all duration-300 group animate-elastic-hover">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-lg ${getTypeColor(resource?.type)}`}>
          <Icon name={getTypeIcon(resource?.type)} size={24} />
        </div>
        <div className="flex items-center space-x-2">
          {resource?.isPremium && (
            <span className="px-2 py-1 bg-gradient-primary text-white text-xs font-medium rounded-full">
              Premium
            </span>
          )}
          {resource?.isNew && (
            <span className="px-2 py-1 bg-accent text-accent-foreground text-xs font-medium rounded-full">
              New
            </span>
          )}
        </div>
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-200">
        {resource?.title}
      </h3>
      <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
        {resource?.description}
      </p>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
          <span className="flex items-center space-x-1">
            <Icon name="Download" size={14} />
            <span>{resource?.downloads}</span>
          </span>
          <span className="flex items-center space-x-1">
            <Icon name="Star" size={14} />
            <span>{resource?.rating}</span>
          </span>
          <span className="flex items-center space-x-1">
            <Icon name="Clock" size={14} />
            <span>{resource?.readTime}</span>
          </span>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        {resource?.type === 'calculator' || resource?.type === 'assessment' ? (
          <Button
            variant="default"
            size="sm"
            iconName="Play"
            iconPosition="left"
            onClick={() => onPreview(resource)}
            className="flex-1"
          >
            Launch Tool
          </Button>
        ) : (
          <Button
            variant="outline"
            size="sm"
            iconName="Eye"
            iconPosition="left"
            onClick={() => onPreview(resource)}
            className="flex-1"
          >
            Preview
          </Button>
        )}
        
        <Button
          variant="default"
          size="sm"
          iconName="Download"
          iconPosition="left"
          onClick={() => onDownload(resource)}
        >
          Download
        </Button>
      </div>
      <div className="flex flex-wrap gap-1 mt-4">
        {resource?.tags?.slice(0, 3)?.map((tag, index) => (
          <span
            key={index}
            className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md"
          >
            {tag}
          </span>
        ))}
        {resource?.tags?.length > 3 && (
          <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md">
            +{resource?.tags?.length - 3} more
          </span>
        )}
      </div>
    </div>
  );
};

export default ResourceCard;
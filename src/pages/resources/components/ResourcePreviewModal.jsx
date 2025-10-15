import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ResourcePreviewModal = ({ resource, isOpen, onClose, onDownload }) => {
  if (!isOpen || !resource) return null;

  const getPreviewContent = () => {
    switch (resource?.type) {
      case 'calculator':
        return (
          <div className="space-y-4">
            <div className="bg-muted rounded-lg p-4">
              <h4 className="font-medium text-foreground mb-2">ROI Calculator Preview</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-muted-foreground">Initial Investment</label>
                  <input 
                    type="number" 
                    placeholder="$10,000" 
                    className="w-full mt-1 px-3 py-2 border border-border rounded-md"
                    disabled
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Expected Return</label>
                  <input 
                    type="number" 
                    placeholder="15%" 
                    className="w-full mt-1 px-3 py-2 border border-border rounded-md"
                    disabled
                  />
                </div>
              </div>
              <div className="mt-4 p-3 bg-green-50 rounded-md">
                <p className="text-sm text-green-700">
                  <strong>Projected ROI:</strong> $1,500 (15% return)
                </p>
              </div>
            </div>
          </div>
        );
      case 'template':
        return (
          <div className="space-y-4">
            <div className="bg-muted rounded-lg p-4">
              <h4 className="font-medium text-foreground mb-2">Template Preview</h4>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <Icon name="FileText" size={48} className="text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">
                  Professional template with customizable sections
                </p>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="space-y-4">
            <div className="bg-muted rounded-lg p-4">
              <h4 className="font-medium text-foreground mb-2">Resource Preview</h4>
              <p className="text-muted-foreground">
                This resource contains valuable insights and actionable strategies for your business.
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-xl border border-border max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              {resource?.title}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {resource?.type?.charAt(0)?.toUpperCase() + resource?.type?.slice(1)} • {resource?.readTime}
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            onClick={onClose}
          />
        </div>

        <div className="p-6">
          <div className="mb-6">
            <p className="text-muted-foreground mb-4">
              {resource?.description}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {resource?.tags?.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {getPreviewContent()}

          <div className="flex items-center justify-between mt-6 pt-6 border-t border-border">
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span className="flex items-center space-x-1">
                <Icon name="Download" size={14} />
                <span>{resource?.downloads} downloads</span>
              </span>
              <span className="flex items-center space-x-1">
                <Icon name="Star" size={14} />
                <span>{resource?.rating}/5 rating</span>
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                iconName="Share"
                iconPosition="left"
              >
                Share
              </Button>
              <Button
                variant="default"
                size="sm"
                iconName="Download"
                iconPosition="left"
                onClick={() => onDownload(resource)}
              >
                Download Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourcePreviewModal;
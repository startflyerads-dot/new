import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FeaturedTools = ({ tools, onLaunchTool }) => {
  const getToolIcon = (type) => {
    switch (type) {
      case 'roi-calculator': return 'Calculator';
      case 'assessment': return 'ClipboardList';
      case 'analyzer': return 'BarChart3';
      case 'planner': return 'Calendar';
      default: return 'Tool';
    }
  };

  return (
    <div className="mb-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-4">
          Interactive Tools & Calculators
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Get instant insights with our suite of professional tools designed to help you make data-driven decisions
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools?.map((tool) => (
          <div
            key={tool?.id}
            className="bg-gradient-to-br from-white to-gray-50 rounded-xl border border-border p-6 hover:shadow-professional-xl transition-all duration-300 group animate-elastic-hover"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Icon name={getToolIcon(tool?.type)} size={28} className="text-primary" />
              </div>
              <span className="px-3 py-1 bg-accent text-accent-foreground text-xs font-medium rounded-full">
                Interactive
              </span>
            </div>

            <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-200">
              {tool?.title}
            </h3>
            
            <p className="text-muted-foreground mb-4">
              {tool?.description}
            </p>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <span className="flex items-center space-x-1">
                  <Icon name="Users" size={14} />
                  <span>{tool?.usageCount}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Icon name="Clock" size={14} />
                  <span>{tool?.avgTime}</span>
                </span>
              </div>
              <div className="flex items-center space-x-1">
                {[...Array(5)]?.map((_, i) => (
                  <Icon
                    key={i}
                    name="Star"
                    size={14}
                    className={i < Math.floor(tool?.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                  />
                ))}
                <span className="text-sm text-muted-foreground ml-1">
                  ({tool?.reviews})
                </span>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <h4 className="text-sm font-medium text-foreground">Key Features:</h4>
              <ul className="space-y-1">
                {tool?.features?.slice(0, 3)?.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Icon name="Check" size={14} className="text-green-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Button
              variant="default"
              fullWidth
              iconName="Play"
              iconPosition="left"
              onClick={() => onLaunchTool(tool)}
              className="shadow-professional"
            >
              Launch {tool?.title}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedTools;
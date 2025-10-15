import React from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const SearchFilters = ({ 
  searchQuery, 
  setSearchQuery, 
  selectedCategory, 
  setSelectedCategory,
  selectedType,
  setSelectedType,
  selectedLevel,
  setSelectedLevel,
  onClearFilters,
  activeFiltersCount
}) => {
  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'business-strategy', label: 'Business Strategy' },
    { value: 'digital-marketing', label: 'Digital Marketing' },
    { value: 'operations', label: 'Operations' },
    { value: 'finance', label: 'Finance & Accounting' },
    { value: 'hr', label: 'Human Resources' },
    { value: 'technology', label: 'Technology' },
    { value: 'legal', label: 'Legal & Compliance' }
  ];

  const typeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'template', label: 'Templates' },
    { value: 'calculator', label: 'Calculators' },
    { value: 'whitepaper', label: 'Whitepapers' },
    { value: 'checklist', label: 'Checklists' },
    { value: 'guide', label: 'Guides' },
    { value: 'assessment', label: 'Assessments' }
  ];

  const levelOptions = [
    { value: 'all', label: 'All Levels' },
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' },
    { value: 'expert', label: 'Expert' }
  ];

  return (
    <div className="bg-card rounded-xl border border-border p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground">Search & Filter Resources</h2>
        {activeFiltersCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            iconPosition="left"
            onClick={onClearFilters}
          >
            Clear Filters ({activeFiltersCount})
          </Button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="relative">
          <Input
            type="search"
            placeholder="Search resources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e?.target?.value)}
            className="pl-10"
          />
          <Icon 
            name="Search" 
            size={18} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
          />
        </div>

        <Select
          placeholder="Select category"
          options={categoryOptions}
          value={selectedCategory}
          onChange={setSelectedCategory}
        />

        <Select
          placeholder="Select type"
          options={typeOptions}
          value={selectedType}
          onChange={setSelectedType}
        />

        <Select
          placeholder="Select level"
          options={levelOptions}
          value={selectedLevel}
          onChange={setSelectedLevel}
        />
      </div>
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <span className="flex items-center space-x-1">
            <Icon name="Filter" size={16} />
            <span>Smart Filters Active</span>
          </span>
          <span className="flex items-center space-x-1">
            <Icon name="Zap" size={16} />
            <span>AI-Powered Recommendations</span>
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" iconName="Bookmark">
            Save Search
          </Button>
          <Button variant="ghost" size="sm" iconName="Bell">
            Get Alerts
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;
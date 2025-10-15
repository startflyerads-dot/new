import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ServiceFilters = ({ 
  searchTerm, 
  setSearchTerm, 
  selectedCategory, 
  setSelectedCategory, 
  selectedPriceRange, 
  setSelectedPriceRange,
  sortBy,
  setSortBy,
  onClearFilters,
  categories,
  activeFiltersCount 
}) => {
  const priceRangeOptions = [
    { value: 'all', label: 'All Price Ranges' },
    { value: 'budget', label: 'Budget Friendly ($500 - $2,000)' },
    { value: 'standard', label: 'Standard ($2,000 - $10,000)' },
    { value: 'premium', label: 'Premium ($10,000+)' },
    { value: 'custom', label: 'Custom Pricing' }
  ];

  const sortOptions = [
    { value: 'popularity', label: 'Most Popular' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'name', label: 'Alphabetical' },
    { value: 'newest', label: 'Newest First' }
  ];

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    ...categories?.map(cat => ({ value: cat?.value, label: cat?.label }))
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-card rounded-2xl p-6 shadow-professional mb-8"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Icon name="Filter" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Filter Services</h3>
            <p className="text-sm text-muted-foreground">Find the perfect service for your needs</p>
          </div>
        </div>
        
        {activeFiltersCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            iconPosition="left"
            onClick={onClearFilters}
            className="text-muted-foreground hover:text-foreground"
          >
            Clear All ({activeFiltersCount})
          </Button>
        )}
      </div>
      {/* Search and Filters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search */}
        <div className="lg:col-span-2">
          <Input
            type="search"
            placeholder="Search services, features, or keywords..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e?.target?.value)}
            className="w-full"
          />
        </div>

        {/* Category Filter */}
        <div>
          <Select
            placeholder="Select category"
            options={categoryOptions}
            value={selectedCategory}
            onChange={setSelectedCategory}
          />
        </div>

        {/* Sort By */}
        <div>
          <Select
            placeholder="Sort by"
            options={sortOptions}
            value={sortBy}
            onChange={setSortBy}
          />
        </div>
      </div>
      {/* Advanced Filters Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {/* Price Range */}
        <div>
          <Select
            placeholder="Price range"
            options={priceRangeOptions}
            value={selectedPriceRange}
            onChange={setSelectedPriceRange}
          />
        </div>

        {/* Quick Filter Tags */}
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-muted-foreground">Quick filters:</span>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('consulting')}
              className="px-3 py-1 text-xs bg-secondary/20 text-secondary-foreground rounded-full hover:bg-secondary/30 transition-colors duration-200"
            >
              Consulting
            </button>
            <button
              onClick={() => setSelectedCategory('development')}
              className="px-3 py-1 text-xs bg-accent/20 text-accent-foreground rounded-full hover:bg-accent/30 transition-colors duration-200"
            >
              Development
            </button>
            <button
              onClick={() => setSelectedPriceRange('budget')}
              className="px-3 py-1 text-xs bg-primary/20 text-primary-foreground rounded-full hover:bg-primary/30 transition-colors duration-200"
            >
              Budget Friendly
            </button>
          </div>
        </div>
      </div>
      {/* Active Filters Display */}
      {activeFiltersCount > 0 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-4 pt-4 border-t border-border"
        >
          <div className="flex items-center space-x-2">
            <Icon name="Filter" size={16} className="text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">Active filters:</span>
            <div className="flex flex-wrap gap-2">
              {searchTerm && (
                <span className="px-2 py-1 text-xs bg-primary text-primary-foreground rounded-full">
                  Search: "{searchTerm}"
                </span>
              )}
              {selectedCategory !== 'all' && (
                <span className="px-2 py-1 text-xs bg-secondary text-secondary-foreground rounded-full">
                  Category: {categoryOptions?.find(c => c?.value === selectedCategory)?.label}
                </span>
              )}
              {selectedPriceRange !== 'all' && (
                <span className="px-2 py-1 text-xs bg-accent text-accent-foreground rounded-full">
                  Price: {priceRangeOptions?.find(p => p?.value === selectedPriceRange)?.label}
                </span>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ServiceFilters;
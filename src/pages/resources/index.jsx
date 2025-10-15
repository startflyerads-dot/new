import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ResourceCard from './components/ResourceCard';
import SearchFilters from './components/SearchFilters';
import FeaturedTools from './components/FeaturedTools';
import NewsletterSignup from './components/NewsletterSignup';
import ResourceStats from './components/ResourceStats';
import ResourcePreviewModal from './components/ResourcePreviewModal';

const Resources = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedResource, setSelectedResource] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [filteredResources, setFilteredResources] = useState([]);

  // Mock data for resources
  const mockResources = [
  {
    id: 1,
    title: "Business Strategy Template",
    description: "Comprehensive template for developing and documenting your business strategy with actionable frameworks and proven methodologies.",
    type: "template",
    category: "business-strategy",
    level: "intermediate",
    isPremium: false,
    isNew: true,
    downloads: "2.3k",
    rating: 4.8,
    readTime: "15 min",
    tags: ["Strategy", "Planning", "Framework", "Business Model"],
    image: "https://images.unsplash.com/photo-1719765868011-68a88e7db83d",
    imageAlt: "Professional business meeting with strategy documents and charts on conference table"
  },
  {
    id: 2,
    title: "ROI Calculator Pro",
    description: "Advanced ROI calculator with multiple scenarios, risk assessment, and detailed reporting capabilities for investment decisions.",
    type: "calculator",
    category: "finance",
    level: "advanced",
    isPremium: true,
    isNew: false,
    downloads: "1.8k",
    rating: 4.9,
    readTime: "5 min",
    tags: ["ROI", "Finance", "Calculator", "Investment"],
    image: "https://images.unsplash.com/photo-1712640183722-ec59693f7c82",
    imageAlt: "Financial charts and calculator on desk with laptop showing investment data"
  },
  {
    id: 3,
    title: "Digital Marketing Whitepaper",
    description: "In-depth analysis of current digital marketing trends, consumer behavior patterns, and future predictions for 2024-2025.",
    type: "whitepaper",
    category: "digital-marketing",
    level: "expert",
    isPremium: true,
    isNew: true,
    downloads: "3.1k",
    rating: 4.7,
    readTime: "25 min",
    tags: ["Marketing", "Digital", "Trends", "Strategy"],
    image: "https://images.unsplash.com/photo-1516383274235-5f42d6c6426d",
    imageAlt: "Digital marketing dashboard with analytics graphs and social media metrics on computer screen"
  },
  {
    id: 4,
    title: "Project Management Checklist",
    description: "Complete checklist covering all phases of project management from initiation to closure with quality gates and deliverables.",
    type: "checklist",
    category: "operations",
    level: "beginner",
    isPremium: false,
    isNew: false,
    downloads: "4.2k",
    rating: 4.6,
    readTime: "10 min",
    tags: ["Project Management", "Checklist", "Process", "Quality"],
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0",
    imageAlt: "Project manager reviewing checklist with team members around whiteboard with project timeline"
  },
  {
    id: 5,
    title: "HR Compliance Guide",
    description: "Comprehensive guide to HR compliance requirements, legal obligations, and best practices for modern workplaces.",
    type: "guide",
    category: "hr",
    level: "intermediate",
    isPremium: false,
    isNew: false,
    downloads: "1.9k",
    rating: 4.5,
    readTime: "20 min",
    tags: ["HR", "Compliance", "Legal", "Workplace"],
    image: "https://images.unsplash.com/photo-1636392051191-e21f558fd35e",
    imageAlt: "HR professional reviewing compliance documents with legal books and laptop in modern office"
  },
  {
    id: 6,
    title: "Business Readiness Assessment",
    description: "Interactive assessment tool to evaluate your business readiness for growth, digital transformation, or market expansion.",
    type: "assessment",
    category: "business-strategy",
    level: "intermediate",
    isPremium: true,
    isNew: true,
    downloads: "1.5k",
    rating: 4.8,
    readTime: "12 min",
    tags: ["Assessment", "Business", "Growth", "Evaluation"],
    image: "https://images.unsplash.com/photo-1714974528693-f77f6fcc56af",
    imageAlt: "Business assessment meeting with executives reviewing growth charts and strategic documents"
  }];


  // Mock data for featured tools
  const mockFeaturedTools = [
  {
    id: 1,
    title: "ROI Calculator",
    description: "Calculate return on investment with advanced scenarios and risk analysis",
    type: "roi-calculator",
    usageCount: "5.2k users",
    avgTime: "8 min",
    rating: 4.9,
    reviews: 234,
    features: [
    "Multiple investment scenarios",
    "Risk assessment matrix",
    "Detailed reporting",
    "Export to PDF/Excel"]

  },
  {
    id: 2,
    title: "Business Health Assessment",
    description: "Comprehensive evaluation of your business performance across key metrics",
    type: "assessment",
    usageCount: "3.8k users",
    avgTime: "15 min",
    rating: 4.7,
    reviews: 189,
    features: [
    "360-degree business analysis",
    "Benchmarking against industry",
    "Actionable recommendations",
    "Progress tracking"]

  },
  {
    id: 3,
    title: "Market Analysis Tool",
    description: "Analyze market trends and competitive landscape for strategic planning",
    type: "analyzer",
    usageCount: "2.9k users",
    avgTime: "12 min",
    rating: 4.6,
    reviews: 156,
    features: [
    "Competitive analysis",
    "Market trend identification",
    "SWOT analysis generator",
    "Strategic recommendations"]

  }];


  // Mock stats data
  const mockStats = {
    totalResources: "150+",
    totalDownloads: "25.6k",
    activeUsers: "8.9k",
    avgRating: "4.8/5"
  };

  // Filter resources based on search and filters
  useEffect(() => {
    let filtered = mockResources;

    if (searchQuery) {
      filtered = filtered?.filter((resource) =>
      resource?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      resource?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      resource?.tags?.some((tag) => tag?.toLowerCase()?.includes(searchQuery?.toLowerCase()))
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered?.filter((resource) => resource?.category === selectedCategory);
    }

    if (selectedType !== 'all') {
      filtered = filtered?.filter((resource) => resource?.type === selectedType);
    }

    if (selectedLevel !== 'all') {
      filtered = filtered?.filter((resource) => resource?.level === selectedLevel);
    }

    setFilteredResources(filtered);
  }, [searchQuery, selectedCategory, selectedType, selectedLevel]);

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedType('all');
    setSelectedLevel('all');
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (searchQuery) count++;
    if (selectedCategory !== 'all') count++;
    if (selectedType !== 'all') count++;
    if (selectedLevel !== 'all') count++;
    return count;
  };

  const handleDownload = (resource) => {
    // Mock download functionality
    console.log('Downloading:', resource?.title);
    // In real app, this would trigger actual download
  };

  const handlePreview = (resource) => {
    setSelectedResource(resource);
    setIsPreviewOpen(true);
  };

  const handleLaunchTool = (tool) => {
    // Mock tool launch functionality
    console.log('Launching tool:', tool?.title);
    // In real app, this would open the interactive tool
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Resources - ServiceHub Pro | Interactive Knowledge Base & Tools</title>
        <meta name="description" content="Access our comprehensive resource vault featuring interactive tools, calculators, templates, whitepapers, and guides. Get instant insights with professional business tools." />
        <meta name="keywords" content="business resources, templates, calculators, tools, whitepapers, guides, assessments, ROI calculator, business tools" />
      </Helmet>
      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center animate-ring-rotate">
                  <Icon name="BookOpen" size={32} color="white" strokeWidth={2.5} />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Resource Vault
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                Unlock your business potential with our comprehensive collection of interactive tools, 
                professional templates, and expert insights designed to drive measurable results.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  variant="default"
                  size="lg"
                  iconName="Zap"
                  iconPosition="left"
                  className="animate-elastic-hover shadow-professional">

                  Explore Interactive Tools
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  iconName="Download"
                  iconPosition="left"
                  className="animate-elastic-hover">

                  Browse Templates
                </Button>
              </div>
            </div>

            {/* Resource Stats */}
            <ResourceStats stats={mockStats} />
          </div>
        </section>

        {/* Featured Tools Section */}
        <section className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FeaturedTools tools={mockFeaturedTools} onLaunchTool={handleLaunchTool} />
          </div>
        </section>

        {/* Resources Section */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Professional Resource Library
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Discover templates, guides, whitepapers, and assessments crafted by industry experts
              </p>
            </div>

            {/* Search and Filters */}
            <SearchFilters
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedType={selectedType}
              setSelectedType={setSelectedType}
              selectedLevel={selectedLevel}
              setSelectedLevel={setSelectedLevel}
              onClearFilters={handleClearFilters}
              activeFiltersCount={getActiveFiltersCount()} />


            {/* Results Summary */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <h3 className="text-lg font-semibold text-foreground">
                  {filteredResources?.length} Resources Found
                </h3>
                {getActiveFiltersCount() > 0 &&
                <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                    {getActiveFiltersCount()} filter{getActiveFiltersCount() > 1 ? 's' : ''} active
                  </span>
                }
              </div>
              
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" iconName="Grid3X3">
                  Grid
                </Button>
                <Button variant="ghost" size="sm" iconName="List">
                  List
                </Button>
              </div>
            </div>

            {/* Resources Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {filteredResources?.map((resource) =>
              <ResourceCard
                key={resource?.id}
                resource={resource}
                onDownload={handleDownload}
                onPreview={handlePreview} />

              )}
            </div>

            {filteredResources?.length === 0 &&
            <div className="text-center py-12">
                <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  No resources found
                </h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search criteria or clearing filters
                </p>
                <Button
                variant="outline"
                iconName="RotateCcw"
                iconPosition="left"
                onClick={handleClearFilters}>

                  Clear All Filters
                </Button>
              </div>
            }
          </div>
        </section>

        {/* Newsletter Signup Section */}
        <section className="py-16 bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <NewsletterSignup />
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-dark to-surface text-text-primary">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name="Rocket" size={32} color="white" />
            </div>
            <h2 className="text-3xl font-bold mb-4">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
              Get personalized recommendations and access to premium resources with a consultation
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                variant="default"
                size="lg"
                iconName="Calendar"
                iconPosition="left"
                className="bg-cta hover:bg-cta/90 animate-elastic-hover shadow-professional">

                Schedule Consultation
              </Button>
              <Button
                variant="outline"
                size="lg"
                iconName="Phone"
                iconPosition="left"
                className="border-text-secondary text-text-secondary hover:bg-text-secondary hover:text-dark animate-elastic-hover">

                Contact Expert
              </Button>
            </div>
          </div>
        </section>
      </main>
      {/* Resource Preview Modal */}
      <ResourcePreviewModal
        resource={selectedResource}
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        onDownload={handleDownload} />

      {/* Footer */}
      <footer className="bg-dark text-text-primary py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                  <Icon name="Zap" size={16} color="white" strokeWidth={2.5} />
                </div>
                <span className="text-lg font-bold">ServiceHub Pro</span>
              </div>
              <p className="text-text-secondary text-sm">
                Empowering businesses with professional services and innovative solutions.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li><a href="#" className="hover:text-text-primary transition-colors">Templates</a></li>
                <li><a href="#" className="hover:text-text-primary transition-colors">Calculators</a></li>
                <li><a href="#" className="hover:text-text-primary transition-colors">Whitepapers</a></li>
                <li><a href="#" className="hover:text-text-primary transition-colors">Guides</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li><a href="#" className="hover:text-text-primary transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-text-primary transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-text-primary transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-text-primary transition-colors">Status</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Connect</h3>
              <div className="flex space-x-3">
                <a href="#" className="w-8 h-8 bg-surface rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                  <Icon name="Twitter" size={16} />
                </a>
                <a href="#" className="w-8 h-8 bg-surface rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                  <Icon name="Linkedin" size={16} />
                </a>
                <a href="#" className="w-8 h-8 bg-surface rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                  <Icon name="Github" size={16} />
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-surface mt-8 pt-8 text-center text-sm text-text-secondary">
            <p>&copy; {new Date()?.getFullYear()} ServiceHub Pro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>);

};

export default Resources;
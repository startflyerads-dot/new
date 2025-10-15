
import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const DocumentLibrary = ({ documents }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const getFileIcon = (type) => {
    switch (type) {
      case 'pdf':
        return 'FileText';
      case 'doc': case'docx':
        return 'FileText';
      case 'xls': case'xlsx':
        return 'FileSpreadsheet';
      case 'ppt': case'pptx':
        return 'Presentation';
      case 'img':
        return 'Image';
      case 'zip':
        return 'Archive';
      default:
        return 'File';
    }
  };

  const getFileColor = (type) => {
    switch (type) {
      case 'pdf':
        return 'text-red-600 bg-red-50';
      case 'doc': case'docx':
        return 'text-blue-600 bg-blue-50';
      case 'xls': case'xlsx':
        return 'text-green-600 bg-green-50';
      case 'ppt': case'pptx':
        return 'text-orange-600 bg-orange-50';
      case 'img':
        return 'text-purple-600 bg-purple-50';
      case 'zip':
        return 'text-gray-600 bg-gray-50';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const categories = ['all', 'contracts', 'reports', 'presentations', 'invoices', 'other'];

  const filteredDocuments = documents?.filter(doc => {
    const matchesSearch = doc?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         doc?.description?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || doc?.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-card rounded-xl border border-border p-6 shadow-professional">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-card-foreground">Document Library</h3>
        <Button variant="default" size="sm" iconName="Upload" iconPosition="left">
          Upload Document
        </Button>
      </div>
      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <Input
            type="search"
            placeholder="Search documents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e?.target?.value)}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {categories?.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${
                selectedCategory === category
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {category?.charAt(0)?.toUpperCase() + category?.slice(1)}
            </button>
          ))}
        </div>
      </div>
      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDocuments?.map((document) => (
          <div key={document?.id} className="border border-border rounded-lg p-4 hover:shadow-professional transition-all duration-200 animate-elastic-hover">
            <div className="flex items-start justify-between mb-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getFileColor(document?.type)}`}>
                <Icon name={getFileIcon(document?.type)} size={20} />
              </div>
              <div className="flex items-center space-x-1">
                <Button variant="ghost" size="icon" iconName="Download" className="w-8 h-8" />
                <Button variant="ghost" size="icon" iconName="MoreVertical" className="w-8 h-8" />
              </div>
            </div>
            
            <div className="mb-3">
              <h4 className="text-sm font-semibold text-card-foreground mb-1 truncate">{document?.name}</h4>
              <p className="text-xs text-muted-foreground line-clamp-2">{document?.description}</p>
            </div>
            
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{formatFileSize(document?.size)}</span>
              <span>{formatDate(document?.uploadDate)}</span>
            </div>
            
            <div className="mt-3 pt-3 border-t border-border">
              <div className="flex items-center justify-between">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  document?.status === 'approved' ?'text-green-600 bg-green-50' 
                    : document?.status === 'pending' ?'text-orange-600 bg-orange-50' :'text-muted-foreground bg-muted'
                }`}>
                  {document?.status?.charAt(0)?.toUpperCase() + document?.status?.slice(1)}
                </span>
                <Button variant="ghost" size="sm" className="text-xs h-6">
                  View
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {filteredDocuments?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="FileText" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h4 className="text-lg font-medium text-card-foreground mb-2">No documents found</h4>
          <p className="text-sm text-muted-foreground mb-4">
            {searchTerm ? 'Try adjusting your search terms' : 'Upload your first document to get started'}
          </p>
          <Button variant="outline" iconName="Upload" iconPosition="left">
            Upload Document
          </Button>
        </div>
      )}
    </div>
  );
};

export default DocumentLibrary;
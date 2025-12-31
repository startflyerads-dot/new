import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DocumentLibrary = ({ documents }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const getFileIcon = (type) => {
    switch (type) {
      case 'pdf': return 'FileText';
      case 'doc': case 'docx': return 'FileText';
      case 'xls': case 'xlsx': return 'FileSpreadsheet';
      case 'ppt': case 'pptx': return 'Presentation';
      case 'img': return 'Image';
      case 'zip': return 'Archive';
      default: return 'File';
    }
  };

  const getFileTheme = (type) => {
    switch (type) {
      case 'pdf': return 'text-rose-400 bg-rose-500/10 border-rose-500/20';
      case 'doc': case 'docx': return 'text-primary bg-primary/10 border-primary/20';
      case 'xls': case 'xlsx': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      case 'ppt': case 'pptx': return 'text-orange-400 bg-orange-500/10 border-orange-500/20';
      case 'img': return 'text-purple-400 bg-purple-500/10 border-purple-500/20';
      default: return 'text-zinc-500 bg-white/5 border-white/10';
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
    <div className="relative p-8 rounded-[2.5rem] bg-zinc-900/40 border border-white/5 backdrop-blur-3xl overflow-hidden">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h3 className="text-xl font-black text-white tracking-tight uppercase tracking-[0.1em] mb-2">Vault</h3>
          <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest leading-none">Secure Document Storage</p>
        </div>
        <Button variant="default" size="sm" className="bg-primary text-white font-black px-6 shadow-xl shadow-primary/20">
          Upload <Icon name="Upload" size={14} className="ml-2" />
        </Button>
      </div>

      <div className="flex flex-col xl:flex-row gap-6 mb-10">
        <div className="relative flex-1">
          <Icon name="Search" size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" />
          <input
            type="text"
            placeholder="Search Vault..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e?.target?.value)}
            className="w-full bg-zinc-950/50 border border-white/5 rounded-2xl py-3 pl-10 pr-4 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-primary/50 transition-colors"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {categories?.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${selectedCategory === category
                  ? 'bg-primary text-white shadow-lg shadow-primary/20'
                  : 'bg-white/5 text-zinc-500 hover:text-white hover:bg-white/10'
                }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDocuments?.map((document) => (
          <div key={document?.id} className="group relative p-6 rounded-3xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300">
            <div className="flex items-start justify-between mb-6">
              <div className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-transform group-hover:scale-110 ${getFileTheme(document?.type)}`}>
                <Icon name={getFileIcon(document?.type)} size={20} />
              </div>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" className="w-8 h-8 rounded-lg hover:bg-primary/10 hover:text-primary">
                  <Icon name="Download" size={14} />
                </Button>
                <Button variant="ghost" size="icon" className="w-8 h-8 rounded-lg hover:bg-white/5">
                  <Icon name="MoreVertical" size={14} />
                </Button>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-sm font-black text-white uppercase tracking-widest mb-2 truncate group-hover:text-primary transition-colors">{document?.name}</h4>
              <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.1em] line-clamp-2 leading-relaxed">{document?.description}</p>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-white/5">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-black text-white">{formatFileSize(document?.size)}</span>
                <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">{formatDate(document?.uploadDate)}</span>
              </div>
              <div className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border ${document?.status === 'approved' ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
                  : 'text-amber-400 bg-amber-500/10 border-amber-500/20'
                }`}>
                {document?.status}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredDocuments?.length === 0 && (
        <div className="text-center py-24 bg-white/[0.01] rounded-[2rem] border border-dashed border-white/5">
          <div className="w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center mx-auto mb-6">
            <Icon name="FileText" size={24} className="text-zinc-600" />
          </div>
          <h4 className="text-sm font-black text-white uppercase tracking-widest mb-2">Null Sector</h4>
          <p className="text-xs font-bold text-zinc-600 uppercase tracking-widest mb-8 max-w-xs mx-auto">No records matching your search parameters were found in the vault.</p>
          <Button variant="outline" className="text-[10px] font-black uppercase tracking-widest border-white/5 hover:bg-white/5">
            Reset Archive
          </Button>
        </div>
      )}
    </div>
  );
};

export default DocumentLibrary;
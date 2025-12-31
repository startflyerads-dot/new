import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ProjectCard from './components/ProjectCard';
import ActivityFeed from './components/ActivityFeed';
import QuickActions from './components/QuickActions';
import StatsOverview from './components/StatsOverview';
import MessageCenter from './components/MessageCenter';
import UpcomingMilestones from './components/UpcomingMilestones';
import DocumentLibrary from './components/DocumentLibrary';
import Footer from '../../components/ui/footer';

const ClientPortal = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const { logout, userData } = useAuth();

  const staticProjects = [
    {
      id: 'p1',
      title: "Lantau Peak Expedition",
      status: 'completed',
      completion: 100,
      budget: '$2,400',
      deadline: '2024-06-15'
    },
    {
      id: 'p2',
      title: "Dragon's Back Cultural Walk",
      status: 'in-progress',
      completion: 65,
      budget: '$1,800',
      deadline: '2024-07-20'
    }
  ];

  const staticActivities = [
    {
      id: 1,
      type: 'file',
      user: { name: 'Michael Rodriguez', avatar: "https://images.unsplash.com/photo-1724128195747-dd25cba7860f" },
      description: 'Uploaded trail logistics map for Lantau Peak',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000)
    },
    {
      id: 2,
      type: 'milestone',
      user: { name: 'Emma Chen', avatar: "https://images.unsplash.com/photo-1560859389-c4fb2bd88016" },
      description: 'Completed safety audit for Dragon\'s Back trail',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000)
    }
  ];

  const clientData = {
    name: userData?.name || "Explorer",
    company: userData?.company || "HK Adventure Member",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6",
    memberSince: userData?.memberSince || "January 2024",
    accountManager: "Michael Rodriguez"
  };

  const statsData = [
    {
      id: 1,
      type: 'projects',
      value: '2',
      label: 'Active Trails',
      subtitle: 'Currently in progress',
      trend: 0
    },
    {
      id: 2,
      type: 'completed',
      value: '12',
      label: 'Peaks Conquered',
      subtitle: 'Success verification complete',
      trend: 12
    },
    {
      id: 3,
      type: 'hours',
      value: '48',
      label: 'Trail Hours',
      subtitle: 'Total exploration time',
      trend: 15
    },
    {
      id: 4,
      type: 'team',
      value: '3',
      label: 'Expert Guides',
      subtitle: 'Dedicated support',
      trend: 0
    }
  ];

  const messagesData = [
    {
      id: 1,
      participant: {
        name: 'Michael Rodriguez',
        role: 'Expedition Lead',
        avatar: "https://images.unsplash.com/photo-1724128195747-dd25cba7860f",
        online: true
      },
      lastMessage: {
        content: 'Trail conditions are perfect. See you at the trailhead at 6 AM.',
        timestamp: new Date(Date.now() - 15 * 60 * 1000)
      },
      unreadCount: 1,
      messages: []
    }
  ];

  const milestonesData = [
    {
      id: 1,
      title: 'Lantau Sunset Expedition',
      description: 'Guided night hike to the peak for sunrise views.',
      dueDate: '2024-10-25',
      priority: 'high',
      project: 'Lantau Peak',
      assignee: 'Michael Rodriguez'
    }
  ];

  const documentsData = [
    {
      id: 1,
      name: 'Safety_Guidelines_HK_Trails.pdf',
      description: 'Essential safety documentation for mountain exploration.',
      type: 'pdf',
      size: 1024000,
      category: 'contracts',
      status: 'approved',
      uploadDate: '2024-09-15'
    }
  ];

  const tabs = [
    { id: 'dashboard', name: 'Dashboard', icon: 'LayoutDashboard' },
    { id: 'projects', name: 'Expeditions', icon: 'Mountain' },
    { id: 'messages', name: 'Briefings', icon: 'MessageSquare' },
    { id: 'documents', name: 'Logistics', icon: 'FileText' },
    { id: 'calendar', name: 'Schedule', icon: 'Calendar' }
  ];

  const formatTime = (date) => date?.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  const formatDate = (date) => date?.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-emerald-500/30">
      <Header />
      <main className="pt-24 pb-20 relative">
        {/* Premium Hero Section */}
        <section className="relative py-16 px-4 sm:px-6 lg:px-8 bg-zinc-900 border-b border-white/5 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-background to-teal-500/10" />
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="flex items-center space-x-8">
                <div className="relative group">
                  <div className="absolute inset-0 bg-emerald-500/30 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500" />
                  <img src={clientData.avatar} alt="Profile" className="relative w-24 h-24 rounded-full object-cover border-2 border-emerald-500/50 grayscale-[0.3] group-hover:grayscale-0 transition-all duration-500" />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full border-4 border-zinc-900 flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full animate-ping" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-4xl font-black tracking-tight uppercase">{clientData.name}</h1>
                    <span className="px-2 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Premium Member</span>
                  </div>
                  <p className="text-zinc-400 font-medium mb-1 uppercase tracking-widest text-xs">{clientData.company}</p>
                  <div className="flex items-center gap-4 text-xs text-zinc-500 font-bold uppercase tracking-widest">
                    <span>Member since {clientData.memberSince}</span>
                    <span className="w-1 h-1 bg-zinc-700 rounded-full" />
                    <span>ID: #HK-TOUR-X9</span>
                  </div>
                </div>
              </div>

              <div className="text-center lg:text-right">
                <div className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-2">{formatDate(currentTime)}</div>
                <div className="text-5xl font-black text-white tracking-tighter mb-4">{formatTime(currentTime)}</div>
                <p className="text-xs font-bold text-zinc-400 mb-6 uppercase tracking-widest">
                  Expedition Lead: <span className="text-white">{clientData.accountManager}</span>
                </p>
                <Button variant="ghost" onClick={logout} className="text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-emerald-500 transition-all p-0">
                  Secure Termination <Icon name="LogOut" size={12} className="ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Navigation Tabs */}
        <section className="sticky top-16 z-40 px-4 sm:px-6 lg:px-8 border-b border-white/5 bg-zinc-950/80 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto">
            <nav className="flex space-x-1 overflow-x-auto py-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-3 py-3 px-6 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all duration-300 ${activeTab === tab.id ?
                    'bg-white/5 text-emerald-500 border border-white/10 shadow-lg' : 'text-zinc-500 hover:text-white hover:bg-white/5'}`}
                >
                  <Icon name={tab.icon} size={16} />
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>
        </section>

        {/* Content Area */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {activeTab === 'dashboard' && (
              <div className="space-y-12">
                <StatsOverview stats={statsData} />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                  <div className="lg:col-span-2 space-y-8">
                    <div className="flex items-center justify-between border-b border-white/5 pb-4">
                      <h2 className="text-2xl font-black tracking-widest uppercase text-sm">Active Expeditions</h2>
                      <Button variant="ghost" size="sm" iconName="ArrowRight" iconPosition="right" className="text-emerald-500 font-bold uppercase text-[10px] tracking-widest">
                        Trail Archive
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {staticProjects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                      ))}
                    </div>
                  </div>
                  <div className="space-y-8">
                    <div className="flex items-center justify-between border-b border-white/5 pb-4">
                      <h2 className="text-2xl font-black tracking-widest uppercase text-sm">Recent Briefings</h2>
                    </div>
                    <ActivityFeed activities={staticActivities} />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <QuickActions />
                </div>
              </div>
            )}

            {activeTab === 'projects' && (
              <div className="space-y-8">
                <div className="flex items-center justify-between border-b border-white/5 pb-6">
                  <h2 className="text-3xl font-black tracking-widest uppercase">All Expeditions</h2>
                  <Button variant="default" iconName="Mountain" iconPosition="left" className="bg-emerald-600 text-white font-bold px-8 uppercase tracking-widest text-xs">
                    New Trail
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {staticProjects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'messages' && (
              <div className="space-y-8">
                <div className="flex items-center justify-between border-b border-white/5 pb-6">
                  <h2 className="text-3xl font-black tracking-widest uppercase">Communication Briefing</h2>
                </div>
                <MessageCenter messages={messagesData} />
              </div>
            )}

            {activeTab === 'documents' && (
              <div className="space-y-8">
                <DocumentLibrary documents={documentsData} />
              </div>
            )}

            {activeTab === 'calendar' && (
              <div className="space-y-8">
                <div className="flex items-center justify-between border-b border-white/5 pb-6">
                  <h2 className="text-3xl font-black tracking-widest uppercase">Trail Roadmap</h2>
                  <Button variant="default" iconName="Calendar" iconPosition="left" className="bg-emerald-600 text-white font-bold uppercase tracking-widest text-xs">
                    Book Session
                  </Button>
                </div>
                <div className="grid lg:grid-cols-3 gap-12">
                  <div className="lg:col-span-2">
                    <UpcomingMilestones milestones={milestonesData} />
                  </div>
                  <div className="p-8 rounded-3xl bg-zinc-900/50 border border-white/5 text-center flex flex-col items-center justify-center">
                    <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6">
                      <Icon name="Compass" size={32} className="text-emerald-500" />
                    </div>
                    <h3 className="text-xl font-black mb-2 uppercase tracking-widest">Gear Up</h3>
                    <p className="text-zinc-500 mb-8 font-medium text-sm">
                      Integrate your trail logistics and gear checklists here.
                    </p>
                    <Button variant="default" className="w-full bg-white text-zinc-900 font-bold h-12 uppercase tracking-widest text-[10px]">
                      Connect Health App
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ClientPortal;
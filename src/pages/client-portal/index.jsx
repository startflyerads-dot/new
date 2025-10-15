import React, { useState, useEffect } from 'react';
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

const ClientPortal = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  // Mock data for client portal
  const clientData = {
    name: "Sarah Johnson",
    company: "TechStart Solutions",
    avatar: "https://images.unsplash.com/photo-1734456611474-13245d164868",
    avatarAlt: "Professional headshot of woman with shoulder-length brown hair in navy blazer smiling at camera",
    memberSince: "January 2023",
    accountManager: "Michael Rodriguez"
  };

  const statsData = [
  {
    id: 1,
    type: 'projects',
    value: '8',
    label: 'Active Projects',
    subtitle: '3 in progress, 5 planning',
    trend: 12
  },
  {
    id: 2,
    type: 'completed',
    value: '24',
    label: 'Completed Projects',
    subtitle: 'This year',
    trend: 8
  },
  {
    id: 3,
    type: 'hours',
    value: '1,247',
    label: 'Total Hours',
    subtitle: 'Across all projects',
    trend: -3
  },
  {
    id: 4,
    type: 'team',
    value: '12',
    label: 'Team Members',
    subtitle: 'Working on your projects',
    trend: 5
  }];


  const projectsData = [
  {
    id: 1,
    name: "E-commerce Platform Redesign",
    description: "Complete overhaul of the online shopping experience with modern UI/UX design and improved performance.",
    status: "in-progress",
    progress: 75,
    startDate: "Sep 15, 2024",
    dueDate: "Nov 30, 2024",
    teamSize: 6
  },
  {
    id: 2,
    name: "Mobile App Development",
    description: "Native iOS and Android application development for customer engagement and loyalty program.",
    status: "in-progress",
    progress: 45,
    startDate: "Oct 1, 2024",
    dueDate: "Jan 15, 2025",
    teamSize: 4
  },
  {
    id: 3,
    name: "Brand Identity Refresh",
    description: "Complete brand identity redesign including logo, color palette, typography, and brand guidelines.",
    status: "pending",
    progress: 20,
    startDate: "Oct 20, 2024",
    dueDate: "Dec 20, 2024",
    teamSize: 3
  },
  {
    id: 4,
    name: "SEO Optimization Campaign",
    description: "Comprehensive SEO audit and optimization strategy to improve search engine rankings and organic traffic.",
    status: "completed",
    progress: 100,
    startDate: "Aug 1, 2024",
    dueDate: "Sep 30, 2024",
    teamSize: 2
  }];


  const activitiesData = [
  {
    id: 1,
    type: 'message',
    user: {
      name: 'Michael Rodriguez',
      avatar: "https://images.unsplash.com/photo-1724128195747-dd25cba7860f",
      avatarAlt: 'Professional headshot of Hispanic man with short black hair in navy suit'
    },
    description: 'Sent you a message about the e-commerce project timeline',
    timestamp: new Date(Date.now() - 15 * 60 * 1000),
    attachment: null
  },
  {
    id: 2,
    type: 'file',
    user: {
      name: 'Emma Chen',
      avatar: "https://images.unsplash.com/photo-1560859389-c4fb2bd88016",
      avatarAlt: 'Professional headshot of Asian woman with long black hair in white blouse'
    },
    description: 'Uploaded design mockups for the mobile app project',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    attachment: {
      name: 'mobile_app_mockups_v2.pdf'
    }
  },
  {
    id: 3,
    type: 'milestone',
    user: {
      name: 'David Park',
      avatar: "https://images.unsplash.com/photo-1687256457585-3608dfa736c5",
      avatarAlt: 'Professional headshot of Asian man with glasses in dark suit'
    },
    description: 'Completed user research phase for the e-commerce redesign',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    attachment: null
  },
  {
    id: 4,
    type: 'meeting',
    user: {
      name: 'Lisa Thompson',
      avatar: "https://images.unsplash.com/photo-1684262855344-b9da453a7934",
      avatarAlt: 'Professional headshot of blonde woman in gray blazer'
    },
    description: 'Scheduled weekly project review meeting for tomorrow at 2 PM',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
    attachment: null
  },
  {
    id: 5,
    type: 'payment',
    user: {
      name: 'System',
      avatar: "https://images.unsplash.com/photo-1691439761312-517427211b79",
      avatarAlt: 'Generic system avatar with blue background'
    },
    description: 'Invoice #INV-2024-0847 has been processed successfully',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    attachment: null
  }];


  const messagesData = [
  {
    id: 1,
    participant: {
      name: 'Michael Rodriguez',
      role: 'Account Manager',
      avatar: "https://images.unsplash.com/photo-1724128195747-dd25cba7860f",
      avatarAlt: 'Professional headshot of Hispanic man with short black hair in navy suit',
      online: true
    },
    lastMessage: {
      content: 'The e-commerce project is progressing well. Can we schedule a review meeting?',
      timestamp: new Date(Date.now() - 15 * 60 * 1000)
    },
    unreadCount: 2,
    messages: [
    {
      id: 1,
      sender: 'Michael Rodriguez',
      content: 'Hi Sarah! Hope you\'re doing well. I wanted to update you on the e-commerce project progress.',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000)
    },
    {
      id: 2,
      sender: 'me',
      content: 'Hi Michael! Thanks for the update. How are we tracking against the timeline?',
      timestamp: new Date(Date.now() - 90 * 60 * 1000)
    },
    {
      id: 3,
      sender: 'Michael Rodriguez',
      content: 'We\'re actually ahead of schedule! The design phase is complete and we\'re moving into development. Can we schedule a review meeting this week?',
      timestamp: new Date(Date.now() - 15 * 60 * 1000)
    }]

  },
  {
    id: 2,
    participant: {
      name: 'Emma Chen',
      role: 'UI/UX Designer',
      avatar: "https://images.unsplash.com/photo-1560859389-c4fb2bd88016",
      avatarAlt: 'Professional headshot of Asian woman with long black hair in white blouse',
      online: false
    },
    lastMessage: {
      content: 'I\'ve uploaded the latest design mockups for your review',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000)
    },
    unreadCount: 0,
    messages: [
    {
      id: 1,
      sender: 'Emma Chen',
      content: 'Hi Sarah! I\'ve uploaded the latest design mockups for the mobile app. Please take a look when you have a chance.',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000)
    }]

  },
  {
    id: 3,
    participant: {
      name: 'David Park',
      role: 'Developer',
      avatar: "https://images.unsplash.com/photo-1687256457585-3608dfa736c5",
      avatarAlt: 'Professional headshot of Asian man with glasses in dark suit',
      online: true
    },
    lastMessage: {
      content: 'The API integration is complete and ready for testing',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000)
    },
    unreadCount: 1,
    messages: [
    {
      id: 1,
      sender: 'David Park',
      content: 'Hi Sarah! The API integration for the e-commerce platform is complete and ready for testing.',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000)
    }]

  }];


  const milestonesData = [
  {
    id: 1,
    title: 'E-commerce Platform Beta Launch',
    description: 'Deploy beta version of the redesigned e-commerce platform for internal testing and feedback collection.',
    dueDate: '2024-10-25',
    priority: 'high',
    project: 'E-commerce Redesign',
    assignee: 'Michael Rodriguez'
  },
  {
    id: 2,
    title: 'Mobile App UI/UX Review',
    description: 'Complete review of mobile application user interface and user experience design with stakeholder feedback.',
    dueDate: '2024-10-28',
    priority: 'medium',
    project: 'Mobile App Development',
    assignee: 'Emma Chen'
  },
  {
    id: 3,
    title: 'Brand Guidelines Documentation',
    description: 'Finalize and deliver comprehensive brand guidelines document including logo usage, color palette, and typography.',
    dueDate: '2024-11-05',
    priority: 'medium',
    project: 'Brand Identity Refresh',
    assignee: 'Lisa Thompson'
  },
  {
    id: 4,
    title: 'Performance Optimization Report',
    description: 'Deliver detailed performance analysis and optimization recommendations for the e-commerce platform.',
    dueDate: '2024-11-10',
    priority: 'low',
    project: 'E-commerce Redesign',
    assignee: 'David Park'
  }];


  const documentsData = [
  {
    id: 1,
    name: 'Project_Proposal_Ecommerce_v3.pdf',
    description: 'Detailed project proposal for e-commerce platform redesign including scope, timeline, and deliverables.',
    type: 'pdf',
    size: 2457600,
    category: 'contracts',
    status: 'approved',
    uploadDate: '2024-09-15'
  },
  {
    id: 2,
    name: 'Brand_Guidelines_Draft.pdf',
    description: 'Initial draft of brand guidelines including logo variations, color palette, and typography specifications.',
    type: 'pdf',
    size: 5242880,
    category: 'presentations',
    status: 'pending',
    uploadDate: '2024-10-10'
  },
  {
    id: 3,
    name: 'Mobile_App_Wireframes.fig',
    description: 'Complete wireframe designs for iOS and Android mobile application user interface.',
    type: 'img',
    size: 15728640,
    category: 'other',
    status: 'approved',
    uploadDate: '2024-10-05'
  },
  {
    id: 4,
    name: 'Monthly_Progress_Report_Sept.docx',
    description: 'Comprehensive monthly progress report covering all active projects and key milestones achieved.',
    type: 'docx',
    size: 1048576,
    category: 'reports',
    status: 'approved',
    uploadDate: '2024-09-30'
  },
  {
    id: 5,
    name: 'Invoice_INV-2024-0847.pdf',
    description: 'Invoice for September 2024 services including project development and consultation hours.',
    type: 'pdf',
    size: 524288,
    category: 'invoices',
    status: 'approved',
    uploadDate: '2024-10-01'
  },
  {
    id: 6,
    name: 'SEO_Analysis_Report.xlsx',
    description: 'Detailed SEO analysis report with keyword rankings, traffic metrics, and optimization recommendations.',
    type: 'xlsx',
    size: 3145728,
    category: 'reports',
    status: 'approved',
    uploadDate: '2024-09-25'
  }];


  const tabs = [
  { id: 'dashboard', name: 'Dashboard', icon: 'LayoutDashboard' },
  { id: 'projects', name: 'Projects', icon: 'FolderOpen' },
  { id: 'messages', name: 'Messages', icon: 'MessageSquare' },
  { id: 'documents', name: 'Documents', icon: 'FileText' },
  { id: 'calendar', name: 'Calendar', icon: 'Calendar' }];


  const formatTime = (date) => {
    return date?.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date) => {
    return date?.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-primary text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center justify-between">
              <div className="flex items-center space-x-6 mb-6 lg:mb-0">
                <div className="relative">
                  <img
                    src={clientData?.avatar}
                    alt={clientData?.avatarAlt}
                    className="w-20 h-20 rounded-full object-cover border-4 border-white/20" />

                  <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <div>
                  <h1 className="text-3xl font-bold mb-2">Welcome back, {clientData?.name}!</h1>
                  <p className="text-white/80 mb-1">{clientData?.company}</p>
                  <p className="text-white/60 text-sm">Member since {clientData?.memberSince}</p>
                </div>
              </div>
              
              <div className="text-center lg:text-right">
                <div className="text-white/80 text-sm mb-1">{formatDate(currentTime)}</div>
                <div className="text-2xl font-bold">{formatTime(currentTime)}</div>
                <div className="text-white/60 text-sm mt-2">
                  Account Manager: {clientData?.accountManager}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Navigation Tabs */}
        <section className="bg-white border-b border-border sticky top-16 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex space-x-8 overflow-x-auto">
              {tabs?.map((tab) =>
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap transition-colors duration-200 ${
                activeTab === tab?.id ?
                'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'}`
                }>

                  <Icon name={tab?.icon} size={18} />
                  <span>{tab?.name}</span>
                </button>
              )}
            </nav>
          </div>
        </section>

        {/* Content Area */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {activeTab === 'dashboard' &&
            <div className="space-y-8">
                {/* Stats Overview */}
                <StatsOverview stats={statsData} />
                
                {/* Quick Actions */}
                <QuickActions />
                
                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Recent Projects */}
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-semibold text-foreground">Recent Projects</h2>
                      <Button variant="ghost" size="sm" iconName="ArrowRight" iconPosition="right">
                        View All
                      </Button>
                    </div>
                    <div className="space-y-4">
                      {projectsData?.slice(0, 2)?.map((project) =>
                    <ProjectCard key={project?.id} project={project} />
                    )}
                    </div>
                  </div>
                  
                  {/* Activity Feed */}
                  <ActivityFeed activities={activitiesData} />
                </div>
                
                {/* Upcoming Milestones */}
                <UpcomingMilestones milestones={milestonesData?.slice(0, 3)} />
              </div>
            }

            {activeTab === 'projects' &&
            <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-foreground">All Projects</h2>
                  <Button variant="default" iconName="Plus" iconPosition="left">
                    New Project
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {projectsData?.map((project) =>
                <ProjectCard key={project?.id} project={project} />
                )}
                </div>
              </div>
            }

            {activeTab === 'messages' &&
            <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-foreground">Messages</h2>
                  <Button variant="default" iconName="Plus" iconPosition="left">
                    New Message
                  </Button>
                </div>
                
                <MessageCenter messages={messagesData} />
              </div>
            }

            {activeTab === 'documents' &&
            <div className="space-y-8">
                <DocumentLibrary documents={documentsData} />
              </div>
            }

            {activeTab === 'calendar' &&
            <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-foreground">Calendar & Milestones</h2>
                  <Button variant="default" iconName="Plus" iconPosition="left">
                    Schedule Meeting
                  </Button>
                </div>
                
                <UpcomingMilestones milestones={milestonesData} />
                
                {/* Calendar Integration Placeholder */}
                <div className="bg-card rounded-xl border border-border p-8 text-center shadow-professional">
                  <Icon name="Calendar" size={64} className="text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-card-foreground mb-2">Calendar Integration</h3>
                  <p className="text-muted-foreground mb-6">
                    Connect your calendar to view and manage all project meetings and deadlines in one place.
                  </p>
                  <Button variant="default" iconName="Calendar" iconPosition="left">
                    Connect Calendar
                  </Button>
                </div>
              </div>
            }
          </div>
        </section>
      </main>
      {/* Footer */}
      <footer className="bg-dark text-text-primary py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                <Icon name="Zap" size={16} color="white" strokeWidth={2.5} />
              </div>
              <span className="text-lg font-bold">ServiceHub Pro</span>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-text-secondary">
              <span>Need help? Contact your account manager</span>
              <Button variant="ghost" size="sm" iconName="Phone" iconPosition="left">
                Call Support
              </Button>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-surface text-center text-sm text-text-secondary">
            <p>&copy; {new Date()?.getFullYear()} ServiceHub Pro. All rights reserved. | Secure Client Portal</p>
          </div>
        </div>
      </footer>
    </div>);

};

export default ClientPortal;
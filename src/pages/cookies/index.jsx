import React, { useState } from "react";
import { Helmet } from "react-helmet";
import Header from "../../components/ui/Header";
import Footer from "../../components/ui/footer";
import { Shield, Cookie, Settings, Info, ChevronDown, ChevronUp, ExternalLink, Check, Lock, Eye, BarChart, Save } from "lucide-react";

const cookieTypes = [
  {
    id: "essential",
    name: "Strictly Necessary",
    icon: Lock,
    color: "text-green-600",
    bg: "bg-green-50",
    description: "These cookies are essential for you to browse the website and use its features, such as accessing secure areas of the site.",
    examples: ["Session ID", "Auth Token", "CSRF Token"],
    required: true,
  },
  {
    id: "performance",
    name: "Performance & Analytics",
    icon: BarChart,
    color: "text-blue-600",
    bg: "bg-blue-50",
    description: "These cookies collect information about how you use a website, like which pages you visited and which links you clicked on. None of this information can be used to identify you.",
    examples: ["Google Analytics", "Hotjar", "Site Speed Metrics"],
    required: false,
  },
  {
    id: "functional",
    name: "Functional",
    icon: Settings,
    color: "text-purple-600",
    bg: "bg-purple-50",
    description: "These cookies allow a website to remember choices you have made in the past, like what language you prefer or what your user name and password are so you can automatically log in.",
    examples: ["Language Pref", "Theme Settings", "Region Selection"],
    required: false,
  },
  {
    id: "marketing",
    name: "Targeting & Advertising",
    icon: Eye,
    color: "text-amber-600",
    bg: "bg-amber-50",
    description: "These cookies track your online activity to help advertisers deliver more relevant advertising or to limit how many times you see an ad.",
    examples: ["AdSense", "Meta Pixel", "LinkedIn Insights"],
    required: false,
  }
];

const CookiesPage = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [preferences, setPreferences] = useState({
    essential: true,
    performance: true,
    functional: true,
    marketing: false,
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const togglePreference = (key) => {
    if (key === 'essential') return;
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 800);
  };

  const lastUpdated = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <>
      <Header />
      <Helmet>
        <title>Cookie Policy — Startflyer Ads</title>
        <meta name="description" content="Learn about the cookies Startflyer Ads uses and how to manage them." />
        <link rel="canonical" href="cookies" />
      </Helmet>

      <div className="min-h-screen bg-[#2A2A42]">
        
        {/* Hero Section */}
        <div className=" border-b border-slate-200 dark:border-slate-700 pt-32 pb-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-primary/10 dark:bg-primary/20 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
          
          <div className="container mx-auto px-4 max-w-4xl text-center relative z-10">
            <div className="inline-flex items-center justify-center p-4  text-primary rounded-2xl mb-8 shadow-sm">
              <Cookie size={40} strokeWidth={1.5} />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight">
              Cookie Policy
            </h1>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Transparent, clear, and in your control. Learn how we use cookies to improve your experience.
            </p>
            <div className="mt-8 flex items-center justify-center gap-2 text-sm text-slate-500 dark:text-slate-400 font-medium bg-slate-50 dark:bg-slate-800 inline-flex px-4 py-2 rounded-full border border-slate-100 dark:border-slate-700 mx-auto">
               <Shield size={14} className="text-green-500" />
               <span>Last Updated: {lastUpdated}</span>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 max-w-5xl py-12 flex flex-col md:flex-row gap-12">
          
          {/* Table of Contents */}
          <aside className="md:w-64 hidden md:block flex-shrink-0">
            <div className="sticky top-28 space-y-8">
              <div>
                <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-4 px-3">Contents</h3>
                <nav className="space-y-1">
                 {[
                    { id: "key-highlights", label: "Key Highlights" },
                    { id: "what-are-cookies", label: "What are cookies?" },
                    { id: "how-we-use", label: "How we use cookies" },
                    { id: "cookie-types", label: "Types of cookies" },
                    { id: "manage-preferences", label: "Manage preferences" },
                    { id: "third-party", label: "Third-party cookies" },
                    { id: "contact", label: "Contact us" },
                 ].map((item) => (
                    <a 
                      key={item.id}
                      href={`#${item.id}`} 
                      className="block px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary hover:bg-primary/10 dark:hover:bg-slate-700 rounded-lg transition-all"
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
              </div>
              
              <div className="bg-[#2A2A42] rounded-xl p-5 text-white">
                <h4 className="font-bold mb-2 text-sm">Need help?</h4>
                <p className="text-xs text-slate-400 mb-4">Contact our support team for privacy concerns.</p>
                <a href="mailto:privacy@startflyerads.com" className="text-xs bg-white dark:bg-slate-700 text-slate-900 dark:text-white px-3 py-2 rounded-lg font-bold block text-center hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
                  Email Privacy Team
                </a>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <article className="flex-1 space-y-16 min-w-0">
            
            {/* Key Highlights */}
            <section id="key-highlights" className="scroll-mt-32">
               <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                 {[
                    { icon: Shield, title: "Secure", desc: "Your data is encrypted and protected." },
                    { icon: Settings, title: "Controllable", desc: "Manage your preferences at any time." },
                    { icon: Eye, title: "Transparent", desc: "No hidden trackers or surprises." }
                 ].map((item, idx) => (
                    <div key={idx} className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm text-center hover:shadow-md transition-shadow">
                      <div className="inline-flex items-center justify-center p-3 bg-primary/10 dark:bg-primary/20 text-primary rounded-xl mb-4">
                        <item.icon size={24} />
                      </div>
                      <h3 className="font-bold text-slate-900 dark:text-white mb-2">{item.title}</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{item.desc}</p>
                    </div>
                  ))}
               </div>
            </section>

            {/* What are cookies */}
            <section id="what-are-cookies" className="scroll-mt-32">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary">
                  <Info size={16} />
                </span>
                What are cookies?
              </h2>
              <div className="text-slate-600 dark:text-slate-300 leading-7 space-y-4">
                <p>
                  Cookies are small text files that are sent to and stored on your computer, smartphone, or other device for accessing the internet, whenever you visit a website. Cookies are useful because they allow a website to recognize a user's device.
                </p>
                <p>
                  We use cookies for a variety of reasons, such as determining preferences, letting users navigate between pages efficiently, verifying the user, and carrying out other essential checks.
                </p>
              </div>
            </section>

            {/* How we use cookies */}
            <section id="how-we-use" className="scroll-mt-32">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary/20 text-secondary">
                  <Settings size={16} />
                </span>
                How we use cookies
              </h2>
              <p className="text-slate-600 dark:text-slate-300 mb-6 leading-7">
                Cookies enable us to provide you with the services you have requested and facilitate your navigation on our website. We use cookies to:
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "Authenticate and identify you on our website",
                  "Keep track of information you have provided to us",
                  "Remember your preferences or where you left off",
                  "Measure your use of our website to improve it",
                  "Understand your likely interests so we can provide relevant ads"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm transition-transform hover:-translate-y-1 duration-300">
                    <div className="mt-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full p-1 flex-shrink-0">
                      <Check size={14} />
                    </div>
                    <span className="text-slate-700 dark:text-slate-300 text-sm font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Cookie Types */}
            <section id="cookie-types" className="scroll-mt-32">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-accent/20 text-accent">
                  <Cookie size={16} />
                </span>
                Types of cookies we use
              </h2>
              
              <div className="space-y-4">
                {cookieTypes.map((type) => (
                  <div key={type.id} className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm hover:shadow-md transition-all">
                    <div 
                      className="p-6 cursor-pointer flex items-start justify-between"
                      onClick={() => setActiveSection(activeSection === type.id ? null : type.id)}
                    >
                      <div className="flex gap-4">
                        <div className={`mt-1 p-2 rounded-lg ${type.bg} ${type.color} hidden sm:block`}>
                          <type.icon size={20} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">{type.name}</h3>
                            {type.required && (
                              <span className="px-2.5 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-[10px] font-bold uppercase tracking-wider rounded-md border border-slate-200 dark:border-slate-600">
                                Required
                              </span>
                            )}
                          </div>
                          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{type.description}</p>
                        </div>
                      </div>
                      <button className="text-slate-400 dark:text-slate-500 ml-4 mt-1 p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors">
                        {activeSection === type.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </button>
                    </div>
                    
                    {activeSection === type.id && (
                      <div className="px-6 pb-6 pt-0 pl-[5.5rem]">
                        <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4 mt-2 border border-slate-100 dark:border-slate-600">
                          <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">Common Examples</h4>
                          <div className="flex flex-wrap gap-2">
                            {type.examples.map(ex => (
                              <span key={ex} className="px-3 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-md text-xs text-slate-700 dark:text-slate-300 font-medium shadow-sm">
                                {ex}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Manage Preferences */}
            <section id="manage-preferences" className="scroll-mt-32">
              <div className="bg-[#2A2A42] rounded-3xl p-8 md:p-10 text-white relative overflow-hidden shadow-2xl border border-slate-700">
               <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                 <Settings size={300} />
               </div>
               
               <div className="relative z-10">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Manage your preferences</h2>
                    <p className="text-slate-400 max-w-lg text-sm">
                      You can change your cookie preferences at any time. Moving the sliders to "Off" may disable some features of the site.
                    </p>
                  </div>
                  {saveSuccess && (
                     <div className="bg-green-500/20 border border-green-500/50 text-green-300 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
                        <Check size={16} /> Saved Successfully
                     </div>
                  )}
                </div>

                <div className="space-y-4 bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
                  {cookieTypes.map((type) => (
                    <div key={type.id} className="flex items-center justify-between py-4 border-b border-slate-700 last:border-0">
                      <div className="flex items-center gap-3">
                        <type.icon size={18} className={preferences[type.id] ? 'text-primary' : 'text-slate-500'} />
                        <span className={`font-medium ${preferences[type.id] ? 'text-white' : 'text-slate-400'}`}>
                          {type.name}
                        </span>
                      </div>
                      <button
                        onClick={() => togglePreference(type.id)}
                        disabled={type.required}
                        className={`w-14 h-7 rounded-full p-1 transition-all duration-300 ${
                          preferences[type.id] ? 'bg-primary' : 'bg-slate-700'
                        } ${type.required ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                      >
                        <div className={`bg-white w-5 h-5 rounded-full shadow-sm transform transition-transform duration-300 ${
                          preferences[type.id] ? 'translate-x-7' : 'translate-x-0'
                        }`} />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex justify-end">
                  <button 
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex items-center gap-2 px-8 py-3 bg-white text-slate-900 font-bold rounded-xl hover:bg-slate-100 transition-all hover:scale-105 active:scale-95 disabled:opacity-70"
                  >
                    {isSaving ? (
                      <span className="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Save size={18} />
                    )}
                    {isSaving ? 'Saving...' : 'Save Preferences'}
                  </button>
                </div>
                 </div>
              </div>
            </section>

            {/* Third Party */}
            <section id="third-party" className="scroll-mt-32">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Third-party cookies</h2>
              <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                <p className="text-slate-600 dark:text-slate-300 mb-6 leading-7">
                  Some cookies are placed by third parties on your device. For example, we use Google Analytics to help us understand how our website is being used. These third parties may also use cookies to track your activity across different websites.
                </p>
                <div className="flex gap-4 flex-wrap">
                  <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-slate-50 dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 rounded-lg text-slate-700 dark:text-slate-300 font-medium text-sm transition-colors border border-slate-200 dark:border-slate-600">
                    Google Analytics Opt-out <ExternalLink size={14} />
                  </a>
                  <a href="https://www.youronlinechoices.com/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-slate-50 dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 rounded-lg text-slate-700 dark:text-slate-300 font-medium text-sm transition-colors border border-slate-200 dark:border-slate-600">
                    Your Online Choices <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </section>

            {/* Contact */}
            <section id="contact" className="bg-gradient-to-br from-primary/10 dark:from-primary/20 to-secondary/10 dark:to-secondary/20 border border-primary/20 dark:border-primary/30 rounded-2xl p-8 scroll-mt-32 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Have specific questions?</h2>
                <p className="text-slate-600 dark:text-slate-300 max-w-lg">
                  If you have any questions about our use of cookies or other technologies, please email our dedicated privacy team.
                </p>
              </div>
              <a href="mailto:privacy@startflyerads.com" className="shrink-0 bg-primary hover:brightness-110 text-primary-foreground px-6 py-3 rounded-xl font-bold transition-colors shadow-lg shadow-primary/30">
                Contact Privacy Team
              </a>
            </section>

          </article>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default CookiesPage;
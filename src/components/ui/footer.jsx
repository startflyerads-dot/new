import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../AppIcon';
import logo from '/app.svg';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const services = [
    { label: 'Digital Marketing', href: '/services/digital-marketing' },
    { label: 'Web Development', href: '/services/web-development' },
    { label: 'App Development', href: '/services/app-development' },
    { label: 'Graphic Design', href: '/services/graphic-design' }
  ];

  const company = [
    { label: 'Home', href: '/homepage' },
    { label: 'About Us', href: '/about' },
    { label: 'Resources', href: '/resources' },
    { label: 'Contact', href: '/contact' },
  ];

  const legal = [
    { label: 'Terms & Conditions', href: '/terms' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Cookie Policy', href: '/cookie' },
  ];

  const socialLinks = [
    { icon: 'Facebook', href: '#', label: 'Facebook', color: 'hover:text-[#1877F2]' },
    { icon: 'Twitter', href: '#', label: 'Twitter', color: 'hover:text-[#1DA1F2]' },
    { icon: 'Linkedin', href: '#', label: 'LinkedIn', color: 'hover:text-[#0A66C2]' },
    { icon: 'Instagram', href: '#', label: 'Instagram', color: 'hover:text-[#E4405F]' }
  ];

  return (
    <footer className="relative bg-background pt-24 pb-12 overflow-hidden border-t border-white/5">
      {/* Decorative background blurs */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px] -translate-x-1/2 translate-y-1/2 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-secondary/5 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-12 mb-20">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-8">
            <Link to="/homepage" className="flex items-center gap-4 group">
              <div className="w-12 h-12 flex-shrink-0 transition-transform duration-500 group-hover:scale-110">
                <img src={logo} alt="Logo" className="w-full h-full object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-tighter uppercase leading-none mb-1">
                  Startflyer Ads
                </span>
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.3em]">
                  Creative Digital Agency
                </span>
              </div>
            </Link>

            <p className="text-zinc-400 text-sm font-medium leading-relaxed max-w-sm">
              We empower modern businesses through data-driven strategies and premium digital craftsmanship. Scaling your vision with precision and creativity.
            </p>

            <div className="flex items-center gap-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className={`text-zinc-500 transition-all duration-300 transform hover:scale-125 ${social.color}`}
                >
                  <Icon name={social.icon} size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-2 space-y-8">
            <h4 className="text-xs font-black text-white uppercase tracking-[0.2em] relative inline-block">
              Expertise
              <span className="absolute -bottom-2 left-0 w-8 h-[2px] bg-primary" />
            </h4>
            <ul className="space-y-4">
              {services.map((service) => (
                <li key={service.href}>
                  <Link to={service.href} className="text-sm font-medium text-zinc-500 hover:text-primary transition-colors duration-300">
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2 space-y-8">
            <h4 className="text-xs font-black text-white uppercase tracking-[0.2em] relative inline-block">
              Company
              <span className="absolute -bottom-2 left-0 w-8 h-[2px] bg-secondary" />
            </h4>
            <ul className="space-y-4">
              {company.map((item) => (
                <li key={item.href}>
                  <Link to={item.href} className="text-sm font-medium text-zinc-500 hover:text-white transition-colors duration-300">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter Column */}
          <div className="lg:col-span-4 space-y-8">
            <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-sm relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              <h4 className="text-xs font-black text-white uppercase tracking-[0.2em] mb-6 relative z-10">
                Join our Inner Circle
              </h4>

              <form onSubmit={(e) => e.preventDefault()} className="relative z-10 mb-6">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full bg-zinc-950 border border-white/5 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-primary/50 transition-colors"
                  />
                  <button
                    type="submit"
                    className="whitespace-nowrap bg-white text-zinc-950 px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all duration-300 shadow-xl"
                  >
                    Join
                  </button>
                </div>
              </form>

              <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest leading-relaxed relative z-10">
                Stay updated with the latest in digital growth and agency news.
              </p>
            </div>

            <div className="flex flex-col gap-3 text-sm font-medium text-zinc-400">
              <a href="tel:+919876543210" className="flex items-center gap-3 hover:text-primary transition-colors group">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  <Icon name="Phone" size={14} className="group-hover:text-primary" />
                </div>
                +91 98765 43210
              </a>
              <a href="mailto:contact@startflyerads.com" className="flex items-center gap-3 hover:text-primary transition-colors group">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  <Icon name="Mail" size={14} className="group-hover:text-primary" />
                </div>
                contact@startflyerads.com
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap justify-center gap-8 order-2 md:order-1">
            {legal.map((item) => (
              <Link key={item.href} to={item.href} className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest hover:text-zinc-400 transition-colors">
                {item.label}
              </Link>
            ))}
          </div>

          <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest md:order-2">
            © {currentYear} Startflyer Ads. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

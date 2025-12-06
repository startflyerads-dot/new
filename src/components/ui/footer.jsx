import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../AppIcon';
import logo from '../../assets/images/logo.png';
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
    { label: 'Contact', href: '/contact' },
    { label: 'Terms and Policy', href: '/terms' },
    { label: 'Privacy and Policy', href: '/privacy' },
    { label: 'Cookie Policy', href: '/cookie' },
  ];

  const socialLinks = [
    { icon: 'Facebook', href: '#', label: 'Facebook' },
    { icon: 'Twitter', href: '#', label: 'Twitter' },
    { icon: 'Linkedin', href: '#', label: 'LinkedIn' }
  ];

  return (
    <footer className="bg-[#2A2A42] text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10 items-start">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
                <img src={logo} alt="StartFlyerAds Logo" className="w-100"/>
              </div>
              <div>
                <div className="text-lg sm:text-xl font-bold">StartFlyer<span className="text-primary">Ads</span></div>
                <div className="text-sm text-white/70">Digital Marketing Agency</div>
              </div>
            </Link>

            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors"
                >
                  <Icon name={social.icon} size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="grid grid-cols-2 gap-6 lg:gap-8">
            <div>
              <h4 className="text-sm font-semibold mb-3 text-white">Services</h4>
              <ul className="space-y-2 text-white/70 text-sm">
                {services.map((service) => (
                  <li key={service.href}>
                    <Link to={service.href} className="hover:text-primary transition-colors">
                      {service.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold mb-3 text-white">Company</h4>
              <ul className="space-y-2 text-white/70 text-sm">
                {company.map((item) => (
                  <li key={item.href}>
                    <Link to={item.href} className="hover:text-primary transition-colors">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white">Get in Touch</h4>
            <div className="text-sm text-white/70 space-y-3">
              <a href="mailto:startflyerads@gmail.com" className="flex items-start gap-3 hover:text-primary transition-colors">
                <Icon name="Mail" size={16} className="text-primary mt-1 flex-shrink-0" />
                <span className="break-all">startflyerads@gmail.com</span>
              </a>
              <a href="tel:+919876543210" className="flex items-start gap-3 hover:text-primary transition-colors">
                <Icon name="Phone" size={16} className="text-primary mt-1 flex-shrink-0" />
                <span>+91 98765 43210</span>
              </a>
              <div className="flex items-start gap-3">
                <Icon name="MapPin" size={16} className="text-primary mt-1 flex-shrink-0" />
                <span>Chennai, Tamil Nadu, India</span>
              </div>
            </div>

            <form onSubmit={(e) => e.preventDefault()} className="mt-2">
              <label htmlFor="newsletter" className="text-sm font-medium text-white">
                Subscribe to updates
              </label>
              <div className="mt-2 flex">
                <input
                  id="newsletter"
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 rounded-l-lg border border-white/10 bg-white/5 text-sm text-white placeholder-white/60 focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-r-lg text-sm hover:opacity-90 transition-opacity"
                >
                  Subscribe
                </button>
              </div>
              <p className="text-xs text-white/60 mt-2">
                We'll only send useful updates. Unsubscribe anytime.
              </p>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-white/10 flex flex-col lg:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/50">
            © {currentYear} StartFlyerAds. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs">
            <Link to="/privacy" className="text-white/50 hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-white/50 hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link to="/cookie" className="text-white/50 hover:text-primary transition-colors">
              Cookie Policy
            </Link>
          
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const firstMobileLinkRef = useRef(null);
  const desktopNavRef = useRef([]);
  const mobileNavRef = useRef([]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Close on Escape + manage scroll lock
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };

    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleKey);
      setTimeout(() => firstMobileLinkRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKey);
    }

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKey);
    };
  }, [isMenuOpen]);

  // Animate desktop nav items on mount
  useEffect(() => {
    if (desktopNavRef.current.length > 0) {
      gsap.fromTo(
        desktopNavRef.current,
        {
          y: -10,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.05,
          ease: 'power2.out',
        }
      );
    }
  }, []);

  // Animate mobile nav on open
  useEffect(() => {
    if (isMenuOpen && mobileNavRef.current.length > 0) {
      gsap.fromTo(
        mobileNavRef.current,
        {
          y: 20,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.1,
          ease: 'power2.out',
        }
      );
    }
  }, [isMenuOpen]);

  const navItems = [
    { name: 'Home', path: '/homepage', icon: 'Home' },
    { name: 'Services', path: '/services', icon: 'Briefcase' },
    { name: 'About', path: '/about', icon: 'Users' },
    { name: 'Client Portal', path: '/client-portal', icon: 'Shield' },
    { name: 'Resources', path: '/resources', icon: 'BookOpen' },
  ];

  const secondaryItems = [{ name: 'Contact', path: '/contact', icon: 'Phone' }];

  const isActive = (path) => location.pathname === path;
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 shadow-md border-b border-border' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/homepage" className="flex items-center space-x-3" onClick={closeMenu}>
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center animate-ring-rotate hover:animate-pulse">
                <Icon name="Zap" size={20} color="white" strokeWidth={2.5} />
              </div>
              <div className="absolute inset-0 w-10 h-10 border-2 border-primary/30 rounded-full animate-ping opacity-20" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-foreground">Startflyerads</span>
              <span className="text-xs text-primary -mt-1 font-semibold">Digital Marketing Solution</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
     {/* Desktop Navigation - show only on md and larger screens */}
<nav className=" md:flex space-x-2 mx-auto">
  {navItems.map((item, idx) => (
    <Link
      key={item.path}
      to={item.path}
      ref={(el) => (desktopNavRef.current[idx] = el)}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition ${
        isActive(item.path)
          ? 'bg-primary text-dark shadow'
          : 'text-foreground hover:text-primary hover:bg-muted'
      }`}
    >
      <Icon name={item.icon} size={16} />
      <span>{item.name}</span>
    </Link>
  ))}
</nav>


          {/* Actions + Mobile Menu Button */}
          <div className="flex items-center space-x-3">
            <div className="hidden md:flex space-x-4 items-center">
              <Link to="/contact" className="text-sm font-medium text-muted-foreground hover:text-primary">
                Contact
              </Link>
              <Button
                variant="default"
                size="sm"
                iconName="Calendar"
                iconPosition="left"
                className="shadow-sm"
              >
                Schedule
              </Button>
            </div>
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-md text-foreground hover:text-primary hover:bg-muted transition"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <Icon name={isMenuOpen ? 'X' : 'Menu'} size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-16 left-0 right-0 bg-white/95 border-t border-border transition-all overflow-hidden z-50 ${
          isMenuOpen ? 'max-h-[calc(100vh-64px)] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="px-4 py-4 space-y-2">
          {navItems.map((item, idx) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={closeMenu}
              ref={(el) => (mobileNavRef.current[idx] = el)}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium transition ${
                isActive(item.path)
                  ? 'bg-primary text-white shadow'
                  : 'text-foreground hover:text-primary hover:bg-muted'
              }`}
            >
              <Icon name={item.icon} size={20} />
              <span>{item.name}</span>
            </Link>
          ))}

          {secondaryItems.map((item, idx) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={closeMenu}
              ref={(el) => (mobileNavRef.current[navItems.length + idx] = el)}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium transition ${
                isActive(item.path)
                  ? 'bg-primary text-white shadow'
                  : 'text-foreground hover:text-primary hover:bg-muted'
              }`}
            >
              <Icon name={item.icon} size={20} />
              <span>{item.name}</span>
            </Link>
          ))}

          {/* CTA Button */}
          <div className="pt-4 border-t border-border">
            <Button
              variant="default"
              fullWidth
              iconName="Calendar"
              iconPosition="left"
              onClick={closeMenu}
              className="justify-center shadow"
            >
              Schedule Consultation
            </Button>
          </div>
        </nav>
      </div>

      {/* Backdrop */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 md:hidden"
          onClick={closeMenu}
          aria-hidden
        />
      )}
    </header>
  );
};

export default Header;

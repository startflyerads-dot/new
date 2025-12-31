import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import Icon from '../AppIcon';
import Button from './Button';
import ConsultationModal from './ConsultationModal'; // added import
import logo from '/app.svg';
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isConsultOpen, setIsConsultOpen] = useState(false); // added state
  const location = useLocation();
  const navigate = useNavigate();
  const firstMobileLinkRef = useRef(null);
  const headerRef = useRef(null);
  const desktopNavRef = useRef([]);
  const mobileNavRef = useRef([]);

  useEffect(() => {
    // use rAF based throttle + passive listener for smooth scrolling
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 10);
          ticking = false;
        });
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
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

  const { user, isAdmin, logout } = useAuth();

  const navItems = [
    { name: 'Hiking', path: '/all-tours', icon: 'Mountain' },
    { name: 'Explore', path: '/journal', icon: 'Compass' },
    { name: 'Company', path: '/about', icon: 'Users' },
    { name: 'Newsletter', path: '#newsletter', icon: 'Mail' },
  ];

  if (isAdmin) {
    navItems.push({ name: 'Admin', path: '/admin-portal', icon: 'ShieldCheck' });
  }

  const isActive = (path) => location.pathname === path;
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
          ? 'py-4 bg-zinc-950/80 backdrop-blur-xl border-b border-white/5 shadow-2xl'
          : 'py-8 bg-transparent'
        }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link to="/homepage" className="flex items-center gap-4 group relative z-50">
            <div className="w-10 h-10 flex-shrink-0 transition-transform duration-500 group-hover:scale-110">
              <img src={logo} alt="HK Local Tours Logo" className="w-full h-full object-contain filter brightness-0 invert" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black text-white tracking-widest uppercase leading-none mb-1">
                HK Local Tours
              </span>
              <span className="text-[8px] font-black text-emerald-500 uppercase tracking-[0.4em] opacity-80">
                Sustainable Exploration
              </span>
            </div>
          </Link>

          {/* Desktop Navigation - hidden on small screens */}
          <nav className="hidden md:flex items-center space-x-2 mx-auto flex-1 justify-center">
            {navItems.map((item, idx) => (
              <Link
                key={item.path}
                to={item.path}
                ref={(el) => (desktopNavRef.current[idx] = el)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition min-w-[110px] justify-center ${isActive(item.path)
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
            {/* Desktop actions */}
            <div className="hidden md:flex items-center space-x-6">
              {!user ? (
                <Link to="/login" className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 hover:text-white transition-colors">
                  Secure Entry
                </Link>
              ) : (
                <button onClick={logout} className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 hover:text-primary transition-colors">
                  Sign Out
                </button>
              )}

              <button
                onClick={() => setIsConsultOpen(true)}
                className="bg-gradient-brand text-white px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.2em] hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20"
              >
                Consultation
              </button>
            </div>

            {/* Mobile hamburger */}
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

      {/* Mobile Menu - full screen slide-down with better spacing */}
      <div
        className={`md:hidden fixed inset-x-0 top-16 bg-[var(--color-dark)] border-t border-border transition-transform duration-320 z-50 ${isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-6 opacity-0 pointer-events-none'
          }`}
        style={{ transformOrigin: 'top' }}
      >

        <nav className="px-4 py-6 space-y-3">
          {navItems.map((item, idx) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => { closeMenu(); }}
              ref={(el) => (mobileNavRef.current[idx] = el)}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium transition ${isActive(item.path)
                ? 'bg-primary text-white shadow'
                : 'text-foreground hover:text-primary hover:bg-muted'
                }`}
            >
              <Icon name={item.icon} size={20} />
              <span>{item.name}</span>
            </Link>
          ))}

          <div className="pt-4 border-t border-border">
            {!user ? (
              <Link
                to="/login"
                onClick={closeMenu}
                className="block px-4 py-3 rounded-lg text-base font-medium text-foreground hover:text-primary hover:bg-muted"
              >
                Secure Entry
              </Link>
            ) : (
              <button
                onClick={() => { logout(); closeMenu(); }}
                className="block w-full text-left px-4 py-3 rounded-lg text-base font-medium text-foreground hover:text-primary hover:bg-muted"
              >
                Sign Out
              </button>
            )}

            <button
              onClick={() => { setIsConsultOpen(true); closeMenu(); }}
              className="mt-3 w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-[#e57b46] to-[#B9AEDF] text-white rounded-lg"
            >
              <Icon name="Calendar" size={18} />
              Schedule Consultation
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile backdrop */}
      {isMenuOpen && (
        <button
          onClick={closeMenu}
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          aria-hidden="true"
        />
      )}

      {/* Consultation modal (kept for other triggers if needed) */}
      <ConsultationModal isOpen={isConsultOpen} onClose={() => setIsConsultOpen(false)} />
    </header>
  );
};

export default Header;

import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import Icon from '../../../components/AppIcon';
import useWindowSize from '../../../hooks/useWindowSize';

const InteractiveRings = () => {
  const containerRef = useRef(null);
  const centerRingRef = useRef(null);
  const outerRingsRef = useRef([]);
  const [activeRing, setActiveRing] = useState(null);

  const { width } = useWindowSize();
  const scaleFactor = width < 640 ? 0.5 : width < 1024 ? 0.8 : 1;

  const navigationRings = [
    {
      id: 'services',
      title: 'Services',
      icon: 'Briefcase',
      path: '/services',
      description: 'Explore our comprehensive service offerings',
      color: '#e57b46',
      position: { x: 0, y: -120 }
    },
    {
      id: 'about',
      title: 'About',
      icon: 'Users',
      path: '/about',
      description: 'Learn about our team and expertise',
      color: '#B9AEDF',
      position: { x: 104, y: -60 }
    },
    {
      id: 'portal',
      title: 'Client Portal',
      icon: 'Shield',
      path: '/client-portal',
      description: 'Access your personalized dashboard',
      color: '#88E5BE',
      position: { x: 104, y: 60 }
    },
    {
      id: 'resources',
      title: 'Resources',
      icon: 'BookOpen',
      path: '/resources',
      description: 'Discover tools and insights',
      color: '#F2C94C',
      position: { x: 0, y: 120 }
    },
    {
      id: 'contact',
      title: 'Contact',
      icon: 'Phone',
      path: '/contact',
      description: 'Get in touch with our team',
      color: '#4ADE80',
      position: { x: -104, y: 60 }
    }
  ];

  useEffect(() => {
    const ctx = gsap?.context(() => {
      // Initial setup - hide outer rings
      gsap?.set(outerRingsRef?.current, {
        scale: 0,
        opacity: 0
      });

      // Center ring entrance animation
      gsap?.from(centerRingRef?.current, {
        scale: 0,
        rotation: -360,
        duration: 1.5,
        ease: "back.out(1.7)"
      });

      // Stagger animation for outer rings
      gsap?.to(outerRingsRef?.current, {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.7)",
        delay: 0.8
      });

      // Continuous rotation for center ring
      gsap?.to(centerRingRef?.current, {
        rotation: 360,
        duration: 20,
        ease: "none",
        repeat: -1
      });

      // Floating animation for outer rings
      outerRingsRef?.current?.forEach((ring, index) => {
        if (ring) {
          gsap?.to(ring, {
            y: "+=10",
            duration: 2 + index * 0.3,
            ease: "power2.inOut",
            repeat: -1,
            yoyo: true,
            delay: index * 0.2
          });
        }
      });

    }, containerRef);

    return () => ctx?.revert();
  }, []);

  const addToOuterRingsRef = (el) => {
    if (el && !outerRingsRef?.current?.includes(el)) {
      outerRingsRef?.current?.push(el);
    }
  };

  const handleRingHover = (ringId) => {
    setActiveRing(ringId);

    const ringElement = outerRingsRef?.current?.find(el =>
      el && el?.getAttribute('data-ring-id') === ringId
    );

    if (ringElement) {
      gsap?.to(ringElement, {
        scale: 1.2,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  const handleRingLeave = (ringId) => {
    setActiveRing(null);

    const ringElement = outerRingsRef?.current?.find(el =>
      el && el?.getAttribute('data-ring-id') === ringId
    );

    if (ringElement) {
      gsap?.to(ringElement, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  return (
    <section className="p-10 px-4 bg-[#2A2A42]"> {/* changed background to site dark */}
      <div className="container mx-auto sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Navigate Your Journey
          </h2>
          <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto">
            Discover our interconnected ecosystem of services and solutions through our interactive navigation experience.
          </p>
        </div>

        {/* Interactive Ring Navigation */}
        <div className="flex justify-center">
          <div
            ref={containerRef}
            className="relative w-[80vw] h-[80vw] max-w-[24rem] max-h-[24rem] mx-auto"
          >
            {/* Center Ring */}
            <div
              ref={centerRingRef}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full flex items-center justify-center shadow-professional-xl cursor-pointer group"
              style={{ background: 'linear-gradient(135deg, #e57b46 0%, #B9AEDF 100%)' }}
            >
              <div className="w-16 h-16 bg-transparent rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Icon name="Zap" size={24} color="white" />
              </div>

              {/* Center Ring Pulse */}
              <div className="absolute inset-0 rounded-full border-4 border-white/10 animate-ping"></div>
            </div>

            {/* Outer Navigation Rings */}
            {navigationRings?.map((ring, index) => (
              <Link
                key={ring?.id}
                to={ring?.path}
                className="absolute top-1/2 left-1/2"
                style={{
                  transform: `translate(-50%, -50%) translate(${ring?.position?.x * scaleFactor}px, ${ring?.position?.y * scaleFactor}px)`
                }}
              >
                <div
                  ref={addToOuterRingsRef}
                  data-ring-id={ring?.id}
                  className={`w-20 h-20 rounded-full flex items-center justify-center shadow-professional-lg cursor-pointer group transition-all duration-300 hover:shadow-professional-xl`}
                  style={{
                    background: 'linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))',
                    boxShadow: 'inset 0 0 0 4px rgba(255,255,255,0.02)',
                    border: `2px solid ${ring?.color}33` // subtle colored border
                  }}
                  onMouseEnter={() => handleRingHover(ring?.id)}
                  onMouseLeave={() => handleRingLeave(ring?.id)}
                >
                  <div style={{ width: 36, height: 36, borderRadius: 9999, background: ring?.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name={ring?.icon} size={18} color="white" />
                  </div>

                  {/* Ring Glow Effect */}
                  <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-80 transition-opacity duration-300" style={{ background: `${ring?.color}22` }}></div>
                </div>

                {/* Ring Label */}
                <div className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-4 transition-all duration-300 ${activeRing === ring?.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
                  <div className="bg-[#0b0b10]/90 rounded-lg px-4 py-2 shadow-professional text-center min-w-max text-white">
                    <div className="font-bold text-white text-sm">{ring?.title}</div>
                    <div className="text-xs text-white/70 mt-1">{ring?.description}</div>
                  </div>

                  {/* Arrow */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-[#0b0b10]/90"></div>
                </div>
              </Link>
            ))}

            {/* Connection Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {navigationRings?.map((ring) => (
                <line
                  key={`line-${ring?.id}`}
                  x1="50%"
                  y1="50%"
                  x2={`${50 + (ring?.position?.x * scaleFactor / 384) * 100}%`}
                  y2={`${50 + (ring?.position?.y * scaleFactor / 384) * 100}%`}
                  stroke="rgba(255,255,255,0.12)"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                  className={`transition-all duration-300 ${activeRing === ring?.id ? 'stroke-white opacity-60' : 'opacity-20'}`}
                />
              ))}
            </svg>
          </div>
        </div>

        {/* Instructions */}
        <div className="text-center mt-12">
          <p className="text-white/70 text-lg">
            Hover over the rings to explore our services and solutions
          </p>
          <div className="flex items-center justify-center mt-4 gap-2">
            <div className="w-2 h-2 bg-white/50 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-white/50 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-white/50 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveRings;
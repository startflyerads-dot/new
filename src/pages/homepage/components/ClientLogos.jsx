import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

gsap?.registerPlugin(ScrollTrigger);

const ClientLogos = () => {
  const sectionRef = useRef(null);
  const logoRowsRef = useRef([]);
  const marqueeTls = useRef([]);
  const resizeTimeout = useRef(null);
  const [hoveredClient, setHoveredClient] = useState(null);

  const clients = [
    { id: 1, name: "TechVision Inc.", logo: "https://images.unsplash.com/photo-1711509424072-70600119ab46", logoAlt: "TechVision Inc. logo" },
    { id: 2, name: "InnovateLabs", logo: "https://images.unsplash.com/photo-1678995634665-8d247af642ca", logoAlt: "InnovateLabs logo" },
    { id: 3, name: "GrowthCorp", logo: "https://images.unsplash.com/photo-1660063093662-1f76f500f0ff", logoAlt: "GrowthCorp logo" },
    { id: 4, name: "DataFlow Systems", logo: "https://images.unsplash.com/photo-1728305932524-4abdb62bf11d", logoAlt: "DataFlow Systems logo" },
    { id: 5, name: "CloudTech Solutions", logo: "https://images.unsplash.com/photo-1667984390538-3dea7a3fe33d", logoAlt: "CloudTech Solutions logo" },
    { id: 6, name: "SecureNet Corp", logo: "https://images.unsplash.com/photo-1662338035130-516cb712005a", logoAlt: "SecureNet Corp logo" },
  ];

  // duplicate once for marquee (rendered in JSX)
  const duplicatedClients = [...clients, ...clients];

  useEffect(() => {
    const ctx = gsap?.context(() => {
      // section entrance (lightweight)
      gsap?.from(sectionRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      });

      // create marquee animations for each row
      const rows = logoRowsRef.current || [];
      // clear any previous timelines
      marqueeTls.current.forEach((t) => t?.kill?.());
      marqueeTls.current = [];

      rows.forEach((row, i) => {
        if (!row) return;
        // ensure GPU acceleration
        row.style.willChange = 'transform';
        const direction = i % 2 === 0 ? -1 : 1;
        // measure only once
        const singleWidth = row.scrollWidth / 2 || row.offsetWidth || 1;
        const duration = Math.max(18, singleWidth / 40 + 20); // tuned duration
        gsap.set(row, { x: 0 });

        const tl = gsap.to(row, {
          x: direction * -singleWidth,
          duration,
          ease: "none",
          repeat: -1
        });
        marqueeTls.current.push(tl);
      });
    }, sectionRef);

    // responsive: restart marquee on resize (debounced)
    const onResize = () => {
      clearTimeout(resizeTimeout.current);
      resizeTimeout.current = setTimeout(() => {
        // recompute widths by killing and re-creating the effect
        marqueeTls.current.forEach((t) => t?.kill?.());
        marqueeTls.current = [];
        // trigger effect recreation
        // minimal approach: call the context again via gsap.context not necessary - do a naive page refresh of animations by forcing re-render side-effect:
        // easiest: simulate by re-running effect body via small timeout (safe)
        // for clarity: reload page animations by triggering a small event
        window.dispatchEvent(new Event('clientlogos:resize'));
      }, 120);
    };
    window.addEventListener('resize', onResize, { passive: true });

    // listener to recreate animations when resize debounce fires
    const recreate = () => {
      // re-run context by unmount/mount effect: kill existing timelines and re-run logic via a timeout
      marqueeTls.current.forEach((t) => t?.kill?.());
      marqueeTls.current = [];
      // small timeout to allow layout stabilizing
      setTimeout(() => {
        // re-create basic marquee animations
        const rows = logoRowsRef.current || [];
        rows.forEach((row, i) => {
          if (!row) return;
          const direction = i % 2 === 0 ? -1 : 1;
          const singleWidth = row.scrollWidth / 2 || row.offsetWidth || 1;
          const duration = Math.max(18, singleWidth / 40 + 20);
          gsap.set(row, { x: 0 });
          const tl = gsap.to(row, {
            x: direction * -singleWidth,
            duration,
            ease: "none",
            repeat: -1
          });
          marqueeTls.current.push(tl);
        });
      }, 50);
    };
    window.addEventListener('clientlogos:resize', recreate);

    return () => {
      ctx?.revert?.();
      marqueeTls.current.forEach((t) => t?.kill?.());
      marqueeTls.current = [];
      window.removeEventListener('resize', onResize);
      window.removeEventListener('clientlogos:resize', recreate);
      clearTimeout(resizeTimeout.current);
    };
  }, []);

  // ref helper
  const addToLogoRowsRef = (el) => {
    if (el && !logoRowsRef.current.includes(el)) logoRowsRef.current.push(el);
  };

  return (
    <section ref={sectionRef} className="py-20 bg-background overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Trusted by <span className="bg-gradient-primary bg-clip-text text-white">Industry Leaders</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Join companies that trust our solutions.
          </p>
        </div>

        {/* Marquee rows */}
        <div className="space-y-6">
          {[0, 1].map((rowIndex) => (
            <div
              key={rowIndex}
              ref={addToLogoRowsRef}
              className="flex gap-8 whitespace-nowrap items-center will-change-transform"
              aria-hidden="true"
              style={{ pointerEvents: 'auto' }}
            >
              {duplicatedClients.map((c) => (
                <div key={`${rowIndex}-${c.id}`} className="flex items-center justify-center w-40 h-20 opacity-90">
                  <Image src={c.logo} alt={c.logoAlt} className="object-contain w-full h-full" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;
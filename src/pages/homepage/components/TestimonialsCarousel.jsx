import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import { Star } from 'lucide-react';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { motion } from 'framer-motion';
gsap?.registerPlugin(ScrollTrigger);

const TestimonialsCarousel = () => {
  const sectionRef = useRef(null);
  const carouselRef = useRef(null);
  const testimonialImageRef = useRef(null);
  const testimonialContentRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    position: "CEO, TechVision Inc.",
    company: "TechVision Inc.",
    avatar: "https://images.unsplash.com/photo-1684262855358-88f296a2cfc2",
    avatarAlt: "Professional headshot of Sarah Johnson, a confident woman with shoulder-length brown hair wearing a navy blue blazer",
    content: `ServiceHub Pro transformed our entire digital infrastructure. Their strategic approach and technical expertise delivered results beyond our expectations. We saw a 300% increase in operational efficiency within the first quarter.`,
    rating: 5,
    results: {
      metric: "Operational Efficiency",
      improvement: "+300%",
      timeframe: "3 months"
    },
    videoThumbnail: "https://images.unsplash.com/photo-1716703435453-a7733d600d68",
    videoThumbnailAlt: "Modern corporate office meeting room with Sarah Johnson presenting to her team with digital transformation results on large screen"
  },
  {
    id: 2,
    name: "Michael Chen",
    position: "CTO, InnovateLabs",
    company: "InnovateLabs",
    avatar: "https://images.unsplash.com/photo-1687256457585-3608dfa736c5",
    avatarAlt: "Professional headshot of Michael Chen, an Asian man with short black hair wearing a gray suit and glasses",
    content: `The level of innovation and attention to detail is remarkable. ServiceHub Pro didn't just deliver a solution; they revolutionized how we approach technology. Our development cycles are now 50% faster with zero compromise on quality.`,
    rating: 5,
    results: {
      metric: "Development Speed",
      improvement: "+50%",
      timeframe: "2 months"
    },
    videoThumbnail: "https://images.unsplash.com/photo-1566924534124-f009c8277a1c",
    videoThumbnailAlt: "Technology development team led by Michael Chen working on multiple monitors with code and development tools in modern office"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    position: "VP Operations, GrowthCorp",
    company: "GrowthCorp",
    avatar: "https://images.unsplash.com/photo-1634254698189-6f844a251c23",
    avatarAlt: "Professional headshot of Emily Rodriguez, a Hispanic woman with long dark hair wearing a white business shirt and confident smile",
    content: `Working with ServiceHub Pro was a game-changer for our organization. Their strategic consulting helped us identify opportunities we never knew existed. The ROI has been exceptional, with measurable improvements across all key metrics.`,
    rating: 5,
    results: {
      metric: "Revenue Growth",
      improvement: "+180%",
      timeframe: "6 months"
    },
    videoThumbnail: "https://images.unsplash.com/photo-1716703435453-a7733d600d68",
    videoThumbnailAlt: "Emily Rodriguez presenting growth metrics and strategic plans to executive team in modern conference room with charts on wall"
  }];


  useEffect(() => {
    const ctx = gsap?.context(() => {
      // Section entrance animation
      gsap?.from(sectionRef?.current, {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef?.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });

    }, sectionRef);

    return () => ctx?.revert();
  }, []);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials?.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPlaying, testimonials?.length]);

  // Animate the transition between testimonials
  useEffect(() => {
    const tl = gsap.timeline();
    tl.to([testimonialImageRef.current, testimonialContentRef.current], {
      opacity: 0,
      y: 20,
      duration: 0.4,
      ease: 'power3.in'
    }).to([testimonialImageRef.current, testimonialContentRef.current], {
      opacity: 1,
      y: 0,
      duration: 0.4,
      ease: 'power3.out'
    });
  }, [currentIndex]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials?.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials?.length) % testimonials?.length);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const currentTestimonial = testimonials?.[currentIndex];

  return (
    <section ref={sectionRef} className="py-20 bg-muted">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Client <span className="bg-gradient-primary bg-clip-text text-white">Success Stories</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover how we've helped businesses transform their operations and achieve remarkable results through our innovative solutions.
          </p>
        </div>

        {/* Main Testimonial Display */}
        <div className="max-w-6xl mx-auto">
          <div className="bg-card rounded-3xl shadow-professional-xl overflow-hidden">
            <div className="grid lg:grid-cols-2">
              {/* Video/Image Section */}
              <div ref={testimonialImageRef} className="relative">
                <div className="aspect-video lg:aspect-square">
                  <Image
                    src={currentTestimonial?.videoThumbnail}
                    alt={currentTestimonial?.videoThumbnailAlt}
                    className="w-full h-full object-cover" />

                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <button className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors duration-300 animate-elastic-hover">
                      <Icon name="Play" size={32} className="text-primary ml-1" />
                    </button>
                  </div>
                </div>

                {/* Results Badge */}
                <div className="absolute top-6 left-6 bg-success text-white px-4 py-2 rounded-full font-bold shadow-professional">
                  {currentTestimonial?.results?.improvement} {currentTestimonial?.results?.metric}
                </div>
              </div>

              {/* Content Section */}
              <div ref={testimonialContentRef} className="p-8 lg:p-12 flex flex-col justify-center">
                {/* Rating Stars */}
                <div className="flex items-center mb-6">
                  {[...Array(currentTestimonial?.rating)]?.map((_, i) =>
                  <Icon key={i} name="Star" size={20} className="text-warning fill-current" />
                  )}
                </div>

                {/* Testimonial Content */}
                <blockquote className="text-lg lg:text-xl text-foreground mb-8 leading-relaxed">
                  "{currentTestimonial?.content}"
                </blockquote>

                {/* Client Info */}
                <div className="flex items-center mb-8">
                  <div className="w-16 h-16 rounded-full overflow-hidden mr-4 shadow-professional">
                    <Image
                      src={currentTestimonial?.avatar}
                      alt={currentTestimonial?.avatarAlt}
                      className="w-full h-full object-cover" />

                  </div>
                  <div>
                    <div className="font-bold text-foreground text-lg">{currentTestimonial?.name}</div>
                    <div className="text-muted-foreground">{currentTestimonial?.position}</div>
                    <div className="text-primary font-medium">{currentTestimonial?.company}</div>
                  </div>
                </div>

                {/* Results Metrics */}
                <div className="bg-muted rounded-xl p-6">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-success">{currentTestimonial?.results?.improvement}</div>
                      <div className="text-sm text-muted-foreground">Improvement</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">{currentTestimonial?.results?.timeframe}</div>
                      <div className="text-sm text-muted-foreground">Timeline</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-foreground">5★</div>
                      <div className="text-sm text-muted-foreground">Rating</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Carousel Controls */}
       <div className="flex items-center justify-center mt-8 gap-4" role="region" aria-label="Testimonial carousel controls">
  {/* Previous Button */}
  <button
    type="button"
    onClick={prevSlide}
    aria-label="Previous testimonial"
    className="w-12 h-12 bg-card rounded-full flex items-center justify-center shadow-professional hover:shadow-professional-lg transition-all duration-300 animate-elastic-hover"
  >
    <Icon name="ChevronLeft" size={20} className="text-foreground" />
  </button>

  {/* Dots Indicator */}
 <div className="flex items-center gap-3" role="tablist" aria-label="Select testimonial">
  {testimonials?.map((_, index) => (
    <button
      key={index}
      type="button"
      onClick={() => goToSlide(index)}
      role="tab"
      aria-selected={index === currentIndex}
      aria-label={`Testimonial ${index + 1}`}
      tabIndex={index === currentIndex ? 0 : -1}
      className={`w-4 h-4 rounded-full transition-all duration-300 focus:outline focus:ring-4 focus:ring-primary ${
        index === currentIndex 
          ? 'bg-primary w-8 shadow-lg' 
          : 'bg-muted-foreground/50 hover:bg-muted-foreground/70 border border-gray-300'
      }`}
    />
  ))}
</div>


  {/* Play/Pause Button */}
  <button
    type="button"
    onClick={togglePlayPause}
    aria-label={isPlaying ? "Pause auto-play" : "Play auto-play"}
    className="w-12 h-12 bg-card rounded-full flex items-center justify-center shadow-professional hover:shadow-professional-lg transition-all duration-300 animate-elastic-hover"
  >
    <Icon name={isPlaying ? "Pause" : "Play"} size={20} className="text-foreground" />
  </button>

  {/* Next Button */}
  <button
    type="button"
    onClick={nextSlide}
    aria-label="Next testimonial"
    className="w-12 h-12 bg-card rounded-full flex items-center justify-center shadow-professional hover:shadow-professional-lg transition-all duration-300 animate-elastic-hover"
  >
    <Icon name="ChevronRight" size={20} className="text-foreground" />
  </button>
</div>

        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 bg-gradient-primary p-10 rounded-2xl shadow-professional">
          <h3 className="text-2xl font-bold text-white mb-4">
            Ready to Join Our Success Stories?
          </h3>
          <p className="text-lg text-white mb-8 max-w-2xl mx-auto">
            Let's discuss how we can help transform your business and achieve remarkable results together.
          </p>
          <Button
  variant="default"
  size="lg"
  iconName="Calendar"
  iconPosition="left"
  className="bg-white text-primary hover:bg-white/90 shadow-professional-lg animate-elastic-hover w-full sm:w-auto text-center"
  onClick={() => {
    // call provided handler if passed via props, otherwise fallback to /contact
    if (typeof props?.onOpenConsultation === 'function') {
      props.onOpenConsultation();
    } else {
      window.location.href = '/contact';
    }
  }}
>
  Schedule Free Consultation
</Button>
        </div>
      </div>
    </section>);

};

export default TestimonialsCarousel;
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, Download, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const frame = frameRef.current;
    const image = imageRef.current;
    const content = contentRef.current;
    const meta = metaRef.current;
    const cta = ctaRef.current;

    if (!section || !frame || !image || !content || !meta || !cta) return;

    const ctx = gsap.context(() => {
      // Initial load animation
      const loadTl = gsap.timeline({ defaults: { ease: 'power2.out' } });
      
      loadTl
        .fromTo(frame, 
          { opacity: 0, scale: 1.06 },
          { opacity: 1, scale: 1, duration: 1 }
        )
        .fromTo(image,
          { opacity: 0, x: '10vw', scale: 1.04 },
          { opacity: 1, x: 0, scale: 1, duration: 1 },
          '-=0.8'
        )
        .fromTo(meta,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.6 },
          '-=0.6'
        )
        .fromTo(content.children,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 },
          '-=0.4'
        )
        .fromTo(cta.children,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 },
          '-=0.3'
        );

      // Scroll-driven exit animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            // Reset all elements to visible when scrolling back to top
            gsap.set([frame, image, content, meta, cta], { opacity: 1, x: 0, y: 0, scale: 1 });
          }
        }
      });

      // ENTRANCE (0%-30%): Hold visible state
      // SETTLE (30%-70%): Static viewing
      // EXIT (70%-100%): Elements exit
      scrollTl
        .fromTo(content,
          { x: 0, opacity: 1 },
          { x: '-18vw', opacity: 0, ease: 'power2.in' },
          0.70
        )
        .fromTo(image,
          { x: 0, scale: 1, opacity: 1 },
          { x: '12vw', scale: 1.03, opacity: 0, ease: 'power2.in' },
          0.70
        )
        .fromTo(frame,
          { scale: 1, opacity: 1 },
          { scale: 1.08, opacity: 0, ease: 'power2.in' },
          0.75
        )
        .fromTo(cta,
          { y: 0, opacity: 1 },
          { y: '10vh', opacity: 0, ease: 'power2.in' },
          0.72
        )
        .fromTo(meta,
          { opacity: 1 },
          { opacity: 0, ease: 'power2.in' },
          0.75
        );
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={sectionRef} 
      id="hero"
      className="section-pinned bg-[#07080A] flex items-center justify-center z-10"
    >
      {/* Neon Frame */}
      <div 
        ref={frameRef}
        className="absolute left-[6vw] top-[10vh] w-[88vw] h-[80vh] neon-border rounded-lg pointer-events-none"
      />
      
      {/* Portrait Image */}
      <div 
        ref={imageRef}
        className="absolute right-[6vw] top-[10vh] w-[46vw] h-[80vh] overflow-hidden"
      >
        <img 
          src="/hero_portrait.jpg" 
          alt="QA Engineer Portrait"
          className="w-full h-full object-cover"
        />
        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#07080A] via-transparent to-transparent opacity-60" />
      </div>

      {/* Meta Label */}
      <div 
        ref={metaRef}
        className="absolute left-[12vw] top-[16vh]"
      >
        <span className="label-mono text-[#2D6BFF]">Quality Assurance Engineer</span>
      </div>

      {/* Content Block */}
      <div 
        ref={contentRef}
        className="absolute left-[12vw] top-[26vh] w-[34vw]"
      >
        <h1 className="text-[clamp(44px,5vw,76px)] font-bold text-[#F2F5F9] leading-[0.95] mb-6">
          Precision in every pixel.
        </h1>
        <p className="text-lg text-[#A6AFBA] leading-relaxed max-w-md">
          Manual testing • Automation • CI/CD • Performance
        </p>
      </div>

      {/* CTA Row */}
      <div 
        ref={ctaRef}
        className="absolute left-[12vw] top-[62vh] flex items-center gap-4"
      >
        <Button 
          onClick={scrollToProjects}
          className="bg-[#2D6BFF] hover:bg-[#1E5AEE] text-white px-6 py-6 rounded-xl font-medium transition-all duration-300 hover:shadow-[0_0_30px_rgba(45,107,255,0.4)]"
        >
          <ArrowDown className="w-4 h-4 mr-2" />
          View Projects
        </Button>
        <Button 
          variant="outline"
          className="border-[rgba(242,245,249,0.15)] text-[#F2F5F9] hover:bg-[rgba(242,245,249,0.05)] px-6 py-6 rounded-xl font-medium transition-all duration-300"
        >
          <Download className="w-4 h-4 mr-2" />
          Download Resume
        </Button>
        <Button 
          variant="ghost"
          className="text-[#A6AFBA] hover:text-[#F2F5F9] hover:bg-transparent"
          onClick={() => window.open('https://github.com', '_blank')}
        >
          <Github className="w-5 h-5" />
        </Button>
      </div>
    </section>
  );
}

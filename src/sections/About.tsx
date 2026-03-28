import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const credentials = [
  '6+ years in QA',
  'Automation-first mindset',
  'CI/CD & observability'
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    const image = imageRef.current;
    const content = contentRef.current;
    const cta = ctaRef.current;

    if (!section || !card || !image || !content || !cta) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        }
      });

      // ENTRANCE (0%-30%)
      scrollTl
        .fromTo(card,
          { y: '100vh', opacity: 0, scale: 0.96 },
          { y: 0, opacity: 1, scale: 1, ease: 'none' },
          0
        )
        .fromTo(image,
          { x: '-60vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0.05
        )
        .fromTo(content,
          { x: '40vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0.10
        )
        .fromTo(cta,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.18
        );

      // SETTLE (30%-70%): Hold position

      // EXIT (70%-100%)
      scrollTl
        .to(card,
          { y: '-40vh', opacity: 0, ease: 'power2.in' },
          0.70
        )
        .to(image,
          { x: '-20vw', opacity: 0, ease: 'power2.in' },
          0.70
        )
        .to(content,
          { x: '12vw', opacity: 0, ease: 'power2.in' },
          0.70
        )
        .to(cta,
          { y: 10, opacity: 0, ease: 'power2.in' },
          0.72
        );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      id="about"
      className="section-pinned bg-[#07080A] flex items-center justify-center z-20"
    >
      {/* Center Card */}
      <div 
        ref={cardRef}
        className="absolute left-[6vw] top-[10vh] w-[88vw] h-[80vh] glass-card overflow-hidden flex"
      >
        {/* Left Image */}
        <div 
          ref={imageRef}
          className="w-[44%] h-full relative"
        >
          <img 
            src="/about_portrait.jpg" 
            alt="About Portrait"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0E1116] opacity-40" />
        </div>

        {/* Right Content */}
        <div className="flex-1 flex flex-col justify-center px-12 py-16 relative">
          {/* Meta Label */}
          <span className="label-mono text-[#2D6BFF] mb-6">About Me</span>
          
          {/* Content Block */}
          <div ref={contentRef}>
            <h2 className="text-[clamp(34px,3.6vw,56px)] font-bold text-[#F2F5F9] mb-6 leading-tight">
              I break things so your users don't.
            </h2>
            
            <p className="text-[#A6AFBA] text-lg leading-relaxed mb-8 max-w-xl">
              I'm a QA Engineer with a background in software engineering. I specialize in building 
              test strategies that catch issues early, automate the repetitive, and keep releases calm. 
              I've worked with startups and scale-ups—shipping stable products across web, mobile, and APIs.
            </p>

            {/* Credentials List */}
            <ul className="space-y-3 mb-8">
              {credentials.map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#2D6BFF]/20 flex items-center justify-center">
                    <Check className="w-3 h-3 text-[#2D6BFF]" />
                  </div>
                  <span className="text-[#F2F5F9] font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <button 
            ref={ctaRef}
            className="inline-flex items-center gap-2 text-[#2D6BFF] hover:text-[#5B8FFF] font-medium transition-colors group"
          >
            Read the full story
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
}

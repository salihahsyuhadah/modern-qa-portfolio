import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const highlights = [
  'End-to-end checkout flow from cart to payment',
  'Razorpay online banking payment integration',
  'API monitoring via browser dev tools'
];

export default function Spotlight() {
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
          { x: '100vw', opacity: 0, scale: 0.98 },
          { x: 0, opacity: 1, scale: 1, ease: 'none' },
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
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.18
        );

      // SETTLE (30%-70%): Hold position

      // EXIT (70%-100%)
      scrollTl
        .to(card,
          { x: '-40vw', opacity: 0, ease: 'power2.in' },
          0.70
        )
        .to(image,
          { x: '-18vw', opacity: 0, ease: 'power2.in' },
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
      id="spotlight"
      className="section-pinned bg-[#07080A] flex items-center justify-center z-50"
    >
      {/* Wide Card */}
      <div 
        ref={cardRef}
        className="absolute left-[6vw] top-[10vh] w-[88vw] h-[80vh] glass-card overflow-hidden flex"
      >
        {/* Left Image */}
        <div 
          ref={imageRef}
          className="w-[56%] h-full relative"
        >
          <img 
            src="/spotlight_healthcare.jpg" 
            alt="Healthcare Project"
            className="w-full h-full object-cover"
          />
          {/* Neon border accent */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{ boxShadow: 'inset 0 0 0 1px rgba(45,107,255,0.35)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0E1116]/60" />
        </div>

        {/* Right Content */}
        <div className="flex-1 flex flex-col justify-center px-12 py-16">
          {/* Meta Label */}
          <span className="label-mono text-[#2D6BFF] mb-6">Spotlight Project</span>
          
          {/* Content Block */}
          <div ref={contentRef}>
            <h2 className="text-[clamp(34px,3.6vw,56px)] font-bold text-[#F2F5F9] mb-6 leading-tight">
              Desa Murni Batik E-Commerce
            </h2>

            <p className="text-[#A6AFBA] text-lg leading-relaxed mb-8 max-w-lg">
              Investigated and resolved user-reported issues on the e-commerce platform. Validated
              pricing calculations, verified courier options at checkout, and ensured Razorpay payment
              triggers correctly. Collaborated with the team to improve system performance and ensure
              a smooth, error-free shopping experience.
            </p>

            {/* Highlights List */}
            <ul className="space-y-3 mb-8">
              {highlights.map((item, index) => (
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
            Explore the test plan
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
}

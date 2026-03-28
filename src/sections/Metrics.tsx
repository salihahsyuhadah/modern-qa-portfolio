import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const metrics = [
  { value: 12400, suffix: '+', label: 'Test cases executed' },
  { value: 3800, suffix: '+', label: 'Bugs found & triaged' },
  { value: 85, suffix: '%', label: 'Automation coverage (critical paths)' },
  { value: 40, suffix: '%', label: 'Avg. regression time reduction' }
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const counterRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const counter = counterRef.current;
    if (!counter) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: counter,
        start: 'top 85%',
        onEnter: () => {
          if (hasAnimated.current) return;
          hasAnimated.current = true;
          
          gsap.to({ val: 0 }, {
            val: value,
            duration: 2,
            ease: 'power2.out',
            onUpdate: function() {
              setCount(Math.floor(this.targets()[0].val));
            }
          });
        }
      });
    }, counter);

    return () => ctx.revert();
  }, [value]);

  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  return (
    <span ref={counterRef} className="text-[clamp(48px,6vw,80px)] font-bold text-[#F2F5F9]">
      {formatNumber(count)}{suffix}
    </span>
  );
}

export default function Metrics() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const cards = cardsRef.current;

    if (!section || !headline || !cards) return;

    const ctx = gsap.context(() => {
      // Headline animation
      gsap.fromTo(headline,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 50%',
            scrub: 1,
          }
        }
      );

      // Cards animation
      const cardElements = cards.querySelectorAll('.metric-card');
      gsap.fromTo(cardElements,
        { y: '10vh', opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cards,
            start: 'top 85%',
            end: 'top 50%',
            scrub: 1,
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      id="metrics"
      className="min-h-screen bg-[#07080A] py-24 px-[10vw] z-[60] relative flex flex-col items-center justify-center"
    >
      {/* Headline */}
      <h2 
        ref={headlineRef}
        className="text-[clamp(34px,3.6vw,56px)] font-bold text-[#F2F5F9] mb-16 text-center"
      >
        Impact in numbers
      </h2>

      {/* Metrics Grid */}
      <div 
        ref={cardsRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl"
      >
        {metrics.map((metric, index) => (
          <div 
            key={index}
            className="metric-card glass-card p-8 text-center relative overflow-hidden group hover:border-[rgba(45,107,255,0.3)] transition-all duration-300"
          >
            {/* Accent top border */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#2D6BFF]" />
            
            {/* Glow effect on hover */}
            <div className="absolute inset-0 bg-[#2D6BFF]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div className="relative">
              <AnimatedCounter value={metric.value} suffix={metric.suffix} />
              <p className="text-[#A6AFBA] mt-4 text-sm leading-relaxed">
                {metric.label}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

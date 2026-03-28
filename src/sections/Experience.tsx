import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    role: 'Senior QA Engineer',
    company: 'HealthTech Co.',
    period: '2022–Present',
    description: 'Own test strategy for a patient booking platform. Built E2E suites and service-level contract tests.'
  },
  {
    role: 'QA Engineer',
    company: 'FinScale',
    period: '2019–2022',
    description: 'Led automation for payment flows. Reduced regression cycle from 5 days to 1.5 days.'
  },
  {
    role: 'Junior QA / Automation',
    company: 'ShopNext',
    period: '2017–2019',
    description: 'Introduced API testing and CI gates. Improved release confidence for the logistics module.'
  }
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const timeline = timelineRef.current;
    const line = lineRef.current;

    if (!section || !title || !timeline || !line) return;

    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(title,
        { x: '-10vw', opacity: 0 },
        {
          x: 0,
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

      // Timeline line draw animation
      gsap.fromTo(line,
        { scaleY: 0, transformOrigin: 'top' },
        {
          scaleY: 1,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: timeline,
            start: 'top 80%',
            end: 'top 30%',
            scrub: 1,
          }
        }
      );

      // Experience items animation
      const items = timeline.querySelectorAll('.timeline-item');
      gsap.fromTo(items,
        { x: '8vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: timeline,
            start: 'top 75%',
            end: 'top 35%',
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
      id="experience"
      className="min-h-screen bg-[#07080A] py-24 z-[70] relative"
    >
      <div className="px-[10vw] flex flex-col lg:flex-row gap-16">
        {/* Left Title Block */}
        <div ref={titleRef} className="lg:w-[28vw] lg:sticky lg:top-32 lg:self-start">
          <h2 className="text-[clamp(34px,3.6vw,56px)] font-bold text-[#F2F5F9] mb-6">
            Experience
          </h2>
          <p className="text-[#A6AFBA] text-lg leading-relaxed">
            Teams I've worked with—and what I shipped.
          </p>
        </div>

        {/* Right Timeline */}
        <div ref={timelineRef} className="lg:w-[48vw] relative">
          {/* Vertical Line */}
          <div 
            ref={lineRef}
            className="absolute left-[7px] top-2 bottom-2 w-[1px] bg-[rgba(242,245,249,0.12)]"
          />

          {/* Timeline Items */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div key={index} className="timeline-item relative pl-10">
                {/* Dot */}
                <div className="absolute left-0 top-2 w-[15px] h-[15px] rounded-full bg-[#0E1116] border-2 border-[#2D6BFF] z-10" />
                
                {/* Content */}
                <div className="glass-card p-6 hover:border-[rgba(45,107,255,0.2)] transition-all duration-300">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="label-mono text-[#2D6BFF]">{exp.period}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-[#F2F5F9] mb-1">
                    {exp.role}
                  </h3>
                  
                  <p className="text-[#A6AFBA] font-medium mb-3">
                    {exp.company}
                  </p>
                  
                  <p className="text-[#A6AFBA] text-sm leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

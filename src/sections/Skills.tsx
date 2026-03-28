import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  ClipboardCheck, 
  Code2, 
  Globe, 
  GitBranch, 
  Smartphone, 
  Eye 
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  {
    icon: ClipboardCheck,
    title: 'Test Design',
    description: 'Exploratory, boundary, risk-based testing methodologies'
  },
  {
    icon: Code2,
    title: 'Automation',
    description: 'Playwright, Cypress, Selenium, TypeScript'
  },
  {
    icon: Globe,
    title: 'API Testing',
    description: 'Postman, REST Assured, contract tests'
  },
  {
    icon: GitBranch,
    title: 'CI/CD',
    description: 'GitHub Actions, GitLab CI, Docker, Kubernetes'
  },
  {
    icon: Smartphone,
    title: 'Mobile',
    description: 'Appium, device farm testing, iOS/Android'
  },
  {
    icon: Eye,
    title: 'Observability',
    description: 'Logging, tracing, error alerting, monitoring'
  }
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const cards = cardsRef.current;

    if (!section || !title || !cards) return;

    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(title,
        { x: '-12vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 45%',
            scrub: 1,
          }
        }
      );

      // Cards animation with stagger
      const cardElements = cards.querySelectorAll('.skill-card');
      gsap.fromTo(cardElements,
        { y: '10vh', opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cards,
            start: 'top 80%',
            end: 'top 40%',
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
      id="skills"
      className="min-h-screen bg-[#07080A] py-24 px-[10vw] z-30 relative"
    >
      <div className="flex flex-col lg:flex-row gap-16">
        {/* Left Title Block */}
        <div ref={titleRef} className="lg:w-[26vw] lg:sticky lg:top-32 lg:self-start">
          <h2 className="text-[clamp(34px,3.6vw,56px)] font-bold text-[#F2F5F9] mb-6">
            Skills & Tools
          </h2>
          <p className="text-[#A6AFBA] text-lg leading-relaxed">
            A modern QA stack—from test design to production observability.
          </p>
        </div>

        {/* Right Skills Grid */}
        <div ref={cardsRef} className="lg:w-[50vw] grid grid-cols-1 md:grid-cols-2 gap-6">
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <div 
                key={index}
                className="skill-card glass-card p-6 hover:border-[rgba(45,107,255,0.3)] transition-all duration-300 group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#2D6BFF]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#2D6BFF]/20 transition-colors">
                    <Icon className="w-6 h-6 text-[#2D6BFF]" />
                  </div>
                  <div>
                    <h3 className="text-[#F2F5F9] font-semibold text-lg mb-2">
                      {skill.title}
                    </h3>
                    <p className="text-[#A6AFBA] text-sm leading-relaxed">
                      {skill.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

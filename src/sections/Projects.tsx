import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: 'E-commerce Checkout Flow',
    tags: ['Automation', 'API', 'CI/CD'],
    description: 'End-to-end coverage for a high-traffic checkout—cart, payments, confirmations, and edge-case recovery.',
    fullDescription: 'Built a comprehensive test suite for a high-volume e-commerce platform handling 10,000+ daily transactions. Implemented end-to-end automation covering the entire checkout journey including cart management, payment processing, order confirmations, and edge-case recovery scenarios. Integrated with Stripe API for payment testing and established CI/CD pipelines for automated regression testing.',
    image: '/project_checkout.jpg',
    metrics: [
      { label: 'Test Coverage', value: '94%' },
      { label: 'Bugs Prevented', value: '127' },
      { label: 'Execution Time', value: '< 3min' }
    ]
  },
  {
    id: 2,
    title: 'Mobile Banking Onboarding',
    tags: ['Manual', 'Accessibility', 'Compliance'],
    description: 'Risk-based testing for KYC flows, biometrics, and accessibility across iOS/Android.',
    fullDescription: 'Led QA efforts for a mobile banking app onboarding process, ensuring compliance with financial regulations and accessibility standards. Conducted comprehensive testing of KYC (Know Your Customer) flows, biometric authentication, and document verification. Performed accessibility audits across iOS and Android platforms to ensure WCAG 2.1 AA compliance.',
    image: '/project_mobile.jpg',
    metrics: [
      { label: 'Devices Tested', value: '45+' },
      { label: 'WCAG Issues', value: '0' },
      { label: 'Compliance', value: '100%' }
    ]
  },
  {
    id: 3,
    title: 'SaaS Admin Dashboard',
    tags: ['Performance', 'Visual', 'Regression'],
    description: 'Visual regression + performance budgets to keep the UI fast and consistent.',
    fullDescription: 'Established visual regression testing and performance monitoring for a complex SaaS admin dashboard serving 50,000+ users. Implemented screenshot comparison testing to catch UI inconsistencies across releases. Set up performance budgets and monitoring to ensure page load times stayed under 2 seconds. Created automated regression suites for critical user workflows.',
    image: '/project_dashboard.jpg',
    metrics: [
      { label: 'Load Time', value: '1.2s' },
      { label: 'Visual Tests', value: '250+' },
      { label: 'Performance', value: '+40%' }
    ]
  }
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const cards = cardsRef.current.filter(Boolean);

    if (!section || !header || cards.length === 0) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(header,
        { x: '-8vw', opacity: 0 },
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

      // Card animations
      cards.forEach((card) => {
        if (!card) return;
        const image = card.querySelector('.project-image');
        const text = card.querySelector('.project-text');
        const tags = card.querySelectorAll('.project-tag');

        if (image) {
          gsap.fromTo(image,
            { x: '-50vw', opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.8,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                end: 'top 50%',
                scrub: 1,
              }
            }
          );
        }

        if (text) {
          gsap.fromTo(text,
            { x: '30vw', opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.8,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                end: 'top 45%',
                scrub: 1,
              }
            }
          );
        }

        if (tags && tags.length > 0) {
          gsap.fromTo(tags,
            { scale: 0.96, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.4,
              stagger: 0.06,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 75%',
                end: 'top 50%',
                scrub: 1,
              }
            }
          );
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      id="projects"
      className="min-h-screen bg-[#07080A] py-24 z-40 relative"
    >
      {/* Header */}
      <div ref={headerRef} className="px-[10vw] mb-16">
        <h2 className="text-[clamp(34px,3.6vw,56px)] font-bold text-[#F2F5F9] mb-4">
          Featured Projects
        </h2>
        <p className="text-[#A6AFBA] text-lg">
          Real products. Real bugs found. Real coverage delivered.
        </p>
      </div>

      {/* Project Cards */}
      <div className="px-[10vw] space-y-16">
        {projects.map((project, idx) => (
          <div 
            key={project.id}
            ref={el => { cardsRef.current[idx] = el; }}
            className="glass-card overflow-hidden cursor-pointer group hover:border-[rgba(45,107,255,0.2)] transition-all duration-500"
            onClick={() => setSelectedProject(project)}
          >
            <div className="flex flex-col lg:flex-row min-h-[62vh]">
              {/* Image */}
              <div className="project-image lg:w-[55%] h-[300px] lg:h-auto relative overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0E1116]/80 lg:block hidden" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E1116] to-transparent lg:hidden" />
              </div>

              {/* Content */}
              <div className="project-text lg:w-[45%] p-8 lg:p-12 flex flex-col justify-center">
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, tagIndex) => (
                    <Badge 
                      key={tagIndex}
                      variant="outline"
                      className="project-tag border-[rgba(45,107,255,0.4)] text-[#2D6BFF] bg-[#2D6BFF]/10 hover:bg-[#2D6BFF]/20"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                <h3 className="text-2xl lg:text-3xl font-bold text-[#F2F5F9] mb-4 group-hover:text-[#5B8FFF] transition-colors">
                  {project.title}
                </h3>

                <p className="text-[#A6AFBA] text-lg leading-relaxed mb-8">
                  {project.description}
                </p>

                <button className="inline-flex items-center gap-2 text-[#2D6BFF] hover:text-[#5B8FFF] font-medium transition-colors group/btn">
                  View case study
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Project Detail Dialog */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-4xl bg-[#0E1116] border-[rgba(242,245,249,0.08)] text-[#F2F5F9] max-h-[90vh] overflow-y-auto">
          {selectedProject && (
            <>
              <div className="h-64 overflow-hidden rounded-lg mb-6">
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <DialogHeader>
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedProject.tags.map((tag, index) => (
                    <Badge 
                      key={index}
                      variant="outline"
                      className="border-[rgba(45,107,255,0.4)] text-[#2D6BFF] bg-[#2D6BFF]/10"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
                <DialogTitle className="text-3xl font-bold text-[#F2F5F9]">
                  {selectedProject.title}
                </DialogTitle>
                <DialogDescription className="text-[#A6AFBA] text-lg leading-relaxed mt-4">
                  {selectedProject.fullDescription}
                </DialogDescription>
              </DialogHeader>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-6 mt-8">
                {selectedProject.metrics.map((metric, index) => (
                  <div key={index} className="text-center p-4 bg-[#07080A] rounded-xl">
                    <div className="text-3xl font-bold text-[#2D6BFF] mb-1">
                      {metric.value}
                    </div>
                    <div className="text-sm text-[#A6AFBA]">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex justify-end">
                <button 
                  className="inline-flex items-center gap-2 bg-[#2D6BFF] hover:bg-[#1E5AEE] text-white px-6 py-3 rounded-xl font-medium transition-all duration-300"
                  onClick={() => window.open('https://github.com', '_blank')}
                >
                  <ExternalLink className="w-4 h-4" />
                  View on GitHub
                </button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: 'E-Commerce Website & Checkout',
    company: 'Desa Murni Batik',
    tags: ['IT Support', 'E2E Testing', 'API Monitoring', 'Razorpay'],
    description: 'Investigated and resolved user-reported issues on the Desa Murni Batik e-commerce platform. Supported end-to-end checkout flow from cart to payment.',
    activities: [
      {
        heading: 'E-Commerce Website',
        items: [
          'Investigated and resolved user-reported issues on the e-commerce platform',
          'Performed testing to ensure features function correctly after fixes',
          'Collaborated with team members to improve system performance and reliability',
          'Ensured a smooth and error-free shopping experience for users',
        ]
      },
      {
        heading: 'Checkout Process',
        items: [
          'Supported end-to-end checkout flow to ensure smooth transactions from cart to payment',
          'Validated pricing calculations (subtotal, total) for accuracy and consistency',
          'Verified courier options are correctly displayed and selectable at checkout',
          'Troubleshot and resolved frontend/backend issues affecting checkout performance',
          'Ensured Razorpay popup triggers correctly for online banking payments',
          'Performed functional testing on pricing, shipping, and payment components',
          'Used Visual Studio Code for debugging and fixing issues',
          'Monitored API responses via browser tools to ensure correct data flow between system components',
        ]
      }
    ],
    image: '/project_ecommerce.png',
    metrics: [
      { label: 'Platform', value: 'E-Commerce' },
      { label: 'Payment', value: 'Razorpay' },
      { label: 'Testing', value: 'End-to-End' }
    ]
  },
  {
    id: 2,
    title: 'Action Item Website',
    company: 'PETRONAS Chemicals',
    tags: ['Power Apps', 'SharePoint', 'Power Automate', 'IT Support'],
    description: 'Provided IT support for a Power Apps-based Action Item website integrated with SharePoint at PETRONAS Chemicals.',
    activities: [
      {
        heading: 'Action Item Website',
        items: [
          'Provided IT support for a Power Apps-based Action Item website integrated with SharePoint',
          'Monitored workflows in Power Automate to ensure smooth execution of business processes',
          'Troubleshot and resolved errors in flows when automation failed',
          'Investigated root causes of system issues across frontend, backend, and SharePoint',
        ]
      }
    ],
    image: '/project_dashboard.jpg',
    metrics: [
      { label: 'Platform', value: 'Power Apps' },
      { label: 'Database', value: 'SharePoint' },
      { label: 'Automation', value: 'Power Automate' }
    ]
  },
  {
    id: 3,
    title: 'Integrated Dashboard & Power BI',
    company: 'PETRONAS Chemicals',
    tags: ['Power BI', 'Data Visualization', 'KPI Tracking', 'Excel'],
    description: 'Developed a Power BI app to integrate 50+ company dashboards into a single unified platform with interactive KPI scorecards.',
    activities: [
      {
        heading: 'Integrated Dashboard',
        items: [
          'Developed a Power BI app to integrate 50+ company dashboards into a single, unified platform',
          'Built interactive visualizations and reports to display key metrics for easy analysis',
          'Designed a centralized dashboard to streamline data access and improve decision-making',
          'Ensured accurate data integration from multiple sources while maintaining consistency',
          'Optimized performance for smooth navigation and real-time updates across all dashboards',
        ]
      },
      {
        heading: 'Power BI Dashboard',
        items: [
          'Designed and developed a Power BI dashboard to consolidate and visualize key performance data',
          'Imported data from Excel and other sources, cleaned and transformed it for accurate reporting',
          'Created interactive visuals such as charts, tables, and KPI trackers to present insights clearly',
          'Added filters and drill-down features to allow users to explore data by time period or category',
          'Ensured data consistency and accuracy while optimizing dashboard performance',
          'Enabled easy tracking and analysis of performance metrics to support data-driven decision making',
        ]
      }
    ],
    image: '/project_powerbi.png',
    metrics: [
      { label: 'Dashboards', value: '50+' },
      { label: 'Visuals', value: 'Charts & KPI' },
      { label: 'Data Sources', value: 'Multi-source' }
    ]
  },
  {
    id: 4,
    title: 'Paymaster — Manual QA Testing',
    company: 'Finexus Group',
    tags: ['Test Cases', 'Manual Testing', 'Bug Reporting', 'Documentation'],
    description: 'Wrote structured test cases, performed feature testing, reported bugs with structured format, and documented test results for the Paymaster fintech system.',
    activities: [
      {
        heading: '1. Write Test Cases',
        items: [
          'Define the Test Case Objective',
          'Identify the Test Steps',
          'Specify Input Values',
          'Describe Expected Outcomes',
          'Use Positive and Negative Cases',
        ]
      },
      {
        heading: '2. Perform Testing',
        items: [
          'Follow all steps in test case',
          'Test all features including filter, search, sorting, export, view page, edit page, and delete page functions',
        ]
      },
      {
        heading: '3. Prompt Bug',
        items: [
          'Report issues to developer team with structured format: Bug ID, Screen, Tester, SeqNo, ErrorCode, ErrorDesc',
          'Update errors and issues for fixing in Bug List',
        ]
      },
      {
        heading: '4. Test Result Documentation',
        items: [
          'Fill out mandatory and optional columns',
          'Mandatory columns: Status, Tester, Tested Date',
        ]
      }
    ],
    image: '/project_mobile.jpg',
    metrics: [
      { label: 'Method', value: 'Manual QA' },
      { label: 'Scope', value: 'Full Feature' },
      { label: 'Deliverable', value: 'Bug Reports' }
    ]
  },
  {
    id: 5,
    title: 'GoBiz — Automation Testing',
    company: 'Finexus Group',
    tags: ['Cypress', 'Node.js', 'VS Code', 'Automation'],
    description: 'Wrote automation test cases using VS Code, Node.js, and Cypress for the GoBiz fintech system at Finexus Group.',
    activities: [
      {
        heading: '1. Write Automation Testing',
        items: [
          'Write automation testing test cases using VS Code, Node.js, and Cypress apps',
        ]
      },
      {
        heading: '2. The Steps',
        items: [
          'Define Test Scenarios',
          'Create Test Files',
          'Write Test Steps Using Cypress Commands',
        ]
      },
      {
        heading: '3. Automated Execution',
        items: [
          'Browser automatically runs tests including filter, sort, and search functions',
          'Tests cover payment reports (yearly), transaction amounts, and currency validation',
          'API calls monitored via Cypress test runner for correct responses',
        ]
      }
    ],
    image: '/project_mobile.jpg',
    metrics: [
      { label: 'Framework', value: 'Cypress' },
      { label: 'Runtime', value: 'Node.js' },
      { label: 'Testing', value: 'Automated' }
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
            <div className="flex flex-col lg:flex-row min-h-[50vh]">
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
                {/* Company label */}
                <span className="label-mono text-[#2D6BFF] mb-3">{project.company}</span>

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
              <div className="h-48 overflow-hidden rounded-lg mb-6">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <DialogHeader>
                <span className="label-mono text-[#2D6BFF] mb-2">{selectedProject.company}</span>
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
              </DialogHeader>

              {/* Activities with bullet points */}
              <div className="mt-6 space-y-6">
                {selectedProject.activities.map((activity, aIdx) => (
                  <div key={aIdx}>
                    <h4 className="text-lg font-semibold text-[#F2F5F9] mb-3">
                      {activity.heading}
                    </h4>
                    <ul className="space-y-2 ml-1">
                      {activity.items.map((item, iIdx) => (
                        <li key={iIdx} className="flex items-start gap-3">
                          <span className="text-[#2D6BFF] mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#2D6BFF]" />
                          <span className="text-[#A6AFBA] text-sm leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-6 mt-8">
                {selectedProject.metrics.map((metric, index) => (
                  <div key={index} className="text-center p-4 bg-[#07080A] rounded-xl">
                    <div className="text-2xl font-bold text-[#2D6BFF] mb-1">
                      {metric.value}
                    </div>
                    <div className="text-sm text-[#A6AFBA]">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}

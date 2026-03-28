import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, ExternalLink, Code2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

const codeSnippet = `test('checkout completes', async ({ page }) => {
  await page.goto('/cart');
  
  // Add item to cart
  await page.click('[data-testid="add-to-cart"]');
  await expect(page.locator('.cart-count'))
    .toHaveText('1');
  
  // Proceed to checkout
  await page.click('[data-testid="checkout"]');
  await page.fill('[name="email"]', 'test@example.com');
  
  // Complete payment
  await page.fill('[name="card"]', '4242424242424242');
  await page.click('[data-testid="pay"]');
  
  // Verify success
  await expect(page.locator('.success-message'))
    .toBeVisible();
});`;

export default function GitHubSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const rightImageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const leftCard = leftCardRef.current;
    const rightImage = rightImageRef.current;
    const text = textRef.current;

    if (!section || !leftCard || !rightImage || !text) return;

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
        .fromTo(leftCard,
          { x: '-100vw', opacity: 0, scale: 0.98 },
          { x: 0, opacity: 1, scale: 1, ease: 'none' },
          0
        )
        .fromTo(rightImage,
          { x: '100vw', opacity: 0, scale: 1.02 },
          { x: 0, opacity: 1, scale: 1, ease: 'none' },
          0.05
        )
        .fromTo(text,
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.12
        );

      // SETTLE (30%-70%): Hold position

      // EXIT (70%-100%)
      scrollTl
        .to(leftCard,
          { x: '-30vw', opacity: 0, ease: 'power2.in' },
          0.70
        )
        .to(rightImage,
          { x: '20vw', opacity: 0, ease: 'power2.in' },
          0.70
        )
        .to(text,
          { y: 10, opacity: 0, ease: 'power2.in' },
          0.72
        );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      id="github"
      className="section-pinned bg-[#07080A] flex items-center justify-center z-[80]"
    >
      {/* Left Code Card */}
      <div 
        ref={leftCardRef}
        className="absolute left-[6vw] top-[10vh] w-[46vw] h-[80vh] glass-card overflow-hidden flex flex-col"
      >
        {/* Card Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[rgba(242,245,249,0.08)]">
          <div className="flex items-center gap-2">
            <Code2 className="w-5 h-5 text-[#2D6BFF]" />
            <span className="text-[#F2F5F9] font-medium text-sm">checkout.spec.ts</span>
          </div>
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
            <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
            <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
          </div>
        </div>

        {/* Code Content */}
        <div className="flex-1 p-6 overflow-auto">
          <pre className="text-sm font-mono leading-relaxed">
            <code className="text-[#A6AFBA]">
              {codeSnippet.split('\n').map((line, i) => (
                <div key={i} className="flex">
                  <span className="text-[#4A4A4A] select-none w-8 text-right mr-4">
                    {i + 1}
                  </span>
                  <span 
                    dangerouslySetInnerHTML={{
                      __html: line
                        .replace(/(\/\/.*)/g, '<span class="text-[#6A9955]">$1</span>')
                        .replace(/('.*?')/g, '<span class="text-[#CE9178]">$1</span>')
                        .replace(/\b(test|async|await|const|expect)\b/g, '<span class="text-[#569CD6]">$1</span>')
                        .replace(/\b(page|toHaveText|toBeVisible|toHaveText|goto|click|fill)\b/g, '<span class="text-[#DCDCAA]">$1</span>')
                    }}
                  />
                </div>
              ))}
            </code>
          </pre>
        </div>

        {/* Card Footer */}
        <div className="px-6 py-3 border-t border-[rgba(242,245,249,0.08)] flex items-center justify-between">
          <span className="text-xs text-[#A6AFBA]">TypeScript</span>
          <span className="text-xs text-[#A6AFBA]">Playwright</span>
        </div>
      </div>

      {/* Right Image with Neon Frame */}
      <div 
        ref={rightImageRef}
        className="absolute left-[54vw] top-[10vh] w-[40vw] h-[80vh]"
      >
        <div className="w-full h-full neon-border rounded-lg overflow-hidden">
          <img 
            src="/github_workspace.jpg" 
            alt="Coding Workspace"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Text Content */}
      <div 
        ref={textRef}
        className="absolute left-[58vw] top-[18vh] w-[32vw]"
      >
        <span className="label-mono text-[#2D6BFF] mb-4 block">GitHub & Automation</span>
        <h2 className="text-[clamp(28px,3vw,48px)] font-bold text-[#F2F5F9] mb-4 leading-tight">
          Code that tests code.
        </h2>
        <p className="text-[#A6AFBA] text-base leading-relaxed mb-8">
          I keep my frameworks clean, reusable, and fast. From page-object models to API helpers—everything is built for maintainability.
        </p>
        
        <div className="flex items-center gap-4">
          <Button 
            className="bg-[#2D6BFF] hover:bg-[#1E5AEE] text-white px-5 py-5 rounded-xl font-medium transition-all duration-300 hover:shadow-[0_0_30px_rgba(45,107,255,0.4)]"
            onClick={() => window.open('https://github.com', '_blank')}
          >
            <Github className="w-4 h-4 mr-2" />
            View GitHub
          </Button>
          <Button 
            variant="outline"
            className="border-[rgba(242,245,249,0.15)] text-[#F2F5F9] hover:bg-[rgba(242,245,249,0.05)] px-5 py-5 rounded-xl font-medium transition-all duration-300"
            onClick={() => window.open('https://github.com', '_blank')}
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Browse scripts
          </Button>
        </div>
      </div>
    </section>
  );
}

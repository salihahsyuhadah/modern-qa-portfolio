import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, MapPin, Linkedin, Github, Copy, Check, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/salihah-syuhadah-4a616a270/' },
  { icon: Github, label: 'GitHub', href: 'https://github.com/salihahsyuhadah' },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    const footer = footerRef.current;

    if (!section || !card || !footer) return;

    const ctx = gsap.context(() => {
      // Card animation
      gsap.fromTo(card,
        { y: '10vh', opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
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

      // Footer links animation
      const footerLinks = footer.querySelectorAll('.footer-link');
      gsap.fromTo(footerLinks,
        { y: 12, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footer,
            start: 'top 90%',
            end: 'top 70%',
            scrub: 1,
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText('salsyhdh@gmail.com');
    setCopied(true);
    toast.success('Email copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadResume = () => {
    toast.success('Resume download started!');
    // In a real app, this would trigger an actual file download
  };

  return (
    <section 
      ref={sectionRef} 
      id="contact"
      className="min-h-screen bg-[#07080A] py-24 px-[6vw] z-[90] relative flex flex-col items-center justify-center"
    >
      {/* Contact Card */}
      <div 
        ref={cardRef}
        className="glass-card p-12 md:p-16 max-w-3xl w-full text-center mb-16"
      >
        <h2 className="text-[clamp(34px,3.6vw,56px)] font-bold text-[#F2F5F9] mb-6">
          Let's build quality together.
        </h2>
        
        <p className="text-[#A6AFBA] text-lg leading-relaxed mb-10 max-w-xl mx-auto">
          Open to full-time roles, consulting, and long-term contracts. Let's discuss how I can help improve your product quality.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button 
            className="bg-[#2D6BFF] hover:bg-[#1E5AEE] text-white px-8 py-6 rounded-xl font-medium transition-all duration-300 hover:shadow-[0_0_30px_rgba(45,107,255,0.4)] w-full sm:w-auto"
            onClick={() => window.location.href = 'mailto:salsyhdh@gmail.com'}
          >
            <Mail className="w-5 h-5 mr-2" />
            Send an email
          </Button>
          
          <Button 
            variant="outline"
            className="border-[rgba(242,245,249,0.15)] text-[#F2F5F9] hover:bg-[rgba(242,245,249,0.05)] px-8 py-6 rounded-xl font-medium transition-all duration-300 w-full sm:w-auto"
            onClick={copyEmail}
          >
            {copied ? <Check className="w-5 h-5 mr-2 text-green-400" /> : <Copy className="w-5 h-5 mr-2" />}
            {copied ? 'Copied!' : 'Copy email'}
          </Button>

          <Button 
            variant="outline"
            className="border-[rgba(242,245,249,0.15)] text-[#F2F5F9] hover:bg-[rgba(242,245,249,0.05)] px-8 py-6 rounded-xl font-medium transition-all duration-300 w-full sm:w-auto"
            onClick={downloadResume}
          >
            <Download className="w-5 h-5 mr-2" />
            Resume
          </Button>
        </div>
      </div>

      {/* Footer */}
      <div 
        ref={footerRef}
        className="w-full max-w-4xl flex flex-col md:flex-row items-center justify-between gap-8 pt-8 border-t border-[rgba(242,245,249,0.08)]"
      >
        {/* Email */}
        <a 
          href="mailto:hello@qaengineer.dev"
          className="footer-link inline-flex items-center gap-2 text-[#A6AFBA] hover:text-[#F2F5F9] transition-colors"
        >
          <Mail className="w-4 h-4" />
          <span className="font-mono text-sm">salsyhdh@gmail.com</span>
        </a>

        {/* Location */}
        <div className="footer-link inline-flex items-center gap-2 text-[#A6AFBA]">
          <MapPin className="w-4 h-4" />
          <span className="font-mono text-sm">Kuala Terengganu, Terengganu · Willing to relocate</span>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-6">
          {socialLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link text-[#A6AFBA] hover:text-[#2D6BFF] transition-colors"
                aria-label={link.label}
              >
                <Icon className="w-5 h-5" />
              </a>
            );
          })}
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-16 text-center">
        <p className="text-[#4A4A4A] text-sm font-mono">
          © {new Date().getFullYear()} Salihah Syuhadah. Built with precision.
        </p>
      </div>
    </section>
  );
}

import { useEffect, useState } from 'react';
import { Menu, X, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' }
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          isScrolled 
            ? 'bg-[#07080A]/90 backdrop-blur-md border-b border-[rgba(242,245,249,0.08)]' 
            : 'bg-transparent'
        }`}
      >
        <div className="px-[6vw] py-4 flex items-center justify-between">
          {/* Logo */}
          <a 
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#hero');
            }}
            className="font-mono text-sm font-medium text-[#F2F5F9] tracking-wider hover:text-[#2D6BFF] transition-colors"
          >
            SALIHAH//QA
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className="text-sm text-[#A6AFBA] hover:text-[#F2F5F9] transition-colors"
              >
                {link.label}
              </a>
            ))}
            <Button 
              variant="outline"
              size="sm"
              className="border-[rgba(242,245,249,0.15)] text-[#F2F5F9] hover:bg-[rgba(242,245,249,0.05)] rounded-lg text-xs"
            >
              <Download className="w-3 h-3 mr-1" />
              Resume
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-[#F2F5F9] p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 z-[99] bg-[#07080A]/98 backdrop-blur-lg transition-all duration-500 md:hidden ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(link.href);
              }}
              className="text-2xl font-semibold text-[#F2F5F9] hover:text-[#2D6BFF] transition-colors"
            >
              {link.label}
            </a>
          ))}
          <Button 
            variant="outline"
            className="border-[rgba(242,245,249,0.15)] text-[#F2F5F9] hover:bg-[rgba(242,245,249,0.05)] mt-4"
          >
            <Download className="w-4 h-4 mr-2" />
            Download Resume
          </Button>
        </div>
      </div>
    </>
  );
}

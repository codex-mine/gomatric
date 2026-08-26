import Link from 'next/link';


export function Footer() {
  return (
    <footer className="bg-brand-primary-dark text-white relative overflow-hidden">
      {/* Red Route accent element */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-brand-accent opacity-80" />

      {/* Top Section */}
      <div className="pt-24 pb-12 px-5 md:px-8 max-w-7xl mx-auto flex justify-center">
        <h2 className="font-sora text-5xl md:text-7xl font-bold text-white/5 tracking-tighter text-center select-none">
          GO FURTHER.
        </h2>
      </div>

      {/* Main Content */}
      <div className="px-5 md:px-8 max-w-7xl mx-auto pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          <div className="flex flex-col gap-6">
            <Link href="/" className="font-sora font-bold text-2xl">
              GoMatric
            </Link>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              Your premium travel-tech platform. Curating exceptional journeys and seamless visa experiences around the globe.
            </p>
            <div className="flex items-center gap-4 mt-2">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-accent transition-colors text-white/80 hover:text-white">
                <span className="w-5 h-5 font-bold">Fb</span>
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-accent transition-colors text-white/80 hover:text-white">
                <span className="w-5 h-5 font-bold">Ig</span>
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-accent transition-colors text-white/80 hover:text-white">
                <span className="w-5 h-5 font-bold">Tw</span>
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-accent transition-colors text-white/80 hover:text-white">
                <span className="w-5 h-5 font-bold">In</span>
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <h3 className="font-sora font-semibold text-lg text-white">Explore</h3>
            <ul className="flex flex-col gap-3">
              <li><Link href="/destinations" className="text-white/60 hover:text-brand-accent transition-colors text-sm">Destinations</Link></li>
              <li><Link href="/tours" className="text-white/60 hover:text-brand-accent transition-colors text-sm">Tours</Link></li>
              <li><Link href="/travel-guide" className="text-white/60 hover:text-brand-accent transition-colors text-sm">Travel Guide</Link></li>
            </ul>
          </div>

          <div className="flex flex-col gap-5">
            <h3 className="font-sora font-semibold text-lg text-white">Services</h3>
            <ul className="flex flex-col gap-3">
              <li><Link href="/visa" className="text-white/60 hover:text-brand-accent transition-colors text-sm">Visa</Link></li>
              <li><Link href="/custom-tours" className="text-white/60 hover:text-brand-accent transition-colors text-sm">Custom Tours</Link></li>
              <li><Link href="/travel-support" className="text-white/60 hover:text-brand-accent transition-colors text-sm">Travel Support</Link></li>
            </ul>
          </div>

          <div className="flex flex-col gap-5">
            <h3 className="font-sora font-semibold text-lg text-white">Company</h3>
            <ul className="flex flex-col gap-3">
              <li><Link href="/about" className="text-white/60 hover:text-brand-accent transition-colors text-sm">About</Link></li>
              <li><Link href="/faq" className="text-white/60 hover:text-brand-accent transition-colors text-sm">FAQ</Link></li>
              <li><Link href="/contact" className="text-white/60 hover:text-brand-accent transition-colors text-sm">Contact</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-5 md:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/50 text-sm">
            © 2026 GoMatric. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-white/50 hover:text-white text-sm transition-colors">Privacy</Link>
            <Link href="/terms" className="text-white/50 hover:text-white text-sm transition-colors">Terms</Link>
            <Link href="/cookies" className="text-white/50 hover:text-white text-sm transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

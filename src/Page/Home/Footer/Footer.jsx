import React from 'react';
import ProfastIcon from '../Navbar/profastIcon';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div className="bg-neutral text-neutral-content pt-16 pb-8 px-4">
        <div className="container mx-auto">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

            {/* Brand Section */}
            <div className="col-span-1 md:col-span-1 flex flex-col items-start gap-4">
              <div className="flex items-center gap-2">
                <ProfastIcon />
              </div>
              <p className="text-sm text-neutral-content/70 leading-relaxed max-w-xs">
                Optimizing your workflow with speed and precision. The ultimate tool for modern professionals.
              </p>
            </div>

            {/* Links Column 1 */}
            <div>
              <h3 className="font-semibold text-white mb-4 uppercase tracking-wider text-sm">Product</h3>
              <ul className="space-y-3 text-sm text-neutral-content/70">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
              </ul>
            </div>

            {/* Links Column 2 */}
            <div>
              <h3 className="font-semibold text-white mb-4 uppercase tracking-wider text-sm">Company</h3>
              <ul className="space-y-3 text-sm text-neutral-content/70">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>

            {/* Social / Contact Section */}
            <div>
              <h3 className="font-semibold text-white mb-4 uppercase tracking-wider text-sm">Connect</h3>
              <div className="flex gap-4 mb-4">
                {/* Simple SVG Social Icons */}
                <a href="#" className="p-2 bg-neutral-focus rounded-full hover:bg-primary transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                </a>
                <a href="#" className="p-2 bg-neutral-focus rounded-full hover:bg-primary transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-neutral-focus pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-neutral-content/50">
            <p>© {currentYear} Profast Inc. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white">Privacy Policy</a>
              <a href="#" className="hover:text-white">Terms of Service</a>
              <a href="#" className="hover:text-white">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
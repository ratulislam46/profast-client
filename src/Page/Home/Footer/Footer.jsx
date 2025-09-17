import React from 'react';
import ProfastIcon from '../Navbar/profastIcon';

const Footer = () => {
  return (
    <footer className="footer footer-horizontal footer-center bg-neutral text-neutral-content p-10">
        <div>
          <ProfastIcon></ProfastIcon>
        </div>
        <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
      
    </footer>
  );
};

export default Footer;
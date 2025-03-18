
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          Built with ❤️ using React, Tailwind CSS and Supabase
        </p>
        <div className="flex items-center gap-4">
          <Link 
            to="/" 
            className="text-sm font-medium underline-offset-4 hover:underline text-muted-foreground"
          >
            Home
          </Link>
          <Link 
            to="/dashboard" 
            className="text-sm font-medium underline-offset-4 hover:underline text-muted-foreground"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

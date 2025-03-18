
import React from 'react';
import { Link } from 'react-router-dom';
import { Code2 } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t py-10 bg-muted/30">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 font-bold text-xl mb-4">
              <Code2 className="h-5 w-5 text-brand-indigo" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-blue via-brand-indigo to-brand-purple">
                Prompt2Site
              </span>
            </Link>
            <p className="text-muted-foreground max-w-xs">
              Create beautiful, functional websites in seconds using AI. No coding skills required.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/create" className="text-muted-foreground hover:text-foreground transition-colors">
                  Create a Website
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Account</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/login" className="text-muted-foreground hover:text-foreground transition-colors">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-muted-foreground hover:text-foreground transition-colors">
                  Register
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Prompt2Site. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Built with ❤️ using React, Tailwind CSS and Supabase
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

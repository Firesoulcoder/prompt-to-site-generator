
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Code2, Loader2 } from 'lucide-react';

const Navbar = () => {
  const { user, signOut, loading } = useAuth();

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center px-4 container">
        <Link to="/" className="flex items-center gap-2 font-bold text-2xl">
          <Code2 className="h-6 w-6 text-brand-indigo" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-blue via-brand-indigo to-brand-purple animate-gradient-x">
            Prompt2Site
          </span>
        </Link>
        
        <div className="ml-auto flex items-center gap-4">
          {loading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : user ? (
            <>
              <Link to="/dashboard">
                <Button variant="ghost">Dashboard</Button>
              </Link>
              <Button onClick={() => signOut()} variant="outline">
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link to="/register">
                <Button variant="default">Sign Up</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

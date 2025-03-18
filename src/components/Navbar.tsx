
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Code2, Loader2, Menu, X } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from '@/lib/utils';

const Navbar = () => {
  const { user, signOut, loading } = useAuth();
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const NavLinks = ({ className }: { className?: string }) => (
    <div className={cn("flex items-center gap-6", className)}>
      <Link to="/" className="font-medium text-foreground/80 hover:text-foreground transition-colors">
        Home
      </Link>
      <Link to="/dashboard" className="font-medium text-foreground/80 hover:text-foreground transition-colors">
        Dashboard
      </Link>
      <Link to="/create" className="font-medium text-foreground/80 hover:text-foreground transition-colors">
        Create
      </Link>
    </div>
  );

  return (
    <nav className={cn(
      "sticky top-0 z-50 w-full border-b transition-all duration-200",
      isScrolled 
        ? "bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 border-border/40" 
        : "bg-transparent border-transparent"
    )}>
      <div className="flex h-16 items-center px-4 container">
        <Link to="/" className="flex items-center gap-2 font-bold text-2xl">
          <Code2 className="h-6 w-6 text-brand-indigo" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-blue via-brand-indigo to-brand-purple animate-gradient-x">
            Prompt2Site
          </span>
        </Link>
        
        <NavLinks className="ml-10 hidden md:flex" />
        
        <div className="ml-auto flex items-center gap-4">
          {loading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : user ? (
            <>
              <Link to="/dashboard">
                <Button variant="ghost" className="hidden md:flex">Dashboard</Button>
              </Link>
              <Button onClick={() => signOut()} variant="outline" className="hidden md:flex">
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Link to="/login" className="hidden md:block">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link to="/register" className="hidden md:block">
                <Button variant="default" className="bg-brand-indigo hover:bg-brand-indigo/90">Sign Up</Button>
              </Link>
            </>
          )}

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col h-full">
                <div className="flex items-center gap-2 font-bold text-xl mb-6">
                  <Code2 className="h-5 w-5 text-brand-indigo" />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-blue via-brand-indigo to-brand-purple">
                    Prompt2Site
                  </span>
                </div>
                
                <div className="flex flex-col gap-4">
                  <Link to="/" className="font-medium text-foreground/80 hover:text-foreground transition-colors">
                    Home
                  </Link>
                  <Link to="/dashboard" className="font-medium text-foreground/80 hover:text-foreground transition-colors">
                    Dashboard
                  </Link>
                  <Link to="/create" className="font-medium text-foreground/80 hover:text-foreground transition-colors">
                    Create
                  </Link>
                </div>
                
                <div className="mt-8 pt-4 border-t">
                  {user ? (
                    <div className="flex flex-col gap-3">
                      <Link to="/dashboard">
                        <Button variant="outline" className="w-full">Dashboard</Button>
                      </Link>
                      <Button onClick={() => signOut()} variant="destructive" className="w-full">
                        Sign Out
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3">
                      <Link to="/login" className="w-full">
                        <Button variant="outline" className="w-full">Login</Button>
                      </Link>
                      <Link to="/register" className="w-full">
                        <Button className="w-full bg-brand-indigo hover:bg-brand-indigo/90">Sign Up</Button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Zap } from 'lucide-react';

const CallToAction = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-brand-blue/10 via-brand-indigo/10 to-brand-purple/10">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-indigo/10 text-brand-indigo mb-6">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium">Start creating in seconds</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-brand-blue to-brand-indigo">
            Ready to transform your ideas into reality?
          </h2>
          
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already creating stunning websites with just a few simple prompts.
            No coding required – just describe what you want.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/create">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-brand-blue to-brand-indigo hover:opacity-90 shadow-lg hover:shadow-xl transition-all gap-2 w-full sm:w-auto"
              >
                Create Your Website Now
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            
            <Link to="/login">
              <Button 
                variant="outline" 
                size="lg" 
                className="border-brand-indigo/20 text-brand-indigo hover:bg-brand-indigo/10 w-full sm:w-auto"
              >
                <Zap className="h-4 w-4 mr-2" />
                Login to Your Account
              </Button>
            </Link>
          </div>
          
          <div className="mt-12 p-4 bg-white/50 rounded-lg border border-brand-indigo/10 inline-block">
            <p className="text-sm text-muted-foreground">
              ✨ <span className="font-medium">Try it now</span> - Login with <span className="font-mono bg-muted px-1 py-0.5 rounded text-xs">example@outlook.com</span> / <span className="font-mono bg-muted px-1 py-0.5 rounded text-xs">1234</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;

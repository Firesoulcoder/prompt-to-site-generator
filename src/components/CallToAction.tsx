
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap } from 'lucide-react';

const CallToAction = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-brand-blue/10 via-brand-indigo/10 to-brand-purple/10">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-indigo/10 text-brand-indigo mb-6">
            <Zap className="h-4 w-4" />
            <span className="text-sm font-medium">Start creating in seconds</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to transform your ideas into reality?
          </h2>
          
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already creating stunning websites with just a few simple prompts.
            No coding required.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/create">
              <Button size="lg" className="bg-brand-indigo hover:bg-brand-indigo/90 shadow-lg hover:shadow-xl transition-all">
                Create Your Website Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            
            <Link to="/login">
              <Button variant="outline" size="lg" className="border-brand-indigo/20 text-brand-indigo hover:bg-brand-indigo/10">
                Login to Your Account
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;

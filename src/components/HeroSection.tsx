
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Code, Sparkles } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden pt-20 pb-16 md:pt-28 md:pb-24">
      <div className="absolute inset-0 bg-grid-slate-400/[0.05] bg-[center_top_1rem] mask-gradient-faded pointer-events-none"></div>
      
      {/* Gradient blobs */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-brand-blue/20 rounded-full filter blur-3xl opacity-60 animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-brand-purple/20 rounded-full filter blur-3xl opacity-60 animate-pulse" style={{ animationDelay: '1s' }}></div>
      
      <div className="container relative">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <div className="rounded-full border border-brand-indigo/20 px-4 py-1.5 text-sm font-medium mb-6 flex items-center gap-1.5 text-brand-indigo animate-fade-in">
            <Sparkles className="h-3.5 w-3.5" />
            Turn your ideas into websites instantly
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Create websites with <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-brand-indigo to-brand-purple">simple prompts</span>
          </h1>
          
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mb-10 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Transform your ideas into fully functional websites in seconds. Just describe what you want, and our AI generates the code instantly.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Link to="/create">
              <Button className="bg-brand-indigo hover:bg-brand-indigo/90 shadow-md hover:shadow-lg transition-all" size="lg">
                Create Website
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="outline" size="lg" className="border-brand-indigo/20 text-brand-indigo hover:bg-brand-indigo/10">
                View Your Projects
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      <div className="container pb-12 md:pb-24 mt-16 md:mt-24 animate-fade-in" style={{ animationDelay: '0.4s' }}>
        <div className="rounded-xl overflow-hidden border shadow-xl bg-gradient-to-br from-gray-950 to-gray-900 transform transition-all hover:scale-[1.01] hover:shadow-2xl">
          <div className="p-3 bg-gray-900/50 border-b border-gray-800 flex items-center gap-1.5">
            <div className="h-3 w-3 rounded-full bg-red-500"></div>
            <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
            <div className="h-3 w-3 rounded-full bg-green-500"></div>
            <div className="ml-4 text-xs text-gray-400">prompt-result.html</div>
          </div>
          <div className="p-4 text-gray-300 font-mono text-sm overflow-hidden">
            <div className="flex items-start gap-2">
              <Code className="h-5 w-5 text-gray-500 mt-1 flex-shrink-0" />
              <div className="space-y-1">
                <div className="text-blue-400">&lt;<span className="text-pink-400">html</span>&gt;</div>
                <div className="ml-4 text-blue-400">&lt;<span className="text-pink-400">head</span>&gt;</div>
                <div className="ml-8 text-blue-400">&lt;<span className="text-pink-400">title</span>&gt;<span className="text-gray-200">My Amazing Website</span>&lt;/<span className="text-pink-400">title</span>&gt;</div>
                <div className="ml-8 text-blue-400">&lt;<span className="text-pink-400">style</span>&gt;</div>
                <div className="ml-12 text-green-400">/* Generated CSS styles */</div>
                <div className="ml-8 text-blue-400">&lt;/<span className="text-pink-400">style</span>&gt;</div>
                <div className="ml-4 text-blue-400">&lt;/<span className="text-pink-400">head</span>&gt;</div>
                <div className="ml-4 text-blue-400">&lt;<span className="text-pink-400">body</span>&gt;</div>
                <div className="ml-8 text-blue-400">&lt;<span className="text-pink-400">header</span>&gt;</div>
                <div className="ml-12 text-gray-400">...</div>
                <div className="ml-8 text-blue-400">&lt;/<span className="text-pink-400">header</span>&gt;</div>
                <div className="ml-8 text-gray-400">...</div>
                <div className="ml-4 text-blue-400">&lt;/<span className="text-pink-400">body</span>&gt;</div>
                <div className="text-blue-400">&lt;/<span className="text-pink-400">html</span>&gt;</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

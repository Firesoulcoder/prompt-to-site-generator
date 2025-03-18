
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Code2, Save, Sparkles, User, Zap, Lightbulb, Clock } from 'lucide-react';

const features = [
  {
    icon: <Sparkles className="h-12 w-12 text-brand-blue" />,
    title: "AI-Powered Generation",
    description: "Just describe what you want, and our powerful AI will generate complete HTML, CSS, and JavaScript for your website."
  },
  {
    icon: <Code2 className="h-12 w-12 text-brand-indigo" />,
    title: "Instant Code Preview",
    description: "See your website come to life in real-time with our built-in preview feature, no waiting or deployment needed."
  },
  {
    icon: <Save className="h-12 w-12 text-brand-purple" />,
    title: "Save & Manage Projects",
    description: "All your generated websites are automatically saved to your account for easy access and management."
  },
  {
    icon: <User className="h-12 w-12 text-brand-blue" />,
    title: "Secure Authentication",
    description: "Your projects are protected with Supabase authentication, ensuring only you have access to your creations."
  },
  {
    icon: <Zap className="h-12 w-12 text-brand-indigo" />,
    title: "Lightning Fast",
    description: "Generate your website in seconds, not hours. No more waiting for developers or learning complex platforms."
  },
  {
    icon: <Lightbulb className="h-12 w-12 text-brand-purple" />,
    title: "Endless Possibilities",
    description: "From personal blogs to business websites, create any type of site you need with simple natural language prompts."
  },
  {
    icon: <Clock className="h-12 w-12 text-brand-blue" />,
    title: "Time-Saving",
    description: "What would take days with traditional methods takes just minutes with our AI-powered website generator."
  }
];

const FeaturesSection = () => {
  return (
    <div className="py-20 relative overflow-hidden bg-background">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-slate-400/[0.05] bg-[center_top_1rem] pointer-events-none"></div>
      <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-brand-purple/10 rounded-full filter blur-3xl opacity-50"></div>
      <div className="absolute -right-20 -top-20 w-64 h-64 bg-brand-blue/10 rounded-full filter blur-3xl opacity-50"></div>
      
      <div className="container relative">
        <div className="text-center mb-16">
          <div className="rounded-full border border-brand-indigo/20 px-3 py-1 text-xs font-medium inline-flex items-center gap-1 text-brand-indigo mb-4">
            <Sparkles className="h-3 w-3" />
            Powerful Features
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything You Need</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Turn your ideas into fully functional websites without writing a single line of code. Our powerful features make website creation simple.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.slice(0, 6).map((feature, index) => (
            <Card key={index} className="border border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-md hover:bg-card transition-all duration-300 overflow-hidden group">
              <CardContent className="p-6">
                <div className="mb-5 inline-flex p-3 rounded-full bg-gradient-to-br from-background to-muted transform group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 tracking-tight">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;

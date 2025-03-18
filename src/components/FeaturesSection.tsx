
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Code2, Save, Sparkles, User } from 'lucide-react';

const features = [
  {
    icon: <Sparkles className="h-10 w-10 text-brand-blue" />,
    title: "AI-Powered Generation",
    description: "Just describe what you want, and our powerful AI will generate complete HTML, CSS, and JavaScript for your website."
  },
  {
    icon: <Code2 className="h-10 w-10 text-brand-indigo" />,
    title: "Instant Code Preview",
    description: "See your website come to life in real-time with our built-in preview feature, no waiting or deployment needed."
  },
  {
    icon: <Save className="h-10 w-10 text-brand-purple" />,
    title: "Save & Manage Projects",
    description: "All your generated websites are automatically saved to your account for easy access and management."
  },
  {
    icon: <User className="h-10 w-10 text-brand-blue" />,
    title: "Secure Authentication",
    description: "Your projects are protected with Supabase authentication, ensuring only you have access to your creations."
  }
];

const FeaturesSection = () => {
  return (
    <div className="py-16 bg-muted/50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Features</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Everything you need to turn your ideas into fully functional websites without writing a single line of code.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border bg-card hover:shadow-md transition-all">
              <CardHeader>
                <div className="mb-4">{feature.icon}</div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;

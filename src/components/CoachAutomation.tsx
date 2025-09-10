import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Phone, MessageSquare, Calendar, Clock, Users, TrendingUp, Zap, Bot, ArrowRight, CheckCircle, PlayCircle, Globe, Star, Activity, Brain, Target, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CoachAutomation: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const automationFeatures = [
    {
      icon: Bot,
      title: "AI Voice Assistant",
      description: "Intelligent voice agent that handles calls, qualifies leads, and books appointments with natural conversation.",
      stats: { calls: "2,847", success: "96%", automation: "24/7" },
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50",
      route: "/voice-agent"
    },
    {
      icon: MessageSquare,
      title: "Smart Messaging Hub",
      description: "Unified platform managing WhatsApp, SMS, and email with AI-powered personalized responses.",
      stats: { messages: "15,230", response: "0.3s", channels: "5+" },
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-50 to-pink-50",
      route: "/inbox"
    },
    {
      icon: Calendar,
      title: "Intelligent Scheduling",
      description: "Smart booking system with automated reminders, reschedule handling, and timezone optimization.",
      stats: { bookings: "1,456", showRate: "94%", efficiency: "89%" },
      gradient: "from-green-500 to-emerald-500",
      bgGradient: "from-green-50 to-emerald-50",
      route: "/bookings"
    },
    {
      icon: Brain,
      title: "Predictive Analytics",
      description: "AI-driven insights that predict client behavior, optimize conversion rates, and maximize revenue.",
      stats: { accuracy: "92%", revenue: "+340%", insights: "Real-time" },
      gradient: "from-orange-500 to-red-500",
      bgGradient: "from-orange-50 to-red-50",
      route: "/analytics"
    },
    {
      icon: Users,
      title: "AI Lead Generation",
      description: "Smart automation that captures, qualifies, and nurtures leads with personalized experiences.",
      stats: { leads: "300%", qualified: "85%", conversion: "45%" },
      gradient: "from-primary to-purple-600",
      bgGradient: "from-primary/10 to-purple-50",
      route: "/crm"
    },
    {
      icon: Zap,
      title: "Workflow Automation",
      description: "Visual automation builder with pre-built templates and real-time performance analytics.",
      stats: { workflows: "150+", setup: "10x faster", efficiency: "95%" },
      gradient: "from-violet-500 to-primary",
      bgGradient: "from-violet-50 to-primary/10",
      route: "/automation"
    }
  ];

  const processSteps = [
    { icon: Target, title: "Lead Capture", description: "AI identifies and captures qualified prospects", color: "text-blue-600" },
    { icon: Phone, title: "Smart Outreach", description: "Automated multi-channel follow-up sequences", color: "text-purple-600" },
    { icon: Calendar, title: "Seamless Booking", description: "Intelligent scheduling with optimal timing", color: "text-green-600" },
    { icon: TrendingUp, title: "Conversion", description: "Data-driven optimization for maximum results", color: "text-orange-600" }
  ];

  const handleNavigateToFeature = (route: string) => {
    navigate(route);
  };

  return (
    <section ref={sectionRef} className="py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 relative overflow-hidden">
      {/* Enhanced Background Elements with slide-in effects */}
      <div className="absolute inset-0">
        <div className={`absolute top-0 left-0 w-[500px] h-[500px] bg-primary/8 rounded-full blur-3xl transition-all duration-3000 ${isVisible ? 'animate-bounce-gentle opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}></div>
        <div className={`absolute bottom-0 right-0 w-[400px] h-[400px] bg-accent/8 rounded-full blur-3xl transition-all duration-3000 delay-500 ${isVisible ? 'animate-bounce-gentle opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}></div>
        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-purple-500/6 rounded-full blur-3xl transition-all duration-3000 delay-1000 ${isVisible ? 'animate-pulse opacity-100 scale-100' : 'opacity-0 scale-75'}`}></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.02)_1px,transparent_1px)] bg-[size:60px_60px]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Enhanced Header with bounce effect */}
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-95'}`}>
          <div className={`inline-flex items-center space-x-3 bg-gradient-to-r from-primary/15 to-accent/15 backdrop-blur-sm text-primary px-8 py-4 rounded-full text-sm font-semibold mb-8 border border-primary/20 transition-all duration-500 shadow-lg ${isVisible ? 'animate-bounce-gentle' : ''}`}>
            <Bot className="w-5 h-5 animate-pulse" />
            <span>AI-Powered Coaching Revolution</span>
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
          </div>
          
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-slate-900 via-primary to-purple-800 bg-clip-text text-transparent">
              Everything Coaches Need to
            </span>
            <br />
            <span className="text-slate-800">Scale & Automate</span>
          </h2>
          
          <p className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed mb-12">
            Comprehensive AI-powered tools designed specifically for modern coaches who want to automate their practice 
            and focus on what they do best - coaching and transforming lives.
          </p>
          
          {/* Success Metrics with stagger effect */}
          <div className="flex flex-wrap items-center justify-center gap-8 mb-16">
            {[
              { icon: Star, label: "4.9/5 Rating", value: "2,000+ Reviews" },
              { icon: Users, label: "15,000+ Coaches", value: "Active Worldwide" },
              { icon: TrendingUp, label: "400% Growth", value: "Average Increase" },
              { icon: Shield, label: "Enterprise Security", value: "99.9% Uptime" }
            ].map((metric, index) => (
              <div key={index} className={`flex items-center space-x-3 bg-white/70 backdrop-blur-sm px-6 py-3 rounded-2xl border border-white/40 shadow-lg group transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95'}`} 
                   style={{ transitionDelay: `${index * 200 + 600}ms` }}>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-primary to-accent flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <metric.icon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">{metric.label}</p>
                  <p className="text-xs text-slate-600">{metric.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Feature Grid with slide-in from different directions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {automationFeatures.map((feature, index) => {
            const IconComponent = feature.icon;
            const slideDirection = index % 3 === 0 ? 'slide-in-left' : index % 3 === 1 ? 'slide-in-up' : 'slide-in-right';
            return (
              <Card 
                key={index}
                className={`
                  relative overflow-hidden border-0 shadow-2xl hover:shadow-3xl transition-all duration-700 group cursor-pointer
                  ${isVisible ? 'translate-x-0 translate-y-0 opacity-100' : 
                    index % 3 === 0 ? '-translate-x-10 opacity-0' : 
                    index % 3 === 1 ? 'translate-y-10 opacity-0' : 
                    'translate-x-10 opacity-0'}
                  bg-gradient-to-br ${feature.bgGradient} hover:scale-[1.02]
                `}
                style={{ transitionDelay: `${index * 200 + 800}ms` }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Animated background overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-all duration-500`}></div>
                
                <CardContent className="p-8 relative z-10">
                  <div className="flex items-start justify-between mb-6">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center transform transition-all duration-500 ${hoveredCard === index ? 'scale-110 rotate-3' : ''} shadow-xl`}>
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <div className={`transition-all duration-300 ${hoveredCard === index ? 'translate-x-2' : ''}`}>
                      <ArrowRight className="h-6 w-6 text-primary opacity-70 hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>
                  
                  <h3 className={`text-2xl font-bold text-slate-900 mb-4 transition-colors duration-300 ${hoveredCard === index ? 'text-primary' : ''}`}>
                    {feature.title}
                  </h3>
                  
                  <p className="text-slate-600 leading-relaxed mb-6 text-lg">
                    {feature.description}
                  </p>
                  
                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {Object.entries(feature.stats).map(([key, value], statIndex) => (
                      <div key={statIndex} className="text-center">
                        <p className={`text-xl font-bold bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent`}>
                          {value}
                        </p>
                        <p className="text-xs text-slate-500 capitalize">{key}</p>
                      </div>
                    ))}
                  </div>
                  
                  {/* Progress indicator */}
                  <div className="relative mb-4">
                    <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r ${feature.gradient} transition-all duration-1000 delay-500 rounded-full`}
                        style={{ width: isVisible ? '85%' : '0%' }}
                      ></div>
                    </div>
                  </div>
                  
                  {/* Navigation Button */}
                  <Button
                    onClick={() => handleNavigateToFeature(feature.route)}
                    className={`w-full bg-gradient-to-r ${feature.gradient} text-white hover:scale-105 transition-all duration-300 shadow-lg group`}
                  >
                    <span className="mr-2">Explore Feature</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Enhanced Process Flow - without client reviews */}
        <div className={`bg-gradient-to-r from-slate-900 via-primary to-purple-900 rounded-3xl p-12 mb-20 text-white relative overflow-hidden transition-all duration-1000 delay-800 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {/* Animated background elements */}
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/20 rounded-full blur-2xl animate-pulse animation-delay-1000"></div>
          </div>
          
          <div className="relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full mb-6">
                <Activity className="w-5 h-5 text-accent" />
                <span className="font-semibold">Automated Process Flow</span>
              </div>
              <h3 className="text-4xl md:text-5xl font-bold mb-6">
                From Prospect to Client
                <span className="block text-accent">In 4 Smart Steps</span>
              </h3>
              <p className="text-white/80 text-xl max-w-3xl mx-auto">
                Watch how our AI transforms every interaction into revenue while you focus on coaching
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {processSteps.map((step, index) => {
                const StepIcon = step.icon;
                return (
                  <div key={index} className="text-center group hover:scale-105 transition-all duration-500">
                    <div className="relative mb-6">
                      <div className="w-24 h-24 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-white/20 transition-all duration-300 border border-white/20">
                        <StepIcon className={`h-12 w-12 ${step.color.replace('text-', 'text-')} group-hover:scale-110 transition-transform duration-300`} />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                        {index + 1}
                      </div>
                    </div>
                    <h4 className="text-2xl font-bold mb-3 group-hover:text-accent transition-colors duration-300">
                      {step.title}
                    </h4>
                    <p className="text-white/70 leading-relaxed group-hover:text-white/90 transition-colors duration-300">
                      {step.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Flow arrows */}
            <div className="hidden md:flex justify-center items-center mt-8 space-x-12">
              {[...Array(3)].map((_, index) => (
                <ArrowRight 
                  key={index} 
                  className="h-6 w-6 text-white/50 animate-pulse" 
                  style={{ animationDelay: `${index * 500}ms` }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced CTA with wiggle effect */}
        <div className={`text-center transition-all duration-1000 delay-1200 ${isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-95'}`}>
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-purple-500/20 rounded-3xl blur-3xl animate-pulse"></div>
            <div className={`relative bg-gradient-to-r from-white/80 to-white/90 backdrop-blur-sm rounded-3xl p-16 border border-white/30 shadow-2xl transition-all duration-500 group ${isVisible ? 'animate-bounce-gentle' : ''}`}>
              <h3 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-purple-600 bg-clip-text text-transparent">
                Ready to 10x Your Coaching Business?
              </h3>
              <p className="text-slate-700 mb-10 text-xl max-w-3xl mx-auto leading-relaxed">
                Join 15,000+ coaches who've transformed their practice with AI automation. 
                Start your free trial and see results in 24 hours.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-primary to-purple-600 text-white hover:scale-110 transition-all duration-300 text-xl px-12 py-6 rounded-full shadow-2xl hover:shadow-primary/30 group-hover:scale-105 animate-pulse-glow"
                >
                  Start Free 14-Day Trial
                  <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-2 border-primary/30 text-primary hover:bg-primary/5 text-xl px-12 py-6 rounded-full hover:scale-105 transition-all duration-300 hover:animate-wiggle"
                >
                  <PlayCircle className="mr-3 h-6 w-6" />
                  Watch Live Demo
                </Button>
              </div>
              
              <p className="text-slate-500 mt-6 text-lg">
                ✓ No credit card required  ✓ Setup in 24 hours  ✓ Cancel anytime
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoachAutomation;

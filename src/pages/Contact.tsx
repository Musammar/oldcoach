import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, Headphones, Users, CheckCircle, Star } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    subject: 'general'
  });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      details: 'hello@coachflow.ai',
      description: 'Get in touch for any questions'
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: '+1 (555) 123-4567',
      description: 'Mon-Fri 9AM-6PM EST'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      details: 'San Francisco, CA',
      description: 'Schedule an in-person meeting'
    },
    {
      icon: Clock,
      title: 'Response Time',
      details: '< 2 hours',
      description: 'Average response time'
    }
  ];

  const supportOptions = [
    {
      icon: MessageSquare,
      title: 'Live Chat',
      description: 'Get instant help from our team',
      available: '24/7',
      badge: 'Fastest'
    },
    {
      icon: Headphones,
      title: 'Phone Support',
      description: 'Speak directly with our experts',
      available: 'Business Hours',
      badge: 'Personal'
    },
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Detailed help via email',
      available: '< 2 hours response',
      badge: 'Detailed'
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Connect with other coaches',
      available: 'Always Active',
      badge: 'Collaborative'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-24 px-6 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-float animation-delay-1000"></div>
        </div>
        
        <div className="container mx-auto text-center relative z-10">
          <div className={`max-w-4xl mx-auto transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <Badge className="mb-6 bg-primary/20 text-primary border-primary/30">
              <Star className="w-4 h-4 mr-2" />
              We're Here to Help
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-8 text-white leading-tight">
              Get in Touch
              <br />
              <span className="bg-gradient-to-r from-primary via-accent to-purple-400 bg-clip-text text-transparent">
                With Our Team
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/80 mb-12 leading-relaxed">
              Have questions about CoachFlow? Want to schedule a demo? Our team of experts is ready to help you succeed.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-20 px-6 -mt-10 relative z-10">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {contactInfo.map((info, index) => (
              <Card key={index} className="text-center p-6 hover:scale-105 transition-all duration-300 bg-white/90 backdrop-blur-sm shadow-xl">
                <CardContent className="p-0">
                  <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-primary to-accent rounded-xl flex items-center justify-center">
                    <info.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-foreground">{info.title}</h3>
                  <p className="text-primary font-semibold mb-1">{info.details}</p>
                  <p className="text-muted-foreground text-sm">{info.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold mb-6 text-foreground">Send us a Message</h2>
              <p className="text-muted-foreground mb-8">
                Fill out the form below and we'll get back to you within 2 hours during business hours.
              </p>
              
              <Card className="shadow-xl">
                <CardHeader>
                  <CardTitle>Contact Form</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Full Name *
                        </label>
                        <Input
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="John Doe"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Email Address *
                        </label>
                        <Input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="john@example.com"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Company/Practice Name
                      </label>
                      <Input
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        placeholder="Your Coaching Practice"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Subject *
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        required
                      >
                        <option value="general">General Inquiry</option>
                        <option value="demo">Schedule Demo</option>
                        <option value="support">Technical Support</option>
                        <option value="billing">Billing Question</option>
                        <option value="partnership">Partnership</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Message *
                      </label>
                      <Textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell us about your coaching practice and how we can help..."
                        rows={5}
                        required
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-primary to-purple-600 text-white hover:scale-105 transition-all duration-300"
                      size="lg"
                    >
                      Send Message
                      <Send className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Support Options */}
            <div>
              <h2 className="text-3xl font-bold mb-6 text-foreground">Other Ways to Reach Us</h2>
              <p className="text-muted-foreground mb-8">
                Choose the support channel that works best for you.
              </p>
              
              <div className="space-y-6">
                {supportOptions.map((option, index) => (
                  <Card key={index} className="hover:scale-105 hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-xl flex items-center justify-center flex-shrink-0">
                          <option.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="text-lg font-bold text-foreground">{option.title}</h3>
                            <Badge variant="secondary" className="text-xs">
                              {option.badge}
                            </Badge>
                          </div>
                          <p className="text-muted-foreground mb-2">{option.description}</p>
                          <p className="text-sm text-primary font-semibold">{option.available}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {/* Quick Stats */}
              <Card className="mt-8 bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-4 text-foreground">Why Coaches Love Our Support</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary mb-1">{"4.9/5"}</div>
                      <div className="text-sm text-muted-foreground">Support Rating</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary mb-1">{"< 2hrs"}</div>
                      <div className="text-sm text-muted-foreground">Response Time</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary mb-1">{"24/7"}</div>
                      <div className="text-sm text-muted-foreground">Chat Support</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary mb-1">{"98%"}</div>
                      <div className="text-sm text-muted-foreground">Resolution Rate</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-slate-50 to-purple-50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-foreground">Quick Answers</h2>
            <p className="text-xl text-muted-foreground">
              Common questions answered instantly.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <CardContent className="p-0">
                <h3 className="font-bold mb-2 text-foreground">How quickly can I get started?</h3>
                <p className="text-muted-foreground text-sm">Most coaches are up and running within 24 hours of signing up.</p>
              </CardContent>
            </Card>
            <Card className="p-6">
              <CardContent className="p-0">
                <h3 className="font-bold mb-2 text-foreground">Do you offer training?</h3>
                <p className="text-muted-foreground text-sm">Yes! Free onboarding and comprehensive training materials included.</p>
              </CardContent>
            </Card>
            <Card className="p-6">
              <CardContent className="p-0">
                <h3 className="font-bold mb-2 text-foreground">Can I cancel anytime?</h3>
                <p className="text-muted-foreground text-sm">Absolutely. No contracts, cancel with just one click.</p>
              </CardContent>
            </Card>
            <Card className="p-6">
              <CardContent className="p-0">
                <h3 className="font-bold mb-2 text-foreground">Is my data secure?</h3>
                <p className="text-muted-foreground text-sm">Bank-level security with SOC 2 compliance and 99.9% uptime.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;

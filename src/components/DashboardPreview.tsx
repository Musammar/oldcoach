import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, Area, AreaChart
} from 'recharts';
import { 
  TrendingUp, 
  Users, 
  Calendar, 
  MessageSquare, 
  DollarSign,
  Phone,
  Mail,
  Clock,
  Target,
  Zap,
  Bot,
  ArrowRight,
  Activity,
  Eye
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#a4de6c'];

const data = [
  { name: 'Leads', value: 2543 },
  { name: 'Conversion', value: 94 },
  { name: 'Revenue', value: 58500 },
  { name: 'Calls', value: 342 },
];

const DashboardPreview: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);
  const [animatedStats, setAnimatedStats] = useState({
    leads: 0,
    conversion: 0,
    revenue: 0,
    calls: 0
  });
  const sectionRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const monthlyData = [
    { month: 'Jan', leads: 120, bookings: 95, revenue: 28500 },
    { month: 'Feb', leads: 145, bookings: 118, revenue: 35400 },
    { month: 'Mar', leads: 168, bookings: 142, revenue: 42600 },
    { month: 'Apr', leads: 192, bookings: 156, revenue: 46800 },
    { month: 'May', leads: 215, bookings: 178, revenue: 53400 },
    { month: 'Jun', leads: 238, bookings: 195, revenue: 58500 }
  ];

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

  useEffect(() => {
    if (isVisible) {
      const animateNumbers = () => {
        const targets = { leads: 2543, conversion: 94, revenue: 58500, calls: 342 };
        const duration = 2000;
        const steps = 60;
        const increment = duration / steps;

        let current = { leads: 0, conversion: 0, revenue: 0, calls: 0 };
        const timer = setInterval(() => {
          current.leads = Math.min(current.leads + targets.leads / steps, targets.leads);
          current.conversion = Math.min(current.conversion + targets.conversion / steps, targets.conversion);
          current.revenue = Math.min(current.revenue + targets.revenue / steps, targets.revenue);
          current.calls = Math.min(current.calls + targets.calls / steps, targets.calls);
          
          setAnimatedStats({
            leads: Math.floor(current.leads),
            conversion: Math.floor(current.conversion),
            revenue: Math.floor(current.revenue),
            calls: Math.floor(current.calls)
          });

          if (current.leads >= targets.leads) {
            clearInterval(timer);
          }
        }, increment);
      };

      setTimeout(animateNumbers, 500);
    }
  }, [isVisible]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-white/20">
          <p className="font-semibold text-slate-800">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.dataKey === 'revenue' ? `$${entry.value.toLocaleString()}` : entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <section ref={sectionRef} className="py-16 sm:py-20 lg:py-32 px-4 lg:px-6 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 relative overflow-hidden">
      {/* Enhanced Background with better theme consistency */}
      <div className="absolute inset-0">
        <div className={`absolute top-20 right-10 w-64 sm:w-96 h-64 sm:h-96 bg-primary/10 rounded-full blur-3xl transition-all duration-2000 ${isVisible ? 'animate-pulse opacity-100' : 'opacity-0'}`}></div>
        <div className={`absolute bottom-20 left-10 w-56 sm:w-80 h-56 sm:h-80 bg-accent/8 rounded-full blur-3xl transition-all duration-2000 delay-500 ${isVisible ? 'animate-pulse opacity-100' : 'opacity-0'}`}></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      <div className="container mx-auto relative z-10">
        {/* Enhanced Header */}
        <div className={`text-center mb-12 sm:mb-16 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="inline-flex items-center space-x-2 bg-primary/10 backdrop-blur-sm text-primary px-4 sm:px-6 py-3 rounded-full text-sm font-medium mb-6 sm:mb-8">
            <Eye className="w-4 h-4" />
            <span>Live Dashboard Preview</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8 text-slate-900 leading-tight px-4">
            Real-Time Business
            <br />
            <span className="bg-gradient-to-r from-primary via-accent to-purple-400 bg-clip-text text-transparent">
              Intelligence
            </span>
          </h2>
          
          <p className="text-lg sm:text-xl text-slate-700 max-w-3xl mx-auto leading-relaxed mb-8 sm:mb-12 px-4">
            Watch your coaching business thrive with comprehensive analytics, automated insights, and actionable data that drives growth.
          </p>
        </div>

        {/* Interactive Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
          {[
            { icon: Users, label: "Active Leads", value: animatedStats.leads, color: "from-blue-500 to-blue-600", bgColor: "bg-blue-50" },
            { icon: TrendingUp, label: "Conversion Rate", value: `${animatedStats.conversion}%`, color: "from-green-500 to-green-600", bgColor: "bg-green-50" },
            { icon: DollarSign, label: "Monthly Revenue", value: `$${animatedStats.revenue.toLocaleString()}`, color: "from-purple-500 to-purple-600", bgColor: "bg-purple-50" },
            { icon: Phone, label: "Calls Handled", value: animatedStats.calls, color: "from-orange-500 to-orange-600", bgColor: "bg-orange-50" }
          ].map((stat, index) => (
            <Card 
              key={index}
              className={`border-0 bg-white/80 backdrop-blur-sm cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-xl group p-4 sm:p-6 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 100 + 200}ms` }}
              onMouseEnter={() => setHoveredStat(index)}
              onMouseLeave={() => setHoveredStat(null)}
            >
              <CardContent className="p-0">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-2 sm:p-3 rounded-xl bg-gradient-to-r ${stat.color} transform transition-all duration-300 ${
                    hoveredStat === index ? 'scale-110 rotate-3' : ''
                  }`}>
                    <stat.icon className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
                  </div>
                  <div className={`text-right transition-all duration-300 ${
                    hoveredStat === index ? 'translate-x-2' : ''
                  }`}>
                    <p className="text-lg sm:text-2xl font-bold text-slate-900">{stat.value}</p>
                    <p className="text-xs sm:text-sm text-slate-600 font-medium">{stat.label}</p>
                  </div>
                </div>
                <div className={`h-2 bg-slate-200 rounded-full overflow-hidden transition-all duration-500 ${
                  hoveredStat === index ? 'bg-slate-300' : ''
                }`}>
                  <div 
                    className={`h-full bg-gradient-to-r ${stat.color} transition-all duration-1000 delay-500`}
                    style={{ width: isVisible ? '85%' : '0%' }}
                  ></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Enhanced Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-12">
          {/* Revenue Growth Chart */}
          <Card className={`border-0 bg-white/90 backdrop-blur-sm shadow-xl transition-all duration-700 hover:shadow-2xl ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`} style={{ transitionDelay: '600ms' }}>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="flex items-center space-x-2 text-slate-900 text-lg sm:text-xl">
                <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                <span>Revenue Growth Trend</span>
              </CardTitle>
              <p className="text-sm text-slate-600">Monthly revenue progression with growth indicators</p>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={monthlyData}>
                  <defs>
                    <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.05}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                  <YAxis stroke="#64748b" fontSize={12} tickFormatter={(value) => `$${(value/1000).toFixed(0)}k`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#10b981" 
                    strokeWidth={3}
                    fill="url(#revenueGradient)"
                    dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: '#10b981', strokeWidth: 2 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Performance Metrics */}
          <Card className={`border-0 bg-white/90 backdrop-blur-sm shadow-xl transition-all duration-700 hover:shadow-2xl ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`} style={{ transitionDelay: '700ms' }}>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="flex items-center space-x-2 text-slate-900 text-lg sm:text-xl">
                <Bot className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
                <span>Automation Performance</span>
              </CardTitle>
              <p className="text-sm text-slate-600">AI-driven process efficiency metrics</p>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <div className="space-y-4 sm:space-y-6">
                {[
                  { name: 'Lead Qualification', value: 94, color: '#8b5cf6' },
                  { name: 'Appointment Scheduling', value: 88, color: '#06b6d4' },
                  { name: 'Follow-up Sequences', value: 92, color: '#10b981' },
                  { name: 'Client Onboarding', value: 97, color: '#f59e0b' }
                ].map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-slate-700">{item.name}</span>
                      <span className="text-sm font-bold text-slate-900">{item.value}%</span>
                    </div>
                    <div className="relative">
                      <Progress 
                        value={isVisible ? item.value : 0} 
                        className="h-2 sm:h-3"
                        style={{ 
                          backgroundColor: '#e2e8f0',
                          transition: 'all 1s ease-in-out',
                          transitionDelay: `${index * 200 + 800}ms`
                        }}
                      />
                      <div 
                        className="absolute top-0 left-0 h-2 sm:h-3 rounded-full transition-all duration-1000 ease-in-out"
                        style={{ 
                          backgroundColor: item.color,
                          width: isVisible ? `${item.value}%` : '0%',
                          transitionDelay: `${index * 200 + 800}ms`
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className={`text-center transition-all duration-1000 delay-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="bg-gradient-to-r from-white/60 to-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 hover:from-white/70 hover:to-white/90 transition-all duration-500 hover:scale-105 group border border-white/20 shadow-xl">
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
              Ready to Transform Your Business?
            </h3>
            <p className="text-slate-700 mb-6 sm:mb-8 text-base sm:text-lg">
              Get access to your own intelligent dashboard and start automating your success today.
            </p>
            <Button 
              className="px-8 sm:px-10 py-3 sm:py-4 bg-gradient-to-r from-primary to-purple-600 text-white text-base sm:text-lg rounded-full hover:scale-105 transition-all duration-300 group/btn shadow-xl"
              onClick={() => navigate('/contact')}
            >
              Get Demo
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 inline group-hover/btn:translate-x-1 transition-transform duration-300" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardPreview;
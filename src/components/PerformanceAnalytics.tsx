
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area, 
  ComposedChart, RadialBarChart, RadialBar, Legend
} from 'recharts';
import { 
  TrendingUp, Users, Calendar, MessageSquare, Phone, Target, 
  Activity, Zap, DollarSign, Clock, Award, Sparkles
} from 'lucide-react';

const PerformanceAnalytics: React.FC = () => {
  const [activeTab, setActiveTab] = useState('leads');

  // Enhanced sample data with more realistic business metrics
  const leadConversionData = [
    { month: 'Jan', totalLeads: 125, qualifiedLeads: 89, convertedLeads: 34, conversionRate: 27.2, revenue: 15400, avgResponseTime: 2.5 },
    { month: 'Feb', totalLeads: 168, qualifiedLeads: 142, convertedLeads: 52, conversionRate: 31.0, revenue: 23600, avgResponseTime: 2.1 },
    { month: 'Mar', totalLeads: 203, qualifiedLeads: 178, convertedLeads: 71, conversionRate: 35.0, revenue: 32100, avgResponseTime: 1.8 },
    { month: 'Apr', totalLeads: 189, qualifiedLeads: 161, convertedLeads: 68, conversionRate: 36.0, revenue: 30800, avgResponseTime: 1.9 },
    { month: 'May', totalLeads: 245, qualifiedLeads: 208, convertedLeads: 89, conversionRate: 36.3, revenue: 40300, avgResponseTime: 1.6 },
    { month: 'Jun', totalLeads: 298, qualifiedLeads: 251, convertedLeads: 107, conversionRate: 35.9, revenue: 48500, avgResponseTime: 1.4 }
  ];

  const callPerformanceData = [
    { time: '9AM', totalCalls: 18, answered: 16, booked: 12, avgDuration: 8.5, satisfaction: 92, followUpRate: 85 },
    { time: '10AM', totalCalls: 24, answered: 22, booked: 18, avgDuration: 9.2, satisfaction: 94, followUpRate: 88 },
    { time: '11AM', totalCalls: 32, answered: 29, booked: 24, avgDuration: 10.1, satisfaction: 96, followUpRate: 91 },
    { time: '12PM', totalCalls: 28, answered: 25, booked: 19, avgDuration: 8.8, satisfaction: 93, followUpRate: 87 },
    { time: '1PM', totalCalls: 22, answered: 20, booked: 15, avgDuration: 7.9, satisfaction: 89, followUpRate: 83 },
    { time: '2PM', totalCalls: 35, answered: 33, booked: 28, avgDuration: 11.3, satisfaction: 97, followUpRate: 94 },
    { time: '3PM', totalCalls: 26, answered: 24, booked: 20, avgDuration: 9.7, satisfaction: 95, followUpRate: 90 }
  ];

  const bookingAnalyticsData = [
    { day: 'Mon', scheduled: 14, completed: 12, noShows: 2, rescheduled: 1, revenue: 2400, clientSatisfaction: 94 },
    { day: 'Tue', scheduled: 18, completed: 16, noShows: 1, rescheduled: 1, revenue: 3200, clientSatisfaction: 96 },
    { day: 'Wed', scheduled: 22, completed: 20, noShows: 2, rescheduled: 0, revenue: 4000, clientSatisfaction: 93 },
    { day: 'Thu', scheduled: 16, completed: 14, noShows: 1, rescheduled: 1, revenue: 2800, clientSatisfaction: 95 },
    { day: 'Fri', scheduled: 25, completed: 23, noShows: 1, rescheduled: 1, revenue: 4600, clientSatisfaction: 97 },
    { day: 'Sat', scheduled: 12, completed: 11, noShows: 1, rescheduled: 0, revenue: 2200, clientSatisfaction: 92 },
    { day: 'Sun', scheduled: 8, completed: 7, noShows: 1, rescheduled: 0, revenue: 1400, clientSatisfaction: 91 }
  ];

  const activityBreakdownData = [
    { name: 'AI Voice Calls', value: 42, clients: 156, efficiency: 95, color: '#6366f1', interactions: 2340 },
    { name: 'WhatsApp Messages', value: 28, clients: 203, efficiency: 88, color: '#06b6d4', interactions: 1890 },
    { name: 'Email Sequences', value: 18, clients: 89, efficiency: 76, color: '#10b981', interactions: 892 },
    { name: 'SMS Follow-ups', value: 12, clients: 67, efficiency: 82, color: '#8b5cf6', interactions: 567 }
  ];

  const activityTrendData = [
    { month: 'Jan', aiCalls: 320, whatsapp: 280, email: 150, sms: 80 },
    { month: 'Feb', aiCalls: 420, whatsapp: 340, email: 180, sms: 95 },
    { month: 'Mar', aiCalls: 510, whatsapp: 390, email: 210, sms: 120 },
    { month: 'Apr', aiCalls: 485, whatsapp: 365, email: 195, sms: 110 },
    { month: 'May', aiCalls: 625, whatsapp: 445, email: 235, sms: 145 },
    { month: 'Jun', aiCalls: 720, whatsapp: 520, email: 275, sms: 165 }
  ];

  const revenueGrowthData = [
    { month: 'Jan', actualRevenue: 18500, projectedRevenue: 15000, newClients: 12, retention: 92, avgDealSize: 1540 },
    { month: 'Feb', actualRevenue: 24800, projectedRevenue: 20000, newClients: 18, retention: 94, avgDealSize: 1378 },
    { month: 'Mar', actualRevenue: 32100, projectedRevenue: 25000, newClients: 24, retention: 96, avgDealSize: 1338 },
    { month: 'Apr', actualRevenue: 28900, projectedRevenue: 28000, newClients: 21, retention: 93, avgDealSize: 1376 },
    { month: 'May', actualRevenue: 41200, projectedRevenue: 35000, newClients: 32, retention: 97, avgDealSize: 1288 },
    { month: 'Jun', actualRevenue: 52800, projectedRevenue: 42000, newClients: 38, retention: 98, avgDealSize: 1389 }
  ];

  const automationEfficiencyData = [
    { process: 'Lead Qualification', automated: 94, manual: 6, timeSaved: 48, accuracy: 96, cost_reduction: 68 },
    { process: 'Appointment Scheduling', automated: 97, manual: 3, timeSaved: 52, accuracy: 99, cost_reduction: 72 },
    { process: 'Follow-up Sequences', automated: 91, manual: 9, timeSaved: 44, accuracy: 93, cost_reduction: 65 },
    { process: 'Client Onboarding', automated: 88, manual: 12, timeSaved: 38, accuracy: 94, cost_reduction: 58 }
  ];

  const metrics = [
    {
      id: 'leads',
      title: 'Lead Generation',
      icon: Users,
      value: '1,847',
      change: '+34%',
      subValue: '298 this month',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      description: 'Total qualified leads generated with AI assistance'
    },
    {
      id: 'calls',
      title: 'AI Voice Calls',
      icon: Phone,
      value: '2,156',
      change: '+28%',
      subValue: '96% success rate',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      description: 'Automated calls handled with high conversion rates'
    },
    {
      id: 'bookings',
      title: 'Bookings',
      icon: Calendar,
      value: '892',
      change: '+42%',
      subValue: '93% completion',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      description: 'Appointments scheduled and successfully completed'
    },
    {
      id: 'activity',
      title: 'Activity Hub',
      icon: Activity,
      value: '4.2K',
      change: '+18%',
      subValue: '89% automated',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      description: 'Total client interactions across all channels'
    },
    {
      id: 'revenue',
      title: 'Revenue Growth',
      icon: DollarSign,
      value: '$52.8K',
      change: '+67%',
      subValue: '26% above target',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      description: 'Monthly revenue with consistent growth trajectory'
    },
    {
      id: 'automation',
      title: 'Automation Score',
      icon: Zap,
      value: '92.5%',
      change: '+12%',
      subValue: '46hrs saved/week',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      description: 'Process automation efficiency with time savings'
    }
  ];

  const getChartForTab = (tabId: string) => {
    switch (tabId) {
      case 'leads':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Side - Key Metrics */}
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <Users className="h-8 w-8 text-blue-600" />
                  <span className="text-2xl font-bold text-blue-700">35.9%</span>
                </div>
                <h3 className="font-semibold text-blue-900 mb-2">Conversion Rate</h3>
                <p className="text-sm text-blue-700">Average monthly conversion from leads to clients</p>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <DollarSign className="h-8 w-8 text-green-600" />
                  <span className="text-2xl font-bold text-green-700">$48.5K</span>
                </div>
                <h3 className="font-semibold text-green-900 mb-2">Revenue Generated</h3>
                <p className="text-sm text-green-700">Total revenue from converted leads this month</p>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <Target className="h-8 w-8 text-purple-600" />
                  <span className="text-2xl font-bold text-purple-700">1.6s</span>
                </div>
                <h3 className="font-semibold text-purple-900 mb-2">Avg Response Time</h3>
                <p className="text-sm text-purple-700">AI-powered instant lead qualification</p>
              </div>
            </div>

            {/* Right Side - Main Chart */}
            <div className="lg:col-span-2">
              <ResponsiveContainer width="100%" height={350}>
                <ComposedChart data={leadConversionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" stroke="#64748b" />
                  <YAxis yAxisId="left" stroke="#64748b" />
                  <YAxis yAxisId="right" orientation="right" stroke="#64748b" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e2e8f0',
                      borderRadius: '12px',
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                    }} 
                  />
                  <Legend />
                  <Bar yAxisId="left" dataKey="totalLeads" fill="#6366f1" name="Total Leads" radius={[4, 4, 0, 0]} />
                  <Bar yAxisId="left" dataKey="qualifiedLeads" fill="#06b6d4" name="Qualified" radius={[4, 4, 0, 0]} />
                  <Line yAxisId="right" type="monotone" dataKey="conversionRate" stroke="#10b981" strokeWidth={3} name="Conversion Rate %" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
        );
      
      case 'calls':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Side - Performance Metrics */}
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <Phone className="h-8 w-8 text-purple-600" />
                  <span className="text-2xl font-bold text-purple-700">94%</span>
                </div>
                <h3 className="font-semibold text-purple-900 mb-2">Answer Rate</h3>
                <p className="text-sm text-purple-700">Calls successfully connected and answered</p>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <Clock className="h-8 w-8 text-green-600" />
                  <span className="text-2xl font-bold text-green-700">9.4min</span>
                </div>
                <h3 className="font-semibold text-green-900 mb-2">Avg Call Duration</h3>
                <p className="text-sm text-green-700">Optimal engagement time for conversions</p>
              </div>
              
              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <Award className="h-8 w-8 text-yellow-600" />
                  <span className="text-2xl font-bold text-yellow-700">94%</span>
                </div>
                <h3 className="font-semibold text-yellow-900 mb-2">Satisfaction Score</h3>
                <p className="text-sm text-yellow-700">Client satisfaction with AI interactions</p>
              </div>
            </div>

            {/* Right Side - Call Performance Chart */}
            <div className="lg:col-span-2">
              <ResponsiveContainer width="100%" height={350}>
                <ComposedChart data={callPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="time" stroke="#64748b" />
                  <YAxis yAxisId="left" stroke="#64748b" />
                  <YAxis yAxisId="right" orientation="right" stroke="#64748b" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e2e8f0',
                      borderRadius: '12px',
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                    }} 
                  />
                  <Legend />
                  <Bar yAxisId="left" dataKey="totalCalls" fill="#8b5cf6" name="Total Calls" radius={[4, 4, 0, 0]} />
                  <Bar yAxisId="left" dataKey="booked" fill="#10b981" name="Bookings Made" radius={[4, 4, 0, 0]} />
                  <Line yAxisId="right" type="monotone" dataKey="satisfaction" stroke="#f59e0b" strokeWidth={3} name="Satisfaction %" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
        );
      
      case 'bookings':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Side - Booking Statistics */}
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 p-6 rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <Calendar className="h-8 w-8 text-cyan-600" />
                  <span className="text-2xl font-bold text-cyan-700">115</span>
                </div>
                <h3 className="font-semibold text-cyan-900 mb-2">Total Scheduled</h3>
                <p className="text-sm text-cyan-700">Appointments booked through AI system</p>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <Target className="h-8 w-8 text-green-600" />
                  <span className="text-2xl font-bold text-green-700">90%</span>
                </div>
                <h3 className="font-semibold text-green-900 mb-2">Completion Rate</h3>
                <p className="text-sm text-green-700">Successfully completed appointments</p>
              </div>
              
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <DollarSign className="h-8 w-8 text-orange-600" />
                  <span className="text-2xl font-bold text-orange-700">$2.8K</span>
                </div>
                <h3 className="font-semibold text-orange-900 mb-2">Avg Daily Revenue</h3>
                <p className="text-sm text-orange-700">Revenue generated from bookings</p>
              </div>
            </div>

            {/* Right Side - Booking Analytics Chart */}
            <div className="lg:col-span-2">
              <ResponsiveContainer width="100%" height={350}>
                <ComposedChart data={bookingAnalyticsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="day" stroke="#64748b" />
                  <YAxis yAxisId="left" stroke="#64748b" />
                  <YAxis yAxisId="right" orientation="right" stroke="#64748b" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e2e8f0',
                      borderRadius: '12px',
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                    }} 
                  />
                  <Legend />
                  <Bar yAxisId="left" dataKey="scheduled" fill="#06b6d4" name="Scheduled" radius={[4, 4, 0, 0]} />
                  <Bar yAxisId="left" dataKey="completed" fill="#10b981" name="Completed" radius={[4, 4, 0, 0]} />
                  <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#f59e0b" strokeWidth={3} name="Revenue ($)" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
        );
      
      case 'activity':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Side - Activity Metrics */}
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-6 rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <Activity className="h-8 w-8 text-indigo-600" />
                  <span className="text-2xl font-bold text-indigo-700">5.7K</span>
                </div>
                <h3 className="font-semibold text-indigo-900 mb-2">Total Interactions</h3>
                <p className="text-sm text-indigo-700">Cross-platform client engagements this month</p>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <Zap className="h-8 w-8 text-blue-600" />
                  <span className="text-2xl font-bold text-blue-700">89%</span>
                </div>
                <h3 className="font-semibold text-blue-900 mb-2">Automation Rate</h3>
                <p className="text-sm text-blue-700">Percentage of automated interactions</p>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <TrendingUp className="h-8 w-8 text-green-600" />
                  <span className="text-2xl font-bold text-green-700">91%</span>
                </div>
                <h3 className="font-semibold text-green-900 mb-2">Avg Efficiency</h3>
                <p className="text-sm text-green-700">Overall automation efficiency score</p>
              </div>

              {/* Activity Breakdown List */}
              <div className="space-y-3">
                {activityBreakdownData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-4 h-4 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <div>
                        <div className="font-semibold text-slate-700 text-sm">{item.name}</div>
                        <div className="text-xs text-slate-500">{item.clients} clients</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-slate-700">{item.value}%</div>
                      <div className="text-xs text-green-600">{item.efficiency}% efficient</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side - Activity Charts */}
            <div className="lg:col-span-2 space-y-6">
              {/* Pie Chart */}
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={activityBreakdownData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    innerRadius={40}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {activityBreakdownData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e2e8f0',
                      borderRadius: '12px',
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                    }} 
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>

              {/* Trend Chart */}
              <ResponsiveContainer width="100%" height={180}>
                <AreaChart data={activityTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e2e8f0',
                      borderRadius: '12px',
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                    }} 
                  />
                  <Legend />
                  <Area type="monotone" dataKey="aiCalls" stackId="1" stroke="#6366f1" fill="#6366f1" fillOpacity={0.6} name="AI Calls" />
                  <Area type="monotone" dataKey="whatsapp" stackId="1" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.6} name="WhatsApp" />
                  <Area type="monotone" dataKey="email" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.6} name="Email" />
                  <Area type="monotone" dataKey="sms" stackId="1" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} name="SMS" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        );
      
      case 'revenue':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Side - Revenue Metrics */}
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <DollarSign className="h-8 w-8 text-green-600" />
                  <span className="text-2xl font-bold text-green-700">$198.3K</span>
                </div>
                <h3 className="font-semibold text-green-900 mb-2">Total Revenue</h3>
                <p className="text-sm text-green-700">6-month cumulative revenue growth</p>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <Users className="h-8 w-8 text-blue-600" />
                  <span className="text-2xl font-bold text-blue-700">145</span>
                </div>
                <h3 className="font-semibold text-blue-900 mb-2">New Clients</h3>
                <p className="text-sm text-blue-700">Total new client acquisitions</p>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <Target className="h-8 w-8 text-purple-600" />
                  <span className="text-2xl font-bold text-purple-700">95%</span>
                </div>
                <h3 className="font-semibold text-purple-900 mb-2">Client Retention</h3>
                <p className="text-sm text-purple-700">Average monthly retention rate</p>
              </div>
              
              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <TrendingUp className="h-8 w-8 text-yellow-600" />
                  <span className="text-2xl font-bold text-yellow-700">+67%</span>
                </div>
                <h3 className="font-semibold text-yellow-900 mb-2">Growth Rate</h3>
                <p className="text-sm text-yellow-700">Month-over-month revenue growth</p>
              </div>
            </div>

            {/* Right Side - Revenue Growth Chart */}
            <div className="lg:col-span-2">
              <ResponsiveContainer width="100%" height={350}>
                <ComposedChart data={revenueGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" stroke="#64748b" />
                  <YAxis yAxisId="left" stroke="#64748b" />
                  <YAxis yAxisId="right" orientation="right" stroke="#64748b" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e2e8f0',
                      borderRadius: '12px',
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                    }} 
                  />
                  <Legend />
                  <Area yAxisId="left" type="monotone" dataKey="projectedRevenue" stackId="1" stroke="#94a3b8" fill="#94a3b8" fillOpacity={0.3} name="Projected" />
                  <Area yAxisId="left" type="monotone" dataKey="actualRevenue" stackId="2" stroke="#10b981" fill="#10b981" fillOpacity={0.6} name="Actual Revenue" />
                  <Line yAxisId="right" type="monotone" dataKey="retention" stroke="#6366f1" strokeWidth={3} name="Retention %" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
        );
      
      case 'automation':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Side - Automation Metrics */}
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-6 rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <Zap className="h-8 w-8 text-indigo-600" />
                  <span className="text-2xl font-bold text-indigo-700">92.5%</span>
                </div>
                <h3 className="font-semibold text-indigo-900 mb-2">Overall Automation</h3>
                <p className="text-sm text-indigo-700">Average automation across all processes</p>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <Clock className="h-8 w-8 text-green-600" />
                  <span className="text-2xl font-bold text-green-700">182hrs</span>
                </div>
                <h3 className="font-semibold text-green-900 mb-2">Time Saved</h3>
                <p className="text-sm text-green-700">Monthly time savings from automation</p>
              </div>
              
              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <Target className="h-8 w-8 text-yellow-600" />
                  <span className="text-2xl font-bold text-yellow-700">95.5%</span>
                </div>
                <h3 className="font-semibold text-yellow-900 mb-2">Accuracy Rate</h3>
                <p className="text-sm text-yellow-700">Average accuracy across automated processes</p>
              </div>
              
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <DollarSign className="h-8 w-8 text-orange-600" />
                  <span className="text-2xl font-bold text-orange-700">65.8%</span>
                </div>
                <h3 className="font-semibold text-orange-900 mb-2">Cost Reduction</h3>
                <p className="text-sm text-orange-700">Average cost reduction from automation</p>
              </div>
            </div>

            {/* Right Side - Automation Efficiency Chart */}
            <div className="lg:col-span-2">
              <ResponsiveContainer width="100%" height={350}>
                <ComposedChart data={automationEfficiencyData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis type="number" stroke="#64748b" />
                  <YAxis dataKey="process" type="category" width={150} stroke="#64748b" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e2e8f0',
                      borderRadius: '12px',
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                    }} 
                  />
                  <Legend />
                  <Bar dataKey="automated" fill="#6366f1" name="Automated %" radius={[0, 4, 4, 0]} />
                  <Bar dataKey="timeSaved" fill="#10b981" name="Time Saved (hrs/week)" radius={[0, 4, 4, 0]} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-6 py-3 rounded-full text-sm font-medium mb-6">
            <Activity className="w-4 h-4" />
            <span>Real-Time Performance</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Track Your <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Success Metrics</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Monitor your coaching business performance with real-time analytics and insights that drive exponential growth.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-6 mb-8 bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-xl p-2 gap-2 min-h-[100px]">
            {metrics.map((metric) => (
              <TabsTrigger 
                key={metric.id} 
                value={metric.id}
                className="flex flex-col items-center justify-center space-y-2 p-4 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white transition-all duration-300 h-20 text-center"
              >
                <metric.icon className="h-5 w-5" />
                <span className="text-xs font-medium leading-tight">{metric.title}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {metrics.map((metric) => (
            <TabsContent key={metric.id} value={metric.id} className="space-y-6 mt-8">
              {/* Enhanced Metric Summary Card */}
              <Card className="bg-white/90 backdrop-blur-sm border-slate-200/50 shadow-lg mb-6">
                <CardHeader className="text-center pb-4">
                  <div className="flex items-center justify-center space-x-4 mb-4">
                    <div className={`p-4 rounded-xl ${metric.bgColor}`}>
                      <metric.icon className={`h-8 w-8 ${metric.color}`} />
                    </div>
                    <div>
                      <CardTitle className="text-3xl font-bold text-slate-900">{metric.value}</CardTitle>
                      <div className="flex items-center space-x-2 mt-2">
                        <span className="text-green-600 font-semibold">{metric.change}</span>
                        <span className="text-slate-500 text-sm">{metric.subValue}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-slate-600 leading-relaxed max-w-md mx-auto">{metric.description}</p>
                </CardHeader>
              </Card>

              {/* Enhanced Chart Section */}
              <Card className="bg-white/90 backdrop-blur-sm border-slate-200/50 shadow-lg">
                <CardHeader className="border-b border-slate-100">
                  <CardTitle className="text-xl font-semibold text-slate-900 flex items-center space-x-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    <span>{metric.title} Analytics Dashboard</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  {getChartForTab(metric.id)}
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default PerformanceAnalytics;

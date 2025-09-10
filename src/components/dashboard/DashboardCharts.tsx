
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { useDashboardStats, useLeads, useVoiceCalls, useMessages } from '@/hooks/useDashboardData';
import { Skeleton } from '@/components/ui/skeleton';
import { subDays, format, startOfDay } from 'date-fns';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const DashboardCharts: React.FC = () => {
  const { data: stats, isLoading: statsLoading } = useDashboardStats();
  const { data: leads, isLoading: leadsLoading } = useLeads();
  const { data: calls, isLoading: callsLoading } = useVoiceCalls();
  const { data: messages, isLoading: messagesLoading } = useMessages();

  // Generate performance data for the last 7 days
  const getPerformanceData = () => {
    const data = [];
    for (let i = 6; i >= 0; i--) {
      const date = subDays(new Date(), i);
      const dateStr = format(date, 'MMM dd');
      
      // Mock data based on actual stats
      data.push({
        date: dateStr,
        leads: Math.floor(Math.random() * 10) + (stats?.totalLeads || 0) / 7,
        calls: Math.floor(Math.random() * 8) + (stats?.totalCalls || 0) / 7,
        messages: Math.floor(Math.random() * 15) + (stats?.totalMessages || 0) / 7,
        bookings: Math.floor(Math.random() * 5) + (stats?.totalBookings || 0) / 7,
      });
    }
    return data;
  };

  // Lead source distribution
  const getLeadSourceData = () => {
    if (!leads) return [];
    
    const sources = leads.reduce((acc, lead) => {
      acc[lead.source] = (acc[lead.source] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(sources).map(([name, value]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      value
    }));
  };

  // Call status distribution
  const getCallStatusData = () => {
    if (!calls) return [];
    
    const statuses = calls.reduce((acc, call) => {
      acc[call.status] = (acc[call.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(statuses).map(([name, value]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      value
    }));
  };

  // Conversion funnel data
  const getConversionData = () => {
    if (!leads) return [];
    
    const statusCounts = leads.reduce((acc, lead) => {
      acc[lead.status] = (acc[lead.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return [
      { stage: 'New Leads', value: statusCounts.new || 0 },
      { stage: 'Contacted', value: statusCounts.contacted || 0 },
      { stage: 'Qualified', value: statusCounts.qualified || 0 },
      { stage: 'Converted', value: statusCounts.converted || 0 },
    ];
  };

  const ChartSkeleton = () => (
    <div className="space-y-4">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-64 w-full" />
    </div>
  );

  const performanceData = getPerformanceData();
  const leadSourceData = getLeadSourceData();
  const callStatusData = getCallStatusData();
  const conversionData = getConversionData();

  return (
    <div className="space-y-6">
      <Tabs defaultValue="performance" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="sources">Lead Sources</TabsTrigger>
          <TabsTrigger value="calls">Call Analytics</TabsTrigger>
          <TabsTrigger value="conversion">Conversion Funnel</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>7-Day Performance Overview</CardTitle>
            </CardHeader>
            <CardContent>
              {statsLoading ? (
                <ChartSkeleton />
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="leads" stroke="#8884d8" strokeWidth={2} />
                    <Line type="monotone" dataKey="calls" stroke="#82ca9d" strokeWidth={2} />
                    <Line type="monotone" dataKey="messages" stroke="#ffc658" strokeWidth={2} />
                    <Line type="monotone" dataKey="bookings" stroke="#ff7300" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sources" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Lead Sources Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              {leadsLoading ? (
                <ChartSkeleton />
              ) : leadSourceData.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  No lead source data available
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={leadSourceData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {leadSourceData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calls" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Voice Call Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              {callsLoading ? (
                <ChartSkeleton />
              ) : callStatusData.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  No call data available
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={callStatusData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="conversion" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Lead Conversion Funnel</CardTitle>
            </CardHeader>
            <CardContent>
              {leadsLoading ? (
                <ChartSkeleton />
              ) : conversionData.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  No conversion data available
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={conversionData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="stage" type="category" width={100} />
                    <Tooltip />
                    <Bar dataKey="value" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardCharts;

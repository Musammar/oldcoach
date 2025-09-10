
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useDashboardStats, useLeads, useBookings, useVoiceCalls, useMessages, useCreateMessage } from '@/hooks/useDashboardData';
import AddLeadDialog from './AddLeadDialog';
import AddBookingDialog from './AddBookingDialog';
import { 
  Users, 
  Calendar, 
  Phone, 
  MessageSquare, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight,
  Plus,
  Send,
  Settings,
  BarChart3,
  Target,
  Mail
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const DashboardOverview = () => {
  const [leadDialogOpen, setLeadDialogOpen] = useState(false);
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);
  const navigate = useNavigate();
  
  const { data: stats, isLoading: statsLoading } = useDashboardStats();
  const { data: leads, refetch: refetchLeads } = useLeads();
  const { data: bookings, refetch: refetchBookings } = useBookings();
  const { data: calls } = useVoiceCalls();
  const { data: messages } = useMessages();
  const createMessage = useCreateMessage();

  const handleSendMessage = async () => {
    try {
      await createMessage.mutateAsync({
        platform: 'website',
        message_type: 'outgoing',
        content: 'Hello! This is a test message from the dashboard.',
        response_time_seconds: 0,
        is_automated: false
      });
      toast.success('Message sent successfully!');
    } catch (error) {
      toast.error('Failed to send message');
      console.error(error);
    }
  };

  const handleLeadAdded = async () => {
    await refetchLeads();
    setLeadDialogOpen(false);
  };

  const handleBookingAdded = async () => {
    await refetchBookings();
    setBookingDialogOpen(false);
  };

  const statsCards = [
    {
      title: 'Total Leads',
      value: stats?.totalLeads || 0,
      icon: Users,
      color: 'bg-blue-50 text-blue-600 border-blue-200',
      change: leads?.length ? `+${Math.round((leads.length / 30) * 100)}% this month` : 'No data yet',
      changeType: 'positive' as const
    },
    {
      title: 'Bookings',
      value: stats?.totalBookings || 0,
      icon: Calendar,
      color: 'bg-green-50 text-green-600 border-green-200',
      change: bookings?.length ? `${bookings.filter(b => b.status === 'scheduled').length} scheduled` : 'No bookings yet',
      changeType: 'neutral' as const
    },
    {
      title: 'Voice Calls',
      value: stats?.totalCalls || 0,
      icon: Phone,
      color: 'bg-purple-50 text-purple-600 border-purple-200',
      change: calls?.length ? `${Math.round(stats?.avgCallDuration || 0)}s avg duration` : 'No calls yet',
      changeType: 'neutral' as const
    },
    {
      title: 'Messages',
      value: stats?.totalMessages || 0,
      icon: MessageSquare,
      color: 'bg-orange-50 text-orange-600 border-orange-200',
      change: messages?.length ? `${Math.round((stats?.responseRate || 0))}% response rate` : 'No messages yet',
      changeType: 'positive' as const
    }
  ];

  if (statsLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-20 bg-gray-200 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => (
          <Card key={index} className={`transition-all hover:shadow-lg ${stat.color}`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium opacity-80">{stat.title}</p>
                  <p className="text-3xl font-bold mt-2">{stat.value}</p>
                  <p className={`text-sm mt-2 ${
                    stat.changeType === 'positive' 
                      ? 'text-green-600' 
                      : stat.changeType === 'neutral'
                        ? 'text-muted-foreground'
                        : 'text-red-600'
                  }`}>
                    {stat.change}
                  </p>
                </div>
                <div className="p-3 bg-white/80 rounded-full">
                  <stat.icon className="h-8 w-8" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="h-5 w-5 mr-2" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <Button 
              onClick={() => setLeadDialogOpen(true)}
              className="h-20 flex flex-col items-center justify-center space-y-2"
            >
              <Plus className="h-6 w-6" />
              <span>Add Lead</span>
            </Button>
            
            <Button 
              onClick={() => setBookingDialogOpen(true)}
              variant="outline"
              className="h-20 flex flex-col items-center justify-center space-y-2"
            >
              <Calendar className="h-6 w-6" />
              <span>Schedule Booking</span>
            </Button>
            
            <Button 
              onClick={handleSendMessage}
              variant="outline"
              className="h-20 flex flex-col items-center justify-center space-y-2"
              disabled={createMessage.isPending}
            >
              <Send className="h-6 w-6" />
              <span>{createMessage.isPending ? 'Sending...' : 'Send Message'}</span>
            </Button>
            
            <Button 
              onClick={() => navigate('/email-automation')}
              variant="outline"
              className="h-20 flex flex-col items-center justify-center space-y-2"
            >
              <Mail className="h-6 w-6" />
              <span>Email Automation</span>
            </Button>
            
            <Button 
              variant="outline"
              className="h-20 flex flex-col items-center justify-center space-y-2"
            >
              <BarChart3 className="h-6 w-6" />
              <span>View Analytics</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Recent Leads
              </div>
              <Button size="sm" variant="outline">View All</Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {leads && leads.length > 0 ? (
              <div className="space-y-4">
                {leads.slice(0, 3).map((lead) => (
                  <div key={lead.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{lead.name}</p>
                      <p className="text-sm text-muted-foreground">{lead.email}</p>
                    </div>
                    <Badge variant={lead.temperature === 'hot' ? 'destructive' : lead.temperature === 'warm' ? 'default' : 'secondary'}>
                      {lead.temperature}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">No leads yet</p>
                <Button onClick={() => setLeadDialogOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Lead
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Upcoming Bookings
              </div>
              <Button size="sm" variant="outline">View Calendar</Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {bookings && bookings.length > 0 ? (
              <div className="space-y-4">
                {bookings.filter(b => b.status === 'scheduled').slice(0, 3).map((booking) => (
                  <div key={booking.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{booking.client_name || 'Unknown Client'}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(booking.scheduled_at).toLocaleDateString()} at {new Date(booking.scheduled_at).toLocaleTimeString()}
                      </p>
                    </div>
                    <Badge>{booking.booking_type}</Badge>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">No bookings scheduled</p>
                <Button onClick={() => setBookingDialogOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Schedule Your First Booking
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Performance Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="h-5 w-5 mr-2" />
            Performance Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Lead Conversion</span>
                <span className="text-sm text-muted-foreground">{stats?.conversionRate || 0}%</span>
              </div>
              <Progress value={stats?.conversionRate || 0} className="h-3" />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Response Rate</span>
                <span className="text-sm text-muted-foreground">{stats?.responseRate || 0}%</span>
              </div>
              <Progress value={stats?.responseRate || 0} className="h-3" />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Active Workflows</span>
                <span className="text-sm text-muted-foreground">{stats?.activeWorkflows || 0}</span>
              </div>
              <Progress value={stats?.activeWorkflows ? (stats.activeWorkflows / 10) * 100 : 0} className="h-3" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dialogs */}
      <AddLeadDialog 
        open={leadDialogOpen} 
        onOpenChange={setLeadDialogOpen} 
        onLeadAdded={handleLeadAdded} 
      />
      <AddBookingDialog 
        open={bookingDialogOpen} 
        onOpenChange={setBookingDialogOpen} 
        onBookingAdded={handleBookingAdded} 
      />
    </div>
  );
};

export default DashboardOverview;

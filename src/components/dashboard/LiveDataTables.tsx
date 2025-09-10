
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useLeads, useVoiceCalls, useMessages, useBookings } from '@/hooks/useDashboardData';
import { Skeleton } from '@/components/ui/skeleton';
import { formatDistanceToNow } from 'date-fns';

const LiveDataTables: React.FC = () => {
  const { data: leads, isLoading: leadsLoading } = useLeads();
  const { data: calls, isLoading: callsLoading } = useVoiceCalls();
  const { data: messages, isLoading: messagesLoading } = useMessages();
  const { data: bookings, isLoading: bookingsLoading } = useBookings();

  const getStatusBadgeVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case 'new':
      case 'scheduled':
        return 'default';
      case 'contacted':
      case 'completed':
        return 'secondary';
      case 'qualified':
      case 'resolved':
        return 'default';
      case 'converted':
        return 'default';
      case 'hot':
        return 'destructive';
      case 'warm':
        return 'secondary';
      case 'cold':
        return 'outline';
      default:
        return 'outline';
    }
  };

  const TableSkeleton = () => (
    <div className="space-y-2">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex space-x-4">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-16" />
        </div>
      ))}
    </div>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Live Data Tables</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="leads" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="leads">Leads ({leads?.length || 0})</TabsTrigger>
            <TabsTrigger value="calls">Voice Calls ({calls?.length || 0})</TabsTrigger>
            <TabsTrigger value="messages">Messages ({messages?.length || 0})</TabsTrigger>
            <TabsTrigger value="bookings">Bookings ({bookings?.length || 0})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="leads" className="mt-6">
            {leadsLoading ? (
              <TableSkeleton />
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Temperature</TableHead>
                    <TableHead>Created</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leads?.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center text-muted-foreground">
                        No leads data available
                      </TableCell>
                    </TableRow>
                  ) : (
                    leads?.map((lead) => (
                      <TableRow key={lead.id}>
                        <TableCell className="font-medium">{lead.name}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{lead.source}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getStatusBadgeVariant(lead.status)}>{lead.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getStatusBadgeVariant(lead.temperature)}>{lead.temperature}</Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {formatDistanceToNow(new Date(lead.created_at), { addSuffix: true })}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            )}
          </TabsContent>

          <TabsContent value="calls" className="mt-6">
            {callsLoading ? (
              <TableSkeleton />
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Phone</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Resolution</TableHead>
                    <TableHead>Created</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {calls?.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center text-muted-foreground">
                        No voice calls data available
                      </TableCell>
                    </TableRow>
                  ) : (
                    calls?.map((call) => (
                      <TableRow key={call.id}>
                        <TableCell className="font-medium">{call.caller_phone || 'Unknown'}</TableCell>
                        <TableCell>{Math.floor(call.duration_seconds / 60)}m {call.duration_seconds % 60}s</TableCell>
                        <TableCell>
                          <Badge variant={getStatusBadgeVariant(call.status)}>{call.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getStatusBadgeVariant(call.resolution_status)}>{call.resolution_status}</Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {formatDistanceToNow(new Date(call.created_at), { addSuffix: true })}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            )}
          </TabsContent>

          <TabsContent value="messages" className="mt-6">
            {messagesLoading ? (
              <TableSkeleton />
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Platform</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Content</TableHead>
                    <TableHead>Automated</TableHead>
                    <TableHead>Created</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {messages?.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center text-muted-foreground">
                        No messages data available
                      </TableCell>
                    </TableRow>
                  ) : (
                    messages?.map((message) => (
                      <TableRow key={message.id}>
                        <TableCell>
                          <Badge variant="outline">{message.platform}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={message.message_type === 'incoming' ? 'default' : 'secondary'}>
                            {message.message_type}
                          </Badge>
                        </TableCell>
                        <TableCell className="max-w-xs truncate">{message.content}</TableCell>
                        <TableCell>
                          <Badge variant={message.is_automated ? 'default' : 'outline'}>
                            {message.is_automated ? 'Auto' : 'Manual'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {formatDistanceToNow(new Date(message.created_at), { addSuffix: true })}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            )}
          </TabsContent>

          <TabsContent value="bookings" className="mt-6">
            {bookingsLoading ? (
              <TableSkeleton />
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Scheduled</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bookings?.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center text-muted-foreground">
                        No bookings data available
                      </TableCell>
                    </TableRow>
                  ) : (
                    bookings?.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell>
                          <Badge variant="outline">{booking.booking_type}</Badge>
                        </TableCell>
                        <TableCell className="text-sm">
                          {new Date(booking.scheduled_at).toLocaleDateString()} at{' '}
                          {new Date(booking.scheduled_at).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </TableCell>
                        <TableCell>{booking.duration_minutes}m</TableCell>
                        <TableCell>
                          <Badge variant={getStatusBadgeVariant(booking.status)}>{booking.status}</Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {formatDistanceToNow(new Date(booking.created_at), { addSuffix: true })}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default LiveDataTables;

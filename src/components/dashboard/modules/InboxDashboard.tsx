
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useMessages, useCreateMessage } from '@/hooks/useDashboardData';
import { MessageSquare, Mail, Send, Bot, Settings, Phone, MessageCircle, Smartphone, Plus } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { toast } from 'sonner';

const InboxDashboard = () => {
  const { data: messages, isLoading, refetch } = useMessages();
  const createMessage = useCreateMessage();
  const [autoReplyOpen, setAutoReplyOpen] = useState(false);
  const [newMessageOpen, setNewMessageOpen] = useState(false);
  const [messageForm, setMessageForm] = useState({
    platform: 'whatsapp',
    content: ''
  });

  const incomingMessages = messages?.filter(msg => msg.message_type === 'incoming').length || 0;
  const outgoingMessages = messages?.filter(msg => msg.message_type === 'outgoing').length || 0;
  const automatedMessages = messages?.filter(msg => msg.is_automated).length || 0;
  const whatsappMessages = messages?.filter(msg => msg.platform === 'whatsapp').length || 0;
  const emailMessages = messages?.filter(msg => msg.platform === 'email').length || 0;
  const websiteMessages = messages?.filter(msg => msg.platform === 'website').length || 0;

  const recentIncoming = messages?.filter(msg => msg.message_type === 'incoming').slice(0, 3) || [];
  const automationRate = messages?.length ? Math.round((automatedMessages / messages.length) * 100) : 0;

  const handleSendMessage = async () => {
    if (!messageForm.content.trim()) {
      toast.error('Please enter a message');
      return;
    }

    try {
      await createMessage.mutateAsync({
        platform: messageForm.platform,
        message_type: 'outgoing',
        content: messageForm.content,
        response_time_seconds: 0,
        is_automated: false
      });
      
      toast.success('Message sent successfully!');
      setMessageForm({ platform: 'whatsapp', content: '' });
      setNewMessageOpen(false);
      refetch();
    } catch (error) {
      toast.error('Failed to send message');
      console.error(error);
    }
  };

  const handleAutoReplySetup = () => {
    toast.success('Auto-reply settings saved!');
    setAutoReplyOpen(false);
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'whatsapp':
        return <MessageCircle className="h-5 w-5 text-green-600" />;
      case 'email':
        return <Mail className="h-5 w-5 text-blue-600" />;
      case 'website':
        return <MessageSquare className="h-5 w-5 text-purple-600" />;
      case 'sms':
        return <Smartphone className="h-5 w-5 text-orange-600" />;
      default:
        return <MessageSquare className="h-5 w-5" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Inbox Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Message Inbox</h2>
            <p className="opacity-90">Manage all your customer communications across platforms</p>
          </div>
          <div className="flex space-x-2">
            <Dialog open={autoReplyOpen} onOpenChange={setAutoReplyOpen}>
              <DialogTrigger asChild>
                <Button className="bg-white text-emerald-600 hover:bg-gray-100">
                  <Settings className="h-4 w-4 mr-2" />
                  Auto-Reply
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Configure Auto-Reply</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Auto-Reply Message</Label>
                    <Textarea 
                      placeholder="Thank you for your message. We'll get back to you soon!"
                      rows={3}
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setAutoReplyOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAutoReplySetup}>
                      Save Settings
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            
            <Dialog open={newMessageOpen} onOpenChange={setNewMessageOpen}>
              <DialogTrigger asChild>
                <Button className="bg-white text-emerald-600 hover:bg-gray-100">
                  <Send className="h-4 w-4 mr-2" />
                  New Message
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Send New Message</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Platform</Label>
                    <select 
                      className="w-full p-2 border rounded"
                      value={messageForm.platform}
                      onChange={(e) => setMessageForm(prev => ({ ...prev, platform: e.target.value }))}
                    >
                      <option value="whatsapp">WhatsApp</option>
                      <option value="email">Email</option>
                      <option value="website">Website</option>
                      <option value="sms">SMS</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label>Message</Label>
                    <Textarea 
                      placeholder="Enter your message..."
                      value={messageForm.content}
                      onChange={(e) => setMessageForm(prev => ({ ...prev, content: e.target.value }))}
                      rows={4}
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setNewMessageOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleSendMessage} disabled={createMessage.isPending}>
                      {createMessage.isPending ? 'Sending...' : 'Send Message'}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      {/* Message Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-emerald-600">Total Messages</p>
                <p className="text-3xl font-bold text-emerald-800">{messages?.length || 0}</p>
              </div>
              <MessageSquare className="h-12 w-12 text-emerald-600 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Incoming</p>
                <p className="text-3xl font-bold text-blue-800">{incomingMessages}</p>
              </div>
              <Mail className="h-12 w-12 text-blue-600 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">Outgoing</p>
                <p className="text-3xl font-bold text-purple-800">{outgoingMessages}</p>
              </div>
              <Send className="h-12 w-12 text-purple-600 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600">Automated</p>
                <p className="text-3xl font-bold text-orange-800">{automatedMessages}</p>
              </div>
              <Bot className="h-12 w-12 text-orange-600 opacity-80" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Platform Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MessageSquare className="h-5 w-5 mr-2" />
            Message Platforms
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center space-x-2">
                  <MessageCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium">WhatsApp ({whatsappMessages})</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {messages?.length ? Math.round((whatsappMessages / messages.length) * 100) : 0}%
                </span>
              </div>
              <Progress value={messages?.length ? (whatsappMessages / messages.length) * 100 : 0} className="h-3" />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium">Email ({emailMessages})</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {messages?.length ? Math.round((emailMessages / messages.length) * 100) : 0}%
                </span>
              </div>
              <Progress value={messages?.length ? (emailMessages / messages.length) * 100 : 0} className="h-3" />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center space-x-2">
                  <MessageSquare className="h-4 w-4 text-purple-600" />
                  <span className="text-sm font-medium">Website ({websiteMessages})</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {messages?.length ? Math.round((websiteMessages / messages.length) * 100) : 0}%
                </span>
              </div>
              <Progress value={messages?.length ? (websiteMessages / messages.length) * 100 : 0} className="h-3" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Incoming Messages */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Mail className="h-5 w-5 mr-2" />
              Recent Incoming Messages
            </div>
            <Button size="sm" variant="outline" onClick={() => setNewMessageOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Send Message
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-16 bg-gray-200 rounded-lg"></div>
                </div>
              ))}
            </div>
          ) : recentIncoming.length === 0 ? (
            <div className="text-center py-8">
              <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">No recent incoming messages</p>
              <Button onClick={() => setNewMessageOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Send Your First Message
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {recentIncoming.map((message) => (
                <div key={message.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      {getPlatformIcon(message.platform)}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <Badge variant="outline" className="capitalize">{message.platform}</Badge>
                        <Badge variant="default">
                          {message.message_type}
                        </Badge>
                        {message.is_automated && (
                          <Badge variant="secondary">Auto-Reply</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground truncate max-w-md">
                        {message.content}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(message.created_at), { addSuffix: true })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Automation Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bot className="h-5 w-5 mr-2" />
            Automation Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Automation Rate</span>
                <span className="text-sm font-bold text-orange-600">{automationRate}%</span>
              </div>
              <Progress value={automationRate} className="h-3" />
              <p className="text-xs text-muted-foreground mt-2">
                {automatedMessages} out of {messages?.length || 0} messages handled automatically
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-sm font-medium text-green-600">Avg Response Time</p>
                <p className="text-2xl font-bold text-green-800">
                  {messages?.length ? Math.round(
                    messages.filter(m => m.response_time_seconds).reduce((sum, m) => sum + (m.response_time_seconds || 0), 0) 
                    / messages.filter(m => m.response_time_seconds).length / 60
                  ) : 0}m
                </p>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm font-medium text-blue-600">Active Platforms</p>
                <p className="text-2xl font-bold text-blue-800">
                  {[...new Set(messages?.map(m => m.platform))].length || 0}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InboxDashboard;

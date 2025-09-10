
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useVoiceCalls, useDashboardStats } from '@/hooks/useDashboardData';
import { Phone, PhoneCall, Clock, Activity, Play, Settings, Mic, Volume2, Plus } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import AddBookingDialog from '../AddBookingDialog';
import { toast } from 'sonner';

const VoiceAgentDashboard = () => {
  const { data: calls, isLoading } = useVoiceCalls();
  const { data: stats } = useDashboardStats();
  const [configOpen, setConfigOpen] = useState(false);
  const [voiceSettings, setVoiceSettings] = useState({
    model: 'professional-female',
    responseSpeed: 'fast',
    personality: 'friendly-professional'
  });

  const completedCalls = calls?.filter(call => call.status === 'completed').length || 0;
  const failedCalls = calls?.filter(call => call.status === 'failed').length || 0;
  const inProgressCalls = calls?.filter(call => call.status === 'in_progress').length || 0;
  const averageDuration = calls?.length ? 
    Math.round(calls.reduce((sum, call) => sum + call.duration_seconds, 0) / calls.length / 60) : 0;

  const handleConfigurationSave = () => {
    toast.success('Voice agent configuration updated!');
    setConfigOpen(false);
  };

  const handleTestAgent = () => {
    toast.success('Voice agent test initiated - check your phone!');
  };

  return (
    <div className="space-y-6">
      {/* Voice Agent Header */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">AI Voice Agent</h2>
            <p className="opacity-90">Monitor and configure your AI-powered voice interactions</p>
          </div>
          <div className="flex space-x-2">
            <AddBookingDialog>
              <Button className="bg-white text-blue-600 hover:bg-gray-100">
                <Plus className="h-4 w-4 mr-2" />
                Schedule Call
              </Button>
            </AddBookingDialog>
            <Dialog open={configOpen} onOpenChange={setConfigOpen}>
              <DialogTrigger asChild>
                <Button className="bg-white text-blue-600 hover:bg-gray-100">
                  <Settings className="h-4 w-4 mr-2" />
                  Configure Agent
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Voice Agent Configuration</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Voice Model</Label>
                    <Select value={voiceSettings.model} onValueChange={(value) => setVoiceSettings(prev => ({ ...prev, model: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="professional-female">Professional Female</SelectItem>
                        <SelectItem value="professional-male">Professional Male</SelectItem>
                        <SelectItem value="casual-female">Casual Female</SelectItem>
                        <SelectItem value="casual-male">Casual Male</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Response Speed</Label>
                    <Select value={voiceSettings.responseSpeed} onValueChange={(value) => setVoiceSettings(prev => ({ ...prev, responseSpeed: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fast">Fast (0.8s)</SelectItem>
                        <SelectItem value="normal">Normal (1.2s)</SelectItem>
                        <SelectItem value="slow">Slow (1.8s)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>AI Personality</Label>
                    <Select value={voiceSettings.personality} onValueChange={(value) => setVoiceSettings(prev => ({ ...prev, personality: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="friendly-professional">Friendly & Professional</SelectItem>
                        <SelectItem value="formal-business">Formal Business</SelectItem>
                        <SelectItem value="casual-conversational">Casual Conversational</SelectItem>
                        <SelectItem value="empathetic-coach">Empathetic Coach</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setConfigOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleConfigurationSave}>
                      Save Configuration
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <Button 
              className="bg-white text-blue-600 hover:bg-gray-100"
              onClick={handleTestAgent}
            >
              <Play className="h-4 w-4 mr-2" />
              Test Agent
            </Button>
          </div>
        </div>
      </div>

      {/* Voice Agent Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Total Calls</p>
                <p className="text-3xl font-bold text-blue-800">{stats?.totalCalls || 0}</p>
              </div>
              <Phone className="h-12 w-12 text-blue-600 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Completed</p>
                <p className="text-3xl font-bold text-green-800">{completedCalls}</p>
              </div>
              <PhoneCall className="h-12 w-12 text-green-600 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">Avg Duration</p>
                <p className="text-3xl font-bold text-purple-800">{averageDuration}m</p>
              </div>
              <Clock className="h-12 w-12 text-purple-600 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-emerald-600">Success Rate</p>
                <p className="text-3xl font-bold text-emerald-800">
                  {calls?.length ? Math.round((completedCalls / calls.length) * 100) : 0}%
                </p>
              </div>
              <Activity className="h-12 w-12 text-emerald-600 opacity-80" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Voice Agent Configuration */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="h-5 w-5 mr-2" />
              Current Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                <Mic className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium">Voice Model</p>
                  <p className="text-sm text-muted-foreground">{voiceSettings.model.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</p>
                </div>
              </div>
              <Button size="sm" variant="outline" onClick={() => setConfigOpen(true)}>Change</Button>
            </div>
            
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                <Volume2 className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium">Response Speed</p>
                  <p className="text-sm text-muted-foreground">{voiceSettings.responseSpeed.charAt(0).toUpperCase() + voiceSettings.responseSpeed.slice(1)}</p>
                </div>
              </div>
              <Button size="sm" variant="outline" onClick={() => setConfigOpen(true)}>Adjust</Button>
            </div>
            
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                <Activity className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="font-medium">AI Personality</p>
                  <p className="text-sm text-muted-foreground">{voiceSettings.personality.replace('-', ' & ').replace(/\b\w/g, l => l.toUpperCase())}</p>
                </div>
              </div>
              <Button size="sm" variant="outline" onClick={() => setConfigOpen(true)}>Customize</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="h-5 w-5 mr-2" />
              Performance Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Call Resolution Rate</span>
                  <span className="text-sm text-muted-foreground">
                    {calls?.length ? Math.round((completedCalls / calls.length) * 100) : 0}%
                  </span>
                </div>
                <Progress value={calls?.length ? (completedCalls / calls.length) * 100 : 0} className="h-3" />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Customer Satisfaction</span>
                  <span className="text-sm text-muted-foreground">94%</span>
                </div>
                <Progress value={94} className="h-3" />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Response Accuracy</span>
                  <span className="text-sm text-muted-foreground">96%</span>
                </div>
                <Progress value={96} className="h-3" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Calls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <PhoneCall className="h-5 w-5 mr-2" />
              Recent Voice Calls
            </div>
            <div className="flex space-x-2">
              <Button size="sm" variant="outline">
                <Play className="h-4 w-4 mr-2" />
                Listen to Samples
              </Button>
              <Button size="sm" variant="outline">
                Export Transcripts
              </Button>
            </div>
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
          ) : calls && calls.length > 0 ? (
            <div className="space-y-4">
              {calls.slice(0, 5).map((call) => (
                <div key={call.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Phone className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">{call.caller_phone || 'Unknown Number'}</h4>
                      <p className="text-sm text-muted-foreground">
                        Duration: {Math.floor(call.duration_seconds / 60)}m {call.duration_seconds % 60}s
                      </p>
                      <p className="text-xs text-muted-foreground">{call.resolution_status}</p>
                    </div>
                  </div>
                  <div className="text-right space-y-1">
                    <Badge variant={call.status === 'completed' ? 'default' : call.status === 'failed' ? 'destructive' : 'secondary'}>
                      {call.status}
                    </Badge>
                    <p className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(call.created_at), { addSuffix: true })}
                    </p>
                    <div className="flex space-x-1">
                      <Button size="sm" variant="outline">Listen</Button>
                      <Button size="sm" variant="outline">Transcript</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Phone className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">No voice calls yet</p>
              <AddBookingDialog>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Schedule Your First Call
                </Button>
              </AddBookingDialog>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default VoiceAgentDashboard;

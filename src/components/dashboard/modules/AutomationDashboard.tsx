
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useWorkflows, useDashboardStats } from '@/hooks/useDashboardData';
import { Zap, Bot, Settings, Plus, Activity, Clock, CheckCircle, AlertCircle, Play, Pause } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const AutomationDashboard = () => {
  const { data: workflows, isLoading } = useWorkflows();
  const { data: stats } = useDashboardStats();

  const activeWorkflows = workflows?.filter(w => w.status === 'active').length || 0;
  const pausedWorkflows = workflows?.filter(w => w.status === 'paused').length || 0;
  const failedWorkflows = workflows?.filter(w => w.status === 'failed').length || 0;
  const totalActions = workflows?.reduce((sum, w) => sum + (w.actions_count || 0), 0) || 0;
  const avgSuccessRate = workflows?.length ? 
    Math.round(workflows.reduce((sum, w) => sum + (w.success_rate || 0), 0) / workflows.length) : 0;

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'paused':
        return <Pause className="h-4 w-4 text-yellow-600" />;
      case 'failed':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'default';
      case 'paused':
        return 'secondary';
      case 'failed':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      {/* Automation Header */}
      <div className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Automation Hub</h2>
            <p className="opacity-90">Manage your automated workflows and AI processes</p>
          </div>
          <div className="flex space-x-2">
            <Button className="bg-white text-yellow-600 hover:bg-gray-100">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Button className="bg-white text-yellow-600 hover:bg-gray-100">
              <Plus className="h-4 w-4 mr-2" />
              Create Workflow
            </Button>
          </div>
        </div>
      </div>

      {/* Automation Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-600">Active Workflows</p>
                <p className="text-3xl font-bold text-yellow-800">{activeWorkflows}</p>
              </div>
              <Zap className="h-12 w-12 text-yellow-600 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Total Actions</p>
                <p className="text-3xl font-bold text-blue-800">{totalActions}</p>
              </div>
              <Bot className="h-12 w-12 text-blue-600 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Success Rate</p>
                <p className="text-3xl font-bold text-green-800">{avgSuccessRate}%</p>
              </div>
              <Activity className="h-12 w-12 text-green-600 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">Total Workflows</p>
                <p className="text-3xl font-bold text-purple-800">{workflows?.length || 0}</p>
              </div>
              <Settings className="h-12 w-12 text-purple-600 opacity-80" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Automation Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Activity className="h-5 w-5 mr-2" />
            Automation Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Email Automation</span>
                <span className="text-sm text-muted-foreground">94%</span>
              </div>
              <Progress value={94} className="h-3" />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">SMS Automation</span>
                <span className="text-sm text-muted-foreground">87%</span>
              </div>
              <Progress value={87} className="h-3" />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Lead Scoring</span>
                <span className="text-sm text-muted-foreground">99%</span>
              </div>
              <Progress value={99} className="h-3" />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Task Assignment</span>
                <span className="text-sm text-muted-foreground">{avgSuccessRate}%</span>
              </div>
              <Progress value={avgSuccessRate} className="h-3" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Active Workflows */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Zap className="h-5 w-5 mr-2" />
            Active Workflows
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-32 bg-gray-200 rounded-lg"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {workflows?.slice(0, 6).map((workflow) => (
                <div key={workflow.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-sm">{workflow.name}</h4>
                    <div className="flex items-center space-x-1">
                      {getStatusIcon(workflow.status)}
                      <Badge variant={getStatusBadgeVariant(workflow.status)} className="text-xs">
                        {workflow.status}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Trigger:</span>
                      <span className="font-medium">{workflow.trigger_type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Actions:</span>
                      <span className="font-medium">{workflow.actions_count || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Success:</span>
                      <span className="font-medium text-green-600">{workflow.success_rate || 0}%</span>
                    </div>
                  </div>
                  
                  <div className="mt-3 pt-3 border-t">
                    <p className="text-xs text-muted-foreground">
                      Last run: {workflow.last_run_at 
                        ? formatDistanceToNow(new Date(workflow.last_run_at), { addSuffix: true })
                        : 'Never'
                      }
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Workflow Templates */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bot className="h-5 w-5 mr-2" />
            Quick Start Templates
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 transition-colors cursor-pointer">
              <div className="text-center">
                <Bot className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <h4 className="font-medium mb-1">Lead Follow-up</h4>
                <p className="text-xs text-muted-foreground">Automatically follow up with new leads</p>
              </div>
            </div>
            
            <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-400 transition-colors cursor-pointer">
              <div className="text-center">
                <Zap className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <h4 className="font-medium mb-1">Booking Reminder</h4>
                <p className="text-xs text-muted-foreground">Send reminders for upcoming sessions</p>
              </div>
            </div>
            
            <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-400 transition-colors cursor-pointer">
              <div className="text-center">
                <Activity className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <h4 className="font-medium mb-1">Lead Scoring</h4>
                <p className="text-xs text-muted-foreground">Automatically score and categorize leads</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AutomationDashboard;

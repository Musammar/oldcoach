
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useLeads, useDashboardStats } from '@/hooks/useDashboardData';
import AddLeadDialog from '../AddLeadDialog';
import { Users, UserPlus, TrendingUp, Target, Plus, Mail, Phone, ExternalLink, Download } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { toast } from 'sonner';

const CRMDashboard = () => {
  const { data: leads, isLoading } = useLeads();
  const { data: stats } = useDashboardStats();

  const hotLeads = leads?.filter(lead => lead.temperature === 'hot').length || 0;
  const warmLeads = leads?.filter(lead => lead.temperature === 'warm').length || 0;
  const coldLeads = leads?.filter(lead => lead.temperature === 'cold').length || 0;
  const convertedLeads = leads?.filter(lead => lead.status === 'converted').length || 0;

  const handleExportLeads = () => {
    if (!leads || leads.length === 0) {
      toast.error('No leads to export');
      return;
    }

    try {
      const csvContent = [
        ['Name', 'Email', 'Phone', 'Source', 'Status', 'Temperature', 'Created At'].join(','),
        ...leads.map(lead => [
          lead.name,
          lead.email,
          lead.phone || '',
          lead.source,
          lead.status,
          lead.temperature,
          new Date(lead.created_at).toLocaleDateString()
        ].join(','))
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `leads_export_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success('Leads exported successfully!');
    } catch (error) {
      toast.error('Failed to export leads');
      console.error(error);
    }
  };

  return (
    <div className="space-y-6">
      {/* CRM Header */}
      <div className="bg-gradient-to-r from-primary to-purple-600 text-white rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Customer Relationship Management</h2>
            <p className="opacity-90">Track and nurture your leads through the sales funnel</p>
          </div>
          <div className="flex space-x-2">
            <AddLeadDialog>
              <Button className="bg-white text-primary hover:bg-gray-100">
                <Plus className="h-4 w-4 mr-2" />
                Add Lead
              </Button>
            </AddLeadDialog>
            <Button 
              className="bg-white text-primary hover:bg-gray-100"
              onClick={handleExportLeads}
            >
              <Download className="h-4 w-4 mr-2" />
              Export All
            </Button>
          </div>
        </div>
      </div>

      {/* CRM Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Total Leads</p>
                <p className="text-3xl font-bold text-blue-800">{stats?.totalLeads || 0}</p>
              </div>
              <Users className="h-12 w-12 text-blue-600 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Hot Leads</p>
                <p className="text-3xl font-bold text-green-800">{hotLeads}</p>
              </div>
              <Target className="h-12 w-12 text-green-600 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600">Converted</p>
                <p className="text-3xl font-bold text-orange-800">{convertedLeads}</p>
              </div>
              <TrendingUp className="h-12 w-12 text-orange-600 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">Conversion Rate</p>
                <p className="text-3xl font-bold text-purple-800">{stats?.conversionRate || 0}%</p>
              </div>
              <UserPlus className="h-12 w-12 text-purple-600 opacity-80" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lead Temperature Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-red-600 flex items-center">
              <Target className="h-5 w-5 mr-2" />
              Hot Leads ({hotLeads})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">Ready to convert leads</p>
            <div className="space-y-2">
              {leads?.filter(lead => lead.temperature === 'hot').slice(0, 3).map((lead) => (
                <div key={lead.id} className="p-2 bg-red-50 rounded-lg border border-red-200">
                  <p className="font-medium text-sm">{lead.name}</p>
                  <p className="text-xs text-muted-foreground">{lead.email}</p>
                </div>
              )) || (
                <p className="text-sm text-muted-foreground">No hot leads yet</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-orange-600 flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Warm Leads ({warmLeads})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">Engaged prospects</p>
            <div className="space-y-2">
              {leads?.filter(lead => lead.temperature === 'warm').slice(0, 3).map((lead) => (
                <div key={lead.id} className="p-2 bg-orange-50 rounded-lg border border-orange-200">
                  <p className="font-medium text-sm">{lead.name}</p>
                  <p className="text-xs text-muted-foreground">{lead.email}</p>
                </div>
              )) || (
                <p className="text-sm text-muted-foreground">No warm leads yet</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-blue-600 flex items-center">
              <UserPlus className="h-5 w-5 mr-2" />
              Cold Leads ({coldLeads})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">New prospects</p>
            <div className="space-y-2">
              {leads?.filter(lead => lead.temperature === 'cold').slice(0, 3).map((lead) => (
                <div key={lead.id} className="p-2 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="font-medium text-sm">{lead.name}</p>
                  <p className="text-xs text-muted-foreground">{lead.email}</p>
                </div>
              )) || (
                <p className="text-sm text-muted-foreground">No cold leads yet</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Leads */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Recent Leads
            </div>
            <div className="flex space-x-2">
              <AddLeadDialog>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Lead
                </Button>
              </AddLeadDialog>
              <Button size="sm" variant="outline" onClick={handleExportLeads}>
                <Download className="h-4 w-4 mr-2" />
                Export All
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-16 bg-gray-200 rounded-lg"></div>
                </div>
              ))}
            </div>
          ) : leads && leads.length > 0 ? (
            <div className="space-y-4">
              {leads.slice(0, 10).map((lead) => (
                <div key={lead.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">{lead.name}</h4>
                      <p className="text-sm text-muted-foreground">{lead.email}</p>
                      <p className="text-xs text-muted-foreground">Source: {lead.source}</p>
                    </div>
                  </div>
                  <div className="text-right space-y-1">
                    <div className="flex space-x-2">
                      <Badge variant={lead.temperature === 'hot' ? 'destructive' : lead.temperature === 'warm' ? 'default' : 'secondary'}>
                        {lead.temperature}
                      </Badge>
                      <Badge variant="outline">
                        {lead.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(lead.created_at), { addSuffix: true })}
                    </p>
                    <div className="flex space-x-1">
                      <Button size="sm" variant="outline">
                        <Mail className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Phone className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">No leads yet</p>
              <AddLeadDialog>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Lead
                </Button>
              </AddLeadDialog>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CRMDashboard;

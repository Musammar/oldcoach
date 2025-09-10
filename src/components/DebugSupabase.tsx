
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronRight, Database, User, Settings, Facebook, Instagram, Bot } from 'lucide-react';

const DebugSupabase: React.FC = () => {
  const { user, session, loading } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'connected' | 'error'>('checking');
  const [dbTest, setDbTest] = useState<any>(null);

  const testConnection = async () => {
    try {
      const { data, error } = await supabase.from('profiles').select('count').limit(1);
      if (error) throw error;
      setConnectionStatus('connected');
      setDbTest({ success: true, data });
    } catch (error) {
      setConnectionStatus('error');
      setDbTest({ success: false, error: error.message });
    }
  };

  useEffect(() => {
    testConnection();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'bg-green-500';
      case 'error': return 'bg-red-500';
      default: return 'bg-yellow-500';
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-md">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <Button 
            variant="outline" 
            className="mb-2 bg-slate-900 text-white border-slate-700 hover:bg-slate-800"
          >
            {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            <Database className="h-4 w-4 ml-2" />
            Debug Supabase
            <div className={`w-2 h-2 rounded-full ml-2 ${getStatusColor(connectionStatus)}`} />
          </Button>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <Card className="bg-slate-900 text-white border-slate-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center">
                <Settings className="h-4 w-4 mr-2" />
                Supabase Debug Info
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-xs">
              {/* Connection Status */}
              <div>
                <h4 className="font-semibold mb-1 flex items-center">
                  <Database className="h-3 w-3 mr-1" />
                  Connection Status
                </h4>
                <Badge variant={connectionStatus === 'connected' ? 'default' : 'destructive'}>
                  {connectionStatus}
                </Badge>
                {dbTest && (
                  <div className="mt-1 p-2 bg-slate-800 rounded text-xs">
                    {dbTest.success ? 'DB Test: Success' : `DB Error: ${dbTest.error}`}
                  </div>
                )}
              </div>

              {/* Auth Status */}
              <div>
                <h4 className="font-semibold mb-1 flex items-center">
                  <User className="h-3 w-3 mr-1" />
                  Authentication
                </h4>
                <div className="space-y-1">
                  <div>Loading: <Badge variant={loading ? 'destructive' : 'default'}>{loading.toString()}</Badge></div>
                  <div>User: <Badge variant={user ? 'default' : 'secondary'}>{user ? 'Logged In' : 'Not Logged In'}</Badge></div>
                  <div>Session: <Badge variant={session ? 'default' : 'secondary'}>{session ? 'Active' : 'None'}</Badge></div>
                </div>
              </div>

              {/* Social Platform Icons */}
              <div>
                <h4 className="font-semibold mb-1">Available Channels</h4>
                <div className="flex space-x-2">
                  <Facebook className="h-5 w-5 text-blue-500" />
                  <Instagram className="h-5 w-5 text-pink-500" />
                  <Bot className="h-5 w-5 text-green-500" />
                </div>
              </div>

              {/* User Details */}
              {user && (
                <div>
                  <h4 className="font-semibold mb-1">User Details</h4>
                  <div className="p-2 bg-slate-800 rounded space-y-1">
                    <div>ID: {user.id}</div>
                    <div>Email: {user.email}</div>
                    <div>Created: {new Date(user.created_at).toLocaleString()}</div>
                    {user.user_metadata?.full_name && (
                      <div>Name: {user.user_metadata.full_name}</div>
                    )}
                  </div>
                </div>
              )}

              {/* Session Details */}
              {session && (
                <div>
                  <h4 className="font-semibold mb-1">Session Details</h4>
                  <div className="p-2 bg-slate-800 rounded space-y-1">
                    <div>Expires: {new Date(session.expires_at * 1000).toLocaleString()}</div>
                    <div>Token Type: {session.token_type}</div>
                    <div>Access Token: {session.access_token.substring(0, 20)}...</div>
                  </div>
                </div>
              )}

              {/* Environment Info */}
              <div>
                <h4 className="font-semibold mb-1">Environment</h4>
                <div className="p-2 bg-slate-800 rounded space-y-1">
                  <div>Mode: {process.env.NODE_ENV}</div>
                  <div>URL: {window.location.origin}</div>
                  <div>Project: CoachFlow</div>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-2 border-t border-slate-700">
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={testConnection}
                  className="w-full text-xs"
                >
                  Test Connection
                </Button>
              </div>
            </CardContent>
          </Card>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default DebugSupabase;

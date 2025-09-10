
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCreateLead } from '@/hooks/useDashboardData';
import { toast } from 'sonner';
import { Plus } from 'lucide-react';

interface AddLeadDialogProps {
  children?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onLeadAdded?: () => void;
}

const AddLeadDialog: React.FC<AddLeadDialogProps> = ({ 
  children, 
  open: externalOpen, 
  onOpenChange: externalOnOpenChange,
  onLeadAdded 
}) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    source: 'website',
    status: 'new',
    temperature: 'cold'
  });

  const createLead = useCreateLead();

  // Use external state if provided, otherwise use internal state
  const isOpen = externalOpen !== undefined ? externalOpen : internalOpen;
  const setOpen = externalOnOpenChange || setInternalOpen;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email) {
      toast.error('Name and email are required');
      return;
    }

    try {
      await createLead.mutateAsync(formData);
      toast.success('Lead created successfully!');
      setOpen(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        source: 'website',
        status: 'new',
        temperature: 'cold'
      });
      onLeadAdded?.();
    } catch (error) {
      toast.error('Failed to create lead');
      console.error(error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Lead
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Lead</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter lead name"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              placeholder="Enter email address"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              placeholder="Enter phone number"
            />
          </div>
          
          <div className="space-y-2">
            <Label>Source</Label>
            <Select value={formData.source} onValueChange={(value) => setFormData(prev => ({ ...prev, source: value }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="website">Website</SelectItem>
                <SelectItem value="social_media">Social Media</SelectItem>
                <SelectItem value="referral">Referral</SelectItem>
                <SelectItem value="email_campaign">Email Campaign</SelectItem>
                <SelectItem value="cold_outreach">Cold Outreach</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>Temperature</Label>
            <Select value={formData.temperature} onValueChange={(value) => setFormData(prev => ({ ...prev, temperature: value }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hot">Hot</SelectItem>
                <SelectItem value="warm">Warm</SelectItem>
                <SelectItem value="cold">Cold</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={createLead.isPending}>
              {createLead.isPending ? 'Creating...' : 'Create Lead'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddLeadDialog;

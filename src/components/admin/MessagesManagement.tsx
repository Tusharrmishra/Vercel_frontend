import React, { useState } from 'react';
import { Search, Mail, MailOpen, Star, Trash2, Filter, Eye, Reply } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { Textarea } from '../ui/textarea';

interface ContactMessage {
  id: number;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  country: string;
  inquiryType: string;
  subject: string;
  message: string;
  status: 'unread' | 'read' | 'replied';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  updatedAt: string;
}

interface MessagesManagementProps {
  messages: ContactMessage[];
  onUpdateMessage: (id: number, updates: Partial<ContactMessage>) => void;
  onDeleteMessage: (id: number) => void;
  onReplyMessage: (id: number, reply: string) => void;
}

export function MessagesManagement({ 
  messages, 
  onUpdateMessage, 
  onDeleteMessage,
  onReplyMessage 
}: MessagesManagementProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [selectedInquiryType, setSelectedInquiryType] = useState('all');
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [showMessageDialog, setShowMessageDialog] = useState(false);
  const [showReplyDialog, setShowReplyDialog] = useState(false);
  const [replyText, setReplyText] = useState('');

  const inquiryTypes = [
    { value: 'all', label: 'All Types' },
    { value: 'general', label: 'General Information' },
    { value: 'product', label: 'Product Inquiry' },
    { value: 'medical', label: 'Medical Information' },
    { value: 'business', label: 'Business Partnership' },
    { value: 'distribution', label: 'Distribution Opportunity' },
    { value: 'adverse', label: 'Adverse Event Reporting' },
    { value: 'quality', label: 'Quality Complaint' },
    { value: 'regulatory', label: 'Regulatory Inquiry' },
    { value: 'other', label: 'Other' }
  ];

  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || message.status === selectedStatus;
    const matchesPriority = selectedPriority === 'all' || message.priority === selectedPriority;
    const matchesInquiryType = selectedInquiryType === 'all' || message.inquiryType === selectedInquiryType;
    
    return matchesSearch && matchesStatus && matchesPriority && matchesInquiryType;
  });

  const handleViewMessage = (message: ContactMessage) => {
    setSelectedMessage(message);
    setShowMessageDialog(true);
    if (message.status === 'unread') {
      onUpdateMessage(message.id, { status: 'read' });
    }
  };

  const handleReply = () => {
    if (selectedMessage && replyText.trim()) {
      onReplyMessage(selectedMessage.id, replyText);
      onUpdateMessage(selectedMessage.id, { status: 'replied' });
      setReplyText('');
      setShowReplyDialog(false);
      setShowMessageDialog(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'unread': return <Mail className="h-4 w-4" />;
      case 'read': return <MailOpen className="h-4 w-4" />;
      case 'replied': return <Reply className="h-4 w-4" />;
      default: return <Mail className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'unread': return 'bg-blue-100 text-blue-800';
      case 'read': return 'bg-gray-100 text-gray-800';
      case 'replied': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl text-gray-900 mb-2">Messages Management</h1>
          <p className="text-gray-600">Manage customer inquiries and contact messages</p>
        </div>
        
        <div className="flex space-x-2">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Messages</p>
                <p className="text-2xl text-gray-900">{messages.length}</p>
              </div>
              <Mail className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Unread</p>
                <p className="text-2xl text-gray-900">{messages.filter(m => m.status === 'unread').length}</p>
              </div>
              <Mail className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Replied</p>
                <p className="text-2xl text-gray-900">{messages.filter(m => m.status === 'replied').length}</p>
              </div>
              <Reply className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">High Priority</p>
                <p className="text-2xl text-gray-900">{messages.filter(m => m.priority === 'high').length}</p>
              </div>
              <Star className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search messages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="unread">Unread</SelectItem>
                <SelectItem value="read">Read</SelectItem>
                <SelectItem value="replied">Replied</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedPriority} onValueChange={setSelectedPriority}>
              <SelectTrigger>
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedInquiryType} onValueChange={setSelectedInquiryType}>
              <SelectTrigger>
                <SelectValue placeholder="Inquiry Type" />
              </SelectTrigger>
              <SelectContent>
                {inquiryTypes.map(type => (
                  <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing {filteredMessages.length} of {messages.length} messages
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Messages Table */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>From</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMessages.map((message) => (
                <TableRow key={message.id} className={message.status === 'unread' ? 'bg-blue-50' : ''}>
                  <TableCell>
                    <div>
                      <div className="text-gray-900">{message.name}</div>
                      <div className="text-sm text-gray-600">{message.email}</div>
                      {message.company && (
                        <div className="text-xs text-gray-500">{message.company}</div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-[300px] truncate text-gray-900">
                      {message.subject}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs">
                      {inquiryTypes.find(t => t.value === message.inquiryType)?.label || message.inquiryType}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={`${getPriorityColor(message.priority)} text-xs`}>
                      {message.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(message.status)}
                      <Badge className={`${getStatusColor(message.status)} text-xs`}>
                        {message.status}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {message.createdAt}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleViewMessage(message)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onUpdateMessage(message.id, { 
                          priority: message.priority === 'high' ? 'medium' : 'high' 
                        })}
                      >
                        <Star className={`h-4 w-4 ${message.priority === 'high' ? 'text-orange-600 fill-current' : 'text-gray-400'}`} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDeleteMessage(message.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Message Details Dialog */}
      <Dialog open={showMessageDialog} onOpenChange={setShowMessageDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Message Details</DialogTitle>
            <DialogDescription>
              Customer inquiry from {selectedMessage?.name}
            </DialogDescription>
          </DialogHeader>
          
          {selectedMessage && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-600">From</label>
                  <p className="text-gray-900">{selectedMessage.name}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Email</label>
                  <p className="text-gray-900">{selectedMessage.email}</p>
                </div>
                {selectedMessage.phone && (
                  <div>
                    <label className="text-sm text-gray-600">Phone</label>
                    <p className="text-gray-900">{selectedMessage.phone}</p>
                  </div>
                )}
                {selectedMessage.company && (
                  <div>
                    <label className="text-sm text-gray-600">Company</label>
                    <p className="text-gray-900">{selectedMessage.company}</p>
                  </div>
                )}
                <div>
                  <label className="text-sm text-gray-600">Country</label>
                  <p className="text-gray-900">{selectedMessage.country}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Inquiry Type</label>
                  <p className="text-gray-900">
                    {inquiryTypes.find(t => t.value === selectedMessage.inquiryType)?.label || selectedMessage.inquiryType}
                  </p>
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-600">Subject</label>
                <p className="text-gray-900">{selectedMessage.subject}</p>
              </div>

              <div>
                <label className="text-sm text-gray-600">Message</label>
                <div className="mt-2 p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-900 whitespace-pre-wrap">{selectedMessage.message}</p>
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <Button variant="outline" onClick={() => setShowMessageDialog(false)}>
                  Close
                </Button>
                <Button 
                  onClick={() => setShowReplyDialog(true)}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Reply className="h-4 w-4 mr-2" />
                  Reply
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Reply Dialog */}
      <Dialog open={showReplyDialog} onOpenChange={setShowReplyDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Reply to Message</DialogTitle>
            <DialogDescription>
              Send a reply to {selectedMessage?.name}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Reply Message</label>
              <Textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Type your reply here..."
                rows={6}
                required
              />
            </div>

            <div className="flex justify-end space-x-4">
              <Button variant="outline" onClick={() => setShowReplyDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleReply} className="bg-blue-600 hover:bg-blue-700">
                Send Reply
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
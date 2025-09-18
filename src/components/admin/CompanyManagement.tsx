import React, { useState } from 'react';
import { Save, Plus, Edit, Trash2, Building, Users, MapPin } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Textarea } from '../ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';

interface CompanyInfo {
  mission: string;
  vision: string;
  values: string[];
  story: string;
}

interface LeadershipMember {
  id: number;
  name: string;
  position: string;
  experience: string;
  education: string;
}

interface Facility {
  id: number;
  location: string;
  address: string;
  type: string;
  employees: number;
}

interface CompanyManagementProps {
  companyInfo: CompanyInfo;
  leadership: LeadershipMember[];
  facilities: Facility[];
  onUpdateCompanyInfo: (info: CompanyInfo) => void;
  onUpdateLeadership: (leadership: LeadershipMember[]) => void;
  onUpdateFacilities: (facilities: Facility[]) => void;
}

export function CompanyManagement({
  companyInfo,
  leadership,
  facilities,
  onUpdateCompanyInfo,
  onUpdateLeadership,
  onUpdateFacilities
}: CompanyManagementProps) {
  const [editingInfo, setEditingInfo] = useState(companyInfo);
  const [showLeaderDialog, setShowLeaderDialog] = useState(false);
  const [showFacilityDialog, setShowFacilityDialog] = useState(false);
  const [editingLeader, setEditingLeader] = useState<LeadershipMember | null>(null);
  const [editingFacility, setEditingFacility] = useState<Facility | null>(null);
  
  const [leaderForm, setLeaderForm] = useState({
    name: '',
    position: '',
    experience: '',
    education: ''
  });

  const [facilityForm, setFacilityForm] = useState({
    location: '',
    address: '',
    type: '',
    employees: 0
  });

  const handleSaveCompanyInfo = () => {
    onUpdateCompanyInfo(editingInfo);
  };

  const handleAddValue = () => {
    setEditingInfo(prev => ({
      ...prev,
      values: [...prev.values, '']
    }));
  };

  const handleUpdateValue = (index: number, value: string) => {
    setEditingInfo(prev => ({
      ...prev,
      values: prev.values.map((v, i) => i === index ? value : v)
    }));
  };

  const handleRemoveValue = (index: number) => {
    setEditingInfo(prev => ({
      ...prev,
      values: prev.values.filter((_, i) => i !== index)
    }));
  };

  const handleSaveLeader = () => {
    if (editingLeader) {
      // Update existing leader
      const updatedLeadership = leadership.map(leader =>
        leader.id === editingLeader.id
          ? { ...editingLeader, ...leaderForm }
          : leader
      );
      onUpdateLeadership(updatedLeadership);
    } else {
      // Add new leader
      const newLeader: LeadershipMember = {
        id: Date.now(),
        ...leaderForm
      };
      onUpdateLeadership([...leadership, newLeader]);
    }
    resetLeaderForm();
  };

  const handleSaveFacility = () => {
    if (editingFacility) {
      // Update existing facility
      const updatedFacilities = facilities.map(facility =>
        facility.id === editingFacility.id
          ? { ...editingFacility, ...facilityForm }
          : facility
      );
      onUpdateFacilities(updatedFacilities);
    } else {
      // Add new facility
      const newFacility: Facility = {
        id: Date.now(),
        ...facilityForm
      };
      onUpdateFacilities([...facilities, newFacility]);
    }
    resetFacilityForm();
  };

  const resetLeaderForm = () => {
    setLeaderForm({ name: '', position: '', experience: '', education: '' });
    setEditingLeader(null);
    setShowLeaderDialog(false);
  };

  const resetFacilityForm = () => {
    setFacilityForm({ location: '', address: '', type: '', employees: 0 });
    setEditingFacility(null);
    setShowFacilityDialog(false);
  };

  const openEditLeader = (leader: LeadershipMember) => {
    setEditingLeader(leader);
    setLeaderForm({
      name: leader.name,
      position: leader.position,
      experience: leader.experience,
      education: leader.education
    });
    setShowLeaderDialog(true);
  };

  const openEditFacility = (facility: Facility) => {
    setEditingFacility(facility);
    setFacilityForm({
      location: facility.location,
      address: facility.address,
      type: facility.type,
      employees: facility.employees
    });
    setShowFacilityDialog(true);
  };

  const handleDeleteLeader = (id: number) => {
    onUpdateLeadership(leadership.filter(leader => leader.id !== id));
  };

  const handleDeleteFacility = (id: number) => {
    onUpdateFacilities(facilities.filter(facility => facility.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl text-gray-900 mb-2">Company Information</h1>
          <p className="text-gray-600">Manage your company details, leadership team, and global facilities</p>
        </div>
      </div>

      <Tabs defaultValue="info" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="info">Company Info</TabsTrigger>
          <TabsTrigger value="leadership">Leadership Team</TabsTrigger>
          <TabsTrigger value="facilities">Global Facilities</TabsTrigger>
        </TabsList>

        {/* Company Information Tab */}
        <TabsContent value="info" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building className="h-5 w-5 mr-2" />
                Company Information
              </CardTitle>
              <CardDescription>
                Update your company's mission, vision, values, and story
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-gray-700 mb-2">Mission Statement</label>
                <Textarea
                  value={editingInfo.mission}
                  onChange={(e) => setEditingInfo(prev => ({ ...prev, mission: e.target.value }))}
                  placeholder="Enter company mission statement"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Vision Statement</label>
                <Textarea
                  value={editingInfo.vision}
                  onChange={(e) => setEditingInfo(prev => ({ ...prev, vision: e.target.value }))}
                  placeholder="Enter company vision statement"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Company Values</label>
                <div className="space-y-2">
                  {editingInfo.values.map((value, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Input
                        value={value}
                        onChange={(e) => handleUpdateValue(index, e.target.value)}
                        placeholder="Enter company value"
                        className="flex-1"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleRemoveValue(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button variant="outline" onClick={handleAddValue}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Value
                  </Button>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Company Story</label>
                <Textarea
                  value={editingInfo.story}
                  onChange={(e) => setEditingInfo(prev => ({ ...prev, story: e.target.value }))}
                  placeholder="Enter company story and background"
                  rows={6}
                />
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSaveCompanyInfo} className="bg-blue-600 hover:bg-blue-700">
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Leadership Team Tab */}
        <TabsContent value="leadership" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    Leadership Team
                  </CardTitle>
                  <CardDescription>
                    Manage your company's leadership team members
                  </CardDescription>
                </div>
                <Dialog open={showLeaderDialog} onOpenChange={setShowLeaderDialog}>
                  <DialogTrigger asChild>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Leader
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        {editingLeader ? 'Edit Leader' : 'Add New Leader'}
                      </DialogTitle>
                      <DialogDescription>
                        {editingLeader ? 'Update leader information' : 'Add a new leadership team member'}
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-gray-700 mb-2">Name</label>
                        <Input
                          value={leaderForm.name}
                          onChange={(e) => setLeaderForm(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="Enter full name"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-gray-700 mb-2">Position</label>
                        <Input
                          value={leaderForm.position}
                          onChange={(e) => setLeaderForm(prev => ({ ...prev, position: e.target.value }))}
                          placeholder="Enter job position"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-gray-700 mb-2">Experience</label>
                        <Input
                          value={leaderForm.experience}
                          onChange={(e) => setLeaderForm(prev => ({ ...prev, experience: e.target.value }))}
                          placeholder="e.g., 15+ years in pharmaceutical industry"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-gray-700 mb-2">Education</label>
                        <Input
                          value={leaderForm.education}
                          onChange={(e) => setLeaderForm(prev => ({ ...prev, education: e.target.value }))}
                          placeholder="Educational background"
                        />
                      </div>

                      <div className="flex justify-end space-x-4">
                        <Button variant="outline" onClick={resetLeaderForm}>
                          Cancel
                        </Button>
                        <Button onClick={handleSaveLeader} className="bg-blue-600 hover:bg-blue-700">
                          {editingLeader ? 'Update' : 'Add'} Leader
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {leadership.map((leader) => (
                  <Card key={leader.id} className="border border-gray-200">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <Users className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openEditLeader(leader)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteLeader(leader.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <h3 className="text-gray-900 mb-1">{leader.name}</h3>
                      <p className="text-blue-600 text-sm mb-3">{leader.position}</p>
                      <div className="space-y-2 text-sm text-gray-600">
                        <p><strong>Experience:</strong> {leader.experience}</p>
                        <p><strong>Education:</strong> {leader.education}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Global Facilities Tab */}
        <TabsContent value="facilities" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="flex items-center">
                    <MapPin className="h-5 w-5 mr-2" />
                    Global Facilities
                  </CardTitle>
                  <CardDescription>
                    Manage your company's global offices and facilities
                  </CardDescription>
                </div>
                <Dialog open={showFacilityDialog} onOpenChange={setShowFacilityDialog}>
                  <DialogTrigger asChild>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Facility
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        {editingFacility ? 'Edit Facility' : 'Add New Facility'}
                      </DialogTitle>
                      <DialogDescription>
                        {editingFacility ? 'Update facility information' : 'Add a new global facility'}
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-gray-700 mb-2">Location</label>
                        <Input
                          value={facilityForm.location}
                          onChange={(e) => setFacilityForm(prev => ({ ...prev, location: e.target.value }))}
                          placeholder="e.g., United States - Headquarters"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-gray-700 mb-2">Address</label>
                        <Textarea
                          value={facilityForm.address}
                          onChange={(e) => setFacilityForm(prev => ({ ...prev, address: e.target.value }))}
                          placeholder="Full address"
                          rows={2}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-gray-700 mb-2">Type</label>
                        <Input
                          value={facilityForm.type}
                          onChange={(e) => setFacilityForm(prev => ({ ...prev, type: e.target.value }))}
                          placeholder="e.g., Corporate Headquarters & R&D Center"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-gray-700 mb-2">Number of Employees</label>
                        <Input
                          type="number"
                          value={facilityForm.employees}
                          onChange={(e) => setFacilityForm(prev => ({ ...prev, employees: parseInt(e.target.value) || 0 }))}
                          placeholder="Number of employees"
                        />
                      </div>

                      <div className="flex justify-end space-x-4">
                        <Button variant="outline" onClick={resetFacilityForm}>
                          Cancel
                        </Button>
                        <Button onClick={handleSaveFacility} className="bg-blue-600 hover:bg-blue-700">
                          {editingFacility ? 'Update' : 'Add'} Facility
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {facilities.map((facility) => (
                  <Card key={facility.id} className="border border-gray-200">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                          <Building className="h-6 w-6 text-purple-600" />
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openEditFacility(facility)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteFacility(facility.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-gray-900">{facility.location}</h3>
                        <span className="text-sm text-blue-600">{facility.employees} employees</span>
                      </div>
                      <p className="text-blue-600 text-sm mb-3">{facility.type}</p>
                      <div className="flex items-start">
                        <MapPin className="h-4 w-4 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-gray-600">{facility.address}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
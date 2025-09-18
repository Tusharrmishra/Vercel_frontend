import React from 'react';
import { Users, Package, MessageSquare, Building, TrendingUp, Activity } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

interface DashboardStats {
  totalProducts: number;
  totalMessages: number;
  totalCategories: number;
  activeUsers: number;
}

interface AdminDashboardProps {
  stats: DashboardStats;
}

export function AdminDashboard({ stats }: AdminDashboardProps) {
  const statCards = [
    {
      title: 'Total Products',
      value: stats.totalProducts,
      description: 'Pharmaceutical products in catalog',
      icon: Package,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Contact Messages',
      value: stats.totalMessages,
      description: 'Unread customer inquiries',
      icon: MessageSquare,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Product Categories',
      value: stats.totalCategories,
      description: 'Active medication categories',
      icon: Building,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Active Sessions',
      value: stats.activeUsers,
      description: 'Current website visitors',
      icon: Users,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  const recentActivity = [
    { action: 'New product added', item: 'Amoxicillin 750mg', time: '2 hours ago', type: 'create' },
    { action: 'Contact message received', item: 'Business Partnership Inquiry', time: '3 hours ago', type: 'message' },
    { action: 'Product updated', item: 'Vitamin D3 1000 IU', time: '5 hours ago', type: 'update' },
    { action: 'New contact message', item: 'Medical Information Request', time: '1 day ago', type: 'message' },
    { action: 'Product deleted', item: 'Discontinued medication', time: '2 days ago', type: 'delete' }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'create': return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'update': return <Activity className="h-4 w-4 text-blue-600" />;
      case 'delete': return <Activity className="h-4 w-4 text-red-600" />;
      case 'message': return <MessageSquare className="h-4 w-4 text-purple-600" />;
      default: return <Activity className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl text-gray-900 mb-2">Welcome back, Admin</h1>
        <p className="text-gray-600">Here's what's happening with your pharmaceutical website today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="border-0 shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm text-gray-600">{stat.title}</CardTitle>
                <div className={`w-8 h-8 ${stat.bgColor} rounded-full flex items-center justify-center`}>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl text-gray-900 mb-1">{stat.value}</div>
                <p className="text-xs text-gray-600">{stat.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-gray-900">Recent Activity</CardTitle>
            <CardDescription>Latest actions and updates on your website</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50">
                  {getActivityIcon(activity.type)}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-600 truncate">{activity.item}</p>
                  </div>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-gray-900">Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg text-left transition-colors">
                <Package className="h-6 w-6 text-blue-600 mb-2" />
                <div className="text-sm text-gray-900">Add Product</div>
                <div className="text-xs text-gray-600">Create new pharmaceutical product</div>
              </button>
              
              <button className="p-4 bg-green-50 hover:bg-green-100 rounded-lg text-left transition-colors">
                <MessageSquare className="h-6 w-6 text-green-600 mb-2" />
                <div className="text-sm text-gray-900">View Messages</div>
                <div className="text-xs text-gray-600">Check customer inquiries</div>
              </button>
              
              <button className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg text-left transition-colors">
                <Building className="h-6 w-6 text-purple-600 mb-2" />
                <div className="text-sm text-gray-900">Manage Company</div>
                <div className="text-xs text-gray-600">Update company information</div>
              </button>
              
              <button className="p-4 bg-orange-50 hover:bg-orange-100 rounded-lg text-left transition-colors">
                <Users className="h-6 w-6 text-orange-600 mb-2" />
                <div className="text-sm text-gray-900">User Analytics</div>
                <div className="text-xs text-gray-600">View website statistics</div>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
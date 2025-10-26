'use client';

import { DashboardLayout } from '@/components/DashboardLayout';
import { motion } from 'framer-motion';
import { Video, Image, Users, Link as LinkIcon, TrendingUp, Activity } from 'lucide-react';

interface StatCard {
  title: string;
  value: string;
  change: string;
  icon: React.ElementType;
  color: string;
}

const stats: StatCard[] = [
  {
    title: 'Total Videos',
    value: '234',
    change: '+12.5%',
    icon: Video,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'Backgrounds',
    value: '89',
    change: '+8.2%',
    icon: Image,
    color: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Accounts',
    value: '45',
    change: '+3.1%',
    icon: Users,
    color: 'from-green-500 to-emerald-500',
  },
  {
    title: 'Links',
    value: '156',
    change: '+15.3%',
    icon: LinkIcon,
    color: 'from-orange-500 to-red-500',
  },
];

const recentActivity = [
  { action: 'New video uploaded', time: '2 minutes ago', type: 'video' },
  { action: 'Account added', time: '15 minutes ago', type: 'account' },
  { action: 'Background image added', time: '1 hour ago', type: 'image' },
  { action: 'Link created', time: '2 hours ago', type: 'link' },
  { action: 'Note created', time: '3 hours ago', type: 'note' },
];

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening today.</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-strong rounded-xl p-6 border border-white/10 hover:border-primary/30 transition-all group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex items-center gap-1 text-success text-sm font-medium">
                    <TrendingUp className="w-4 h-4" />
                    {stat.change}
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-1">{stat.value}</h3>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-2 glass-strong rounded-xl p-6 border border-white/10"
          >
            <div className="flex items-center gap-3 mb-6">
              <Activity className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-bold">Recent Activity</h2>
            </div>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                  className="flex items-center justify-between p-4 rounded-lg bg-background/30 hover:bg-background/50 transition-colors"
                >
                  <div>
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">{activity.time}</p>
                  </div>
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === 'video' ? 'bg-blue-500' :
                    activity.type === 'account' ? 'bg-green-500' :
                    activity.type === 'image' ? 'bg-purple-500' :
                    activity.type === 'link' ? 'bg-orange-500' :
                    'bg-gray-500'
                  }`} />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="glass-strong rounded-xl p-6 border border-white/10"
          >
            <h2 className="text-xl font-bold mb-6">Quick Stats</h2>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Storage Used</span>
                  <span className="text-sm font-medium">65%</span>
                </div>
                <div className="w-full h-2 bg-background/50 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '65%' }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="h-full bg-gradient-to-r from-primary to-accent"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Active Automations</span>
                  <span className="text-sm font-medium">80%</span>
                </div>
                <div className="w-full h-2 bg-background/50 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '80%' }}
                    transition={{ duration: 1, delay: 0.9 }}
                    className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Task Completion</span>
                  <span className="text-sm font-medium">92%</span>
                </div>
                <div className="w-full h-2 bg-background/50 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '92%' }}
                    transition={{ duration: 1, delay: 1 }}
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
}

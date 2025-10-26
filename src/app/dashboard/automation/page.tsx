'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { motion } from 'framer-motion';
import { Play, Pause, Square, Activity, Zap } from 'lucide-react';

type AutomationStatus = 'idle' | 'running' | 'paused';

export default function AutomationPage() {
  const [status, setStatus] = useState<AutomationStatus>('idle');
  const [progress, setProgress] = useState(0);
  const [tasksCompleted, setTasksCompleted] = useState(0);

  const handleStart = () => {
    setStatus('running');
    // Simulate progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setStatus('idle');
          return 100;
        }
        return prev + 2;
      });
      setTasksCompleted((prev) => prev + 1);
    }, 500);
  };

  const handlePause = () => {
    setStatus('paused');
  };

  const handleStop = () => {
    setStatus('idle');
    setProgress(0);
    setTasksCompleted(0);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold mb-2">Automation Control</h1>
          <p className="text-muted-foreground">Manage and monitor your automation workflows</p>
        </motion.div>

        {/* Status Display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="glass-strong rounded-xl p-8 border border-white/10 text-center"
        >
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent mb-6 glow-primary relative">
            {status === 'running' && (
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute inset-0 rounded-full bg-primary"
              />
            )}
            <Zap className="w-12 h-12 text-white relative z-10" />
          </div>

          <h2 className="text-2xl font-bold mb-2">
            {status === 'idle' && 'Automation Idle'}
            {status === 'running' && 'Automation Running'}
            {status === 'paused' && 'Automation Paused'}
          </h2>

          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
              status === 'idle'
                ? 'bg-muted text-muted-foreground'
                : status === 'running'
                ? 'bg-success/20 text-success animate-pulse'
                : 'bg-warning/20 text-warning'
            }`}
          >
            <div className={`w-2 h-2 rounded-full ${
              status === 'idle' ? 'bg-muted-foreground' :
              status === 'running' ? 'bg-success' :
              'bg-warning'
            }`} />
            {status === 'idle' && 'Ready to start'}
            {status === 'running' && 'Processing tasks...'}
            {status === 'paused' && 'Paused'}
          </div>
        </motion.div>

        {/* Control Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <button
            onClick={handleStart}
            disabled={status === 'running'}
            className="glass-strong rounded-xl p-8 border border-white/10 hover:border-success/50 transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-success/20 group-hover:bg-success/30 flex items-center justify-center transition-colors">
                <Play className="w-8 h-8 text-success" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">Start</h3>
                <p className="text-sm text-muted-foreground">Begin automation</p>
              </div>
            </div>
          </button>

          <button
            onClick={handlePause}
            disabled={status !== 'running'}
            className="glass-strong rounded-xl p-8 border border-white/10 hover:border-warning/50 transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-warning/20 group-hover:bg-warning/30 flex items-center justify-center transition-colors">
                <Pause className="w-8 h-8 text-warning" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">Pause</h3>
                <p className="text-sm text-muted-foreground">Pause automation</p>
              </div>
            </div>
          </button>

          <button
            onClick={handleStop}
            disabled={status === 'idle'}
            className="glass-strong rounded-xl p-8 border border-white/10 hover:border-destructive/50 transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-destructive/20 group-hover:bg-destructive/30 flex items-center justify-center transition-colors">
                <Square className="w-8 h-8 text-destructive" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">Stop</h3>
                <p className="text-sm text-muted-foreground">Stop automation</p>
              </div>
            </div>
          </button>
        </motion.div>

        {/* Progress Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-strong rounded-xl p-6 border border-white/10"
        >
          <div className="flex items-center gap-3 mb-6">
            <Activity className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-bold">Progress</h2>
          </div>

          <div className="space-y-6">
            {/* Progress Bar */}
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-muted-foreground">Overall Progress</span>
                <span className="text-sm font-medium">{progress}%</span>
              </div>
              <div className="w-full h-3 bg-background/50 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  className="h-full bg-gradient-to-r from-primary to-accent"
                />
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-background/30">
                <p className="text-sm text-muted-foreground mb-1">Tasks Completed</p>
                <p className="text-2xl font-bold">{tasksCompleted}</p>
              </div>
              <div className="p-4 rounded-lg bg-background/30">
                <p className="text-sm text-muted-foreground mb-1">Success Rate</p>
                <p className="text-2xl font-bold text-success">98.5%</p>
              </div>
              <div className="p-4 rounded-lg bg-background/30">
                <p className="text-sm text-muted-foreground mb-1">Estimated Time</p>
                <p className="text-2xl font-bold">
                  {status === 'running' ? `${Math.ceil((100 - progress) / 2)}s` : '--'}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Activity Log */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-strong rounded-xl p-6 border border-white/10"
        >
          <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {status !== 'idle' && (
              <>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-background/30">
                  <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                  <span className="text-sm">Processing automation tasks...</span>
                  <span className="text-xs text-muted-foreground ml-auto">Just now</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-background/30">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-sm">Connected to automation engine</span>
                  <span className="text-xs text-muted-foreground ml-auto">1m ago</span>
                </div>
              </>
            )}
            {status === 'idle' && (
              <div className="text-center py-8 text-muted-foreground">
                No recent activity. Start automation to see logs.
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}

'use client';

import { DashboardLayout } from '@/components/DashboardLayout';
import { motion } from 'framer-motion';
import { MessageCircle, ExternalLink } from 'lucide-react';

export default function TelegramPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold mb-2">Telegram</h1>
          <p className="text-muted-foreground">Connect with your team via Telegram</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="glass-strong rounded-xl p-8 border border-white/10 text-center"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 mb-6">
            <MessageCircle className="w-10 h-10 text-white" />
          </div>

          <h2 className="text-2xl font-bold mb-4">Telegram Integration</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            This section is ready for your Telegram chat integration. Add your Telegram widget or chat URL below.
          </p>

          <div className="aspect-video bg-background/30 rounded-lg border-2 border-dashed border-border flex items-center justify-center mb-6">
            <div className="text-center">
              <MessageCircle className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">Telegram Chat Placeholder</p>
              <p className="text-sm text-muted-foreground mt-2">
                Embed your Telegram chat widget here
              </p>
            </div>
          </div>

          <a
            href="https://telegram.org"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg text-white font-medium hover:opacity-90 transition-opacity"
          >
            Open Telegram
            <ExternalLink className="w-5 h-5" />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-strong rounded-xl p-6 border border-white/10"
        >
          <h3 className="text-lg font-bold mb-4">How to Connect</h3>
          <div className="space-y-3 text-sm text-muted-foreground">
            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 font-semibold text-primary">1</div>
              <p>Create a Telegram bot or get your chat widget code</p>
            </div>
            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 font-semibold text-primary">2</div>
              <p>Configure the widget settings in your Telegram bot settings</p>
            </div>
            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 font-semibold text-primary">3</div>
              <p>Embed the widget code in this page for seamless integration</p>
            </div>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}

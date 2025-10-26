'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { motion } from 'framer-motion';
import { Plus, ExternalLink, Trash2, Youtube, Instagram, Facebook } from 'lucide-react';
import { SiTiktok } from 'react-icons/si';

interface Link {
  id: string;
  url: string;
  platform: 'YouTube' | 'Instagram' | 'Facebook' | 'TikTok';
  title: string;
  dateAdded: string;
}

const platforms = ['YouTube', 'Instagram', 'Facebook', 'TikTok'] as const;

const getPlatformIcon = (platform: string) => {
  switch (platform) {
    case 'YouTube': return Youtube;
    case 'Instagram': return Instagram;
    case 'Facebook': return Facebook;
    case 'TikTok': return SiTiktok;
    default: return ExternalLink;
  }
};

const getPlatformColor = (platform: string) => {
  switch (platform) {
    case 'YouTube': return 'from-red-500 to-red-600';
    case 'Instagram': return 'from-pink-500 to-purple-500';
    case 'Facebook': return 'from-blue-500 to-blue-600';
    case 'TikTok': return 'from-black to-gray-800';
    default: return 'from-primary to-accent';
  }
};

export default function LinksPage() {
  const [links, setLinks] = useState<Link[]>([
    { id: '1', url: 'https://youtube.com/watch?v=example', platform: 'YouTube', title: 'Tutorial Video', dateAdded: '2025-10-20' },
    { id: '2', url: 'https://instagram.com/p/example', platform: 'Instagram', title: 'Instagram Post', dateAdded: '2025-10-19' },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [newLink, setNewLink] = useState({ url: '', platform: 'YouTube' as const, title: '' });

  const handleAddLink = (e: React.FormEvent) => {
    e.preventDefault();
    const link: Link = {
      id: Date.now().toString(),
      url: newLink.url,
      platform: newLink.platform,
      title: newLink.title,
      dateAdded: new Date().toISOString().split('T')[0],
    };
    setLinks((prev) => [link, ...prev]);
    setNewLink({ url: '', platform: 'YouTube', title: '' });
    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    setLinks((prev) => prev.filter((l) => l.id !== id));
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold mb-2">Links</h1>
            <p className="text-muted-foreground">Manage links across different platforms</p>
          </div>
          <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-accent rounded-lg text-white font-medium hover:opacity-90 transition-opacity">
            <Plus className="w-5 h-5" />
            Add Link
          </button>
        </motion.div>

        {showForm && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="glass-strong rounded-xl p-6 border border-white/10">
            <h2 className="text-xl font-bold mb-4">Add New Link</h2>
            <form onSubmit={handleAddLink} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Title</label>
                <input type="text" value={newLink.title} onChange={(e) => setNewLink({ ...newLink, title: e.target.value })} placeholder="Link title" className="w-full px-4 py-3 bg-background/50 border border-border rounded-lg focus:border-primary transition-colors" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">URL</label>
                <input type="url" value={newLink.url} onChange={(e) => setNewLink({ ...newLink, url: e.target.value })} placeholder="https://..." className="w-full px-4 py-3 bg-background/50 border border-border rounded-lg focus:border-primary transition-colors" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Platform</label>
                <select value={newLink.platform} onChange={(e) => setNewLink({ ...newLink, platform: e.target.value as any })} className="w-full px-4 py-3 bg-background/50 border border-border rounded-lg focus:border-primary transition-colors">
                  {platforms.map((platform) => (
                    <option key={platform} value={platform}>{platform}</option>
                  ))}
                </select>
              </div>
              <div className="flex gap-3">
                <button type="submit" className="flex-1 bg-gradient-to-r from-primary to-accent text-white py-3 rounded-lg font-medium hover:opacity-90 transition-opacity">Add Link</button>
                <button type="button" onClick={() => setShowForm(false)} className="px-6 py-3 bg-secondary rounded-lg font-medium hover:bg-secondary/80 transition-colors">Cancel</button>
              </div>
            </form>
          </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {links.map((link, index) => {
            const Icon = getPlatformIcon(link.platform);
            const colorClass = getPlatformColor(link.platform);
            return (
              <motion.div key={link.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }} className="glass-strong rounded-xl p-5 border border-white/10 hover:border-primary/30 transition-all group">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${colorClass} flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold mb-1 truncate">{link.title}</h3>
                    <p className="text-sm text-muted-foreground truncate mb-2">{link.url}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{link.platform}</span>
                      <span>•</span>
                      <span>{link.dateAdded}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <a href={link.url} target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-primary/20 rounded-lg transition-colors">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    <button onClick={() => handleDelete(link.id)} className="p-2 hover:bg-destructive/20 rounded-lg transition-colors text-destructive">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}

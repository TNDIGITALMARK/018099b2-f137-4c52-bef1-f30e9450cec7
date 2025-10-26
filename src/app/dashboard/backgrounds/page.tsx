'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { motion } from 'framer-motion';
import { Upload, Trash2, Download, Image as ImageIcon } from 'lucide-react';

interface Background {
  id: string;
  name: string;
  url: string;
  size: string;
  uploadDate: string;
}

export default function BackgroundsPage() {
  const [backgrounds, setBackgrounds] = useState<Background[]>([
    { id: '1', name: 'gradient-bg-1.jpg', url: 'https://via.placeholder.com/400x300/1e40af/60a5fa?text=Background+1', size: '2.3 MB', uploadDate: '2025-10-20' },
    { id: '2', name: 'abstract-pattern.png', url: 'https://via.placeholder.com/400x300/7c3aed/a78bfa?text=Background+2', size: '1.8 MB', uploadDate: '2025-10-19' },
    { id: '3', name: 'texture-dark.jpg', url: 'https://via.placeholder.com/400x300/059669/34d399?text=Background+3', size: '3.1 MB', uploadDate: '2025-10-18' },
  ]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        const newBg: Background = {
          id: Date.now().toString(),
          name: file.name,
          url: 'https://via.placeholder.com/400x300/ea580c/fb923c?text=New+Background',
          size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
          uploadDate: new Date().toISOString().split('T')[0],
        };
        setBackgrounds((prev) => [newBg, ...prev]);
      });
    }
  };

  const handleDelete = (id: string) => {
    setBackgrounds((prev) => prev.filter((bg) => bg.id !== id));
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
            <h1 className="text-3xl font-bold mb-2">Background Images</h1>
            <p className="text-muted-foreground">Upload and manage your background image library</p>
          </div>
          <label className="cursor-pointer">
            <input type="file" accept="image/*" multiple onChange={handleFileUpload} className="hidden" />
            <div className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-accent rounded-lg text-white font-medium hover:opacity-90 transition-opacity">
              <Upload className="w-5 h-5" />
              Upload Images
            </div>
          </label>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {backgrounds.map((bg, index) => (
            <motion.div
              key={bg.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="glass-strong rounded-xl overflow-hidden border border-white/10 hover:border-primary/30 transition-all group"
            >
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                  <ImageIcon className="w-12 h-12 text-white/50" />
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-2 truncate">{bg.name}</h3>
                <div className="flex justify-between text-sm text-muted-foreground mb-3">
                  <span>{bg.size}</span>
                  <span>{bg.uploadDate}</span>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 px-3 py-2 bg-primary/20 hover:bg-primary/30 rounded-lg transition-colors text-sm flex items-center justify-center gap-2">
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                  <button onClick={() => handleDelete(bg.id)} className="px-3 py-2 bg-destructive/20 hover:bg-destructive/30 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}

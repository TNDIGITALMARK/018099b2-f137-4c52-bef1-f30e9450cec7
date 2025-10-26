'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { motion } from 'framer-motion';
import { Upload, Play, Trash2, Download } from 'lucide-react';

interface Video {
  id: string;
  title: string;
  duration: string;
  uploadDate: string;
  thumbnail: string;
  size: string;
}

export default function VideosPage() {
  const [videos, setVideos] = useState<Video[]>([
    {
      id: '1',
      title: 'Introduction Video.mp4',
      duration: '2:34',
      uploadDate: '2025-10-20',
      thumbnail: 'https://via.placeholder.com/300x200/1e40af/60a5fa?text=Video+1',
      size: '45 MB',
    },
    {
      id: '2',
      title: 'Tutorial Part 1.mp4',
      duration: '5:12',
      uploadDate: '2025-10-19',
      thumbnail: 'https://via.placeholder.com/300x200/7c3aed/a78bfa?text=Video+2',
      size: '98 MB',
    },
    {
      id: '3',
      title: 'Demo Recording.mp4',
      duration: '8:45',
      uploadDate: '2025-10-18',
      thumbnail: 'https://via.placeholder.com/300x200/059669/34d399?text=Video+3',
      size: '156 MB',
    },
  ]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      // Simulate upload - in production, handle actual upload
      Array.from(files).forEach((file) => {
        const newVideo: Video = {
          id: Date.now().toString(),
          title: file.name,
          duration: '0:00',
          uploadDate: new Date().toISOString().split('T')[0],
          thumbnail: 'https://via.placeholder.com/300x200/ea580c/fb923c?text=New+Video',
          size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
        };
        setVideos((prev) => [newVideo, ...prev]);
      });
    }
  };

  const handleDelete = (id: string) => {
    setVideos((prev) => prev.filter((v) => v.id !== id));
    if (selectedVideo?.id === id) {
      setSelectedVideo(null);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold mb-2">Videos</h1>
            <p className="text-muted-foreground">Upload and manage your video library</p>
          </div>
          <label className="cursor-pointer">
            <input
              type="file"
              accept="video/*"
              multiple
              onChange={handleFileUpload}
              className="hidden"
            />
            <div className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-accent rounded-lg text-white font-medium hover:opacity-90 transition-opacity">
              <Upload className="w-5 h-5" />
              Upload Videos
            </div>
          </label>
        </motion.div>

        {/* Video Player Section */}
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-strong rounded-xl p-6 border border-white/10"
          >
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold">{selectedVideo.title}</h2>
              <button
                onClick={() => setSelectedVideo(null)}
                className="text-muted-foreground hover:text-foreground"
              >
                Close
              </button>
            </div>
            <div className="aspect-video bg-black rounded-lg flex items-center justify-center mb-4">
              <Play className="w-16 h-16 text-white/50" />
              <p className="text-white/50 ml-4">Video Player Placeholder</p>
            </div>
            <div className="flex gap-4 text-sm text-muted-foreground">
              <span>Duration: {selectedVideo.duration}</span>
              <span>Size: {selectedVideo.size}</span>
              <span>Uploaded: {selectedVideo.uploadDate}</span>
            </div>
          </motion.div>
        )}

        {/* Videos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-strong rounded-xl overflow-hidden border border-white/10 hover:border-primary/30 transition-all group"
            >
              <div
                className="relative aspect-video bg-gradient-to-br from-primary/20 to-accent/20 cursor-pointer"
                onClick={() => setSelectedVideo(video)}
              >
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                  <Play className="w-12 h-12 text-white opacity-80 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-2 truncate">{video.title}</h3>
                <div className="flex justify-between text-sm text-muted-foreground mb-3">
                  <span>{video.duration}</span>
                  <span>{video.size}</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedVideo(video)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-primary/20 hover:bg-primary/30 rounded-lg transition-colors text-sm"
                  >
                    <Play className="w-4 h-4" />
                    Play
                  </button>
                  <button className="px-3 py-2 bg-secondary hover:bg-secondary/80 rounded-lg transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(video.id)}
                    className="px-3 py-2 bg-destructive/20 hover:bg-destructive/30 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {videos.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass-strong rounded-xl p-12 border border-white/10 text-center"
          >
            <Upload className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2">No videos yet</h3>
            <p className="text-muted-foreground mb-4">Upload your first video to get started</p>
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  );
}

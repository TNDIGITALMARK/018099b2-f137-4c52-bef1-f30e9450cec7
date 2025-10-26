'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { motion } from 'framer-motion';
import { Plus, Trash2, Edit, Save } from 'lucide-react';

interface Note {
  id: string;
  title: string;
  content: string;
  dateCreated: string;
  dateModified: string;
}

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([
    { id: '1', title: 'Meeting Notes', content: 'Discussed project timeline and deliverables...', dateCreated: '2025-10-20', dateModified: '2025-10-20' },
    { id: '2', title: 'Ideas', content: 'New feature ideas for the app...', dateCreated: '2025-10-19', dateModified: '2025-10-19' },
  ]);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: 'New Note',
      content: '',
      dateCreated: new Date().toISOString().split('T')[0],
      dateModified: new Date().toISOString().split('T')[0],
    };
    setEditingNote(newNote);
    setIsCreating(true);
  };

  const handleSaveNote = () => {
    if (editingNote) {
      if (isCreating) {
        setNotes((prev) => [editingNote, ...prev]);
        setIsCreating(false);
      } else {
        setNotes((prev) => prev.map((n) => (n.id === editingNote.id ? { ...editingNote, dateModified: new Date().toISOString().split('T')[0] } : n)));
      }
      setEditingNote(null);
    }
  };

  const handleDeleteNote = (id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
    if (editingNote?.id === id) setEditingNote(null);
  };

  const handleEditNote = (note: Note) => {
    setEditingNote({ ...note });
    setIsCreating(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Notes</h1>
            <p className="text-muted-foreground">Create, edit, and organize your notes</p>
          </div>
          <button onClick={handleCreateNote} className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-accent rounded-lg text-white font-medium hover:opacity-90 transition-opacity">
            <Plus className="w-5 h-5" />
            New Note
          </button>
        </motion.div>

        {editingNote && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-strong rounded-xl p-6 border border-white/10">
            <div className="flex justify-between items-start mb-4">
              <input type="text" value={editingNote.title} onChange={(e) => setEditingNote({ ...editingNote, title: e.target.value })} className="text-2xl font-bold bg-transparent border-b border-transparent hover:border-primary focus:border-primary outline-none transition-colors flex-1" />
              <div className="flex gap-2">
                <button onClick={handleSaveNote} className="flex items-center gap-2 px-4 py-2 bg-success/20 hover:bg-success/30 rounded-lg transition-colors text-success">
                  <Save className="w-4 h-4" />
                  Save
                </button>
                <button onClick={() => { setEditingNote(null); setIsCreating(false); }} className="px-4 py-2 bg-secondary hover:bg-secondary/80 rounded-lg transition-colors">Cancel</button>
              </div>
            </div>
            <textarea value={editingNote.content} onChange={(e) => setEditingNote({ ...editingNote, content: e.target.value })} className="w-full h-64 bg-background/30 border border-border rounded-lg p-4 focus:border-primary outline-none transition-colors resize-none" placeholder="Start typing your note..." />
          </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {notes.map((note, index) => (
            <motion.div key={note.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="glass-strong rounded-xl p-5 border border-white/10 hover:border-primary/30 transition-all group">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-bold text-lg truncate flex-1">{note.title}</h3>
                <div className="flex gap-1">
                  <button onClick={() => handleEditNote(note)} className="p-2 hover:bg-primary/20 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDeleteNote(note.id)} className="p-2 hover:bg-destructive/20 rounded-lg transition-colors text-destructive opacity-0 group-hover:opacity-100">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-3 mb-3">{note.content || 'Empty note'}</p>
              <div className="text-xs text-muted-foreground">
                <span>Modified: {note.dateModified}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}

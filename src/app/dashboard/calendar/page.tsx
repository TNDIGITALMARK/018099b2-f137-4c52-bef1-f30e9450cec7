'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Plus, Clock } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  type: 'meeting' | 'task' | 'reminder';
}

const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate();
};

const getFirstDayOfMonth = (year: number, month: number) => {
  return new Date(year, month, 1).getDay();
};

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<Event[]>([
    { id: '1', title: 'Team Meeting', date: '2025-10-26', time: '10:00', type: 'meeting' },
    { id: '2', title: 'Project Deadline', date: '2025-10-28', time: '17:00', type: 'task' },
  ]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const previousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const getEventsForDate = (date: string) => {
    return events.filter((e) => e.date === date);
  };

  const formatDate = (day: number) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Calendar</h1>
            <p className="text-muted-foreground">Manage your schedule and events</p>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-accent rounded-lg text-white font-medium hover:opacity-90 transition-opacity">
            <Plus className="w-5 h-5" />
            Add Event
          </button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-2 glass-strong rounded-xl p-6 border border-white/10">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">{monthNames[month]} {year}</h2>
              <div className="flex gap-2">
                <button onClick={previousMonth} className="p-2 hover:bg-primary/20 rounded-lg transition-colors">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button onClick={nextMonth} className="p-2 hover:bg-primary/20 rounded-lg transition-colors">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-2">
              {dayNames.map((day) => (
                <div key={day} className="text-center text-sm font-semibold text-muted-foreground py-2">{day}</div>
              ))}
              {Array.from({ length: firstDay }).map((_, i) => (
                <div key={`empty-${i}`} />
              ))}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const dateStr = formatDate(day);
                const dayEvents = getEventsForDate(dateStr);
                const isToday = new Date().toDateString() === new Date(year, month, day).toDateString();

                return (
                  <motion.div key={day} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.01 }} onClick={() => setSelectedDate(dateStr)} className={`aspect-square p-2 rounded-lg cursor-pointer transition-all hover:bg-primary/20 ${isToday ? 'bg-primary/30 border border-primary' : 'bg-background/30'} ${selectedDate === dateStr ? 'ring-2 ring-accent' : ''}`}>
                    <div className="text-sm font-medium mb-1">{day}</div>
                    {dayEvents.length > 0 && (
                      <div className="flex gap-1">
                        {dayEvents.slice(0, 2).map((event) => (
                          <div key={event.id} className={`w-2 h-2 rounded-full ${event.type === 'meeting' ? 'bg-blue-500' : event.type === 'task' ? 'bg-green-500' : 'bg-orange-500'}`} />
                        ))}
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Events List */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-strong rounded-xl p-6 border border-white/10">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-bold">Upcoming Events</h3>
            </div>
            <div className="space-y-3">
              {events.map((event) => (
                <div key={event.id} className="p-3 rounded-lg bg-background/30 hover:bg-background/50 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className={`w-3 h-3 rounded-full mt-1 ${event.type === 'meeting' ? 'bg-blue-500' : event.type === 'task' ? 'bg-green-500' : 'bg-orange-500'}`} />
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1">{event.title}</h4>
                      <p className="text-xs text-muted-foreground">{event.date} at {event.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
}

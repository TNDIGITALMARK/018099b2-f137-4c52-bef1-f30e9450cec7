'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { motion } from 'framer-motion';
import { UserPlus, ExternalLink, Trash2, Instagram } from 'lucide-react';

interface Account {
  id: string;
  username: string;
  country: string;
  followers: string;
  status: 'active' | 'pending' | 'inactive';
}

const countries = ['Germany', 'United Kingdom', 'Spain', 'France'];

export default function AccountsPage() {
  const [accounts, setAccounts] = useState<Account[]>([
    { id: '1', username: '@photomaster_de', country: 'Germany', followers: '12.5K', status: 'active' },
    { id: '2', username: '@travel_uk', country: 'United Kingdom', followers: '8.3K', status: 'active' },
    { id: '3', username: '@foodie_es', country: 'Spain', followers: '15.7K', status: 'pending' },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [newAccount, setNewAccount] = useState({ username: '', country: 'Germany' });

  const handleAddAccount = (e: React.FormEvent) => {
    e.preventDefault();
    const account: Account = {
      id: Date.now().toString(),
      username: newAccount.username,
      country: newAccount.country,
      followers: '0',
      status: 'pending',
    };
    setAccounts((prev) => [account, ...prev]);
    setNewAccount({ username: '', country: 'Germany' });
    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    setAccounts((prev) => prev.filter((a) => a.id !== id));
  };

  const getInstagramUrl = (username: string) => {
    return `https://instagram.com/${username.replace('@', '')}`;
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
            <h1 className="text-3xl font-bold mb-2">Instagram Accounts</h1>
            <p className="text-muted-foreground">Manage your Instagram accounts by country</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-accent rounded-lg text-white font-medium hover:opacity-90 transition-opacity"
          >
            <UserPlus className="w-5 h-5" />
            Add Account
          </button>
        </motion.div>

        {/* Add Account Form */}
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="glass-strong rounded-xl p-6 border border-white/10"
          >
            <h2 className="text-xl font-bold mb-4">Add New Account</h2>
            <form onSubmit={handleAddAccount} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Instagram Username</label>
                <input
                  type="text"
                  value={newAccount.username}
                  onChange={(e) => setNewAccount({ ...newAccount, username: e.target.value })}
                  placeholder="@username"
                  className="w-full px-4 py-3 bg-background/50 border border-border rounded-lg focus:border-primary transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Country</label>
                <select
                  value={newAccount.country}
                  onChange={(e) => setNewAccount({ ...newAccount, country: e.target.value })}
                  className="w-full px-4 py-3 bg-background/50 border border-border rounded-lg focus:border-primary transition-colors"
                >
                  {countries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-primary to-accent text-white py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
                >
                  Add Account
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-6 py-3 bg-secondary rounded-lg font-medium hover:bg-secondary/80 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Accounts Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-strong rounded-xl border border-white/10 overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-background/30">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Username</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Country</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Followers</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/30">
                {accounts.map((account, index) => (
                  <motion.tr
                    key={account.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="hover:bg-background/20 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center">
                          <Instagram className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-medium">{account.username}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">{account.country}</td>
                    <td className="px-6 py-4 text-muted-foreground">{account.followers}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          account.status === 'active'
                            ? 'bg-success/20 text-success'
                            : account.status === 'pending'
                            ? 'bg-warning/20 text-warning'
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        {account.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        <a
                          href={getInstagramUrl(account.username)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 hover:bg-primary/20 rounded-lg transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                        <button
                          onClick={() => handleDelete(account.id)}
                          className="p-2 hover:bg-destructive/20 rounded-lg transition-colors text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {accounts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass-strong rounded-xl p-12 border border-white/10 text-center"
          >
            <Instagram className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2">No accounts yet</h3>
            <p className="text-muted-foreground mb-4">Add your first Instagram account to get started</p>
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  );
}

import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import {
  UserCheck,
  UserX,
  Clock,
  CheckCircle2,
  XCircle,
  Shield,
  AlertCircle,
  Loader2,
  Search,
  Filter,
  Mail,
  Calendar,
  GraduationCap,
  BookOpen,
  Users,
  RefreshCw
} from 'lucide-react';

const PermissionPanel = () => {
  const { user } = useContext(AuthContext);
  const [usersList, setUsersList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null); // stores userId being processed
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [filterTab, setFilterTab] = useState('pending'); // 'pending' | 'approved' | 'all'
  const [searchQuery, setSearchQuery] = useState('');

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('/api/admin/users');
      setUsersList(data);
    } catch (err) {
      setErrorMsg('Failed to load users list');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && user.role === 'admin') {
      fetchUsers();
    }
  }, [user]);

  // Access denial screen
  if (!user || user.role !== 'admin') {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-center space-y-4">
        <AlertCircle size={60} className="text-red-500 animate-bounce" />
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Access Denied</h2>
        <p className="text-gray-500 max-w-md">
          You must possess system-wide administrator privileges to access the Permission Panel.
        </p>
      </div>
    );
  }

  const handleApprove = async (u) => {
    setActionLoading(u._id);
    setErrorMsg('');
    setSuccessMsg('');
    try {
      await axios.put(`/api/admin/users/${u._id}`, { isApproved: true });
      setSuccessMsg(`${u.name} has been approved and can now log in.`);
      fetchUsers();
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Failed to approve user');
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (u) => {
    setActionLoading(u._id);
    setErrorMsg('');
    setSuccessMsg('');
    try {
      await axios.delete(`/api/admin/users/${u._id}`);
      setSuccessMsg(`${u.name}'s registration has been rejected and removed.`);
      fetchUsers();
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Failed to reject user');
    } finally {
      setActionLoading(null);
    }
  };

  // Filter users (exclude admins from permission panel)
  const nonAdminUsers = usersList.filter(u => u.role !== 'admin');

  const filteredUsers = nonAdminUsers.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          u.email.toLowerCase().includes(searchQuery.toLowerCase());
    if (filterTab === 'pending') return matchesSearch && !u.isApproved;
    if (filterTab === 'approved') return matchesSearch && u.isApproved;
    return matchesSearch; // 'all'
  });

  const pendingCount = nonAdminUsers.filter(u => !u.isApproved).length;
  const approvedCount = nonAdminUsers.filter(u => u.isApproved).length;

  const getRoleIcon = (role) => {
    if (role === 'teacher') return <BookOpen size={14} className="text-brandViolet" />;
    return <GraduationCap size={14} className="text-brandIndigo" />;
  };

  const getRoleBadgeClass = (role) => {
    if (role === 'teacher') return 'bg-purple-500/10 text-brandViolet border border-brandViolet/15';
    return 'bg-indigo-500/10 text-brandIndigo border border-brandIndigo/15';
  };

  return (
    <div className="space-y-8 pb-10">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-gray-900 via-amber-950/40 to-emerald-950/30 p-8 border border-white/5 shadow-2xl">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-amber-500/10 blur-[80px] pointer-events-none"></div>
        <div className="absolute -left-10 -bottom-10 h-32 w-32 rounded-full bg-emerald-500/10 blur-[60px] pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-4 uppercase">
              🔐 Access Control
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
              Permission Panel
            </h1>
            <p className="text-sm md:text-base text-gray-400 mt-2 max-w-2xl">
              Review and manage registration requests. Approve users to grant access or reject to deny entry.
            </p>
          </div>
          <button
            onClick={fetchUsers}
            className="self-start md:self-center flex items-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white rounded-xl font-semibold text-sm transition-all cursor-pointer"
          >
            <RefreshCw size={14} /> Refresh
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-5 shadow-sm flex items-center gap-4 hover:border-amber-500/30 transition-all duration-300">
          <div className="h-11 w-11 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
            <Clock size={22} />
          </div>
          <div>
            <span className="text-2xl font-extrabold text-gray-900 dark:text-white">{pendingCount}</span>
            <p className="text-xs text-gray-500 font-semibold mt-0.5">Pending Requests</p>
          </div>
        </div>

        <div className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-5 shadow-sm flex items-center gap-4 hover:border-emerald-500/30 transition-all duration-300">
          <div className="h-11 w-11 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
            <CheckCircle2 size={22} />
          </div>
          <div>
            <span className="text-2xl font-extrabold text-gray-900 dark:text-white">{approvedCount}</span>
            <p className="text-xs text-gray-500 font-semibold mt-0.5">Approved Users</p>
          </div>
        </div>

        <div className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-5 shadow-sm flex items-center gap-4 hover:border-brandIndigo/30 transition-all duration-300">
          <div className="h-11 w-11 rounded-xl bg-indigo-500/10 text-brandIndigo flex items-center justify-center">
            <Users size={22} />
          </div>
          <div>
            <span className="text-2xl font-extrabold text-gray-900 dark:text-white">{nonAdminUsers.length}</span>
            <p className="text-xs text-gray-500 font-semibold mt-0.5">Total Registrations</p>
          </div>
        </div>
      </div>

      {/* Toast Messages */}
      {errorMsg && (
        <div className="p-4 rounded-2xl bg-red-500/15 border border-red-500/25 text-red-200 text-sm font-medium flex items-center justify-between">
          <div className="flex items-center gap-2">
            <XCircle size={18} />
            <span>{errorMsg}</span>
          </div>
          <button onClick={() => setErrorMsg('')} className="text-red-300 hover:text-white text-xs font-bold">Dismiss</button>
        </div>
      )}
      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/25 text-emerald-200 text-sm font-medium flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={18} />
            <span>{successMsg}</span>
          </div>
          <button onClick={() => setSuccessMsg('')} className="text-emerald-300 hover:text-white text-xs font-bold">Dismiss</button>
        </div>
      )}

      {/* Filter Tabs & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-1">
          {[
            { key: 'pending', label: 'Pending', count: pendingCount, color: 'text-amber-500' },
            { key: 'approved', label: 'Approved', count: approvedCount, color: 'text-emerald-500' },
            { key: 'all', label: 'All', count: nonAdminUsers.length, color: 'text-gray-400' }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setFilterTab(tab.key)}
              className={`px-4 py-2 rounded-lg font-bold text-xs uppercase transition-all flex items-center gap-1.5 cursor-pointer ${
                filterTab === tab.key
                  ? 'bg-brandIndigo text-white shadow-sm'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
              }`}
            >
              {tab.label}
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                filterTab === tab.key ? 'bg-white/20 text-white' : 'bg-gray-200 dark:bg-gray-800 ' + tab.color
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        <div className="relative flex-1 max-w-sm">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
            <Search size={16} />
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name or email..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-800 dark:text-gray-100 outline-none focus:border-brandIndigo focus:ring-1 focus:ring-brandIndigo shadow-sm transition-all text-sm"
          />
        </div>
      </div>

      {/* User Request Cards */}
      {loading ? (
        <div className="flex h-40 items-center justify-center text-gray-500">
          <Loader2 size={24} className="animate-spin mr-2" />
          <span className="text-lg">Loading registration requests...</span>
        </div>
      ) : filteredUsers.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 dark:border-gray-800 p-16 text-center bg-white dark:bg-gray-900/40">
          {filterTab === 'pending' ? (
            <>
              <CheckCircle2 size={48} className="mx-auto text-emerald-500 mb-4" />
              <h3 className="font-bold text-lg text-gray-800 dark:text-gray-200">All Caught Up!</h3>
              <p className="text-sm text-gray-500 mt-2">No pending registration requests at this time.</p>
            </>
          ) : (
            <>
              <Users size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="font-bold text-lg text-gray-800 dark:text-gray-200">No Users Found</h3>
              <p className="text-sm text-gray-500 mt-2">Try a different search or filter.</p>
            </>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredUsers.map(u => (
            <div
              key={u._id}
              className={`group rounded-2xl bg-white dark:bg-gray-900 border p-5 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden ${
                u.isApproved
                  ? 'border-emerald-500/20 hover:border-emerald-500/40'
                  : 'border-amber-500/20 hover:border-amber-500/40'
              }`}
            >
              {/* Status Ribbon */}
              <div className={`absolute top-0 right-0 px-3 py-1 rounded-bl-xl text-[10px] font-bold uppercase ${
                u.isApproved
                  ? 'bg-emerald-500/10 text-emerald-500'
                  : 'bg-amber-500/10 text-amber-500 animate-pulse'
              }`}>
                {u.isApproved ? '✓ Approved' : '⏳ Pending'}
              </div>

              {/* User Info */}
              <div className="flex items-start gap-3 mt-2">
                <div className={`h-11 w-11 rounded-xl flex items-center justify-center text-white font-bold text-sm shrink-0 ${
                  u.isApproved
                    ? 'bg-gradient-to-br from-emerald-500 to-teal-600'
                    : 'bg-gradient-to-br from-amber-500 to-orange-600'
                }`}>
                  {u.name.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-gray-900 dark:text-white truncate">{u.name}</h3>
                  <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5 truncate">
                    <Mail size={11} />
                    <span className="truncate">{u.email}</span>
                  </div>
                </div>
              </div>

              {/* Meta Tags */}
              <div className="flex items-center gap-2 mt-4">
                <span className={`inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold uppercase rounded-full ${getRoleBadgeClass(u.role)}`}>
                  {getRoleIcon(u.role)}
                  {u.role}
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-1 text-[10px] font-medium text-gray-500 bg-gray-100 dark:bg-gray-800 rounded-full">
                  <Calendar size={10} />
                  {new Date(u.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
              </div>

              {/* Action Buttons */}
              {!u.isApproved && (
                <div className="flex items-center gap-3 mt-5 pt-4 border-t border-gray-100 dark:border-gray-800">
                  <button
                    onClick={() => handleApprove(u)}
                    disabled={actionLoading === u._id}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl text-xs transition-all cursor-pointer shadow-sm shadow-emerald-500/20 disabled:opacity-50"
                  >
                    {actionLoading === u._id ? (
                      <Loader2 size={14} className="animate-spin" />
                    ) : (
                      <>
                        <UserCheck size={14} />
                        Approve
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => handleReject(u)}
                    disabled={actionLoading === u._id}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-500 font-bold rounded-xl text-xs transition-all cursor-pointer border border-red-500/20 disabled:opacity-50"
                  >
                    {actionLoading === u._id ? (
                      <Loader2 size={14} className="animate-spin" />
                    ) : (
                      <>
                        <UserX size={14} />
                        Reject
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* Approved state - subtle indicator */}
              {u.isApproved && (
                <div className="flex items-center gap-2 mt-5 pt-4 border-t border-gray-100 dark:border-gray-800 text-xs text-emerald-500 font-semibold">
                  <CheckCircle2 size={14} />
                  Access granted — user can log in
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PermissionPanel;

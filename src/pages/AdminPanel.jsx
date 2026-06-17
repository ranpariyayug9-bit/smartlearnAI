import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import {
  Users,
  BookOpen,
  GraduationCap,
  UserCheck,
  Shield,
  Trash2,
  Edit3,
  Plus,
  Search,
  X,
  Check,
  Loader2,
  AlertCircle,
  FileCheck,
  Calendar,
  Grid,
  Filter
} from 'lucide-react';

const AdminPanel = () => {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState(null);
  const [recentUsers, setRecentUsers] = useState([]);
  const [recentCourses, setRecentCourses] = useState([]);
  
  // Users tab state
  const [usersList, setUsersList] = useState([]);
  const [userSearch, setUserSearch] = useState('');
  const [userRoleFilter, setUserRoleFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [showDeleteUserModal, setShowDeleteUserModal] = useState(false);
  const [editUserName, setEditUserName] = useState('');
  const [editUserEmail, setEditUserEmail] = useState('');
  const [editUserRole, setEditUserRole] = useState('student');
  const [editUserApproved, setEditUserApproved] = useState(false);
  const [userActionLoading, setUserActionLoading] = useState(false);

  // Courses tab state
  const [coursesList, setCoursesList] = useState([]);
  const [courseSearch, setCourseSearch] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showCreateCourseModal, setShowCreateCourseModal] = useState(false);
  const [showDeleteCourseModal, setShowDeleteCourseModal] = useState(false);
  
  // Create Course form state
  const [newCourseTitle, setNewCourseTitle] = useState('');
  const [newCourseDesc, setNewCourseDesc] = useState('');
  const [newCourseTeacher, setNewCourseTeacher] = useState('');
  const [newCourseCategory, setNewCourseCategory] = useState('Programming');
  const [newCourseLevel, setNewCourseLevel] = useState('Beginner');
  const [newCourseDuration, setNewCourseDuration] = useState('6 weeks');
  const [newCourseColor, setNewCourseColor] = useState('#6366f1');
  const [courseActionLoading, setCourseActionLoading] = useState(false);

  const [loadingStats, setLoadingStats] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [loadingCourses, setLoadingCourses] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Fetch admin dashboard stats
  const fetchStats = async () => {
    setLoadingStats(true);
    try {
      const { data } = await axios.get('/api/admin/stats');
      setStats(data.stats);
      setRecentUsers(data.recentUsers);
      setRecentCourses(data.recentCourses);
    } catch (err) {
      console.error(err);
      setErrorMsg('Failed to load dashboard metrics');
    } finally {
      setLoadingStats(false);
    }
  };

  // Fetch users list
  const fetchUsers = async () => {
    setLoadingUsers(true);
    try {
      const { data } = await axios.get('/api/admin/users');
      setUsersList(data);
    } catch (err) {
      console.error(err);
      setErrorMsg('Failed to fetch users directory');
    } finally {
      setLoadingUsers(false);
    }
  };

  // Fetch courses list
  const fetchCourses = async () => {
    setLoadingCourses(true);
    try {
      const { data } = await axios.get('/api/courses');
      setCoursesList(data);
    } catch (err) {
      console.error(err);
      setErrorMsg('Failed to load course list');
    } finally {
      setLoadingCourses(false);
    }
  };

  useEffect(() => {
    if (user && user.role === 'admin') {
      fetchStats();
    }
  }, [user]);

  useEffect(() => {
    if (activeTab === 'users') {
      fetchUsers();
    } else if (activeTab === 'courses') {
      fetchCourses();
      fetchUsers(); // also fetch users to populate teacher list
    } else if (activeTab === 'overview') {
      fetchStats();
    }
  }, [activeTab]);

  if (!user || user.role !== 'admin') {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-center space-y-4">
        <AlertCircle size={60} className="text-red-500 animate-bounce" />
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Access Denied</h2>
        <p className="text-gray-500 max-w-md">
          You must possess system-wide administrator privileges to enter this secure panel.
        </p>
      </div>
    );
  }

  // Handle Edit User Modal trigger
  const handleOpenEditUser = (u) => {
    setSelectedUser(u);
    setEditUserName(u.name);
    setEditUserEmail(u.email);
    setEditUserRole(u.role);
    setEditUserApproved(u.isApproved || false);
    setShowEditUserModal(true);
  };

  // Update user in DB
  const handleUpdateUser = async (e) => {
    e.preventDefault();
    setUserActionLoading(true);
    setErrorMsg('');
    try {
      await axios.put(`/api/admin/users/${selectedUser._id}`, {
        name: editUserName,
        email: editUserEmail,
        role: editUserRole,
        isApproved: editUserRole === 'admin' ? true : editUserApproved
      });
      setShowEditUserModal(false);
      fetchUsers();
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Failed to update user');
    } finally {
      setUserActionLoading(false);
    }
  };

  // Handle Delete User Modal trigger
  const handleOpenDeleteUser = (u) => {
    setSelectedUser(u);
    setShowDeleteUserModal(true);
  };

  // Delete user from DB
  const handleDeleteUser = async () => {
    setUserActionLoading(true);
    setErrorMsg('');
    try {
      await axios.delete(`/api/admin/users/${selectedUser._id}`);
      setShowDeleteUserModal(false);
      fetchUsers();
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Failed to delete user');
    } finally {
      setUserActionLoading(false);
    }
  };

  const handleQuickApprove = async (u) => {
    try {
      await axios.put(`/api/admin/users/${u._id}`, { isApproved: true });
      fetchUsers();
      fetchStats();
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Failed to approve user');
    }
  };

  // Create course
  const handleCreateCourse = async (e) => {
    e.preventDefault();
    if (!newCourseTeacher) {
      setErrorMsg('Please select a teacher for the course.');
      return;
    }
    setCourseActionLoading(true);
    setErrorMsg('');
    try {
      await axios.post('/api/admin/courses', {
        title: newCourseTitle,
        description: newCourseDesc,
        teacher: newCourseTeacher,
        category: newCourseCategory,
        level: newCourseLevel,
        duration: newCourseDuration,
        color: newCourseColor
      });
      
      // Reset form fields
      setNewCourseTitle('');
      setNewCourseDesc('');
      setNewCourseTeacher('');
      setNewCourseCategory('Programming');
      setNewCourseLevel('Beginner');
      setNewCourseDuration('6 weeks');
      setNewCourseColor('#6366f1');
      setShowCreateCourseModal(false);
      fetchCourses();
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Failed to create course');
    } finally {
      setCourseActionLoading(false);
    }
  };

  // Handle Delete Course Modal trigger
  const handleOpenDeleteCourse = (c) => {
    setSelectedCourse(c);
    setShowDeleteCourseModal(true);
  };

  // Delete course
  const handleDeleteCourse = async () => {
    setCourseActionLoading(true);
    setErrorMsg('');
    try {
      await axios.delete(`/api/admin/courses/${selectedCourse._id}`);
      setShowDeleteCourseModal(false);
      fetchCourses();
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Failed to delete course');
    } finally {
      setCourseActionLoading(false);
    }
  };

  // Filter users
  const filteredUsers = usersList.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(userSearch.toLowerCase()) || 
                          u.email.toLowerCase().includes(userSearch.toLowerCase());
    const matchesFilter = userRoleFilter === 'all' || u.role === userRoleFilter;
    return matchesSearch && matchesFilter;
  });

  // Filter courses
  const filteredCourses = coursesList.filter(c => {
    return c.title.toLowerCase().includes(courseSearch.toLowerCase()) ||
           c.description.toLowerCase().includes(courseSearch.toLowerCase());
  });

  // Teachers list for course creation
  const teachersList = usersList.filter(u => u.role === 'teacher' || u.role === 'admin');

  const colorPalette = [
    { name: 'Indigo', value: '#6366f1' },
    { name: 'Violet', value: '#8b5cf6' },
    { name: 'Blue', value: '#3b82f6' },
    { name: 'Pink', value: '#ec4899' },
    { name: 'Emerald', value: '#10b981' },
    { name: 'Red', value: '#f43f5e' }
  ];

  return (
    <div className="space-y-8 pb-10">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-gray-900 via-indigo-950/80 to-purple-950/50 p-8 border border-white/5 shadow-2xl">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brandBlue/10 blur-[80px] pointer-events-none"></div>
        <div className="relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brandBlue/10 text-brandBlue border border-brandBlue/20 mb-4 uppercase">
            🛡️ Administrative Portal
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
            System Control Center
          </h1>
          <p className="text-sm md:text-base text-gray-400 mt-2 max-w-2xl">
            Welcome to the SmartLearn global operations dashboard. You can modify system users, grant administrative roles, update or delete class catalogs, and track real-time LMS portal metrics.
          </p>
        </div>
      </div>

      {/* Error Message Toast */}
      {errorMsg && (
        <div className="p-4 rounded-2xl bg-red-500/15 border border-red-500/25 text-red-200 text-sm font-medium flex items-center justify-between animate-shake">
          <div className="flex items-center gap-2">
            <AlertCircle size={18} />
            <span>{errorMsg}</span>
          </div>
          <button onClick={() => setErrorMsg('')} className="text-red-300 hover:text-white">
            <X size={16} />
          </button>
        </div>
      )}

      {/* Tabs Menu */}
      <div className="flex border-b border-gray-200 dark:border-gray-800 gap-6">
        <button
          onClick={() => setActiveTab('overview')}
          className={`pb-4 text-sm font-bold transition-all relative ${
            activeTab === 'overview'
              ? 'text-brandIndigo'
              : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          Overview Statistics
          {activeTab === 'overview' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brandIndigo rounded-full" />
          )}
        </button>
        <button
          onClick={() => setActiveTab('users')}
          className={`pb-4 text-sm font-bold transition-all relative ${
            activeTab === 'users'
              ? 'text-brandIndigo'
              : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          User Accounts Directory
          {activeTab === 'users' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brandIndigo rounded-full" />
          )}
        </button>
        <button
          onClick={() => setActiveTab('courses')}
          className={`pb-4 text-sm font-bold transition-all relative ${
            activeTab === 'courses'
              ? 'text-brandIndigo'
              : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          Course Catalog Manager
          {activeTab === 'courses' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brandIndigo rounded-full" />
          )}
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Stats Grid */}
          {loadingStats ? (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map(n => (
                <div key={n} className="h-28 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Total Users */}
              <div className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-6 shadow-sm flex items-center gap-4 hover:border-brandIndigo/30 transition-all duration-300">
                <div className="h-12 w-12 rounded-xl bg-indigo-500/10 text-brandIndigo flex items-center justify-center">
                  <Users size={24} />
                </div>
                <div>
                  <span className="text-3xl font-extrabold text-gray-900 dark:text-white">{stats?.totalUsers || 0}</span>
                  <p className="text-xs text-gray-500 font-semibold mt-0.5">Global Users Accounts</p>
                </div>
              </div>

              {/* Students */}
              <div className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-6 shadow-sm flex items-center gap-4 hover:border-brandViolet/30 transition-all duration-300">
                <div className="h-12 w-12 rounded-xl bg-purple-500/10 text-brandViolet flex items-center justify-center">
                  <GraduationCap size={24} />
                </div>
                <div>
                  <span className="text-3xl font-extrabold text-gray-900 dark:text-white">{stats?.totalStudents || 0}</span>
                  <p className="text-xs text-gray-500 font-semibold mt-0.5">Enrolled Students</p>
                </div>
              </div>

              {/* Teachers */}
              <div className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-6 shadow-sm flex items-center gap-4 hover:border-brandBlue/30 transition-all duration-300">
                <div className="h-12 w-12 rounded-xl bg-blue-500/10 text-brandBlue flex items-center justify-center">
                  <UserCheck size={24} />
                </div>
                <div>
                  <span className="text-3xl font-extrabold text-gray-900 dark:text-white">{stats?.totalTeachers || 0}</span>
                  <p className="text-xs text-gray-500 font-semibold mt-0.5">Registered Instructors</p>
                </div>
              </div>

              {/* Courses */}
              <div className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-6 shadow-sm flex items-center gap-4 hover:border-emerald-500/30 transition-all duration-300">
                <div className="h-12 w-12 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                  <BookOpen size={24} />
                </div>
                <div>
                  <span className="text-3xl font-extrabold text-gray-900 dark:text-white">{stats?.totalCourses || 0}</span>
                  <p className="text-xs text-gray-500 font-semibold mt-0.5">Total active courses</p>
                </div>
              </div>
            </div>
          )}

          {/* Tables side-by-side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent users list */}
            <div className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-6 shadow-sm space-y-4">
              <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2 border-b border-gray-100 dark:border-gray-800 pb-3">
                <Shield size={18} className="text-brandIndigo" />
                Recent Registered Accounts
              </h3>
              {loadingStats ? (
                <div className="space-y-3">
                  {[1, 2, 3].map(n => <div key={n} className="h-12 bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse" />)}
                </div>
              ) : recentUsers.length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-6">No users found.</p>
              ) : (
                <div className="space-y-3">
                  {recentUsers.map(ru => (
                    <div key={ru._id} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800/40 text-sm">
                      <div>
                        <p className="font-bold text-gray-900 dark:text-white">{ru.name}</p>
                        <p className="text-xs text-gray-500 truncate max-w-[200px] md:max-w-xs">{ru.email}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                          ru.role === 'admin' 
                            ? 'bg-blue-500/10 text-brandBlue' 
                            : ru.role === 'teacher' 
                              ? 'bg-purple-500/10 text-brandViolet' 
                              : 'bg-indigo-500/10 text-brandIndigo'
                        }`}>
                          {ru.role}
                        </span>
                        <span className="text-[10px] text-gray-500 font-medium">
                          {new Date(ru.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Recent courses list */}
            <div className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-6 shadow-sm space-y-4">
              <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2 border-b border-gray-100 dark:border-gray-800 pb-3">
                <BookOpen size={18} className="text-brandViolet" />
                Newly Created Courses
              </h3>
              {loadingStats ? (
                <div className="space-y-3">
                  {[1, 2, 3].map(n => <div key={n} className="h-12 bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse" />)}
                </div>
              ) : recentCourses.length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-6">No courses launched yet.</p>
              ) : (
                <div className="space-y-3">
                  {recentCourses.map(rc => (
                    <div key={rc._id} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800/40 text-sm">
                      <div>
                        <p className="font-bold text-gray-900 dark:text-white truncate max-w-[200px]">{rc.title}</p>
                        <p className="text-xs text-gray-500 font-semibold">
                          Taught by: <span className="text-indigo-400">{rc.teacher?.name || 'Assigned Instructor'}</span>
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] bg-indigo-500/10 text-brandIndigo px-2 py-0.5 rounded font-bold">
                          {rc.category}
                        </span>
                        <span className="text-[10px] text-gray-500 font-semibold">
                          {rc.students?.length || 0} students
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'users' && (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                <Search size={18} />
              </span>
              <input
                type="text"
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                placeholder="Search user by name, email..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-800 dark:text-gray-100 outline-none focus:border-brandIndigo focus:ring-1 focus:ring-brandIndigo shadow-sm transition-all text-sm"
              />
            </div>

            <div className="flex items-center gap-2 text-sm">
              <Filter size={16} className="text-gray-400" />
              <span className="font-semibold text-gray-500">Filter Role:</span>
              <div className="flex bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-1">
                {['all', 'student', 'teacher', 'admin'].map(role => (
                  <button
                    key={role}
                    onClick={() => setUserRoleFilter(role)}
                    className={`px-3 py-1 rounded-lg font-bold text-xs uppercase transition-all ${
                      userRoleFilter === role
                        ? 'bg-brandIndigo text-white shadow-sm'
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Users Directory Table */}
          {loadingUsers ? (
            <div className="flex h-40 items-center justify-center text-gray-500">
              <div className="animate-pulse text-lg">Fetching users catalog directory...</div>
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-gray-300 dark:border-gray-800 p-12 text-center bg-white dark:bg-gray-900/40">
              <Users size={40} className="mx-auto text-gray-400 mb-3" />
              <h3 className="font-semibold text-gray-800 dark:text-gray-200">No users match your criteria</h3>
              <p className="text-sm text-gray-500 mt-1">Try resetting the filter or using another search word.</p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
              <table className="w-full text-left border-collapse bg-white dark:bg-gray-900 text-sm">
                <thead>
                  <tr className="border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/60 font-semibold text-gray-600 dark:text-gray-400 text-xs uppercase">
                    <th className="py-4 px-6">Name</th>
                    <th className="py-4 px-6">Email Address</th>
                    <th className="py-4 px-6">Assigned Role</th>
                    <th className="py-4 px-6">Status</th>
                    <th className="py-4 px-6">Joined Date</th>
                    <th className="py-4 px-6 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800/80">
                  {filteredUsers.map(u => (
                    <tr key={u._id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors">
                      <td className="py-4 px-6 font-bold text-gray-900 dark:text-white">{u.name}</td>
                      <td className="py-4 px-6 text-gray-500 dark:text-gray-400 font-medium">{u.email}</td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex px-2.5 py-1 text-[10px] font-bold uppercase rounded-full ${
                          u.role === 'admin'
                            ? 'bg-blue-500/10 text-brandBlue border border-brandBlue/15'
                            : u.role === 'teacher'
                              ? 'bg-purple-500/10 text-brandViolet border border-brandViolet/15'
                              : 'bg-indigo-500/10 text-brandIndigo border border-brandIndigo/15'
                        }`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        {u.role === 'admin' ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold uppercase rounded-full bg-blue-500/10 text-brandBlue border border-brandBlue/15">
                            Auto-Approved
                          </span>
                        ) : u.isApproved ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold uppercase rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/15">
                            <Check size={10} /> Approved
                          </span>
                        ) : (
                          <div className="flex items-center gap-2">
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold uppercase rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/15">
                              Pending
                            </span>
                            <button
                              onClick={() => handleQuickApprove(u)}
                              className="p-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 border border-emerald-500/20 transition-all font-semibold text-xs flex items-center gap-0.5 cursor-pointer"
                              title="Approve Instantly"
                            >
                              <Check size={12} /> Approve
                            </button>
                          </div>
                        )}
                      </td>
                      <td className="py-4 px-6 text-gray-500 font-medium">
                        {new Date(u.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-center gap-3">
                          <button
                            onClick={() => handleOpenEditUser(u)}
                            className="p-1.5 rounded-lg text-gray-400 hover:text-brandIndigo hover:bg-brandIndigo/5 transition-all"
                            title="Edit Role & Details"
                          >
                            <Edit3 size={16} />
                          </button>
                          <button
                            onClick={() => handleOpenDeleteUser(u)}
                            className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-500/5 transition-all"
                            title="Delete User"
                            disabled={u._id === user._id}
                          >
                            <Trash2 size={16} className={u._id === user._id ? 'opacity-30 cursor-not-allowed' : ''} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {activeTab === 'courses' && (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <Search size={18} />
              </span>
              <input
                type="text"
                value={courseSearch}
                onChange={(e) => setCourseSearch(e.target.value)}
                placeholder="Search course title, description..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-800 dark:text-gray-100 outline-none focus:border-brandIndigo focus:ring-1 focus:ring-brandIndigo shadow-sm transition-all text-sm"
              />
            </div>

            <button
              onClick={() => setShowCreateCourseModal(true)}
              className="glow-btn flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-brandIndigo to-brandViolet text-white font-bold rounded-xl shadow-lg shadow-indigo-500/10 cursor-pointer text-sm"
            >
              <Plus size={16} />
              Create Course
            </button>
          </div>

          {/* Courses Manager List */}
          {loadingCourses ? (
            <div className="flex h-40 items-center justify-center text-gray-500">
              <div className="animate-pulse text-lg">Loading course catalog list...</div>
            </div>
          ) : filteredCourses.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-gray-300 dark:border-gray-800 p-12 text-center bg-white dark:bg-gray-900/40">
              <BookOpen size={40} className="mx-auto text-gray-400 mb-3" />
              <h3 className="font-semibold text-gray-800 dark:text-gray-200">No courses match your search</h3>
              <p className="text-sm text-gray-500 mt-1">Change the keyword or click "Create Course" to add a new course.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map(course => (
                <div key={course._id} className="group flex flex-col justify-between rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-6 shadow-sm hover:shadow-xl hover:border-brandIndigo/35 transition-all duration-300 relative">
                  <div>
                    {/* Header Banner */}
                    <div 
                      className="h-28 w-full rounded-xl flex items-center justify-center text-white font-black text-2xl mb-4 relative overflow-hidden group-hover:scale-[1.01] transition-transform"
                      style={{ background: `linear-gradient(135deg, ${course.color || '#6366f1'} 0%, #1e1b4b 100%)` }}
                    >
                      <span className="relative z-10">{course.title.substring(0, 3).toUpperCase()}</span>
                      <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px]" />
                    </div>

                    <h3 className="font-bold text-gray-900 dark:text-white truncate">{course.title}</h3>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-3 leading-relaxed">{course.description}</p>
                  </div>

                  <div className="mt-6 border-t border-gray-100 dark:border-gray-800/80 pt-4 flex flex-col gap-3">
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span className="bg-gray-100 dark:bg-gray-800 px-2.5 py-1 rounded-full font-bold">
                        {course.category}
                      </span>
                      <span className="font-semibold">{course.students?.length || 0} students enrolled</span>
                    </div>

                    <div className="flex items-center justify-between gap-4 text-xs mt-1">
                      <div className="font-medium text-gray-500 truncate">
                        Instructor: <span className="text-brandIndigo font-semibold">{course.teacher?.name || 'Assigned Instructor'}</span>
                      </div>
                      
                      <button
                        onClick={() => handleOpenDeleteCourse(course)}
                        className="flex items-center gap-1 text-red-500 hover:text-red-600 font-bold hover:bg-red-500/5 px-2.5 py-1 rounded-lg transition-all"
                      >
                        <Trash2 size={13} />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Edit User Modal */}
      {showEditUserModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="w-full max-w-md glass-panel p-6 rounded-3xl shadow-2xl relative border-brandIndigo/20">
            <button
              onClick={() => setShowEditUserModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-xl bg-brandIndigo/10 text-brandIndigo flex items-center justify-center">
                <Edit3 size={20} />
              </div>
              <h3 className="text-xl font-bold">Edit Account Details</h3>
            </div>

            <form onSubmit={handleUpdateUser} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-300">Name</label>
                <input
                  type="text"
                  required
                  value={editUserName}
                  onChange={(e) => setEditUserName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-900/50 border border-gray-800 text-gray-100 outline-none focus:border-brandIndigo focus:ring-1 focus:ring-brandIndigo"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-300">Email</label>
                <input
                  type="email"
                  required
                  value={editUserEmail}
                  onChange={(e) => setEditUserEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-900/50 border border-gray-800 text-gray-100 outline-none focus:border-brandIndigo focus:ring-1 focus:ring-brandIndigo"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-300">Role Authority</label>
                <select
                  value={editUserRole}
                  onChange={(e) => setEditUserRole(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-900/50 border border-gray-800 text-gray-100 outline-none focus:border-brandIndigo focus:ring-1 focus:ring-brandIndigo"
                >
                  <option value="student">Student (Standard User)</option>
                  <option value="teacher">Teacher (Instructor)</option>
                  <option value="admin">Admin (System Operations)</option>
                </select>
              </div>

              {editUserRole !== 'admin' && (
                <div className="flex items-center gap-2 py-2">
                  <input
                    type="checkbox"
                    id="editUserApproved"
                    checked={editUserApproved}
                    onChange={(e) => setEditUserApproved(e.target.checked)}
                    className="h-4.5 w-4.5 rounded border-gray-800 text-brandIndigo focus:ring-brandIndigo bg-gray-900/50 cursor-pointer"
                  />
                  <label htmlFor="editUserApproved" className="text-sm font-semibold text-gray-300 cursor-pointer select-none">
                    Approved Account (Permitted to Log In)
                  </label>
                </div>
              )}

              <button
                type="submit"
                disabled={userActionLoading}
                className="w-full py-2.5 bg-gradient-to-r from-brandIndigo to-brandViolet text-white font-bold rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow-md hover:shadow-indigo-500/10"
              >
                {userActionLoading ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <>
                    <Check size={16} />
                    Apply Modifications
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Delete User Confirm Modal */}
      {showDeleteUserModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="w-full max-w-sm glass-panel p-6 rounded-3xl shadow-2xl relative border-red-500/20">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="h-12 w-12 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center">
                <Trash2 size={24} />
              </div>
              
              <div>
                <h3 className="text-lg font-bold">Delete Registered Account?</h3>
                <p className="text-xs text-gray-400 mt-2 px-2">
                  Are you sure you want to delete <span className="font-bold text-white">{selectedUser?.name}</span>? 
                  This will permanently destroy all course enrolments, quiz results, progress states, and project submissions. This action is irreversible.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 w-full pt-2">
                <button
                  onClick={() => setShowDeleteUserModal(false)}
                  className="py-2.5 bg-gray-800 hover:bg-gray-700 text-gray-300 font-bold rounded-xl text-xs transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteUser}
                  disabled={userActionLoading}
                  className="py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs transition-all flex items-center justify-center gap-1.5"
                >
                  {userActionLoading ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    'Delete Forever'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Course Modal */}
      {showCreateCourseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="w-full max-w-md glass-panel p-6 rounded-3xl shadow-2xl relative border-brandIndigo/20 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowCreateCourseModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-xl bg-brandIndigo/10 text-brandIndigo flex items-center justify-center">
                <BookOpen size={20} />
              </div>
              <h3 className="text-xl font-bold">Launch Course Curriculum</h3>
            </div>

            <form onSubmit={handleCreateCourse} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-300">Course Title</label>
                <input
                  type="text"
                  required
                  value={newCourseTitle}
                  onChange={(e) => setNewCourseTitle(e.target.value)}
                  placeholder="e.g. Intermediate Algorithms & Complexities"
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-900/50 border border-gray-800 text-gray-100 outline-none focus:border-brandIndigo focus:ring-1 focus:ring-brandIndigo"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-300">Description</label>
                <textarea
                  required
                  rows={3}
                  value={newCourseDesc}
                  onChange={(e) => setNewCourseDesc(e.target.value)}
                  placeholder="Draft a comprehensive course roadmap outline..."
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-900/50 border border-gray-800 text-gray-100 outline-none focus:border-brandIndigo focus:ring-1 focus:ring-brandIndigo resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-300">Category</label>
                  <select
                    value={newCourseCategory}
                    onChange={(e) => setNewCourseCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-gray-900/50 border border-gray-800 text-gray-100 outline-none"
                  >
                    <option value="Programming">Programming</option>
                    <option value="Web Development">Web Dev</option>
                    <option value="Database">Database</option>
                    <option value="Networking">Networking</option>
                    <option value="Systems">Systems</option>
                    <option value="AI/ML">AI/ML</option>
                    <option value="Cloud">Cloud</option>
                    <option value="General">General</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-300">Level</label>
                  <select
                    value={newCourseLevel}
                    onChange={(e) => setNewCourseLevel(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-gray-900/50 border border-gray-800 text-gray-100 outline-none"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-300">Duration (approx.)</label>
                  <input
                    type="text"
                    required
                    value={newCourseDuration}
                    onChange={(e) => setNewCourseDuration(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl bg-gray-900/50 border border-gray-800 text-gray-100 outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-300">Assign Teacher</label>
                  <select
                    value={newCourseTeacher}
                    required
                    onChange={(e) => setNewCourseTeacher(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-gray-900/50 border border-gray-800 text-gray-100 outline-none focus:border-brandIndigo"
                  >
                    <option value="">-- Select Instructor --</option>
                    {teachersList.map(t => (
                      <option key={t._id} value={t._id}>{t.name} ({t.email})</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Theme Color Selector */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-300 block">Theme Color Palette</label>
                <div className="flex gap-2">
                  {colorPalette.map(color => (
                    <button
                      key={color.name}
                      type="button"
                      onClick={() => setNewCourseColor(color.value)}
                      className={`h-8 w-8 rounded-full border-2 transition-all flex items-center justify-center ${
                        newCourseColor === color.value 
                          ? 'border-white scale-110 shadow-md' 
                          : 'border-transparent hover:scale-105'
                      }`}
                      style={{ backgroundColor: color.value }}
                      title={color.name}
                    >
                      {newCourseColor === color.value && <Check size={14} className="text-white drop-shadow" />}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={courseActionLoading}
                className="w-full py-2.5 bg-gradient-to-r from-brandIndigo to-brandViolet text-white font-bold rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow-md hover:shadow-indigo-500/10"
              >
                {courseActionLoading ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <>
                    <Check size={16} />
                    Launch Course
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Delete Course Confirm Modal */}
      {showDeleteCourseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="w-full max-w-sm glass-panel p-6 rounded-3xl shadow-2xl relative border-red-500/20">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="h-12 w-12 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center">
                <Trash2 size={24} />
              </div>
              
              <div>
                <h3 className="text-lg font-bold">Destroy Course Catalog?</h3>
                <p className="text-xs text-gray-400 mt-2 px-2">
                  Are you absolutely sure you want to completely delete <span className="font-bold text-white">{selectedCourse?.title}</span>? 
                  This will unenroll all students, destroy all modules/lessons, remove assignments, erase quizzes, and delete student progress marks. This action cannot be undone.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 w-full pt-2">
                <button
                  onClick={() => setShowDeleteCourseModal(false)}
                  className="py-2.5 bg-gray-800 hover:bg-gray-700 text-gray-300 font-bold rounded-xl text-xs transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteCourse}
                  disabled={courseActionLoading}
                  className="py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs transition-all flex items-center justify-center gap-1.5"
                >
                  {courseActionLoading ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    'Delete Forever'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;

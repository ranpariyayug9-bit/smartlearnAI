import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Search, Plus, BookOpen, GraduationCap, X, Check, Loader2 } from 'lucide-react';

const Courses = () => {
  const { user } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Form states
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [createLoading, setCreateLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const [enrollLoading, setEnrollLoading] = useState({});

  const fetchCourses = async () => {
    try {
      const res = await axios.get('/api/courses');
      setCourses(res.data);
    } catch (err) {
      console.error('Error fetching courses:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleCreateCourse = async (e) => {
    e.preventDefault();
    setFormError('');
    
    if (!title || !description) {
      setFormError('Please fill in all fields');
      return;
    }

    setCreateLoading(true);
    try {
      await axios.post('/api/courses', { title, description });
      setTitle('');
      setDescription('');
      setShowCreateModal(false);
      fetchCourses();
    } catch (err) {
      setFormError(err.response?.data?.message || 'Failed to create course');
    } finally {
      setCreateLoading(false);
    }
  };

  const handleEnroll = async (courseId) => {
    setEnrollLoading(prev => ({ ...prev, [courseId]: true }));
    try {
      await axios.post(`/api/courses/${courseId}/enroll`);
      
      // Update local storage representation and states to immediate refresh
      if (user && user.enrolledCourses) {
        user.enrolledCourses.push(courseId);
        localStorage.setItem('smartlearn_user', JSON.stringify(user));
      }

      fetchCourses();
    } catch (err) {
      alert(err.response?.data?.message || 'Enrollment failed');
    } finally {
      setEnrollLoading(prev => ({ ...prev, [courseId]: false }));
    }
  };

  const filteredCourses = courses.filter(c => 
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header Panel */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">SmartLearn Catalog</h1>
          <p className="text-sm text-gray-500 mt-1">Explore existing classes or launch your own syllabuses.</p>
        </div>

        {(user.role === 'teacher' || user.role === 'admin') && (
          <button
            onClick={() => setShowCreateModal(true)}
            className="glow-btn flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-brandIndigo to-brandViolet text-white font-bold rounded-xl shadow-lg shadow-indigo-500/10 cursor-pointer"
          >
            <Plus size={18} />
            Create Course
          </button>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="relative max-w-md">
        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
          <Search size={18} />
        </span>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search courses by name, description..."
          className="w-full pl-10 pr-4 py-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-800 dark:text-gray-100 outline-none focus:border-brandIndigo focus:ring-1 focus:ring-brandIndigo shadow-sm transition-all"
        />
      </div>

      {/* Course List Grid */}
      {loading ? (
        <div className="flex h-40 items-center justify-center text-gray-500">
          <div className="animate-pulse text-lg">Loading course catalog...</div>
        </div>
      ) : filteredCourses.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 dark:border-gray-800 p-12 text-center bg-white dark:bg-gray-900/40">
          <BookOpen size={44} className="mx-auto text-gray-400 mb-3" />
          <h3 className="font-semibold text-gray-800 dark:text-gray-200">No courses match your query</h3>
          <p className="text-sm text-gray-500 mt-1">Try tweaking your search term or create a new course.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
          {filteredCourses.map(course => {
            const isEnrolled = course.students?.includes(user._id) || user.enrolledCourses?.includes(course._id);
            const isTeacher = course.teacher?._id === user._id || course.teacher === user._id;

            return (
              <div key={course._id} className="group flex flex-col justify-between rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-6 shadow-sm hover:shadow-xl hover:border-brandIndigo/35 transition-all duration-300">
                <div>
                  <div className="h-28 w-full rounded-xl bg-gradient-to-tr from-brandIndigo/20 via-brandViolet/10 to-brandBlue/20 flex items-center justify-center text-brandIndigo font-black text-2xl mb-4 group-hover:scale-[1.02] transition-transform">
                    {course.title.substring(0, 3).toUpperCase()}
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white truncate">{course.title}</h3>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-3 leading-relaxed">{course.description}</p>
                </div>

                <div className="mt-6 border-t border-gray-100 dark:border-gray-800/80 pt-4 flex flex-col gap-3">
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span className="bg-gray-100 dark:bg-gray-800 px-2.5 py-1 rounded-full font-medium">
                      By {course.teacher?.name || 'Instructor'}
                    </span>
                    <span>{course.students?.length || 0} students</span>
                  </div>

                  {user.role === 'student' ? (
                    isEnrolled ? (
                      <Link
                        to={`/courses/${course._id}`}
                        className="w-full py-2.5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-bold text-center text-sm rounded-xl transition-all"
                      >
                        Enter Classroom
                      </Link>
                    ) : (
                      <button
                        onClick={() => handleEnroll(course._id)}
                        disabled={enrollLoading[course._id]}
                        className="w-full flex items-center justify-center gap-1.5 py-2.5 bg-brandIndigo text-white font-bold text-sm rounded-xl hover:bg-indigo-600 transition-all cursor-pointer"
                      >
                        {enrollLoading[course._id] ? (
                          <Loader2 size={16} className="animate-spin" />
                        ) : (
                          <>
                            Enroll Course
                          </>
                        )}
                      </button>
                    )
                  ) : (
                    <Link
                      to={`/courses/${course._id}`}
                      className="w-full py-2.5 bg-brandViolet/10 text-brandViolet font-bold text-center text-sm rounded-xl hover:bg-brandViolet/20 transition-all"
                    >
                      {isTeacher ? 'Manage Course' : 'View Syllabus'}
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Create Course Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="w-full max-w-md glass-panel p-6 rounded-3xl shadow-2xl relative">
            <button
              onClick={() => setShowCreateModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-xl bg-brandIndigo/10 text-brandIndigo flex items-center justify-center">
                <GraduationCap size={20} />
              </div>
              <h3 className="text-xl font-bold">Create New Course</h3>
            </div>

            {formError && (
              <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-200 text-xs text-center">
                {formError}
              </div>
            )}

            <form onSubmit={handleCreateCourse} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-300">Course Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. JavaScript Frameworks 101"
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-900/50 border border-gray-800 text-gray-100 outline-none focus:border-brandIndigo focus:ring-1 focus:ring-brandIndigo"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-300">Description</label>
                <textarea
                  required
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide a detailed roadmap description for the course curriculum..."
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-900/50 border border-gray-800 text-gray-100 outline-none focus:border-brandIndigo focus:ring-1 focus:ring-brandIndigo resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={createLoading}
                className="w-full py-2.5 bg-gradient-to-r from-brandIndigo to-brandViolet text-white font-bold rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow-md hover:shadow-indigo-500/10"
              >
                {createLoading ? (
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
    </div>
  );
};

export default Courses;

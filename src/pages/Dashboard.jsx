import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { 
  BookOpen, 
  Award, 
  Sparkles, 
  Users, 
  FileCheck, 
  Video, 
  ArrowRight, 
  GraduationCap, 
  BarChart2, 
  CheckCircle,
  HelpCircle
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);
  const [quizResults, setQuizResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const coursesRes = await axios.get('/api/courses');
        setCourses(coursesRes.data);
        
        if (user.role === 'student') {
          const resultsRes = await axios.get('/api/quizzes/results/my-results');
          setQuizResults(resultsRes.data);
        }
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, [user]);

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center text-gray-500">
        <div className="animate-pulse text-lg">Loading your dashboard...</div>
      </div>
    );
  }

  // Filter courses based on role
  const enrolledCourses = courses.filter(c => 
    c.students?.includes(user._id) || user.enrolledCourses?.includes(c._id)
  );

  const teacherCourses = courses.filter(c => 
    c.teacher?._id === user._id || c.teacher === user._id
  );

  // Total student enrollments across teacher's courses
  const totalStudents = teacherCourses.reduce((acc, curr) => acc + (curr.students?.length || 0), 0);

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-900/60 via-purple-900/50 to-blue-900/40 p-8 border border-indigo-500/10 shadow-2xl">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brandViolet/20 blur-[60px] pointer-events-none"></div>
        <div className="relative z-10 max-w-2xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-4 capitalize">
            🎓 {user.role} Portal
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white leading-tight">
            Welcome back, <span className="text-gradient font-black">{user.name}</span>!
          </h1>
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 mt-2">
            {user.role === 'student' 
              ? 'Ready to boost your skills? Explore your enrolled courses, complete quizzes, and ask our AI study companion for help anytime.'
              : 'Create engaging course materials, generate smart AI-assisted tests, and manage your students’ submissions in one click.'}
          </p>
        </div>
      </div>

      {user.role === 'student' ? (
        // STUDENT DASHBOARD
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Enrolled Courses Grid (Col-Span 2) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <BookOpen size={22} className="text-brandIndigo" />
                My Enrolled Courses
              </h2>
              <Link to="/courses" className="text-sm font-semibold text-brandIndigo hover:text-indigo-400 flex items-center gap-1">
                Explore Courses <ArrowRight size={14} />
              </Link>
            </div>

            {enrolledCourses.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-gray-300 dark:border-gray-800 p-10 text-center bg-white dark:bg-gray-900/40">
                <BookOpen size={40} className="mx-auto text-gray-400 mb-3" />
                <h3 className="font-semibold text-gray-800 dark:text-gray-200">Not enrolled in any courses</h3>
                <p className="text-sm text-gray-500 mt-1 mb-4">Browse our catalog and pick a course to begin learning.</p>
                <Link to="/courses" className="inline-flex px-4 py-2 bg-brandIndigo text-white rounded-xl text-sm font-bold shadow-md hover:bg-indigo-600 transition-all">
                  Enroll Now
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {enrolledCourses.map(course => (
                  <div key={course._id} className="group rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800/80 p-5 shadow-sm hover:shadow-xl hover:border-brandIndigo/30 transition-all duration-300">
                    <div className="h-24 w-full rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/30 flex items-center justify-center text-brandIndigo font-black text-xl mb-4 group-hover:scale-[1.02] transition-transform">
                      {course.title.substring(0, 3).toUpperCase()}
                    </div>
                    <h3 className="font-bold text-gray-900 dark:text-white truncate">{course.title}</h3>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">{course.description}</p>
                    <div className="mt-4 flex items-center justify-between border-t border-gray-100 dark:border-gray-800/80 pt-4">
                      <span className="text-[10px] bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2.5 py-1 rounded-full font-medium">
                        By {course.teacher?.name || 'Instructor'}
                      </span>
                      <Link to={`/courses/${course._id}`} className="text-xs font-bold text-brandIndigo hover:text-indigo-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        Enter Class <ArrowRight size={12} />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar Analytics/Shortcuts (Col-Span 1) */}
          <div className="space-y-8">
            {/* Stats Block */}
            <div className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800/80 p-6 shadow-sm space-y-6">
              <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2 pb-2 border-b border-gray-100 dark:border-gray-800">
                <BarChart2 size={18} className="text-brandViolet" />
                Learning Progress
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/40">
                  <span className="text-2xl font-extrabold text-brandIndigo">{enrolledCourses.length}</span>
                  <p className="text-xs text-gray-500 mt-1">Enrolled Courses</p>
                </div>
                <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/40">
                  <span className="text-2xl font-extrabold text-brandViolet">{quizResults.length}</span>
                  <p className="text-xs text-gray-500 mt-1">Quizzes Taken</p>
                </div>
              </div>

              {/* Quick AI Study Link */}
              <Link to="/ai-assistant" className="glow-btn flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-brandIndigo to-brandViolet text-white font-bold text-sm rounded-xl shadow-md shadow-indigo-500/10">
                <Sparkles size={16} />
                Ask Study Assistant
              </Link>
            </div>

            {/* Quiz Scores Card */}
            <div className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800/80 p-6 shadow-sm space-y-4">
              <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2 pb-2 border-b border-gray-100 dark:border-gray-800">
                <Award size={18} className="text-brandBlue" />
                Recent Quiz Scores
              </h3>
              {quizResults.length === 0 ? (
                <p className="text-xs text-gray-500 text-center py-4">No quiz scores recorded yet.</p>
              ) : (
                <div className="space-y-3">
                  {quizResults.slice(0, 4).map(res => (
                    <div key={res._id} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800/40 text-xs">
                      <div className="font-semibold text-gray-800 dark:text-gray-200">
                        {res.quiz?.title || 'Course Quiz'}
                      </div>
                      <div className="font-bold text-brandBlue bg-blue-500/10 px-2 py-1 rounded">
                        {res.score}/{res.total}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        // TEACHER DASHBOARD
        <div className="space-y-8">
          {/* Analytics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-6 shadow-sm flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-indigo-500/10 text-brandIndigo flex items-center justify-center">
                <BookOpen size={24} />
              </div>
              <div>
                <span className="text-2xl font-extrabold text-gray-900 dark:text-white">{teacherCourses.length}</span>
                <p className="text-xs text-gray-500 font-medium mt-0.5">Total Courses Created</p>
              </div>
            </div>

            <div className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-6 shadow-sm flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-purple-500/10 text-brandViolet flex items-center justify-center">
                <Users size={24} />
              </div>
              <div>
                <span className="text-2xl font-extrabold text-gray-900 dark:text-white">{totalStudents}</span>
                <p className="text-xs text-gray-500 font-medium mt-0.5">Total Enrolled Students</p>
              </div>
            </div>

            <div className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-6 shadow-sm flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-blue-500/10 text-brandBlue flex items-center justify-center">
                <FileCheck size={24} />
              </div>
              <div>
                <span className="text-2xl font-extrabold text-gray-900 dark:text-white">Active</span>
                <p className="text-xs text-gray-500 font-medium mt-0.5">Assignments Status</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* My Created Courses Panel */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <GraduationCap size={22} className="text-brandIndigo" />
                  My Classrooms
                </h2>
                <Link to="/courses" className="inline-flex px-4 py-2 bg-brandIndigo text-white rounded-xl text-xs font-bold shadow-md hover:bg-indigo-600 transition-all">
                  Create New Course
                </Link>
              </div>

              {teacherCourses.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-gray-300 dark:border-gray-800 p-10 text-center bg-white dark:bg-gray-900/40">
                  <GraduationCap size={40} className="mx-auto text-gray-400 mb-3" />
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200">No courses created yet</h3>
                  <p className="text-sm text-gray-500 mt-1 mb-4">Launch your first educational syllabus program.</p>
                  <Link to="/courses" className="inline-flex px-4 py-2 bg-brandIndigo text-white rounded-xl text-sm font-bold shadow-md hover:bg-indigo-600 transition-all">
                    Create Course
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {teacherCourses.map(course => (
                    <div key={course._id} className="group rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800/80 p-5 shadow-sm hover:shadow-xl hover:border-brandIndigo/30 transition-all duration-300">
                      <div className="h-24 w-full rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/30 flex items-center justify-center text-brandIndigo font-black text-xl mb-4 group-hover:scale-[1.02] transition-transform">
                        {course.title.substring(0, 3).toUpperCase()}
                      </div>
                      <h3 className="font-bold text-gray-900 dark:text-white truncate">{course.title}</h3>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">{course.description}</p>
                      <div className="mt-4 flex items-center justify-between border-t border-gray-100 dark:border-gray-800/80 pt-4">
                        <span className="text-[10px] bg-gray-100 dark:bg-gray-800 text-indigo-500 dark:text-indigo-400 px-2.5 py-1 rounded-full font-medium">
                          {course.students?.length || 0} enrolled
                        </span>
                        <Link to={`/courses/${course._id}`} className="text-xs font-bold text-brandIndigo hover:text-indigo-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                          Manage Syllabus <ArrowRight size={12} />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* AI Tools Section */}
            <div className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-6 shadow-sm space-y-6">
              <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2 pb-2 border-b border-gray-100 dark:border-gray-800">
                <Sparkles size={18} className="text-brandViolet" />
                AI Toolset Section
              </h3>
              
              <p className="text-xs text-gray-500 leading-relaxed">
                SmartLearn is integrated with advanced Gemini AI triggers. Access these features directly from within any course management tabs:
              </p>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-indigo-500/5 border border-indigo-500/10 text-xs">
                  <h4 className="font-bold text-brandIndigo flex items-center gap-1">
                    <Sparkles size={14} /> AI Quiz Generator
                  </h4>
                  <p className="text-gray-500 mt-1">Upload lecture notes or syllabus contents to draft 5 instant multiple-choice questions.</p>
                </div>

                <div className="p-4 rounded-xl bg-purple-500/5 border border-purple-500/10 text-xs">
                  <h4 className="font-bold text-brandViolet flex items-center gap-1">
                    <Sparkles size={14} /> AI Notes Summarizer
                  </h4>
                  <p className="text-gray-500 mt-1">Generate concise summaries of PDF readings and study notes automatically.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

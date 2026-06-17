import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { 
  Play, 
  FileText, 
  Sparkles, 
  Plus, 
  Calendar, 
  CheckCircle2, 
  Upload, 
  Award, 
  User, 
  Clock, 
  ChevronRight,
  BookOpen,
  ArrowLeft,
  Loader2,
  Trash2
} from 'lucide-react';

const CourseDetail = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [activeTab, setActiveTab] = useState('syllabus'); // 'syllabus' | 'lessons' | 'assignments' | 'quizzes'
  const [loading, setLoading] = useState(true);

  // Active items
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  // Quiz running states
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScoreResult, setQuizScoreResult] = useState(null);
  const [myQuizResult, setMyQuizResult] = useState(null);

  // Modals & form state
  const [showLessModal, setShowLessModal] = useState(false);
  const [showAssModal, setShowAssModal] = useState(false);
  const [showQuizModal, setShowQuizModal] = useState(false);

  // Form inputs
  const [lessonTitle, setLessonTitle] = useState('');
  const [lessonDesc, setLessonDesc] = useState('');
  const [lessonVideo, setLessonVideo] = useState(null);
  const [lessonPdf, setLessonPdf] = useState(null);
  const [lessonSubmitLoading, setLessonSubmitLoading] = useState(false);

  const [assTitle, setAssTitle] = useState('');
  const [assDesc, setAssDesc] = useState('');
  const [assDueDate, setAssDueDate] = useState('');
  const [assSubmitLoading, setAssSubmitLoading] = useState(false);

  // Student assignment submission form
  const [subFile, setSubFile] = useState(null);
  const [mySubmission, setMySubmission] = useState(null);
  const [subLoading, setSubLoading] = useState(false);

  // Teacher submissions reviewing
  const [assignmentSubmissions, setAssignmentSubmissions] = useState([]);
  const [reviewSubId, setReviewSubId] = useState('');
  const [reviewGrade, setReviewGrade] = useState('');
  const [reviewFeedback, setReviewFeedback] = useState('');
  const [reviewLoading, setReviewLoading] = useState(false);

  // AI actions loaders
  const [aiSummaryLoading, setAiSummaryLoading] = useState(false);
  const [aiQuizText, setAiQuizText] = useState('');
  const [aiQuizTitle, setAiQuizTitle] = useState('');
  const [aiQuizLoading, setAiQuizLoading] = useState(false);
  const [aiQuizDraftQuestions, setAiQuizDraftQuestions] = useState([]);

  // Manual quiz inputs
  const [manualQuestions, setManualQuestions] = useState([
    { questionText: '', options: ['', '', '', ''], correctOptionIndex: 0 }
  ]);

  const fetchCourseData = async () => {
    try {
      const courseRes = await axios.get(`/api/courses/${id}`);
      setCourse(courseRes.data);

      const lessonsRes = await axios.get(`/api/lessons/course/${id}`);
      setLessons(lessonsRes.data);
      if (lessonsRes.data.length > 0 && !selectedLesson) {
        setSelectedLesson(lessonsRes.data[0]);
      }

      const assignmentsRes = await axios.get(`/api/assignments/course/${id}`);
      setAssignments(assignmentsRes.data);

      const quizzesRes = await axios.get(`/api/quizzes/course/${id}`);
      setQuizzes(quizzesRes.data);
    } catch (err) {
      console.error('Error loading course details:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourseData();
  }, [id]);

  // Load student submission when active assignment changes
  useEffect(() => {
    if (user.role === 'student' && selectedAssignment) {
      const fetchMySubmission = async () => {
        try {
          const res = await axios.get(`/api/assignments/${selectedAssignment._id}/my-submission`);
          setMySubmission(res.data);
        } catch (e) {
          setMySubmission(null);
        }
      };
      fetchMySubmission();
    } else if ((user.role === 'teacher' || user.role === 'admin') && selectedAssignment) {
      const fetchSubmissions = async () => {
        try {
          const res = await axios.get(`/api/assignments/${selectedAssignment._id}/submissions`);
          setAssignmentSubmissions(res.data);
        } catch (e) {
          setAssignmentSubmissions([]);
        }
      };
      fetchSubmissions();
    }
  }, [selectedAssignment, user]);

  // Load student quiz results when active quiz changes
  useEffect(() => {
    if (user.role === 'student' && selectedQuiz) {
      const fetchMyQuizResult = async () => {
        try {
          const res = await axios.get(`/api/quizzes/${selectedQuiz._id}/my-result`);
          setMyQuizResult(res.data);
          setQuizSubmitted(!!res.data);
        } catch (e) {
          setMyQuizResult(null);
          setQuizSubmitted(false);
        }
      };
      fetchMyQuizResult();
    }
    setQuizAnswers({});
    setQuizScoreResult(null);
  }, [selectedQuiz, user]);

  // AI Summarizer Trigger
  const handleAiSummarize = async () => {
    if (!selectedLesson) return;
    setAiSummaryLoading(true);
    try {
      const res = await axios.post('/api/ai/summarize', {
        lessonId: selectedLesson._id,
        pdfUrl: selectedLesson.pdfUrl,
        title: selectedLesson.title
      });
      // Update local state
      const updatedSummary = res.data.summary;
      setSelectedLesson(prev => ({ ...prev, aiSummary: updatedSummary }));
      setLessons(prev => prev.map(l => l._id === selectedLesson._id ? { ...l, aiSummary: updatedSummary } : l));
    } catch (e) {
      alert('Failed to generate summary.');
    } finally {
      setAiSummaryLoading(false);
    }
  };

  // AI Quiz Generator Trigger
  const handleAiQuizGenerate = async () => {
    if (!aiQuizText.trim()) {
      alert('Please paste some text notes to generate a quiz.');
      return;
    }
    setAiQuizLoading(true);
    try {
      const res = await axios.post('/api/ai/generate-quiz', {
        text: aiQuizText,
        title: aiQuizTitle
      });
      setAiQuizDraftQuestions(res.data.questions);
    } catch (e) {
      alert('Failed to generate quiz questions.');
    } finally {
      setAiQuizLoading(false);
    }
  };

  // Save generated/built quiz to database
  const handleSaveQuiz = async () => {
    const questionsToSave = aiQuizDraftQuestions.length > 0 ? aiQuizDraftQuestions : manualQuestions;
    const quizTitle = aiQuizTitle || 'Course Assessment';
    
    if (questionsToSave.some(q => !q.questionText || q.options.some(o => !o))) {
      alert('Please fill out all questions and option choices.');
      return;
    }

    try {
      await axios.post('/api/quizzes', {
        course: id,
        title: quizTitle,
        questions: questionsToSave
      });
      setAiQuizTitle('');
      setAiQuizText('');
      setAiQuizDraftQuestions([]);
      setManualQuestions([{ questionText: '', options: ['', '', '', ''], correctOptionIndex: 0 }]);
      setShowQuizModal(false);
      fetchCourseData();
    } catch (e) {
      alert('Failed to save quiz.');
    }
  };

  // Submit Lesson Upload Form
  const handleLessSubmit = async (e) => {
    e.preventDefault();
    if (!lessonTitle || !lessonDesc) return;
    setLessonSubmitLoading(true);

    const formData = new FormData();
    formData.append('course', id);
    formData.append('title', lessonTitle);
    formData.append('description', lessonDesc);
    if (lessonVideo) formData.append('video', lessonVideo);
    if (lessonPdf) formData.append('pdf', lessonPdf);

    try {
      await axios.post('/api/lessons', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setLessonTitle('');
      setLessonDesc('');
      setLessonVideo(null);
      setLessonPdf(null);
      setShowLessModal(false);
      fetchCourseData();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to upload lesson');
    } finally {
      setLessonSubmitLoading(false);
    }
  };

  // Submit Assignment Create Form
  const handleAssSubmit = async (e) => {
    e.preventDefault();
    if (!assTitle || !assDesc || !assDueDate) return;
    setAssSubmitLoading(true);

    try {
      await axios.post('/api/assignments', {
        course: id,
        title: assTitle,
        description: assDesc,
        dueDate: assDueDate
      });
      setAssTitle('');
      setAssDesc('');
      setAssDueDate('');
      setShowAssModal(false);
      fetchCourseData();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to create assignment');
    } finally {
      setAssSubmitLoading(false);
    }
  };

  // Student submits homework file
  const handleStudentSubmission = async (e) => {
    e.preventDefault();
    if (!subFile) return;
    setSubLoading(true);

    const formData = new FormData();
    formData.append('file', subFile);

    try {
      const res = await axios.post(`/api/assignments/${selectedAssignment._id}/submit`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setMySubmission(res.data.submission);
      setSubFile(null);
      alert('Homework submitted successfully!');
    } catch (err) {
      alert(err.response?.data?.message || 'Submission failed');
    } finally {
      setSubLoading(false);
    }
  };

  // Teacher submits grades
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!reviewGrade) return;
    setReviewLoading(true);

    try {
      await axios.post(`/api/assignments/submissions/${reviewSubId}/grade`, {
        grade: reviewGrade,
        feedback: reviewFeedback
      });
      setReviewGrade('');
      setReviewFeedback('');
      setReviewSubId('');
      // Refresh submissions
      const res = await axios.get(`/api/assignments/${selectedAssignment._id}/submissions`);
      setAssignmentSubmissions(res.data);
      alert('Grade saved successfully!');
    } catch (err) {
      alert('Failed to save grade');
    } finally {
      setReviewLoading(false);
    }
  };

  // Student Submits Quiz Answers
  const handleQuizSubmit = async () => {
    const formattedAnswers = selectedQuiz.questions.map((q, idx) => 
      quizAnswers[idx] !== undefined ? quizAnswers[idx] : -1
    );

    try {
      const res = await axios.post(`/api/quizzes/${selectedQuiz._id}/submit`, {
        answers: formattedAnswers
      });
      setQuizScoreResult(res.data.result);
      setMyQuizResult(res.data.result);
      setQuizSubmitted(true);
    } catch (e) {
      alert('Failed to submit quiz.');
    }
  };

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center text-gray-500">
        <div className="animate-pulse text-lg">Loading syllabus syllabus details...</div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800">
        <h3 className="text-xl font-bold">Course Not Found</h3>
        <Link to="/courses" className="mt-4 inline-flex text-brandIndigo font-semibold">
          Back to catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Course Title Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Link to="/courses" className="hover:text-brandIndigo flex items-center gap-1">
          <ArrowLeft size={14} /> Catalog
        </Link>
        <ChevronRight size={12} />
        <span className="text-gray-900 dark:text-gray-300 font-medium">{course.title}</span>
      </div>

      {/* Course Core Details Banner */}
      <div className="p-8 rounded-3xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="text-xs bg-indigo-500/10 text-brandIndigo px-2.5 py-1 rounded-full font-bold">
            Syllabus Classroom
          </span>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mt-3">{course.title}</h1>
          <p className="text-sm text-gray-500 mt-2 max-w-xl leading-relaxed">{course.description}</p>
        </div>
        <div className="flex flex-col text-xs text-gray-500 bg-gray-50 dark:bg-gray-800/40 p-4 rounded-2xl border border-gray-100 dark:border-gray-800/60 min-w-[200px]">
          <span className="font-semibold text-gray-900 dark:text-white text-sm truncate">Instructor</span>
          <span className="mt-1 truncate">{course.teacher?.name}</span>
          <span className="mt-0.5 text-[10px] text-gray-400 truncate">{course.teacher?.email}</span>
        </div>
      </div>

      {/* Tabs selection line */}
      <div className="flex border-b border-gray-200 dark:border-gray-800/80">
        {['syllabus', 'lessons', 'assignments', 'quizzes'].map(tab => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              setSelectedAssignment(null);
              setSelectedQuiz(null);
            }}
            className={`px-6 py-3 font-semibold text-sm capitalize border-b-2 transition-all cursor-pointer ${
              activeTab === tab 
                ? 'border-brandIndigo text-brandIndigo dark:text-indigo-400' 
                : 'border-transparent text-gray-500 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ============================================================== */}
      {/* SYLLABUS TAB CONTAINER */}
      {/* ============================================================== */}
      {activeTab === 'syllabus' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-xl text-gray-900 dark:text-white">Full Course Syllabus</h3>
            <span className="text-xs bg-brandIndigo/10 text-brandIndigo px-3 py-1.5 rounded-full font-bold">
              {lessons.length} Lessons • {assignments.length} Assignments • {quizzes.length} Quizzes
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Lessons Roadmap list (Col-Span 2) */}
            <div className="lg:col-span-2 space-y-4">
              <h4 className="font-bold text-sm text-gray-400 uppercase tracking-wider">Learning Modules</h4>
              {lessons.length === 0 ? (
                <div className="p-8 text-center bg-gray-55 dark:bg-gray-800/20 border border-dashed border-gray-200 dark:border-gray-805 rounded-2xl">
                  <BookOpen size={24} className="mx-auto text-gray-400 mb-2" />
                  <p className="text-xs text-gray-500 italic">No lessons have been added to this syllabus yet.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {lessons.map((lesson, idx) => (
                    <div 
                      key={lesson._id} 
                      className="p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm flex items-start justify-between gap-4 hover:border-brandIndigo/30 transition-all duration-300 animate-fade-in"
                    >
                      <div className="flex items-start gap-4">
                        <div className="h-10 w-10 rounded-xl bg-brandIndigo/10 text-brandIndigo flex items-center justify-center font-bold text-sm shrink-0">
                          {idx + 1}
                        </div>
                        <div>
                          <h5 className="font-bold text-gray-900 dark:text-white text-base">{lesson.title}</h5>
                          <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">{lesson.description}</p>
                          <div className="flex gap-3 mt-3 text-[10px] text-gray-400">
                            {lesson.videoUrl && <span className="bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full font-medium">Video</span>}
                            {lesson.pdfUrl && <span className="bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full font-medium">Reading notes PDF</span>}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedLesson(lesson);
                          setActiveTab('lessons');
                        }}
                        className="px-4 py-2 bg-brandIndigo/10 hover:bg-brandIndigo text-brandIndigo hover:text-white rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer"
                      >
                        Start
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Assignments & Quizzes checklist (Col-Span 1) */}
            <div className="space-y-6">
              {/* Assignments */}
              <div className="space-y-4">
                <h4 className="font-bold text-sm text-gray-400 uppercase tracking-wider">Assignments</h4>
                {assignments.length === 0 ? (
                  <p className="text-xs text-gray-500 italic">No homework assignments.</p>
                ) : (
                  <div className="space-y-2">
                    {assignments.map(ass => (
                      <div 
                        key={ass._id} 
                        className="p-4 rounded-xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm flex items-center justify-between gap-3"
                      >
                        <div className="truncate">
                          <span className="font-bold text-xs text-gray-850 dark:text-gray-200 block truncate">{ass.title}</span>
                          <span className="text-[10px] text-gray-400 block mt-1">Due: {new Date(ass.dueDate).toLocaleDateString()}</span>
                        </div>
                        <button
                          onClick={() => {
                            setSelectedAssignment(ass);
                            setActiveTab('assignments');
                          }}
                          className="px-3 py-1 bg-brandViolet/10 hover:bg-brandViolet text-brandViolet hover:text-white text-[10px] font-bold rounded-lg transition-all cursor-pointer"
                        >
                          View
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Quizzes */}
              <div className="space-y-4 border-t border-gray-100 dark:border-gray-850 pt-6">
                <h4 className="font-bold text-sm text-gray-400 uppercase tracking-wider">Assessments & Quizzes</h4>
                {quizzes.length === 0 ? (
                  <p className="text-xs text-gray-500 italic">No quiz assessments.</p>
                ) : (
                  <div className="space-y-2">
                    {quizzes.map(quiz => (
                      <div 
                        key={quiz._id} 
                        className="p-4 rounded-xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm flex items-center justify-between gap-3"
                      >
                        <div className="truncate">
                          <span className="font-bold text-xs text-gray-850 dark:text-gray-200 block truncate">{quiz.title}</span>
                          <span className="text-[10px] text-gray-400 block mt-1">{quiz.questions?.length} MCQs</span>
                        </div>
                        <button
                          onClick={() => {
                            setSelectedQuiz(quiz);
                            setActiveTab('quizzes');
                          }}
                          className="px-3 py-1 bg-brandBlue/10 hover:bg-brandBlue text-brandBlue hover:text-white text-[10px] font-bold rounded-lg transition-all cursor-pointer"
                        >
                          Take
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* LESSONS TAB CONTAINER */}
      {/* ============================================================== */}
      {activeTab === 'lessons' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Lessons List (Col-Span 1) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg">Course Lessons</h3>
              {(user.role === 'teacher' || user.role === 'admin') && (
                <button
                  onClick={() => setShowLessModal(true)}
                  className="flex items-center gap-1 text-xs font-bold text-brandIndigo bg-indigo-500/10 px-3 py-1.5 rounded-lg"
                >
                  <Plus size={14} /> Add Lesson
                </button>
              )}
            </div>

            {lessons.length === 0 ? (
              <p className="text-sm text-gray-500 italic py-6 text-center">No lessons added to this course yet.</p>
            ) : (
              <div className="space-y-2">
                {lessons.map((lesson, idx) => (
                  <button
                    key={lesson._id}
                    onClick={() => setSelectedLesson(lesson)}
                    className={`w-full flex items-center justify-between p-4 rounded-xl text-left border transition-all ${
                      selectedLesson?._id === lesson._id
                        ? 'border-brandIndigo bg-brandIndigo/5 text-brandIndigo'
                        : 'border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                    }`}
                  >
                    <div className="flex items-center gap-3 truncate">
                      <div className={`h-8 w-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                        selectedLesson?._id === lesson._id ? 'bg-brandIndigo text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-500'
                      }`}>
                        {idx + 1}
                      </div>
                      <span className="font-semibold text-sm text-gray-800 dark:text-gray-200 truncate">{lesson.title}</span>
                    </div>
                    <ChevronRight size={16} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Lesson View Area (Col-Span 2) */}
          <div className="lg:col-span-2">
            {selectedLesson ? (
              <div className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800/80 p-6 shadow-sm space-y-6">
                
                {/* Header */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{selectedLesson.title}</h3>
                  <p className="text-xs text-gray-400 mt-1">Uploaded on {new Date(selectedLesson.createdAt).toLocaleDateString()}</p>
                </div>

                {/* Video Player */}
                {selectedLesson.videoUrl ? (
                  <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black border border-gray-850 relative group">
                    {/* If we have a local upload link, render html5 video player, else standard mock placeholder */}
                    {selectedLesson.videoUrl.startsWith('/uploads/') ? (
                      <video 
                        src={selectedLesson.videoUrl} 
                        controls 
                        className="w-full h-full object-cover" 
                      />
                    ) : (
                      // Mock YouTube / Embed Player
                      <iframe
                        src={selectedLesson.videoUrl.replace('watch?v=', 'embed/')}
                        title={selectedLesson.title}
                        className="w-full h-full"
                        allowFullScreen
                      ></iframe>
                    )}
                  </div>
                ) : (
                  <div className="aspect-video w-full rounded-2xl bg-gray-100 dark:bg-gray-800 flex flex-col items-center justify-center text-gray-400 gap-2 border border-dashed border-gray-300 dark:border-gray-700">
                    <Video size={36} />
                    <span className="text-xs">No video lesson attached</span>
                  </div>
                )}

                {/* Description */}
                <div>
                  <h4 className="font-semibold text-sm text-gray-900 dark:text-white uppercase tracking-wider mb-2">Lesson Details</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed bg-gray-50 dark:bg-gray-800/20 p-4 rounded-xl border border-gray-100 dark:border-gray-800/40">
                    {selectedLesson.description}
                  </p>
                </div>

                {/* PDF Resource Download */}
                {selectedLesson.pdfUrl && (
                  <div className="flex items-center justify-between p-4 rounded-xl border border-brandBlue/10 bg-brandBlue/5">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-blue-500/10 text-brandBlue flex items-center justify-center">
                        <FileText size={20} />
                      </div>
                      <div>
                        <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">Lecture Notes PDF</span>
                        <p className="text-[10px] text-gray-400">Supporting reading notes and homework materials</p>
                      </div>
                    </div>
                    <a
                      href={selectedLesson.pdfUrl}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-brandBlue hover:bg-blue-600 text-white rounded-xl text-xs font-bold transition-all"
                    >
                      Download PDF
                    </a>
                  </div>
                )}

                {/* ======================= AI NOTES SUMMARIZER SECTION ======================= */}
                <div className="rounded-xl border border-purple-500/10 bg-purple-500/5 p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <h5 className="font-bold text-xs text-brandViolet uppercase tracking-wider flex items-center gap-1">
                      <Sparkles size={14} /> AI Notes Summary
                    </h5>
                    
                    {/* Summarize button - only display if no summary exists, and user is a teacher or notes PDF is available */}
                    {!selectedLesson.aiSummary && selectedLesson.pdfUrl && (
                      <button
                        onClick={handleAiSummarize}
                        disabled={aiSummaryLoading}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brandViolet text-white font-bold text-xs cursor-pointer"
                      >
                        {aiSummaryLoading ? (
                          <Loader2 size={12} className="animate-spin" />
                        ) : (
                          <>
                            <Sparkles size={12} /> Summarize Notes
                          </>
                        )}
                      </button>
                    )}
                  </div>

                  {selectedLesson.aiSummary ? (
                    <div className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed border-l-2 border-brandViolet/30 pl-4 py-1">
                      <div className="markdown-body prose prose-sm dark:prose-invert">
                        {/* Split summaries by bullets or format appropriately */}
                        {selectedLesson.aiSummary.split('\n').map((line, lIdx) => (
                          <p key={lIdx} className="mb-1">{line}</p>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs text-gray-500 italic">
                      {selectedLesson.pdfUrl 
                        ? 'No summary generated yet. Click "Summarize Notes" to generate an AI summary using the Gemini API.' 
                        : 'No notes PDF attached. Upload notes PDF to summarize.'}
                    </p>
                  )}
                </div>

              </div>
            ) : (
              <div className="h-full rounded-2xl border border-dashed border-gray-300 dark:border-gray-800 flex items-center justify-center p-12 text-center text-gray-500">
                Pick a lesson from the list to begin learning.
              </div>
            )}
          </div>

        </div>
      )}

      {/* ============================================================== */}
      {/* ASSIGNMENTS TAB CONTAINER */}
      {/* ============================================================== */}
      {activeTab === 'assignments' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Assignments List (Col-Span 1) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg">Course Assignments</h3>
              {(user.role === 'teacher' || user.role === 'admin') && (
                <button
                  onClick={() => setShowAssModal(true)}
                  className="flex items-center gap-1 text-xs font-bold text-brandIndigo bg-indigo-500/10 px-3 py-1.5 rounded-lg"
                >
                  <Plus size={14} /> Create Assignment
                </button>
              )}
            </div>

            {assignments.length === 0 ? (
              <p className="text-sm text-gray-500 italic py-6 text-center">No assignments created yet.</p>
            ) : (
              <div className="space-y-2">
                {assignments.map(ass => (
                  <button
                    key={ass._id}
                    onClick={() => setSelectedAssignment(ass)}
                    className={`w-full p-4 rounded-xl text-left border transition-all ${
                      selectedAssignment?._id === ass._id
                        ? 'border-brandIndigo bg-brandIndigo/5 text-brandIndigo'
                        : 'border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                    }`}
                  >
                    <span className="font-bold text-sm text-gray-800 dark:text-gray-200 block truncate">{ass.title}</span>
                    <span className="inline-flex items-center gap-1 text-[10px] text-gray-400 mt-2">
                      <Calendar size={10} /> Due {new Date(ass.dueDate).toLocaleDateString()}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Assignment submission/details panel (Col-Span 2) */}
          <div className="lg:col-span-2">
            {selectedAssignment ? (
              <div className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800/80 p-6 shadow-sm space-y-6">
                
                {/* Header info */}
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b border-gray-100 dark:border-gray-850 pb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{selectedAssignment.title}</h3>
                    <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                      <Clock size={12} /> Due on {new Date(selectedAssignment.dueDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h4 className="font-semibold text-xs text-gray-400 uppercase tracking-wider mb-2">Instructions</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed bg-gray-50 dark:bg-gray-800/20 p-4 rounded-xl border border-gray-100 dark:border-gray-800/40">
                    {selectedAssignment.description}
                  </p>
                </div>

                {/* Dynamic panel by student / teacher roles */}
                {user.role === 'student' ? (
                  // Student assignment panel
                  <div className="border-t border-gray-100 dark:border-gray-850 pt-6 space-y-6">
                    <h4 className="font-bold text-sm text-gray-900 dark:text-white">Your Submission</h4>

                    {mySubmission ? (
                      <div className="space-y-4">
                        <div className="p-4 rounded-xl border border-brandIndigo/10 bg-brandIndigo/5 flex items-center justify-between">
                          <div className="flex items-center gap-2 text-xs">
                            <CheckCircle2 size={16} className="text-green-500" />
                            <div>
                              <span className="font-semibold text-gray-800 dark:text-gray-200">Work Submitted</span>
                              <p className="text-[10px] text-gray-400">On {new Date(mySubmission.submittedAt).toLocaleDateString()}</p>
                            </div>
                          </div>
                          <a
                            href={mySubmission.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-semibold text-brandIndigo hover:underline"
                          >
                            View Submission File
                          </a>
                        </div>

                        {/* Grading review */}
                        {mySubmission.grade ? (
                          <div className="p-4 rounded-xl border border-brandViolet/10 bg-brandViolet/5 space-y-2">
                            <h5 className="font-bold text-xs text-brandViolet uppercase tracking-wider">Evaluation Grades</h5>
                            <div className="flex items-center gap-2">
                              <span className="text-2xl font-black text-brandViolet">{mySubmission.grade}</span>
                            </div>
                            {mySubmission.feedback && (
                              <p className="text-xs text-gray-500 italic mt-2">
                                Instructor Feedback: "{mySubmission.feedback}"
                              </p>
                            )}
                          </div>
                        ) : (
                          <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/20 text-xs text-gray-500 text-center border border-dashed border-gray-300 dark:border-gray-700">
                            Waiting for instructor grading.
                          </div>
                        )}

                        {/* Re-submit form */}
                        <form onSubmit={handleStudentSubmission} className="space-y-3 pt-4 border-t border-gray-100 dark:border-gray-850">
                          <label className="text-xs font-semibold text-gray-400">Update Submission File</label>
                          <div className="flex items-center gap-3">
                            <input 
                              type="file" 
                              required 
                              onChange={(e) => setSubFile(e.target.files[0])}
                              className="text-xs text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-brandIndigo/10 file:text-brandIndigo file:cursor-pointer"
                            />
                            <button
                              type="submit"
                              disabled={subLoading}
                              className="px-4 py-2 bg-brandIndigo text-white rounded-xl text-xs font-bold shadow-md cursor-pointer flex items-center gap-1"
                            >
                              {subLoading ? <Loader2 size={12} className="animate-spin" /> : <Upload size={12} />}
                              Re-submit
                            </button>
                          </div>
                        </form>
                      </div>
                    ) : (
                      // Submit form
                      <form onSubmit={handleStudentSubmission} className="space-y-4 p-5 rounded-2xl border border-dashed border-gray-300 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/40">
                        <div className="text-center py-4 text-gray-400">
                          <Upload size={32} className="mx-auto mb-2 text-gray-400" />
                          <p className="text-xs">Drag and drop or select your submission file (PDF/ZIP/Docs)</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <input 
                            type="file" 
                            required 
                            onChange={(e) => setSubFile(e.target.files[0])}
                            className="text-xs text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-brandIndigo/10 file:text-brandIndigo file:cursor-pointer"
                          />
                          <button
                            type="submit"
                            disabled={subLoading}
                            className="px-5 py-2 bg-brandIndigo text-white rounded-xl text-xs font-bold shadow-md cursor-pointer flex items-center gap-1.5"
                          >
                            {subLoading ? (
                              <Loader2 size={14} className="animate-spin" />
                            ) : (
                              <>
                                <Upload size={14} /> Submit Homework
                              </>
                            )}
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                ) : (
                  // Teacher panel (Reviewing submissions)
                  <div className="border-t border-gray-100 dark:border-gray-850 pt-6 space-y-6">
                    <h4 className="font-bold text-sm text-gray-900 dark:text-white">Student Submissions ({assignmentSubmissions.length})</h4>
                    
                    {assignmentSubmissions.length === 0 ? (
                      <p className="text-xs text-gray-500 italic text-center py-6">No students have submitted this assignment yet.</p>
                    ) : (
                      <div className="space-y-4">
                        {assignmentSubmissions.map(sub => (
                          <div key={sub._id} className="p-4 rounded-xl border border-gray-100 dark:border-gray-850 bg-gray-50 dark:bg-gray-800/20 space-y-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2 text-xs">
                                <User size={14} className="text-brandIndigo" />
                                <span className="font-bold">{sub.student?.name || 'Unknown Student'}</span>
                              </div>
                              <span className="text-[10px] text-gray-400">On {new Date(sub.submittedAt).toLocaleDateString()}</span>
                            </div>

                            <div className="flex items-center justify-between text-xs pt-1 border-t border-gray-100 dark:border-gray-800">
                              <a
                                href={sub.fileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-brandIndigo hover:underline font-semibold"
                              >
                                Download Student File
                              </a>
                              
                              {sub.grade ? (
                                <span className="font-bold text-brandViolet bg-brandViolet/10 px-2.5 py-1 rounded-md">
                                  Grade: {sub.grade}
                                </span>
                              ) : (
                                <button
                                  onClick={() => {
                                    setReviewSubId(sub._id);
                                    setReviewGrade('');
                                    setReviewFeedback('');
                                  }}
                                  className="px-3 py-1 bg-brandViolet text-white font-bold rounded-lg text-[10px] cursor-pointer"
                                >
                                  Grade Submission
                                </button>
                              )}
                            </div>

                            {/* Grading Input Form */}
                            {reviewSubId === sub._id && (
                              <form onSubmit={handleReviewSubmit} className="pt-3 border-t border-gray-100 dark:border-gray-800 space-y-3 animate-fade-in">
                                <div className="grid grid-cols-3 gap-3">
                                  <div className="col-span-1 space-y-1">
                                    <label className="text-[10px] text-gray-400">Grade (e.g. A+, 95)</label>
                                    <input
                                      type="text"
                                      required
                                      value={reviewGrade}
                                      onChange={(e) => setReviewGrade(e.target.value)}
                                      placeholder="A+"
                                      className="w-full px-3 py-1.5 rounded-lg bg-gray-900/50 border border-gray-850 text-xs outline-none"
                                    />
                                  </div>
                                  <div className="col-span-2 space-y-1">
                                    <label className="text-[10px] text-gray-400">Feedback Comments</label>
                                    <input
                                      type="text"
                                      value={reviewFeedback}
                                      onChange={(e) => setReviewFeedback(e.target.value)}
                                      placeholder="Great job!"
                                      className="w-full px-3 py-1.5 rounded-lg bg-gray-900/50 border border-gray-850 text-xs outline-none"
                                    />
                                  </div>
                                </div>
                                <div className="flex gap-2 justify-end text-xs font-semibold">
                                  <button
                                    type="button"
                                    onClick={() => setReviewSubId('')}
                                    className="px-3 py-1 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-lg"
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    type="submit"
                                    disabled={reviewLoading}
                                    className="px-4 py-1 bg-brandViolet text-white rounded-lg cursor-pointer"
                                  >
                                    Save Grade
                                  </button>
                                </div>
                              </form>
                            )}

                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

              </div>
            ) : (
              <div className="h-full rounded-2xl border border-dashed border-gray-300 dark:border-gray-800 flex items-center justify-center p-12 text-center text-gray-500">
                Select an assignment instructions syllabus roadmap from the list.
              </div>
            )}
          </div>

        </div>
      )}

      {/* ============================================================== */}
      {/* QUIZZES TAB CONTAINER */}
      {/* ============================================================== */}
      {activeTab === 'quizzes' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Quizzes List (Col-Span 1) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg">Course Quizzes</h3>
              {(user.role === 'teacher' || user.role === 'admin') && (
                <button
                  onClick={() => {
                    setAiQuizDraftQuestions([]);
                    setShowQuizModal(true);
                  }}
                  className="flex items-center gap-1 text-xs font-bold text-brandIndigo bg-indigo-500/10 px-3 py-1.5 rounded-lg cursor-pointer"
                >
                  <Plus size={14} /> Create Quiz
                </button>
              )}
            </div>

            {quizzes.length === 0 ? (
              <p className="text-sm text-gray-500 italic py-6 text-center">No assessments quizzes created yet.</p>
            ) : (
              <div className="space-y-2">
                {quizzes.map(quiz => (
                  <button
                    key={quiz._id}
                    onClick={() => setSelectedQuiz(quiz)}
                    className={`w-full p-4 rounded-xl text-left border transition-all ${
                      selectedQuiz?._id === quiz._id
                        ? 'border-brandIndigo bg-brandIndigo/5 text-brandIndigo'
                        : 'border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                    }`}
                  >
                    <span className="font-bold text-sm text-gray-800 dark:text-gray-200 block truncate">{quiz.title}</span>
                    <span className="inline-flex items-center gap-1 text-[10px] text-gray-400 mt-2">
                      <Award size={10} /> {quiz.questions?.length} MCQs questions
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quiz Assessment Execution Window (Col-Span 2) */}
          <div className="lg:col-span-2">
            {selectedQuiz ? (
              <div className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800/80 p-6 shadow-sm space-y-6">
                
                {/* Header */}
                <div className="border-b border-gray-100 dark:border-gray-850 pb-4">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{selectedQuiz.title}</h3>
                  <p className="text-xs text-gray-400 mt-1">Contains {selectedQuiz.questions?.length} multiple choice questions.</p>
                </div>

                {/* Sub-Views by role / quiz submit status */}
                {user.role === 'student' ? (
                  quizSubmitted ? (
                    // Quiz Results view for students
                    <div className="space-y-6">
                      <div className="p-6 rounded-2xl bg-brandBlue/5 border border-brandBlue/10 text-center space-y-2">
                        <Award size={44} className="mx-auto text-brandBlue" />
                        <h4 className="text-lg font-bold">Assessment Completed</h4>
                        <div className="text-3xl font-black text-brandBlue mt-2">
                          Score: {myQuizResult?.score || 0} / {selectedQuiz.questions?.length}
                        </div>
                        <p className="text-xs text-gray-500">Auto-graded on submission</p>
                      </div>

                      {/* Correct answer reviews */}
                      <div className="space-y-4">
                        <h5 className="font-bold text-sm text-gray-800 dark:text-gray-200">Question Reviews</h5>
                        {selectedQuiz.questions.map((q, idx) => {
                          const chosenAnswer = myQuizResult?.answers?.[idx];
                          return (
                            <div key={q._id || idx} className="p-4 rounded-xl border border-gray-100 dark:border-gray-850 bg-gray-50 dark:bg-gray-800/20 text-xs space-y-2">
                              <p className="font-semibold">{idx+1}. {q.questionText}</p>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                                {q.options.map((opt, oIdx) => (
                                  <div 
                                    key={oIdx} 
                                    className={`p-2.5 rounded-lg border text-left flex justify-between ${
                                      // Correct answer highlights green
                                      myQuizResult?.answers && oIdx === chosenAnswer
                                        ? 'border-brandBlue bg-brandBlue/5 text-brandBlue font-bold'
                                        : 'border-gray-200 dark:border-gray-800'
                                    }`}
                                  >
                                    <span>{opt}</span>
                                    {myQuizResult?.answers && oIdx === chosenAnswer && <span>(Your Answer)</span>}
                                  </div>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    // Quiz questions execution view for students
                    <div className="space-y-6">
                      {selectedQuiz.questions.map((q, idx) => (
                        <div key={q._id || idx} className="p-5 rounded-2xl border border-gray-100 dark:border-gray-850 bg-gray-50 dark:bg-gray-800/20 space-y-4">
                          <h4 className="font-bold text-sm text-gray-800 dark:text-gray-200">
                            {idx + 1}. {q.questionText}
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {q.options.map((opt, oIdx) => (
                              <button
                                key={oIdx}
                                onClick={() => setQuizAnswers(prev => ({ ...prev, [idx]: oIdx }))}
                                className={`w-full p-3 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                                  quizAnswers[idx] === oIdx
                                    ? 'border-brandIndigo bg-brandIndigo/5 text-brandIndigo font-bold shadow-md shadow-indigo-500/10'
                                    : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                                }`}
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}

                      <button
                        onClick={handleQuizSubmit}
                        className="w-full py-3 bg-brandIndigo text-white rounded-xl font-bold text-sm shadow-md hover:bg-indigo-600 transition-all cursor-pointer"
                      >
                        Submit Answers
                      </button>
                    </div>
                  )
                ) : (
                  // Teacher View: Quiz Submissions and Grades
                  <div className="space-y-6">
                    <div className="flex justify-between items-center pb-2 border-b border-gray-100 dark:border-gray-800">
                      <h4 className="font-bold text-sm">Review Quiz Submissions</h4>
                    </div>
                    {/* Render quiz answer keys */}
                    <div className="space-y-4 bg-gray-50 dark:bg-gray-800/10 p-5 rounded-2xl border border-gray-100 dark:border-gray-850">
                      <h5 className="font-semibold text-xs text-brandIndigo uppercase tracking-wider">Quiz Answer Sheet</h5>
                      <div className="space-y-2 text-xs">
                        {selectedQuiz.questions.map((q, idx) => (
                          <div key={idx} className="flex justify-between items-center py-1">
                            <span className="text-gray-500 truncate max-w-[250px]">{idx+1}. {q.questionText}</span>
                            <span className="font-bold text-green-500">{q.options[q.correctOptionIndex]}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

              </div>
            ) : (
              <div className="h-full rounded-2xl border border-dashed border-gray-300 dark:border-gray-800 flex items-center justify-center p-12 text-center text-gray-500">
                Choose a quiz assessment from the left list.
              </div>
            )}
          </div>

        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL WINDOWS FOR ADDING CONTENT */}
      {/* ============================================================== */}

      {/* Create Lesson Modal */}
      {showLessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="w-full max-w-md glass-panel p-6 rounded-3xl shadow-2xl relative">
            <button
              onClick={() => setShowLessModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-xl bg-brandIndigo/10 text-brandIndigo flex items-center justify-center">
                <Play size={20} />
              </div>
              <h3 className="text-xl font-bold">Add Course Lesson</h3>
            </div>

            <form onSubmit={handleLessSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-300">Lesson Title</label>
                <input
                  type="text"
                  required
                  value={lessonTitle}
                  onChange={(e) => setLessonTitle(e.target.value)}
                  placeholder="e.g. Chapter 1: Introduction"
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-900/50 border border-gray-800 text-gray-100 outline-none focus:border-brandIndigo focus:ring-1 focus:ring-brandIndigo"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-300">Description</label>
                <textarea
                  required
                  rows={3}
                  value={lessonDesc}
                  onChange={(e) => setLessonDesc(e.target.value)}
                  placeholder="Provide syllabus notes regarding lesson videos..."
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-900/50 border border-gray-800 text-gray-100 outline-none focus:border-brandIndigo focus:ring-1 focus:ring-brandIndigo resize-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-300 block">Lesson Lecture Video File</label>
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => setLessonVideo(e.target.files[0])}
                  className="text-xs text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-brandIndigo/10 file:text-brandIndigo"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-300 block">Lecture Reading Notes (PDF)</label>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setLessonPdf(e.target.files[0])}
                  className="text-xs text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-brandIndigo/10 file:text-brandIndigo"
                />
              </div>

              <button
                type="submit"
                disabled={lessonSubmitLoading}
                className="w-full py-2.5 bg-gradient-to-r from-brandIndigo to-brandViolet text-white font-bold rounded-xl flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {lessonSubmitLoading ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <>Upload Lesson</>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Create Assignment Modal */}
      {showAssModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="w-full max-w-md glass-panel p-6 rounded-3xl shadow-2xl relative">
            <button
              onClick={() => setShowAssModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-xl bg-brandIndigo/10 text-brandIndigo flex items-center justify-center">
                <Calendar size={20} />
              </div>
              <h3 className="text-xl font-bold">Create Course Assignment</h3>
            </div>

            <form onSubmit={handleAssSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-300">Assignment Title</label>
                <input
                  type="text"
                  required
                  value={assTitle}
                  onChange={(e) => setAssTitle(e.target.value)}
                  placeholder="e.g. Lab Exercise 1"
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-900/50 border border-gray-800 text-gray-100 outline-none focus:border-brandIndigo focus:ring-1 focus:ring-brandIndigo"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-300">Instructions Description</label>
                <textarea
                  required
                  rows={3}
                  value={assDesc}
                  onChange={(e) => setAssDesc(e.target.value)}
                  placeholder="Outline the assignment submission directives..."
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-900/50 border border-gray-800 text-gray-100 outline-none focus:border-brandIndigo focus:ring-1 focus:ring-brandIndigo resize-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-300">Due Date</label>
                <input
                  type="date"
                  required
                  value={assDueDate}
                  onChange={(e) => setAssDueDate(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-900/50 border border-gray-800 text-gray-100 outline-none focus:border-brandIndigo"
                />
              </div>

              <button
                type="submit"
                disabled={assSubmitLoading}
                className="w-full py-2.5 bg-gradient-to-r from-brandIndigo to-brandViolet text-white font-bold rounded-xl flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {assSubmitLoading ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <>Create Assignment</>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Create Quiz / AI Quiz Generator Modal */}
      {showQuizModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 overflow-y-auto py-8">
          <div className="w-full max-w-xl glass-panel p-6 rounded-3xl shadow-2xl relative my-auto">
            <button
              onClick={() => setShowQuizModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-xl bg-brandViolet/10 text-brandViolet flex items-center justify-center">
                <Sparkles size={20} />
              </div>
              <h3 className="text-xl font-bold">Create Quiz & AI Quiz Generator</h3>
            </div>

            {/* AI Generator Panel */}
            <div className="p-4 rounded-2xl bg-brandViolet/5 border border-brandViolet/10 space-y-4 mb-6">
              <h4 className="text-xs font-bold text-brandViolet uppercase tracking-wider flex items-center gap-1">
                <Sparkles size={12} /> Gemini-Powered AI Quiz Builder
              </h4>
              <p className="text-[10px] text-gray-400">
                Paste syllabus reading notes, lecture text, or topic outlines below. Click "Generate" and Gemini AI will automatically compile 5 multiple-choice questions!
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <input
                  type="text"
                  placeholder="Quiz Title (e.g. AI Trivia)"
                  value={aiQuizTitle}
                  onChange={(e) => setAiQuizTitle(e.target.value)}
                  className="md:col-span-1 px-3 py-2 text-xs rounded-xl bg-gray-900/50 border border-gray-800"
                />
                <textarea
                  placeholder="Paste lecture text notes here to generate questions from..."
                  rows={2}
                  value={aiQuizText}
                  onChange={(e) => setAiQuizText(e.target.value)}
                  className="md:col-span-2 px-3 py-2 text-xs rounded-xl bg-gray-900/50 border border-gray-800 resize-none"
                />
              </div>

              <button
                type="button"
                onClick={handleAiQuizGenerate}
                disabled={aiQuizLoading}
                className="w-full flex items-center justify-center gap-1 py-2 bg-brandViolet text-white font-bold text-xs rounded-xl shadow-md cursor-pointer"
              >
                {aiQuizLoading ? (
                  <Loader2 size={12} className="animate-spin" />
                ) : (
                  <>
                    <Sparkles size={12} /> Auto-Generate MCQ Questions
                  </>
                )}
              </button>
            </div>

            {/* Questions review area */}
            {aiQuizDraftQuestions.length > 0 ? (
              <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                <h4 className="text-xs font-bold text-gray-300">Generated Questions Review</h4>
                {aiQuizDraftQuestions.map((q, qIdx) => (
                  <div key={qIdx} className="p-3 rounded-xl border border-gray-800 bg-gray-900/40 text-xs space-y-2">
                    <p className="font-semibold">{qIdx+1}. {q.questionText}</p>
                    <div className="grid grid-cols-2 gap-2 text-[10px] text-gray-400">
                      {q.options.map((opt, oIdx) => (
                        <span 
                          key={oIdx} 
                          className={oIdx === q.correctOptionIndex ? 'text-green-400 font-bold' : ''}
                        >
                          Choice {oIdx+1}: {opt}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
                
                <button
                  type="button"
                  onClick={handleSaveQuiz}
                  className="w-full py-2.5 bg-gradient-to-r from-brandIndigo to-brandViolet text-white font-bold rounded-xl text-xs cursor-pointer shadow-md"
                >
                  Save Quiz to Syllabus
                </button>
              </div>
            ) : (
              // Manual configuration fallback
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-gray-300 border-b border-gray-800 pb-2">Manual Quiz Questions</h4>
                <div className="max-h-[200px] overflow-y-auto space-y-4 pr-2 text-xs">
                  {manualQuestions.map((q, qIdx) => (
                    <div key={qIdx} className="space-y-2 p-3 rounded-xl bg-gray-900/30 border border-gray-850">
                      <div className="flex justify-between items-center">
                        <label className="font-bold">Question {qIdx+1}</label>
                        {manualQuestions.length > 1 && (
                          <button
                            type="button"
                            onClick={() => setManualQuestions(prev => prev.filter((_, idx) => idx !== qIdx))}
                            className="text-red-400 hover:text-red-300"
                          >
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>
                      
                      <input
                        type="text"
                        required
                        placeholder="Enter MCQ question text"
                        value={q.questionText}
                        onChange={(e) => {
                          const updated = [...manualQuestions];
                          updated[qIdx].questionText = e.target.value;
                          setManualQuestions(updated);
                        }}
                        className="w-full px-3 py-1.5 rounded-lg bg-gray-950/50 border border-gray-850 text-xs"
                      />

                      <div className="grid grid-cols-2 gap-2">
                        {q.options.map((opt, oIdx) => (
                          <input
                            key={oIdx}
                            type="text"
                            required
                            placeholder={`Choice ${oIdx+1}`}
                            value={opt}
                            onChange={(e) => {
                              const updated = [...manualQuestions];
                              updated[qIdx].options[oIdx] = e.target.value;
                              setManualQuestions(updated);
                            }}
                            className="px-3 py-1 rounded-lg bg-gray-950/50 border border-gray-850 text-xs"
                          />
                        ))}
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] text-gray-400 block">Correct Option Index (0 to 3)</label>
                        <select
                          value={q.correctOptionIndex}
                          onChange={(e) => {
                            const updated = [...manualQuestions];
                            updated[qIdx].correctOptionIndex = parseInt(e.target.value);
                            setManualQuestions(updated);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-gray-950/50 border border-gray-850 text-xs text-white"
                        >
                          <option value={0}>Option 1</option>
                          <option value={1}>Option 2</option>
                          <option value={2}>Option 3</option>
                          <option value={3}>Option 4</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setManualQuestions(prev => [...prev, { questionText: '', options: ['', '', '', ''], correctOptionIndex: 0 }])}
                    className="flex-1 py-2 bg-gray-800 hover:bg-gray-750 text-white text-xs font-semibold rounded-xl"
                  >
                    Add Question Block
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveQuiz}
                    className="flex-1 py-2 bg-brandIndigo hover:bg-indigo-600 text-white text-xs font-bold rounded-xl cursor-pointer"
                  >
                    Save Manual Quiz
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

export default CourseDetail;

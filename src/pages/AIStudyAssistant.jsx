import React, { useState, useEffect, useContext, useRef } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import {
  Sparkles, Send, Bot, User, HelpCircle, Loader2,
  MessageSquare, BookOpen, Lightbulb, RotateCcw,
  ChevronLeft, ChevronRight, Zap, AlertTriangle,
  Copy, Check, GraduationCap
} from 'lucide-react';


const AIStudyAssistant = () => {
  const { user } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [activeTab, setActiveTab] = useState('chat');

  // Chat State
  const [chatHistory, setChatHistory] = useState([
    {
      role: 'assistant',
      content: "👋 Hello! I'm your **Gemini AI Study Assistant**. I'm powered by Google's Gemini AI to help you learn better!\n\nSelect a course above and try:\n- **Asking questions** about your course material\n- **Explaining concepts** in simple terms\n- **Generating flashcards** for revision\n- **Creating study plans** and tips"
    }
  ]);
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState(null);
  const chatEndRef = useRef(null);

  // Flashcard State
  const [flashcards, setFlashcards] = useState([{ questiom: "test question", answer: "test answer" }]);
  const generateFlashcardsForCourse = async () => {
    try {
      // 1. Ask the AI for flashcards about the specific course
      const response = await fetch('http://localhost:5000/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          course: "Your Selected Course Name", // Pass your selected course variable here
          prompt: "Generate 3 flashcards for this course. Return as a JSON array of objects with 'question' and 'answer' properties."
        })
      });

      const data = await response.json();

      // 2. Save the AI's generated array to the state!
      setFlashcards(data.flashcards || []);

    } catch (error) {
      console.error("Failed to generate flashcards", error);
    }
  };
  const [currentCard, setCurrentCard] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [flashcardLoading, setFlashcardLoading] = useState(false);

  // Concept Explainer State
  const [concept, setConcept] = useState('');
  const [explainLevel, setExplainLevel] = useState('intermediate');
  const [explanation, setExplanation] = useState('');
  const [explainLoading, setExplainLoading] = useState(false);

  // Error State
  const [error, setError] = useState('');

  // Fetch enrolled courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get('/api/courses');
        const enrolled = res.data.filter(c =>
          c.students?.includes(user._id) || user.enrolledCourses?.includes(c._id)
        );
        setCourses(enrolled);
        if (enrolled.length > 0) {
          setSelectedCourseId(enrolled[0]._id);
        }
      } catch (err) {
        console.error('Failed to load student courses:', err);
      }
    };
    fetchCourses();
  }, [user]);

  // Scroll to bottom on chat updates
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, loading]);

  // Get course notes context
  const getCourseContext = async () => {
    try {
      const lessonsRes = await axios.get(`/api/lessons/course/${selectedCourseId}`);
      const lessonsData = lessonsRes.data;
      let notesContext = '';
      lessonsData.forEach((l, idx) => {
        notesContext += `Lesson ${idx + 1}: ${l.title}\nDescription: ${l.description}\n`;
        if (l.aiSummary) notesContext += `AI Summary: ${l.aiSummary}\n`;
        notesContext += '\n';
      });
      return notesContext || 'No lectures or syllabus notes uploaded yet for this course.';
    } catch {
      return 'No course notes available.';
    }
  };

  // Copy message to clipboard
  const handleCopy = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  // ─── CHAT HANDLER ───
  const handleSend = async (e, customPrompt = '') => {
    if (e) e.preventDefault();
    const query = customPrompt || question;
    if (!query.trim() || !selectedCourseId) return;

    setQuestion('');
    setError('');
    const newChat = [...chatHistory, { role: 'student', content: query }];
    setChatHistory(newChat);
    setLoading(true);

    try {
      const notesContext = await getCourseContext();
      const res = await axios.post('/api/ai/chat', {
        question: query,
        text: notesContext,
        history: newChat.slice(-8)
      });
      setChatHistory(prev => [...prev, { role: 'assistant', content: res.data.answer }]);
    } catch (err) {
      const errMsg = err.response?.data?.message || 'Failed to get AI response. Please check your Gemini API key.';
      setError(errMsg);
      setChatHistory(prev => [...prev, {
        role: 'assistant',
        content: `⚠️ **Error:** ${errMsg}\n\nMake sure your \`GEMINI_API_KEY\` is set in the backend \`.env\` file.`
      }]);
    } finally {
      setLoading(false);
    }
  };

  // ─── FLASHCARD HANDLER ───
  const handleGenerateFlashcards = async () => {
    if (!selectedCourseId) return;
    setFlashcardLoading(true);
    setError('');
    setFlashcards([]);
    setCurrentCard(0);
    setFlipped(false);

    try {
      const notesContext = await getCourseContext();
      const res = await axios.post('/api/ai/flashcards', { text: notesContext });
      setFlashcards(res.data.flashcards);
    } catch (err) {
      const errMsg = err.response?.data?.message || 'Failed to generate flashcards.';
      setError(errMsg);
    } finally {
      setFlashcardLoading(false);
    }
  };

  // ─── CONCEPT EXPLAINER HANDLER ───
  const handleExplain = async (e) => {
    e.preventDefault();
    if (!concept.trim()) return;
    setExplainLoading(true);
    setError('');
    setExplanation('');

    try {
      const res = await axios.post('/api/ai/explain', { concept, level: explainLevel });
      setExplanation(res.data.explanation);
    } catch (err) {
      const errMsg = err.response?.data?.message || 'Failed to explain concept.';
      setError(errMsg);
    } finally {
      setExplainLoading(false);
    }
  };

  // ─── MARKDOWN RENDERER ───
  const renderMarkdown = (text) => {
    return text.split('\n').map((line, idx) => {
      let formatted = line;
      // Bold **text**
      formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong class="text-brandViolet dark:text-purple-300">$1</strong>');
      // Italic *text*
      formatted = formatted.replace(/(?<!\*)\*(?!\*)(.*?)(?<!\*)\*(?!\*)/g, '<em>$1</em>');
      // Inline code `text`
      formatted = formatted.replace(/`(.*?)`/g, '<code class="bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-1.5 py-0.5 rounded text-xs font-mono">$1</code>');
      // Headers
      if (line.trim().startsWith('### ')) {
        return <h4 key={idx} className="font-bold text-sm mt-3 mb-1 text-gray-900 dark:text-white" dangerouslySetInnerHTML={{ __html: formatted.replace('### ', '') }} />;
      }
      if (line.trim().startsWith('## ')) {
        return <h3 key={idx} className="font-bold text-base mt-3 mb-1 text-gray-900 dark:text-white" dangerouslySetInnerHTML={{ __html: formatted.replace('## ', '') }} />;
      }
      if (line.trim().startsWith('# ')) {
        return <h2 key={idx} className="font-bold text-lg mt-3 mb-1 text-gray-900 dark:text-white" dangerouslySetInnerHTML={{ __html: formatted.replace('# ', '') }} />;
      }
      // Numbered list
      const numMatch = line.trim().match(/^(\d+)\.\s(.*)/);
      if (numMatch) {
        return (
          <div key={idx} className="flex gap-2 mb-1 ml-1">
            <span className="text-brandViolet font-bold text-xs mt-0.5 shrink-0">{numMatch[1]}.</span>
            <span className="text-sm" dangerouslySetInnerHTML={{ __html: formatted.replace(/^\d+\.\s/, '') }} />
          </div>
        );
      }
      // Bullet points
      if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
        return (
          <div key={idx} className="flex gap-2 mb-1 ml-2">
            <span className="text-brandViolet mt-1.5 shrink-0">•</span>
            <span className="text-sm" dangerouslySetInnerHTML={{ __html: formatted.replace(/^[-*]\s/, '') }} />
          </div>
        );
      }
      // Empty line
      if (!line.trim()) return <div key={idx} className="h-2" />;
      // Regular paragraph
      return <p key={idx} className="mb-1 text-sm" dangerouslySetInnerHTML={{ __html: formatted }} />;
    });
  };

  const starterPrompts = [
    "📚 Summarize the entire course",
    "🧠 Explain the most important concept",
    "📝 Give me 5 practice questions",
    "💡 Create a study plan for this course",
    "🔑 What are the key takeaways?",
    "🎯 How should I prepare for an exam?"
  ];

  const tabs = [
    { id: 'chat', label: 'AI Chat', icon: MessageSquare },
    { id: 'flashcards', label: 'Flashcards', icon: BookOpen },
    { id: 'explain', label: 'Concept Explainer', icon: Lightbulb },
  ];

  return (
    <div className="h-[82vh] flex flex-col bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl overflow-hidden shadow-xl">

      {/* ─── TOP BAR ─── */}
      <div className="p-4 border-b border-gray-100 dark:border-gray-800 bg-gradient-to-r from-purple-50 via-indigo-50 to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-purple-500/25">
              <Sparkles size={20} />
            </div>
            <div>
              <h2 className="font-bold text-sm flex items-center gap-1.5">
                SmartLearn AI
                <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800">
                  GEMINI 2.0
                </span>
              </h2>
              <p className="text-[10px] text-gray-400">Powered by Google Gemini AI</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Course:</label>
            {courses.length === 0 ? (
              <span className="text-xs text-red-400 font-semibold bg-red-500/10 px-3 py-1.5 rounded-lg border border-red-500/20">
                No Enrolled Courses
              </span>
            ) : (
              <select
                value={selectedCourseId}
                onChange={(e) => setSelectedCourseId(e.target.value)}
                className="px-3 py-1.5 rounded-xl bg-white dark:bg-gray-850 border border-gray-200 dark:border-gray-800 text-xs font-semibold focus:border-brandIndigo focus:ring-1 focus:ring-brandIndigo text-gray-800 dark:text-white"
              >
                {courses.map(c => (
                  <option key={c._id} value={c._id}>{c.title}</option>
                ))}
              </select>
            )}
          </div>
        </div>

        {/* ─── TAB BAR ─── */}
        <div className="flex gap-1 mt-3 bg-white/60 dark:bg-gray-800/50 p-1 rounded-xl">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${activeTab === tab.id
                ? 'bg-white dark:bg-gray-800 text-brandIndigo shadow-sm border border-gray-200 dark:border-gray-700'
                : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
            >
              <tab.icon size={14} />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="mx-4 mt-3 p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 flex items-center gap-2 text-xs text-red-600 dark:text-red-400">
          <AlertTriangle size={14} />
          {error}
          <button onClick={() => setError('')} className="ml-auto text-red-400 hover:text-red-600 cursor-pointer">✕</button>
        </div>
      )}

      {/* ═══════════ CHAT TAB ═══════════ */}
      {activeTab === 'chat' && (
        <>
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-mesh">
            {chatHistory.map((msg, index) => (
              <div
                key={index}
                className={`flex gap-3 max-w-3xl ${msg.role === 'student' ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
              >
                <div className={`h-8 w-8 rounded-xl flex items-center justify-center shrink-0 ${msg.role === 'student'
                  ? 'bg-indigo-500 text-white'
                  : 'bg-gradient-to-br from-purple-500 to-indigo-600 text-white shadow-sm'
                  }`}>
                  {msg.role === 'student' ? <User size={14} /> : <Bot size={14} />}
                </div>
                <div className={`group relative p-4 rounded-2xl text-sm leading-relaxed border shadow-sm ${msg.role === 'student'
                  ? 'bg-brandIndigo border-indigo-600 text-white rounded-tr-none'
                  : 'bg-white dark:bg-gray-850 border-gray-100 dark:border-gray-800 text-gray-800 dark:text-gray-200 rounded-tl-none'
                  }`}>
                  {renderMarkdown(msg.content)}

                  {/* Copy button for AI messages */}
                  {msg.role === 'assistant' && index > 0 && (
                    <button
                      onClick={() => handleCopy(msg.content, index)}
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"
                      title="Copy response"
                    >
                      {copiedIdx === index ? <Check size={12} className="text-green-500" /> : <Copy size={12} className="text-gray-400" />}
                    </button>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex gap-3 max-w-3xl mr-auto">
                <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <Bot size={14} />
                </div>
                <div className="p-4 rounded-2xl bg-white dark:bg-gray-850 border border-gray-100 dark:border-gray-800 rounded-tl-none flex items-center gap-2">
                  <Loader2 size={16} className="animate-spin text-brandViolet" />
                  <span className="text-xs text-gray-400">Gemini is thinking...</span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Starter prompts */}
          {courses.length > 0 && chatHistory.length === 1 && !loading && (
            <div className="px-6 py-3 border-t border-gray-100 dark:border-gray-850 bg-gray-50/50 dark:bg-gray-900/40">
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2 text-center">Quick Prompts</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {starterPrompts.map((p, pIdx) => (
                  <button
                    key={pIdx}
                    onClick={() => handleSend(null, p)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-850 bg-white dark:bg-gray-850 text-[10px] font-semibold text-gray-500 hover:text-brandIndigo hover:border-brandIndigo/40 hover:shadow-md transition-all cursor-pointer shadow-sm"
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Chat Input */}
          <form onSubmit={handleSend} className="p-4 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 flex gap-3">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              disabled={loading || courses.length === 0}
              placeholder={courses.length === 0 ? "Enroll in a course to start asking questions..." : "Ask Gemini AI anything about your course..."}
              className="flex-1 px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-850 border border-gray-200 dark:border-gray-800 text-gray-850 dark:text-gray-100 placeholder-gray-400 text-sm outline-none focus:border-brandIndigo focus:ring-1 focus:ring-brandIndigo transition-all"
            />
            <button
              type="submit"
              disabled={loading || !question.trim() || courses.length === 0}
              className="p-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl shadow-md hover:shadow-lg hover:from-purple-600 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
            </button>
          </form>
        </>
      )}

      {/* ═══════════ FLASHCARDS TAB ═══════════ */}
      {activeTab === 'flashcards' && (
        <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center justify-center">
          {flashcards.length === 0 ? (
            <div className="text-center max-w-md">
              <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-white flex items-center justify-center mx-auto mb-6 shadow-lg shadow-orange-500/25">
                <BookOpen size={36} />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">AI Flashcard Generator</h3>
              <p className="text-sm text-gray-500 mb-6">
                Gemini AI will analyze your course notes and create interactive flashcards for quick revision.
              </p>
              <button
                onClick={handleGenerateFlashcards}
                disabled={flashcardLoading || courses.length === 0}
                className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-semibold text-sm shadow-lg shadow-orange-500/25 hover:shadow-xl hover:from-amber-600 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer flex items-center gap-2 mx-auto"
              >
                {flashcardLoading ? (
                  <><Loader2 size={16} className="animate-spin" /> Generating with Gemini...</>
                ) : (
                  <><Zap size={16} /> Generate Flashcards</>
                )}
              </button>
            </div>
          ) : (
            <div className="w-full max-w-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-sm text-gray-700 dark:text-gray-300">
                  Card {currentCard + 1} of {flashcards.length}
                </h3>
                <button
                  onClick={handleGenerateFlashcards}
                  disabled={flashcardLoading}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-500 hover:text-brandIndigo border border-gray-200 dark:border-gray-800 hover:border-brandIndigo/40 transition-all cursor-pointer"
                >
                  <RotateCcw size={12} /> Regenerate
                </button>
              </div>

              {/* Flashcard */}
              <div
                onClick={() => setFlipped(!flipped)}
                className="relative w-full min-h-[250px] rounded-2xl border-2 border-gray-200 dark:border-gray-700 shadow-xl cursor-pointer transition-all hover:shadow-2xl"
                style={{ perspective: '1000px' }}
              >
                <div className={`w-full min-h-[250px] p-8 flex flex-col items-center justify-center text-center transition-all duration-500 rounded-2xl ${flipped
                  ? 'bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20'
                  : 'bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20'
                  }`}>
                  <span className={`text-[10px] font-bold uppercase tracking-wider mb-3 px-3 py-1 rounded-full ${flipped
                    ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400'
                    : 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400'
                    }`}>
                    {flipped ? '✓ Answer' : '? Question'}
                  </span>
                  <p className="text-lg font-semibold text-gray-800 dark:text-gray-200 leading-relaxed">
                    {flipped ? flashcards[currentCard]?.back : flashcards[currentCard]?.front}
                  </p>
                  <p className="text-[10px] text-gray-400 mt-4">Click to flip</p>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-4">
                <button
                  onClick={() => { setCurrentCard(Math.max(0, currentCard - 1)); setFlipped(false); }}
                  disabled={currentCard === 0}
                  className="flex items-center gap-1 px-4 py-2 rounded-xl text-xs font-semibold bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
                >
                  <ChevronLeft size={14} /> Previous
                </button>

                {/* Progress dots */}
                <div className="flex gap-1.5">
                  {Array.isArray(flashcards) && flashcards.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => { setCurrentCard(idx); setFlipped(false); }}
                      className={`h-2 w-2 rounded-full transition-all cursor-pointer ${idx === currentCard ? 'bg-brandIndigo w-6' : 'bg-gray-300 dark:bg-gray-700'
                        }`}
                    />
                  ))}
                </div>

                <button
                  onClick={() => { setCurrentCard(Math.min(flashcards.length - 1, currentCard + 1)); setFlipped(false); }}
                  disabled={currentCard === flashcards.length - 1}
                  className="flex items-center gap-1 px-4 py-2 rounded-xl text-xs font-semibold bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
                >
                  Next <ChevronRight size={14} />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ═══════════ CONCEPT EXPLAINER TAB ═══════════ */}
      {activeTab === 'explain' && (
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-2xl mx-auto">
            {/* Explainer Header */}
            <div className="text-center mb-6">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-yellow-400 to-amber-500 text-white flex items-center justify-center mx-auto mb-4 shadow-lg shadow-amber-500/25">
                <Lightbulb size={28} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Concept Explainer</h3>
              <p className="text-xs text-gray-500 mt-1">Enter any concept and Gemini AI will explain it at your level</p>
            </div>

            {/* Explainer Form */}
            <form onSubmit={handleExplain} className="space-y-4 mb-6">
              <input
                type="text"
                value={concept}
                onChange={(e) => setConcept(e.target.value)}
                placeholder='e.g. "Binary Search Trees", "React Hooks", "SQL Joins"...'
                className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-850 border border-gray-200 dark:border-gray-800 text-sm outline-none focus:border-brandIndigo focus:ring-1 focus:ring-brandIndigo transition-all"
              />

              {/* Level Selector */}
              <div className="flex items-center gap-2 justify-center">
                <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Level:</span>
                {['beginner', 'intermediate', 'advanced'].map(lvl => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setExplainLevel(lvl)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer border ${explainLevel === lvl
                      ? 'bg-brandIndigo text-white border-brandIndigo shadow-md'
                      : 'bg-white dark:bg-gray-850 text-gray-500 border-gray-200 dark:border-gray-800 hover:border-brandIndigo/40'
                      }`}
                  >
                    {lvl === 'beginner' && '🌱'} {lvl === 'intermediate' && '📘'} {lvl === 'advanced' && '🎓'} {lvl.charAt(0).toUpperCase() + lvl.slice(1)}
                  </button>
                ))}
              </div>

              <button
                type="submit"
                disabled={explainLoading || !concept.trim()}
                className="w-full py-3 bg-gradient-to-r from-yellow-500 to-amber-500 text-white rounded-xl font-semibold text-sm shadow-lg shadow-amber-500/25 hover:shadow-xl hover:from-yellow-600 hover:to-amber-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                {explainLoading ? (
                  <><Loader2 size={16} className="animate-spin" /> Gemini is thinking...</>
                ) : (
                  <><Lightbulb size={16} /> Explain This Concept</>
                )}
              </button>
            </form>

            {/* Explanation Result */}
            {explanation && (
              <div className="p-6 rounded-2xl bg-white dark:bg-gray-850 border border-gray-100 dark:border-gray-800 shadow-lg">
                <div className="flex items-center gap-2 mb-4">
                  <GraduationCap size={18} className="text-brandViolet" />
                  <h4 className="font-bold text-sm text-gray-900 dark:text-white">AI Explanation</h4>
                </div>
                <div className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {renderMarkdown(explanation)}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AIStudyAssistant;

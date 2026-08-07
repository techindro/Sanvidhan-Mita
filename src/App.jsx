import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import api from './api';
import { MOCK_COURSES, MOCK_QUIZ_QUESTIONS, PREAMBLE_DATA, generateSmartBotReply } from './mockData';
import './index.css';

function Navbar({ lang, setLang }) {
  const location = useLocation();
  return (
    <header className="app-header">
      <div className="nav-container">
        <Link to="/" className="brand-logo">
          <div className="brand-icon">📜</div>
          <div>
            <div className="brand-title">Sanvidhan Mitra</div>
            <span style={{ fontSize: '0.7rem', color: '#94A3B8', display: 'block', marginTop: '-4px' }}>
              {lang === 'hi' ? 'भारतीय संविधान ई-लर्निंग' : 'Indian Constitution AI Companion'}
            </span>
          </div>
        </Link>
        <div className="nav-links">
          <Link to="/" className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}>
            {lang === 'hi' ? 'गृह (Home)' : 'Home'}
          </Link>
          <Link to="/courses" className={`nav-item ${location.pathname === '/courses' ? 'active' : ''}`}>
            {lang === 'hi' ? 'पाठ्यक्रम (Courses)' : 'Courses'}
          </Link>
          <Link to="/quiz" className={`nav-item ${location.pathname === '/quiz' ? 'active' : ''}`}>
            {lang === 'hi' ? 'प्रश्नोत्तरी (Quiz)' : 'Quiz'}
          </Link>
          <Link to="/chat" className={`nav-item ${location.pathname === '/chat' ? 'active' : ''}`}>
            {lang === 'hi' ? 'एआई मित्र (AI Chat)' : 'AI Chat'}
          </Link>
          <Link to="/preamble" className={`nav-item ${location.pathname === '/preamble' ? 'active' : ''}`}>
            {lang === 'hi' ? 'प्रस्तावना' : 'Preamble'}
          </Link>
          <button className="lang-btn" onClick={() => setLang(l => (l === 'en' ? 'hi' : 'en'))}>
            🌐 {lang === 'en' ? 'हिन्दी' : 'English'}
          </button>
        </div>
      </div>
    </header>
  );
}

function Home({ lang }) {
  return (
    <div>
      <section className="glass-panel hero-banner">
        <div className="hero-badge">
          <span>✨</span> {lang === 'hi' ? 'भारत का संविधान जानिए' : 'Empowering Citizens through Constitutional Literacy'}
        </div>
        <h1 className="hero-title">
          {lang === 'hi' ? 'संविधान मित्र: आपका विधिक साथी' : 'Know Your Fundamental Rights & Legal Protections'}
        </h1>
        <p className="hero-subtitle">
          {lang === 'hi'
            ? 'भारतीय संविधान, मौलिक अधिकार, RTI अधिनियम और नागरिक सुरक्षा कानूनों को आसानी से समझें।'
            : 'Interactive e-learning, AI-driven constitutional assistant, and bite-sized quizzes designed for every citizen of India.'}
        </p>
        <div className="hero-actions">
          <Link to="/courses" className="btn-primary">
            🚀 {lang === 'hi' ? 'पाठ्यक्रम शुरू करें' : 'Explore Courses'}
          </Link>
          <Link to="/chat" className="btn-secondary">
            🤖 {lang === 'hi' ? 'एआई से सवाल पूछें' : 'Ask AI Assistant'}
          </Link>
        </div>
      </section>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-number">395+</div>
          <div className="stat-label">{lang === 'hi' ? 'अनुच्छेद (Articles)' : 'Constitutional Articles'}</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">12</div>
          <div className="stat-label">{lang === 'hi' ? 'अनुसूचियां (Schedules)' : 'Schedules'}</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">6</div>
          <div className="stat-label">{lang === 'hi' ? 'मौलिक अधिकार' : 'Fundamental Rights'}</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">106</div>
          <div className="stat-label">{lang === 'hi' ? 'संशोधन (Amendments)' : 'Landmark Amendments'}</div>
        </div>
      </div>

      <section className="glass-panel" style={{ marginTop: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--primary-saffron)' }}>
          🏛️ {lang === 'hi' ? 'संविधान मित्र की प्रमुख विशेषताएं' : 'Why Learn with Sanvidhan Mitra?'}
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '12px' }}>
            <h3 style={{ marginBottom: '0.5rem', fontSize: '1.1rem' }}>🗣️ Bilingual Support</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Learn in English or Hindi with easy legal explanations.</p>
          </div>
          <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '12px' }}>
            <h3 style={{ marginBottom: '0.5rem', fontSize: '1.1rem' }}>🤖 AI Legal Assistant</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Ask any question on RTI, Article 21, POSH Act, or Legal aid.</p>
          </div>
          <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '12px' }}>
            <h3 style={{ marginBottom: '0.5rem', fontSize: '1.1rem' }}>🎯 Interactive Quizzes</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Test your knowledge with real constitutional case scenarios.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

function Courses({ lang }) {
  const [courses, setCourses] = useState(MOCK_COURSES);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [activeModalCourse, setActiveModalCourse] = useState(null);

  useEffect(() => {
    api.get('/courses')
      .then(res => {
        if (res.data && res.data.length > 0) setCourses(res.data);
      })
      .catch(() => {
        // Smooth offline fallback to MOCK_COURSES
        setCourses(MOCK_COURSES);
      });
  }, []);

  const filteredCourses = courses.filter(c => {
    const matchesCat = selectedCategory === 'all' || c.category === selectedCategory;
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase()) || 
                          c.description.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div>
      <div className="section-header">
        <div>
          <h1 className="section-title">
            📚 {lang === 'hi' ? 'संवैधानिक पाठ्यक्रम' : 'Constitutional Courses'}
          </h1>
          <p style={{ color: 'var(--text-muted)' }}>
            {lang === 'hi' ? 'भारतीय संविधान और नागरिक अधिकारों पर आधारित पाठ' : 'Explore key rights, acts, and articles made easy for everyday citizens.'}
          </p>
        </div>
        <input 
          type="text" 
          placeholder={lang === 'hi' ? 'खोजें...' : 'Search courses...'} 
          value={search} 
          onChange={e => setSearch(e.target.value)}
          className="chat-input"
          style={{ maxWidth: '280px' }}
        />
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        {['all', 'fundamental-rights', 'anti-corruption', 'women-safety', 'dpsp', 'amendments'].map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className="prompt-chip"
            style={{
              borderColor: selectedCategory === cat ? 'var(--primary-saffron)' : 'var(--border-glass)',
              color: selectedCategory === cat ? 'var(--primary-saffron)' : 'var(--text-muted)',
              background: selectedCategory === cat ? 'rgba(255, 153, 51, 0.15)' : 'rgba(255,255,255,0.03)'
            }}
          >
            {cat === 'all' ? (lang === 'hi' ? 'सभी' : 'All') : cat.replace('-', ' ').toUpperCase()}
          </button>
        ))}
      </div>

      <div className="courses-grid">
        {filteredCourses.map(course => (
          <div key={course._id} className="course-card">
            <img src={course.image} alt={course.title} className="course-img" />
            <div className="course-body">
              <div className="course-tags">
                <span className="badge badge-orange">{course.level || 'Beginner'}</span>
                <span className="badge badge-purple">{course.duration || '3 hrs'}</span>
              </div>
              <h3 className="course-title">
                {lang === 'hi' && course.titleHindi ? course.titleHindi : course.title}
              </h3>
              <p className="course-desc">
                {lang === 'hi' && course.descriptionHindi ? course.descriptionHindi : course.description}
              </p>
              <div className="course-footer">
                <span>📖 {course.lessons || 10} {lang === 'hi' ? 'पाठ' : 'Lessons'}</span>
                <button 
                  onClick={() => setActiveModalCourse(course)}
                  className="btn-primary" 
                  style={{ padding: '0.4rem 0.9rem', fontSize: '0.85rem' }}
                >
                  {lang === 'hi' ? 'विवरण देखें' : 'View Course'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {activeModalCourse && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem'
        }}>
          <div className="glass-panel" style={{ maxWidth: '600px', width: '100%', position: 'relative' }}>
            <button 
              onClick={() => setActiveModalCourse(null)}
              style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', color: '#FFF', fontSize: '1.5rem', cursor: 'pointer' }}
            >
              ✕
            </button>
            <h2 style={{ color: 'var(--primary-saffron)', marginBottom: '1rem' }}>
              {lang === 'hi' && activeModalCourse.titleHindi ? activeModalCourse.titleHindi : activeModalCourse.title}
            </h2>
            <p style={{ marginBottom: '1.5rem', color: 'var(--text-muted)' }}>
              {lang === 'hi' && activeModalCourse.descriptionHindi ? activeModalCourse.descriptionHindi : activeModalCourse.description}
            </p>
            <h4 style={{ marginBottom: '0.75rem' }}>🎯 Key Topics Covered:</h4>
            <ul style={{ paddingLeft: '1.25rem', color: 'var(--text-main)', marginBottom: '1.5rem' }}>
              {(activeModalCourse.topics || ['Article Overview', 'Constitutional Significance', 'Practical Applications']).map((t, idx) => (
                <li key={idx} style={{ marginBottom: '0.4rem' }}>{t}</li>
              ))}
            </ul>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: 'var(--accent-gold)' }}>⭐ {activeModalCourse.rating || 4.9} ({activeModalCourse.enrolled || '10,000+ enrolled'})</span>
              <button onClick={() => { alert('Course enrolled successfully!'); setActiveModalCourse(null); }} className="btn-primary">
                Enrol Now (Free)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Quiz({ lang }) {
  const [questions, setQuestions] = useState(MOCK_QUIZ_QUESTIONS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  useEffect(() => {
    api.get('/quiz/random')
      .then(res => {
        if (res.data && Array.isArray(res.data)) setQuestions(res.data);
      })
      .catch(() => {
        setQuestions(MOCK_QUIZ_QUESTIONS);
      });
  }, []);

  const currentQ = questions[currentIndex] || MOCK_QUIZ_QUESTIONS[0];

  const handleSelect = (index) => {
    if (showAnswer) return;
    setSelectedOption(index);
  };

  const handleSubmit = () => {
    if (selectedOption === null) return;
    setShowAnswer(true);
    if (selectedOption === currentQ.correct) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(i => i + 1);
      setSelectedOption(null);
      setShowAnswer(false);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setShowAnswer(false);
    setScore(0);
    setQuizFinished(false);
  };

  if (quizFinished) {
    return (
      <div className="quiz-container glass-panel" style={{ textCenter: 'center', padding: '3rem 2rem', textAlign: 'center' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏆</div>
        <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
          {lang === 'hi' ? 'प्रश्नोत्तरी पूर्ण हुई!' : 'Quiz Completed!'}
        </h2>
        <p style={{ fontSize: '1.25rem', color: 'var(--primary-saffron)', marginBottom: '1.5rem' }}>
          {lang === 'hi' ? `आपका स्कोर: ${score} / ${questions.length}` : `Your Score: ${score} out of ${questions.length}`}
        </p>
        <button onClick={handleRestart} className="btn-primary">
          🔄 {lang === 'hi' ? 'पुनः प्रयास करें' : 'Try Again'}
        </button>
      </div>
    );
  }

  return (
    <div className="quiz-container glass-panel">
      <div className="quiz-header">
        <span style={{ fontWeight: 700, color: 'var(--primary-saffron)' }}>
          {lang === 'hi' ? `प्रश्न ${currentIndex + 1} / ${questions.length}` : `Question ${currentIndex + 1} of ${questions.length}`}
        </span>
        <span className="badge badge-purple">
          {lang === 'hi' ? `स्कोर: ${score}` : `Score: ${score}`}
        </span>
      </div>

      <h2 className="question-text">
        {lang === 'hi' && currentQ.questionHindi ? currentQ.questionHindi : currentQ.question}
      </h2>

      <div className="options-grid">
        {(lang === 'hi' && currentQ.optionsHindi ? currentQ.optionsHindi : currentQ.options).map((opt, idx) => {
          let optClass = 'option-btn';
          if (selectedOption === idx) optClass += ' selected';
          if (showAnswer) {
            if (idx === currentQ.correct) optClass += ' correct-opt';
            else if (selectedOption === idx) optClass += ' wrong-opt';
          }
          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              className={optClass}
              disabled={showAnswer}
            >
              {String.fromCharCode(65 + idx)}. {opt}
            </button>
          );
        })}
      </div>

      {showAnswer && (
        <div className="explanation-box">
          <h4 style={{ color: '#6EE7B7', marginBottom: '0.4rem' }}>
            💡 {lang === 'hi' ? 'व्याख्या (Explanation):' : 'Explanation & Article Reference:'}
          </h4>
          <p style={{ fontSize: '0.95rem' }}>
            {lang === 'hi' && currentQ.explanationHindi ? currentQ.explanationHindi : currentQ.explanation}
          </p>
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
        {!showAnswer ? (
          <button onClick={handleSubmit} className="btn-primary" disabled={selectedOption === null}>
            {lang === 'hi' ? 'उत्तर की पुष्टि करें' : 'Submit Answer'}
          </button>
        ) : (
          <button onClick={handleNext} className="btn-primary">
            {currentIndex + 1 < questions.length ? (lang === 'hi' ? 'अगला प्रश्न ➡️' : 'Next Question ➡️') : (lang === 'hi' ? 'परिणाम देखें 🏆' : 'View Results 🏆')}
          </button>
        )}
      </div>
    </div>
  );
}

function Chat({ lang }) {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: lang === 'hi' 
      ? 'नमस्ते! मैं आपका संविधान मित्र एआई सहायक हूँ। आप मुझसे अनुच्छेद 21, आरटीआई अधिनियम, मौलिक अधिकार या महिलाओं के कानूनी अधिकारों पर कोई भी प्रश्न पूछ सकते हैं।' 
      : 'Hello! I am your Sanvidhan Mitra AI Assistant. Ask me anything about Article 21, RTI filing, Fundamental Rights, or Legal protections.' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = (textToSend) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg = { role: 'user', content: query };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    api.post('/ai/chat', { prompt: query })
      .then(res => {
        setIsTyping(false);
        const botReply = res.data && res.data.reply ? res.data.reply : generateSmartBotReply(query);
        setMessages(prev => [...prev, { role: 'assistant', content: botReply }]);
      })
      .catch(() => {
        // Fallback smart offline answer
        setTimeout(() => {
          setIsTyping(false);
          const botReply = generateSmartBotReply(query);
          setMessages(prev => [...prev, { role: 'assistant', content: botReply }]);
        }, 600);
      });
  };

  return (
    <div className="chat-container glass-panel">
      <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid var(--border-glass)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontWeight: 700, color: 'var(--primary-saffron)' }}>🤖 Sanvidhan AI Assistant</span>
        <button onClick={() => setMessages([])} style={{ background: 'none', border: 'none', color: 'var(--text-subtle)', cursor: 'pointer', fontSize: '0.85rem' }}>
          🗑️ {lang === 'hi' ? 'चैट साफ़ करें' : 'Clear Chat'}
        </button>
      </div>

      <div className="chat-messages">
        {messages.map((m, i) => (
          <div key={i} className={`message-bubble ${m.role === 'user' ? 'message-user' : 'message-bot'}`}>
            {m.content}
          </div>
        ))}
        {isTyping && (
          <div className="message-bubble message-bot" style={{ fontStyle: 'italic', opacity: 0.7 }}>
            ⚡ Sanvidhan Mitra is analyzing legal articles...
          </div>
        )}
      </div>

      <div className="pre-prompts">
        <span style={{ fontSize: '0.8rem', color: 'var(--text-subtle)', alignSelf: 'center' }}>{lang === 'hi' ? 'सुझाव:' : 'Quick Questions:'}</span>
        {['Article 21 Rights', 'How to file RTI?', 'What is Article 14?', 'Fundamental Duties'].map((q, idx) => (
          <button key={idx} className="prompt-chip" onClick={() => sendMessage(q)}>
            {q}
          </button>
        ))}
      </div>

      <div className="chat-input-area">
        <input 
          className="chat-input" 
          value={input} 
          onChange={e => setInput(e.target.value)} 
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
          placeholder={lang === 'hi' ? 'संविधान या अधिकारों के बारे में पूछें...' : 'Ask about Indian Constitution, Articles, RTI...'} 
        />
        <button onClick={() => sendMessage()} className="btn-primary">
          {lang === 'hi' ? 'भेजें' : 'Send'}
        </button>
      </div>
    </div>
  );
}

function Preamble({ lang }) {
  const data = PREAMBLE_DATA[lang] || PREAMBLE_DATA.en;
  return (
    <div className="glass-panel" style={{ maxWidth: '800px', margin: '0 auto', padding: '3rem 2.5rem' }}>
      <div style={{ textAlign: 'center', borderBottom: '1px solid var(--border-glass)', paddingBottom: '1.5rem', marginBottom: '2rem' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', color: 'var(--primary-saffron)', fontSize: '2.2rem' }}>
          {data.title}
        </h1>
        <h2 style={{ fontSize: '1.25rem', letterSpacing: '2px', color: 'var(--accent-gold)' }}>
          {data.subtitle}
        </h2>
      </div>

      <p style={{ fontSize: '1.15rem', fontStyle: 'italic', marginBottom: '2rem', lineHeight: '1.8' }}>
        "{data.text}"
      </p>

      <div style={{ display: 'grid', gap: '1rem', marginBottom: '2.5rem' }}>
        {data.values.map((v, idx) => (
          <div key={idx} style={{ padding: '1rem 1.25rem', background: 'rgba(255, 153, 51, 0.05)', borderLeft: '4px solid var(--primary-saffron)', borderRadius: '4px' }}>
            <strong style={{ color: 'var(--primary-saffron)', display: 'block', marginBottom: '0.2rem' }}>
              {v.key}
            </strong>
            <span style={{ color: 'var(--text-muted)' }}>{v.desc}</span>
          </div>
        ))}
      </div>

      <p style={{ fontSize: '0.95rem', color: 'var(--text-subtle)', textAlign: 'center', borderTop: '1px solid var(--border-glass)', paddingTop: '1.5rem' }}>
        {data.adoption}
      </p>
    </div>
  );
}

function App() {
  const [lang, setLang] = useState('en');

  return (
    <Router>
      <Navbar lang={lang} setLang={setLang} />
      <main className="main-wrapper">
        <Routes>
          <Route path="/" element={<Home lang={lang} />} />
          <Route path="/courses" element={<Courses lang={lang} />} />
          <Route path="/quiz" element={<Quiz lang={lang} />} />
          <Route path="/chat" element={<Chat lang={lang} />} />
          <Route path="/preamble" element={<Preamble lang={lang} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <footer className="app-footer">
        <p>© 2026 Sanvidhan Mitra. Built for constitutional awareness and public empowerment in India. 🇮🇳</p>
      </footer>
    </Router>
  );
}

export default App;

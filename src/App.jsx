import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { COURSES_DATA, DAILY_ARTICLE_DRISHTI, QUIZ_DRISHTI, PREAMBLE_SIMPLE, getSimpleAnswer } from './mockData';
import './index.css';

function TopStrip({ lang, setLang }) {
  return (
    <div className="drishti-top-strip">
      <div>
        <span>📞 हेल्पलाइन: 1800-200-1010 | ✉️ ईमेल: support@sanvidhanmitra.in</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span>संविधान अध्ययन एवं नागरिक जागरूकता मंच</span>
        <button className="lang-toggle-btn" onClick={() => setLang(l => (l === 'hi' ? 'en' : 'hi'))}>
          🌐 {lang === 'hi' ? 'English' : 'हिंदी'}
        </button>
      </div>
    </div>
  );
}

function MainHeader({ lang, search, setSearch }) {
  const location = useLocation();

  return (
    <header className="drishti-main-header">
      <div className="header-container">
        <Link to="/" className="brand-box">
          <div className="brand-logo-emblem">सं</div>
          <div className="brand-text">
            <span className="brand-main-title">
              {lang === 'hi' ? 'संविधान मित्र' : 'SANVIDHAN MITRA'}
            </span>
            <span className="brand-tagline">
              {lang === 'hi' ? 'भारतीय संविधान अध्ययन केंद्र' : 'Indian Constitution Learning Center'}
            </span>
          </div>
        </Link>

        <div className="search-input-box">
          <span className="search-icon-svg">🔍</span>
          <input
            type="text"
            placeholder={lang === 'hi' ? 'अनुच्छेद, अधिकार या विषय खोजें...' : 'Search Articles or Rights...'}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <nav className="nav-links-menu">
          <Link to="/" className={`nav-menu-item ${location.pathname === '/' ? 'active' : ''}`}>
            {lang === 'hi' ? 'गृह' : 'Home'}
          </Link>
          <Link to="/courses" className={`nav-menu-item ${location.pathname === '/courses' ? 'active' : ''}`}>
            {lang === 'hi' ? 'पाठ्यक्रम' : 'Courses'}
          </Link>
          <Link to="/quiz" className={`nav-menu-item ${location.pathname === '/quiz' ? 'active' : ''}`}>
            {lang === 'hi' ? 'डेली क्विज़' : 'Daily Quiz'}
          </Link>
          <Link to="/doubt-solver" className={`nav-menu-item ${location.pathname === '/doubt-solver' ? 'active' : ''}`}>
            {lang === 'hi' ? 'प्रश्न उत्तर' : 'Doubt Solver'}
          </Link>
          <Link to="/preamble" className={`nav-menu-item ${location.pathname === '/preamble' ? 'active' : ''}`}>
            {lang === 'hi' ? 'प्रस्तावना' : 'Preamble'}
          </Link>
        </nav>
      </div>
    </header>
  );
}

function HomePage({ lang, search }) {
  const [selectedCourse, setSelectedCourse] = useState(null);

  const filteredCourses = COURSES_DATA.filter(c => {
    const title = lang === 'hi' ? c.title : c.titleEng;
    const desc = lang === 'hi' ? c.description : c.descriptionEng;
    return title.toLowerCase().includes(search.toLowerCase()) || desc.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div>
      {/* HERO SECTION */}
      <section className="drishti-hero-box">
        <div>
          <h1 className="hero-heading">
            {lang === 'hi'
              ? 'भारतीय संविधान एवं राजव्यवस्था'
              : 'Indian Constitution & Public Law'}
          </h1>
          <p className="hero-subheading">
            {lang === 'hi'
              ? 'संविधान के प्रमुख अनुच्छेदों, मौलिक अधिकारों, नीति निर्देशक तत्वों और नागरिक अधिकारों का सरल एवं प्रामाणिक अध्ययन।'
              : 'Comprehensive guide to Constitutional Articles, Fundamental Rights, RTI Act, and Citizen Protections.'}
          </p>

          <ul className="hero-bullet-list">
            <li className="hero-bullet-item">
              📌 {lang === 'hi' ? 'मौलिक अधिकार (अनुच्छेद 12-35) की विस्तृत व्याख्या' : 'Detailed Analysis of Fundamental Rights (Articles 12-35)'}
            </li>
            <li className="hero-bullet-item">
              📌 {lang === 'hi' ? 'प्रतिदिन 10 अभ्यास प्रश्नों की मॉडल सीरीज' : 'Daily Practice Quiz Series'}
            </li>
            <li className="hero-bullet-item">
              📌 {lang === 'hi' ? 'सूचना का अधिकार (RTI) और नागरिक सुरक्षा कानून' : 'Right to Information (RTI) & Consumer Rights'}
            </li>
          </ul>

          <div>
            <Link to="/courses" className="btn-drishti-primary">
              📚 {lang === 'hi' ? 'पाठ्यक्रम देखें' : 'View Courses'}
            </Link>
            <Link to="/quiz" className="btn-drishti-secondary">
              ✍️ {lang === 'hi' ? 'डेली क्विज़ दें' : 'Take Daily Quiz'}
            </Link>
          </div>
        </div>

        <div className="hero-side-card">
          <h3 className="side-card-title">
            📢 {lang === 'hi' ? 'सूचना एवं अपडेट' : 'Notice & Updates'}
          </h3>
          <p style={{ fontSize: '0.9rem', marginBottom: '0.75rem' }}>
            {lang === 'hi'
              ? 'संविधान मित्र पर सभी अध्ययन सामग्री और अभ्यास क्विज़ 100% निःशुल्क उपलब्ध हैं।'
              : 'All study material, articles explanation, and practice test series are 100% free for all students.'}
          </p>
          <div style={{ background: '#FFF', padding: '0.65rem', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 600 }}>
            {lang === 'hi' ? '✓ अध्ययन हेतु कोई शुल्क नहीं' : '✓ No Registration Fee Required'}
          </div>
        </div>
      </section>

      {/* STATS ROW */}
      <section className="drishti-stats-row">
        <div className="stat-item-box">
          <div className="stat-item-number">395+</div>
          <div className="stat-item-label">{lang === 'hi' ? 'अनुच्छेद (Articles)' : 'Articles Covered'}</div>
        </div>
        <div className="stat-item-box">
          <div className="stat-item-number">12</div>
          <div className="stat-item-label">{lang === 'hi' ? 'अनुसूचियां (Schedules)' : 'Schedules'}</div>
        </div>
        <div className="stat-item-box">
          <div className="stat-item-number">6</div>
          <div className="stat-item-label">{lang === 'hi' ? 'मौलिक अधिकार' : 'Fundamental Rights'}</div>
        </div>
        <div className="stat-item-box">
          <div className="stat-item-number">100%</div>
          <div className="stat-item-label">{lang === 'hi' ? 'निःशुल्क सामग्री' : 'Free Access'}</div>
        </div>
      </section>

      {/* ARTICLE OF THE DAY */}
      <section className="article-day-card">
        <div style={{ color: 'var(--drishti-red-dark)', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
          💡 {lang === 'hi' ? 'आज का अनुच्छेद' : 'ARTICLE OF THE DAY'}
        </div>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--drishti-navy-dark)', marginBottom: '0.5rem' }}>
          {lang === 'hi' ? DAILY_ARTICLE_DRISHTI.articleNo : 'Article 21 (Protection of Life & Personal Liberty)'}
        </h2>
        <p style={{ fontStyle: 'italic', fontSize: '1rem', color: 'var(--text-dark)', marginBottom: '0.75rem' }}>
          "{lang === 'hi' ? DAILY_ARTICLE_DRISHTI.text : DAILY_ARTICLE_DRISHTI.textEng}"
        </p>
        <div style={{ background: '#F8FAFC', padding: '0.85rem 1rem', borderRadius: '4px', borderLeft: '3px solid var(--drishti-red)' }}>
          <strong style={{ color: 'var(--drishti-red-dark)' }}>व्याख्या: </strong>
          <span style={{ fontSize: '0.9rem' }}>{DAILY_ARTICLE_DRISHTI.explanation}</span>
        </div>
      </section>

      {/* COURSES LIST */}
      <section>
        <div className="drishti-section-header">
          <h2 className="drishti-section-title">
            📖 {lang === 'hi' ? 'उपलब्ध अध्ययन पाठ्यक्रम' : 'Available Study Modules'}
          </h2>
        </div>

        <div className="courses-list-grid">
          {filteredCourses.map(c => (
            <div key={c.id} className="course-item-card">
              <span className="category-tag">{c.tag}</span>
              <h3 className="course-item-title">
                {lang === 'hi' ? c.title : c.titleEng}
              </h3>
              <p className="course-item-desc">
                {lang === 'hi' ? c.description : c.descriptionEng}
              </p>
              <div className="course-item-footer">
                <span>⏱️ {c.duration} | 📖 {c.lessons}</span>
                <button onClick={() => setSelectedCourse(c)} className="btn-drishti-primary" style={{ padding: '0.4rem 0.85rem', fontSize: '0.82rem' }}>
                  {lang === 'hi' ? 'विवरण देखें' : 'View Details'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* COURSE MODAL */}
      {selectedCourse && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, padding: '1rem'
        }}>
          <div className="quiz-box-container" style={{ position: 'relative', width: '100%', maxWidth: '600px', margin: 0 }}>
            <button onClick={() => setSelectedCourse(null)} style={{ position: 'absolute', top: '1rem', right: '1.25rem', background: 'none', border: 'none', fontSize: '1.4rem', cursor: 'pointer' }}>
              ✕
            </button>
            <h2 style={{ fontSize: '1.4rem', color: 'var(--drishti-red-dark)', marginBottom: '0.5rem' }}>
              {lang === 'hi' ? selectedCourse.title : selectedCourse.titleEng}
            </h2>
            <p style={{ fontSize: '0.92rem', marginBottom: '1.25rem', color: 'var(--text-body)' }}>
              {lang === 'hi' ? selectedCourse.description : selectedCourse.descriptionEng}
            </p>
            <h4 style={{ marginBottom: '0.5rem', color: 'var(--drishti-navy-dark)' }}>मुख्य विषय:</h4>
            <ul style={{ paddingLeft: '1.25rem', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
              {selectedCourse.topics.map((t, idx) => (
                <li key={idx} style={{ marginBottom: '0.3rem' }}>{t}</li>
              ))}
            </ul>
            <button onClick={() => { alert('अध्ययन सामग्री एक्सेस की गई!'); setSelectedCourse(null); }} className="btn-drishti-primary" style={{ width: '100%', justifyContent: 'center' }}>
              {lang === 'hi' ? 'अध्ययन सामग्री पढ़ना शुरू करें' : 'Start Reading'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function CoursesPage({ lang, search }) {
  return (
    <div>
      <div className="drishti-section-header">
        <h1 className="drishti-section-title">📖 {lang === 'hi' ? 'सभी पाठ्यक्रम' : 'All Courses'}</h1>
      </div>
      <HomePage lang={lang} search={search} />
    </div>
  );
}

function QuizPage({ lang }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const q = QUIZ_DRISHTI[currentIdx];

  const handleSelect = (idx) => {
    if (showAnswer) return;
    setSelectedOpt(idx);
  };

  const handleSubmit = () => {
    if (selectedOpt === null) return;
    setShowAnswer(true);
    if (selectedOpt === q.correct) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 < QUIZ_DRISHTI.length) {
      setCurrentIdx(i => i + 1);
      setSelectedOpt(null);
      setShowAnswer(false);
    } else {
      setCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOpt(null);
    setShowAnswer(false);
    setScore(0);
    setCompleted(false);
  };

  if (completed) {
    return (
      <div className="quiz-box-container" style={{ textAlign: 'center', padding: '3rem 2rem' }}>
        <h2 style={{ fontSize: '1.8rem', color: 'var(--drishti-navy-dark)', marginBottom: '0.5rem' }}>
          {lang === 'hi' ? 'अभ्यास क्विज़ पूर्ण हुआ' : 'Quiz Completed'}
        </h2>
        <p style={{ fontSize: '1.2rem', color: 'var(--drishti-red)', fontWeight: 700, marginBottom: '1.5rem' }}>
          {lang === 'hi' ? `आपका स्कोर: ${score} / ${QUIZ_DRISHTI.length}` : `Score: ${score} / ${QUIZ_DRISHTI.length}`}
        </p>
        <button onClick={handleRestart} className="btn-drishti-primary">
          🔄 {lang === 'hi' ? 'पुनः प्रयास करें' : 'Try Again'}
        </button>
      </div>
    );
  }

  return (
    <div className="quiz-box-container">
      <div className="quiz-header-bar">
        <span>✍️ {lang === 'hi' ? 'दैनिक संविधान क्विज़' : 'Daily Polity Quiz'}</span>
        <span>{lang === 'hi' ? `प्रश्न ${currentIdx + 1} / ${QUIZ_DRISHTI.length}` : `Question ${currentIdx + 1} of ${QUIZ_DRISHTI.length}`}</span>
      </div>

      <h2 className="question-heading">
        {lang === 'hi' ? q.question : q.questionEng}
      </h2>

      <div className="options-list-group">
        {(lang === 'hi' ? q.options : q.optionsEng).map((opt, idx) => {
          let btnClass = 'option-item-btn';
          if (selectedOpt === idx) btnClass += ' selected';
          if (showAnswer) {
            if (idx === q.correct) btnClass += ' correct-option';
            else if (selectedOpt === idx) btnClass += ' wrong-option';
          }
          return (
            <button key={idx} onClick={() => handleSelect(idx)} className={btnClass} disabled={showAnswer}>
              <strong>{String.fromCharCode(65 + idx)}.</strong> {opt}
            </button>
          );
        })}
      </div>

      {showAnswer && (
        <div className="explanation-info-box">
          <strong>💡 व्याख्या: </strong>
          <span>{q.explanation}</span>
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        {!showAnswer ? (
          <button onClick={handleSubmit} className="btn-drishti-primary" disabled={selectedOpt === null}>
            {lang === 'hi' ? 'उत्तर की पुष्टि करें' : 'Submit'}
          </button>
        ) : (
          <button onClick={handleNext} className="btn-drishti-primary">
            {currentIdx + 1 < QUIZ_DRISHTI.length ? (lang === 'hi' ? 'अगला प्रश्न ➡️' : 'Next ➡️') : (lang === 'hi' ? 'परिणाम देखें' : 'View Result')}
          </button>
        )}
      </div>
    </div>
  );
}

function DoubtSolverPage({ lang }) {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: lang === 'hi'
      ? 'नमस्कार! यह संविधान प्रश्न उत्तर केंद्र है। आप भारतीय संविधान, अनुच्छेदों या नागरिक अधिकारों से संबंधित अपना प्रश्न यहां पूछ सकते हैं।'
      : 'Welcome! You can ask any question regarding Indian Constitution, Articles, or RTI rights here.' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    const query = input;
    setMessages(prev => [...prev, { role: 'user', content: query }]);
    setInput('');

    setTimeout(() => {
      const answer = getSimpleAnswer(query);
      setMessages(prev => [...prev, { role: 'assistant', content: answer }]);
    }, 400);
  };

  return (
    <div className="doubt-box-container">
      <div className="doubt-header">
        <span>💬 {lang === 'hi' ? 'प्रश्न समाधान एवं संशय निवारण' : 'Constitution Doubt Solver'}</span>
        <button onClick={() => setMessages([])} style={{ background: 'none', border: 'none', color: '#FFF', cursor: 'pointer', fontSize: '0.85rem' }}>
          🗑️ {lang === 'hi' ? 'साफ़ करें' : 'Clear'}
        </button>
      </div>

      <div className="doubt-messages-area">
        {messages.map((m, idx) => (
          <div key={idx} className={`msg-bubble ${m.role === 'user' ? 'msg-user' : 'msg-assistant'}`}>
            {m.content}
          </div>
        ))}
      </div>

      <div className="doubt-input-form">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
          placeholder={lang === 'hi' ? 'अपना प्रश्न यहां लिखें (उदा: अनुच्छेद 21 क्या है?)...' : 'Type your question...'}
        />
        <button onClick={handleSend} className="btn-drishti-primary">
          {lang === 'hi' ? 'पूछें' : 'Ask'}
        </button>
      </div>
    </div>
  );
}

function PreamblePage({ lang }) {
  const p = PREAMBLE_SIMPLE[lang] || PREAMBLE_SIMPLE.hi;
  return (
    <div className="quiz-box-container" style={{ maxWidth: '850px' }}>
      <div style={{ textAlign: 'center', borderBottom: '2px solid var(--drishti-red)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
        <h1 style={{ color: 'var(--drishti-red-dark)', fontSize: '2rem', fontWeight: 800 }}>
          {p.heading}
        </h1>
        <h3 style={{ color: 'var(--drishti-navy-dark)', fontSize: '1.15rem' }}>
          {p.subheading}
        </h3>
      </div>
      <div style={{ fontSize: '1.05rem', lineHeight: '1.8', whiteSpace: 'pre-wrap', color: 'var(--text-dark)' }}>
        {p.body}
      </div>
    </div>
  );
}

function App() {
  const [lang, setLang] = useState('hi');
  const [search, setSearch] = useState('');

  return (
    <Router>
      <TopStrip lang={lang} setLang={setLang} />
      <MainHeader lang={lang} search={search} setSearch={setSearch} />

      <main className="drishti-main-content">
        <Routes>
          <Route path="/" element={<HomePage lang={lang} search={search} />} />
          <Route path="/courses" element={<CoursesPage lang={lang} search={search} />} />
          <Route path="/quiz" element={<QuizPage lang={lang} />} />
          <Route path="/doubt-solver" element={<DoubtSolverPage lang={lang} />} />
          <Route path="/preamble" element={<PreamblePage lang={lang} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <footer className="drishti-footer">
        <div className="footer-container">
          <div>
            <h3 style={{ color: '#FFF', fontSize: '1.2rem', marginBottom: '0.5rem' }}>संविधान मित्र 📜</h3>
            <p style={{ fontSize: '0.85rem', lineHeight: '1.6' }}>
              भारतीय संविधान और नागरिक अधिकारों के अध्ययन हेतु समर्पित मंच।
            </p>
          </div>
          <div>
            <h4 className="footer-col-title">मुख्य पृष्ठ</h4>
            <ul className="footer-link-list">
              <li><Link to="/">गृह (Home)</Link></li>
              <li><Link to="/courses">पाठ्यक्रम (Courses)</Link></li>
              <li><Link to="/quiz">डेली क्विज़ (Quiz)</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="footer-col-title">संसाधन</h4>
            <ul className="footer-link-list">
              <li><Link to="/doubt-solver">प्रश्न समाधान</Link></li>
              <li><Link to="/preamble">संविधान की प्रस्तावना</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="footer-col-title">संपर्क</h4>
            <p>📞 हेल्पलाइन: 1800-200-1010</p>
            <p>✉️ ईमेल: support@sanvidhanmitra.in</p>
          </div>
        </div>
        <div style={{ textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem' }}>
          <p>© 2026 संविधान मित्र | सर्वाधिकार सुरक्षित। 🇮🇳</p>
        </div>
      </footer>
    </Router>
  );
}

export default App;

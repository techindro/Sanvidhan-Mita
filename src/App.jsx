import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import api from './api';
import { EDTECH_BATCHES, DAILY_ARTICLE, QUIZ_QUESTIONS_PW, TESTIMONIALS, PREAMBLE_TEXTS, getAiDoubtAnswer } from './mockData';
import './index.css';

function NoticeBar({ lang }) {
  return (
    <div className="top-notice-bar">
      <span className="notice-badge">🔥 NEW BATCH</span>
      <span>
        {lang === 'hi'
          ? 'यूपीएससी एवं संविधान कानून 2026 फाउंडेशन बैच प्रारंभ | 100% निशुल्क एक्सेस | हेल्पलाइन: 1800-SANVIDHAN'
          : 'UPSC CSE & Constitutional Rights Foundation Batch 2026 Live Now | 100% Free Access | Helpline: 1800-SANVIDHAN'}
      </span>
    </div>
  );
}

function Header({ lang, setLang, search, setSearch, openAuthModal }) {
  const location = useLocation();

  return (
    <header className="edtech-header">
      <div className="header-inner">
        <Link to="/" className="logo-group">
          <div className="logo-icon">📜</div>
          <div className="logo-text-box">
            <span className="logo-title">SANVIDHAN MITRA</span>
            <span className="logo-subtitle">
              {lang === 'hi' ? 'भारत का #1 संविधान शिक्षण संस्थान' : 'India\'s #1 Constitutional EdTech'}
            </span>
          </div>
        </Link>

        <div className="header-search">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder={lang === 'hi' ? 'अनुच्छेद, अधिकार, RTI या प्रश्न खोजें...' : 'Search Articles, Fundamental Rights, RTI...'}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <nav className="nav-menu">
          <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
            🏠 {lang === 'hi' ? 'होम' : 'Home'}
          </Link>
          <Link to="/batches" className={`nav-link ${location.pathname === '/batches' ? 'active' : ''}`}>
            📚 {lang === 'hi' ? 'बैच एवं कोर्सेस' : 'Batches'}
          </Link>
          <Link to="/test-series" className={`nav-link ${location.pathname === '/test-series' ? 'active' : ''}`}>
            ✍️ {lang === 'hi' ? 'फ्री टेस्ट सीरीज़' : 'Free Tests'}
          </Link>
          <Link to="/saarthi-ai" className={`nav-link ${location.pathname === '/saarthi-ai' ? 'active' : ''}`}>
            🤖 {lang === 'hi' ? 'AI सारथी' : 'AI Saarthi'}
          </Link>
          <Link to="/preamble" className={`nav-link ${location.pathname === '/preamble' ? 'active' : ''}`}>
            📜 {lang === 'hi' ? 'प्रस्तावना' : 'Preamble'}
          </Link>

          <button className="lang-switch" onClick={() => setLang(l => (l === 'en' ? 'hi' : 'en'))}>
            🌐 {lang === 'en' ? 'हिंदी' : 'English'}
          </button>

          <button className="btn-header-cta" onClick={openAuthModal}>
            👤 {lang === 'hi' ? 'लॉगइन / रजिस्ट्रेशन' : 'Login / Register'}
          </button>
        </nav>
      </div>
    </header>
  );
}

function Home({ lang, search, openAuthModal }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedBatch, setSelectedBatch] = useState(null);

  const filteredBatches = EDTECH_BATCHES.filter(b => {
    const matchCat = activeCategory === 'all' || b.category === activeCategory;
    const matchQuery = b.title.toLowerCase().includes(search.toLowerCase()) ||
                       b.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchQuery;
  });

  return (
    <div>
      {/* HERO BANNER SECTION */}
      <section className="hero-edtech-grid">
        <div>
          <div className="hero-tag-badge">
            ⚡ {lang === 'hi' ? 'अब हर नागरिक बनेगा संविधान से सशक्त' : 'Empowering 140 Crore Indian Citizens'}
          </div>
          <h1 className="hero-main-title">
            {lang === 'hi'
              ? 'संविधान मित्र: भारत का विश्वसनीय विधिक शिक्षण मंच'
              : 'Master Indian Constitution & Legal Rights with India\'s Leading EdTech Platform'}
          </h1>
          <p className="hero-sub-text">
            {lang === 'hi'
              ? 'UPSC राजव्यवस्था (Polity), मौलिक अधिकार, RTI अधिनियम और नागरिक अधिकारों का संपूर्ण अध्ययन - PW और Drishti IAS पैटर्न पर आधारित।'
              : 'Interactive live batches, AI-powered 24x7 doubt solver, and UPSC prelims test series designed by legal scholars & polity experts.'}
          </p>

          <div className="checklist-grid">
            <div className="check-item">
              <span className="check-icon">✓</span> {lang === 'hi' ? 'लाइव एवं रिकॉर्डेड क्लासेज' : 'Live & Recorded Video Lectures'}
            </div>
            <div className="check-item">
              <span className="check-icon">✓</span> {lang === 'hi' ? 'AI संविधान सारथी (24x7 Doubt Solver)' : 'AI Sanvidhan Saarthi Doubt Solver'}
            </div>
            <div className="check-item">
              <span className="check-icon">✓</span> {lang === 'hi' ? '1000+ टॉपिक-वाइज प्रैक्टिस प्रश्न' : '1000+ Topic-wise Practice Questions'}
            </div>
            <div className="check-item">
              <span className="check-icon">✓</span> {lang === 'hi' ? 'द्विभाषी पीडीएफ नोट्स (Hindi & Eng)' : 'Bilingual Handouts & Mindmaps'}
            </div>
          </div>

          <div className="hero-cta-group">
            <Link to="/batches" className="btn-cta-primary">
              🚀 {lang === 'hi' ? 'फ्री बैच में एनरोल करें' : 'Explore Free Batches'}
            </Link>
            <Link to="/saarthi-ai" className="btn-cta-secondary">
              🤖 {lang === 'hi' ? 'AI सारथी से डाउट पूछें' : 'Try AI Doubt Solver'}
            </Link>
          </div>
        </div>

        <div className="hero-card-widget">
          <img src="/hero_banner.png" alt="Sanvidhan Mitra EdTech Banner" className="hero-card-img" />
          <div className="hero-card-body">
            <div className="live-pill">
              <span className="pulsing-dot"></span> 🔴 LIVE BATCH 2026
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.4rem', color: '#FFF' }}>
              UPSC & State PCS Polity Foundation Batch
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '1rem' }}>
              By Dr. A.K. Sharma (Ex-IAS Advisor) & Legal Scholar Panel
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: 'var(--ed-emerald)', fontWeight: 800, fontSize: '1.2rem' }}>FREE ACCESS</span>
              <button onClick={openAuthModal} className="btn-header-cta">
                Enroll Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="stats-strip">
        <div className="stat-box">
          <div className="stat-box-icon icon-blue">📖</div>
          <div>
            <div className="stat-val">395+</div>
            <div className="stat-lbl">{lang === 'hi' ? 'अनुच्छेद (Articles Covered)' : 'Articles Covered'}</div>
          </div>
        </div>
        <div className="stat-box">
          <div className="stat-box-icon icon-saffron">📜</div>
          <div>
            <div className="stat-val">12</div>
            <div className="stat-lbl">{lang === 'hi' ? 'अनुसूचियां (Schedules)' : 'Schedules Explained'}</div>
          </div>
        </div>
        <div className="stat-box">
          <div className="stat-box-icon icon-green">👥</div>
          <div>
            <div className="stat-val">150,000+</div>
            <div className="stat-lbl">{lang === 'hi' ? 'सक्रिय विद्यार्थी (Learners)' : 'Enrolled Students'}</div>
          </div>
        </div>
        <div className="stat-box">
          <div className="stat-box-icon icon-purple">⭐</div>
          <div>
            <div className="stat-val">4.9 / 5</div>
            <div className="stat-lbl">{lang === 'hi' ? 'स्टूडेंट रेटिंग (Rating)' : 'Student Rating'}</div>
          </div>
        </div>
      </section>

      {/* ARTICLE OF THE DAY SECTION */}
      <section className="article-today-banner">
        <div className="today-tag">
          💡 {lang === 'hi' ? 'आज का महत्वपूर्ण अनुच्छेद' : 'ARTICLE OF THE DAY (UPSC FACT)'}
        </div>
        <h2 style={{ fontSize: '1.6rem', color: '#FDE047', fontWeight: 800, marginBottom: '0.4rem' }}>
          {lang === 'hi' ? DAILY_ARTICLE.titleHindi : DAILY_ARTICLE.title} ({DAILY_ARTICLE.articleNo})
        </h2>
        <p style={{ fontSize: '1.05rem', fontStyle: 'italic', marginBottom: '1rem', color: '#FFF' }}>
          "{lang === 'hi' ? DAILY_ARTICLE.textHindi : DAILY_ARTICLE.text}"
        </p>
        <div style={{ background: 'rgba(255,255,255,0.06)', padding: '1rem', borderRadius: '10px', borderLeft: '4px solid #FDE047' }}>
          <strong style={{ color: '#FDE047' }}>📌 UPSC & Legal Exam Insight: </strong>
          <span style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>{DAILY_ARTICLE.upscFact}</span>
        </div>
      </section>

      {/* FEATURED BATCHES & COURSES GRID */}
      <section>
        <div className="section-title-group">
          <h2 className="main-sec-heading">
            🎯 {lang === 'hi' ? 'प्रमुख बैचेस एवं कोर्सेस' : 'Featured Batches & Learning Modules'}
          </h2>
          <p className="main-sec-sub">
            {lang === 'hi'
              ? 'अपनी परीक्षा एवं विधिक जागरूकता के अनुसार सही बैच चुनें'
              : 'Choose the right course tailored for UPSC, Law Entrance, and Citizen Awareness.'}
          </p>
        </div>

        <div className="category-tabs">
          {[
            { id: 'all', label: lang === 'hi' ? 'सभी बैचेस (All Batches)' : 'All Batches' },
            { id: 'upsc-polity', label: lang === 'hi' ? 'यूपीएससी राजव्यवस्था' : 'UPSC Polity' },
            { id: 'fundamental-rights', label: lang === 'hi' ? 'मौलिक अधिकार' : 'Fundamental Rights' },
            { id: 'rti-law', label: lang === 'hi' ? 'RTI एवं एंटी-करप्शन' : 'RTI & Anti-Corruption' },
            { id: 'women-rights', label: lang === 'hi' ? 'महिला सुरक्षा अधिकार' : 'Women Rights' }
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setActiveCategory(t.id)}
              className={`tab-btn ${activeCategory === t.id ? 'active-tab' : ''}`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="batches-grid">
          {filteredBatches.map(batch => (
            <div key={batch._id} className="batch-card">
              <span className="batch-tag-pill" style={{ background: batch.tagColor }}>
                {batch.tag}
              </span>
              <img src={batch.image} alt={batch.title} className="batch-thumb" />
              <div className="batch-content">
                <h3 className="batch-title">
                  {lang === 'hi' && batch.titleHindi ? batch.titleHindi : batch.title}
                </h3>
                <div className="instructor-info">
                  <span>👨‍🏫 {batch.instructor}</span>
                </div>
                <div className="batch-meta-row">
                  <span>🎥 {batch.lessons} Lessons</span>
                  <span>✍️ {batch.tests} Tests</span>
                  <span>⏱️ {batch.duration}</span>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '1.25rem' }}>
                  {lang === 'hi' && batch.descriptionHindi ? batch.descriptionHindi : batch.description}
                </p>
                <div className="batch-price-row">
                  <div className="price-box">
                    <span className="free-price">{batch.price}</span>
                    <span className="orig-price">{batch.originalPrice}</span>
                  </div>
                  <button onClick={() => setSelectedBatch(batch)} className="btn-header-cta">
                    {lang === 'hi' ? 'बैच विवरण देखें' : 'Explore Batch'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* STUDENT TESTIMONIALS */}
      <section style={{ marginTop: '4rem' }}>
        <div className="section-title-group">
          <h2 className="main-sec-heading">
            ⭐ {lang === 'hi' ? 'विद्यार्थियों का विश्वास (Student Reviews)' : 'Trusted by Thousands of Aspirants'}
          </h2>
          <p className="main-sec-sub">Read what UPSC aspirants and law learners say about Sanvidhan Mitra.</p>
        </div>
        <div className="testimonials-grid">
          {TESTIMONIALS.map((t, idx) => (
            <div key={idx} className="testimonial-card">
              <div className="user-profile">
                <img src={t.avatar} alt={t.name} className="user-avatar" />
                <div>
                  <h4 style={{ color: '#FFF', fontSize: '1rem', fontWeight: 700 }}>{t.name}</h4>
                  <span style={{ color: 'var(--ed-saffron)', fontSize: '0.78rem', fontWeight: 600 }}>{t.role}</span>
                </div>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', fontStyle: 'italic' }}>
                "{t.text}"
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* BATCH DETAIL MODAL */}
      {selectedBatch && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, padding: '1.5rem'
        }}>
          <div className="quiz-card-wrapper" style={{ position: 'relative', width: '100%', maxWidth: '650px' }}>
            <button
              onClick={() => setSelectedBatch(null)}
              style={{ position: 'absolute', top: '1rem', right: '1.25rem', background: 'none', border: 'none', color: '#FFF', fontSize: '1.5rem', cursor: 'pointer' }}
            >
              ✕
            </button>
            <span className="batch-tag-pill" style={{ background: selectedBatch.tagColor, position: 'static', display: 'inline-block', marginBottom: '1rem' }}>
              {selectedBatch.tag}
            </span>
            <h2 style={{ fontSize: '1.6rem', color: '#FFF', marginBottom: '0.5rem' }}>
              {lang === 'hi' && selectedBatch.titleHindi ? selectedBatch.titleHindi : selectedBatch.title}
            </h2>
            <p style={{ color: 'var(--ed-saffron)', fontWeight: 600, fontSize: '0.92rem', marginBottom: '1rem' }}>
              Instructor: {selectedBatch.instructor} ({selectedBatch.instructorTitle})
            </p>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              {lang === 'hi' && selectedBatch.descriptionHindi ? selectedBatch.descriptionHindi : selectedBatch.description}
            </p>
            <h4 style={{ color: '#FFF', marginBottom: '0.75rem' }}>📚 What You Will Get in this Batch:</h4>
            <ul style={{ color: 'var(--text-primary)', paddingLeft: '1.2rem', marginBottom: '1.5rem' }}>
              {selectedBatch.features.map((f, i) => (
                <li key={i} style={{ marginBottom: '0.4rem' }}>{f}</li>
              ))}
            </ul>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-light)', paddingTop: '1rem' }}>
              <div>
                <span style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--ed-emerald)' }}>FREE</span>
                <span style={{ textDecoration: 'line-through', color: 'var(--text-muted)', marginLeft: '0.5rem' }}>{selectedBatch.originalPrice}</span>
              </div>
              <button onClick={() => { alert('Success! You have enrolled in this batch.'); setSelectedBatch(null); }} className="btn-cta-primary">
                Confirm Free Enrollment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function BatchesPage({ lang, search }) {
  return (
    <div>
      <div className="section-title-group">
        <h1 className="main-sec-heading">📚 {lang === 'hi' ? 'सभी कोर्सेस एवं बैचेस' : 'Complete Course Directory'}</h1>
        <p className="main-sec-sub">Browse all structured batches for UPSC CSE, Law Examinations, and General Citizen Awareness.</p>
      </div>
      <Home lang={lang} search={search} openAuthModal={() => {}} />
    </div>
  );
}

function TestSeriesPage({ lang }) {
  const [questions, setQuestions] = useState(QUIZ_QUESTIONS_PW);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const q = questions[currentIdx];

  const handleOptionClick = (idx) => {
    if (showExplanation) return;
    setSelectedOpt(idx);
  };

  const handleCheckAnswer = () => {
    if (selectedOpt === null) return;
    setShowExplanation(true);
    if (selectedOpt === q.correct) {
      setScore(s => s + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx(i => i + 1);
      setSelectedOpt(null);
      setShowExplanation(false);
    } else {
      setFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOpt(null);
    setShowExplanation(false);
    setScore(0);
    setFinished(false);
  };

  if (finished) {
    return (
      <div className="quiz-card-wrapper" style={{ textAlign: 'center', padding: '3.5rem 2rem' }}>
        <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>🏆</div>
        <h2 style={{ fontSize: '2.2rem', color: '#FFF', marginBottom: '0.5rem' }}>
          {lang === 'hi' ? 'अभ्यास टेस्ट पूर्ण हुआ!' : 'Test Series Completed!'}
        </h2>
        <p style={{ fontSize: '1.35rem', color: 'var(--ed-saffron)', fontWeight: 700, marginBottom: '1.5rem' }}>
          {lang === 'hi' ? `आपका स्कोर: ${score} / ${questions.length}` : `Final Score: ${score} out of ${questions.length}`}
        </p>
        <button onClick={handleRestart} className="btn-cta-primary">
          🔄 {lang === 'hi' ? 'पुनः टेस्ट दें' : 'Re-take Test'}
        </button>
      </div>
    );
  }

  return (
    <div className="quiz-card-wrapper">
      <div className="quiz-top-bar">
        <div>
          <span style={{ background: 'rgba(37, 99, 235, 0.2)', color: '#60A5FA', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.78rem', fontWeight: 800 }}>
            {q.examTag}
          </span>
        </div>
        <div style={{ fontWeight: 700, color: 'var(--ed-saffron)' }}>
          Question {currentIdx + 1} of {questions.length} | Score: {score}
        </div>
      </div>

      <h2 className="q-text">
        {lang === 'hi' && q.questionHindi ? q.questionHindi : q.question}
      </h2>

      <div className="opt-list">
        {q.options.map((opt, idx) => {
          let btnClass = 'opt-btn-edtech';
          if (selectedOpt === idx) btnClass += ' selected';
          if (showExplanation) {
            if (idx === q.correct) btnClass += ' correct-ans';
            else if (selectedOpt === idx) btnClass += ' wrong-ans';
          }
          return (
            <button
              key={idx}
              onClick={() => handleOptionClick(idx)}
              className={btnClass}
              disabled={showExplanation}
            >
              <span style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem' }}>
                {String.fromCharCode(65 + idx)}
              </span>
              <span>{opt}</span>
            </button>
          );
        })}
      </div>

      {showExplanation && (
        <div className="explanation-card">
          <h4 style={{ color: '#6EE7B7', fontWeight: 800, marginBottom: '0.5rem' }}>
            💡 Detailed Explanation & Supreme Court Citations:
          </h4>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-primary)' }}>
            {lang === 'hi' && q.explanationHindi ? q.explanationHindi : q.explanation}
          </p>
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
        {!showExplanation ? (
          <button onClick={handleCheckAnswer} className="btn-cta-primary" disabled={selectedOpt === null}>
            Submit Answer
          </button>
        ) : (
          <button onClick={handleNextQuestion} className="btn-cta-primary">
            {currentIdx + 1 < questions.length ? 'Next Question ➡️' : 'View Test Result 🏆'}
          </button>
        )}
      </div>
    </div>
  );
}

function SaarthiAiPage({ lang }) {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: lang === 'hi'
      ? 'नमस्ते! मैं आपका संविधान AI सारथी (24x7 Doubt Solver) हूँ। आप मुझसे UPSC पॉलिटी, अनुच्छेद 21, आरटीआई प्रक्रिया, POSH अधिनियम या किसी भी विधिक अधिकार पर प्रश्न पूछ सकते हैं।'
      : 'Welcome to Sanvidhan AI Saarthi (24x7 Instant Doubt Solver)! Ask any question on Indian Polity, Articles, RTI Act, or Constitutional Rights.' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (text) => {
    const query = text || input;
    if (!query.trim()) return;

    setMessages(prev => [...prev, { role: 'user', content: query }]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const reply = getAiDoubtAnswer(query);
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    }, 500);
  };

  return (
    <div className="saarthi-container">
      <div className="saarthi-topbar">
        <div className="saarthi-title">
          <span>🤖 SANVIDHAN AI SAARTHI</span>
          <span style={{ fontSize: '0.72rem', background: 'rgba(16, 185, 129, 0.2)', color: '#10B981', padding: '0.15rem 0.5rem', borderRadius: '4px', textTransform: 'uppercase' }}>
            ONLINE 24X7
          </span>
        </div>
        <button onClick={() => setMessages([])} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.85rem' }}>
          🗑️ Clear Chat
        </button>
      </div>

      <div className="saarthi-chat-area">
        {messages.map((m, i) => (
          <div key={i} className={`bubble ${m.role === 'user' ? 'bubble-user' : 'bubble-ai'}`}>
            {m.content}
          </div>
        ))}
        {isTyping && (
          <div className="bubble bubble-ai" style={{ fontStyle: 'italic', opacity: 0.8 }}>
            ⚡ Sanvidhan Saarthi is retrieving constitutional articles...
          </div>
        )}
      </div>

      <div style={{ padding: '0.5rem 1.25rem', display: 'flex', gap: '0.5rem', overflowX: 'auto', background: 'rgba(15,23,42,0.6)' }}>
        {['Article 21 Rights', 'How to file RTI?', 'What is Article 14?', 'POSH Act Details'].map((q, idx) => (
          <button key={idx} onClick={() => handleSend(q)} className="tab-btn" style={{ fontSize: '0.78rem', padding: '0.3rem 0.75rem' }}>
            {q}
          </button>
        ))}
      </div>

      <div className="saarthi-input-row">
        <input
          type="text"
          className="header-search"
          style={{ flex: 1, maxWidth: '100%' }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder={lang === 'hi' ? 'पॉलिटी या संविधान का कोई भी प्रश्न पूछें...' : 'Ask any polity doubt (e.g. Article 21, RTI, Writs)...'}
        />
        <button onClick={() => handleSend()} className="btn-cta-primary">
          Send
        </button>
      </div>
    </div>
  );
}

function PreamblePage({ lang }) {
  const pData = PREAMBLE_TEXTS[lang] || PREAMBLE_TEXTS.en;
  return (
    <div className="quiz-card-wrapper" style={{ maxWidth: '850px', padding: '3rem 2.5rem' }}>
      <div style={{ textAlign: 'center', borderBottom: '1px solid var(--border-light)', paddingBottom: '1.5rem', marginBottom: '2rem' }}>
        <h1 style={{ fontFamily: 'var(--font-serif)', color: 'var(--ed-saffron)', fontSize: '2.4rem' }}>
          {pData.heading}
        </h1>
        <h3 style={{ letterSpacing: '2px', color: '#FDE047', fontSize: '1.25rem', marginTop: '0.4rem' }}>
          {pData.subheading}
        </h3>
      </div>

      <p style={{ fontSize: '1.15rem', fontStyle: 'italic', marginBottom: '2rem', lineHeight: '1.8', color: '#FFF' }}>
        "{pData.text}"
      </p>

      <div style={{ display: 'grid', gap: '1rem', marginBottom: '2.5rem' }}>
        {[
          { key: 'JUSTICE (न्याय)', text: pData.justice },
          { key: 'LIBERTY (स्वतंत्रता)', text: pData.liberty },
          { key: 'EQUALITY (समता)', text: pData.equality },
          { key: 'FRATERNITY (बंधुता)', text: pData.fraternity }
        ].map((item, idx) => (
          <div key={idx} style={{ background: 'rgba(255, 153, 51, 0.06)', borderLeft: '4px solid var(--ed-saffron)', padding: '1rem 1.25rem', borderRadius: '4px' }}>
            <strong style={{ color: 'var(--ed-saffron)', display: 'block', marginBottom: '0.2rem' }}>{item.key}</strong>
            <span style={{ color: 'var(--text-secondary)' }}>{item.text}</span>
          </div>
        ))}
      </div>

      <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.92rem', borderTop: '1px solid var(--border-light)', paddingTop: '1.5rem' }}>
        {pData.date}
      </p>
    </div>
  );
}

function AuthModal({ isOpen, onClose, lang }) {
  const [email, setEmail] = useState('');
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 3000, padding: '1rem'
    }}>
      <div className="quiz-card-wrapper" style={{ width: '100%', maxWidth: '420px', position: 'relative', textAlign: 'center' }}>
        <button
          onClick={onClose}
          style={{ position: 'absolute', top: '1rem', right: '1.25rem', background: 'none', border: 'none', color: '#FFF', fontSize: '1.5rem', cursor: 'pointer' }}
        >
          ✕
        </button>
        <h2 style={{ fontSize: '1.75rem', color: '#FFF', marginBottom: '0.5rem' }}>
          {lang === 'hi' ? 'संविधान मित्र में आपका स्वागत है' : 'Student Login & Signup'}
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
          Join 150,000+ students learning Indian Polity & Fundamental Rights
        </p>

        <input
          type="email"
          placeholder="Enter Email / Phone Number"
          className="header-search"
          style={{ width: '100%', marginBottom: '1rem', padding: '0.8rem 1rem' }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={() => { alert('OTP Sent! Demo Login successful.'); onClose(); }}
          className="btn-cta-primary"
          style={{ width: '100%', justifyContent: 'center', padding: '0.85rem' }}
        >
          Continue with Email / OTP
        </button>
      </div>
    </div>
  );
}

function App() {
  const [lang, setLang] = useState('en');
  const [search, setSearch] = useState('');
  const [authModalOpen, setAuthModalOpen] = useState(false);

  return (
    <Router>
      <NoticeBar lang={lang} />
      <Header
        lang={lang}
        setLang={setLang}
        search={search}
        setSearch={setSearch}
        openAuthModal={() => setAuthModalOpen(true)}
      />

      <main className="edtech-wrapper">
        <Routes>
          <Route path="/" element={<Home lang={lang} search={search} openAuthModal={() => setAuthModalOpen(true)} />} />
          <Route path="/batches" element={<BatchesPage lang={lang} search={search} />} />
          <Route path="/test-series" element={<TestSeriesPage lang={lang} />} />
          <Route path="/saarthi-ai" element={<SaarthiAiPage lang={lang} />} />
          <Route path="/preamble" element={<PreamblePage lang={lang} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} lang={lang} />

      <footer className="edtech-footer">
        <div className="footer-grid">
          <div>
            <h3 style={{ color: '#FFF', fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.8rem' }}>
              SANVIDHAN MITRA 📜
            </h3>
            <p style={{ fontSize: '0.88rem', lineHeight: '1.6', color: 'var(--text-secondary)' }}>
              India's premier EdTech & Constitutional literacy platform modeled for UPSC aspirants, legal scholars, and every citizen of India.
            </p>
          </div>
          <div>
            <h4 className="footer-col-title">Batches & Courses</h4>
            <ul className="footer-links">
              <li><Link to="/batches">UPSC CSE Polity 2026</Link></li>
              <li><Link to="/batches">Fundamental Rights</Link></li>
              <li><Link to="/batches">RTI Act 2005 Masterclass</Link></li>
              <li><Link to="/batches">Women Safety & POSH Act</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="footer-col-title">Free Resources</h4>
            <ul className="footer-links">
              <li><Link to="/test-series">Daily Prelims Test Series</Link></li>
              <li><Link to="/saarthi-ai">AI Saarthi Doubt Solver</Link></li>
              <li><Link to="/preamble">Preamble & Articles Vault</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="footer-col-title">Support & Helpline</h4>
            <p style={{ fontSize: '0.85rem', marginBottom: '0.5rem' }}>📞 Helpline: 1800-SANVIDHAN (Toll Free)</p>
            <p style={{ fontSize: '0.85rem' }}>✉️ Email: support@sanvidhanmitra.in</p>
          </div>
        </div>
        <div style={{ textAlign: 'center', borderTop: '1px solid var(--border-light)', paddingTop: '1.5rem' }}>
          <p>© 2026 Sanvidhan Mitra. All Rights Reserved. Empowering Democracy through Education. 🇮🇳</p>
        </div>
      </footer>
    </Router>
  );
}

export default App;

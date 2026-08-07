import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import api from './api';
import './index.css';

function Navbar() {
  return (
    <nav className="navbar flex row">
      <Link to="/">Home</Link>
      <Link to="/courses">Courses</Link>
      <Link to="/quiz">Quiz</Link>
      <Link to="/chat">AI Chat</Link>
    </nav>
  );
}

function Home() {
  return (
    <section className="center glass">
      <h1>Welcome to Sanvidhan Mitra</h1>
      <p>Your AI‑powered Indian Constitution e‑learning companion.</p>
    </section>
  );
}

function Courses() {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    api.get('/courses')
      .then(res => setCourses(res.data))
      .catch(err => console.error(err));
  }, []);
  return (
    <section className="grid glass">
      {courses.map(c => (
        <div key={c._id} className="glass">
          <h3>{c.title}</h3>
          <p>{c.description}</p>
        </div>
      ))}
    </section>
  );
}

function Quiz() {
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState('');
  const fetchQuestion = () => {
    api.get('/quiz/random')
      .then(res => setQuestion(res.data))
      .catch(err => console.error(err));
  };
  useEffect(fetchQuestion, []);
  const submitAnswer = () => {
    api.post('/quiz/answer', { questionId: question._id, answer })
      .then(res => {
        alert(res.data.correct ? 'Correct!' : 'Try again');
        fetchQuestion();
        setAnswer('');
      })
      .catch(err => console.error(err));
  };
  if (!question) return <p>Loading...</p>;
  return (
    <section className="glass">
      <h3>{question.text}</h3>
      <input value={answer} onChange={e => setAnswer(e.target.value)} placeholder="Your answer" />
      <button onClick={submitAnswer}>Submit</button>
    </section>
  );
}

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const sendMessage = () => {
    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    api.post('/ai/chat', { prompt: input })
      .then(res => {
        const botMsg = { role: 'assistant', content: res.data.reply };
        setMessages(prev => [...prev, botMsg]);
        setInput('');
      })
      .catch(err => console.error(err));
  };
  return (
    <section className="glass">
      <div className="chat-window" style={{ maxHeight: '300px', overflowY: 'auto', marginBottom: '1rem' }}>
        {messages.map((m, i) => (
          <p key={i} style={{ textAlign: m.role === 'user' ? 'right' : 'left' }}>
            <strong>{m.role}:</strong> {m.content}
          </p>
        ))}
      </div>
      <input value={input} onChange={e => setInput(e.target.value)} placeholder="Ask something..." />
      <button onClick={sendMessage}>Send</button>
    </section>
  );
}

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;

import { useState } from 'react';
import api from '../api/axiosConfig';
import { MessageSquare, Send, RotateCcw, Star, Clock } from 'lucide-react';

const MockInterview = () => {
  const [step, setStep] = useState('setup'); // setup, interview, result
  const [config, setConfig] = useState({ type: 'TECHNICAL', difficulty: 'MEDIUM' });
  const [questions, setQuestions] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const sampleQuestions = {
    TECHNICAL: {
      EASY: [
        { q: "What is the difference between ArrayList and LinkedList in Java?", topic: "Java Collections" },
        { q: "Explain the difference between REST and SOAP.", topic: "Web Services" },
        { q: "What is a primary key in a database?", topic: "SQL" }
      ],
      MEDIUM: [
        { q: "Explain how Spring Boot auto-configuration works.", topic: "Spring Boot" },
        { q: "What are the SOLID principles? Explain with examples.", topic: "OOP Design" },
        { q: "How does JWT authentication work? Explain the flow.", topic: "Security" }
      ],
      HARD: [
        { q: "Design a URL shortener like bit.ly. Discuss database schema, scaling, and collision handling.", topic: "System Design" },
        { q: "Explain how database indexing works internally. When would you NOT use an index?", topic: "Database Internals" },
        { q: "Implement a thread-safe singleton pattern in Java. Compare different approaches.", topic: "Concurrency" }
      ]
    },
    BEHAVIORAL: {
      MEDIUM: [
        { q: "Tell me about a time you faced a conflict in your team. How did you resolve it?", topic: "Teamwork" },
        { q: "Describe a situation where you had to learn a new technology quickly.", topic: "Adaptability" },
        { q: "Tell me about a project that failed. What did you learn?", topic: "Growth Mindset" }
      ]
    }
  };

  const startInterview = () => {
    const qs = sampleQuestions[config.type]?.[config.difficulty] || sampleQuestions.TECHNICAL.MEDIUM;
    setQuestions(qs);
    setAnswers(new Array(qs.length).fill(''));
    setCurrentQ(0);
    setStep('interview');
  };

  const submitAnswer = () => {
    const newAnswers = [...answers];
    newAnswers[currentQ] = currentAnswer;
    setAnswers(newAnswers);
    setCurrentAnswer('');

    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      finishInterview(newAnswers);
    }
  };

  const finishInterview = (finalAnswers) => {
    setLoading(true);

    // Simulate AI scoring
    const scores = finalAnswers.map(ans => {
      const length = ans.length;
      if (length > 200) return Math.floor(Math.random() * 3) + 7; // 7-9
      if (length > 100) return Math.floor(Math.random() * 3) + 5; // 5-7
      return Math.floor(Math.random() * 3) + 3; // 3-5
    });

    const avgScore = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);

    const feedback = scores.map((score, i) => ({
      question: questions[i].q,
      topic: questions[i].topic,
      score,
      feedback: score >= 8 ? "Excellent answer! You demonstrated deep understanding." :
                score >= 6 ? "Good answer. Consider adding more specific examples." :
                "Needs improvement. Try to structure your answer with the STAR method."
    }));

    setResult({
      overallScore: avgScore,
      totalQuestions: questions.length,
      feedback,
      strengths: [...new Set(feedback.filter(f => f.score >= 7).map(f => f.topic))],
      improvements: [...new Set(feedback.filter(f => f.score < 6).map(f => f.topic))]
    });

    setStep('result');
    setLoading(false);
  };

  if (step === 'setup') {
    return (
      <div className="space-y-6 max-w-2xl">
        <div>
          <h1 className="text-2xl font-bold">Mock Interview Simulator</h1>
          <p className="text-gray-600">Practice with AI-generated interview questions</p>
        </div>

        <div className="card space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Interview Type</label>
            <div className="grid grid-cols-3 gap-3">
              {['TECHNICAL', 'BEHAVIORAL', 'SYSTEM_DESIGN'].map(type => (
                <button key={type}
                  onClick={() => setConfig({...config, type})}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    config.type === type ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 hover:border-gray-300'
                  }`}>
                  {type === 'SYSTEM_DESIGN' ? 'System Design' : type.charAt(0) + type.slice(1).toLowerCase()}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Difficulty</label>
            <div className="grid grid-cols-3 gap-3">
              {['EASY', 'MEDIUM', 'HARD'].map(diff => (
                <button key={diff}
                  onClick={() => setConfig({...config, difficulty: diff})}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    config.difficulty === diff ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 hover:border-gray-300'
                  }`}>
                  {diff.charAt(0) + diff.slice(1).toLowerCase()}
                </button>
              ))}
            </div>
          </div>

          <button onClick={startInterview} className="w-full btn-primary flex items-center justify-center gap-2">
            <MessageSquare size={18} /> Start Interview
          </button>
        </div>
      </div>
    );
  }

  if (step === 'interview') {
    return (
      <div className="space-y-6 max-w-3xl">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Question {currentQ + 1} of {questions.length}</h1>
          <div className="flex items-center gap-2 text-gray-500">
            <Clock size={16} /> <span>Take your time</span>
          </div>
        </div>

        <div className="card">
          <div className="mb-4">
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">{questions[currentQ].topic}</span>
          </div>
          <h2 className="text-lg font-semibold mb-4">{questions[currentQ].q}</h2>

          <textarea
            className="input-field"
            rows={6}
            value={currentAnswer}
            onChange={(e) => setCurrentAnswer(e.target.value)}
            placeholder="Type your answer here..."
          />

          <div className="flex justify-between items-center mt-4">
            <span className="text-sm text-gray-500">{currentAnswer.length} characters</span>
            <button
              onClick={submitAnswer}
              disabled={currentAnswer.length < 20}
              className="btn-primary flex items-center gap-2 disabled:opacity-50"
            >
              <Send size={18} /> {currentQ === questions.length - 1 ? 'Finish' : 'Next'}
            </button>
          </div>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-blue-600 h-2 rounded-full transition-all"
            style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }} />
        </div>
      </div>
    );
  }

  if (loading) return <div className="p-6 text-center">Analyzing your answers...</div>;

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Interview Complete!</h1>
        <div className="inline-flex items-center gap-2 mt-4">
          <div className={`text-5xl font-bold ${
            result.overallScore >= 8 ? 'text-green-600' :
            result.overallScore >= 6 ? 'text-yellow-600' : 'text-red-600'
          }`}>
            {result.overallScore}/10
          </div>
        </div>
        <p className="text-gray-600 mt-2">
          {result.overallScore >= 8 ? '🎉 Outstanding! You are interview-ready!' :
           result.overallScore >= 6 ? '👍 Good job! A little more practice and you will ace it.' :
           '💪 Keep practicing! Focus on the areas below.'}
        </p>
      </div>

      {/* Strengths & Improvements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="card border-green-200 bg-green-50">
          <h3 className="font-semibold text-green-700 mb-2 flex items-center gap-2">
            <Star size={18} /> Strengths
          </h3>
          <ul className="space-y-1">
            {result.strengths.map((s, i) => (
              <li key={i} className="text-sm text-green-700">✓ {s}</li>
            ))}
          </ul>
        </div>
        <div className="card border-orange-200 bg-orange-50">
          <h3 className="font-semibold text-orange-700 mb-2 flex items-center gap-2">
            <RotateCcw size={18} /> Areas to Improve
          </h3>
          <ul className="space-y-1">
            {result.improvements.map((imp, i) => (
              <li key={i} className="text-sm text-orange-700">→ {imp}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Detailed Feedback */}
      <div className="space-y-4">
        <h2 className="font-semibold text-lg">Detailed Feedback</h2>
        {result.feedback.map((item, i) => (
          <div key={i} className="card">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="font-medium text-sm">{item.question}</p>
                <p className="text-gray-600 text-sm mt-2">{item.feedback}</p>
              </div>
              <div className={`text-lg font-bold ml-4 ${
                item.score >= 8 ? 'text-green-600' :
                item.score >= 6 ? 'text-yellow-600' : 'text-red-600'
              }`}>
                {item.score}
              </div>
            </div>
          </div>
        ))}
      </div>

      <button onClick={() => setStep('setup')} className="w-full btn-secondary flex items-center justify-center gap-2">
        <RotateCcw size={18} /> Try Another Interview
      </button>
    </div>
  );
};

export default MockInterview;
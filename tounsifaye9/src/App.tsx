// App.jsx
import { useState } from 'react';
import './App.css';
import PhishingHunterGame from './layout/PhishingHunterGame';
import USBTrapMaster from './layout/USBTrapMaster';

// Icons (using emoji for simplicity)
const GameIcon = () => <span className="icon">🎮</span>;
const BookIcon = () => <span className="icon">📚</span>;
const QuizIcon = () => <span className="icon">🧠</span>;
const TrophyIcon = () => <span className="icon">🏆</span>;
const ShieldIcon = () => <span className="icon">🛡️</span>;

function App() {
  const [currentView, setCurrentView] = useState('menu');
  const [userScore, setUserScore] = useState(0);
  const [userName, setUserName] = useState('');

  return (
    <div className="app-container">
      {currentView === 'menu' ? (
        <MainMenu 
          setCurrentView={setCurrentView} 
          userScore={userScore} 
          userName={userName} 
        />
      ) : currentView === 'games' ? (
        <GamesSection 
          setCurrentView={setCurrentView} 
          setUserScore={setUserScore} 
        />
      ) : currentView === 'courses' ? (
        <CoursesSection setCurrentView={setCurrentView} />
      ) : currentView === 'quiz' ? (
        <QuizSection 
          setCurrentView={setCurrentView} 
          setUserScore={setUserScore} 
          userScore={userScore} 
        />
      ) : currentView === 'phishing-game' ? (
        <PhishingHunterGame 
          onBack={() => setCurrentView('games')}
          onScoreUpdate={(points) => setUserScore(userScore + points)}
        />
      ) : currentView === 'fake-call' ? (
        <PhishGuardEmbed onBack={() => setCurrentView('games')} />
      ) : currentView === 'usb-trap' ? (
        <USBTrapMaster 
          onBack={() => setCurrentView('games')}
          onScoreUpdate={(points) => setUserScore(userScore + points)}
        />
      ) : currentView === 'phishing-course' ? (
        <Sbou3iEmbed onBack={() => setCurrentView('courses')} />
      ) : null}
    </div>
  );
}

// Main Menu Component
function MainMenu({ setCurrentView, userScore, userName }) {
  return (
    <div className="main-menu">
      {/* Header */}
      <div className="header">
        <ShieldIcon />
        <h1 className="app-title">تونسي فايق</h1>
        <p className="app-subtitle">Etounsi Faye9</p>
        <p className="tagline">إحمي روحك من الهاكرز!</p>
      </div>

      {/* Score Badge */}
      <div className="score-badge">
        <TrophyIcon />
        <span className="score-text">Score Mte3ek: {userScore}</span>
      </div>

      {/* Menu Options */}
      <div className="menu-options">
        
        {/* Games Button */}
        <button 
          className="menu-btn games-btn"
          onClick={() => setCurrentView('games')}
        >
          <div className="btn-content">
            <GameIcon />
            <div className="btn-text">
              <h2>العاب</h2>
              <p>Beat the Attacker!</p>
            </div>
          </div>
          <span className="arrow">←</span>
        </button>

        {/* Courses Button */}
        <button 
          className="menu-btn courses-btn"
          onClick={() => setCurrentView('courses')}
        >
          <div className="btn-content">
            <BookIcon />
            <div className="btn-text">
              <h2>دروس</h2>
              <p>Ta3allem Social Engineering</p>
            </div>
          </div>
          <span className="arrow">←</span>
        </button>

        {/* Quiz Button */}
        <button 
          className="menu-btn quiz-btn"
          onClick={() => setCurrentView('quiz')}
        >
          <div className="btn-content">
            <QuizIcon />
            <div className="btn-text">
              <h2>كويز</h2>
              <p>Teste Rouħek!</p>
            </div>
          </div>
          <span className="arrow">←</span>
        </button>

      </div>

      {/* Footer Tips */}
      <div className="footer-tip">
        <p>💡 <strong>Astuce:</strong> El hacker yista3mel el psychology w mech el technology bark!</p>
      </div>
    </div>
  );
}

// Games Section Component
function GamesSection({ setCurrentView, setUserScore }) {
  const games = [
    {
      id: 1,
      title: 'Phishing Hunter',
      description: 'إكتشف الإيمايلات المزيفة',
      difficulty: 'Facile',
      points: 10,
      available: true
    },
    {
      id: 2,
      title: 'spam',
      description: 'ميتخدعش بالتلفونات الوهمية',
      difficulty: 'Moyen',
      points: 20,
      available: true
    },
    {
      id: 3,
      title: 'e8leb el fahem',
      description: 'ميحطش USB غريب في PC',
      difficulty: 'Difficile',
      points: 30,
      available: true
    }
  ];

  const handlePlayGame = (gameId) => {
    if (gameId === 1) {
      setCurrentView('phishing-game');
    } else if (gameId === 2) {
      setCurrentView('fake-call');
    } else if (gameId === 3) {
      setCurrentView('usb-trap');
    } else {
      alert('هذه اللعبة قريباً! 🎮');
    }
  };

  return (
    <div className="section-container">
      <div className="section-header">
        <button className="back-btn" onClick={() => setCurrentView('menu')}>
          → رجوع
        </button>
        <h2>العاب - Beat the Attacker</h2>
      </div>

      <div className="games-grid">
        {games.map(game => (
          <div key={game.id} className={`game-card ${!game.available ? 'locked' : ''}`}>
            <div className="game-header">
              <h3>{game.title}</h3>
              <span className={`difficulty ${game.difficulty.toLowerCase()}`}>
                {game.difficulty}
              </span>
            </div>
            <p className="game-description">{game.description}</p>
            <div className="game-footer">
              <span className="points">🏆 {game.points} points</span>
              <button 
                className="play-btn"
                onClick={() => handlePlayGame(game.id)}
                disabled={!game.available}
              >
                {game.available ? 'إلعب' : '🔒 قريباً'}
              </button>
            </div>
            {!game.available && (
              <div className="coming-soon-badge">Coming Soon</div>
            )}
          </div>
        ))}
      </div>

      <div className="tip-box">
        <p>🎯 <strong>Conseil:</strong> إبدا بال level السهل باش تفهم كيفاش الهاكرز يخدمو!</p>
      </div>
    </div>
  );
}

// PhishGuard Embed
function PhishGuardEmbed({ onBack }) {
  return (
    <div className="section-container phishguard-embed">
      <div className="section-header">
        <button className="back-btn" onClick={onBack}>
          → رجوع
        </button>
        <h2>spam</h2>
      </div>
      <div className="phishguard-frame-wrap">
        <iframe
          className="phishguard-frame"
          title="PhishGuard"
          src="/phishguard/level_1/level_1.html"
        />
      </div>
    </div>
  );
}

// Sbou3i Course Embed
function Sbou3iEmbed({ onBack }) {
  return (
    <div className="section-container phishguard-embed">
      <div className="section-header">
        <button className="back-btn" onClick={onBack}>
          → رجوع
        </button>
        <h2> قصة سبوعي</h2>
      </div>
      <div className="phishguard-frame-wrap">
        <iframe
          className="phishguard-frame"
          title="Sbou3i Phishing Story"
          src="/sbou3i/index.html"
        />
      </div>
    </div>
  );
}

// Courses Section Component
function CoursesSection({ setCurrentView }) {
  const courses = [
    
    {
      id: 2,
      title: 'sénario- قصة سبوعي',
      duration: '15 دقيقة',
      level: 'Débutant',
      completed: false
    }
  ];

  const handleStartCourse = (courseId) => {
    if (courseId === 2) {
      setCurrentView('phishing-course');
    } else {
      alert('الدروس قريباً! 📚 نحضرو محتوى تعليمي متكامل.');
    }
  };

  return (
    <div className="section-container">
      <div className="section-header">
        <button className="back-btn" onClick={() => setCurrentView('menu')}>
          → رجوع
        </button>
        <h2>دروس - Ta3allem w Efham</h2>
      </div>

      <div className="courses-list">
        {courses.map(course => (
          <div key={course.id} className="course-card">
            <div className="course-icon">📖</div>
            <div className="course-info">
              <h3>{course.title}</h3>
              <div className="course-meta">
                <span className="duration">⏱️ {course.duration}</span>
                <span className="level">{course.level}</span>
              </div>
            </div>
            <button 
              className="start-btn"
              onClick={() => handleStartCourse(course.id)}
            >
              إبدا
            </button>
          </div>
        ))}
      </div>

      <div className="tip-box">
        <p>📚 <strong>نصيحة:</strong> إبدا بالدروس قبل ما تلعب الألعاب باش تفهم أكثر!</p>
      </div>
    </div>
  );
}

// Quiz Section Component
function QuizSection({ setCurrentView, setUserScore, userScore }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  const questions = [
    {
      question: 'شنوا أخطر نوع من Social Engineering؟',
      options: [
        'Phishing',
        'Vishing',
        'الكل خطير',
        'Baiting'
      ],
      correct: 2,
      explanation: 'الكل خطير! كل نوع يستعمل تكتيكات مختلفة باش يخدعك.'
    },
    {
      question: 'هاكر يتصل بيك و يقلك روحو "من البنك". شنوا تعمل؟',
      options: [
        'نعطيه معلوماتي',
        'نسكر و نتصل بالبنك مباشرة',
        'نتأكد منه و نعطيه',
        'نغير الموضوع'
      ],
      correct: 1,
      explanation: 'أحسن حاجة تسكر و تتصل بالبنك مباشرة من الرقم الرسمي!'
    },
    {
      question: 'شنوا يعني Phishing؟',
      options: [
        'صيد السمك',
        'محاولة سرقة معلومات شخصية',
        'برنامج حماية',
        'نوع من الفيروسات'
      ],
      correct: 1,
      explanation: 'Phishing هو محاولة خداع الناس باش يعطيو معلوماتهم الشخصية (كلمات سر، أرقام بطاقات...)'
    },
    {
      question: 'إيمايل يطلب منك تحديث معلومات البنك في 24 ساعة. شنوا تعمل؟',
      options: [
        'نحدث معلوماتي بسرعة',
        'نتجاهل الإيمايل',
        'نتصل بالبنك مباشرة و نتحقق',
        'نبعث معلوماتي للإيمايل'
      ],
      correct: 2,
      explanation: 'البنوك ما يطلبوش معلومات عبر الإيمايل! دايما اتصل بالبنك مباشرة للتحقق.'
    },
    {
      question: 'صديقك بعثلك USB و قالك "فيه صور الرحلة". شنوا تعمل؟',
      options: [
        'نحطه مباشرة في الكمبيوتر',
        'نسأله أولاً و نفحصه بالأنتي فيروس',
        'نرميه',
        'نعطيه لحد آخر'
      ],
      correct: 1,
      explanation: 'دايما تأكد من المصدر و فحص ال USB بالأنتي فيروس قبل ما تستعمله!'
    }
  ];

  const handleAnswer = (index) => {
    setSelectedAnswer(index);
    setShowResult(true);
    
    if (index === questions[currentQuestion].correct) {
      const newScore = userScore + 10;
      setUserScore(newScore);
      setCorrectAnswers(correctAnswers + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setQuizCompleted(false);
    setCorrectAnswers(0);
  };

  if (quizCompleted) {
    const percentage = Math.round((correctAnswers / questions.length) * 100);
    return (
      <div className="section-container">
        <div className="quiz-completed">
          <div className="completion-header">
            <div className="completion-icon">
              {percentage >= 80 ? '🏆' : percentage >= 60 ? '👍' : '📚'}
            </div>
            <h2>
              {percentage >= 80 ? 'ممتاز! Bravo!' : percentage >= 60 ? 'مليح! Keep going!' : 'لازم تتدرب أكثر!'}
            </h2>
          </div>

          <div className="quiz-results">
            <div className="result-stat">
              <span className="stat-label">النتيجة:</span>
              <span className="stat-value">{correctAnswers}/{questions.length}</span>
            </div>
            <div className="result-stat">
              <span className="stat-label">النسبة:</span>
              <span className="stat-value">{percentage}%</span>
            </div>
            <div className="result-stat">
              <span className="stat-label">النقاط:</span>
              <span className="stat-value">+{correctAnswers * 10}</span>
            </div>
          </div>

          <div className="completion-message">
            <p>
              {percentage >= 80 
                ? 'مستواك عالي في الأمن السيبراني! واصل هكذا! 🌟'
                : percentage >= 60
                ? 'مستوى جيد! حاول تحسن أكثر بالتدريب. 💪'
                : 'لازم تراجع الدروس و تتدرب أكثر. ما تقلقش، راك في البداية! 📖'
              }
            </p>
          </div>

          <div className="completion-actions">
            <button className="retry-btn" onClick={restartQuiz}>
              🔄 أعد الكويز
            </button>
            <button className="back-btn" onClick={() => setCurrentView('menu')}>
              → الرجوع للقائمة
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="section-container quiz-section">
      <div className="section-header">
        <button className="back-btn" onClick={() => setCurrentView('menu')}>
          → رجوع
        </button>
        <h2>كويز - Question {currentQuestion + 1}/{questions.length}</h2>
      </div>

      <div className="quiz-progress-bar">
        <div 
          className="quiz-progress-fill"
          style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
        />
      </div>

      <div className="quiz-container">
        <div className="question-box">
          <div className="question-number">السؤال {currentQuestion + 1}</div>
          <h3>{questions[currentQuestion].question}</h3>
        </div>

        <div className="options-container">
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              className={`option-btn ${
                showResult && index === questions[currentQuestion].correct
                  ? 'correct'
                  : showResult && index === selectedAnswer
                  ? 'wrong'
                  : selectedAnswer === index
                  ? 'selected'
                  : ''
              }`}
              onClick={() => !showResult && handleAnswer(index)}
              disabled={showResult}
            >
              <span className="option-letter">{['أ', 'ب', 'ج', 'د'][index]}</span>
              <span className="option-text">{option}</span>
            </button>
          ))}
        </div>

        {showResult && (
          <div className={`result-box ${selectedAnswer === questions[currentQuestion].correct ? 'success' : 'error'}`}>
            <p className="result-title">
              {selectedAnswer === questions[currentQuestion].correct ? '✅ إجابة صحيحة! Bravo!' : '❌ إجابة خاطئة! Ta3allem!'}
            </p>
            <p className="explanation">{questions[currentQuestion].explanation}</p>
            <button className="next-btn" onClick={nextQuestion}>
              {currentQuestion < questions.length - 1 ? 'السؤال الجاي →' : 'شوف النتيجة 🏆'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

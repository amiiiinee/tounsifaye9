// App.jsx
import { useState } from 'react';
import './App.css';

// Icons (using emoji for simplicity, but you can use react-icons)
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
        <MainMenu setCurrentView={setCurrentView} userScore={userScore} userName={userName} />
      ) : currentView === 'games' ? (
        <GamesSection setCurrentView={setCurrentView} setUserScore={setUserScore} />
      ) : currentView === 'courses' ? (
        <CoursesSection setCurrentView={setCurrentView} />
      ) : currentView === 'quiz' ? (
        <QuizSection setCurrentView={setCurrentView} setUserScore={setUserScore} userScore={userScore} />
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
      points: 10
    },
    {
      id: 2,
      title: 'Fake Call Detective',
      description: 'ميتخدعش بالتلفونات الوهمية',
      difficulty: 'Moyen',
      points: 20
    },
    {
      id: 3,
      title: 'USB Trap Master',
      description: 'ميحطش USB غريب في PC',
      difficulty: 'Difficile',
      points: 30
    }
  ];

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
          <div key={game.id} className="game-card">
            <div className="game-header">
              <h3>{game.title}</h3>
              <span className={`difficulty ${game.difficulty.toLowerCase()}`}>
                {game.difficulty}
              </span>
            </div>
            <p className="game-description">{game.description}</p>
            <div className="game-footer">
              <span className="points">🏆 {game.points} points</span>
              <button className="play-btn">إلعب</button>
            </div>
          </div>
        ))}
      </div>

      <div className="tip-box">
        <p>🎯 <strong>Conseil:</strong> إبدا بال level السهل باش تفهم كيفاش الهاكرز يخدمو!</p>
      </div>
    </div>
  );
}

// Courses Section Component
function CoursesSection({ setCurrentView }) {
  const courses = [
    {
      id: 1,
      title: 'شنوا Social Engineering؟',
      duration: '10 دقائق',
      level: 'Débutant'
    },
    {
      id: 2,
      title: 'Phishing Attacks',
      duration: '15 دقيقة',
      level: 'Débutant'
    },
    {
      id: 3,
      title: 'Pretexting و Baiting',
      duration: '20 دقيقة',
      level: 'Intermédiaire'
    },
    {
      id: 4,
      title: 'كيفاش تحمي روحك؟',
      duration: '25 دقيقة',
      level: 'Tous niveaux'
    }
  ];

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
            <button className="start-btn">إبدا</button>
          </div>
        ))}
      </div>
    </div>
  );
}

// QuizSection Component
function QuizSection({ setCurrentView, setUserScore, userScore }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const questions = [
    {
      question: 'شنوا أخطر نوع من Social Engineering؟',
      options: [
        'Phishing',
        'Vishing',
        'El Kol خطير',
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
    }
  ];

  const handleAnswer = (index) => {
    setSelectedAnswer(index);
    setShowResult(true);
    if (index === questions[currentQuestion].correct) {
      setUserScore(userScore + 10);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setCurrentView('menu');
    }
  };

  return (
    <div className="section-container quiz-section">
      <div className="section-header">
        <button className="back-btn" onClick={() => setCurrentView('menu')}>
          → رجوع
        </button>
        <h2>كويز - Question {currentQuestion + 1}/{questions.length}</h2>
      </div>

      <div className="quiz-container">
        <div className="question-box">
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
              {option}
            </button>
          ))}
        </div>

        {showResult && (
          <div className={`result-box ${selectedAnswer === questions[currentQuestion].correct ? 'success' : 'error'}`}>
            <p className="result-title">
              {selectedAnswer === questions[currentQuestion].correct ? '✅ صحيح! Bravo!' : '❌ غالط! Ta3allem!'}
            </p>
            <p className="explanation">{questions[currentQuestion].explanation}</p>
            <button className="next-btn" onClick={nextQuestion}>
              {currentQuestion < questions.length - 1 ? 'Question Jeya →' : 'Kammel →'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
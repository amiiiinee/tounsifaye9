// App.tsx
import { useState, useEffect } from 'react';
import './App.css';
import PhishingHunterGame from './layout/PhishingHunterGame';
import USBTrapMaster from './layout/USBTrapMaster';

// Types
interface ScanResult {
  isPhishing: boolean;
  riskLevel: string;
  riskColor: string;
  riskScore: number;
  issues: string[];
  recommendation: string;
  timestamp: string;
}

interface ScanHistoryItem {
  url: string;
  result: ScanResult;
  id: number;
}

// Icons (using emoji for simplicity)
const GameIcon = () => <span className="icon">🎮</span>;
const BookIcon = () => <span className="icon">📚</span>;
const QuizIcon = () => <span className="icon">🧠</span>;
const TrophyIcon = () => <span className="icon">🏆</span>;
const ShieldIcon = () => <span className="icon">🛡️</span>;
const ScanIcon = () => <span className="icon">🔍</span>;
const CreditIcon = () => <span className="icon">💳</span>;

function App() {
  const [currentView, setCurrentView] = useState<string>('menu');
  const [userScore, setUserScore] = useState<number>(0);
  const [userCredits, setUserCredits] = useState<number>(50);

  // Load credits from localStorage on mount
  useEffect(() => {
    const savedCredits = localStorage.getItem('userCredits');
    if (savedCredits === null) {
      localStorage.setItem('userCredits', '50');
      setUserCredits(50);
    } else {
      setUserCredits(parseInt(savedCredits));
    }

    const savedScore = localStorage.getItem('userScore');
    if (savedScore) {
      setUserScore(parseInt(savedScore));
    }
  }, []);

  // Save credits whenever they change
  useEffect(() => {
    localStorage.setItem('userCredits', userCredits.toString());
  }, [userCredits]);

  // Save score whenever it changes
  useEffect(() => {
    localStorage.setItem('userScore', userScore.toString());
  }, [userScore]);

  return (
    <div className="app-container">
      {currentView === 'menu' ? (
        <MainMenu 
          setCurrentView={setCurrentView} 
          userScore={userScore}
          userCredits={userCredits}
        />
      ) : currentView === 'games' ? (
        <GamesSection 
          setCurrentView={setCurrentView} 
          setUserScore={setUserScore}
          setUserCredits={setUserCredits}
        />
      ) : currentView === 'courses' ? (
        <CoursesSection setCurrentView={setCurrentView} />
      ) : currentView === 'quiz' ? (
        <QuizSection 
          setCurrentView={setCurrentView} 
          setUserScore={setUserScore} 
          userScore={userScore}
          userCredits={userCredits}
          setUserCredits={setUserCredits}
        />
      ) : currentView === 'url-detector' ? (
        <URLDetectorSection 
          setCurrentView={setCurrentView}
          userCredits={userCredits}
          setUserCredits={setUserCredits}
        />
      ) : currentView === 'phishing-game' ? (
        <PhishingHunterGame 
          onBack={() => setCurrentView('games')}
          onScoreUpdate={(points: number) => {
            setUserScore(userScore + points);
            setUserCredits(userCredits + points);
          }}
        />
      ) : currentView === 'fake-call' ? (
        <PhishGuardEmbed onBack={() => setCurrentView('games')} />
      ) : currentView === 'usb-trap' ? (
        <USBTrapMaster 
          onBack={() => setCurrentView('games')}
          onScoreUpdate={(points: number) => {
            setUserScore(userScore + points);
            setUserCredits(userCredits + points);
          }}
        />
      ) : currentView === 'phishing-course' ? (
        <Sbou3iEmbed onBack={() => setCurrentView('courses')} />
      ) : null}
    </div>
  );
}

// Main Menu Component
interface MainMenuProps {
  setCurrentView: (view: string) => void;
  userScore: number;
  userCredits: number;
}

function MainMenu({ setCurrentView, userScore, userCredits }: MainMenuProps) {
  return (
    <div className="main-menu">
      {/* Header */}
      <div className="header">
        <ShieldIcon />
        <h1 className="app-title">تونسي فايق</h1>
        <p className="app-subtitle">Etounsi Faye9</p>
        <p className="tagline">إحمي روحك من الهاكرز!</p>
      </div>

      {/* Score and Credits Badge */}
      <div className="badges-container">
        <div className="score-badge">
          <TrophyIcon />
          <span className="score-text">Score: {userScore}</span>
        </div>
        <div className="credits-badge">
          <CreditIcon />
          <span className="credits-text">Credits: {userCredits}</span>
        </div>
      </div>

      {/* Menu Options */}
      <div className="menu-options">
        
        {/* URL Detector Button - NEW FEATURE */}
        <button 
          className="menu-btn detector-btn"
          onClick={() => setCurrentView('url-detector')}
        >
          <div className="btn-content">
            <ScanIcon />
            <div className="btn-text">
              <h2>كاشف الروابط</h2>
              <p>AI URL Detector - 50 Credits</p>
            </div>
          </div>
          <span className="arrow">←</span>
        </button>

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

// URL Detector Section Component
interface URLDetectorSectionProps {
  setCurrentView: (view: string) => void;
  userCredits: number;
  setUserCredits: (credits: number | ((prev: number) => number)) => void;
}

function URLDetectorSection({ setCurrentView, userCredits, setUserCredits }: URLDetectorSectionProps) {
  const [url, setUrl] = useState<string>('');
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [scanHistory, setScanHistory] = useState<ScanHistoryItem[]>([]);

  const analyzeURL = async (urlToCheck: string): Promise<ScanResult> => {
    // Simulate AI analysis with detailed checks
    await new Promise(resolve => setTimeout(resolve, 2000));

    // URL analysis logic
    const suspiciousPatterns = [
      { pattern: /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/, reason: 'يستخدم عنوان IP بدلاً من اسم نطاق' },
      { pattern: /@/, reason: 'يحتوي على رمز @ (محاولة خداع)' },
      { pattern: /\.tk$|\.ml$|\.ga$|\.cf$|\.gq$/i, reason: 'نطاق مجاني مشبوه' },
      { pattern: /paypal|facebook|google|amazon|microsoft|apple/i, reason: 'يحاكي علامة تجارية شهيرة' },
      { pattern: /-/g, reason: 'عدد كبير من الشرطات' },
      { pattern: /\d{4,}/, reason: 'أرقام طويلة غير عادية' },
    ];

    const httpsCheck = urlToCheck.startsWith('https://');
    const domainLength = urlToCheck.replace(/https?:\/\//g, '').split('/')[0].length;
    const hasSubdomains = (urlToCheck.match(/\./g) || []).length > 2;
    
    const detectedIssues: string[] = [];
    let riskScore = 0;

    // Check patterns
    suspiciousPatterns.forEach(({ pattern, reason }) => {
      if (pattern.test(urlToCheck)) {
        detectedIssues.push(reason);
        riskScore += 20;
      }
    });

    // Additional checks
    if (!httpsCheck) {
      detectedIssues.push('لا يستخدم HTTPS (غير آمن)');
      riskScore += 15;
    }

    if (domainLength > 30) {
      detectedIssues.push('اسم النطاق طويل جداً');
      riskScore += 10;
    }

    if (hasSubdomains) {
      detectedIssues.push('نطاقات فرعية متعددة مشبوهة');
      riskScore += 10;
    }

    // Determine risk level
    let riskLevel = 'آمن';
    let riskColor = 'safe';
    let recommendation = 'هذا الرابط يبدو آمناً! يمكنك زيارته.';

    if (riskScore >= 50) {
      riskLevel = 'خطير جداً';
      riskColor = 'danger';
      recommendation = '⚠️ لا تفتح هذا الرابط أبداً! احتمال كبير أنه phishing.';
    } else if (riskScore >= 30) {
      riskLevel = 'مشبوه';
      riskColor = 'warning';
      recommendation = '⚡ كن حذراً! هذا الرابط يحتوي على علامات مشبوهة.';
    } else if (riskScore >= 15) {
      riskLevel = 'متوسط الخطورة';
      riskColor = 'moderate';
      recommendation = '👀 افحص الرابط جيداً قبل الدخول.';
    }

    return {
      isPhishing: riskScore >= 30,
      riskLevel,
      riskColor,
      riskScore: Math.min(riskScore, 100),
      issues: detectedIssues,
      recommendation,
      timestamp: new Date().toLocaleString('ar-TN')
    };
  };

  const handleScan = async () => {
    if (!url.trim()) {
      alert('أدخل رابط للفحص!');
      return;
    }

    if (userCredits < 50) {
      alert('ما عندكش كريديت كافي! العب الألعاب باش تربح كريديت.');
      return;
    }

    // Validate URL format
    try {
      new URL(url.startsWith('http') ? url : `https://${url}`);
    } catch {
      alert('الرابط غير صحيح! أدخل رابط صالح.');
      return;
    }

    setIsScanning(true);
    setResult(null);

    // Deduct credits
    setUserCredits((prev: number) => prev - 50);

    try {
      const analysisResult = await analyzeURL(url);
      setResult(analysisResult);
      
      // Add to history
      setScanHistory((prev: ScanHistoryItem[]) => [{
        url: url,
        result: analysisResult,
        id: Date.now()
      }, ...prev.slice(0, 4)]);
    } catch (error) {
      alert('حدث خطأ في الفحص. حاول مرة أخرى.');
      setUserCredits((prev: number) => prev + 50);
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="section-container url-detector-section">
      <div className="section-header">
        <button className="back-btn" onClick={() => setCurrentView('menu')}>
          → رجوع
        </button>
        <h2>كاشف الروابط - AI URL Detector</h2>
      </div>

      {/* Credits Display */}
      <div className="credits-display">
        <CreditIcon />
        <span>رصيدك: {userCredits} Credits</span>
        <span className="cost-info">(كل فحص = 50 Credits)</span>
      </div>

      {/* URL Input */}
      <div className="url-input-container">
        <div className="input-wrapper">
          <input
            type="text"
            className="url-input"
            placeholder="أدخل الرابط هنا... (مثال: https://example.com)"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            disabled={isScanning}
          />
          <button 
            className="scan-btn"
            onClick={handleScan}
            disabled={isScanning || userCredits < 50}
          >
            {isScanning ? '🔄 جاري الفحص...' : '🔍 إفحص الرابط'}
          </button>
        </div>
        {userCredits < 50 && (
          <p className="warning-text">⚠️ ما عندكش كريديت كافي! العب الألعاب باش تربح.</p>
        )}
      </div>

      {/* Scanning Animation */}
      {isScanning && (
        <div className="scanning-animation">
          <div className="scan-spinner"></div>
          <p>🤖 AI يحلل الرابط...</p>
          <div className="scan-steps">
            <div className="scan-step">✓ فحص النطاق...</div>
            <div className="scan-step">✓ تحليل البنية...</div>
            <div className="scan-step">✓ كشف الأنماط المشبوهة...</div>
          </div>
        </div>
      )}

      {/* Results */}
      {result && !isScanning && (
        <div className={`result-container ${result.riskColor}`}>
          <div className="result-header">
            <div className="risk-badge">
              {result.riskColor === 'safe' ? '✅' : result.riskColor === 'danger' ? '🚨' : '⚠️'}
              <span className="risk-level">{result.riskLevel}</span>
            </div>
            <div className="risk-score-circle">
              <svg viewBox="0 0 36 36" className="circular-chart">
                <path
                  className="circle-bg"
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="circle"
                  strokeDasharray={`${result.riskScore}, 100`}
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <text x="18" y="20.35" className="percentage">{result.riskScore}%</text>
              </svg>
            </div>
          </div>

          <div className="result-body">
            <h3>📋 التحليل التفصيلي:</h3>
            {result.issues.length > 0 ? (
              <ul className="issues-list">
                {result.issues.map((issue: string, index: number) => (
                  <li key={index}>
                    <span className="issue-icon">⚡</span>
                    {issue}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="no-issues">✨ لم يتم اكتشاف أي مشاكل!</p>
            )}

            <div className="recommendation-box">
              <h4>💡 التوصية:</h4>
              <p>{result.recommendation}</p>
            </div>

            <div className="url-display">
              <strong>الرابط المفحوص:</strong>
              <code>{url}</code>
            </div>
          </div>
        </div>
      )}

      {/* Scan History */}
      {scanHistory.length > 0 && (
        <div className="scan-history">
          <h3>📜 آخر الفحوصات</h3>
          <div className="history-list">
            {scanHistory.map((item: ScanHistoryItem) => (
              <div key={item.id} className={`history-item ${item.result.riskColor}`}>
                <div className="history-info">
                  <span className="history-status">
                    {item.result.riskColor === 'safe' ? '✅' : item.result.riskColor === 'danger' ? '🚨' : '⚠️'}
                  </span>
                  <div className="history-text">
                    <p className="history-url">{item.url.substring(0, 40)}...</p>
                    <span className="history-time">{item.result.timestamp}</span>
                  </div>
                </div>
                <span className="history-risk">{item.result.riskLevel}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tips */}
      <div className="tip-box">
        <h4>🎯 نصائح الأمان:</h4>
        <ul>
          <li>دايما تحقق من الرابط قبل ما تكليكي</li>
          <li>ابحث على HTTPS في بداية الرابط</li>
          <li>انتبه للأخطاء الإملائية في أسماء المواقع الشهيرة</li>
          <li>لا تفتح روابط من مصادر غير موثوقة</li>
        </ul>
      </div>
    </div>
  );
}

// Games Section Component
interface GamesSectionProps {
  setCurrentView: (view: string) => void;
  setUserScore: (score: number | ((prev: number) => number)) => void;
  setUserCredits: (credits: number | ((prev: number) => number)) => void;
}

function GamesSection({ setCurrentView }: GamesSectionProps) {
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

  const handlePlayGame = (gameId: number) => {
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
              <span className="points">💳 +{game.points} credits</span>
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
interface PhishGuardEmbedProps {
  onBack: () => void;
}

function PhishGuardEmbed({ onBack }: PhishGuardEmbedProps) {
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
interface Sbou3iEmbedProps {
  onBack: () => void;
}

function Sbou3iEmbed({ onBack }: Sbou3iEmbedProps) {
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
interface CoursesSectionProps {
  setCurrentView: (view: string) => void;
}

function CoursesSection({ setCurrentView }: CoursesSectionProps) {
  const courses = [
    {
      id: 2,
      title: 'sénario- قصة سبوعي',
      duration: '15 دقيقة',
      level: 'Débutant',
      completed: false
    }
  ];

  const handleStartCourse = (courseId: number) => {
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
interface QuizSectionProps {
  setCurrentView: (view: string) => void;
  setUserScore: (score: number | ((prev: number) => number)) => void;
  userScore: number;
  userCredits: number;
  setUserCredits: (credits: number | ((prev: number) => number)) => void;
}

function QuizSection({ setCurrentView, setUserScore, userScore, userCredits, setUserCredits }: QuizSectionProps) {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);

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

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index);
    setShowResult(true);
    
    if (index === questions[currentQuestion].correct) {
      const newScore = userScore + 10;
      const newCredits = userCredits + 10;
      setUserScore(newScore);
      setUserCredits(newCredits);
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
    const creditsEarned = correctAnswers * 10;
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
              <span className="stat-label">Credits المكتسبة:</span>
              <span className="stat-value">+{creditsEarned} 💳</span>
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
              {selectedAnswer === questions[currentQuestion].correct ? '✅ إجابة صحيحة! +10 Credits 💳' : '❌ إجابة خاطئة! Ta3allem!'}
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
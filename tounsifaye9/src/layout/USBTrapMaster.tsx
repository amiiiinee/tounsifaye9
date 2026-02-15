import React, { useState } from 'react';
import './USBTrapMaster.css';

// 📸 UNCOMMENT THESE LINES TO USE YOUR IMAGES
// Put your images in: src/assets/
// import hackerImg from '../assets/hacker.png';
// import playerImg from '../assets/player.png';
import winMemeImg from '../assets/win-meme.png';
import loseMemeImg from '../assets/lose-meme.png';

const USBTrapMaster = ({ onBack, onScoreUpdate }: { onBack: () => void; onScoreUpdate?: (score: number) => void }) => {
  const [currentRound, setCurrentRound] = useState(0);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [result, setResult] = useState('');
  const [hackerHealth, setHackerHealth] = useState(100);
  const [playerHealth, setPlayerHealth] = useState(100);
  const [showResult, setShowResult] = useState(false);

  // Multiple rounds of questions
  const rounds = [
    {
      id: 1,
      scenario: "صاحبك بعثلك USB و قالك فيها صور الرحلة",
      cards: [
        {
          id: 1,
          text: "نحطه مباشرة في الكمبيوتر",
          isCorrect: false,
          tunisianStyle: "شنوا المشكل؟ صاحبي موثوق! 🤷"
        },
        {
          id: 2,
          text: "نسأله أولاً و نفحصه بالأنتي فيروس",
          isCorrect: true,
          tunisianStyle: "الأمان أولاً! نتأكد و نسكاني 🛡️"
        },
        {
          id: 3,
          text: "نستنى و نفتحه في مكان عام",
          isCorrect: false,
          tunisianStyle: "في الكافي أحسن من الدار 😅"
        }
      ]
    },
    {
      id: 2,
      scenario: "في الشارع لقيت USB ملقي على الأرض",
      cards: [
        {
          id: 1,
          text: "نحطه مباشرة باش نشوف شنوا فيه",
          isCorrect: false,
          tunisianStyle: "ممكن فلوس ولا معلومات مهمة! 💰"
        },
        {
          id: 2,
          text: "نرميه في الزبلة مباشرة",
          isCorrect: true,
          tunisianStyle: "USB الطريق = خطر مضمون! 🚫"
        },
        {
          id: 3,
          text: "نعطيه لحد آخر يشوفه",
          isCorrect: false,
          tunisianStyle: "يخلي حد آخر يتحمل المسؤولية 🤔"
        }
      ]
    },
    {
      id: 3,
      scenario: "في الخدمة، زميلك طلب منك USB باش يطبع ملف",
      cards: [
        {
          id: 1,
          text: "نعطيهولو مباشرة، هو زميلي",
          isCorrect: false,
          tunisianStyle: "زميل خدمة = ثقة تامة! 🤝"
        },
        {
          id: 2,
          text: "نسكاني الـ USB متاعو بالأنتي فيروس أولاً",
          isCorrect: true,
          tunisianStyle: "حتى الزملاء، الأمان أولاً! 🔒"
        },
        {
          id: 3,
          text: "نحط الـ USB متاعو في جهاز الطباعة مباشرة",
          isCorrect: false,
          tunisianStyle: "طباعة فقط، شنوا يصير؟ 🖨️"
        }
      ]
    },
    {
      id: 4,
      scenario: "حد غريب في الكافي عرض عليك USB فيه أفلام",
      cards: [
        {
          id: 1,
          text: "نقبلو، أفلام مجانية!",
          isCorrect: false,
          tunisianStyle: "أفلام ببلاش؟ علاش لا! 🎬"
        },
        {
          id: 2,
          text: "نرفض تماماً، ما نعرفوش",
          isCorrect: true,
          tunisianStyle: "حد غريب = خطر كبير! 🚨"
        },
        {
          id: 3,
          text: "نشكرو و نفتحو في كمبيوتر الكافي",
          isCorrect: false,
          tunisianStyle: "كمبيوتر الكافي مش متاعي 🤷"
        }
      ]
    },
    {
      id: 5,
      scenario: "USB القديم متاعك، ما استعملتوش من شهور",
      cards: [
        {
          id: 1,
          text: "نحطه مباشرة، هو متاعي",
          isCorrect: false,
          tunisianStyle: "USB متاعي = أمان مضمون! ✅"
        },
        {
          id: 2,
          text: "نسكانيه بالأنتي فيروس قبل",
          isCorrect: true,
          tunisianStyle: "حتى لو متاعي، نتأكد! 🔍"
        },
        {
          id: 3,
          text: "نشوف الملفات بدون أنتي فيروس",
          isCorrect: false,
          tunisianStyle: "برك نشوف، ما نحملش حاجة 👀"
        }
      ]
    }
  ];

  const handleCardClick = (card: { id: number; isCorrect: boolean }) => {
    setSelectedCard(card.id);
    
    setTimeout(() => {
      setShowResult(true);
      
      if (card.isCorrect) {
        // Player chose correct - hacker loses health
        const newHackerHealth = hackerHealth - 20;
        setHackerHealth(newHackerHealth);
        setResult('correct');
        
        if (newHackerHealth <= 0) {
          // Player won the entire game!
          setGameWon(true);
          setGameOver(true);
          if (onScoreUpdate) {
            onScoreUpdate(30);
          }
        }
      } else {
        // Player chose wrong - player loses health
        const newPlayerHealth = playerHealth - 20;
        setPlayerHealth(newPlayerHealth);
        setResult('wrong');
        
        if (newPlayerHealth <= 0) {
          // Player lost the game
          setGameOver(true);
        }
      }
    }, 500);
  };

  const nextRound = () => {
    if (currentRound < rounds.length - 1 && !gameOver) {
      setCurrentRound(currentRound + 1);
      setSelectedCard(null);
      setShowResult(false);
      setResult('');
    }
  };

  const resetGame = () => {
    setCurrentRound(0);
    setSelectedCard(null);
    setGameOver(false);
    setGameWon(false);
    setResult('');
    setShowResult(false);
    setHackerHealth(100);
    setPlayerHealth(100);
  };

  const currentScenario = rounds[currentRound];

  // Game Over Screen
  if (gameOver) {
    return (
      <div className="usb-trap-container">
        <div className="usb-back-header">
          <button className="usb-back-btn" onClick={onBack}>
            → رجوع
          </button>
          <h2>USB Trap Master</h2>
        </div>

        <div className="game-arena">
          <div className={`final-result-screen ${gameWon ? 'victory' : 'defeat'}`}>
            {gameWon ? (
              <>
                <div className="celebration-meme">
                  <img src={winMemeImg} alt="Win" className="meme-image-img" />
                  <h2>🏆 برافو! تغلبت على الهاكر! 🏆</h2>
                  <p className="win-message">حميت روحك من كل الفخاخ!</p>
                  <p className="tunisian-message">
                    ولّيت محترف في الأمان! دايما استعمل Anti-Virus و Firewall! 💪
                  </p>
                  <div className="stats-summary">
                    <div className="stat-item">
                      <span className="stat-label">جولات مكسوبة:</span>
                      <span className="stat-value">{Math.floor((100 - hackerHealth) / 20)}/5</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">النقاط:</span>
                      <span className="stat-value">+30 🎯</span>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="fail-meme">
                  <img src={loseMemeImg} alt="Lose" className="meme-image-img" />
                  <h2>💀 آآآه! الهاكر تغلب عليك! 💀</h2>
                  <p className="lose-message">الهاكر دخل للسيستام متاعك!</p>
                  <p className="tunisian-message">
                    ما تقلقش! العب مرة أخرى و تعلّم من الأخطاء! 💪
                  </p>
                  <div className="stats-summary">
                    <div className="stat-item">
                      <span className="stat-label">وصلت للجولة:</span>
                      <span className="stat-value">{currentRound + 1}/5</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">إجابات صحيحة:</span>
                      <span className="stat-value">{Math.floor((100 - hackerHealth) / 20)}</span>
                    </div>
                  </div>
                </div>
              </>
            )}
            <div className="result-actions">
              <button className="play-again-btn" onClick={resetGame}>
                العب مرة أخرى 🔄
              </button>
              <button className="back-to-menu-btn" onClick={onBack}>
                القائمة الرئيسية 🏠
              </button>
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="tips-section">
          <h3>💡 نصائح الأمان:</h3>
          <ul>
            <li>🛡️ دايما استعمل Anti-Virus و Firewall</li>
            <li>🚫 ما تحط USB ما تعرفش منين جا</li>
            <li>🔍 سكاني أي ملف قبل ما تفتحو</li>
            <li>⚠️ خلي الحذر ديما في بالك</li>
            <li>👥 حتى الناس الموثوقين، دايما تأكد</li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="usb-trap-container">
      {/* Back Button */}
      <div className="usb-back-header">
        <button className="usb-back-btn" onClick={onBack}>
          → رجوع
        </button>
        <h2>e8leb el fahem</h2>
      </div>

      {/* Header */}
      <div className="game-header">
        <h1>🎮 e8leb el fahem</h1>
        <p className="subtitle">احذر من فخ الهاكر! 🎯</p>
        <div className="round-indicator">
          <span className="round-text">الجولة {currentRound + 1} من {rounds.length}</span>
        </div>
      </div>

      {/* Game Arena */}
      <div className="game-arena">
        {/* Hacker Side */}
        <div className="hacker-side">
          <div className="character-container hacker-character">
            <div className="hacker-avatar">
              <img src={loseMemeImg} alt="Hacker" className="character-img" />
            </div>
            
            <h3>الهاكر</h3>
            <div className="health-bar">
              <div 
                className="health-fill hacker-health" 
                style={{ width: `${hackerHealth}%` }}
              ></div>
            </div>
            <div className="health-text">{hackerHealth}%</div>
          </div>
          
          <div className="attack-card">
            <p className="attack-text">{currentScenario.scenario}</p>
            <div className="usb-icon">💾</div>
          </div>
        </div>

        {/* VS Divider */}
        <div className="vs-divider">
          <span>⚔️</span>
          <span className="vs-text">VS</span>
          <span>⚔️</span>
        </div>

        {/* Player Side */}
        <div className="player-side">
          <div className="character-container player-character">
            <div className="player-avatar">
              <img src={winMemeImg} alt="Player" className="character-img" />
            </div>
            
            <h3>أنت</h3>
            <div className="health-bar">
              <div 
                className="health-fill player-health" 
                style={{ width: `${playerHealth}%` }}
              ></div>
            </div>
            <div className="health-text">{playerHealth}%</div>
          </div>

          {!showResult ? (
            <div className="cards-container">
              <h3 className="choose-text">شنوا راح تعمل؟ 🤔</h3>
              {currentScenario.cards.map((card) => (
                <button
                  key={card.id}
                  className={`defense-card ${selectedCard === card.id ? 'selected' : ''}`}
                  onClick={() => handleCardClick(card)}
                  disabled={selectedCard !== null}
                >
                  <div className="card-number">{card.id}</div>
                  <p className="card-text">{card.text}</p>
                  <p className="tunisian-text">{card.tunisianStyle}</p>
                </button>
              ))}
            </div>
          ) : (
            <div className={`round-result ${result}`}>
              {result === 'correct' ? (
                <>
                  <div className="result-icon success">✅</div>
                  <h3 className="result-title">صحيح! أحسنت!</h3>
                  <p className="result-message">حميت روحك من هذا الفخ! 🛡️</p>
                  <p className="result-explanation">
                    {currentScenario.cards.find(c => c.isCorrect)?.tunisianStyle}
                  </p>
                  {hackerHealth > 0 && (
                    <button className="next-round-btn" onClick={nextRound}>
                      الجولة الجاية →
                    </button>
                  )}
                </>
              ) : (
                <>
                  <div className="result-icon error">❌</div>
                  <h3 className="result-title">غالط! انتبه!</h3>
                  <p className="result-message">الهاكر ضربك! خلي بالك أكثر! ⚠️</p>
                  <p className="result-explanation">
                    الإجابة الصحيحة: {currentScenario.cards.find(c => c.isCorrect)?.text}
                  </p>
                  {playerHealth > 0 && (
                    <button className="next-round-btn" onClick={nextRound}>
                      الجولة الجاية →
                    </button>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Tips Section */}
      <div className="tips-section">
        <h3>💡 نصائح الأمان:</h3>
        <ul>
          <li>🛡️ دايما استعمل Anti-Virus و Firewall</li>
          <li>🚫 ما تحط USB ما تعرفش منين جا</li>
          <li>🔍 سكاني أي ملف قبل ما تفتحو</li>
          <li>⚠️ خلي الحذر ديما في بالك</li>
          <li>👥 حتى الناس الموثوقين، دايما تأكد</li>
        </ul>
      </div>
    </div>
  );
};

export default USBTrapMaster;
// PhishingHunterGame.jsx
import { useState, useEffect } from 'react';
import './PhishingHunterGame.css';

const PhishingHunterGame = ({ onBack, onScoreUpdate }) => {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [showResult, setShowResult] = useState(false);
  const [resultMessage, setResultMessage] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState(null);

  // Characters data
  const characters = {
    baji: {
      name: 'الباجي قايد السبسي',
      role: 'الرئيس',
      avatar: '👴🏻',
      color: '#3B82F6'
    },
    sboui: {
      name: 'صبوعي',
      role: 'الشاب المتعلم - Sitecom',
      avatar: '🧑🏻‍💼',
      color: '#10B981'
    },
    lotfi: {
      name: 'لطفي العبدلي',
      role: 'الممثل الكوميدي',
      avatar: '😄',
      color: '#F59E0B'
    },
    hacker: {
      name: 'الهاكر المجهول',
      role: 'Attacker',
      avatar: '🦹🏻‍♂️',
      color: '#EF4444'
    }
  };

  // Game scenarios - Mix of real and phishing
  const scenarios = [
    {
      id: 1,
      from: characters.baji,
      subject: 'دعوة لحضور الحفل الوطني',
      message: 'تحية طيبة،\n\nندعوكم لحضور الاحتفال بالعيد الوطني يوم 20 مارس بقصر قرطاج.\n\nالرجاء التسجيل عبر الرابط الرسمي:\nwww.carthage.tn/events\n\nمع تحياتي،\nقصر قرطاج',
      isPhishing: false,
      realUrl: 'carthage.tn',
      explanation: '✅ هذا البريد حقيقي! الرابط رسمي (.tn domain) والأسلوب مهني.',
      tips: 'دايما تأكد من الدومين الرسمي (.tn للمواقع التونسية الرسمية)'
    },
    {
      id: 2,
      from: { ...characters.baji, name: 'الباجي قايد السبسي' },
      subject: '🚨 URGENT: تحديث معلوماتك الشخصية',
      message: 'عزيزي المواطن،\n\nنطلب منك تحديث معلوماتك الشخصية فورا!\n\nانقر هنا: www.carthagee-tn.com/update\n\nآخر أجل: اليوم!\n\nقصر قرطاج',
      isPhishing: true,
      fakeUrl: 'carthagee-tn.com',
      explanation: '❌ هذا PHISHING! لاحظ:\n• الدومين غالط (carthagee بدل carthage)\n• استعجال مشبوه (آخر أجل اليوم)\n• طلب معلومات شخصية\n• emoji في الموضوع',
      tips: 'الهاكرز يستعملو الاستعجال باش يخليوك ما تفكرش مليح!'
    },
    {
      id: 3,
      from: characters.sboui,
      subject: 'فرصة عمل في شركة Sitecom',
      message: 'أهلا صديقي!\n\nشركة Sitecom تبحث عن موظفين جدد.\n\nللمزيد من المعلومات، راسلني على:\nsboui@sitecom.com.tn\n\nأو زور الموقع: www.sitecom.com.tn\n\nبالتوفيق،\nصبوعي - قسم الموارد البشرية',
      isPhishing: false,
      realUrl: 'sitecom.com.tn',
      explanation: '✅ بريد رسمي! الإيمايل والموقع صحيحين، والأسلوب مهني.',
      tips: 'شركات حقيقية عندها دومينات رسمية و إيمايلات مهنية'
    },
    {
      id: 4,
      from: { ...characters.sboui, name: 'صبوعي - Sitecom' },
      subject: 'رَبحت 50,000 دينار! 🎉💰',
      message: 'مبروك يا صاحبي!\n\nرَبحت في السحب على 50,000 دينار!!\n\nباش تاخذ الفلوس، ابعث:\n• رقم بطاقة التعريف\n• رقم الحساب البنكي\n• كلمة السر مت��ع البنك\n\nعلى هذا الإيمايل: sitecom.winner@gmail.com\n\nيالله بسرعة قبل ما يفوت الوقت!\n\nصبوعي',
      isPhishing: true,
      fakeUrl: 'gmail.com',
      explanation: '❌ PHISHING واضح!\n• وعود بفلوس كبيرة\n• طلب معلومات حساسة (كلمة السر!!)\n• إيمايل Gmail بدل دومين الشركة\n• استعجال مشبوه\n• emoji كثيرة',
      tips: 'ما فماش فلوس مجانية! وما تعطيش JAMAIS كلمة السر مت��ع البنك!'
    },
    {
      id: 5,
      from: characters.lotfi,
      subject: 'دعوة للمشاركة في برنامج تلفزيوني',
      message: 'السلام عليكم،\n\nنحب ندعيك للمشاركة في برنامجي الجديد "ضحك وفرفشة".\n\nللتسجيل:\nاتصل بمكتبنا: 71 XXX XXX\nأو زور: www.lotfi-abdelli.tn\n\nبالتوفيق،\nلطفي العبدلي\nالشركة التونسية للإنتاج التلفزيوني',
      isPhishing: false,
      realUrl: 'lotfi-abdelli.tn',
      explanation: '✅ دعوة رسمية! معلومات واضحة، طرق اتصال متعددة ومهنية.',
      tips: 'الدعوات الحقيقية تعطيك طرق اتصال متعددة (تلفون، موقع، عنوان)'
    },
    {
      id: 6,
      from: { ...characters.lotfi, name: 'لطفي العبدلي 😂' },
      subject: 'شوف الفيديو هذا!! ضحك موت 😂😂',
      message: 'يا صاحبي!\n\nشوف الفيديو هذا، ضحك موت! 😂😂\n\nانقر هنا بسرعة:\nwww.lotfi-abdeli.com/video.exe\n\nبرشا ضحك! 🤣🤣🤣\n\nلطفي',
      isPhishing: true,
      fakeUrl: 'lotfi-abdeli.com (غالط) + .exe file!',
      explanation: '❌ PHISHING خطير!\n• الدومين غالط (abdeli بدل abdelli)\n• ملف .exe (فيروس محتمل!)\n• emoji كثيرة\n• أسلوب غير مهني\n• استعجال للضغط',
      tips: 'ما تحملش JAMAIS ملفات .exe من links مشبوهة! ممكن فيروسات خطيرة!'
    },
    {
      id: 7,
      from: { ...characters.hacker, name: 'البنك المركزي التونسي' },
      subject: '⚠️ تنبيه أمني: حسابك في خطر',
      message: 'عزيزي العميل،\n\nاكتشفنا محاولة اختراق لحسابك البنكي!\n\nللحماية الفورية، أدخل معلوماتك:\nwww.bct-securite.com/login\n\nيجب التحديث في أقل من ساعة وإلا سيتم تجميد حسابك!\n\nقسم الأمن المعلوماتي\nالبنك المركزي التونسي',
      isPhishing: true,
      fakeUrl: 'bct-securite.com (مش الموقع الرسمي)',
      explanation: '❌ PHISHING كلاسيكي!\n• تخويف (حسابك في خطر)\n• استعجال (أقل من ساعة)\n• الدومين مش رسمي\n• البنوك ما يطلبوش معلومات عبر البريد',
      tips: 'البنوك الحقيقية ما يطلبوش معلومات حساسة عبر الإيمايل!'
    },
    {
      id: 8,
      from: { ...characters.hacker, name: 'Facebook Security' },
      subject: 'Your account will be deleted',
      message: 'Dear user,\n\nYour Facebook account will be deleted in 24 hours due to suspicious activity.\n\nTo prevent deletion, verify your identity:\nwww.facebook-verify.net/confirm\n\nFacebook Security Team',
      isPhishing: true,
      fakeUrl: 'facebook-verify.net',
      explanation: '❌ PHISHING!\n• الدومين الرسمي هو facebook.com\n• تهديد بحذف الحساب\n• استعجال 24 ساعة\n• Facebook ما يبعثش رسائل بالإنجليزية برك',
      tips: 'دايما تحقق من الدومين الرسمي للشركات الكبرى!'
    }
  ];

  const handleChoice = (choice) => {
    setSelectedChoice(choice);
    const currentScenario = scenarios[currentLevel];
    const correct = (choice === 'real' && !currentScenario.isPhishing) || 
                    (choice === 'fake' && currentScenario.isPhishing);

    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      const newScore = score + 10;
      setScore(newScore);
      setResultMessage('✅ صحيح! Bravo ya batal!');
      onScoreUpdate?.(10);
    } else {
      const newLives = lives - 1;
      setLives(newLives);
      setResultMessage('❌ غالط! El hacker tghaleb 3lik!');
      
      if (newLives <= 0) {
        setGameOver(true);
      }
    }
  };

  const nextLevel = () => {
    if (currentLevel < scenarios.length - 1) {
      setCurrentLevel(currentLevel + 1);
      setShowResult(false);
      setSelectedChoice(null);
    } else {
      setGameWon(true);
    }
  };

  const restartGame = () => {
    setCurrentLevel(0);
    setScore(0);
    setLives(3);
    setShowResult(false);
    setGameOver(false);
    setGameWon(false);
    setSelectedChoice(null);
  };

  if (gameOver) {
    return (
      <div className="phishing-game">
        <div className="game-over-screen">
          <div className="game-over-content">
            <div className="hacker-avatar">{characters.hacker.avatar}</div>
            <h2>Game Over! 💀</h2>
            <p className="game-over-message">
              El hacker tghaleb 3lik! Ma t9ale9ch, ta3allem men el ghaltat.
            </p>
            <div className="final-stats">
              <div className="stat">
                <span className="stat-label">Score Final:</span>
                <span className="stat-value">{score}</span>
              </div>
              <div className="stat">
                <span className="stat-label">Niveau:</span>
                <span className="stat-value">{currentLevel + 1}/{scenarios.length}</span>
              </div>
            </div>
            <div className="game-over-actions">
              <button className="retry-btn" onClick={restartGame}>
                🔄 E3awedha
              </button>
              <button className="back-btn-game" onClick={onBack}>
                ← الرجوع
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (gameWon) {
    return (
      <div className="phishing-game">
        <div className="victory-screen">
          <div className="victory-content">
            <div className="trophy-animation">🏆</div>
            <h2>مبروك! Etounsi Faye9! 🎉</h2>
            <p className="victory-message">
              تغلبت على كل ال hackers! ولّيت محترف في اكتشاف الphishing!
            </p>
            <div className="final-stats">
              <div className="stat">
                <span className="stat-label">Score Final:</span>
                <span className="stat-value">{score} 🌟</span>
              </div>
              <div className="stat">
                <span className="stat-label">دقة:</span>
                <span className="stat-value">{Math.round((score / (scenarios.length * 10)) * 100)}%</span>
              </div>
            </div>
            <div className="victory-badges">
              <div className="badge">🛡️ Phishing Detector</div>
              <div className="badge">🧠 Security Expert</div>
              <div className="badge">⭐ Etounsi Faye9</div>
            </div>
            <div className="game-over-actions">
              <button className="retry-btn" onClick={restartGame}>
                🔄 العب مرة أخرى
              </button>
              <button className="back-btn-game" onClick={onBack}>
                ← الرجوع للقائمة
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentScenario = scenarios[currentLevel];

  return (
    <div className="phishing-game">
      {/* Header */}
      <div className="game-header">
        <button className="back-btn-small" onClick={onBack}>←</button>
        <h2>🎯 Phishing Hunter</h2>
        <div className="score-display">{score} pts</div>
      </div>

      {/* Lives & Progress */}
      <div className="game-stats">
        <div className="lives-container">
          <span className="lives-label">الأرواح:</span>
          <div className="hearts">
            {[...Array(3)].map((_, i) => (
              <span key={i} className={`heart ${i < lives ? 'alive' : 'dead'}`}>
                {i < lives ? '❤️' : '🖤'}
              </span>
            ))}
          </div>
        </div>
        <div className="progress-bar">
          <div className="progress-label">المستوى {currentLevel + 1}/{scenarios.length}</div>
          <div className="progress-track">
            <div 
              className="progress-fill" 
              style={{ width: `${((currentLevel + 1) / scenarios.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Email Display */}
      <div className="email-container">
        <div className="email-header">
          <div className="sender-info">
            <div 
              className="sender-avatar"
              style={{ backgroundColor: currentScenario.from.color }}
            >
              {currentScenario.from.avatar}
            </div>
            <div className="sender-details">
              <div className="sender-name">{currentScenario.from.name}</div>
              <div className="sender-role">{currentScenario.from.role}</div>
            </div>
          </div>
        </div>

        <div className="email-subject">
          <strong>الموضوع:</strong> {currentScenario.subject}
        </div>

        <div className="email-body">
          {currentScenario.message.split('\n').map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>

        {/* URL Display */}
        {(currentScenario.realUrl || currentScenario.fakeUrl) && (
          <div className="url-display">
            <span className="url-icon">🔗</span>
            <span className="url-text">
              {currentScenario.realUrl || currentScenario.fakeUrl}
            </span>
          </div>
        )}
      </div>

      {/* Choices */}
      {!showResult && (
        <div className="choices-container">
          <div className="question-prompt">
            <span className="prompt-icon">🤔</span>
            <p>هذا البريد حقيقي ولا Phishing؟</p>
          </div>
          <div className="choices-buttons">
            <button 
              className={`choice-btn real-btn ${selectedChoice === 'real' ? 'selected' : ''}`}
              onClick={() => handleChoice('real')}
            >
              <span className="choice-icon">✅</span>
              <span className="choice-text">حقيقي</span>
              <span className="choice-subtitle">Safe</span>
            </button>
            <button 
              className={`choice-btn fake-btn ${selectedChoice === 'fake' ? 'selected' : ''}`}
              onClick={() => handleChoice('fake')}
            >
              <span className="choice-icon">⚠️</span>
              <span className="choice-text">Phishing</span>
              <span className="choice-subtitle">خطر!</span>
            </button>
          </div>
        </div>
      )}

      {/* Result Display */}
      {showResult && (
        <div className={`result-panel ${isCorrect ? 'correct' : 'incorrect'}`}>
          <div className="result-header">
            <span className="result-icon">
              {isCorrect ? '🎉' : '💔'}
            </span>
            <h3>{resultMessage}</h3>
          </div>

          <div className="explanation-box">
            <h4>التفسير:</h4>
            <p>{currentScenario.explanation}</p>
          </div>

          <div className="tips-box">
            <h4>💡 نصيحة:</h4>
            <p>{currentScenario.tips}</p>
          </div>

          <button className="next-btn" onClick={nextLevel}>
            {currentLevel < scenarios.length - 1 ? 'المستوى الجاي →' : 'أنهي اللعبة 🏆'}
          </button>
        </div>
      )}

      {/* Matrix Effect Background */}
      <div className="matrix-bg">
        <div className="matrix-code">010101</div>
      </div>
    </div>
  );
};

export default PhishingHunterGame;
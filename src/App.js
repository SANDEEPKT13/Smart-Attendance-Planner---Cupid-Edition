import React, { useState, useEffect } from 'react';
import { Calculator, Calendar, Info, Sun, Moon, Download, RefreshCw, TrendingUp, Heart, User } from 'lucide-react';

const SmartAttendancePlanner = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [present, setPresent] = useState('');
  const [total, setTotal] = useState('');
  const [targets, setTargets] = useState('75, 85');
  const [results, setResults] = useState(null);
  const [userGender, setUserGender] = useState('he');
  const [dailyMessage, setDailyMessage] = useState('');
  const [attendanceMessage, setAttendanceMessage] = useState('');
  const [currentMessage, setCurrentMessage] = useState('');
  const [getWelcomeMessage, setgetWelcomeMessage] = useState('');
  const [getLazyDayMessage, setgetLazyDayMessage] = useState('');


    
  // Fixed timetable data
  const fixedTimetable = [
    { day: 'Monday', lectures: 8 },
    { day: 'Tuesday', lectures: 6 },
    { day: 'Wednesday', lectures: 8 },
    { day: 'Thursday', lectures: 8 },
    { day: 'Friday', lectures: 6 },
    { day: 'Saturday', lectures: 0 },
    { day: 'Sunday', lectures: 0 }
  ];

  const weeklyLectures = fixedTimetable.reduce((sum, day) => sum + day.lectures, 0);

  // Daily Motivation Messages (shown on page load/refresh)
  const getDailyMotivation = () => {
    const currentDay = new Date().getDay();
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = dayNames[currentDay];

    const dailyMessages = {
      he: {
        Monday: [
          "Monday blues? She might be in that 8 AM lecture 😏 Go get those attendance and heart points 💘",
          "New week, new chances! 8 lectures today means 8 opportunities to catch her eye 👀💕",
          "Start the week strong, king! She's definitely watching who shows up on Mondays 👑❤️",
          "Monday grind! Your dedication today sets the tone... she'll notice 💪💖",
          "8 lectures? More like 8 chances to be in the same room as her 😊💘",
          "Monday motivation: Show up, work hard, make her wonder about you 🤔💕",
          "First day energy! She loves a guy who doesn't skip Mondays 😉❤️"
        ],
        Tuesday: [
          "Tuesday vibes! 6 lectures = 6 chances to cross paths with her 😉💝",
          "Mid-week already! Maybe she'll ask you about yesterday's class? 📚💕",
          "Tuesday hustle! Consistency is sexy, trust me 💪❤️",
          "Only 6 lectures today, easy day to shine in front of her ✨💖",
          "She's probably wondering if you're as consistent as you seem 👀💘",
          "Tuesday check-in: Are you attending or are you missing out... on her? 😏💕"
        ],
        Wednesday: [
          "Hump day with 8 lectures! More time on campus = more chances to say hi 👋💖",
          "Wednesday grind! Halfway through the week and she's definitely noticing your attendance 📈💕",
          "8 classes today... maybe grab coffee together after? ☕❤️",
          "Mid-week power move: Show up even when it's tough. She'll respect that 💪💘",
          "Wednesday warrior! Your attendance game is on point, just like you 😊💖",
          "Hump day hustle! She loves a guy who doesn't give up mid-week 🔥💕"
        ],
        Thursday: [
          "Almost weekend! 8 lectures to power through. She loves a hardworking guy 💪❤️",
          "Thursday grind! One more day, then you can tell her about your weekend plans? 😉💖",
          "Last big push! Show her you don't give up before the finish line 🏁💕",
          "8 lectures today but who's counting when she's around? 😊💘",
          "Thursday motivation: You've come this far, don't slack now! She's watching 👀❤️",
          "Almost there! Your consistency this week is definitely turning heads 💫💖"
        ],
        Friday: [
          "Friday feeling! 6 lectures standing between you and the weekend (and maybe her?) 😏💕",
          "TGIF vibes! Show up today, maybe ask her about weekend plans? 🎉❤️",
          "Last day of the week! End it strong, maybe she'll remember you over the weekend 💭💖",
          "Friday energy! Only 6 lectures, perfect day to make a move 😉💘",
          "Weekend's almost here! But first, 6 chances to see her smile 😊💕",
          "Friday motivation: Finish strong and she might just text you this weekend 📱❤️"
        ],
        Saturday: [
          "Saturday's your break, champ! But you skipping Friday too? Maybe go see her 💖😉",
          "Rest day! Time to think about... her? Just kidding... or am I? 😏💕",
          "No classes but maybe text her? Weekend vibes! 📱❤️",
          "Saturday chill! But remember, Monday's coming fast ⏰💘",
          "Break day! Netflix or... thinking about her? Be honest 😊💖",
          "Rest up king, but don't ghost her this weekend! 👑💕"
        ],
        Sunday: [
          "Sunday chill! Prep for Monday's 8 lectures... and maybe plan how to talk to her 😊❤️",
          "Last day of freedom! Tomorrow's grind includes 8 lectures... will she be there? 🤔💕",
          "Sunday self-care! But also prep your attendance game for the week 💪💖",
          "Rest today, impress her tomorrow! Get ready for the week ahead 📚💘",
          "Sunday vibes! Monday has 8 lectures... perfect timing to restart your streak 🔥❤️",
          "Chill day! But start planning: How will you catch her attention this week? 😉💕"
        ]
      },
      she: {
        Monday: [
          "Monday motivation, queen! 8 lectures = 8 chances for him to notice you 👑💕",
          "New week energy! Show up looking good, feeling confident 💅❤️",
          "Monday with 8 lectures means 8 opportunities to catch his eye 👀💖",
          "Start strong! Your consistency is attractive... he's watching 😊💘",
          "Monday grind! Show him what dedication looks like 💪💕",
          "First day of the week! He's definitely noticing who shows up consistently 🔥❤️",
          "8 lectures today? 8 chances to make him wonder about you 😉💖"
        ],
        Tuesday: [
          "Tuesday energy! 6 lectures, but who's counting when he might be there? 😊💘",
          "Mid-week vibes! Maybe he'll finally ask for notes? 📚💕",
          "Tuesday check! Your attendance is impressive, he's definitely noticing 👀❤️",
          "Only 6 lectures today, perfect day to shine bright ✨💖",
          "Tuesday motivation: Consistency is queen behavior 👑💕",
          "He's probably wondering if you're always this dedicated 🤔❤️"
        ],
        Wednesday: [
          "Hump day hustle! 8 lectures... maybe you'll catch his eye in the hallway 👀❤️",
          "Wednesday with 8 lectures! Mid-week power, he'll love your energy 💪💕",
          "Halfway through! Your dedication this week is goals 🎯💖",
          "8 classes today means more chances to bump into him ☕💘",
          "Wednesday grind! Show him you don't quit mid-week 🔥❤️",
          "Hump day queen! He's definitely impressed by your consistency 😊💕"
        ],
        Thursday: [
          "Almost there! 8 lectures today. He'll love your work ethic (and your smile) 😊💖",
          "Thursday vibes! One more day, then maybe weekend plans with him? 😉💕",
          "Last big push! Show him you finish what you start 💪❤️",
          "8 lectures but you got this! He's watching your dedication 👀💘",
          "Thursday energy! Your consistency all week is definitely turning heads 💫💖",
          "Almost weekend! But first, show him what a queen looks like 👑💕"
        ],
        Friday: [
          "Friday feeling! 6 lectures, then freedom! Maybe he'll ask about weekend plans? 🎉💕",
          "TGIF energy! End the week strong, he'll remember you over the weekend 💭❤️",
          "Last day! 6 lectures between you and the weekend (and maybe him?) 😏💖",
          "Friday vibes! Perfect day to shine one last time this week ✨💘",
          "Weekend's here! But first, 6 chances to catch his attention 😊💕",
          "Friday motivation: Finish strong and he might just text you 📱❤️"
        ],
        Saturday: [
          "Saturday's your break, queen 👑! But who's waiting for you Monday? 👀💘",
          "Rest day! Time to prep for next week (and look amazing) 💅💕",
          "No classes! But maybe he's thinking about you? 😊❤️",
          "Saturday chill! Rest up, Monday's coming with 8 lectures 💤💖",
          "Break day! Netflix or texting him? Your choice bestie 📱💕",
          "Rest well queen! Next week is another chance to shine 👑❤️"
        ],
        Sunday: [
          "Sunday self-care! But remember, Monday has 8 lectures... will he be there? 🤔💖",
          "Last relaxing day! Tomorrow's grind starts fresh 💪💕",
          "Sunday vibes! Prep your attendance game for the week ahead 📚❤️",
          "Chill today, slay tomorrow! Get ready for 8 Monday lectures ✨💘",
          "Rest day! But start planning: How will you catch his eye this week? 😉💕",
          "Sunday prep! Your consistency next week will definitely get his attention 👀❤️"
        ]
      }
    };

    const messages = dailyMessages[userGender][today];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  // Attendance Feedback Messages (shown after calculation)
  const getAttendanceFeedback = (attendance) => {
    const feedbackMessages = {
      he: {
        low: [
          "Bro... your attendance is struggling. She won't wait forever! Get to class! 🚨💔",
          "Oof, under 70%? Time to get serious before she notices someone else 😬❤️‍🩹",
          "Dude, this attendance isn't gonna impress anyone... especially not her 😟💔",
          "Red alert! Your attendance needs immediate attention. She's already noticing 🚨💔",
          "Man, you're falling behind! How can she notice you if you're never there? 😕❤️‍🩹",
          "Below 70%? That's not the flex you think it is... get it together! 💔😬",
          "Your attendance is in danger zone! She deserves someone more consistent 🚫💔",
          "Critical level! Start showing up or she'll definitely notice... your absence 😰❤️‍🩹",
          "This isn't it, chief! Your attendance game needs serious work 📉💔",
          "She's been attending regularly... why haven't you? Step it up! 😟💔"
        ],
        medium: [
          "Getting there! A few more lectures and you'll be in her good books 📈💕",
          "Not bad, but you can do better! She's watching your progress 👀💖",
          "Decent attendance! Keep it up and maybe she'll notice 😊❤️",
          "You're on track! A little more effort and she'll definitely be impressed 💪💕",
          "Solid work! Keep this consistency and she won't be able to ignore you 😉💖",
          "Good attendance! Now maintain it and watch her take notice 👀❤️",
          "You're doing well! Just need that extra push to really stand out 📈💕",
          "Respectable numbers! She appreciates dedication, keep going 💪💖",
          "Nice progress! You're becoming the reliable guy she's looking for 😊❤️",
          "Looking good! Stay consistent and she'll definitely remember you 🎯💕",
          "Above average! That's attractive, keep climbing 📈💖",
          "You're in the safe zone! Now aim higher to really impress her 💪❤️"
        ],
        high: [
          "Damn! 90%+ attendance? She's definitely impressed 😍🏆",
          "King behavior! Your dedication is 🔥 Keep it up, she's watching! 👑💖",
          "Crushing it! This attendance game is strong, just like your chances with her 💪💕",
          "Absolute legend! 90%+ is goals, she's definitely noticing 🏆❤️",
          "You're killing it! This kind of consistency is seriously attractive 😍💖",
          "Elite level attendance! She's probably already impressed by your dedication 👑💕",
          "Wow! 90%+ shows serious commitment. She can't help but notice 🔥❤️",
          "Top tier! Your attendance is as impressive as you are 💪💖",
          "Exceptional! This dedication level is rare... and very attractive 😍💕",
          "Outstanding! You're the guy every professor (and she) respects 🏆❤️",
          "Perfect attendance vibes! She's definitely taking notes 📝💖",
          "Champion level! This consistency is seriously impressive 👑💕",
          "You're winning! Both at attendance and probably at life 🎯❤️"
        ]
      },
      she: {
        low: [
          "Queen, your attendance needs work! He won't notice if you're never there 👀💕",
          "Girl... below 70%? Time to show up and show out! 💅❤️",
          "Bestie, this attendance isn't it... how will he see you if you're not there? 😟💔",
          "Red flag territory! Your attendance needs immediate attention, girl 🚨💔",
          "Sis, you're slipping! How can he notice you if you're always absent? 😕❤️‍🩹",
          "Under 70%? That's not queen behavior! Fix this ASAP 💔😬",
          "Danger zone! He's looking for someone consistent... are you showing up? 🚫💔",
          "Critical! Start attending or he'll notice... someone else 😰❤️‍🩹",
          "This isn't serving you, bestie! Your attendance game needs work 📉💔",
          "He's been there every day... where have you been? Get it together! 😟💔"
        ],
        medium: [
          "You're getting there, girl! A little more effort and he'll definitely notice 📈💖",
          "Not bad! Keep showing up, consistency is attractive 😊💕",
          "Decent work! Your dedication is starting to show (and so are you!) 👀❤️",
          "Good progress! Keep this up and he won't be able to ignore you 💪💖",
          "Solid attendance, queen! Now maintain it and watch him take notice 😉💕",
          "You're doing well! Just a bit more to really catch his eye 📈❤️",
          "Respectable! He appreciates a dedicated queen 👑💖",
          "Nice work! You're becoming the consistent girl he's looking for 😊💕",
          "Looking good, bestie! Stay on track and he'll remember you 🎯❤️",
          "Above average! That's attractive energy, keep it up 📈💖",
          "Safe zone achieved! Now aim higher to really impress him 💪💕",
          "Good job! Your consistency is starting to shine through ✨❤️"
        ],
        high: [
          "Yasss queen! 90%+ attendance! He better be taking notes 📝👑",
          "Slaying the attendance game! You're goals, bestie 💅✨",
          "Queen behavior! This dedication is 🔥 He's definitely impressed 💖",
          "Absolute queen! 90%+ shows serious commitment, he's noticing 👑❤️",
          "You're killing it! This consistency is seriously attractive 😍💕",
          "Elite queen! Your dedication is inspiring... and impressive 🏆💖",
          "Wow! 90%+ attendance? He can't help but notice your commitment 🔥❤️",
          "Top tier queen energy! Your attendance is as perfect as you are 💪💕",
          "Exceptional! This level of dedication is rare and very attractive 😍💖",
          "Outstanding! You're the girl everyone (especially him) respects 🏆❤️",
          "Perfect attendance vibes! He's definitely impressed 📝💕",
          "Champion! This consistency is queen behavior at its finest 👑💖",
          "You're winning at everything! Attendance, life, and probably his heart 🎯❤️"
        ]
      }
    };

    let category = 'medium';
    if (attendance < 70) category = 'low';
    else if (attendance >= 90) category = 'high';

    const messages = feedbackMessages[userGender][category];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  useEffect(() => {
    const saved = localStorage.getItem('attendanceData');
    if (saved) {
      const data = JSON.parse(saved);
      setPresent(data.present || '');
      setTotal(data.total || '');
      setTargets(data.targets || '75, 85');
      setUserGender(data.gender || 'he');
    }
    
    // Show daily motivation on page load
    setDailyMessage(getDailyMotivation());
  }, []);

  useEffect(() => {
    if (present || total || targets || userGender) {
      localStorage.setItem('attendanceData', JSON.stringify({ present, total, targets, gender: userGender }));
    }
    
    // Update daily message when gender changes
    if (userGender) {
      setDailyMessage(getDailyMotivation());
    }
  }, [present, total, targets, userGender]);

  const calculateAttendance = () => {
    const p = parseFloat(present);
    const t = parseFloat(total);
    const targetArray = targets.split(',').map(s => parseFloat(s.trim())).filter(n => !isNaN(n));

    if (isNaN(p) || isNaN(t) || t === 0 || targetArray.length === 0) {
      return;
    }

    const currentPercent = (p / t) * 100;
    const calculations = targetArray.map(target => {
      let required = 0;
      if (currentPercent < target) {
        required = Math.ceil((target * t - 100 * p) / (100 - target));
        required = Math.max(0, required);
      }
      
      const maxTotal = p > 0 ? (100 * p) / target : 0;
      const canSkip = Math.max(0, Math.floor(maxTotal - t));
      
      const weeksNeeded = required > 0 ? Math.ceil(required / weeklyLectures) : 0;
      const safeLeaveDays = Math.floor((canSkip / weeklyLectures) * 5);
      
      return {
        target,
        required,
        canSkip,
        achieved: currentPercent >= target,
        weeksNeeded,
        safeLeaveDays
      };
    });

    setResults({
      current: currentPercent,
      calculations
    });
    
    // Set attendance feedback message
    setAttendanceMessage(getAttendanceFeedback(currentPercent));
  };

  const getCupidMessage = () => {
    return currentMessage || getWelcomeMessage();
  };

  const handleLazyButtonClick = () => {
    setCurrentMessage(getLazyDayMessage());
  };

  const resetData = () => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm('Are you sure you want to reset all data?')) {
      setPresent('');
      setTotal('');
      setTargets('75, 85');
      setResults(null);
      setAttendanceMessage('');
      localStorage.removeItem('attendanceData');
    }
  };

  const downloadSummary = () => {
    if (!results) return;
    
    let content = `Smart Attendance Planner - Cupid Edition 💘\n`;
    content += `Generated on: ${new Date().toLocaleDateString()}\n\n`;
    content += `Current Status:\n`;
    content += `Present: ${present} lectures\n`;
    content += `Total: ${total} lectures\n`;
    content += `Current Attendance: ${results.current.toFixed(2)}%\n\n`;
    
    results.calculations.forEach(calc => {
      content += `Target: ${calc.target}%\n`;
      content += `  Status: ${calc.achieved ? '✓ Achieved' : '✗ Not Achieved'}\n`;
      content += `  Lectures needed: ${calc.required}\n`;
      content += `  Safe skips allowed: ${calc.canSkip}\n`;
      content += `  Weeks to reach goal: ${calc.weeksNeeded}\n\n`;
    });

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'attendance-summary.txt';
    a.click();
  };

  const bgClass = darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50';
  const cardClass = darkMode 
    ? 'bg-gray-800 border-gray-700' 
    : 'bg-white/80 backdrop-blur-sm border-gray-200';
  const textClass = darkMode ? 'text-gray-100' : 'text-gray-800';
  const textSecondary = darkMode ? 'text-gray-400' : 'text-gray-600';

  return (
    <div className={`min-h-screen ${bgClass} transition-colors duration-300`}>
      {/* Header */}
      <header className={`${cardClass} border-b shadow-sm`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-pink-500 to-purple-600 p-2 rounded-lg">
                <TrendingUp className="text-white" size={24} />
              </div>
              <div>
                <h1 className={`text-2xl font-bold ${textClass}`}>Smart Attendance Planner</h1>
                <p className={`text-sm ${textSecondary}`}>Plan Smart. Stay Above 75%</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Gender Selector */}
              <div className={`flex gap-2 p-1 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <button
                  onClick={() => setUserGender('he')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    userGender === 'he'
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md'
                      : `${textSecondary} hover:bg-gray-200 dark:hover:bg-gray-600`
                  }`}
                >
                  👦 He
                </button>
                <button
                  onClick={() => setUserGender('she')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    userGender === 'she'
                      ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-md'
                      : `${textSecondary} hover:bg-gray-200 dark:hover:bg-gray-600`
                  }`}
                >
                  👧 She
                </button>
              </div>
              
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-lg ${cardClass} border hover:scale-105 transition-transform`}
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="container mx-auto px-4 mt-6">
        <div className="flex gap-2">
          {['dashboard', 'schedule', 'about'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg'
                  : `${cardClass} ${textClass} hover:scale-105`
              }`}
            >
              {tab === 'dashboard' && <Calculator size={16} className="inline mr-2" />}
              {tab === 'schedule' && <Calendar size={16} className="inline mr-2" />}
              {tab === 'about' && <Info size={16} className="inline mr-2" />}
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Daily Motivation Message - Always visible */}
            <div className={`${cardClass} border-2 border-pink-200 dark:border-pink-900 rounded-2xl p-6 shadow-xl bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20`}>
              <p className={`text-base ${textClass} leading-relaxed`}>
                {dailyMessage}
              </p>
            </div>

            {/* Input Card */}
            <div className={`${cardClass} border rounded-2xl p-6 shadow-xl`}>
              <h2 className={`text-xl font-bold mb-4 ${textClass}`}>📊 Enter Your Details</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${textSecondary}`}>
                    Present Lectures
                  </label>
                  <input
                    type="number"
                    value={present}
                    onChange={(e) => setPresent(e.target.value)}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                    } focus:ring-2 focus:ring-pink-500 outline-none transition`}
                    placeholder="e.g., 45"
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${textSecondary}`}>
                    Total Lectures
                  </label>
                  <input
                    type="number"
                    value={total}
                    onChange={(e) => setTotal(e.target.value)}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                    } focus:ring-2 focus:ring-pink-500 outline-none transition`}
                    placeholder="e.g., 60"
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${textSecondary}`}>
                    Target % (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={targets}
                    onChange={(e) => setTargets(e.target.value)}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                    } focus:ring-2 focus:ring-pink-500 outline-none transition`}
                    placeholder="e.g., 75, 85"
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={calculateAttendance}
                  className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all"
                >
                  <Calculator size={18} className="inline mr-2" />
                  Calculate
                </button>
                <button
                  onClick={resetData}
                  className={`px-6 py-3 rounded-lg border ${cardClass} hover:scale-105 transition-all`}
                >
                  <RefreshCw size={18} />
                </button>
                {results && (
                  <button
                    onClick={downloadSummary}
                    className={`px-6 py-3 rounded-lg border ${cardClass} hover:scale-105 transition-all`}
                  >
                    <Download size={18} />
                  </button>
                )}
              </div>
            </div>

            {/* Results */}
            {results && (
              <div className="space-y-4">
                {/* Attendance Feedback Message - Only shows after calculation */}
                {attendanceMessage && (
                  <div className={`${cardClass} border-2 border-purple-200 dark:border-purple-900 rounded-2xl p-6 shadow-xl bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20`}>
                    <p className={`text-base ${textClass} leading-relaxed font-medium`}>
                      {attendanceMessage}
                    </p>
                  </div>
                )}

                {/* Current Status */}
                <div className={`${cardClass} border rounded-2xl p-6 shadow-xl`}>
                  <h3 className={`text-lg font-bold mb-4 ${textClass}`}>📈 Current Status</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`text-5xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent`}>
                        {results.current.toFixed(2)}%
                      </p>
                      <p className={`${textSecondary} mt-1`}>Your current attendance</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-2xl font-bold ${textClass}`}>{present}/{total}</p>
                      <p className={`${textSecondary} text-sm`}>Lectures attended</p>
                    </div>
                  </div>
                  <div className="mt-4 bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-pink-500 to-purple-600 h-full transition-all duration-500"
                      style={{ width: `${Math.min(results.current, 100)}%` }}
                    />
                  </div>
                </div>

                {/* Target Cards */}
                <div className="grid md:grid-cols-2 gap-4">
                  {results.calculations.map((calc, idx) => (
                    <div
                      key={idx}
                      className={`${cardClass} border rounded-2xl p-6 shadow-xl hover:scale-105 transition-transform`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h4 className={`text-xl font-bold ${textClass}`}>
                          🎯 Target: {calc.target}%
                        </h4>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          calc.achieved
                            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                            : 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'
                        }`}>
                          {calc.achieved ? '✅ Achieved' : '🚧 In Progress'}
                        </span>
                      </div>
                      <div className="space-y-3">
                        <div className={`flex justify-between items-center p-3 rounded-lg ${
                          darkMode ? 'bg-gray-700/50' : 'bg-gray-50'
                        }`}>
                          <span className={textSecondary}>Lectures Needed:</span>
                          <span className={`font-bold text-lg ${textClass}`}>
                            {calc.required === 0 ? '🎉 None!' : calc.required}
                          </span>
                        </div>
                        <div className={`flex justify-between items-center p-3 rounded-lg ${
                          darkMode ? 'bg-gray-700/50' : 'bg-gray-50'
                        }`}>
                          <span className={textSecondary}>Safe Skips Allowed:</span>
                          <span className={`font-bold text-lg ${textClass}`}>
                            {calc.canSkip === 0 ? '🚫 None' : `${calc.canSkip} 🎊`}
                          </span>
                        </div>
                        <div className={`flex justify-between items-center p-3 rounded-lg ${
                          darkMode ? 'bg-gray-700/50' : 'bg-gray-50'
                        }`}>
                          <span className={textSecondary}>Weeks to Goal:</span>
                          <span className={`font-bold text-lg ${textClass}`}>
                            {calc.weeksNeeded === 0 ? '✓ Done!' : `${calc.weeksNeeded} weeks`}
                          </span>
                        </div>
                        <div className={`flex justify-between items-center p-3 rounded-lg ${
                          darkMode ? 'bg-gray-700/50' : 'bg-gray-50'
                        }`}>
                          <span className={textSecondary}>Safe Leave Days/Week:</span>
                          <span className={`font-bold text-lg ${textClass}`}>
                            {calc.safeLeaveDays} days
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'schedule' && (
          <div className="space-y-6">
            <div className={`${cardClass} border rounded-2xl p-6 shadow-xl`}>
              <h2 className={`text-xl font-bold mb-4 ${textClass}`}>📅 Your Weekly Schedule</h2>
              <p className={`${textSecondary} mb-6`}>
                Your fixed weekly lecture schedule (Total: {weeklyLectures} lectures/week)
              </p>
              <div className="grid md:grid-cols-7 gap-3">
                {fixedTimetable.map((day, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-xl text-center transition-transform hover:scale-105 ${
                      day.lectures === 0
                        ? darkMode ? 'bg-gray-700/30 border border-gray-600' : 'bg-gray-100 border border-gray-300'
                        : darkMode ? 'bg-gradient-to-br from-pink-900/30 to-purple-900/30 border border-pink-700' : 'bg-gradient-to-br from-pink-50 to-purple-50 border border-pink-200'
                    }`}
                  >
                    <p className={`text-sm font-medium ${textSecondary} mb-2`}>{day.day}</p>
                    <p className={`text-3xl font-bold ${textClass}`}>
                      {day.lectures === 0 ? '🏖️' : day.lectures}
                    </p>
                    <p className={`text-xs ${textSecondary} mt-1`}>
                      {day.lectures === 0 ? 'Break!' : 'lectures'}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 grid md:grid-cols-3 gap-4">
                <div className={`p-4 rounded-lg ${darkMode ? 'bg-pink-900/20' : 'bg-pink-50'}`}>
                  <p className={`text-sm ${textSecondary}`}>Weekly Lectures</p>
                  <p className={`text-3xl font-bold ${textClass} mt-1`}>{weeklyLectures}</p>
                </div>
                <div className={`p-4 rounded-lg ${darkMode ? 'bg-purple-900/20' : 'bg-purple-50'}`}>
                  <p className={`text-sm ${textSecondary}`}>Working Days</p>
                  <p className={`text-3xl font-bold ${textClass} mt-1`}>5</p>
                </div>
                <div className={`p-4 rounded-lg ${darkMode ? 'bg-blue-900/20' : 'bg-blue-50'}`}>
                  <p className={`text-sm ${textSecondary}`}>Break Days</p>
                  <p className={`text-3xl font-bold ${textClass} mt-1`}>2</p>
                </div>
              </div>
            </div>

            <div className={`${cardClass} border rounded-2xl p-6 shadow-xl`}>
              <h3 className={`text-lg font-bold mb-3 ${textClass}`}>💡 Schedule Tips</h3>
              <ul className={`space-y-2 ${textSecondary}`}>
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>Monday & Wednesday are heavy days with 8 lectures each - perfect for making an impression!</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>Tuesday & Friday are lighter with 6 lectures - great for group study sessions 📚</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>Thursday rounds out the week with 8 lectures - push through and you've got the weekend!</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>Saturday & Sunday are your break days - rest up, but don't forget to prep for Monday! 😊</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'about' && (
          <div className={`${cardClass} border rounded-2xl p-8 shadow-xl max-w-3xl mx-auto`}>
            <h2 className={`text-2xl font-bold mb-6 ${textClass}`}> About Smart Attendance Planner</h2>
            <div className="space-y-6">
              <div>
                <h3 className={`text-lg font-bold mb-2 ${textClass}`}>How It Works</h3>
                <p className={textSecondary}>
                  Smart Attendance Planner helps you stay on top of your college attendance by calculating exactly how many lectures you need to attend or can safely skip to maintain your target percentage. Now with Cupid-inspired motivation to keep you going!
                </p>
              </div>
              
              <div>
                <h3 className={`text-lg font-bold mb-2 ${textClass}`}>Calculation Methods</h3>
                <ul className={`list-disc list-inside space-y-2 ${textSecondary}`}>
                  <li><strong>Current Attendance:</strong> (Present / Total) × 100</li>
                  <li><strong>Lectures Needed:</strong> Calculates attendance required considering both present and total increase together</li>
                  <li><strong>Safe Skips:</strong> Maximum lectures you can miss while staying at or above target</li>
                  <li><strong>Weekly Projections:</strong> Based on your fixed 36-lecture weekly schedule</li>
                </ul>
              </div>

              <div>
                <h3 className={`text-lg font-bold mb-2 ${textClass}`}>💘 Cupid Mode Features</h3>
                <ul className={`list-disc list-inside space-y-2 ${textSecondary}`}>
                  <li>Personalized motivational messages based on your gender selection</li>
                  <li>Day-specific encouragement to keep you motivated throughout the week</li>
                  <li>Fun, flirty reminders that attendance can be... romantic? 😉</li>
                  <li>Dynamic messages that change based on your current attendance percentage</li>
                  <li>College-fun playful tone that makes tracking attendance actually enjoyable!</li>
                </ul>
              </div>

              <div>
                <h3 className={`text-lg font-bold mb-2 ${textClass}`}>Core Features</h3>
                <ul className={`list-disc list-inside space-y-2 ${textSecondary}`}>
                  <li>Track multiple target percentages simultaneously (70%, 75%, 85%, etc.)</li>
                  <li>Fixed weekly schedule with 36 total lectures</li>
                  <li>Automatic calculation of weeks needed to reach each goal</li>
                  <li>Safe leave days calculation per week</li>
                  <li>Data persists locally - never lose your progress</li>
                  <li>Download summary reports</li>
                  <li>Beautiful dark/light mode interface</li>
                  <li>Gender-based personalization for more relatable messages</li>
                </ul>
              </div>

              <div>
                <h3 className={`text-lg font-bold mb-2 ${textClass}`}>Your Weekly Schedule</h3>
                <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700/30' : 'bg-gray-50'}`}>
                  <ul className={`space-y-1 ${textSecondary}`}>
                    <li>📚 <strong>Monday:</strong> 8 lectures</li>
                    <li>📚 <strong>Tuesday:</strong> 6 lectures</li>
                    <li>📚 <strong>Wednesday:</strong> 8 lectures</li>
                    <li>📚 <strong>Thursday:</strong> 8 lectures</li>
                    <li>📚 <strong>Friday:</strong> 6 lectures</li>
                    <li>🏖️ <strong>Saturday:</strong> Break day</li>
                    <li>🏖️ <strong>Sunday:</strong> Break day</li>
                  </ul>
                  <p className={`mt-3 font-semibold ${textClass}`}>Total: 36 lectures per week</p>
                </div>
              </div>

              <div className={`p-4 rounded-lg ${darkMode ? 'bg-pink-900/30' : 'bg-pink-50'}`}>
                <p className={`text-sm ${textClass} font-medium`}>
                  💡 Pro Tip: Always maintain a buffer above your minimum target percentage to account for unexpected absences! Plus, consistency is attractive... in attendance AND in life 😉💕
                </p>
              </div>

              <div className={`text-center p-6 rounded-lg ${darkMode ? 'bg-gradient-to-r from-pink-900/20 to-purple-900/20' : 'bg-gradient-to-r from-pink-50 to-purple-50'}`}>
                <Heart className="mx-auto mb-3 text-pink-500" size={40} />
                <p className={`text-lg font-bold ${textClass} mb-2`}>
                  Made with 💜 for students who plan smart
                </p>
                <p className={`${textSecondary}`}>
                  Stay Above 75% - Your future self (and maybe someone special) will thank you! 😊
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer style={{ 
  textAlign: 'center', 
  padding: '20px 0', 
  backgroundColor: '#f9f9f9', 
  color: '#555', 
  fontSize: '14px',
  marginTop: '50px',
  borderTop: '1px solid #ddd'
}}>
  <p>© 2024 Smart Attendance Planner — All Rights Reserved.</p>
  <p>Designed & Developed by <strong>VORTEX</strong></p>
  <p style={{ fontStyle: 'italic', fontSize: '12px', color: '#888' }}>
    This project and its concept are original intellectual property. Unauthorized copying or redistribution is prohibited.
  </p>
</footer>

    </div>
    
  );
};

export default SmartAttendancePlanner;
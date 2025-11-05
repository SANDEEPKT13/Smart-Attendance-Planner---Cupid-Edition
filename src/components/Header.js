// src/components/Header.js
import React from 'react';
import { Calculator, Calendar, Info, Sun, Moon, TrendingUp, BarChart3, Shield, Mail } from 'lucide-react';

function Header({ darkMode, setDarkMode, appMode, setAppMode, userGender, setUserGender, globalUsageCount, activeTab, setActiveTab }) {
  const cardClass = darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white/80 backdrop-blur-sm border-gray-200';
  const textClass = darkMode ? 'text-gray-100' : 'text-gray-800';
  const textSecondary = darkMode ? 'text-gray-400' : 'text-gray-600';

  return (
    <>
      <header className={`${cardClass} border-b shadow-sm`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className={`bg-gradient-to-br p-2 rounded-lg ${
                appMode === 'brutal' ? 'from-gray-700 to-black' :
                appMode === 'fun' ? 'from-pink-500 to-purple-600' :
                'from-blue-500 to-indigo-600'
              }`}>
                <TrendingUp className="text-white" size={24} />
              </div>
              <div>
                <h1 className={`text-2xl font-bold ${textClass}`}>Smart Attendance Planner</h1>
                <p className={`text-sm ${textSecondary}`}>
                  {appMode === 'brutal' ? 'Face Reality. Take Action.' :
                   appMode === 'fun' ? 'Plan Smart. Stay Above 75%' :
                   'Plan Smart. Achieve Excellence'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${cardClass} border shadow-sm`}>
                <BarChart3 size={18} className="text-green-500" />
                <div className="text-left">
                  <p className={`text-xs ${textSecondary}`}>Total Uses</p>
                  <p className={`text-lg font-bold ${textClass}`}>{globalUsageCount.toLocaleString()}</p>
                </div>
              </div>
              <button onClick={() => setDarkMode(!darkMode)} className={`p-2 rounded-lg ${cardClass} border`}>
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap mt-4">
            <div className={`flex gap-1 p-1 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <button onClick={() => setAppMode('serious')} className={`px-4 py-2 rounded-lg font-medium text-sm ${appMode === 'serious' ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white' : textSecondary}`}>
                📚 Serious
              </button>
              <button onClick={() => setAppMode('fun')} className={`px-4 py-2 rounded-lg font-medium text-sm ${appMode === 'fun' ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white' : textSecondary}`}>
                💘 Fun
              </button>
              <button onClick={() => setAppMode('brutal')} className={`px-4 py-2 rounded-lg font-medium text-sm ${appMode === 'brutal' ? 'bg-gradient-to-r from-gray-700 to-black text-white' : textSecondary}`}>
                💀 Brutal
              </button>
            </div>

            {appMode === 'fun' && (
              <div className={`flex gap-2 p-1 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <button onClick={() => setUserGender('he')} className={`px-4 py-2 rounded-lg ${userGender === 'he' ? 'bg-blue-500 text-white' : textSecondary}`}>
                  👦 He
                </button>
                <button onClick={() => setUserGender('she')} className={`px-4 py-2 rounded-lg ${userGender === 'she' ? 'bg-pink-500 text-white' : textSecondary}`}>
                  👧 She
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <nav className="container mx-auto px-4 mt-6">
        <div className="flex gap-2 overflow-x-auto">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: Calculator },
            { id: 'schedule', label: 'Schedule', icon: Calendar },
            { id: 'about', label: 'About', icon: Info },
            { id: 'privacy', label: 'Privacy', icon: Shield },
            { id: 'contact', label: 'Contact', icon: Mail }
          ].map(tab => (
            <button 
              key={tab.id} 
              onClick={() => setActiveTab(tab.id)} 
              className={`px-6 py-2 rounded-lg font-medium whitespace-nowrap ${
                activeTab === tab.id 
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white' 
                  : `${cardClass} ${textClass}`
              }`}
            >
              <tab.icon size={16} className="inline mr-2" />
              {tab.label}
            </button>
          ))}
        </div>
      </nav>
    </>
  );
}

export default Header;
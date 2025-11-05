// src/pages/PrivacyPolicy.js
import React from 'react';
import { Shield } from 'lucide-react';

function PrivacyPolicy({ darkMode }) {
  const cardClass = darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white/80 backdrop-blur-sm border-gray-200';
  const textClass = darkMode ? 'text-gray-100' : 'text-gray-800';
  const textSecondary = darkMode ? 'text-gray-400' : 'text-gray-600';

  return (
    <div className={`${cardClass} border rounded-2xl p-8 shadow-xl max-w-4xl mx-auto`}>
      <div className="flex items-center gap-3 mb-6">
        <Shield className="text-blue-500" size={32} />
        <h1 className={`text-3xl font-bold ${textClass}`}>Privacy Policy</h1>
      </div>

      <div className={`space-y-6 ${textSecondary}`}>
        <p className="text-sm">Last updated: {new Date().toLocaleDateString()}</p>

        <section>
          <h2 className={`text-xl font-bold ${textClass} mb-3`}>1. Information We Collect</h2>
          <p>Smart Attendance Planner is designed with your privacy in mind. We collect minimal information:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li><strong>Local Storage Data:</strong> Your attendance records, schedule, and preferences are stored locally on your device</li>
            <li><strong>Usage Statistics:</strong> We track anonymous global usage count to show how many students use our app</li>
            <li><strong>No Personal Information:</strong> We do not collect names, email addresses, or any personally identifiable information</li>
          </ul>
        </section>

        <section>
          <h2 className={`text-xl font-bold ${textClass} mb-3`}>2. How We Use Your Data</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Your attendance data stays on your device and is never uploaded to our servers</li>
            <li>Global usage statistics are anonymous and cannot be traced back to individual users</li>
            <li>We do not sell, trade, or share any user data with third parties</li>
          </ul>
        </section>

        <section>
          <h2 className={`text-xl font-bold ${textClass} mb-3`}>3. Data Security</h2>
          <p>Your data is stored locally using browser localStorage. We do not have access to your personal attendance records. You can clear your data anytime by:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Clicking the reset button in the app</li>
            <li>Clearing your browser cache and cookies</li>
          </ul>
        </section>

        <section>
          <h2 className={`text-xl font-bold ${textClass} mb-3`}>4. Cookies and Tracking</h2>
          <p>We do not use cookies or any tracking technologies. The app uses only localStorage for saving your preferences locally.</p>
        </section>

        <section>
          <h2 className={`text-xl font-bold ${textClass} mb-3`}>5. Third-Party Services</h2>
          <p>This app does not integrate with any third-party analytics, advertising, or tracking services.</p>
        </section>

        <section>
          <h2 className={`text-xl font-bold ${textClass} mb-3`}>6. Children's Privacy</h2>
          <p>This app is designed for college students (18+). We do not knowingly collect information from users under 18.</p>
        </section>

        <section>
          <h2 className={`text-xl font-bold ${textClass} mb-3`}>7. Changes to Privacy Policy</h2>
          <p>We may update this privacy policy from time to time. Any changes will be posted on this page with an updated date.</p>
        </section>

        <section>
          <h2 className={`text-xl font-bold ${textClass} mb-3`}>8. Contact Us</h2>
          <p>If you have questions about this privacy policy, please contact us through the Contact page.</p>
        </section>

        <div className={`mt-8 p-4 rounded-lg ${darkMode ? 'bg-blue-900/20' : 'bg-blue-50'}`}>
          <p className={`text-sm ${textClass} font-medium`}>
            ✅ Your Privacy Matters: We believe in transparency and your right to privacy. This app is built to help you, not track you.
          </p>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
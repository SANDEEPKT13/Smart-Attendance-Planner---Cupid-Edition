// src/pages/Contact.js
import React, { useState } from 'react';
import { Mail, Send, CheckCircle } from 'lucide-react';

function Contact({ darkMode }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const cardClass = darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white/80 backdrop-blur-sm border-gray-200';
  const textClass = darkMode ? 'text-gray-100' : 'text-gray-800';
  const textSecondary = darkMode ? 'text-gray-400' : 'text-gray-600';

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the email
    // For now, we'll just show a success message
    console.log('Contact form submitted:', { name, email, message });
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setEmail('');
      setMessage('');
    }, 3000);
  };

  return (
    <div className={`${cardClass} border rounded-2xl p-8 shadow-xl max-w-2xl mx-auto`}>
      <div className="flex items-center gap-3 mb-6">
        <Mail className="text-purple-500" size={32} />
        <h1 className={`text-3xl font-bold ${textClass}`}>Contact Us</h1>
      </div>

      {submitted ? (
        <div className="text-center py-12">
          <CheckCircle className="mx-auto text-green-500 mb-4" size={64} />
          <h3 className={`text-2xl font-bold ${textClass} mb-2`}>Thank You!</h3>
          <p className={textSecondary}>Your message has been sent successfully. We'll get back to you soon!</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className={`block text-sm font-medium mb-2 ${textClass}`}>Your Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className={`w-full px-4 py-3 rounded-lg border ${
                darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
              } focus:ring-2 focus:ring-purple-500 outline-none`}
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${textClass}`}>Your Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={`w-full px-4 py-3 rounded-lg border ${
                darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
              } focus:ring-2 focus:ring-purple-500 outline-none`}
              placeholder="john@example.com"
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${textClass}`}>Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows="6"
              className={`w-full px-4 py-3 rounded-lg border ${
                darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
              } focus:ring-2 focus:ring-purple-500 outline-none`}
              placeholder="Your message here..."
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <Send size={18} />
            Send Message
          </button>
        </form>
      )}

      <div className={`mt-8 p-4 rounded-lg ${darkMode ? 'bg-purple-900/20' : 'bg-purple-50'}`}>
        <h3 className={`font-bold ${textClass} mb-2`}>Direct Contact</h3>
        <p className={`text-sm ${textSecondary}`}>
          📧 Email: support@smartattendance.com<br />
          💬 For bugs, feature requests, or general inquiries
        </p>
      </div>
    </div>
  );
}

export default Contact;
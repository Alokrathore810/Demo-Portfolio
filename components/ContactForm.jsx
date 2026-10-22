'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', success: true });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      showToast('Please fill out all required fields.', false);
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      showToast(
        `Thank you, ${formData.name}! Your direct note regarding "${formData.subject || 'your inquiry'}" has been dispatched. I'll get back to you shortly at ${formData.email}.`,
        true
      );
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 900);
  };

  const showToast = (message, success) => {
    setToast({ show: true, message, success });
    setTimeout(() => {
      setToast({ show: false, message: '', success: true });
    }, 5500);
  };

  return (
    <>
      <form className="direct-note-form" id="contactForm" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-field">
            <label htmlFor="userName" className="field-label">
              <span>01</span> YOUR NAME *
            </label>
            <input
              type="text"
              id="userName"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Sarthak Sharma"
              required
              className="field-input"
            />
          </div>

          <div className="form-field">
            <label htmlFor="userEmail" className="field-label">
              <span>02</span> YOUR EMAIL *
            </label>
            <input
              type="email"
              id="userEmail"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="name@organization.com"
              required
              className="field-input"
            />
          </div>
        </div>

        <div className="form-field">
          <label htmlFor="userSubject" className="field-label">
            <span>03</span> SUBJECT / INQUIRY NATURE
          </label>
          <input
            type="text"
            id="userSubject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Architecture Consultation · Mentorship Cohort · Project Inquiry"
            className="field-input"
          />
        </div>

        <div className="form-field">
          <label htmlFor="userMessage" className="field-label">
            <span>04</span> DIRECT NOTE / SCOPE
          </label>
          <textarea
            id="userMessage"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            placeholder="Brief overview of what you're building, timeline, or curriculum requirements..."
            className="field-input field-textarea"
          />
        </div>

        <div className="form-actions-row">
          <button
            type="submit"
            className="btn-submit-note"
            id="contactSubmitBtn"
            disabled={loading}
          >
            <span>{loading ? 'Sending...' : 'DISPATCH DIRECT NOTE'}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={loading ? 'spin' : ''}
            >
              <line x1="7" y1="17" x2="17" y2="7"></line>
              <polyline points="7 7 17 7 17 17"></polyline>
            </svg>
          </button>

          <span className="form-privacy-note">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
            Direct transmission to eralokrathod@gmail.com
          </span>
        </div>
      </form>

      {/* Floating Status Toast */}
      <div
        className={`form-toast ${toast.show ? 'active' : ''} ${!toast.success ? 'error' : ''}`}
        id="formToast"
        role="status"
        aria-live="polite"
      >
        <span className="toast-dot"></span>
        <span id="toastMessage">{toast.message}</span>
      </div>
    </>
  );
}

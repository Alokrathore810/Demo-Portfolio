'use client';

import { useState } from 'react';

const disciplines = [
  {
    id: 'build',
    idx: '01',
    title: 'BUILD — Full-Stack & Frontend Architecture',
    body: 'Building responsive, accessible web architectures using React.js, Next.js, and Node.js. Translating intricate business requirements into smooth, zero-latency user experiences.',
    tags: ['React.js', 'Node.js', 'MongoDB', 'Tailwind / Vanilla CSS', 'REST APIs'],
  },
  {
    id: 'teach',
    idx: '02',
    title: 'TEACH — Engineering Mentorship @ Kurukshetra',
    body: 'Transforming complex engineering concepts into accessible, hands-on lessons. Trained over 150+ students in Bhopal through live pair programming, architectural breakdowns, and capstone project reviews.',
    tags: ['Curriculum Design', '1-on-1 Mentorship', 'Live Labs', 'Code Reviews'],
  },
  {
    id: 'architect',
    idx: '03',
    title: 'ARCHITECT — Regional Digital Infrastructure',
    body: 'Developing high-impact platforms tailored for regional needs — including exam simulation portals like CPCT Mock Test and state-level deployment platforms for Indian learners.',
    tags: ['State Machine Design', 'Performance Tuning', 'WCAG Accessibility'],
  },
];

export default function DisciplineTabs() {
  const [activeTab, setActiveTab] = useState('build');

  return (
    <div className="disciplines-accordion">
      {disciplines.map((item) => (
        <div
          key={item.id}
          className={`discipline-card ${activeTab === item.id ? 'active' : ''}`}
          data-tab={item.id}
          onClick={() => setActiveTab(item.id)}
        >
          <div className="discipline-header">
            <span className="discipline-idx">{item.idx}</span>
            <h3 className="discipline-title">{item.title}</h3>
            <span className="discipline-icon" aria-hidden="true">
              ↗
            </span>
          </div>
          <div className="discipline-content">
            <p>{item.body}</p>
            <div className="discipline-tags">
              {item.tags.map((tag) => (
                <span key={tag} className="d-tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

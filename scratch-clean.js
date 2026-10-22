const fs = require('fs');
const path = require('path');

// 1. Process index.html
const htmlPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(htmlPath, 'utf8');

// Update narrative
html = html.replace(
  /Since founding Kurukshetra Coding School alongside co-founder Vikash Rathod, we set out to/g,
  'Since founding Kurukshetra Coding School, I set out to'
);

// Remove leadership section
const leaderHtmlStart = html.indexOf('<!-- Leadership Profiles: Alok & Vikash');
if (leaderHtmlStart !== -1) {
  const leaderHtmlEnd = html.indexOf('<!-- ========================================================================\n         SECTION 05: THE TIMELINE', leaderHtmlStart);
  if (leaderHtmlEnd !== -1) {
    // Find the closing </div>\n    </section> before timeline
    const sectionCloseStr = '      </div>\n    </section>';
    // We want to remove from leaderHtmlStart up to right before sectionCloseStr
    const closeIdx = html.lastIndexOf('      </div>\n    </section>', leaderHtmlEnd);
    if (closeIdx !== -1 && closeIdx > leaderHtmlStart) {
      html = html.substring(0, leaderHtmlStart) + html.substring(closeIdx);
      console.log('Successfully removed leadership section from index.html');
    }
  } else {
    // Try with CRLF
    const leaderHtmlEndCRLF = html.indexOf('<!-- ========================================================================\r\n         SECTION 05: THE TIMELINE', leaderHtmlStart);
    if (leaderHtmlEndCRLF !== -1) {
      const closeIdx = html.lastIndexOf('      </div>\r\n    </section>', leaderHtmlEndCRLF);
      if (closeIdx !== -1 && closeIdx > leaderHtmlStart) {
        html = html.substring(0, leaderHtmlStart) + html.substring(closeIdx);
        console.log('Successfully removed leadership section from index.html (CRLF)');
      }
    }
  }
}
fs.writeFileSync(htmlPath, html, 'utf8');

// 2. Process app/page.jsx
const jsxPath = path.join(__dirname, 'app', 'page.jsx');
let jsx = fs.readFileSync(jsxPath, 'utf8');

// Update narrative
jsx = jsx.replace(
  /Since founding Kurukshetra Coding School alongside co-founder Vikash Rathod, we set out to/g,
  'Since founding Kurukshetra Coding School, I set out to'
);

// Remove leadership section
const leaderJsxStart = jsx.indexOf('<div className="leadership-section" id="leadership">');
if (leaderJsxStart !== -1) {
  const timelineStart = jsx.indexOf('<section className="editorial-section" id="timeline">', leaderJsxStart);
  if (timelineStart !== -1) {
    // Look for section close before timelineStart
    let closeIdx = jsx.lastIndexOf('      </div>\n    </section>', timelineStart);
    if (closeIdx === -1) {
      closeIdx = jsx.lastIndexOf('      </div>\r\n    </section>', timelineStart);
    }
    if (closeIdx !== -1 && closeIdx > leaderJsxStart) {
      jsx = jsx.substring(0, leaderJsxStart) + jsx.substring(closeIdx);
      console.log('Successfully removed leadership section from app/page.jsx');
    }
  }
}
fs.writeFileSync(jsxPath, jsx, 'utf8');

console.log('Done processing.');

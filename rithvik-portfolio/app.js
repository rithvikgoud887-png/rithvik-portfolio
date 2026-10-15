/**
 * R.E. Rithvik - Developer Portfolio Application Logic
 * Interactive Particle Canvas, Typewriter, Heuristic Phishing Scanner,
 * Dynamic LMS Portal Simulator, Modal System, & Clipboard Management.
 */

document.addEventListener('DOMContentLoaded', () => {
  initBackgroundCanvas();
  initTypewriter();
  initNavbar();
  initSkillsFilter();
  initPhishingDetector();
  initLMSDemo();
  initModals();
  initClipboardAndContact();
  initThemeToggle();
  initQuickPings();
  updateFooterYear();
});

/* ==========================================================================
   1. Interactive Particle Network Canvas
   ========================================================================== */
function initBackgroundCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = Math.min(Math.floor((width * height) / 18000), 65);

  const mouse = { x: null, y: null, radius: 140 };

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.7;
      this.vy = (Math.random() - 0.5) * 0.7;
      this.radius = Math.random() * 2 + 1;
      this.baseColor = Math.random() > 0.5 ? '0, 242, 254' : '139, 92, 246';
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Mouse interaction
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.hypot(dx, dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          const angle = Math.atan2(dy, dx);
          this.x -= Math.cos(angle) * force * 2.5;
          this.y -= Math.sin(angle) * force * 2.5;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.baseColor}, 0.65)`;
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Draw connecting lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.hypot(dx, dy);

        if (dist < 120) {
          const alpha = 1 - dist / 120;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0, 242, 254, ${alpha * 0.18})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    particles.forEach((p) => {
      p.update();
      p.draw();
    });

    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   2. Typewriter Effect
   ========================================================================== */
function initTypewriter() {
  const el = document.getElementById('typewriter');
  if (!el) return;

  const phrases = [
    'Python & Web Development',
    'AI & Machine Learning Foundations',
    'Interactive Rule-Based Systems',
    'SQL & Relational Databases',
    'Practical Project Engineering'
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let delay = 120;

  function type() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      el.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      delay = 50;
    } else {
      el.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      delay = 100;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      delay = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      delay = 500;
    }

    setTimeout(type, delay);
  }

  type();
}

/* ==========================================================================
   3. Navbar Scroll & Mobile Navigation
   ========================================================================== */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    highlightActiveNavLink();
  });

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
      const isOpen = mobileMenu.classList.contains('open');
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    mobileLinks.forEach((link) => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
      });
    });
  }

  function highlightActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 120;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      const navLink = document.querySelector(`.nav-link[href="#${id}"]`);

      if (navLink) {
        if (scrollPos >= top && scrollPos < top + height) {
          navLink.classList.add('active');
        } else {
          navLink.classList.remove('active');
        }
      }
    });
  }

  // Smooth scroll helper for demo links
  document.querySelectorAll('.scroll-to-demo').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const target = btn.dataset.target;
      const targetTab = document.getElementById(`tab-btn-${target}`);
      if (targetTab) {
        targetTab.click();
      }
      const section = document.getElementById('live-demos');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

/* ==========================================================================
   4. Skills Filter Matrix
   ========================================================================== */
function initSkillsFilter() {
  const tabs = document.querySelectorAll('.filter-tab');
  const cards = document.querySelectorAll('.skill-card');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.dataset.filter;

      cards.forEach((card) => {
        const categories = card.dataset.category ? card.dataset.category.split(' ') : [];
        if (filter === 'all' || categories.includes(filter)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* ==========================================================================
   5. Interactive Project 1: Phishing Website Detector
   ========================================================================== */
function initPhishingDetector() {
  const urlInput = document.getElementById('phish-url-input');
  const scanBtn = document.getElementById('btn-scan-url');
  const spinner = document.getElementById('scan-spinner');
  const threatBadge = document.getElementById('threat-badge');
  const scannedUrlTxt = document.getElementById('scanned-url-txt');
  const gaugeBar = document.getElementById('gauge-bar');
  const riskScoreVal = document.getElementById('risk-score-val');
  const diagnosticsList = document.getElementById('diagnostics-list');
  const recText = document.getElementById('rec-text');
  const presetBtns = document.querySelectorAll('.preset-btn');

  if (!urlInput || !scanBtn) return;

  // Preset quick buttons
  presetBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      urlInput.value = btn.dataset.url;
      analyzeUrl(btn.dataset.url);
    });
  });

  scanBtn.addEventListener('click', () => {
    analyzeUrl(urlInput.value.trim());
  });

  urlInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      analyzeUrl(urlInput.value.trim());
    }
  });

  function analyzeUrl(rawUrl) {
    if (!rawUrl) {
      showToast('Please enter a URL to inspect.');
      return;
    }

    // Ensure scheme for URL constructor parsing
    let parsedUrl = rawUrl;
    if (!/^https?:\/\//i.test(parsedUrl)) {
      parsedUrl = 'http://' + parsedUrl;
    }

    scanBtn.disabled = true;
    spinner.style.display = 'inline-block';
    scannedUrlTxt.textContent = rawUrl;

    setTimeout(() => {
      scanBtn.disabled = false;
      spinner.style.display = 'none';

      let score = 0;
      const diagnostics = [];

      let urlObj;
      try {
        urlObj = new URL(parsedUrl);
      } catch (e) {
        urlObj = { hostname: rawUrl, pathname: '', protocol: 'unknown' };
      }

      const hostname = (urlObj.hostname || '').toLowerCase();
      const pathname = (urlObj.pathname || '').toLowerCase();
      const fullUrl = rawUrl.toLowerCase();

      // Rule 1: Protocol Security Check
      const isHttps = /^https:\/\//i.test(rawUrl);
      if (isHttps) {
        diagnostics.push({
          title: 'Encryption & Protocol',
          status: 'pass',
          icon: '✅',
          desc: 'URL uses secure HTTPS encryption standard.'
        });
      } else {
        score += 30;
        diagnostics.push({
          title: 'Encryption & Protocol',
          status: 'fail',
          icon: '🚨',
          desc: 'Unencrypted HTTP protocol detected. Sensitive credentials can be intercepted.'
        });
      }

      // Rule 2: IP Address in Hostname
      const ipPattern = /^(\d{1,3}\.){3}\d{1,3}$/;
      const hasIpHost = ipPattern.test(hostname);
      if (hasIpHost) {
        score += 45;
        diagnostics.push({
          title: 'Hostname Format',
          status: 'fail',
          icon: '❌',
          desc: 'Raw IP address used instead of a registered domain. Characteristic of phishing servers.'
        });
      } else {
        diagnostics.push({
          title: 'Hostname Format',
          status: 'pass',
          icon: '✅',
          desc: 'Legitimate named domain structure verified.'
        });
      }

      // Rule 3: High-Risk TLD (Top-Level Domain)
      const suspiciousTLDs = ['.xyz', '.tk', '.top', '.cf', '.ga', '.ml', '.gq', '.loan', '.work', '.click', '.fit', '.rest'];
      const foundTld = suspiciousTLDs.find((tld) => hostname.endsWith(tld));
      if (foundTld) {
        score += 35;
        diagnostics.push({
          title: 'Domain Extension (TLD)',
          status: 'warn',
          icon: '⚠️',
          desc: `High-risk TLD (${foundTld}) commonly utilized by throwaway malicious registrations.`
        });
      } else {
        diagnostics.push({
          title: 'Domain Extension (TLD)',
          status: 'pass',
          icon: '✅',
          desc: 'Standard commercial or institutional top-level domain.'
        });
      }

      // Rule 4: Misleading Brand Impersonation in Subdomains
      const brandKeywords = ['paypal', 'bank', 'login', 'account', 'verify', 'appleid', 'security', 'signin', 'wallet', 'crypto'];
      const hasBrandKeyword = brandKeywords.some((kw) => hostname.includes(kw) && !hostname.endsWith(kw + '.com'));
      if (hasBrandKeyword) {
        score += 35;
        diagnostics.push({
          title: 'Domain Impersonation',
          status: 'fail',
          icon: '🚨',
          desc: 'Sensitive brand keyword detected in subdomain or spoofed context.'
        });
      } else {
        diagnostics.push({
          title: 'Domain Authenticity',
          status: 'pass',
          icon: '✅',
          desc: 'No deceptive brand spoofing or nested subdomain tricks found.'
        });
      }

      // Rule 5: Suspicious Symbols & Length
      const hasAtSymbol = fullUrl.includes('@');
      const hyphenCount = (hostname.match(/-/g) || []).length;
      const isExcessiveLength = fullUrl.length > 70;

      if (hasAtSymbol || hyphenCount > 2 || isExcessiveLength) {
        score += 25;
        diagnostics.push({
          title: 'URL Structure Anomalies',
          status: 'warn',
          icon: '⚠️',
          desc: `Structural red flags: ${hasAtSymbol ? '@ symbol used (URL masking), ' : ''}${hyphenCount > 2 ? 'excessive domain hyphens, ' : ''}${isExcessiveLength ? 'abnormal length.' : ''}`
        });
      } else {
        diagnostics.push({
          title: 'URL Structure Integrity',
          status: 'pass',
          icon: '✅',
          desc: 'Clean URL path without misleading redirection characters.'
        });
      }

      // Cap score at 100
      score = Math.min(score, 100);

      // Render Results
      updateThreatUI(score, diagnostics);
    }, 400);
  }

  function updateThreatUI(score, diagnostics) {
    riskScoreVal.textContent = `${score} / 100`;
    gaugeBar.style.width = `${Math.max(score, 5)}%`;

    threatBadge.className = 'threat-badge';

    if (score < 25) {
      threatBadge.classList.add('badge-safe');
      threatBadge.textContent = 'Safe / Legitimate';
      gaugeBar.style.backgroundColor = '#10b981';
      recText.textContent = 'The analyzed URL follows standard encryption, legitimate domain hierarchy, and clean structure. Proceed safely.';
    } else if (score < 55) {
      threatBadge.classList.add('badge-suspicious');
      threatBadge.textContent = 'Suspicious / Caution Advised';
      gaugeBar.style.backgroundColor = '#f59e0b';
      recText.textContent = 'Caution: Unusual domain extensions or structural anomalies detected. Avoid submitting credentials without independent verification.';
    } else {
      threatBadge.classList.add('badge-danger');
      threatBadge.textContent = 'Critical Phishing Threat';
      gaugeBar.style.backgroundColor = '#f43f5e';
      recText.textContent = 'Warning: Severe indicators of phishing or spoofing detected (unencrypted HTTP, brand deception, or raw IP). Do NOT enter personal info.';
    }

    // Render Diagnostics Grid
    diagnosticsList.innerHTML = diagnostics
      .map(
        (d) => `
      <div class="diag-item">
        <span class="diag-icon">${d.icon}</span>
        <div class="diag-info">
          <h5>${d.title}</h5>
          <p>${d.desc}</p>
        </div>
      </div>
    `
      )
      .join('');
  }

  // Run initial test case on load
  analyzeUrl('https://github.com/rithvikgoud887-png');
}

/* ==========================================================================
   6. Interactive Project 2: LMS Portal Simulator
   ========================================================================== */
function initLMSDemo() {
  const tabBtnPhish = document.getElementById('tab-btn-phish');
  const tabBtnLms = document.getElementById('tab-btn-lms');
  const demoPhish = document.getElementById('demo-phish');
  const demoLms = document.getElementById('demo-lms');

  const roleStudentBtn = document.getElementById('role-student-btn');
  const roleTeacherBtn = document.getElementById('role-teacher-btn');
  const studentView = document.getElementById('lms-student-view');
  const teacherView = document.getElementById('lms-teacher-view');

  const courseSelect = document.getElementById('sub-course-select');
  const titleInput = document.getElementById('sub-title-input');
  const submitBtn = document.getElementById('btn-submit-assignment');
  const submissionLog = document.getElementById('submission-log');

  const announceForm = document.getElementById('announcement-form');
  const announceTitle = document.getElementById('announce-title');
  const announceBody = document.getElementById('announce-body');
  const announceBtn = document.getElementById('btn-post-announcement');
  const announceFeed = document.getElementById('announcement-feed');

  // Tab switching between Phishing Detector and LMS
  if (tabBtnPhish && tabBtnLms) {
    tabBtnPhish.addEventListener('click', () => {
      tabBtnPhish.classList.add('active');
      tabBtnLms.classList.remove('active');
      demoPhish.classList.add('active');
      demoLms.classList.remove('active');
    });

    tabBtnLms.addEventListener('click', () => {
      tabBtnLms.classList.add('active');
      tabBtnPhish.classList.remove('active');
      demoLms.classList.add('active');
      demoPhish.classList.remove('active');
    });
  }

  // Role switching (Student vs Teacher)
  if (roleStudentBtn && roleTeacherBtn) {
    roleStudentBtn.addEventListener('click', () => {
      roleStudentBtn.classList.add('active');
      roleTeacherBtn.classList.remove('active');
      studentView.style.display = 'block';
      teacherView.style.display = 'none';
      showToast('Switched to Student Dashboard View');
    });

    roleTeacherBtn.addEventListener('click', () => {
      roleTeacherBtn.classList.add('active');
      roleStudentBtn.classList.remove('active');
      studentView.style.display = 'none';
      teacherView.style.display = 'block';
      showToast('Switched to Teacher / Faculty Portal');
    });
  }

  // Quick assignment trigger from course cards
  document.querySelectorAll('.submit-trigger-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const course = btn.dataset.course;
      if (courseSelect) {
        for (let i = 0; i < courseSelect.options.length; i++) {
          if (courseSelect.options[i].text.includes(course)) {
            courseSelect.selectedIndex = i;
            break;
          }
        }
      }
      if (titleInput) {
        titleInput.focus();
        titleInput.value = `${course} - Module Lab Task`;
      }
      showToast(`Selected ${course}. Ready for assignment submission!`);
    });
  });

  // Assignment Submission Handling
  if (submitBtn) {
    submitBtn.addEventListener('click', () => {
      const course = courseSelect ? courseSelect.value : 'Selected Course';
      const title = titleInput ? titleInput.value.trim() : '';

      if (!title) {
        showToast('Please enter an assignment title before submitting.');
        if (titleInput) titleInput.focus();
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = 'Verifying...';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit Work';
        titleInput.value = '';

        const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        submissionLog.innerHTML = `
          <div class="submission-item">
            <span>🎉</span>
            <div>
              <strong>Successfully Submitted:</strong> "${title}" for <em>${course}</em>
              <br><small style="color: var(--text-muted)">Verified receipt logged at ${now}. Pending evaluation.</small>
            </div>
          </div>
        `;
        showToast(`Assignment "${title}" submitted to ${course}!`);
      }, 500);
    });
  }

  // Teacher Grade Review
  document.querySelectorAll('.update-grade-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const name = btn.dataset.name;
      const newGrade = prompt(`Enter evaluation score for ${name} (scale 1-10):`, '9.4');
      if (newGrade !== null && newGrade.trim() !== '') {
        const row = btn.closest('tr');
        const gradePill = row.querySelector('.grade-pill');
        if (gradePill) {
          gradePill.textContent = `${newGrade.trim()} / 10`;
          showToast(`Grade updated for ${name}: ${newGrade}/10`);
        }
      }
    });
  });

  // Announcement Broadcasting
  if (announceBtn) {
    announceBtn.addEventListener('click', () => {
      const title = announceTitle ? announceTitle.value.trim() : '';
      const body = announceBody ? announceBody.value.trim() : '';

      if (!title || !body) {
        showToast('Please provide both title and announcement details.');
        return;
      }

      const item = document.createElement('div');
      item.className = 'notice-item';
      item.innerHTML = `
        <span class="notice-date">Just Now</span>
        <strong>${escapeHtml(title)}:</strong> ${escapeHtml(body)}
      `;

      announceFeed.prepend(item);
      announceTitle.value = '';
      announceBody.value = '';
      showToast('Announcement broadcasted to enrolled students!');
    });
  }
}

/* ==========================================================================
   7. Modal System (Resume & Architectural Specifications)
   ========================================================================== */
function initModals() {
  const resumeModal = document.getElementById('resume-modal');
  const openResumeBtn = document.getElementById('open-resume-btn');
  const mobileResumeBtn = document.getElementById('mobile-resume-btn');
  const contactResumeBtn = document.getElementById('contact-view-resume-btn');
  const closeResumeBtn = document.getElementById('btn-close-resume');
  const printResumeBtn = document.getElementById('btn-print-resume');

  const specModal = document.getElementById('spec-modal');
  const specModalTitle = document.getElementById('spec-modal-title');
  const specModalBody = document.getElementById('spec-modal-body');
  const closeSpecBtn = document.getElementById('btn-close-spec');

  function openResume() {
    if (resumeModal) {
      resumeModal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeResume() {
    if (resumeModal) {
      resumeModal.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  [openResumeBtn, mobileResumeBtn, contactResumeBtn].forEach((btn) => {
    if (btn) btn.addEventListener('click', openResume);
  });

  if (closeResumeBtn) closeResumeBtn.addEventListener('click', closeResume);

  if (printResumeBtn) {
    printResumeBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // Spec Info Modals for Projects
  const specData = {
    'phish-spec': {
      title: 'Phishing Website Detector — Architecture & Heuristics',
      body: `
        <div class="spec-content">
          <h4>Core Engineering Objectives</h4>
          <p>Phishing attacks continue to cause critical credential theft. This application was architected to give instant, transparent feedback on URL integrity using multi-rule heuristic verification in client-side JavaScript.</p>
          
          <h4>Rule Engine Breakdown</h4>
          <ul>
            <li><strong>Protocol Enforcement:</strong> Analyzes encryption scheme (HTTPS vs plaintext HTTP) to catch vulnerable transport channels.</li>
            <li><strong>IP Address Detection:</strong> Parses domain format against IPv4 quad-octets to flag hostnames bypassing DNS registration.</li>
            <li><strong>Brand Impersonation Checks:</strong> Examines subdomain nesting for fraudulent target keywords (e.g. <code>paypal</code>, <code>bank</code>, <code>login</code>, <code>verify</code>).</li>
            <li><strong>TLD Reputation Matrix:</strong> Evaluates top-level domain risk profile against known high-frequency scam TLDs (e.g. <code>.tk</code>, <code>.xyz</code>, <code>.top</code>).</li>
            <li><strong>Obfuscation Detection:</strong> Detects user-credential masking symbols (<code>@</code>) and excessive subdomain hyphenation.</li>
          </ul>

          <h4>Tech Stack & UX Principles</h4>
          <p>Built with lightweight HTML5 semantic inputs, responsive CSS3 cards, and vanilla JavaScript. Client-side input validation provides immediate risk metrics without requiring external server dependencies.</p>
        </div>
      `
    },
    'lms-spec': {
      title: 'Learning Management System (LMS) — System Architecture',
      body: `
        <div class="spec-content">
          <h4>Core Engineering Objectives</h4>
          <p>Academic institutions require streamlined separation between student learning workflows and faculty administrative tasks. The LMS provides dedicated, role-tailored interfaces built for responsive accessibility.</p>
          
          <h4>Key Architectural Components</h4>
          <ul>
            <li><strong>Role-Based Navigation:</strong> Distinct state handling between Student and Teacher portals, showing context-specific controls.</li>
            <li><strong>Course Progress & Attendance Tracker:</strong> Visual metrics and progress rings representing semester standing and lecture attendance.</li>
            <li><strong>Dynamic Assignment Submissions:</strong> Interactive client-side forms with immediate receipt logging and status feedback.</li>
            <li><strong>Teacher Ledger & Announcement Dispatch:</strong> Grade recording system and instantaneous notification broadcast engine.</li>
          </ul>

          <h4>Design & Frontend Philosophy</h4>
          <p>Clean academic layout designed to minimize visual clutter, keeping course codes, professor references, and upcoming submission deadlines in sharp focus.</p>
        </div>
      `
    }
  };

  document.querySelectorAll('.view-spec-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const modalKey = btn.dataset.modal;
      const data = specData[modalKey];
      if (data && specModal) {
        specModalTitle.textContent = data.title;
        specModalBody.innerHTML = data.body;
        specModal.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (closeSpecBtn) {
    closeSpecBtn.addEventListener('click', () => {
      if (specModal) {
        specModal.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  // Close modals on clicking overlay backdrop
  [resumeModal, specModal].forEach((modal) => {
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.remove('open');
          document.body.style.overflow = '';
        }
      });
    }
  });

  // Close modals with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (resumeModal) resumeModal.classList.remove('open');
      if (specModal) specModal.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
}

/* ==========================================================================
   8. Clipboard Copy & Contact Form Handling
   ========================================================================== */
function initClipboardAndContact() {
  document.querySelectorAll('.copyable').forEach((item) => {
    item.addEventListener('click', () => {
      const textToCopy = item.dataset.copy;
      if (textToCopy) {
        navigator.clipboard
          .writeText(textToCopy)
          .then(() => {
            showToast(`Copied to clipboard: ${textToCopy}`);
          })
          .catch(() => {
            showToast(`Selected: ${textToCopy}`);
          });
      }
    });
  });

  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contact-name').value.trim();
      const email = document.getElementById('contact-email').value.trim();
      const subject = document.getElementById('contact-subject').value.trim() || 'Portfolio Inquiry';
      const message = document.getElementById('contact-message').value.trim();

      const btn = document.getElementById('btn-submit-contact');
      btn.disabled = true;
      btn.innerHTML = 'Sending Message...';

      setTimeout(() => {
        btn.disabled = false;
        btn.innerHTML = `
          <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
          Send Message
        `;

        showToast(`Thank you, ${name}! Preparing email to rithvikgoud887@gmail.com...`);
        contactForm.reset();

        // Open mailto link
        const mailtoUrl = `mailto:rithvikgoud887@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
          `Hi Rithvik,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
        )}`;
        window.location.href = mailtoUrl;
      }, 600);
    });
  }
}

/* ==========================================================================
   9. Theme Toggle (Dark & Light Mode)
   ========================================================================== */
function initThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle');
  if (!toggleBtn) return;

  const savedTheme = localStorage.getItem('rithvik_portfolio_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);

  toggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('rithvik_portfolio_theme', newTheme);
    showToast(`Switched to ${newTheme === 'dark' ? 'Dark' : 'Light'} theme`);
  });
}

/* ==========================================================================
   10. Micro-Interactions & Quick Ping
   ========================================================================== */
function initQuickPings() {
  const pingBtn = document.getElementById('ping-developer');
  if (pingBtn) {
    pingBtn.addEventListener('click', () => {
      showToast('👋 Hello from Rithvik! Feel free to connect below.');
      pingBtn.textContent = '✨ Connected';
      setTimeout(() => {
        pingBtn.textContent = '👋 Say Hi';
      }, 2500);
    });
  }
}

/* ==========================================================================
   11. Toast Notification Utility
   ========================================================================== */
function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <span style="color: var(--cyan-primary);">⚡</span>
    <span>${escapeHtml(message)}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3200);
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function updateFooterYear() {
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

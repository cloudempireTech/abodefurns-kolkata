/**
 * ABODEFURNS — THE FURNITURE COMPANY
 * Modern Interactive Engine & Animation Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Drawer Toggle
  const hamburger = document.querySelector('.hamburger-btn');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const isOpen = navLinks.classList.contains('open');
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking outside or on a link
    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('open');
      }
    });
  }

  // 2. Character-by-Character Dynamic Typewriter Effect
  const typewriterEl = document.querySelector('.dynamic-typewriter');
  if (typewriterEl) {
    const phrases = [
      "Luxury Sectional Sofas",
      "Smart Hydraulic Storage Beds",
      "Italian Marble Dining Sets",
      "Bespoke Architectural Millwork",
      "Factory-Direct Masterpieces"
    ];
    let phraseIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeLoop() {
      const currentPhrase = phrases[phraseIdx];
      if (isDeleting) {
        typewriterEl.textContent = currentPhrase.substring(0, charIdx - 1);
        charIdx--;
        typingSpeed = 50;
      } else {
        typewriterEl.textContent = currentPhrase.substring(0, charIdx + 1);
        charIdx++;
        typingSpeed = 90;
      }

      if (!isDeleting && charIdx === currentPhrase.length) {
        typingSpeed = 2000; // Pause at end
        isDeleting = true;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        typingSpeed = 500; // Pause before typing new phrase
      }

      setTimeout(typeLoop, typingSpeed);
    }
    typeLoop();
  }

  // 3. Video Play/Pause Toggle
  const heroVideo = document.querySelector('.hero-video-bg');
  const videoCtrl = document.querySelector('.video-control-btn');
  if (heroVideo && videoCtrl) {
    videoCtrl.addEventListener('click', () => {
      if (heroVideo.paused) {
        heroVideo.play();
        videoCtrl.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>';
      } else {
        heroVideo.pause();
        videoCtrl.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>';
      }
    });
  }

  // 4. Interactive Room Estimator & Value Calculator (Zero E-Commerce)
  const roomType = document.getElementById('calc-room-type');
  const woodFinish = document.getElementById('calc-wood-finish');
  const roomArea = document.getElementById('calc-area-range');
  const areaVal = document.getElementById('calc-area-val');
  const estOutput = document.getElementById('calc-est-output');
  const leadTimeOutput = document.getElementById('calc-leadtime-output');

  if (roomType && woodFinish && roomArea && estOutput) {
    function updateEstimator() {
      const type = roomType.value;
      const finish = woodFinish.value;
      const area = parseInt(roomArea.value, 10);
      areaVal.textContent = `${area} sq.ft`;

      let basePieces = 3;
      let craftWeeks = 2;
      let suiteName = "Essential Living Suite";

      if (type === 'living') {
        basePieces = Math.round(area / 60);
        craftWeeks = finish === 'teak' ? 3 : 2;
        suiteName = `${basePieces}-Piece Luxury Sectional & Lounge Suite`;
      } else if (type === 'bedroom') {
        basePieces = Math.round(area / 70) + 1;
        craftWeeks = 3;
        suiteName = `Mimosa Hydraulic Bed & ${basePieces}-Piece Bedroom Suite`;
      } else if (type === 'dining') {
        basePieces = 6;
        craftWeeks = finish === 'marble' ? 4 : 2;
        suiteName = `Italian Marble 6-Seater Dining & Buffet Suite`;
      } else {
        basePieces = Math.round(area / 50);
        craftWeeks = 4;
        suiteName = `Full Architectural Millwork & Custom Furniture Suite`;
      }

      estOutput.textContent = suiteName;
      if (leadTimeOutput) {
        leadTimeOutput.textContent = `${craftWeeks}–${craftWeeks + 1} Weeks Handcrafted Production`;
      }
    }

    roomType.addEventListener('change', updateEstimator);
    woodFinish.addEventListener('change', updateEstimator);
    roomArea.addEventListener('input', updateEstimator);
    updateEstimator();
  }

  // 5. WhatsApp Form Inquiry Dispatcher
  const contactForm = document.getElementById('inquiry-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('inq-name')?.value || 'Guest';
      const phone = document.getElementById('inq-phone')?.value || 'Not provided';
      const interest = document.getElementById('inq-interest')?.value || 'Custom Furniture';
      const message = document.getElementById('inq-msg')?.value || 'Inquiry from AbodeFurns website';

      const pitchText = `*Namaste AbodeFurns!* 🛋️✨\n\nI am contacting you from your official website:\n\n👤 *Client Name:* ${name}\n📞 *Contact Phone:* ${phone}\n🪑 *Interest Area:* ${interest}\n💬 *Inquiry Details:* ${message}\n\nPlease share your current showroom catalogue and pricing details.`;

      const waUrl = `https://wa.me/917003923980?text=${encodeURIComponent(pitchText)}`;
      window.open(waUrl, '_blank');
    });
  }

  // 6. Portfolio Category Filter
  const filterBtns = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');

  if (filterBtns.length > 0 && productCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');

        productCards.forEach(card => {
          if (filter === 'all' || card.getAttribute('data-category') === filter) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });

        // Smooth scroll filter into view on mobile
        btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      });
    });
  }

  // 7. Scroll-Triggered Animations via IntersectionObserver
  const animatedEls = document.querySelectorAll('.bento-card, .product-card, .review-card, .telemetry-card');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    animatedEls.forEach(el => observer.observe(el));
  }
});

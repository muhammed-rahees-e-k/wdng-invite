/**
 * Arshad & Athika - Multi-Stage Interactive Wedding Invitation Logic
 */

document.addEventListener('DOMContentLoaded', () => {

  const body = document.body;

  // ==========================================
  // 1. MULTI-STAGE NAVIGATION FLOW WITH VISUAL LOADER
  // ==========================================
  const btnTapOpen = document.getElementById('btnTapOpen');
  const btnEnterInvitation = document.getElementById('btnEnterInvitation');
  const pageLoader = document.getElementById('pageLoader');

  function triggerPageLoader(callback) {
    if (pageLoader) {
      pageLoader.classList.add('active');
      setTimeout(() => {
        if (callback) callback();
        setTimeout(() => {
          pageLoader.classList.remove('active');
        }, 350);
      }, 550);
    } else {
      if (callback) callback();
    }
  }

  // Stage 1 -> Stage 2 (Tap to Open -> Bismillah Page)
  if (btnTapOpen) {
    btnTapOpen.addEventListener('click', () => {
      playOpeningTone();
      triggerPageLoader(() => {
        body.classList.remove('flow-cover');
        body.classList.add('flow-bismillah');
      });
    });
  }

  // 3D Card Tilt Effect on Cover
  const coverCard = document.querySelector('.cover-card');
  const coverOverlay = document.querySelector('.cover-overlay');

  if (coverCard && coverOverlay) {
    coverOverlay.addEventListener('mousemove', (e) => {
      const rect = coverOverlay.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      coverCard.style.transform = `rotateY(${x * 12}deg) rotateX(${-y * 12}deg)`;
    });

    coverOverlay.addEventListener('mouseleave', () => {
      coverCard.style.transform = `rotateY(0deg) rotateX(0deg)`;
    });
  }

  // Stage 2 -> Stage 3 (Bismillah Page -> Main Invitation)
  if (btnEnterInvitation) {
    btnEnterInvitation.addEventListener('click', () => {
      triggerPageLoader(() => {
        body.classList.remove('flow-bismillah');
        body.classList.add('flow-invitation');
        setTimeout(() => {
          handleScrollAnimation();
        }, 200);
      });
    });
  }

  // Audio opening chime tone
  function playOpeningTone() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      osc.frequency.exponentialRampToValueAtTime(659.25, ctx.currentTime + 0.4); // E5
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.6);
    } catch(e) {}
  }

  // ==========================================
  // 2. SCROLL REVEAL ANIMATION OBSERVER
  // ==========================================
  const scrollElements = document.querySelectorAll('.scroll-reveal');

  const elementInViewport = (el, dividend = 1.2) => {
    const elementTop = el.getBoundingClientRect().top;
    return (elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend);
  };

  const displayScrollElement = (element) => {
    element.classList.add('visible');
  };

  const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
      if (elementInViewport(el, 1.05)) {
        displayScrollElement(el);
      }
    });
  };

  window.addEventListener('scroll', handleScrollAnimation);

  // ==========================================
  // 3. DESKTOP VIEW MODE SWITCHER
  // ==========================================
  const btnTriptych = document.getElementById('btnTriptych');
  const btnPhone = document.getElementById('btnPhone');
  const btnResponsive = document.getElementById('btnResponsive');

  if (btnTriptych && btnPhone && btnResponsive) {
    btnTriptych.addEventListener('click', () => {
      body.className = 'flow-invitation mode-triptych';
      setActiveModeBtn(btnTriptych);
      handleScrollAnimation();
    });

    btnPhone.addEventListener('click', () => {
      body.className = 'flow-invitation mode-phone';
      setActiveModeBtn(btnPhone);
      handleScrollAnimation();
    });

    btnResponsive.addEventListener('click', () => {
      body.className = 'flow-invitation mode-responsive';
      setActiveModeBtn(btnResponsive);
      handleScrollAnimation();
    });
  }

  function setActiveModeBtn(activeBtn) {
    [btnTriptych, btnPhone, btnResponsive].forEach(btn => btn.classList.remove('active'));
    activeBtn.classList.add('active');
  }

  // ==========================================
  // 4. LIVE COUNTDOWN TIMER (Oct 18, 2026 17:00)
  // ==========================================
  const countDays = document.getElementById('countDays');
  const countHours = document.getElementById('countHours');
  const countMins = document.getElementById('countMins');
  const countSecs = document.getElementById('countSecs');

  const weddingDate = new Date('2026-10-18T17:00:00').getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    let distance = weddingDate - now;

    if (distance < 0) {
      countDays.textContent = '00';
      countHours.textContent = '00';
      countMins.textContent = '00';
      countSecs.textContent = '00';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    countDays.textContent = String(days).padStart(2, '0');
    countHours.textContent = String(hours).padStart(2, '0');
    countMins.textContent = String(minutes).padStart(2, '0');
    countSecs.textContent = String(seconds).padStart(2, '0');
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);



  // ==========================================
  // 6. MAP MODAL HANDLER
  // ==========================================
  const mapModal = document.getElementById('mapModal');
  const closeMapModal = document.getElementById('closeMapModal');
  const locationBtns = document.querySelectorAll('.btn-location');

  locationBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (mapModal) mapModal.classList.add('active');
    });
  });

  if (closeMapModal) {
    closeMapModal.addEventListener('click', () => {
      mapModal.classList.remove('active');
    });
  }

  // ==========================================
  // 7. BANK / DETAILS MODAL
  // ==========================================
  const bankModal = document.getElementById('bankModal');
  const closeBankModal = document.getElementById('closeBankModal');
  const openBankModal = document.getElementById('openBankModal');
  const copyBankBtn = document.getElementById('copyBankBtn');
  const copyToast = document.getElementById('copyToast');

  if (openBankModal) {
    openBankModal.addEventListener('click', () => {
      bankModal.classList.add('active');
    });
  }

  if (closeBankModal) {
    closeBankModal.addEventListener('click', () => {
      bankModal.classList.remove('active');
    });
  }

  if (copyBankBtn) {
    copyBankBtn.addEventListener('click', () => {
      const bankText = `Wedding Reception: Arshad & Athika\nVenue: TK Garden Auditorium, Wandoor\nDate: Sunday, 18/10/2026 at 5:00 PM`;
      navigator.clipboard.writeText(bankText).then(() => {
        copyToast.classList.add('show');
        setTimeout(() => copyToast.classList.remove('show'), 3000);
      }).catch(() => {
        alert('Details: TK Garden Auditorium, Wandoor - Sunday 18/10/2026 5 PM');
      });
    });
  }



  document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        backdrop.classList.remove('active');
      }
    });
  });

});

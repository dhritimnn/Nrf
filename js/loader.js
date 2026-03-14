/* ── NRF PAGE LOADER ──
   Drop <script src="js/loader.js"></script> in <head>
─────────────────────────────────────────────────── */

(function() {
  
  const style = document.createElement('style');
  style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Lexend+Deca:wght@800&display=swap');

    #nrf-loader {
      position: fixed;
      inset: 0;
      z-index: 9999;
      background: linear-gradient(135deg, #04262F 0%, #0F5A76 60%, #11475E 100%);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 24px;
      transition: opacity 0.5s ease;
    }

    #nrf-loader.nrf-loader-hide {
      opacity: 0;
      pointer-events: none;
    }

    /* Glowing orb behind logo */
    .nrf-loader-glow {
      position: absolute;
      width: 220px;
      height: 220px;
      background: radial-gradient(circle, rgba(45,165,212,0.25) 0%, transparent 70%);
      border-radius: 50%;
      animation: nrf-pulse 2.4s ease-in-out infinite;
    }

    .nrf-loader-wordmark {
      position: relative;
      font-family: "Lexend Deca", sans-serif;
      font-size: 3rem;
      font-weight: 800;
      letter-spacing: 0.35em;
      background: linear-gradient(90deg, #2DA5D4, #99CFF6, #ffffff, #99CFF6, #2DA5D4);
      background-size: 200% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: nrf-shimmer 2s linear infinite;
    }

    .nrf-loader-sub {
      position: relative;
      font-family: "Lexend Deca", sans-serif;
      font-size: 0.65rem;
      letter-spacing: 0.3em;
      text-transform: uppercase;
      color: rgba(153, 207, 246, 0.55);
      margin-top: -18px;
    }

    /* Three bouncing dots */
    .nrf-loader-dots {
      position: relative;
      display: flex;
      gap: 8px;
      align-items: center;
      margin-top: 4px;
    }

    .nrf-loader-dots span {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #2DA5D4;
      animation: nrf-bounce 1.2s ease-in-out infinite;
    }

    .nrf-loader-dots span:nth-child(2) { animation-delay: 0.2s; background: #99CFF6; }
    .nrf-loader-dots span:nth-child(3) { animation-delay: 0.4s; background: #B474FF; }

    @keyframes nrf-bounce {
      0%, 100% { transform: translateY(0);    opacity: 0.4; }
      50%       { transform: translateY(-8px); opacity: 1;   }
    }

    @keyframes nrf-shimmer {
      0%   { background-position: -200% center; }
      100% { background-position:  200% center; }
    }

    @keyframes nrf-pulse {
      0%, 100% { transform: scale(1);    opacity: 0.6; }
      50%       { transform: scale(1.15); opacity: 1;   }
    }
  `;
  document.head.appendChild(style);
  
  const loader = document.createElement('div');
  loader.id = 'nrf-loader';
  loader.innerHTML = `
    <div class="nrf-loader-glow"></div>
    <div class="nrf-loader-wordmark">NRF</div>
    <div class="nrf-loader-sub">New Rays Foundation</div>
    <div class="nrf-loader-dots">
      <span></span><span></span><span></span>
    </div>
  `;
  
  if (document.body) {
    document.body.appendChild(loader);
  } else {
    document.addEventListener('DOMContentLoaded', () => document.body.appendChild(loader));
  }
  
  function hideLoader() {
    loader.classList.add('nrf-loader-hide');
    setTimeout(() => loader.remove(), 520);
  }
  
  const startTime = Date.now();
  const MIN_DURATION = 1000;
  
  function scheduleHide() {
    const elapsed = Date.now() - startTime;
    const remaining = Math.max(0, MIN_DURATION - elapsed);
    setTimeout(hideLoader, remaining);
  }
  
  if (document.readyState === 'complete') {
    scheduleHide();
  } else {
    window.addEventListener('load', scheduleHide);
  }
  
})();
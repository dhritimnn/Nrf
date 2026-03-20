/* ── BNRF PAGE LOADER ──
   Drop <script src="js/loader.js"></script> in <head>
─────────────────────────────────────────────────── */

(function() {
  
  const style = document.createElement('style');
  style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Lexend+Deca:wght@800&display=swap');

    #bnrf-loader {
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

    #bnrf-loader.bnrf-loader-hide {
      opacity: 0;
      pointer-events: none;
    }

    .bnrf-loader-glow {
      position: absolute;
      width: 220px;
      height: 220px;
      background: radial-gradient(circle, rgba(45,165,212,0.25) 0%, transparent 70%);
      border-radius: 50%;
      animation: bnrf-pulse 2.4s ease-in-out infinite;
    }

    .bnrf-loader-wordmark {
      position: relative;
      font-family: "Lexend Deca", sans-serif;
      font-size: 2rem;
      font-weight: 800;
      letter-spacing: 0.35em;
      background: linear-gradient(90deg, #2DA5D4, #99CFF6, #ffffff, #99CFF6, #2DA5D4);
      background-size: 200% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: bnrf-shimmer 2s linear infinite;
    }

    .bnrf-loader-dots {
      position: relative;
      display: flex;
      gap: 12px;
      align-items: center;
      margin-top: 4px;
    }

    .bnrf-loader-dots span {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #2DA5D4;
      animation: bnrf-bounce 1.2s ease-in-out infinite;
    }

    .bnrf-loader-dots span:nth-child(2) { animation-delay: 0.2s; background: #99CFF6; }
    .bnrf-loader-dots span:nth-child(3) { animation-delay: 0.4s; background: #B474FF; }

    @keyframes bnrf-bounce {
      0%, 100% { transform: translateY(0);    opacity: 0.4; }
      50%       { transform: translateY(-8px); opacity: 1;   }
    }

    @keyframes bnrf-shimmer {
      0%   { background-position: -200% center; }
      100% { background-position:  200% center; }
    }

    @keyframes bnrf-pulse {
      0%, 100% { transform: scale(1);    opacity: 0.6; }
      50%       { transform: scale(1.15); opacity: 1;   }
    }
  `;
  document.head.appendChild(style);
  
  const loader = document.createElement('div');
  loader.id = 'bnrf-loader';
  loader.innerHTML = `
    <div class="bnrf-loader-glow"></div>
    <div class="bnrf-loader-wordmark">BNRF</div>
    <div class="bnrf-loader-dots">
      <span></span><span></span><span></span>
    </div>
  `;
  
  if (document.body) {
    document.body.appendChild(loader);
  } else {
    document.addEventListener('DOMContentLoaded', () => document.body.appendChild(loader));
  }
  
  function hideLoader() {
    loader.classList.add('bnrf-loader-hide');
    setTimeout(() => loader.remove(), 520);
  }
  
  const startTime = Date.now();
  const MIN_DURATION = 1500;
  
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
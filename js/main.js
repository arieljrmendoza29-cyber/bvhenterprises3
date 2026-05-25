// ── PAGE ROUTING ──
const pages = {home:'page-home',managed:'page-managed',why:'page-why',advantage:'page-advantage',about:'page-about',contact:'page-contact'};
function showPage(key,el){
  Object.values(pages).forEach(id=>{const p=document.getElementById(id);if(p)p.classList.remove('active')});
  const t=document.getElementById(pages[key]);if(t)t.classList.add('active');
  document.querySelectorAll('.nav-links a').forEach(a=>a.classList.remove('active'));
  if(el)el.classList.add('active');
  // Close mobile menu after selection
  const navLinks=document.getElementById('navLinks');
  if(navLinks && window.innerWidth<=768){ navLinks.style.display=''; }
  window.scrollTo(0,0);return false;
}
window.addEventListener('scroll',()=>{
  document.getElementById('mainNav').classList.toggle('scrolled',window.scrollY>20)
});
function toggleMenu(){
  const l=document.getElementById('navLinks');
  if(l.style.display==='flex'){l.style.display='';}
  else{l.style.display='flex';l.style.flexDirection='column';l.style.position='absolute';l.style.top='72px';l.style.left='0';l.style.right='0';l.style.background='white';l.style.padding='16px 24px';l.style.boxShadow='0 4px 16px rgba(0,0,0,.1)';l.style.zIndex='999'}
}
function submitForm(){
  document.getElementById('contactForm').style.display='none';
  document.getElementById('formSuccess').style.display='block';
}
document.querySelectorAll('.nav-links a').forEach(a=>a.addEventListener('click',e=>e.preventDefault()));

// ── EXPERT SLIDER ──
let expIdx=0;
const expTrack=document.getElementById('expertTrack');
const expCards=expTrack?expTrack.children.length:0;
const expVisible=4;
const expMax=Math.max(0,expCards-expVisible);
function buildExpertDots(){
  const d=document.getElementById('expertDots');if(!d)return;
  d.innerHTML='';
  for(let i=0;i<=expMax;i++){const s=document.createElement('div');s.className='sdot'+(i===0?' active':'');s.onclick=()=>goExp(i);d.appendChild(s)}
}
function goExp(i){
  expIdx=Math.max(0,Math.min(i,expMax));
  const w=expTrack.children[0].offsetWidth+20;
  expTrack.style.transform=`translateX(${-expIdx*w}px)`;
  document.querySelectorAll('.sdot').forEach((d,j)=>d.classList.toggle('active',j===expIdx));
}
function slideExperts(dir){goExp(expIdx+dir)}
buildExpertDots();

// ── INDUSTRY SLIDER ──
let indIdx=0;
const indTrack=document.getElementById('indTrack');
const indCards=indTrack?indTrack.children.length:0;
const indVisible=4;
const indMax=Math.max(0,indCards-indVisible);
function buildIndDots(){
  const d=document.getElementById('indDots');if(!d)return;
  d.innerHTML='';
  for(let i=0;i<=indMax;i++){const s=document.createElement('div');s.className='idot'+(i===0?' active':'');s.onclick=()=>goInd(i);d.appendChild(s)}
}
function goInd(i){
  indIdx=Math.max(0,Math.min(i,indMax));
  const w=indTrack.children[0].offsetWidth+16;
  indTrack.style.transform=`translateX(${-indIdx*w}px)`;
  document.querySelectorAll('.idot').forEach((d,j)=>d.classList.toggle('active',j===indIdx));
}
function slideInd(dir){goInd(indIdx+dir)}
buildIndDots();

/* ══════════════════════════════════════════════
   MOTION EFFECTS — scroll reveal + page transitions
   ══════════════════════════════════════════════ */
(function(){
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return; // bail out entirely if user prefers no motion

  // Selectors that should auto-reveal on scroll.
  // Section headers, cards, and content blocks.
  const REVEAL_SELECTORS = [
    '.consult-sec .consult-inner > *',
    '.results-inner > *',
    '.stacked-sec .feature-item',
    '.stacked-sec .hexagon-wrap',
    '.experts-header > *',
    '.expert-card',
    '.industry-sec .industry-header > *',
    '.industry-sec .ind-card',
    '.adv-grid .adv-card',
    '.cc-card',
    '.testi-sec .testi-card',
    '.cta-banner',
    '.gradient-band-inner > *',
    '.about-grid > *',
    '.contact-grid > *',
    '.footer-col',
  ];

  function tagReveals(root){
    const scope = root || document;
    REVEAL_SELECTORS.forEach(sel => {
      scope.querySelectorAll(sel).forEach((el, i) => {
        if (el.classList.contains('reveal') || el.classList.contains('reveal-left') || el.classList.contains('reveal-right') || el.classList.contains('reveal-scale')) return;
        el.classList.add('reveal');
        // Stagger siblings within the same parent for a cascading feel
        const delayIdx = Math.min(i % 5, 5);
        if (delayIdx > 0) el.classList.add('delay-' + delayIdx);
      });
    });
  }

  // IntersectionObserver — once an element enters, it stays revealed.
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  function observeReveals(){
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
      if (!el.classList.contains('in-view')) io.observe(el);
    });
  }

  // Initial pass
  function init(){
    tagReveals();
    observeReveals();
  }

  if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // SPA-aware: when showPage runs, the newly active page needs its reveals re-armed.
  // Wrap the existing global showPage if present.
  if (typeof window.showPage === 'function'){
    const _showPage = window.showPage;
    window.showPage = function(key, el){
      const result = _showPage.call(this, key, el);
      // Defer to next frame so the .active class has applied
      requestAnimationFrame(() => {
        const active = document.querySelector('.page.active');
        if (active){
          // Reset any reveals inside the freshly-shown page so they animate again
          active.querySelectorAll('.in-view').forEach(n => {
            n.classList.remove('in-view');
          });
          tagReveals(active);
          observeReveals();
        }
      });
      return result;
    };
  }
})();

/* ══════════════════════════════════════════════
   COUNT-UP ANIMATION — animates numeric stats
   when they scroll into view. Handles:
     97%   →   0% .. 97%
     99.9% →   0.0% .. 99.9%
     500+  →   0 .. 500+
     <15 min  →   <0 min .. <15 min
     10+ yrs  →   0+ yrs .. 10+ yrs
     24/7  →   0/7 .. 24/7  (animates the leading number only)
   ══════════════════════════════════════════════ */
(function(){
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Parse a string like "99.9%", "<15 min", "10+ yrs", "24/7", "500+"
  // Returns { prefix, target, decimals, suffix } where prefix and suffix are
  // strings that surround the leading numeric portion.
  function parse(text){
    const t = text.trim();
    // Capture: leading non-digit chars, the number (with optional decimal), trailing rest
    const m = t.match(/^([^\d-]*)(-?\d+(?:\.\d+)?)(.*)$/);
    if (!m) return null;
    const numStr = m[2];
    const decimals = (numStr.split('.')[1] || '').length;
    return { prefix: m[1], target: parseFloat(numStr), decimals, suffix: m[3] };
  }

  function format(value, parsed){
    return parsed.prefix + value.toFixed(parsed.decimals) + parsed.suffix;
  }

  // easeOutCubic — fast start, soft landing on the final value
  const ease = t => 1 - Math.pow(1 - t, 3);

  function animate(el){
    if (el.dataset.counted === '1') return;
    el.dataset.counted = '1';

    const original = el.textContent;
    const parsed = parse(original);

    // If we can't parse a number, just leave the text as-is
    if (!parsed || isNaN(parsed.target)) return;

    if (prefersReducedMotion){
      // Already shows the final value — nothing to do
      return;
    }

    const duration = 1400;        // ms — total count-up duration
    const start = performance.now();
    const startVal = 0;

    el.textContent = format(startVal, parsed);

    function frame(now){
      const elapsed = now - start;
      const t = Math.min(elapsed / duration, 1);
      const value = startVal + (parsed.target - startVal) * ease(t);
      el.textContent = format(value, parsed);
      if (t < 1) requestAnimationFrame(frame);
      else el.textContent = original;   // snap back to exact original (preserves "<15 min" etc)
    }
    requestAnimationFrame(frame);
  }

  // Single-shot observer — each number animates the first time it scrolls in
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        animate(entry.target);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  function observeAll(root){
    (root || document).querySelectorAll('.count-up').forEach(el => {
      if (el.dataset.counted !== '1') io.observe(el);
    });
  }

  if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', () => observeAll());
  } else {
    observeAll();
  }

  // Re-arm on SPA page switch
  if (typeof window.showPage === 'function'){
    const _prev = window.showPage;
    window.showPage = function(key, el){
      const r = _prev.call(this, key, el);
      requestAnimationFrame(() => {
        const active = document.querySelector('.page.active');
        if (active) observeAll(active);
      });
      return r;
    };
  }
})();

/* ══════════════════════════════════════════════
   TESTIMONIAL CAROUSEL — touch / mouse / keyboard / dots
   Works on cellphone, tablet, laptop, desktop, iOS, Android
   ══════════════════════════════════════════════ */
(function(){
  const track    = document.getElementById('testiTrack');
  const viewport = document.getElementById('testiViewport');
  const dotsBox  = document.getElementById('testiDots');
  const prevBtn  = document.getElementById('testiPrev');
  const nextBtn  = document.getElementById('testiNext');
  const carousel = document.getElementById('testiCarousel');
  if (!track || !viewport) return;

  const cards = Array.from(track.children);
  const total = cards.length;
  if (total === 0) return;

  // ── Responsive: how many cards visible at once? ──
  function visibleCount(){
    const w = window.innerWidth;
    if (w <= 700) return 1;
    if (w <= 1024) return 2;
    return 3;
  }

  let index = 0;          // active "page" (0-indexed)
  let maxIndex = 0;       // last valid page
  let cardStep = 0;       // pixels to translate per page
  const GAP = 24;         // matches CSS gap (24px desktop). 16 on mobile but we recompute each layout

  function measure(){
    const vis = visibleCount();
    maxIndex = Math.max(0, total - vis);
    // Compute actual card width including its gap, by reading the first card
    const cardRect = cards[0].getBoundingClientRect();
    const styles   = getComputedStyle(track);
    const gap      = parseFloat(styles.columnGap || styles.gap || GAP);
    cardStep = cardRect.width + gap;
    if (index > maxIndex) index = maxIndex;
    update(false);
  }

  function update(animate){
    if (!animate) track.classList.add('no-anim-once');
    track.style.transform = 'translateX(' + (-index * cardStep) + 'px)';
    if (!animate){
      // Force reflow then remove
      void track.offsetWidth;
      track.classList.remove('no-anim-once');
    }
    buildDots();
    // Arrow disabled state
    if (prevBtn) prevBtn.disabled = (index <= 0);
    if (nextBtn) nextBtn.disabled = (index >= maxIndex);
  }

  function goTo(i){
    index = Math.max(0, Math.min(i, maxIndex));
    update(true);
  }
  function next(){ goTo(index + 1); }
  function prev(){ goTo(index - 1); }

  function buildDots(){
    if (!dotsBox) return;
    const count = maxIndex + 1;
    if (dotsBox.children.length !== count){
      dotsBox.innerHTML = '';
      for (let i = 0; i < count; i++){
        const b = document.createElement('button');
        b.className = 'testi-dot' + (i === index ? ' active' : '');
        b.setAttribute('role', 'tab');
        b.setAttribute('aria-label', 'Go to testimonial ' + (i + 1));
        b.addEventListener('click', () => { goTo(i); pauseAutoplay(); });
        dotsBox.appendChild(b);
      }
    } else {
      Array.from(dotsBox.children).forEach((d, i) => {
        d.classList.toggle('active', i === index);
      });
    }
  }

  // ── Arrows ──
  if (prevBtn) prevBtn.addEventListener('click', () => { prev(); pauseAutoplay(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { next(); pauseAutoplay(); });

  // ── Keyboard (focus on the carousel) ──
  carousel.setAttribute('tabindex', '0');
  carousel.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft')  { prev(); pauseAutoplay(); }
    if (e.key === 'ArrowRight') { next(); pauseAutoplay(); }
  });

  // ── Pointer drag (covers mouse, touch, pen — unified) ──
  let pointerDown    = false;
  let startX         = 0;
  let currentX       = 0;
  let dragDelta      = 0;
  let pointerId      = null;
  const DRAG_THRESHOLD = 50;  // px — minimum drag to count as a swipe

  function onPointerDown(e){
    // Only main button for mouse; touch/pen always
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    pointerDown = true;
    startX      = e.clientX;
    currentX    = e.clientX;
    dragDelta   = 0;
    pointerId   = e.pointerId;
    track.classList.add('dragging');
    pauseAutoplay();
    // Capture so we keep getting move events even if pointer leaves the element
    try { track.setPointerCapture(pointerId); } catch(_){}
  }
  function onPointerMove(e){
    if (!pointerDown) return;
    currentX  = e.clientX;
    dragDelta = currentX - startX;
    // Live drag: shift the track by the drag amount
    track.style.transform = 'translateX(' + ((-index * cardStep) + dragDelta) + 'px)';
  }
  function onPointerUp(){
    if (!pointerDown) return;
    pointerDown = false;
    track.classList.remove('dragging');
    if (pointerId !== null){
      try { track.releasePointerCapture(pointerId); } catch(_){}
      pointerId = null;
    }
    // Decide: advance, retreat, or snap back
    if (dragDelta <= -DRAG_THRESHOLD)      next();
    else if (dragDelta >=  DRAG_THRESHOLD) prev();
    else                                   update(true);  // snap back
    dragDelta = 0;
  }

  track.addEventListener('pointerdown',   onPointerDown);
  track.addEventListener('pointermove',   onPointerMove);
  track.addEventListener('pointerup',     onPointerUp);
  track.addEventListener('pointercancel', onPointerUp);
  track.addEventListener('pointerleave',  (e) => { if (pointerDown) onPointerUp(e); });

  // Prevent accidental image-drag / text-selection on desktop drag
  track.querySelectorAll('img').forEach(img => {
    img.addEventListener('dragstart', e => e.preventDefault());
  });
  // Click-through prevention if a real drag happened
  track.addEventListener('click', (e) => {
    if (Math.abs(dragDelta) > 8){
      e.preventDefault();
      e.stopPropagation();
    }
  }, true);

  // ── Autoplay (pauses on user interaction & when off-screen) ──
  const AUTOPLAY_MS = 6000;
  let autoplayTimer = null;
  let autoplayPaused = false;

  function startAutoplay(){
    if (autoplayPaused) return;
    stopAutoplay();
    autoplayTimer = setInterval(() => {
      if (document.hidden) return;
      // Loop back to start when reaching the end
      if (index >= maxIndex) goTo(0);
      else next();
    }, AUTOPLAY_MS);
  }
  function stopAutoplay(){
    if (autoplayTimer) { clearInterval(autoplayTimer); autoplayTimer = null; }
  }
  function pauseAutoplay(){
    autoplayPaused = true;
    stopAutoplay();
    // Resume after 12s of idle
    clearTimeout(pauseAutoplay._resumeTimer);
    pauseAutoplay._resumeTimer = setTimeout(() => {
      autoplayPaused = false;
      startAutoplay();
    }, 12000);
  }

  // Only autoplay when carousel is in viewport (saves CPU on long pages)
  const ioCarousel = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) startAutoplay();
      else                      stopAutoplay();
    });
  }, { threshold: 0.25 });
  ioCarousel.observe(carousel);

  // Pause on hover (desktop only)
  carousel.addEventListener('mouseenter', stopAutoplay);
  carousel.addEventListener('mouseleave', () => { if (!autoplayPaused) startAutoplay(); });

  // Pause when tab is hidden
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stopAutoplay();
    else if (!autoplayPaused) startAutoplay();
  });

  // ── Respect reduced motion: disable autoplay entirely ──
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    stopAutoplay();
    autoplayPaused = true;
  }

  // ── Recalculate on resize / orientation change (debounced) ──
  let resizeTimer = null;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(measure, 120);
  });
  window.addEventListener('orientationchange', () => {
    setTimeout(measure, 200);
  });

  // Initial layout — wait for fonts + images to settle so card widths are right
  if (document.readyState === 'complete') measure();
  else window.addEventListener('load', measure);
  // Run an early pass too so the carousel doesn't flash on slow connections
  setTimeout(measure, 50);
})();

/* ══════════════════════════════════════════════
   HERO VIDEO — explicit play() retry for iOS / strict browsers
   Some mobile browsers ignore autoplay even with muted+playsinline.
   This calls .play() after load and falls back gracefully.
   ══════════════════════════════════════════════ */
(function(){
  const video = document.querySelector('.hero-video');
  if (!video) return;

  // Ensure required attributes are set in JS too (belt + suspenders for iOS)
  video.muted = true;
  video.playsInline = true;
  video.setAttribute('playsinline', '');
  video.setAttribute('webkit-playsinline', '');
  video.setAttribute('muted', '');

  function tryPlay(){
    const p = video.play();
    if (p && typeof p.catch === 'function'){
      p.catch(() => {
        // Autoplay blocked — try once more on first user interaction
        const resume = () => {
          video.play().catch(() => {});
          window.removeEventListener('touchstart', resume);
          window.removeEventListener('click',      resume);
          window.removeEventListener('scroll',     resume);
        };
        window.addEventListener('touchstart', resume, { once:true, passive:true });
        window.addEventListener('click',      resume, { once:true });
        window.addEventListener('scroll',     resume, { once:true, passive:true });
      });
    }
  }

  if (video.readyState >= 2) tryPlay();
  else video.addEventListener('loadeddata', tryPlay, { once:true });
})();

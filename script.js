// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
  // Only add event listeners if the navigation exists
  const navLinks = document.querySelectorAll('nav a');
  if (navLinks.length > 0) {
    navLinks.forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId.startsWith('#')) {
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            window.scrollTo({
              top: targetElement.offsetTop - 20,
              behavior: 'smooth'
            });
          }
        } else {
          window.location.href = this.href;
        }
      });
    });
  }

  // Animation for feature cards on scroll
  const featureCards = document.querySelectorAll('.feature-card');
  if (featureCards.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1 });

    featureCards.forEach(card => {
      card.style.opacity = 0;
      card.style.transform = 'translateY(20px)';
      card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      observer.observe(card);
    });
  }
 // ----------------- screenshotData (use your actual file paths) -----------------
const screenshotData = [
  { src: "assets/img.png", alt: "DotsChat Screenshot 1" },
  { src: "assets/photo_2025-09-19_00-44-22.jpg", alt: "DotsChat Screenshot 2" },
  { src: "assets/photo_2025-09-19_00-44-29.jpg", alt: "DotsChat Screenshot 3" },
  { src: "assets/photo_2025-09-19_14-30-12.jpg", alt: "DotsChat Screenshot 4" },
  { src: "assets/photo_2025-09-19_14-31-10.jpg", alt: "DotsChat Screenshot 5" },
  { src: "assets/photo_2025-09-19_14-31-22.jpg", alt: "DotsChat Screenshot 6" },
  { src: "assets/photo_2025-09-19_14-30-12 (2).jpg", alt: "DotsChat Screenshot 7" }
];

// ----------------- init when DOM ready -----------------
  const slider = document.getElementById('image-glider');
  if (!slider) return;

  // Build slide elements
  slider.innerHTML = '';
  screenshotData.forEach((s, i) => {
    const slide = document.createElement('div');
    slide.className = 'slide-item';
    slide.dataset.index = i;
    slide.innerHTML = `<img src="${s.src}" alt="${s.alt}">`;
    slider.appendChild(slide);
  });

  // Ensure Glider is defined
  if (typeof Glider === 'undefined') {
    console.error('Glider.js is not loaded. Make sure its script is included before this script.');
    return;
  }

  // Init Glider
  const glide = new Glider(slider, {
    slidesToShow:5,
    slidesToScroll : 1,
    draggable: true,
    dots: '.dots',
    arrows: {
      prev: '.glider-prev',
      next: '.glider-next'
    },
    responsive: [
      {
        breakpoint: 900,
        settings: { slidesToShow: 3 }
      },
      {
        breakpoint: 720,
        settings: { slidesToShow: 1 }
      }
    ]
  });

  // Helper: compute which slide is closest to container center
  function getCenterIndex() {
    const slides = Array.from(slider.querySelectorAll('.slide-item'));
    if (!slides.length) return 0;
    const containerRect = slider.getBoundingClientRect();
    const containerCenterX = containerRect.left + containerRect.width / 2;
    let minDist = Infinity;
    let centerIdx = 0;
    slides.forEach((s, idx) => {
      const r = s.getBoundingClientRect();
      const sCenter = r.left + r.width / 2;
      const d = Math.abs(sCenter - containerCenterX);
      if (d < minDist) { minDist = d; centerIdx = idx; }
    });
    return centerIdx;
  }

  // Apply V-shape classes
  function applyVClasses() {
    const slides = Array.from(slider.querySelectorAll('.slide-item'));
    if (!slides.length) return;
    const centerIdx = getCenterIndex();
    const total = slides.length;

    slides.forEach(s => s.classList.remove('center', 'left', 'right', 'dim'));

    const leftIdx = (centerIdx - 1 + total) % total;
    const rightIdx = (centerIdx + 1) % total;

    slides.forEach((s, i) => {
      if (i === centerIdx) s.classList.add('center');
      else if (i === leftIdx) s.classList.add('left');
      else if (i === rightIdx) s.classList.add('right');
      else s.classList.add('dim');
    });
  }

  // Bind events: run once when glider finishes setup and when it animates
  slider.addEventListener('glider-loaded', applyVClasses);
  slider.addEventListener('glider-animated', () => {
    // small delay to let glider transform settle, then apply classes
    requestAnimationFrame(() => setTimeout(applyVClasses, 20));
  });

  // also apply on resize (debounced)
  let rtid = null;
  window.addEventListener('resize', () => { clearTimeout(rtid); rtid = setTimeout(applyVClasses, 120); });

  // Click handling: click side -> center it. click center -> open modal
  slider.addEventListener('click', (e) => {
    const slideEl = e.target.closest('.slide-item');
    if (!slideEl) return;
    const idx = Number(slideEl.dataset.index);
    const centerIdx = getCenterIndex();
    if (idx !== centerIdx) {
      // try Glider API to scroll item into center
      try {
        if (typeof glide.scrollItem === 'function') {
          glide.scrollItem(idx, true);
        } else {
          // fallback: scroll to the element (works if glider track scrolls)
          slideEl.scrollIntoView({ behavior: 'smooth', inline: 'center' });
        }
      } catch (err) {
        console.warn('scrollItem failed', err);
      }
      return;
    }
    // center clicked -> show modal (if modal exists)
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-image');
    if (modal && modalImg) {
      modalImg.src = screenshotData[idx].src;
      modalImg.alt = screenshotData[idx].alt;
      modal.style.display = 'flex';
    }
  });

  // modal close hooks
  document.getElementById('close-modal')?.addEventListener('click', () => {
    document.getElementById('image-modal').style.display = 'none';
  });
  document.getElementById('image-modal')?.addEventListener('click', (ev) => {
    if (ev.target === document.getElementById('image-modal')) {
      document.getElementById('image-modal').style.display = 'none';
    }
  });

  // initial class application after a tick
  requestAnimationFrame(() => setTimeout(applyVClasses, 50));
});


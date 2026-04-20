// ------------------------------------
// SCROLL FADE ANIMATION
// ------------------------------------

const fadeElements = document.querySelectorAll(".scrollFade");

const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const el = entry.target;

      if (entry.isIntersecting) {
        el.classList.add("scrollFade--visible", "scrollFade--animate");
        el.classList.remove("scrollFade--hidden");
      } else {
        el.classList.remove("scrollFade--visible");
        el.classList.add("scrollFade--hidden");
      }
    });
  },
  {
    threshold: 0.2, // triggers when ~20% visible
  }
);

fadeElements.forEach((el) => fadeObserver.observe(el));

// ------------------------------------
// HAMBURGER MENU TOGGLE
// ------------------------------------

const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = navToggle.classList.toggle("is-open");
    siteNav.classList.toggle("is-open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 1024) {
      navToggle.classList.remove("is-open");
      siteNav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}


// ------------------------------------
// ROTATING TEXT ANIMATION
// ------------------------------------

const el = document.querySelector(".rotating-text__track");

if (el) {
  const items = el.children;
  let index = 0;
  let intervalId = null;

  const startRotation = () => {
    if (window.innerWidth < 768) {
      el.style.transform = "none";
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
      return;
    }

    if (intervalId) {
      clearInterval(intervalId);
    }

    index = 0;
    el.style.transform = "translateY(0)";

    intervalId = setInterval(() => {
      index = (index + 1) % items.length;
      el.style.transform = `translateY(-${index * 1.25}em)`;
    }, 5000);
  };

  startRotation();

  window.addEventListener("resize", startRotation);
}





// ------------------------------------
// CUBE ANIMATION
// ------------------------------------

const cube = document.querySelector('.cube');
const faces = document.querySelectorAll('.cube__face');

// ======================
// BASE STATE
// ======================

let baseX = -35;
let baseY = 40;

let currentX = baseX;
let currentY = baseY;

let targetX = baseX;
let targetY = baseY;

// inertia
let velocityX = 0;
let velocityY = 0;

// mouse influence
let mouseX = 0;
let mouseY = 0;

// interaction state
let isDragging = false;
let lastX = 0;
let lastY = 0;

// ======================
// TUNING
// ======================

const ease = 0.05;
const friction = 0.92;
const dragSensitivity = 0.25;
const influence = 12;

// ======================
// MOUSE INTERACTION
// ======================

const container = document.querySelector('.cube-container');

container.addEventListener('mousedown', (e) => {
  isDragging = true;
  lastX = e.clientX;
  lastY = e.clientY;
});

document.addEventListener('mouseup', () => {
  isDragging = false;
});

document.addEventListener('mousemove', (e) => {
  if (isDragging) {
    const dx = e.clientX - lastX;
    const dy = e.clientY - lastY;

    velocityY = dx * dragSensitivity;
    velocityX = -dy * dragSensitivity;

    lastX = e.clientX;
    lastY = e.clientY;
  } else {
    const x = e.clientX / window.innerWidth - 0.5;
    const y = e.clientY / window.innerHeight - 0.5;

    mouseX = x * influence;
    mouseY = y * influence;
  }
});

// ======================
// ANIMATION LOOP
// ======================

function animate() {
  if (isDragging) {
    currentX += velocityX;
    currentY += velocityY;
  } else {
    // idle drift
    baseX += 0.01;
    baseY += 0.015;

    targetX = baseX + mouseY;
    targetY = baseY + mouseX;

    currentX += (targetX - currentX) * ease;
    currentY += (targetY - currentY) * ease;
  }

  // apply inertia
  velocityX *= friction;
  velocityY *= friction;

  // apply transform
  cube.style.transform = `
    rotateX(${currentX}deg)
    rotateY(${currentY}deg)
  `;

  // ======================
  // SUBTLE LIGHTING
  // ======================

  faces.forEach((face, i) => {
    // simulate light variation
    const angle = currentX + currentY;
    const light = Math.sin((angle + i * 60) * Math.PI / 180);

    // subtle brightness only (NOT opacity)
    const brightness = 0.6 + light * 0.4;

    face.style.filter = `brightness(${brightness})`;
  });

  requestAnimationFrame(animate);
}

animate();
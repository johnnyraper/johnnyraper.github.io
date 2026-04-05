// -----------------------------
// Scroll Fade (IntersectionObserver)
// -----------------------------

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


// -----------------------------
// Rotating Text
// -----------------------------

const el = document.querySelector('.rotating-text__track');
const items = el.children;
let index = 0;

const step = () => {
  index = (index + 1) % items.length;
  el.style.transform = `translateY(-${index * 1.25}em)`;
};

setInterval(step, 5000);
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.textContent = isOpen ? 'Close' : 'Menu';
  });
  navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.textContent = 'Menu';
  }));
}
document.getElementById('year').textContent = new Date().getFullYear();


// Smooth, accessible scroll reveals for the academic website.
document.addEventListener("DOMContentLoaded", () => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const sections = document.querySelectorAll("main section, .section, .contact-section, .profile-link, .publication-card, .research-card, .award-card");

  if (!reduceMotion && "IntersectionObserver" in window) {
    sections.forEach((item) => item.classList.add("reveal-on-scroll"));
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });

    sections.forEach((item) => observer.observe(item));
  }

  // Add a subtle active state to in-page navigation links while scrolling.
  const navLinks = document.querySelectorAll('nav a[href^="#"], .nav-links a[href^="#"]');
  const trackedSections = [...navLinks]
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if ("IntersectionObserver" in window && trackedSections.length) {
    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => {
            const active = link.getAttribute("href") === `#${entry.target.id}`;
            link.classList.toggle("is-active", active);
          });
        }
      });
    }, { rootMargin: "-25% 0px -65% 0px" });
    trackedSections.forEach((section) => navObserver.observe(section));
  }
});




// Type the greeting first, then the name. Both start hidden to avoid a flash of full text.
document.addEventListener("DOMContentLoaded", () => {
  const greeting = document.querySelector(".hero-greeting");
  const name = document.querySelector(".hero-title-name");
  if (!greeting || !name) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) {
    greeting.textContent = "Hello, I am";
    name.textContent = "Tasmiah Sad Sutopa";
    return;
  }

  const greetingText = "Hello, I am";
  const nameText = "Tasmiah Sad Sutopa";
  greeting.textContent = "";
  name.textContent = "";
  greeting.style.visibility = "visible";
  name.style.visibility = "visible";

  const cursor = document.createElement("span");
  cursor.className = "greeting-cursor";
  cursor.setAttribute("aria-hidden", "true");
  greeting.appendChild(cursor);

  function typeInto(element, text, speed, callback, keepCursor = false) {
    let i = 0;
    function tick() {
      if (i < text.length) {
        element.insertBefore(document.createTextNode(text.charAt(i)), keepCursor ? cursor : null);
        i += 1;
        window.setTimeout(tick, speed);
      } else if (callback) {
        callback();
      }
    }
    tick();
  }

  typeInto(greeting, greetingText, 85, () => {
    window.setTimeout(() => {
      cursor.remove();
      typeInto(name, nameText, 90);
    }, 250);
  }, true);
});

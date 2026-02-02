// Put your REAL links here
const LINKS = {
  linkedin: "https://www.linkedin.com/in/YOUR-LINK",
  github: "https://github.com/YOUR-USERNAME"
};

const lnk1 = document.getElementById("lnk1");
const git1 = document.getElementById("git1");
const lnk2 = document.getElementById("lnk2");
const git2 = document.getElementById("git2");

if (lnk1) lnk1.href = LINKS.linkedin;
if (git1) git1.href = LINKS.github;
if (lnk2) lnk2.href = LINKS.linkedin;
if (git2) git2.href = LINKS.github;

document.getElementById("year").textContent = new Date().getFullYear();

// cursor glow
const cursor = document.getElementById("cursorGlow");
window.addEventListener("mousemove", (e) => {
  cursor.style.left = `${e.clientX - 210}px`;
  cursor.style.top = `${e.clientY - 210}px`;
});

// header scrolled
const header = document.querySelector(".header");
window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 10);
});

// mobile menu
const menuBtn = document.getElementById("menuBtn");
const mobile = document.getElementById("mobileMenu");
menuBtn?.addEventListener("click", () => mobile.classList.toggle("open"));

// smooth scroll + close mobile
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const href = a.getAttribute("href");
    const el = document.querySelector(href);
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    mobile?.classList.remove("open");
  });
});

// reveal
const revealEls = document.querySelectorAll(".reveal");
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add("show");
  });
}, { threshold: 0.12 });

revealEls.forEach((el) => io.observe(el));

// nav active
const navLinks = Array.from(document.querySelectorAll(".navlink"))
  .filter(a => a.getAttribute("href")?.startsWith("#") && a.getAttribute("href") !== "#top");

const sections = navLinks
  .map(a => document.querySelector(a.getAttribute("href")))
  .filter(Boolean);

const ioNav = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const id = `#${entry.target.id}`;
    navLinks.forEach((l) => l.classList.toggle("active", l.getAttribute("href") === id));
  });
}, { rootMargin: "-40% 0px -55% 0px", threshold: 0.01 });

sections.forEach(s => ioNav.observe(s));

// fake send note
document.getElementById("fakeSend")?.addEventListener("click", () => {
  document.getElementById("note").textContent =
    "Static form on GitHub Pages. If you want, I can add Formspree so messages go to your email.";
});

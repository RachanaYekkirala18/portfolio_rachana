// Year
document.getElementById("year").textContent = new Date().getFullYear();

// Theme
const themeBtn = document.getElementById("themeBtn");
const themeIcon = document.getElementById("themeIcon");
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") document.body.classList.add("light");
themeIcon.textContent = document.body.classList.contains("light") ? "☀" : "◐";

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("light");
  const isLight = document.body.classList.contains("light");
  localStorage.setItem("theme", isLight ? "light" : "dark");
  themeIcon.textContent = isLight ? "☀" : "◐";
});

// Mobile menu
const menuBtn = document.getElementById("menuBtn");
const mobilePanel = document.getElementById("mobilePanel");
menuBtn.addEventListener("click", () => {
  mobilePanel.classList.toggle("open");
});
mobilePanel.querySelectorAll("a").forEach((a) => {
  a.addEventListener("click", () => mobilePanel.classList.remove("open"));
});

// Scroll progress
const progressBar = document.getElementById("progressBar");
function updateProgress() {
  const doc = document.documentElement;
  const scrollTop = doc.scrollTop;
  const scrollHeight = doc.scrollHeight - doc.clientHeight;
  const p = scrollHeight ? (scrollTop / scrollHeight) * 100 : 0;
  progressBar.style.width = `${p}%`;
}
window.addEventListener("scroll", updateProgress, { passive: true });
updateProgress();

// Reveal on scroll
const reveals = Array.from(document.querySelectorAll(".reveal"));
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("show");
    });
  },
  { threshold: 0.12 }
);
reveals.forEach((el) => io.observe(el));

// Active nav highlight
const navLinks = Array.from(document.querySelectorAll(".links a[data-section]"));
const sections = navLinks
  .map((a) => document.getElementById(a.dataset.section))
  .filter(Boolean);

const activeIO = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      navLinks.forEach((a) => a.classList.toggle("active", a.dataset.section === id));
    });
  },
  { rootMargin: "-35% 0px -55% 0px", threshold: 0.01 }
);

sections.forEach((s) => activeIO.observe(s));

// Skills
const skills = [
  "SQL (CTEs, Window Functions)",
  "Python (Pandas, PySpark)",
  "AWS (S3, Glue, Lambda, Athena)",
  "Power BI (DAX, Power Query)",
  "Tableau",
  "ETL/ELT • Data Modeling",
  "Kafka (Streaming)",
  "Git • Docker",
  "A/B Testing • KPI Design",
  "Stakeholder Management",
];

const skillsWrap = document.getElementById("skillsWrap");
const skillSearch = document.getElementById("skillSearch");

function renderSkills(filter = "") {
  const q = filter.trim().toLowerCase();
  skillsWrap.innerHTML = "";
  skills
    .filter((s) => s.toLowerCase().includes(q))
    .forEach((s) => {
      const chip = document.createElement("span");
      chip.className = "chip";
      chip.textContent = s;
      skillsWrap.appendChild(chip);
    });
}
skillSearch.addEventListener("input", (e) => renderSkills(e.target.value));
renderSkills();

// Projects with tag filters
const projects = [
  {
    title: "AWS Data Lakehouse Pipeline",
    desc: "Medallion architecture pipeline using S3, Glue, Lambda, Step Functions, Athena/Redshift for analytics-ready data.",
    tags: ["AWS", "ETL", "PySpark", "Lakehouse"],
    github: "https://github.com/",
    demo: "",
  },
  {
    title: "Kafka Clickstream Streaming Pipeline",
    desc: "Real-time ingestion with Kafka + Connect, Python consumers, PostgreSQL sink, monitoring with Grafana.",
    tags: ["Kafka", "Python", "PostgreSQL", "Docker"],
    github: "https://github.com/",
    demo: "",
  },
  {
    title: "Power BI Sales Dashboard",
    desc: "Executive KPIs, DAX measures, star schema modeling, drill-down insights and clean visuals.",
    tags: ["Power BI", "DAX", "KPIs", "Modeling"],
    github: "https://github.com/",
    demo: "",
  },
];

const filtersEl = document.getElementById("filters");
const gridEl = document.getElementById("projectsGrid");

const allTags = ["All", ...Array.from(new Set(projects.flatMap((p) => p.tags)))];
let activeTag = "All";

function renderFilters() {
  filtersEl.innerHTML = "";
  allTags.forEach((t) => {
    const btn = document.createElement("button");
    btn.className = "filterBtn" + (t === activeTag ? " active" : "");
    btn.textContent = t;
    btn.addEventListener("click", () => {
      activeTag = t;
      renderFilters();
      renderProjects();
    });
    filtersEl.appendChild(btn);
  });
}

function renderProjects() {
  gridEl.innerHTML = "";
  const visible =
    activeTag === "All" ? projects : projects.filter((p) => p.tags.includes(activeTag));

  visible.forEach((p) => {
    const card = document.createElement("article");
    card.className = "project card";

    card.innerHTML = `
      <div class="projectInner">
        <div class="projectTop">
          <h3 class="projectTitle">${p.title}</h3>
        </div>
        <p class="projectDesc">${p.desc}</p>
        <div class="tags">
          ${p.tags.map((t) => `<span class="tag">${t}</span>`).join("")}
        </div>
        <div class="proLinks">
          <a href="${p.github}" target="_blank" rel="noreferrer">GitHub</a>
          ${
            p.demo
              ? `<a href="${p.demo}" target="_blank" rel="noreferrer">Demo</a>`
              : `<span class="muted small">Demo</span>`
          }
        </div>
      </div>
    `;

    card.addEventListener("mousemove", (e) => {
      const r = card.getBoundingClientRect();
      const mx = ((e.clientX - r.left) / r.width) * 100;
      const my = ((e.clientY - r.top) / r.height) * 100;
      card.style.setProperty("--mx", `${mx}%`);
      card.style.setProperty("--my", `${my}%`);
    });

    gridEl.appendChild(card);
  });
}

renderFilters();
renderProjects();

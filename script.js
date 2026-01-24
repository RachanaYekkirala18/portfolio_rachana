// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Mobile nav
const navBtn = document.getElementById("navBtn");
const navMobile = document.getElementById("navMobile");
navBtn.addEventListener("click", () => navMobile.classList.toggle("open"));
navMobile.querySelectorAll("a").forEach(a => a.addEventListener("click", () => navMobile.classList.remove("open")));

// Hero "coder object" (Neha-style vibe)
const code = `
const analyst = {
  name: 'Rachana',
  roles: ['Business Analyst', 'Data Analyst', 'Data Engineer'],
  stack: ['SQL', 'Power BI', 'Python', 'AWS'],
  hardWorker: true,
  quickLearner: true,
  problemSolver: true,
  hireable() {
    return (
      this.hardWorker &&
      this.problemSolver &&
      this.stack.length >= 4
    );
  }
};
`.trim();

document.getElementById("codeText").textContent = code;

// Experience (edit as you want)
const experiences = [
  {
    company: "NB Alpha Omega",
    role: "Business Analyst",
    duration: "Sep 2024 – Present",
    tools: ["SQL", "Power BI", "Python", "AWS"],
    desc: [
      "Built KPI dashboards and reporting datasets used in weekly and monthly reviews.",
      "Wrote optimized SQL for ad-hoc analysis across large tables to support faster decisions.",
      "Automated recurring checks and reporting using Python to reduce manual effort."
    ],
  },
  {
    company: "Wipro",
    role: "Project Engineer",
    duration: "May 2021 – Jun 2022",
    tools: ["SQL", "Power BI", "Excel"],
    desc: [
      "Supported analytics and reporting workflows, improving visibility into operational metrics.",
      "Partnered with stakeholders to define KPIs and deliver dashboard updates."
    ],
  },
];

const expWrap = document.getElementById("expWrap");
expWrap.innerHTML = experiences.map(e => `
  <article class="card">
    <h3 class="cardTitle">${e.company}</h3>
    <p class="muted"><b>${e.role}</b> • ${e.duration}</p>
    <div class="tags">${e.tools.map(t => `<span class="tag">${t}</span>`).join("")}</div>
    <ul class="muted" style="margin:10px 0 0; padding-left:18px;">
      ${e.desc.map(x => `<li style="margin:6px 0;">${x}</li>`).join("")}
    </ul>
  </article>
`).join("");

// Projects + filters (edit links + add more)
const projects = [
  {
    title: "AWS Data Lakehouse Pipeline",
    desc: "Medallion lakehouse pipeline for analytics-ready datasets using AWS services.",
    tags: ["AWS", "ETL", "Lakehouse"],
    github: "https://github.com/",
    demo: ""
  },
  {
    title: "Kafka Clickstream Streaming Pipeline",
    desc: "Real-time clickstream ingestion with Kafka, Python consumers, and PostgreSQL sink.",
    tags: ["Kafka", "Python", "Streaming"],
    github: "https://github.com/",
    demo: ""
  },
  {
    title: "Power BI Sales Dashboard",
    desc: "Executive dashboard with DAX KPIs, clean visuals, and drilldown insights.",
    tags: ["Power BI", "DAX", "KPIs"],
    github: "https://github.com/",
    demo: ""
  },
];

const projectGrid = document.getElementById("projectGrid");
const filtersEl = document.getElementById("filters");

const allTags = ["All", ...new Set(projects.flatMap(p => p.tags))];
let activeTag = "All";

function renderFilters(){
  filtersEl.innerHTML = "";
  allTags.forEach(t => {
    const b = document.createElement("button");
    b.className = "filterBtn" + (t === activeTag ? " active" : "");
    b.textContent = t;
    b.onclick = () => {
      activeTag = t;
      renderFilters();
      renderProjects();
    };
    filtersEl.appendChild(b);
  });
}

function renderProjects(){
  projectGrid.innerHTML = "";
  const visible = activeTag === "All" ? projects : projects.filter(p => p.tags.includes(activeTag));

  visible.forEach(p => {
    const el = document.createElement("article");
    el.className = "card projectCard";
    el.innerHTML = `
      <h3 class="cardTitle">${p.title}</h3>
      <p class="muted">${p.desc}</p>
      <div class="tags">${p.tags.map(t => `<span class="tag">${t}</span>`).join("")}</div>
      <div class="linksRow">
        <a href="${p.github}" target="_blank" rel="noreferrer">GitHub</a>
        ${p.demo ? `<a href="${p.demo}" target="_blank" rel="noreferrer">Demo</a>` : `<span class="muted">Demo</span>`}
      </div>
    `;
    projectGrid.appendChild(el);
  });
}

renderFilters();
renderProjects();

// Testimonials (optional)
const testimonials = [
  {
    name: "Name Here",
    role: "Manager / Professor",
    quote: "Rachana is sharp, organized, and delivers high-quality dashboards and analysis."
  },
  {
    name: "Name Here",
    role: "Senior Stakeholder",
    quote: "Strong SQL and a great ability to translate business questions into metrics."
  }
];

const testWrap = document.getElementById("testWrap");
testWrap.innerHTML = testimonials.map(t => `
  <article class="card">
    <h3 class="cardTitle">${t.name}</h3>
    <p class="muted">${t.role}</p>
    <p style="margin:10px 0 0;" class="muted">“${t.quote}”</p>
  </article>
`).join("");

// Contact form (GitHub Pages can't send emails without backend)
const form = document.getElementById("contactForm");
const formNote = document.getElementById("formNote");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  formNote.textContent = "GitHub Pages can’t send messages without a backend. Use the Email link (or add Formspree later).";
});

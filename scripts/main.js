/* ======= Event Data ======= */
const events = [
  // --- Day 1: Nov 20, 2025 ---
  {
    title: "Opening Keynote: The Future of AI",
    type: "Keynote",
    date: "2025-11-20T09:00:00",
    description:
      "Join industry visionary Dr. Evelyn Reed as she unveils the next decade of AI innovation.",
    image: "images/keynote.jpg",
  },
  {
    title: "Advanced JavaScript Workshop",
    type: "Workshop",
    date: "2025-11-20T10:30:00",
    description:
      "A 3-hour, hands-on deep-dive into asynchronous JavaScript, Promises, and modern ES6+ features.",
    image: "images/workshop-js.png",
  },
  {
    title: "Cybersecurity in the Cloud Era",
    type: "Talk",
    date: "2025-11-20T11:00:00",
    description:
      "Explore the evolving landscape of cloud security threats and proactive defense strategies.",
    image: "images/cybersecurity.jpg",
  },
  {
    title: "Introduction to Quantum Computing",
    type: "Talk",
    date: "2025-11-20T14:00:00",
    description:
      "A beginner-friendly overview of quantum mechanics and its potential to revolutionize computing.",
    image: "images/quantum.jpg",
  },
  {
    title: "Networking Mixer & Welcome Reception",
    type: "Social",
    date: "2025-11-20T17:00:00",
    description:
      "Connect with fellow attendees, speakers, and sponsors over drinks and appetizers.",
    image: "images/cybersecurity1.jpg",
  },
  {
    title: "The Ethics of Machine Learning",
    type: "Talk",
    date: "2025-11-21T09:30:00",
    description:
      "A critical discussion on the societal impact and ethical responsibilities in ML development.",
    image: "images/ethics.jpg",
  },
  {
    title: "Building Scalable Web Apps with Microservices",
    type: "Talk",
    date: "2025-11-21T10:30:00",
    description:
      "Learn the principles of microservices from lead engineers at a top tech company.",
    image: "images/quantum.jpg",
  },
  {
    title: "Mastering React Performance",
    type: "Workshop",
    date: "2025-11-21T13:00:00",
    description:
      "Optimize your React applications by learning memoization, code splitting, and bundle analysis.",
    image: "images/cybersecurity2.jpg",
  },
  {
    title: "The Psychology of User Experience (UX)",
    type: "Talk",
    date: "2025-11-21T14:00:00",
    description:
      "Understand the cognitive biases and psychological principles that drive effective UX design.",
    image: "images/keynote.jpg",
  },
  {
    title: "Panel: The Future of Remote Work in Tech",
    type: "Panel",
    date: "2025-11-21T16:00:00",
    description:
      "Industry leaders discuss the challenges, tools, and culture of building successful remote-first teams.",
    image: "images/quantum2.jpg",
  },
  {
    title: "UI/UX Design Fundamentals for Developers",
    type: "Workshop",
    date: "2025-11-22T09:00:00",
    description:
      "A practical workshop on visual hierarchy, color theory, and typography that every developer should know.",
    image: "images/cybersecurity1.jpg",
  },
  {
    title: "From Monolith to Serverless",
    type: "Talk",
    date: "2025-11-22T10:00:00",
    description:
      "A case study on migrating a large-scale legacy application to a modern serverless architecture.",
    image: "images/quantum.jpg",
  },
  {
    title: "State of Web Assembly in 2025",
    type: "Talk",
    date: "2025-11-22T11:30:00",
    description:
      "Discover how WebAssembly is enabling near-native performance for web applications.",
    image: "images/cybersecurity1.jpg",
  },
  {
    title: "Data Visualization with D3.js",
    type: "Workshop",
    date: "2025-11-22T13:30:00",
    description:
      "Learn to create stunning, interactive data visualizations for the web from scratch.",
    image: "images/cybersecurity2.jpg",
  },
  {
    title: "Closing Panel: Ask Me Anything with Speakers",
    type: "Panel",
    date: "2025-11-22T16:00:00",
    description:
      "An open Q&A session with a panel of the conference's top speakers. No topic is off-limits!",
    image: "images/quantum.jpg",
  },
  {
    title: "Pre-Conference Hackathon",
    type: "Social",
    date: "2025-11-19T09:00:00",
    description:
      "A 24-hour coding challenge with prizes for the most innovative projects. Kicks off before the main event.",
    image: "images/cybersecurity1.jpg",
  },
  {
    title: "API Design Best Practices",
    type: "Talk",
    date: "2025-11-21T15:00:00",
    description:
      "Learn how to design, document, and maintain clean, consistent, and easy-to-use RESTful APIs.",
    image: "images/cybersecurity2.jpg",
  },
  {
    title: "DevOps Culture and Tooling",
    type: "Talk",
    date: "2025-11-20T15:30:00",
    description:
      "An introduction to the principles of DevOps and the tools that enable continuous integration and deployment.",
    image: "images/cybersecurity1.jpg",
  },
  {
    title: "Mobile-First Design in Practice",
    type: "Workshop",
    date: "2025-11-20T13:00:00",
    description:
      "A hands-on session focusing on practical techniques for designing and building mobile-first responsive websites.",
    image: "images/cybersecurity1.jpg",
  },
  {
    title: "Closing Ceremony & Awards",
    type: "Social",
    date: "2025-11-22T17:30:00",
    description:
      "Join us as we celebrate the best of the conference and announce the hackathon winners.",
    image: "images/cybersecurity2.jpg",
  },
];

/* ===== DOM References ===== */
const container = document.getElementById("event-container");
const searchEl = document.getElementById("search");
const filterBtns = Array.from(document.querySelectorAll(".filter-btn"));
const themeToggle = document.getElementById("theme-toggle");
const announcer = document.getElementById("announce");

let activeType = "All";
let searchTerm = "";
const countdownTimers = new Map();

/* ===== Helper Functions ===== */
function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function formatDate(iso) {
  return new Date(iso).toLocaleString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
function clearCountdowns() {
  countdownTimers.forEach((id) => clearInterval(id));
  countdownTimers.clear();
}
function highlight(text, term) {
  if (!term) return text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const re = new RegExp(`(${escapeRegExp(term)})`, "ig");
  return text.replace(re, "<mark>$1</mark>");
}

/* ===== Calendar Links ===== */
function createCalendar(ev) {
  const start = new Date(ev.date);
  const end = new Date(start.getTime() + 60 * 60 * 1000);
  const fmt = (d) => d.toISOString().replace(/-|:|\.\d{3}/g, "");
  const title = encodeURIComponent(ev.title);
  const details = encodeURIComponent(ev.description);
  const location = encodeURIComponent("TechCon Venue");
  const gcal = `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${fmt(
    start
  )}/${fmt(end)}`;
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//TechCon//EN",
    "BEGIN:VEVENT",
    `UID:${Date.now()}@techcon`,
    `DTSTAMP:${fmt(new Date())}`,
    `DTSTART:${fmt(start)}`,
    `DTEND:${fmt(end)}`,
    `SUMMARY:${ev.title}`,
    `DESCRIPTION:${ev.description}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  return { gcal, ics };
}
function downloadBlob(content, filename, type = "text/calendar;charset=utf-8") {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

/* ===== Create Card ===== */
function createCard(ev, index) {
  const article = document.createElement("article");
  article.className = "event-card fade-in";
  article.tabIndex = 0;
  const media = document.createElement("div");
  media.className = "event-media";
  const img = document.createElement("img");
  img.src = ev.image;
  img.alt = ev.title;
  media.appendChild(img);
  const body = document.createElement("div");
  body.className = "event-body";
  const meta = document.createElement("div");
  meta.className = "event-meta";
  const chip = document.createElement("span");
  chip.className = "chip";
  chip.textContent = ev.type;
  const timeEl = document.createElement("time");
  timeEl.dateTime = ev.date;
  timeEl.textContent = formatDate(ev.date);
  meta.appendChild(chip);
  meta.appendChild(timeEl);
  const h2 = document.createElement("h2");
  h2.className = "event-title";
  h2.innerHTML = highlight(ev.title, searchTerm);
  const p = document.createElement("p");
  p.className = "event-desc";
  p.innerHTML = highlight(ev.description, searchTerm);
  const countdown = document.createElement("div");
  countdown.className = "countdown";
  countdown.setAttribute("aria-live", "polite");
  body.appendChild(meta);
  body.appendChild(h2);
  body.appendChild(p);
  body.appendChild(countdown);

  const footer = document.createElement("div");
  footer.className = "event-footer";
  const left = document.createElement("div");
  const addBtn = document.createElement("button");
  addBtn.className = "btn ghost";
  addBtn.textContent = "Add to Calendar";
  addBtn.addEventListener("click", () => {
    const links = createCalendar(ev);
    window.open(links.gcal, "_blank");
    downloadBlob(links.ics, `${ev.title.replace(/[^a-z0-9]/gi, "_")}.ics`);
  });
  left.appendChild(addBtn);
  const right = document.createElement("div");
  const detailsBtn = document.createElement("button");
  detailsBtn.className = "btn primary";
  detailsBtn.textContent = "Details";
  detailsBtn.addEventListener("click", () => {
    alert(`${ev.title}\n\n${ev.description}\n\nWhen: ${formatDate(ev.date)}`);
  });
  right.appendChild(detailsBtn);
  footer.appendChild(left);
  footer.appendChild(right);

  article.appendChild(media);
  article.appendChild(body);
  article.appendChild(footer);

  const target = new Date(ev.date).getTime();
  if (Date.now() >= target) {
    countdown.textContent = "Event has ended";
  } else {
    const id = setInterval(() => {
      const t = target - Date.now();
      if (t <= 0) {
        countdown.textContent = "Event is starting now";
        clearInterval(id);
        countdownTimers.delete(index);
        return;
      }
      const days = Math.floor(t / (1000 * 60 * 60 * 24)),
        hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        mins = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60)),
        secs = Math.floor((t % (1000 * 60)) / 1000);
      countdown.textContent = `${days}d ${hours}h ${mins}m ${secs}s`;
    }, 1000);
    countdownTimers.set(index, id);
  }

  return article;
}

/* ===== Render ===== */
function render(list) {
  const children = Array.from(container.children);
  if (children.length) {
    children.forEach((c, i) => {
      c.classList.add("fade-out");
      setTimeout(() => c.remove(), 180 + i * 10);
    });
  }
  clearCountdowns();
  setTimeout(() => {
    container.innerHTML = "";
    list.forEach((ev, idx) => container.appendChild(createCard(ev, idx)));
    announcer.textContent = `Now showing ${list.length} events`;
  }, 240);
}

/* ===== Filter & Search ===== */
function applyFilters() {
  const term = searchTerm.trim().toLowerCase();
  const filtered = events
    .filter((ev) => {
      const typeMatch = activeType === "All" || ev.type === activeType;
      const searchMatch =
        !term || (ev.title + " " + ev.description).toLowerCase().includes(term);
      return typeMatch && searchMatch;
    })
    .sort((a, b) => new Date(a.date) - new Date(b.date));
  render(filtered);
}

/* ===== Events ===== */
filterBtns.forEach((btn) =>
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => {
      b.classList.remove("active");
      b.setAttribute("aria-selected", "false");
    });
    btn.classList.add("active");
    btn.setAttribute("aria-selected", "true");
    activeType = btn.dataset.type;
    applyFilters();
  })
);
searchEl.addEventListener("input", (e) => {
  searchTerm = e.target.value;
  applyFilters();
});

/* ===== Theme Toggle ===== */
function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  themeToggle.textContent = theme === "dark" ? "☀️" : "🌙";
  localStorage.setItem("tc-theme", theme);
  themeToggle.setAttribute("aria-pressed", theme === "dark");
}
themeToggle.addEventListener("click", () => {
  const t =
    document.documentElement.getAttribute("data-theme") === "dark"
      ? "light"
      : "dark";
  applyTheme(t);
});
const savedTheme = localStorage.getItem("tc-theme");
applyTheme(
  savedTheme
    ? savedTheme
    : window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light"
);

/* ===== Initial Render ===== */
applyFilters();

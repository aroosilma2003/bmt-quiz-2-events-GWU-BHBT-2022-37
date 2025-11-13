# TechCon 2025 — Event Schedule

**Author:** Issathul ILMA  
**Date:** November 2025  

---

TechCon 2025 is an interactive web-based conference schedule. Users can view events, filter by type, search, add to Google Calendar or download `.ics` files, and toggle between dark and light themes. The design is fully responsive and accessible.

---

## Features

- Event cards with title, type, description, image, and countdown
- Filter events by type: Keynotes, Talks, Workshops, Panels, Social
- Live search for event titles and descriptions
- Add to Google Calendar or download `.ics` files
- Dark/Light theme toggle with localStorage persistence
- Responsive grid layout for mobile and desktop
- Accessibility with ARIA roles and live regions

---

## Technologies

- HTML5
- CSS3 (Glassmorphism, responsive grid)
- JavaScript (ES6+)
- LocalStorage for theme
- Optional: PWA support with Service Worker

---

## Usage

1. Clone the repo:  
```bash
git clone https://github.com/yourusername/techcon-2025.git
techcon-2025/
├─ index.html
├─ styles/main.css
├─ scripts/main.js
├─ images/
└─ README.md

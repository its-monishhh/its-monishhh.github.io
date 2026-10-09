# Monish U – Portfolio

A static website: plain HTML, CSS and JavaScript. No build step, no dependencies.

## Structure
- `index.html`    all page content (text, projects, skills, certifications)
- `css/style.css` design (colours are variables at the top of the file)
- `js/links.js`   your LinkedIn / GitHub / project URLs (edit this first)
- `js/main.js`    theme toggle, project accordions, hero animation
- `assets/`       favicon and future images

## Run locally
Open `index.html` in a browser, or run `python3 -m http.server 8000` and visit http://localhost:8000

## Adding a project
Open `index.html`, find the commented template at the end of the Projects section, copy it, remove the comment markers, edit the text, and add its link keys to `js/links.js`.

## Resume
Replace `assets/Monish_U_Resume.pdf` with a newer PDF using the same file name.

# ExpressPath

A 21-day Express.js course as a plain HTML, CSS and JavaScript app. No install or build step.

## Run it
Open `index.html` in a browser, or in VS Code use the Live Server extension (right-click index.html, Open with Live Server).

## Files
- `index.html`: page shell
- `css/styles.css`: all styling (colours are variables at the top)
- `js/app.js`: the app logic (progress, quiz, daily unlock, review)
- `js/data.js`: the course content. D = day titles, L = lessons by day number, G = glossary

## Edit a lesson
Open `js/data.js`, find the day number in `L`, and edit its `s` (sections), `fill` (practice), `q` (quiz) , `ch` (challenge) or `rf` (reflection).

## Notes
Progress is saved in your browser (localStorage). A day unlocks only on a later calendar day than the previous one; to test quickly, clear site data or change `un` in `js/app.js`.
"# expresspath" 

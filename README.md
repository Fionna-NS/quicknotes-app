# QuickNotes

QuickNotes is a small note-taking web app built with plain HTML, CSS and JavaScript. You can write short notes, file them under Personal, Work or Study, search through them and delete the ones you no longer need. Everything is saved in your browser's localStorage, so your notes are still there after a page refresh.

## Features

- Add notes of up to 200 characters, with validation and clear error messages
- Three categories (Personal, Work, Study), each with its own card colour
- Each note shows its text, category label, date and a Delete button
- Live, case-insensitive search with a "No notes match your search." message
- Note counter with correct wording for zero, one and many notes
- Notes persist across page refreshes using localStorage
- "Clear all" button with a confirmation prompt
- Responsive layout: the form stacks on screens 600px wide or smaller

## How to run locally

1. Clone the repository: `git clone https://github.com/Fionna-NS/quicknotes-app.git
2. Open the folder: `cd quicknotes-app`
3. Open `index.html` in your browser, or use the VS Code Live Server extension.

No build tools or dependencies are needed.

## What I learned

- How to keep the data in an array of objects and rebuild the page from it with a `render()` function.
- Why user text should be added with `textContent` instead of `innerHTML`.
- How to save and load data with `localStorage`, `JSON.stringify` and `JSON.parse`.
- How Flexbox and a `max-width` media query make a layout work on small screens.
- How to make small, meaningful Git commits as each feature is finished.

const form = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const categorySelect = document.querySelector("#note-category");
const searchInput = document.querySelector("#search-input");
const notesList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");
const clearAllBtn = document.querySelector("#clear-all-btn");

const STORAGE_KEY = "quicknotes"; 
const MAX_LENGTH = 200;

let notes = []; // Declare once at top level

function init() {
    notes = loadNotes(); // Assign inside init without 'let'
    // Render notes or setup event listeners here...
}

init(); // Call init

/* ---------- Task 5: storage ---------- */
function loadNotes() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch (error) {
    return [];
  }
}

function saveNotes() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

/* ---------- Task 4: count ---------- */
function updateCount() {
  if (notes.length === 0) {
    noteCount.textContent = "You have no notes yet.";
  } else if (notes.length === 1) {
    noteCount.textContent = "You have 1 note.";
  } else {
    noteCount.textContent = `You have ${notes.length} notes.`;
  }
}

/* ---------- Task 3 + 5: render ---------- */
function render() {
  const query = searchInput.value.trim().toLowerCase();
  const visible = notes.filter((note) =>
    note.text.toLowerCase().includes(query)
  );

  notesList.textContent = "";

  if (notes.length > 0 && visible.length === 0) {
    const empty = document.createElement("li");
    empty.className = "no-results";
    empty.textContent = "No notes match your search.";
    notesList.appendChild(empty);
  }

  visible.forEach((note) => {
    const li = document.createElement("li");
    li.className = `note-card category-${note.category}`;

    const content = document.createElement("div");

    const text = document.createElement("p");
    text.className = "note-text";
    text.textContent = note.text;

    const label = document.createElement("span");
    label.className = "note-category";
    label.textContent = note.category;

    const date = document.createElement("p");
    date.className = "note-date";
    date.textContent = note.createdAt;

    content.append(text, label, date);

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => deleteNote(note.id));

    li.append(content, deleteBtn);
    notesList.appendChild(li);
  });

  updateCount();
  clearAllBtn.hidden = notes.length === 0;
}

/* ---------- Task 3: add ---------- */
function addNote(text, category) {
  notes.push({
    id: Date.now(),
    text: text,
    category: category,
    createdAt: new Date().toLocaleString(),
  });
  saveNotes();
  render();
}

/* ---------- Task 4: delete ---------- */
function deleteNote(id) {
  notes = notes.filter((note) => note.id !== id);
  saveNotes();
  render();
}

/* ---------- Task 4: validation + submit ---------- */
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = noteInput.value.trim();

  if (text === "") {
    errorMessage.textContent = "Please type a note first.";
    return;
  }
  if (text.length > MAX_LENGTH) {
    errorMessage.textContent = "Notes must be 200 characters or fewer.";
    return;
  }

  errorMessage.textContent = "";
  addNote(text, categorySelect.value);
  noteInput.value = "";
  noteInput.focus();
});

/* ---------- Task 5: search ---------- */
searchInput.addEventListener("input", render);

/* ---------- Bonus: clear all ---------- */
clearAllBtn.addEventListener("click", () => {
  if (confirm("Delete all notes?")) {
    notes = [];
    saveNotes();
    render();
  }
});

render();


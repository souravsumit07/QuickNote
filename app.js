let notes = [];

function openNoteDialog() {
  document.getElementById("notesDialog").showModal();
  document.getElementById("blurBackground").classList.add("blur");
}

function closeNoteDialog() {
  document.getElementById("notesDialog").close();
  document.getElementById("blurBackground").classList.remove("blur");
}

function saveNote(title, content) {
  const newNote = { title, content };
  notes.push(newNote);
  localStorage.setItem("quick_note", JSON.stringify(notes));
  renderNotes();
}

function deleteNote(index) {
  notes.splice(index, 1);
  localStorage.setItem("quick_note", JSON.stringify(notes));
  renderNotes();
}

function renderNotes() {
  const notes_container = document.getElementById("notes_container");
  notes_container.innerHTML = notes.map((note, index) => `
    <div class="note-card">
      <h3>${note.title}</h3>
      <p>${note.content}</p>
      <button onclick="deleteNote(${index})">❌</button>
    </div>
  `).join('');
}

function loadNotesFromStorage() {
  const stored = localStorage.getItem("quick_note");
  if (stored) {
    notes = JSON.parse(stored);
    renderNotes();
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("noteForm");
  const noteDialog = document.getElementById("notesDialog");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const title = document.getElementById("title").value.trim();
    const content = document.getElementById("content").value.trim();

    if (title && content) {
      saveNote(title, content);
      form.reset();
      noteDialog.close();
      document.getElementById("blurBackground").classList.remove("blur");
    }
  });

  loadNotesFromStorage();
});

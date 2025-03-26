import { notesData } from "./assets/data/notes.js";
import "./components/NoteItem.js";

document.addEventListener("DOMContentLoaded", () => {
  const noteContainer = document.querySelector("#note-container");

  function renderNotes() {
    noteContainer.innerHTML = "";
    notesData.forEach((note) => {
      const noteElement = document.createElement("note-item");
      noteElement.note = note; // Menggunakan setter `note` dari `note-item.js`
      noteContainer.appendChild(noteElement);
    });
  }

  document.addEventListener("note-added", (event) => {
    notesData.push(event.detail);
    renderNotes();
  });

  renderNotes();
});

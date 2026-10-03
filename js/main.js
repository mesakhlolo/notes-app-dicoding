import './components/AppBar.js';
import './components/NoteItem.js';
import './components/NoteList.js';
import './components/NoteForm.js';
import { notesData } from './data/notesData.js';

// Salinan array agar data asli tidak termutasi langsung.
const notes = [...notesData];

// Render awal seluruh catatan.
const list = document.querySelector('note-list');
list.notes = notes;

// Catatan baru dari form disisipkan paling atas lalu list di-render ulang.
document.querySelector('note-form').addEventListener('add-note', (e) => {
  notes.unshift(e.detail);
  list.notes = notes;
});

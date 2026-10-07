import '../styles/style.css';
import './components/AppBar.js';
import './components/NoteItem.js';
import './components/NoteList.js';
import './components/NoteForm.js';
import NotesApi from './api/notes-api.js';

const list = document.querySelector('note-list');

// Muat daftar dari API saat halaman dibuka.
async function loadNotes() {
  try {
    const notes = await NotesApi.getNotes();
    list.notes = notes;
  } catch (error) {
    console.error(error.message);
  }
}

loadNotes();

// Tambah via API lalu muat ulang agar id dari server yang dipakai.
document.querySelector('note-form').addEventListener('add-note', async (e) => {
  try {
    const { title, body } = e.detail;
    await NotesApi.createNote({ title, body });
    await loadNotes();
  } catch (error) {
    console.error(error.message);
  }
});

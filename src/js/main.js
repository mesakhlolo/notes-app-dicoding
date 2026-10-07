import '../styles/style.css';
import './components/AppBar.js';
import './components/NoteItem.js';
import './components/NoteList.js';
import './components/NoteForm.js';
import './components/LoadingIndicator.js';
import NotesApi from './api/notes-api.js';

const list = document.querySelector('note-list');
const loading = document.querySelector('loading-indicator');

// Muat daftar dari API saat halaman dibuka.
async function loadNotes() {
  loading.show();
  try {
    const notes = await NotesApi.getNotes();
    list.notes = notes;
  } catch (error) {
    alert(error.message);
  } finally {
    loading.hide();
  }
}

loadNotes();

// Tambah via API lalu muat ulang agar id dari server yang dipakai.
document.querySelector('note-form').addEventListener('add-note', async (e) => {
  loading.show();
  try {
    const { title, body } = e.detail;
    await NotesApi.createNote({ title, body });
    await loadNotes();
  } catch (error) {
    alert(error.message);
  } finally {
    loading.hide();
  }
});

// Hapus via API lalu muat ulang. Event datang dari <note-item> di dalam <note-list>.
document.addEventListener('delete-note', async (e) => {
  loading.show();
  try {
    await NotesApi.deleteNote(e.detail);
    await loadNotes();
  } catch (error) {
    alert(error.message);
  } finally {
    loading.hide();
  }
});

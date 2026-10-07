import '../styles/style.css';
import './components/AppBar.js';
import './components/NoteItem.js';
import './components/NoteList.js';
import './components/NoteForm.js';
import './components/LoadingIndicator.js';
import NotesApi from './api/notes-api.js';

const list = document.querySelector('note-list');
const loading = document.querySelector('loading-indicator');
const tabActive = document.querySelector('#tab-active');
const tabArchived = document.querySelector('#tab-archived');
const countActive = document.querySelector('#count-active');
const countArchived = document.querySelector('#count-archived');

// Tab yang sedang dibuka. Arsip dan aktif adalah dua daftar terpisah di server.
let activeTab = 'active';

function renderTabs(active, archived) {
  countActive.textContent = active.length;
  countArchived.textContent = archived.length;
  tabActive.classList.toggle('active', activeTab === 'active');
  tabArchived.classList.toggle('active', activeTab === 'archived');
  list.notes = activeTab === 'active' ? active : archived;
}

// Muat dua daftar sekaligus agar badge jumlah selalu benar.
async function loadNotes() {
  loading.show();
  try {
    const [active, archived] = await Promise.all([NotesApi.getNotes(), NotesApi.getArchived()]);
    renderTabs(active, archived);
  } catch (error) {
    alert(error.message);
  } finally {
    loading.hide();
  }
}

tabActive.addEventListener('click', () => {
  activeTab = 'active';
  loadNotes();
});

tabArchived.addEventListener('click', () => {
  activeTab = 'archived';
  loadNotes();
});

loadNotes();

// Tambah via API lalu muat ulang agar id dari server yang dipakai.
document.querySelector('note-form').addEventListener('add-note', async (e) => {
  loading.show();
  try {
    const { title, body } = e.detail;
    await NotesApi.createNote({ title, body });
    activeTab = 'active';
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

// Arsip/batal arsip: satu event dua arah, ikut flag dari kartu.
document.addEventListener('toggle-archive', async (e) => {
  loading.show();
  try {
    const { id, archived } = e.detail;
    if (archived) {
      await NotesApi.unarchiveNote(id);
    } else {
      await NotesApi.archiveNote(id);
    }
    await loadNotes();
  } catch (error) {
    alert(error.message);
  } finally {
    loading.hide();
  }
});

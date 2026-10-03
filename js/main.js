// Entry point: daftarkan semua custom element di sini.
import './components/AppBar.js';
import './components/NoteItem.js';
import './components/NoteList.js';
import './components/NoteForm.js';
import { notesData } from './data/notesData.js';

// State lokal (kayak useState di React): salinan array biar bisa ditambah.
const notes = [...notesData];

// W1: tampilkan semua dummy saat pertama load.
const list = document.querySelector('note-list');
list.notes = notes;

console.log(`main.js jalan, ${notes.length} catatan dirender.`);

// W2: dengar laporan dari <note-form>, taruh paling atas, gambar ulang.
document.querySelector('note-form').addEventListener('add-note', (e) => {
  notes.unshift(e.detail); // paling atas, sesuai rubric
  list.notes = notes;
});

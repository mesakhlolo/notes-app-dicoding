// Entry point: daftarkan semua custom element di sini.
import './components/AppBar.js';
import './components/NoteItem.js';
import './components/NoteList.js';
import { notesData } from './data/notesData.js';

// W1: tampilkan semua dummy saat pertama load.
const list = document.querySelector('note-list');
list.notes = notesData;

console.log(`main.js jalan, ${notesData.length} catatan dirender.`);

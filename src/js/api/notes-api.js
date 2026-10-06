// Lapisan API terpusat (W2 + W4).
// main.js TIDAK boleh fetch langsung — selalu lewat objek ini.
// Base URL wajib: https://notes-api.dicoding.dev/v2
const BASE_URL = 'https://notes-api.dicoding.dev/v2';

const NotesApi = {
  // GET /notes → mengembalikan array [{ id, title, body, createdAt, archived }]
  async getNotes() {
    const response = await fetch(`${BASE_URL}/notes`);
    if (!response.ok) {
      throw new Error(`Gagal memuat catatan (${response.status})`);
    }
    const json = await response.json();
    if (!Array.isArray(json.data)) {
      throw new Error('Format data API tidak valid');
    }
    return json.data;
  },

  // POST /notes dengan body { title, body } — akan kita kerjakan setelah getNotes lolos.
  async createNote({ title, body }) {
    throw new Error('createNote() belum diimplementasi — nanti setelah getNotes.');
  },

  // DELETE /notes/{note_id} — akan kita kerjakan setelah create lolos.
  async deleteNote(noteId) {
    throw new Error('deleteNote() belum diimplementasi — nanti.');
  },
};

export default NotesApi;

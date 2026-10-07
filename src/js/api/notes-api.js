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

  // POST /notes dengan body { title, body } → mengembalikan object { id, title, body, ... }
  // Bedanya dengan GET: butuh method, headers, body JSON. Return object, bukan array.
  async createNote({ title, body }) {
    const response = await fetch(`${BASE_URL}/notes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: title,
        body: body,
      }),
    });
    if (!response.ok) {
      throw new Error('Gagal menambahkan catatan');
    }
    const json = await response.json();
    if (!json.data?.id) {
      throw new Error('Format data API tidak valid');
    }
    return json.data;
  },

  // DELETE /notes/{note_id} — akan kita kerjakan setelah create lolos.
  async deleteNote(noteId) {
    throw new Error('deleteNote() belum diimplementasi — nanti.');
  },
};

export default NotesApi;

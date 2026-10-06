// Lapisan API terpusat (W2 + W4).
// main.js TIDAK boleh fetch langsung — selalu lewat objek ini.
// Base URL wajib: https://notes-api.dicoding.dev/v2
const BASE_URL = 'https://notes-api.dicoding.dev/v2';

const NotesApi = {
  // GET /notes → mengembalikan array [{ id, title, body, createdAt, archived }]
  async getNotes() {
    // TODO(human): isi 5-10 baris fetch untuk ambil daftar catatan.
    // Langkah:
    // 1. fetch(`${BASE_URL}/notes`)
    // 2. cek response.ok, kalau tidak ok lempar Error
    // 3. const json = await response.json()
    // 4. return json.data (array-nya, bukan seluruh json!)
    // Contoh shape sukses: { status: 'success', message: '...', data: [...] }
    throw new Error('getNotes() belum diimplementasi — kerjakan ini dulu!');
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

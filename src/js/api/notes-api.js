// Semua fetch ke Dicoding hanya lewat sini agar error konsisten (W2 + W4).
const BASE_URL = 'https://notes-api.dicoding.dev/v2';

const NotesApi = {
  // Unwrap json.data karena server selalu bungkus payload.
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

  // Header JSON wajib agar server mau parse body.
  async createNote({ title, body }) {
    const response = await fetch(`${BASE_URL}/notes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, body }),
    });
    if (!response.ok) {
      throw new Error(`Gagal menambahkan catatan (${response.status})`);
    }
    const json = await response.json();
    if (!json.data?.id) {
      throw new Error('Format data API tidak valid');
    }
    return json.data;
  },

  // Server tidak kirim data balik saat hapus, cukup kembalikan true.
  async deleteNote(noteId) {
    const response = await fetch(`${BASE_URL}/notes/${noteId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`Gagal menghapus catatan (${response.status})`);
    }
    return true;
  },
};

export default NotesApi;

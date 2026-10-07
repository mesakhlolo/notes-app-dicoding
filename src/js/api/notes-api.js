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

  // Arsip: daftar terpisah dari aktif.
  async getArchived() {
    const response = await fetch(`${BASE_URL}/notes/archived`);
    if (!response.ok) {
      throw new Error(`Gagal memuat arsip (${response.status})`);
    }
    const json = await response.json();
    if (!Array.isArray(json.data)) {
      throw new Error('Format data API tidak valid');
    }
    return json.data;
  },

  async archiveNote(noteId) {
    const response = await fetch(`${BASE_URL}/notes/${noteId}/archive`, {
      method: 'POST',
    });
    if (!response.ok) {
      throw new Error(`Gagal mengarsipkan (${response.status})`);
    }
    return true;
  },

  async unarchiveNote(noteId) {
    const response = await fetch(`${BASE_URL}/notes/${noteId}/unarchive`, {
      method: 'POST',
    });
    if (!response.ok) {
      throw new Error(`Gagal membatalkan arsip (${response.status})`);
    }
    return true;
  },
};

export default NotesApi;

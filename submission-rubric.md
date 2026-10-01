# Notes App — Submission Rubric (Pedoman Ngoding)

> Tujuan: Lulus submission Dicoding "Membangun Notes App" dengan target **Bintang 5**.
> Prinsip: Kerjain sendiri + pair programming, paham konsep, no plagiat, no framework.

---

## 1. Kriteria Wajib (Gagal 1 = Ditolak)

### [ ] W1: Menampilkan Daftar Catatan
- [ ] Ada file data dummy `notesData` (array of `{ id, title, body, createdAt, archived }`)
- [ ] Semua data dari dummy tampil saat pertama load, tanpa error console
- [ ] Tiap kartu tampilkan: judul, isi/body, tanggal (`createdAt`)
- [ ] Cara cek: buka `index.html`, hitung jumlah kartu == jumlah data, cek console kosong

### [ ] W2: Formulir Tambah Catatan
- [ ] Ada `<input>` untuk judul (type="text", required)
- [ ] Ada `<textarea>` untuk body/isi (required)
- [ ] Ada tombol submit, label yang jelas
- [ ] Submit menambah catatan baru ke daftar paling atas tanpa reload
- [ ] Form ke-reset setelah submit
- [ ] Cara cek: isi judul + body -> submit -> muncul kartu baru

### [ ] W3: CSS Grid untuk Layout Daftar
- [ ] Container daftar pakai `display: grid`
- [ ] Pakai `grid-template-columns: repeat(auto-fill, minmax(...))` atau sejenisnya + `gap`
- [ ] Tidak boleh cuma Flexbox untuk daftar — Grid wajib di sini
- [ ] Cara cek: inspect element `.notes-grid`, pastikan `display: grid`

### [ ] W4: Minimal 3 Web Component
- [ ] Definisi via `class extends HTMLElement` + `customElements.define()`
- [ ] Wajib ada 3, saran:
  1. `<app-bar>` — header aplikasi
  2. `<note-form>` — bungkus formulir tambah
  3. `<note-list>` — container grid
  4. `<note-item>` — kartu per catatan (bonus, jadi total 4)
- [ ] Pakai Shadow DOM (`attachShadow`) untuk enkapsulasi style kalau bisa
- [ ] Cara cek: search `customElements.define` ada >= 3, cek di Elements ada tag custom

---

## 2. Kriteria Opsional (Untuk Bintang 4-5)

Target kita: ambil **minimal 3** biar Bintang 5.

### [ ] O1: Tampilan Menarik
- [ ] Palet warna konsisten (ref: colorhunt.co, maks 3-4 warna)
- [ ] Font readable (system font / Google Fonts, line-height cukup)
- [ ] Padding/margin konsisten, tidak ada konten bertumpuk
- [ ] Ada hover state / shadow / rounded di kartu
- [ ] Ada header + footer + spacing section jelas

### [ ] O2: Realtime Validation
- [ ] Validasi jalan saat `input` event, bukan cuma pas submit
- [ ] Aturan contoh: judul min 3 karakter, body min 10 karakter, tidak boleh kosong/whitespace only
- [ ] Pesan error muncul di bawah field (`<p class="error">`)
- [ ] Tombol submit disabled selama invalid
- [ ] Pakai `setCustomValidity()` / `reportValidity()` atau manual + `aria-live`

### [ ] O3: Custom Attribute pada Custom Element
- [ ] Minimal 1 custom element observe attribute via `static get observedAttributes()`
- [ ] Contoh: `<app-bar title="Notes App" subtitle="...">`, `<note-item archived>`
- [ ] Implement `attributeChangedCallback()` untuk re-render
- [ ] Dipakai beneran di `index.html`, bukan cuma definisi

### [ ] O4: Responsive di Berbagai Perangkat
- [ ] Mobile (~<600px): 1 kolom
- [ ] Tablet (~600-900px): 2 kolom
- [ ] Desktop (>900px): 3-4 kolom
- [ ] Form full-width di HP, 2 kolom / side-by-side di desktop (opsional)
- [ ] Cara cek: DevTools device toolbar 360px, 768px, 1280px, tidak ada horizontal scroll

---

## 3. Rating (Acuan Reviewer)

- `★☆☆☆☆ (1)`: Wajib lolos tapi indikasi plagiat / copy-paste ubah konten doang
- `★★☆☆☆ (2)`: Wajib lolos tapi tidak lebih baik dari latihan
- `★★★☆☆ (3)`: Hanya wajib terpenuhi, lolos pas-pasan
- `★★★★☆ (4)`: Wajib + minimal 2 opsional
- `★★★★★ (5)`: Wajib + minimal 3 opsional <- **TARGET KITA**

> Ditolak = tidak dinilai. Wajib 100% dulu, baru kejar opsional.

---

## 4. Auto-Tolak — Jangan Dilanggar

- [ ] Tidak pakai React / Vue / Angular / framework apapun — wajib vanilla JS
- [ ] Tidak plagiat >70% — semua kode hasil sendiri, referensi hanya inspirasi
- [ ] ZIP tidak berisi `node_modules/`, `.git/`, file besar tidak perlu
- [ ] ZIP berisi folder proyek langsung jalan via Live Server / double-click `index.html`
- [ ] Nama ZIP: `notes-app.zip`

---

## 5. Struktur Proyek yang Disepakati

```
notes-app-dicoding/
├── submission-rubric.md   # file ini (pedoman)
├── index.html             # <app-bar>, <note-form>, <note-list>
├── styles/
│   └── style.css          # Grid + responsive + tema
├── js/
│   ├── data/
│   │   └── notesData.js   # data dummy
│   ├── components/
│   │   ├── AppBar.js
│   │   ├── NoteForm.js
│   │   ├── NoteList.js
│   │   └── NoteItem.js
│   └── main.js            # render awal + wiring
└── README.md (opsional)   # cara jalanin
```

Alur pair programming per modul:
1. Aku jelasin konsep singkat
2. Kamu nulis dulu
3. Aku review + kasih insight

---

## 6. Final Checklist Sebelum ZIP

- [ ] Semua W1-W4 centang
- [ ] Minimal O2, O3, O4 + O1 centang (untuk ★5)
- [ ] Console bersih, tidak ada 404 aset
- [ ] Test manual: load -> tambah catatan -> validasi error -> resize HP/tablet/desktop
- [ ] `rm -rf node_modules` jika ada, cek ukuran ZIP < 5MB idealnya
- [ ] ZIP dari root folder, bukan nested zip-dalam-zip

Progress: `[....../......]` update tiap modul selesai.

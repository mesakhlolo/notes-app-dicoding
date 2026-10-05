# Notes App — Submission Rubric 2 (Integrasi RESTful API)

> Tujuan: Lulus submission Dicoding "Integrasi Notes App dengan RESTful API" dengan target **Bintang 5**.
> Prinsip: Kerjain sendiri + pair programming, paham konsep, no plagiat, no framework.
> API: `https://notes-api.dicoding.dev/v2` — [Dokumentasi alternatif](https://gist.github.com/dimasmds/693763ac1533fa6731e63be1975d5449).

---

## 1. Kriteria Wajib (Gagal 1 = Ditolak)

### [ ] W1: Kriteria Submission Sebelumnya Tetap Terpenuhi
- [ ] Daftar catatan tampil (judul, isi/body, tanggal `createdAt`)
- [ ] Formulir tambah catatan (input judul + textarea body + tombol submit)
- [ ] Layout daftar pakai CSS Grid (`display: grid` + `repeat(auto-fill, minmax(...))` + `gap`)
- [ ] Minimal 3 Web Component (`customElements.define` >= 3, pakai Shadow DOM)
- [ ] Cara cek: checklist `submission-rubric.md` W1-W4 tetap centang semua

### [ ] W2: RESTful API sebagai Sumber Data
- [ ] Base URL: `https://notes-api.dicoding.dev/v2`
- [ ] Wajib adopsi 3 fitur:
  - [ ] Membuat catatan baru → `POST /notes` (body: `{ title, body }`)
  - [ ] Mendapatkan + menampilkan daftar → `GET /notes`
  - [ ] Menghapus catatan → `DELETE /notes/{note_id}`
- [ ] Data dumi lokal (`notesData.js`) **sudah tidak digunakan** sebagai sumber data
- [ ] Cara cek: search import `notesData` tidak ada yang kepakai, matikan internet → daftar gagal load (bukti data dari network)

### [ ] W3: Webpack sebagai Module Bundler
- [ ] `html-webpack-plugin` terpasang dan dipakai di konfigurasi webpack
- [ ] `npm run start-dev` jalan (pakai `webpack-dev-server`)
- [ ] `npm run build` menghasilkan folder `dist/` siap dibuka
- [ ] Cara cek: `npm run build` tanpa error, buka `dist/index.html` aplikasi jalan

### [ ] W4: Menggunakan Fetch API
- [ ] Seluruh request HTTP pakai `fetch()` (bukan XHR / Axios / library lain)
- [ ] Meliputi: GET list, POST create, DELETE (dan arsip jika ambil opsional)
- [ ] Cara cek: search `fetch(` di `src/js/api/`, cek Network tab ada request ke `notes-api.dicoding.dev`

### [ ] W5: Indikator Loading
- [ ] Loading muncul setiap ada request HTTP (load awal, tambah, hapus, arsip)
- [ ] Loading hilang setelah response/selesai (sukses maupun gagal)
- [ ] Saran: bikin Web Component `<loading-indicator>` (spinner + overlay + `aria-live`)
- [ ] Cara cek: throttle network ke "Slow 3G", tiap aksi harus ada spinner terlihat

---

## 2. Kriteria Opsional (Untuk Bintang 4-5)

Target kita: ambil **minimal 3** biar Bintang 5.

### [ ] O1: Fitur Arsip Catatan
- [ ] Ambil daftar arsip → `GET /notes/archived`
- [ ] Tombol arsip → `POST /notes/{note_id}/archive`
- [ ] Tombol batal arsip → `POST /notes/{note_id}/unarchive`
- [ ] Ada UI pemisah: tab/filter "Aktif" vs "Arsip" + badge jumlah
- [ ] Cara cek: arsipkan 1 catatan → hilang dari tab Aktif, muncul di tab Arsip, dan sebaliknya

### [ ] O2: Feedback Saat Error
- [ ] Setiap `fetch` dibungkus `try/catch`, pesan error tampil ke user
- [ ] Boleh pakai `alert()`, lebih bagus pakai `sweetalert2` (toast/modal)
- [ ] Kasus yang di-cover: gagal load, gagal tambah, gagal hapus, gagal arsip
- [ ] Cara cek: matikan internet / throttle offline, lakukan aksi → ada pesan gagal yang jelas

### [ ] O3: Animasi Halus
- [ ] Ada efek pergerakan: stagger kartu masuk, hover lift, transisi tab/modal
- [ ] Boleh pakai library (`gsap`, `animejs`, `motion`) atau CSS animation murni
- [ ] Tidak berlebihan: durasi 0.2-0.7s, tidak bikin pusing
- [ ] Cara cek: refresh → kartu masuk satu-per-satu dengan halus, tanpa loncat kasar

### [ ] O4: Prettier sebagai Code Formatter
- [ ] `prettier` terdaftar di `package.json` (devDependencies)
- [ ] Ada berkas konfigurasi `.prettierrc` di root
- [ ] Seluruh `src/` sudah diformat (`npm run format` bersih)
- [ ] Cara cek: `npx prettier --check "src/**/*.{js,css,html}"` lolos tanpa error

---

## 3. Rating (Acuan Reviewer)

- `★☆☆☆☆ (1)`: Wajib lolos tapi indikasi plagiat / pakai proyek orang lain ubah konten doang
- `★★☆☆☆ (2)`: Wajib lolos tapi kualitas kode buruk: tidak rapi, komentar sampah, variabel/function tak terpakai
- `★★★☆☆ (3)`: Hanya kriteria wajib terpenuhi
- `★★★★☆ (4)`: Wajib + minimal 2 opsional <- **minimal aman**
- `★★★★★ (5)`: Wajib + minimal 3 opsional <- **TARGET KITA**

> Ditolak = tidak dinilai. Wajib 100% dulu, baru kejar opsional.

---

## 4. Auto-Tolak — Jangan Dilanggar

- [ ] Tidak pakai React / Vue / Angular / framework apapun — wajib vanilla JS
- [ ] Tidak plagiat >70% — semua kode hasil sendiri, referensi hanya inspirasi
- [ ] ZIP tidak berisi `node_modules/`, `.git/`, `dist/` tidak wajib (reviewer akan `npm install && npm run build` sendiri)
- [ ] Wajib ada `package.json` berisi daftar dependencies
- [ ] Nama ZIP: `notes-app.zip`, isi folder proyek langsung jalan via `npm run start-dev`

---

## 5. Struktur Proyek yang Disepakati

```
notes-app-dicoding/
├── submission-rubric.md     # rubric submission 1 (tetap dijaga)
├── submission-rubric-2.md   # file ini (pedoman submission 2)
├── package.json             # scripts: start-dev, build (+ prettier)
├── webpack.common.js        # entry + html-webpack-plugin + css-loader
├── webpack.dev.js           # merge common + devServer
├── webpack.prod.js          # merge common + mode production
├── .prettierrc              # bukti O4
├── src/
│   ├── index.html           # template html-webpack-plugin (tanpa script src manual)
│   ├── styles/
│   │   └── style.css        # Grid + responsive + tema + tabs
│   └── js/
│       ├── api/
│       │   └── notes-api.js # fetch: getNotes, getArchived, create, delete, archive, unarchive
│       ├── components/
│       │   ├── AppBar.js
│       │   ├── NoteForm.js
│       │   ├── NoteList.js
│       │   ├── NoteItem.js  # + tombol Hapus & Arsip/Batal Arsip
│       │   └── LoadingIndicator.js
│       └── main.js          # wiring: load, tabs, event add-note/delete-note/toggle-archive
└── dist/ (hasil build, jangan masuk ZIP)
```

Alur pair programming per modul:
1. Aku jelasin konsep singkat
2. Kamu nulis dulu
3. Aku review + kasih insight

---

## 6. Final Checklist Sebelum ZIP

- [ ] Semua W1-W5 centang
- [ ] Minimal O1, O2 + satu dari O3/O4 centang (untuk ★5: O1+O2+O3+O4 sekalian)
- [ ] `notesData.js` tidak diimport di mana pun
- [ ] Console bersih, Network tab request ke API sukses (200)
- [ ] Test manual: load (loading muncul) → tambah → hapus (konfirmasi) → arsip → batal arsip → tab Aktif/Arsip
- [ ] Test offline: matikan internet → ada pesan error, loading hilang
- [ ] `npm run build` sukses, `npm run start-dev` jalan
- [ ] `rm -rf node_modules dist` sebelum ZIP, ukuran ZIP < 5MB idealnya
- [ ] ZIP dari root folder, bukan nested zip-dalam-zip

Progress: `[....../......]` update tiap modul selesai.

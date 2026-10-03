// Tahap 4: formulir tambah catatan (W2 + W4)
// Pola React: anak kirim data ke atas via event 'add-note' (kayak onAddNote(data)).
class NoteForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    // UX: error baru ditampilkan setelah user nyentuh field (touched).
    // Kalau langsung ditampilkan pas refresh, user kaget "salah apa?".
    this._touched = { title: false, body: false };
  }

  connectedCallback() {
    this.render();
    // Kabel submit dipasang sekali pas element muncul.
    this.shadowRoot
      .querySelector("form")
      .addEventListener("submit", (e) => this._onSubmit(e));
    // O2: validasi tiap ketikan, bukan cuma pas submit.
    this.shadowRoot.querySelector("#title").addEventListener("input", () => {
      this._touched.title = true;
      this._validate();
    });
    this.shadowRoot.querySelector("#body").addEventListener("input", () => {
      this._touched.body = true;
      this._validate();
    });
    this._validate(); // kondisi awal: tombol disabled, tapi pesan disembunyikan
  }

  // TODO(human): aturan validasi realtime (O2). Isi 3 bagian di bawah.
  //
  // Aturan (sesuai rubric):
  // - judul: trim, min 3 karakter, tidak boleh kosong / spasi doang
  // - body: trim, min 10 karakter
  //
  // Trade-off UX:
  // - Pesan spesifik ("Judul min 3 karakter") => user langsung paham, tapi string lebih panjang.
  // - Pesan generik ("Wajib diisi") => simpel, tapi user nebak-nebak kurang berapa.
  // - Tombol disabled selama invalid => cegah submit sampah (disarankan reviewer).
  _validate() {
    const title = this.shadowRoot.querySelector("#title").value.trim();
    const body = this.shadowRoot.querySelector("#body").value.trim();
    const titleErr = this.shadowRoot.querySelector("#title-error");
    const bodyErr = this.shadowRoot.querySelector("#body-error");
    const btn = this.shadowRoot.querySelector("#submit-btn");

    // = tanpa return! return = keluar fungsi seketika.
    let titleMsg = "";
    if (title.length === 0) titleMsg = "Judul wajib diisi.";
    else if (title.length < 3) titleMsg = "Judul minimal berisi 3 karakter.";

    let bodyMsg = "";
    if (body.length === 0) bodyMsg = "Isi wajib diisi.";
    else if (body.length < 10) bodyMsg = "Catatan minimal berisi 10 karakter.";

    // Tombol ikut kondisi asli (tetap disabled pas kosong),
    // tapi pesan hanya ditampilkan kalau field sudah disentuh.
    titleErr.textContent = this._touched.title ? titleMsg : "";
    bodyErr.textContent = this._touched.body ? bodyMsg : "";

    btn.disabled = Boolean(titleMsg || bodyMsg);

    return !(titleMsg || bodyMsg);
  }

  _onSubmit(e) {
    e.preventDefault();
    // Kalau user paksa submit (misal tekan Enter), tandai semua sudah disentuh
    // biar error-nya muncul semua, bukan diam-diam ditolak.
    this._touched.title = true;
    this._touched.body = true;
    if (!this._validate()) return; // tolak kalau masih invalid (O2)
    const titleEl = this.shadowRoot.querySelector("#title");
    const bodyEl = this.shadowRoot.querySelector("#body");

    const title = titleEl.value.trim();
    const body = bodyEl.value.trim();
    if (!title || !body) return;

    const note = {
      id: `notes-${Date.now()}`,
      title,
      body,
      createdAt: new Date().toISOString(),
      archived: false,
    };

    this.dispatchEvent(
      new CustomEvent("add-note", {
        detail: note,
        bubbles: true,
        composed: true,
      }),
    );

    this.shadowRoot.querySelector("form").reset();
    this._touched = { title: false, body: false };
    this._validate(); // habis reset, kunci tombol lagi + sembunyikan error
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; }
        form {
          background: white;
          border-radius: 14px;
          padding: 1.25rem 1.5rem;
          box-shadow: 0 2px 8px rgb(0 0 0 / 0.06);
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        label { font-weight: 600; font-size: 0.9rem; }
        input, textarea {
          font: inherit;
          padding: 0.6rem 0.75rem;
          border: 1.5px solid #ddd;
          border-radius: 8px;
        }
        input:focus, textarea:focus { outline: none; border-color: #00adb5; }
        textarea { min-height: 90px; resize: vertical; }
        .error { color: #d93025; font-size: 0.82rem; margin: -0.4rem 0 0; min-height: 1.1em; }
        button:disabled { background: #ccc; cursor: not-allowed; }
        button:not(:disabled):hover { filter: brightness(0.92); }
        button {
          align-self: flex-start;
          background: #00adb5;
          color: white;
          border: none;
          border-radius: 8px;
          padding: 0.6rem 1.25rem;
          font-weight: 700;
          cursor: pointer;
        }
      </style>
      <form>
        <label for="title">Judul</label>
        <input id="title" type="text" placeholder="cth: Ide liburan" required />
        <p class="error" id="title-error" aria-live="polite"></p>
        <label for="body">Isi</label>
        <textarea id="body" placeholder="Tulis catatanmu di sini..." required></textarea>
        <p class="error" id="body-error" aria-live="polite"></p>
        <button type="submit" id="submit-btn">Tambah Catatan</button>
      </form>
    `;
  }
}

customElements.define("note-form", NoteForm);

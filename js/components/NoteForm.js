// Tahap 4: formulir tambah catatan (W2 + W4)
// Pola React: anak kirim data ke atas via event 'add-note' (kayak onAddNote(data)).
class NoteForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    // Kabel submit dipasang sekali pas element muncul.
    this.shadowRoot
      .querySelector("form")
      .addEventListener("submit", (e) => this._onSubmit(e));
  }

  _onSubmit(e) {
    e.preventDefault();
    const titleEl = this.shadowRoot.querySelector('#title');
    const bodyEl = this.shadowRoot.querySelector('#body');

    const title = titleEl.value.trim();
    const body = bodyEl.value.trim();
    if (!title || !body) return; // validasi minimal, realtime menyusul Tahap 5 (O2)

    const note = {
      id: `notes-${Date.now()}`,
      title,
      body,
      createdAt: new Date().toISOString(),
      archived: false,
    };

    this.dispatchEvent(
      new CustomEvent('add-note', {
        detail: note,
        bubbles: true,
        composed: true,
      }),
    );

    this.shadowRoot.querySelector('form').reset();
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
        button:hover { filter: brightness(0.92); }
      </style>
      <form>
        <label for="title">Judul</label>
        <input id="title" type="text" placeholder="cth: Ide liburan" required />
        <label for="body">Isi</label>
        <textarea id="body" placeholder="Tulis catatanmu di sini..." required></textarea>
        <button type="submit">Tambah Catatan</button>
      </form>
    `;
  }
}

customElements.define("note-form", NoteForm);

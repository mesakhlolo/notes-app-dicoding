class NoteForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    // Pesan error hanya ditampilkan setelah field disentuh user.
    this._touched = { title: false, body: false };
  }

  connectedCallback() {
    this.render();
    this.shadowRoot
      .querySelector('form')
      .addEventListener('submit', (e) => this._onSubmit(e));
    this.shadowRoot.querySelector('#title').addEventListener('input', () => {
      this._touched.title = true;
      this._validate();
    });
    this.shadowRoot.querySelector('#body').addEventListener('input', () => {
      this._touched.body = true;
      this._validate();
    });
    this._validate();
  }

  // Mengembalikan true jika form valid. Mengunci tombol saat invalid.
  _validate() {
    const title = this.shadowRoot.querySelector('#title').value.trim();
    const body = this.shadowRoot.querySelector('#body').value.trim();
    const titleErr = this.shadowRoot.querySelector('#title-error');
    const bodyErr = this.shadowRoot.querySelector('#body-error');
    const btn = this.shadowRoot.querySelector('#submit-btn');

    let titleMsg = '';
    if (title.length === 0) titleMsg = 'Judul wajib diisi.';
    else if (title.length < 3) titleMsg = 'Judul minimal berisi 3 karakter.';

    let bodyMsg = '';
    if (body.length === 0) bodyMsg = 'Isi wajib diisi.';
    else if (body.length < 10) bodyMsg = 'Catatan minimal berisi 10 karakter.';

    titleErr.textContent = this._touched.title ? titleMsg : '';
    bodyErr.textContent = this._touched.body ? bodyMsg : '';

    btn.disabled = Boolean(titleMsg || bodyMsg);

    return !(titleMsg || bodyMsg);
  }

  // Mengirim catatan baru ke atas lewat event 'add-note'.
  _onSubmit(e) {
    e.preventDefault();
    this._touched.title = true;
    this._touched.body = true;
    if (!this._validate()) return;
    const titleEl = this.shadowRoot.querySelector('#title');
    const bodyEl = this.shadowRoot.querySelector('#body');

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
      new CustomEvent('add-note', {
        detail: note,
        bubbles: true,
        composed: true,
      }),
    );

    this.shadowRoot.querySelector('form').reset();
    this._touched = { title: false, body: false };
    this._validate();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; }
        form {
          background: #ffffff;
          border: 1px solid #e7e5e4;
          border-radius: 16px;
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }
        label {
          font-family: 'Geist Mono', ui-monospace, 'Cascadia Code', 'JetBrains Mono', Menlo, Consolas, monospace;
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #78716c;
        }
        input, textarea {
          font-family: 'Geist', -apple-system, 'Segoe UI', Inter, system-ui, sans-serif;
          font-size: 0.9rem;
          padding: 0.65rem 0.8rem;
          border: 1px solid #e7e5e4;
          border-radius: 10px;
          background: #fafaf9;
          color: #1c1917;
        }
        input:focus, textarea:focus {
          outline: none;
          border-color: #ea580c;
          background: #ffffff;
          box-shadow: 0 0 0 3px rgb(234 88 12 / 0.12);
        }
        textarea { min-height: 96px; resize: vertical; line-height: 1.6; }
        .error {
          font-family: 'Geist Mono', ui-monospace, Menlo, Consolas, monospace;
          font-size: 0.75rem;
          color: #dc2626;
          margin: 0;
          min-height: 1.1em;
        }
        button {
          margin-top: 0.25rem;
          align-self: flex-start;
          font-family: 'Geist Mono', ui-monospace, Menlo, Consolas, monospace;
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          background: #ea580c;
          color: white;
          border: none;
          border-radius: 10px;
          padding: 0.65rem 1.25rem;
          cursor: pointer;
          transition: filter 0.15s ease, transform 0.15s ease;
        }
        button:not(:disabled):hover { filter: brightness(0.94); }
        button:not(:disabled):active { transform: translateY(1px); }
        button:disabled { background: #e7e5e4; color: #a8a29e; cursor: not-allowed; }
        @media (max-width: 600px) {
          button { align-self: stretch; text-align: center; }
        }
      </style>
      <form>
        <label for="title">Judul</label>
        <input id="title" type="text" placeholder="cth: Ide liburan" required />
        <p class="error" id="title-error" aria-live="polite"></p>
        <label for="body">Isi</label>
        <textarea id="body" placeholder="Tulis catatanmu di sini..." required></textarea>
        <p class="error" id="body-error" aria-live="polite"></p>
        <button type="submit" id="submit-btn">+ Tambah Catatan</button>
      </form>
    `;
  }
}

customElements.define('note-form', NoteForm);

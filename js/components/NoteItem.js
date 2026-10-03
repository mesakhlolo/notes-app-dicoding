class NoteItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._note = null;
  }

  // Entry point: NoteList mengisi satu objek catatan lewat properti ini.
  set note(data) {
    this._note = data;
    this.render();
  }

  get note() {
    return this._note;
  }

  connectedCallback() {
    if (this._note) this.render();
  }

  render() {
    if (!this._note) return;
    const { title, body, createdAt } = this._note;

    // createdAt disimpan sebagai ISO string, tampilkan dalam format lokal.
    const date = new Date(createdAt)
      .toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
      .toUpperCase();

    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; height: 100%; }
        article {
          background: #ffffff;
          border: 1px solid #e7e5e4;
          border-radius: 16px;
          padding: 1.25rem;
          height: 100%;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          transition: transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease;
        }
        article:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgb(28 25 23 / 0.08);
          border-color: #d6d3d1;
        }
        h3 {
          margin: 0 0 0.5rem;
          font-family: 'Geist', -apple-system, 'Segoe UI', Inter, system-ui, sans-serif;
          font-size: 0.97rem;
          font-weight: 650;
          line-height: 1.4;
          letter-spacing: -0.01em;
          color: #1c1917;
        }
        p {
          margin: 0 0 1.25rem;
          font-family: 'Geist', -apple-system, 'Segoe UI', Inter, system-ui, sans-serif;
          font-size: 0.875rem;
          line-height: 1.65;
          color: #57534e;
          white-space: pre-line;
          flex: 1;
        }
        time {
          font-family: 'Geist Mono', ui-monospace, 'Cascadia Code', 'JetBrains Mono', Menlo, Consolas, monospace;
          font-size: 0.72rem;
          letter-spacing: 0.06em;
          color: #a8a29e;
        }
      </style>
      <article>
        <h3>${title}</h3>
        <p>${body}</p>
        <time>${date}</time>
      </article>
    `;
  }
}

customElements.define('note-item', NoteItem);

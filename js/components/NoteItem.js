// Tahap 3a: kartu per catatan (W1 + W4)
// Cara pakai (kayak props di React): item.note = { id, title, body, createdAt }
class NoteItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._note = null;
  }

  // Dipanggil dari NoteList: element.note = data
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

    // createdAt contoh: "2022-07-28T10:03:12.594Z" (ISO) -> "28 Juli 2022"
    const date = new Date(createdAt).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    // Versi awal (jelek): jalan tapi polos, belum ada hover / aksen.
    this.shadowRoot.innerHTML = `
      <style>
        article {
          background: white;
          border-radius: 12px;
          padding: 1rem 1.2rem;
          box-shadow: 0 2px 8px rgb(0 0 0 / 0.08);
          height: 100%;
        }
        h3 { margin: 0 0 0.5rem; font-size: 1.05rem; }
        p { margin: 0 0 0.75rem; white-space: pre-line; }
        time { font-size: 0.85rem; color: #666; }
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

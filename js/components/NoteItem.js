// Tahap 3a: kartu per catatan (W1 + W4)
// Cara pakai (kayak props di React): item.note = { id, title, body, createdAt }
class NoteItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
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

  // TODO(human): ubah data -> tampilan. Isi 2 bagian di bawah.
  // Bagian 1: format tanggal createdAt (ISO string) jadi "28 Jul 2022" yang readable.
  // Bagian 2: tampilkan title + body + tanggal di shadow DOM.
  //
  // Trade-off:
  // - toLocaleDateString('id-ID', {...}) => "28 Juli 2022", user-friendly, disarankan.
  // - new Date(x).toISOString().slice(0,10) => "2022-07-28", mesin-friendly tapi kaku.
  // - body: tampilkan langsung, atau potong 150 karakter + "..." biar kartu rata?
  //   (potong rapi tapi info kepotong vs full tapi kartu beda tinggi)
  render() {
    if (!this._note) return;
    const { title, body, createdAt } = this._note;

    // createdAt contoh: "2022-07-28T10:03:12.594Z" (ISO) -> "28 Juli 2022"
    const date = new Date(createdAt).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    // Shadow DOM: style luar (style.css) TIDAK masuk ke sini,
    // jadi kartu harus bawa <style>-nya sendiri.
    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; height: 100%; }
        article {
          background: white;
          border-radius: 14px;
          padding: 1.1rem 1.25rem 1rem;
          box-shadow: 0 2px 8px rgb(0 0 0 / 0.07);
          border-top: 4px solid #00adb5;
          height: 100%;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }
        article:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgb(0 0 0 / 0.12);
        }
        h3 { margin: 0 0 0.5rem; font-size: 1.05rem; line-height: 1.35; color: #222831; }
        p {
          margin: 0 0 1rem;
          white-space: pre-line;
          color: #393e46;
          line-height: 1.6;
          flex: 1;
        }
        time { font-size: 0.82rem; color: #888; }
      </style>
      <article>
        <h3>${title}</h3>
        <p>${body}</p>
        <time>${date}</time>
      </article>
    `;
  }
}

customElements.define("note-item", NoteItem);

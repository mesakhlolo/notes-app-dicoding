class NoteList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._notes = [];
  }

  // Entry point: main.js mengisi array catatan lewat properti ini.
  set notes(data) {
    this._notes = Array.isArray(data) ? data : [];
    this.render();
  }

  get notes() {
    return this._notes;
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        .notes-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 1.25rem;
          align-items: stretch;
        }
      </style>
      <div class="notes-grid"></div>
    `;

    const grid = this.shadowRoot.querySelector('.notes-grid');
    // Satu data -> satu <note-item>. Setter .note memicu render kartu.
    this._notes.forEach((note) => {
      const item = document.createElement('note-item');
      item.note = note;
      grid.appendChild(item);
    });
  }
}

customElements.define('note-list', NoteList);

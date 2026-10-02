// Tahap 3b: container grid (W3 + W4). Tugasnya: terima array, lahirkan <note-item>.
class NoteList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._notes = [];
  }

  // Dipanggil dari main.js: list.notes = notesData
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
    // Versi awal (jelek): grid jalan, tapi gap rapat + nama class generik.
    this.shadowRoot.innerHTML = `
      <style>
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 1rem;
        }
      </style>
      <div class="grid"></div>
    `;

    const grid = this.shadowRoot.querySelector('.grid');
    this._notes.forEach((note) => {
      const item = document.createElement('note-item');
      item.note = note; // <-- ini memicu NoteItem.render()
      grid.appendChild(item);
    });
  }
}

customElements.define('note-list', NoteList);

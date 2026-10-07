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
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 1.25rem;
          align-items: stretch;
        }
        /* O3: kartu masuk satu-per-satu, halus 0.4s. */
        note-item {
          animation: card-in 0.4s ease both;
        }
        @keyframes card-in {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      </style>
      <div class="notes-grid"></div>
    `;

    const grid = this.shadowRoot.querySelector('.notes-grid');
    // Satu data -> satu <note-item>. Setter .note memicu render kartu.
    // Delay bertingkat max 0.5s agar tidak kelamaan saat banyak kartu.
    this._notes.forEach((note, i) => {
      const item = document.createElement('note-item');
      item.note = note;
      item.style.animationDelay = `${Math.min(i * 60, 500)}ms`;
      grid.appendChild(item);
    });
  }
}

customElements.define('note-list', NoteList);

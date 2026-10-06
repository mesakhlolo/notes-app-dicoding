class AppBar extends HTMLElement {
  // Atribut yang dipantau: perubahan title/subtitle memicu render ulang.
  static get observedAttributes() {
    return ['title', 'subtitle'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // Render ulang hanya saat nilai benar-benar berubah.
    if (oldValue !== newValue) this.render();
  }

  render() {
    const title = this.getAttribute('title') || 'Notes App';
    const subtitle = this.getAttribute('subtitle') || '';

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          position: sticky;
          top: 0;
          z-index: 10;
        }
        header {
          background: rgba(250, 250, 249, 0.85);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid #e7e5e4;
        }
        .wrap {
          max-width: 1120px;
          margin: 0 auto;
          padding: 0.9rem 1.5rem;
          display: flex;
          align-items: baseline;
          gap: 0.75rem;
        }
        .mark {
          font-family: 'Geist Mono', ui-monospace, 'Cascadia Code', 'JetBrains Mono', Menlo, Consolas, monospace;
          font-size: 0.8rem;
          font-weight: 600;
          color: #ea580c;
          white-space: nowrap;
        }
        h1 {
          margin: 0;
          font-family: 'Geist', -apple-system, 'Segoe UI', Inter, system-ui, sans-serif;
          font-size: 1.05rem;
          font-weight: 650;
          letter-spacing: -0.01em;
          color: #1c1917;
        }
        p {
          margin: 0 0 0 auto;
          font-family: 'Geist', -apple-system, 'Segoe UI', Inter, system-ui, sans-serif;
          font-size: 0.82rem;
          color: #78716c;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        @media (max-width: 600px) {
          p { display: none; }
        }
      </style>
      <header>
        <div class="wrap">
          <span class="mark">~/notes</span>
          <h1>${title}</h1>
          <p>${subtitle}</p>
        </div>
      </header>
    `;
  }
}

customElements.define('app-bar', AppBar);

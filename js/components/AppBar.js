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
        :host { display: block; }
        header {
          background: linear-gradient(135deg, #222831 0%, #393e46 100%);
          color: white;
          padding: 1.75rem 1.5rem;
          text-align: center;
          border-bottom: 4px solid #00adb5;
        }
        h1 { margin: 0; font-size: 1.6rem; letter-spacing: 0.5px; }
        p { margin: 0.35rem 0 0; opacity: 0.75; font-size: 0.95rem; }
      </style>
      <header>
        <h1>${title}</h1>
        <p>${subtitle}</p>
      </header>
    `;
  }
}

customElements.define('app-bar', AppBar);

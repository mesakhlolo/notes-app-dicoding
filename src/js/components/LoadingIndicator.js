class LoadingIndicator extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  // Dipanggil dari main.js: tampil saat fetch mulai, hilang saat selesai.
  show() {
    this.shadowRoot.querySelector('.overlay').style.display = 'flex';
  }

  hide() {
    this.shadowRoot.querySelector('.overlay').style.display = 'none';
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        .overlay {
          display: none;
          position: fixed;
          inset: 0;
          background: rgb(28 25 23 / 0.35);
          align-items: center;
          justify-content: center;
          z-index: 999;
        }
        .spinner {
          width: 36px;
          height: 36px;
          border: 4px solid #e7e5e4;
          border-top-color: #ea580c;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      </style>
      <div class="overlay" aria-live="polite">
        <div class="spinner"></div>
      </div>
    `;
  }
}

customElements.define('loading-indicator', LoadingIndicator);

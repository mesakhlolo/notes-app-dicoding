// Tahap 2: Web Component pertama (W4) + custom attribute (O3)
class AppBar extends HTMLElement {
  // O3: daftar atribut yang dipantau. Kalau berubah di HTML, browser panggil
  // attributeChangedCallback() otomatis.
  static get observedAttributes() {
    return ["title", "subtitle"];
  }

  constructor() {
    super();
    // Shadow DOM: style di dalam sini tidak bocor ke luar, style luar tidak masuk.
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // Dipanggil tiap <app-bar title="..."> berubah. Re-render agar tampilan update.
    if (oldValue !== newValue) this.render();
  }

  render() {
    const title = this.getAttribute("title") || "Notes App";
    const subtitle = this.getAttribute("subtitle") || "";

    // TODO(human): tampilkan title + subtitle di dalam Shadow DOM.
    // Hapus baris kosong di bawah dan isi dengan this.shadowRoot.innerHTML = `...`
    //
    // Contoh kerangka (bebas kamu ubah warnanya):
    // this.shadowRoot.innerHTML = `
    //   <style> ... </style>
    //   <header> <h1>${title}</h1> <p>${subtitle}</p> </header>
    // `;
    //
    // Trade-off desain:
    // - text-align: center => formal kayak aplikasi catatan
    // - text-align: left + padding => modern kayak dashboard
    // - background: pakai var(--text) #222831 biar sama kayak style.css,
    //   atau --accent #00adb5 biar lebih hidup (tapi maks 3-4 warna untuk O1)

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

customElements.define("app-bar", AppBar);

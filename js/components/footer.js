class Footer extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <footer>
        &copy; 2025 marixc. All rights reserved.
        </div>
      </footer>
    `;
  }
}

customElements.define("footer-component", Footer);

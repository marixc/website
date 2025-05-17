// https://www.freecodecamp.org/news/reusable-html-components-how-to-reuse-a-header-and-footer-on-a-website/
class Header extends HTMLElement {
  constructor() {
    super(); // initialize elements properly
  }

  // docs: https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements
  connectedCallback() {
    this.innerHTML = `
    `;
  }
}

customElements.define('header-component', Header);
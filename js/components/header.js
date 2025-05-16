// https://www.freecodecamp.org/news/reusable-html-components-how-to-reuse-a-header-and-footer-on-a-website/
class Header extends HTMLElement {
  constructor() {
    super(); // initialize elements properly
  }

  // docs: https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements
  connectedCallback() {
    this.innerHTML = `
    <style>
      header {
        background: red;
        position: sticky;
        margin: 0;
        padding: 0;
      }
      nav {
        width: 900px;
        max-width: calc(100% - 2em); /* Ensures responsiveness */
        margin: auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.5em 1em;
      }
      nav a {
        color: aqua;
        text-decoration: none;
        padding: 1em;
      }
      body {
        margin-top: 0;
      }
      h2 {
        font-size: 1.2rem;
        margin: 0;
      }
      @media (max-width: 720px) {
        .internal-links {
          display: none;
        }
      }
    </style>
    <header>
      <nav>
        <h2>Hello</h2>
        <div class="internal-links">
          <a href="about.html">About</a>
          <a href="work.html">Work</a>
          <a href="contact.html">Contact</a>
        </div>
        <h2>Hello</h2>
      </nav>
    </header>
    `;
  }
}

customElements.define('header-component', Header);
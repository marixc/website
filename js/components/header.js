// Define the SVG icons outside the class
const sunIcon = `
<svg id="sunIcon" xmlns="http://www.w3.org/2000/svg"
  width="20" height="20" viewBox="0 0 24 24" fill="none"
  stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="4" style="stroke:#1f1f28;"></circle>
  <path d="M12 2v2" style="stroke:#1f1f28;"></path>
  <path d="M12 20v2" style="stroke:#1f1f28;"></path>
  <path d="m4.93 4.93 1.41 1.41" style="stroke:#1f1f28;"></path>
  <path d="m17.66 17.66 1.41 1.41" style="stroke:#1f1f28;"></path>
  <path d="M2 12h2" style="stroke:#1f1f28;"></path>
  <path d="M20 12h2" style="stroke:#1f1f28;"></path>
  <path d="m6.34 17.66-1.41 1.41" style="stroke:#1f1f28;"></path>
  <path d="m19.07 4.93-1.41 1.41" style="stroke:#1f1f28;"></path>
</svg>`;

const moonIcon = `
<svg id="moonIcon" xmlns="http://www.w3.org/2000/svg"
  width="20" height="20" viewBox="0 0 24 24">
  <path fill="white" d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
</svg>`;

class Header extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <style>
        .mode-button {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 40px;
          height: 40px;
          background-color: var(--button-bg);
          border-radius: 8px;
          border: 1px solid var(--button-fg);
          padding: 0;
          cursor: pointer;
        }
        header {
          background: var(--header-bg);
          position: sticky;
          margin: 0;
          padding: 0;
        }
        nav {
          width: 900px;
          max-width: calc(100% - 2em);
          margin: auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.5em 1em;
        }
        nav a {
          color: var(--button-fg);
          text-decoration: underline;
          padding: 1em;
        }
        h2 {
          font-size: 1.2rem;
          margin: 0;
        }
        .dropdown-menu {
          position: absolute;
          right: 0;
          top: 100%;
          background-color: var(--button-bg);
          width: 200px;
          display: none;
          flex-direction: column;
          padding: 0.5rem 0;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          border-radius: 8px;
        }
        #nav-toggle {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
        }
        .icon-container {
          display: inline-block;
          width: 38px;
          height: 38px;
          background-color: var(--button-bg);
          border: 1px solid var(--button-fg);
          border-radius: 8px;
          display: flex;
          justify-content: center;
          align-items: center;
          transition: border-color 0.3s ease;
        }
        .icon-container svg path {
          stroke: #3f9c1b;
        }
        .dropdown-menu li {
          list-style: none;
          padding: 0.5rem 1rem;
        }
        .dropdown-menu a {
          text-decoration: none;
          color: var(--black);
          display: block;
          padding: 0.5rem;
        }
        .dropdown-menu a:hover {
          background: var(--accent-light);
        }
        .dropdown-menu.active {
          display: flex;
        }
        .hello {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          position: relative;
        }
        @media (max-width: 720px) {
          .internal-links {
            display: none;
          }
          #nav-toggle {
            display: block;
          }
        }
      </style>
      <header>
        <nav>
          <h2>marixc</h2>
          <div class="internal-links">
            <a href="about.html">About</a>
            <a href="posts.html">Posts</a>
            <a href="contact.html">Contact</a>
          </div>
          <div class="hello">
            <button onclick="toggleDropdownMenu()" id="nav-toggle" aria-label="Toggle Navigation">
              <div class="icon-container">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                  <path d="M3 6h18M3 12h18M3 18h18"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round" />
                </svg>
              </div>
            </button>
            <div class="dropdown-menu">
              <li><a href="/personal-blog/">Home</a></li>
              <li><a href="/personal-blog/blog">Blog</a></li>
              <li><a href="/personal-blog/about">About</a></li>
              <li><a href="/personal-blog/tags">Tags</a></li>
            </div>
            <button class="mode-button" id="mode-icon" onclick="toggleTheme()"></button>
          </div>
        </nav>
      </header>
    `;

    // Add behavior after DOM insertion
    this.afterRender();
  }

  afterRender() {
    const modeIcon = this.querySelector("#mode-icon");
    const dropdownMenu = this.querySelector(".dropdown-menu");
    const navToggleBtn = this.querySelector("#nav-toggle");

    function detectColors() {
      if (localStorage.getItem("theme") === "dark") {
        document.body.setAttribute("theme", "dark");
        modeIcon.innerHTML = moonIcon;
      } else {
        document.body.setAttribute("theme", "light");
        modeIcon.innerHTML = sunIcon;
      }
    }

    function toggleTheme() {
      if (document.body.getAttribute("theme") === "dark") {
        document.body.setAttribute("theme", "light");
        modeIcon.innerHTML = sunIcon;
        localStorage.setItem("theme", "light");
      } else {
        document.body.setAttribute("theme", "dark");
        modeIcon.innerHTML = moonIcon;
        localStorage.setItem("theme", "dark");
      }
    }

    function toggleDropdownMenu() {
      dropdownMenu.classList.toggle("active");
    }

    detectColors();

    // Attach to global scope so they can be triggered from HTML attributes
    window.toggleTheme = toggleTheme;
    window.toggleDropdownMenu = toggleDropdownMenu;

    // Close dropdown on outside click
    document.addEventListener("click", function (event) {
      if (
        dropdownMenu.classList.contains("active") &&
        !dropdownMenu.contains(event.target) &&
        !navToggleBtn.contains(event.target)
      ) {
        dropdownMenu.classList.remove("active");
      }
    });
  }
}

customElements.define("header-component", Header);

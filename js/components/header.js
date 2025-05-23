class HeaderComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <header class="page-header">
      <nav>
        <div class="hey">
          <img src="images/logo_dark.svg" alt="" class="logo-dark" />
          <img src="images/logo_light.svg" alt="" class="logo" />
        </div>
        <div class="internal-links">
          <a href="about.html">About</a>
          <a href="posts.html">Posts</a>
          <a href="contact.html">Contact</a>
        </div>
        <div class="hello">
          <button class="mode-button" id="mode-icon" aria-label="Toggle Theme"></button>
          <button id="nav-toggle" aria-label="Toggle Navigation">
            <div class="icon-container">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                <path
                  d="M3 6h18M3 12h18M3 18h18"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </button>
          <div class="dropdown-menu">
            <li><a href="/personal-blog/">Home</a></li>
            <li><a href="/personal-blog/blog">Blog</a></li>
            <li><a href="/personal-blog/about">About</a></li>
            <li><a href="/personal-blog/tags">Tags</a></li>
          </div>
        </div>
      </nav>
    </header>
    `;

    this.setupHeaderScripts();
  }

  setupHeaderScripts() {
    const sunIcon = `
      <svg id="sunIcon" xmlns="http://www.w3.org/2000/svg"
        width="20" height="20" viewBox="0 0 24 24" fill="none"
        stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="4" style="stroke:white;"></circle>
        <path d="M12 2v2" style="stroke:white;"></path>
        <path d="M12 20v2" style="stroke:white;"></path>
        <path d="m4.93 4.93 1.41 1.41" style="stroke:white;"></path>
        <path d="m17.66 17.66 1.41 1.41" style="stroke:white;"></path>
        <path d="M2 12h2" style="stroke:white;"></path>
        <path d="M20 12h2" style="stroke:white;"></path>
        <path d="m6.34 17.66-1.41 1.41" style="stroke:white;"></path>
        <path d="m19.07 4.93-1.41 1.41" style="stroke:white;"></path>
      </svg>
    `;

    const moonIcon = `
      <svg id="moonIcon" xmlns="http://www.w3.org/2000/svg"
        width="20" height="20" viewBox="0 0 24 24">
        <path fill="#f5f5f7" d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
      </svg>
    `;

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

    modeIcon.addEventListener("click", toggleTheme);
    navToggleBtn.addEventListener("click", toggleDropdownMenu);

    // Close dropdown on outside click
    document.addEventListener("click", (event) => {
      if (
        dropdownMenu.classList.contains("active") &&
        !dropdownMenu.contains(event.target) &&
        !navToggleBtn.contains(event.target)
      ) {
        dropdownMenu.classList.remove("active");
      }
    });

    // Initialize theme icon on load
    detectColors();
    }
}

customElements.define("header-component", HeaderComponent);

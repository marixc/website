class PostCard extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const title = this.getAttribute('title') || 'No title';
    const href = this.getAttribute('href') || '#';
    const desc = this.getAttribute('description') || '';
    const img = this.getAttribute('img') || '';

    this.innerHTML = `
      <style>
        .card {
          border: 1px solid #ccc;
          border-radius: 10px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          width: 250px;
          transition: transform 0.2s ease;
        }
        .card:hover {
          transform: scale(1.02);
        }
        img {
          width: 100%;
          height: auto;
        }
        .content {
          padding: 1em;
        }
        h3 {
          margin: 0 0 0.5em;
        }
        p {
          margin: 0;
        }
      </style>
      <a href="${href}" class="card">
        ${img ? `<img src="${img}" alt="${title} thumbnail">` : ''}
        <div class="content">
          <h3>${title}</h3>
          <p>${desc}</p>
        </div>
      </a>
    `;
  }
}

customElements.define('post-card', PostCard);

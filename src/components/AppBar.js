class AppBar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <h1 class="app-bar">Notes App</h1>
    `;
  }
}

customElements.define('app-bar', AppBar);

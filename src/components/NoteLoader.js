class NoteLoader extends HTMLElement {
  static get observedAttributes() {
    return ['active'];
  }

  connectedCallback() {
    this.setAttribute('id', 'loading');
    this.render();
  }

  attributeChangedCallback(name, loadingOff, loadingOn) {
    if (name === 'active') {
      const loader = this.querySelector('.loader');
      if (loader) {
        loader.style.display = loadingOn !== null ? 'flex' : 'none';
      }
    }
  }

  render() {
    this.innerHTML = `
      <div class="loader" style="display: none; flex-direction: column; align-items: center; justify-content: center; width: 100%; padding: 2rem;">
        <div class="spinner"></div>
        <p>Memuat catatan...</p>
      </div>
    `;
  }
}

customElements.define('note-loader', NoteLoader);

class NoteItem extends HTMLElement {
  set note(note) {
    this._note = note;
    this.render();
  }

  render() {
    const { title, body, createdAt, archived, id } = this._note;

    this.innerHTML = `
      <div class="note-card">
        <h3 class="note-title">${title}</h3>
        <p>${body}</p>
        <small>${new Date(createdAt).toLocaleString()}</small>
        <div class="note-actions">
          <button class="notes-button archive-btn" title="${
            archived ? 'Buka Arsip' : 'Arsipkan'
          }">
            ${archived ? 'Buka Arsip' : 'Arsipkan'}
          </button>
          <button class="notes-button delete-btn">Hapus</button>
        </div>
      </div>
    `;

    // Event: Hapus
    this.querySelector('.delete-btn').addEventListener('click', () => {
      this.dispatchEvent(
        new CustomEvent('delete-note', {
          detail: id, // hanya kirim ID
          bubbles: true,
        }),
      );
    });

    // Event: Arsip / Buka Arsip
    this.querySelector('.archive-btn').addEventListener('click', () => {
      this.dispatchEvent(
        new CustomEvent('toggle-archive', {
          detail: { id, archived }, // kirim ID dan status
          bubbles: true,
        }),
      );
    });
  }
}

customElements.define('note-item', NoteItem);

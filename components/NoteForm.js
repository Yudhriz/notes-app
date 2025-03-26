class NoteForm extends HTMLElement {
  static get observedAttributes() {
    return ["max-title-length"];
  }

  connectedCallback() {
    const maxTitleLength = this.getAttribute("max-title-length") || 50;

    this.innerHTML = `
      <form class="note-form">
        <input type="text" id="title" name="title" placeholder="Judul Catatan" required minlength="3" maxlength="${maxTitleLength}" aria-describedby="title-error">
        <p class="error" id="title-error"></p>

        <textarea id="body" name="body" placeholder="Isi Catatan" required minlength="10" aria-describedby="body-error"></textarea>
        <p class="error" id="body-error"></p>

        <button type="submit" id="submit">Tambah Catatan</button>
      </form>
    `;

    this.addEventListeners();
  }

  addEventListeners() {
    const form = this.querySelector(".note-form");
    const titleInput = form.elements["title"];
    const bodyInput = form.elements["body"];

    titleInput.addEventListener("input", this.validateField);
    titleInput.addEventListener("blur", this.validateField);
    bodyInput.addEventListener("input", this.validateField);
    bodyInput.addEventListener("blur", this.validateField);

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const isValid = form.checkValidity();
      if (!isValid) {
        this.validateField({ target: titleInput });
        this.validateField({ target: bodyInput });
        return;
      }

      const noteAddedEvent = new CustomEvent("note-added", {
        detail: {
          title: titleInput.value.trim(),
          body: bodyInput.value.trim(),
          createdAt: new Date().toISOString(),
        },
        bubbles: true,
      });

      this.dispatchEvent(noteAddedEvent);
      form.reset();
    });
  }

  validateField(event) {
    const field = event.target;
    const errorElement = document.getElementById(
      field.getAttribute("aria-describedby")
    );

    field.setCustomValidity("");

    if (!field.value.trim()) {
      field.setCustomValidity("Wajib diisi.");
    } else if (field.validity.tooShort) {
      field.setCustomValidity(
        field.name === "title"
          ? "Judul minimal 3 karakter."
          : "Isi catatan minimal 10 karakter."
      );
    }

    errorElement.innerText = field.validationMessage;
  }
}

customElements.define("note-form", NoteForm);

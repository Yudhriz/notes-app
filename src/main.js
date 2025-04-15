import './assets/css/style.css';
import {
  getNotes,
  getArchiveNotes,
  createNote,
  deleteNote,
  archiveNote,
  unarchiveNote,
} from './api/notes-api.js';
import './components/AppBar.js';
import './components/NoteForm.js';
import './components/NoteItem.js';
import './components/NoteLoader.js';
import { showLoading, hideLoading, sleep } from './components/utils.js';
import Swal from 'sweetalert2'; // Import Sweetalert
import { gsap } from 'gsap'; // Import GSAP

document.addEventListener('DOMContentLoaded', async () => {
  const noteContainer = document.querySelector('#note-container');
  const activeTabBtn = document.querySelector('#tab-active');
  const archivedTabBtn = document.querySelector('#tab-archived');

  let currentTab = 'active'; // default tampilan

  async function renderNotes() {
    showLoading();
    try {
      await sleep();
      let notes;
      if (currentTab === 'active') {
        const { data } = await getNotes();
        notes = data.filter((note) => !note.archived);
      } else {
        const { data } = await getArchiveNotes();
        notes = data;
      }

      noteContainer.innerHTML = '';
      notes.forEach((note, index) => {
        const noteElement = document.createElement('note-item');
        noteElement.note = note;

        // Apply animation using GSAP for note items
        gsap.from(noteElement, {
          opacity: 0,
          y: -50,
          delay: index * 0.1,
          duration: 0.5,
        });

        noteElement.addEventListener('delete-note', async (event) => {
          const noteId = event.detail;
          const result = await Swal.fire({
            title: 'Anda yakin?',
            text: 'Catatan ini akan dihapus secara permanen!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Hapus',
            cancelButtonText: 'Batal',
          });

          if (result.isConfirmed) {
            await deleteNote(noteId);
            Swal.fire('Dihapus!', 'Catatan telah dihapus.', 'success');
            renderNotes();
          }
        });

        noteElement.addEventListener('toggle-archive', async (event) => {
          const note = event.detail;
          const action = note.archived ? 'Buka Arsip' : 'Arsipkan';
          const result = await Swal.fire({
            title: `Anda yakin ingin ${action} catatan ini?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: action,
            cancelButtonText: 'Batal',
          });

          if (result.isConfirmed) {
            if (note.archived) {
              await unarchiveNote(note.id);
              Swal.fire(
                'Dibuka!',
                'Catatan telah dibuka dari arsip.',
                'success',
              );
            } else {
              await archiveNote(note.id);
              Swal.fire('Diarsipkan!', 'Catatan telah diarsipkan.', 'success');
            }
            renderNotes();
          }
        });

        noteContainer.appendChild(noteElement);
      });
    } catch (err) {
      noteContainer.innerHTML = `<p>${err.message}</p>`;
    } finally {
      hideLoading();
    }
  }

  // Event: Tambah catatan baru
  document.addEventListener('note-added', async (event) => {
    await createNote(event.detail);
    currentTab = 'active';
    updateTabUI();
    renderNotes();
  });

  // Event: Ganti tab
  activeTabBtn.addEventListener('click', () => {
    currentTab = 'active';
    updateTabUI();
    animateTabSwitch(activeTabBtn); // Tambahkan animasi transisi tab aktif
    renderNotes();
  });

  archivedTabBtn.addEventListener('click', () => {
    currentTab = 'archived';
    updateTabUI();
    animateTabSwitch(archivedTabBtn); // Tambahkan animasi transisi tab arsip
    renderNotes();
  });

  // Fungsi untuk menambahkan animasi pada tombol tab saat dipilih
  function animateTabSwitch(tabBtn) {
    gsap.to(tabBtn, {
      scale: 1.2,
      duration: 0.3,
      ease: 'power2.out',
      yoyo: true,
      repeat: 1,
    });
  }

  function updateTabUI() {
    activeTabBtn.classList.toggle('active', currentTab === 'active');
    archivedTabBtn.classList.toggle('active', currentTab === 'archived');
  }

  renderNotes();
});

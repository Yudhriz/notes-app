const BASE_URL = 'https://notes-api.dicoding.dev/v2';

// Get Notes
export async function getNotes() {
  const response = await fetch(`${BASE_URL}/notes`);
  if (!response.ok) throw new Error('Gagal mengambil data catatan');
  return response.json();
}

// Get Archived Notes
export async function getArchiveNotes() {
  const response = await fetch(`${BASE_URL}/notes/archived`);
  if (!response.ok) throw new Error('Gagal mengambil data catatan archive');
  return response.json();
}

// Get Single Notes
export async function getSingleNotes(noteId) {
  const response = await fetch(`${BASE_URL}/notes/${noteId}`);
  if (!response.ok) throw new Error('Gagal mengambil data catatan archive');
  return response.json();
}

// Create Notes
export async function createNote({ title, body }) {
  const response = await fetch(`${BASE_URL}/notes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, body }),
  });
  if (!response.ok) throw new Error('Gagal menambahkan catatan');
  return response.json();
}

// Delete Notes
export async function deleteNote(noteId) {
  const response = await fetch(`${BASE_URL}/notes/${noteId}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Gagal menghapus catatan');
  return response.json();
}

// Archive Notes
export async function archiveNote(noteId) {
  const response = await fetch(`${BASE_URL}/notes/${noteId}/archive`, {
    method: 'POST',
  });
  if (!response.ok) throw new Error('Gagal mengarsipkan catatan');
  return response.json();
}

// Unarchive Notes
export async function unarchiveNote(noteId) {
  const response = await fetch(`${BASE_URL}/notes/${noteId}/unarchive`, {
    method: 'POST',
  });
  if (!response.ok) throw new Error('Gagal membuka arsip catatan');
  return response.json();
}

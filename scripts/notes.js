let notes = [];
let trashNotes = [];

/* ---------- INIT ---------- */
function init() {
    loadFromLocalStorage();
    renderNotes();
    renderTrashNotes();
    renderFavoriteNotes();
}

/* ---------- ADD NOTE ---------- */
function addNotes() {
    const titleRef = document.getElementById("note_title");
    const textRef = document.getElementById("note_text");

    const title = titleRef.value.trim();
    const text = textRef.value.trim();

    if (!title || !text) return;

    notes.push({
        title,
        text,
        isFavorite: false
    });

    titleRef.value = "";
    textRef.value = "";

    saveToLocalStorage();
    renderNotes();
    renderFavoriteNotes();
}

/* ---------- TOGGLE FAVORITE ---------- */
function toggleFavorite(index) {
    const note = notes[index];
    note.isFavorite = !note.isFavorite;

    saveToLocalStorage();
    renderNotes();
    renderFavoriteNotes();
}

/* ---------- RENDER NOTES ---------- */
function renderNotes() {
    const contentRef = document.getElementById("note-list");
    contentRef.innerHTML = "";

    for (let i = 0; i < notes.length; i++) {
        contentRef.innerHTML += `
            <div class="note">
                <h4>${notes[i].title}</h4>
                <p>${notes[i].text}</p>
                <button onclick="moveToTrash(${i})">🗑</button>
                <button onclick="toggleFavorite(${i})">${notes[i].isFavorite ? "⭐" : "☆"}</button>
            </div>
        `;
    }
}

/* ---------- RENDER FAVORITES ---------- */
function renderFavoriteNotes() {
    const favoriteRef = document.getElementById("favorite_notes");
    favoriteRef.innerHTML = "";

    for (let i = 0; i < notes.length; i++) {
        if (notes[i].isFavorite) {
            favoriteRef.innerHTML += `
                <div class="note">
                    <h4>${notes[i].title}</h4>
                    <p>${notes[i].text}</p>
                    <button onclick="toggleFavorite(${i})">⭐</button>
                </div>
            `;
        }
    }
}

/* ---------- MOVE TO TRASH ---------- */
function moveToTrash(index) {
    const deletedNote = notes.splice(index, 1)[0];
    trashNotes.push(deletedNote);

    saveToLocalStorage();
    renderNotes();
    renderTrashNotes();
    renderFavoriteNotes(); // auch Favoriten aktualisieren
}

/* ---------- RENDER TRASH ---------- */
function renderTrashNotes() {
    const trashRef = document.getElementById("trash_content");
    trashRef.innerHTML = "";

    for (let i = 0; i < trashNotes.length; i++) {
        trashRef.innerHTML += `
           <div class="trashNote">
                <h4>${trashNotes[i].title}</h4>
                <p>${trashNotes[i].text}</p>
                <button onclick="deleteTrashNote(${i})">❌</button>
                <button onclick="restoreNote(${i})">🅰️</button>
           </div>
        `;
    }
}

/* ---------- DELETE FOREVER ---------- */
function deleteTrashNote(index) {
    trashNotes.splice(index, 1);

    saveToLocalStorage();
    renderTrashNotes();
}

/* ---------- RESTORE ---------- */
function restoreNote(index) {
    const restoredNote = trashNotes.splice(index, 1)[0];
    notes.push(restoredNote);

    saveToLocalStorage();
    renderNotes();
    renderTrashNotes();
    renderFavoriteNotes();
}

/* ---------- LOCAL STORAGE ---------- */
function saveToLocalStorage() {
    localStorage.setItem("notes", JSON.stringify(notes));
    localStorage.setItem("trashNotes", JSON.stringify(trashNotes));
}

function loadFromLocalStorage() {
    const notesData = localStorage.getItem("notes");
    const trashData = localStorage.getItem("trashNotes");

    notes = notesData ? JSON.parse(notesData) : [];
    trashNotes = trashData ? JSON.parse(trashData) : [];
}

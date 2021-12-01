"use strict";

// Read Notes From Local Storage If Existing:
const getSavedNotes = () => {

	const notesJSON = localStorage.getItem('notes');

	try {
		return (notesJSON)? JSON.parse(notesJSON): [];
	} catch (e) {
		return [];
	}
}

// Save Notes To LocalStorage:
const saveNotes = (notes) => localStorage.setItem('notes', JSON.stringify(notes));

// Remove a note from list:
const removeNote = (id) => {

	const noteIndex = notes.findIndex((note) => note.id === id);

	if(noteIndex > -1)
		notes.splice(noteIndex, 1);

};

// Generate DOM Structure:
const generateNoteDOM = (note) => {

	const note_elm = document.createElement('a');
	const text_elm = document.createElement('p');
	const status_elm = document.createElement('p');

	// Setup the link:
	note_elm.setAttribute('href', `./note-edit.html#${note.id}`);
	note_elm.classList.add('list-item');

	// Setup the title note:
	text_elm.innerHTML = (note.title.length > 0)? ` <strong>${note.title}</strong>`: ` <strong>Unnamed:</strong>`;
	text_elm.classList.add('list-item__title');
	note_elm.appendChild(text_elm);

	// Setup the status message:
	status_elm.textContent = timeUpdate(note.updatedAt);
	status_elm.classList.add('list-item__subtitle');
	note_elm.appendChild(status_elm);

	return note_elm;

};

// Sort Notes by one of three ways:
const sortNotes = (notes, sortBy) => {

	if(sortBy === 'byEdited') {
		return notes.sort((a, b) => (a.updatedAt > b.updatedAt)? -1: (a.updatedAt < b.updatedAt)? 1: 0);
	} else if(sortBy === 'byCreated') {
		return notes.sort((a, b) => (a.createdAt > b.createdAt)? -1: (a.createdAt < b.createdAt)? 1: 0);
	} else if(sortBy === 'alphabetical') {
		return notes.sort((a, b) => (a.title.toLowerCase() > b.title.toLowerCase())? 1: (a.title.toLowerCase() < b.title.toLowerCase())? -1: 0);
	} else {
		return notes;
	}

};

// Render Application Notes:
const renderNotes = (notes, filters) => {

	const notes_elm = document.getElementById('list-notes');
	notes = sortNotes(notes, filters.sortBy);

	const filteredNotes = notes.filter((note) => note.title.toLowerCase().includes(filters.searchText.toLowerCase()));

	notes_elm.innerHTML = '';

	if(filteredNotes.length > 0) {
		filteredNotes.forEach((note) => {
			const noteElm = generateNoteDOM(note);
			notes_elm.appendChild(noteElm);
		});
	} else {
		const emptyMessage = document.createElement('p');
		emptyMessage.textContent = 'There is no notes to show!';
		emptyMessage.classList.add('empty-message');
		notes_elm.appendChild(emptyMessage);
	}
};

// Generate Text Time Edited:
const timeUpdate = (timestamp) => {

	return `Last edited: ${moment(timestamp).fromNow()}.`;

};
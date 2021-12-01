"use strict";

let notes = getSavedNotes();
const filters = {
	searchText: '',
	sortBy: 'byEdited'
};

renderNotes(notes, filters);

document.querySelector('.input').addEventListener('input', (e) => {

	filters.searchText = e.target.value;
	renderNotes(notes, filters);

});

document.querySelector('#create-note').addEventListener('click', (e) => {

	const noteId = uuidv4();
	const timestamp = moment().valueOf();
	notes.push({
		id: noteId,
		title: 'Unnamed',
		description: '',
		createdAt: timestamp,
		updatedAt: timestamp
	});
	saveNotes(notes);
	location.assign(`./note-edit.html#${noteId}`);

});

document.getElementById('filter-by').addEventListener('change', (e) => {

	filters.sortBy = e.target.value;
	renderNotes(notes, filters);

});

window.addEventListener('storage', (e) => {

	if(e.key === 'notes') {
		notes = JSON.parse(e.newValue);
		renderNotes(notes, filters);
	}

});
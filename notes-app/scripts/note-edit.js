"use strict";

const note_title_elm = document.getElementById('note-title');
const note_description_elm = document.getElementById('note-description');
const btn_note_remove_elm = document.getElementById('btn-note-remove');
const time_passed_elm = document.getElementById('time-passed');

const noteId = location.hash.substring(1);
let notes = getSavedNotes();
let note = notes.find((note) => {
	return note.id === noteId;
});
"use strict";

if(!note) {
	location.assign('./index.html');
}

note_title_elm.value = note.title;
note_description_elm.value = note.description;
time_passed_elm.textContent = timeUpdate(note.updatedAt);

note_title_elm.addEventListener('input', (e) => {

	const title = e.target.value;
	note.title = title;
	note.updatedAt = moment().valueOf();
	time_passed_elm.textContent = timeUpdate(note.updatedAt);
	saveNotes(notes);

});

note_description_elm.addEventListener('input', (e) => {

	const description = e.target.value;
	note.description = description;
	note.updatedAt = moment().valueOf();
	time_passed_elm.textContent = timeUpdate(note.updatedAt);
	saveNotes(notes);

});

btn_note_remove_elm.addEventListener('click', () => {

	removeNote(note.id);
	saveNotes(notes);
	location.assign('./index.html');

});

window.addEventListener('storage', (e) => {

	if(e.key === 'notes') {
		notes = JSON.parse(e.newValue);
		note = notes.find((note) => {
			return note.id === noteId;
		});

		if(note === undefined) {
			location.assign('./index.html');
		}

		note_title_elm.value = note.title;
		note_description_elm.value = note.description;
		time_passed_elm.textContent = timeUpdate(note.updatedAt);
	}

});
"use strict";

const todos = getSavedTodos();
const filters = {
	searchText: '',
	hideCompleted: false
};

const list_todos_elm = document.getElementById('list-todos');
const message_rest_elm = document.getElementById('message-rest');
const todo_search_elm = document.getElementById('todo-search');


renderTodos(todos, filters);

todo_search_elm.addEventListener('input', (e) => {

	filters.searchText = e.target.value;
	renderTodos(todos, filters);

});

const form = document.getElementById('form');
form.addEventListener('submit', (e) => {

	e.preventDefault();

	const newTodo = e.target.elements.titleTodo.value.trim();

	if(newTodo) {
		todos.push({
			id: uuidv4(),
			title: newTodo,
			done: false
		});
		saveTodos(todos);
		renderTodos(todos, filters);
		e.target.elements.titleTodo.value = '';
	}

});

const hideCompleted_elm = document.getElementById('hide-completed');
hideCompleted_elm.addEventListener('change', (e) => {

	filters.hideCompleted = e.target.checked;
	renderTodos(todos, filters);

});
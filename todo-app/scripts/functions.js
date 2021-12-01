"use strict";

// Fetch existing todos from locastorage:
const getSavedTodos = () => {

	const todosJSON = localStorage.getItem('todos');

	try {
		return (todosJSON)? JSON.parse(todosJSON): [];
	} catch (e) {
		return [];
	}
	
};

// Save todos to localstorage:
const saveTodos = (todos) => localStorage.setItem('todos', JSON.stringify(todos));

// Remove todo from list:
const removeTodo = (id) => {

	const todoIndex = todos.findIndex((todo) => {
		return todo.id === id;
	});

	if(todoIndex > -1)
		todos.splice(todoIndex, 1);

};

// Get the Dom Elements for an individual todo:
const generateTodoDOM = (todo) => {

	const new_todo_elm = document.createElement('label');
	const container_elm = document.createElement('div');
	const check_elm = document.createElement('input');
	const spn_elm = document.createElement('span');
	const btn_remove_elm = document.createElement('button');

	// Setup checkbox:
	check_elm.setAttribute("type", "checkbox");
	check_elm.checked = todo.done;
	check_elm.addEventListener('change', () => {
		todo.done = check_elm.checked;
		saveTodos(todos);
		renderTodos(todos, filters);
	});
	container_elm.appendChild(check_elm);

	// Setup todo text:
	spn_elm.textContent = todo.title + ' ';
	container_elm.appendChild(spn_elm);

	new_todo_elm.classList.add('list-item');
	container_elm.classList.add('list-item__container');
	new_todo_elm.appendChild(container_elm);

	// Setup the remove button:
	btn_remove_elm.textContent = 'remove';
	btn_remove_elm.classList.add('button', 'button--text');
	new_todo_elm.appendChild(btn_remove_elm);
	btn_remove_elm.addEventListener('click', () => {
		removeTodo(todo.id);
		saveTodos(todos);
		renderTodos(todos, filters);
	});

	return new_todo_elm;

};

// Get the dom elements for list summary:
const generateSummaryDOM = (filteredTodos) => {

	const incompletedTodos = filteredTodos.filter(item => !item.done);
	return `You have ${incompletedTodos.length} ${incompletedTodos.length !== 1? 'todos': 'todo'} left.`;

};

// Render application todos based on filters:
const renderTodos = (todos, filters) => {

	let filteredTodos = todos.filter((todo) => {

		const searchTextMatch = todo.title.toLowerCase().includes(filters.searchText.toLowerCase());
		const hideCompletedMatch = !filters.hideCompleted || !todo.done;

		return searchTextMatch && hideCompletedMatch;
	});

	list_todos_elm.innerHTML = '';

	if(filteredTodos.length > 0) {
		filteredTodos.forEach((todo) => {
			const todoElm = generateTodoDOM(todo);
			list_todos_elm.appendChild(todoElm);
		});
	} else {
		const empty_message_elm = document.createElement('h3');
		
		empty_message_elm.textContent = 'No todos to shoow!';
		empty_message_elm.classList.add('empty-message');
		list_todos_elm.appendChild(empty_message_elm);
	}

	message_rest_elm.textContent = generateSummaryDOM(filteredTodos);

};
window.storeTodos = {
	get todos(){
		if(localStorage.getItem('todo-store') && localStorage.getItem('todo-store') != '[null]'){
			return JSON.parse(localStorage.getItem('todo-store'))
		}else{
			return [];
		}
	},

	save(){
		localStorage.setItem('todo-store', JSON.stringify(this.todos));
	}
}

window.todoApp = function () {
	return {
		...storeTodos,

		newTodo: '',

		editingTodo: null,

		filter: 'all',

		addTodo(){
			if(!this.newTodo){return}
			this.todos.push({
				id: Date.now(),
				body: this.newTodo,
				completed: false
			});
			this.newTodo = '';
		},

		toggleTodo(todo){
			todo.completed = !todo.completed;
		},

		deleteTodo(todo){
			let position = this.todos.indexOf(todo);
			this.todos.splice(position, 1);
		},

		get activeTodos(){
			return this.todos.filter(todo => !todo.completed);
		},

		get completedTodos(){
			return this.todos.filter(todo => todo.completed);
		},

		startEditing(todo){
			this.editingTodo = todo;
			todo.cachedBody = todo.body;
		},

		completeEditing(todo){
			console.log(todo.body.trim().length);
			if(todo.body.trim().length == 0){
				return this.cancelEditing(todo);
			}

			this.editingTodo = null;
			delete todo.cachedBody;
		},

		cancelEditing(todo){
			todo.body = todo.cachedBody;
			this.completeEditing(todo);
		},

		get filteredTodos(){
			return{
				all: this.todos,
				active: this.activeTodos,
				completed: this.completedTodos
			}[this.filter]
		},

		clearCompletedtodos(){
			this.todos = this.activeTodos;
		},

		get allComplete(){
			return this.todos.length == this.completedTodos.length;
		},

		toggleAlltodos(){
			let allComplete = this.allComplete;

			this.todos.forEach(todo => todo.completed = !allComplete);
		}
	}
}

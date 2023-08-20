(function ($) {
    $.fn.localStorageDriver = (storageKey = 'todoList') => {
        const getTodoList = () => {
            const storedTodos = localStorage.getItem(storageKey);

            return storedTodos ? JSON.parse(storedTodos) : [];
        };

        const storeTodos = (todos) => {
            localStorage.setItem(storageKey, JSON.stringify(todos));
        }

        const findTodoIndex = (todos, identifier) => {
            return todos.findIndex(todo => todo.text === identifier || todo.id === identifier);
        };

        return {
            getTodoList: getTodoList,
            addTodo: function (todo) {
                const todos = getTodoList();

                todos.push(todo);
                storeTodos(todos);
            },
            toggleTodo: function (identifier) {
                const todos = getTodoList();
                const todoIndex = findTodoIndex(todos, identifier);

                if (todoIndex !== -1) {
                    todos[todoIndex].completed = !todos[todoIndex].completed;
                    storeTodos(todos);
                }

                console.log(getTodoList());
            },
            updateTodo: function (identifier, todo) {
                const todos = getTodoList();
                const todoIndex = findTodoIndex(todos, identifier);

                if (todoIndex !== -1) {
                    todos[todoIndex] = { ...todos[todoIndex], ...todo };
                    storeTodos(todos);
                }
            },
            deleteTodo: function (identifier) {
                const todos = getTodoList();
                const todoIndex = findTodoIndex(todos, identifier);

                if (todoIndex !== -1) {
                    todos.splice(todoIndex, 1);
                    storeTodos(todos);
                }
            }
        };
    };
})(jQuery);

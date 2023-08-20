(function ($) {
    $.fn.coreStorage = function (storageDriver, renderer = null) {
        const storage = {};

        storage.getTodoList = function () {
            return storageDriver.getTodoList();
        };

        storage.addTodo = function (todo) {
            storageDriver.addTodo(todo);
        };

        storage.toggleTodo = function (identifier) {
            storageDriver.toggleTodo(identifier);
        };

        storage.updateTodo = function (identifier, todo) {
            storageDriver.updateTodo(identifier, todo);
        };

        storage.deleteTodo = function (identifier) {
            storageDriver.deleteTodo(identifier);
        };

        $(document).on('todo:updated', function (event, data) {
            if (data.listenStorage === false) {
                return;
            }

            try {
                delete (data.listenStorage);
            } catch (e) { }

            if (data.type === 'add') {
                storage.addTodo(data);
            } else if (data.type === 'update') {
                if (data.text) {
                    storage.updateTodo(data.id, data);
                } else {
                    storage.toggleTodo(data.id);
                }
            } else if (data.type === 'delete') {
                storage.deleteTodo(data.id);
            }
        });

        $(document).on('todo:container-added', function () {
            if (typeof renderer === 'function') {
                storage.getTodoList().forEach((todo, index) => {
                    renderer(todo.id ? todo : { ...todo, ...{ id: index + 1 } }, false);
                });
            }
        });

        return storage;
    };
})(jQuery);

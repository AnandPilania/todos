$.fn.editTodo = function () {
    this.on('dblclick', '.todo-item span', function (event) {
        event.stopImmediatePropagation();

        const todoItem = $(this).closest('.todo-item');
        const isCompleted = todoItem.data('status') === 'completed';
        const spanElement = $(this);
        const originalText = spanElement.text();

        const editTextbox = $('<input type="text" class="form-control edit-input">').val(originalText);
        spanElement.replaceWith(editTextbox);

        editTextbox.on('blur keyup', function (event) {
            if (event.type === 'blur' || event.key === 'Enter') {
                const editedText = $(this).val().trim();

                if (editedText !== '') {
                    todoItem.find('.edit-input').replaceWith(spanElement.text(editedText));

                    if (isCompleted) {
                        todoItem.addClass('completed');
                    }

                    $(document).trigger('todo:updated', {
                        type: 'update',
                        id: getTodoId(todoItem),
                        text: editedText,
                    });
                }
            }
        }).focus();
    });

    return this;
};

$.fn.todoCountSummary = function (appendTo = '#todo-init') {
    const _t = this,
        summaryContainer = $('<div class="todo-summary blockquote-footer text-end"></div>');

    $(document).on('todo:container-added', function () {
        _t.find(appendTo).append(summaryContainer);
    });

    function updateSummary() {
        const todos = _t.find('.todo-item'),
            totalTodos = todos.length,
            completedTodos = todos.filter('[data-status="completed"]').length,
            remainingTodos = totalTodos - completedTodos,
            summaryText = `${remainingTodos} todos remaining out of ${totalTodos} (${completedTodos} completed)`;

        summaryContainer.text(summaryText);
    }

    updateSummary();

    $(document).on('todo:updated', updateSummary);

    return _t;
};

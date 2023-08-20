$.fn.todoFilter = function () {
    const _t = this,
        filters = [{
            value: 'all',
            label: 'All'
        },
        {
            value: 'active',
            label: 'Active'
        },
        {
            value: 'completed',
            label: 'Completed'
        }],
        filterContainer = $('<div class="filter-container d-flex justify-content-center"></div>');

    filters.forEach(filter => {
        const button = $(`<button class="btn border mx-2 my-4" data-filter="${filter.value}">${filter.label}</button>`);

        filterContainer.append(button);
    });

    _t.append(filterContainer);

    _t.on('click', '[data-filter]', function () {
        const filterValue = $(this).data('filter'),
            todos = _t.find('.todo-item');

        todos.hide();

        if (filterValue === 'all') {
            todos.show();
        } else {
            todos.filter(`[data-status="${filterValue}"]`).show();
        }
    });

    return _t;
};

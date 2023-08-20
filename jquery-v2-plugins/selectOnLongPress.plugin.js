$.fn.selectOnLongPress = function (ele = '.todo-item') {
    let longPressTimeout;

    $(document).on('mousedown', ele, function () {
        const checkbox = $(this).find('.todo-checkbox');

        longPressTimeout = setTimeout(function () {
            checkbox.prop('checked', !checkbox.is(':checked')).trigger('change');
        }, 500);
    }).on('mouseup mouseleave', ele, function () {
        clearTimeout(longPressTimeout);
    });

    return this;
};

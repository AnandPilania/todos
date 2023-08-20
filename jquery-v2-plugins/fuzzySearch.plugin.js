$.fn.fuzzySearch = function (useFuzzyMatch = false) {
    const _t = this;

    searchInput = $('<input type="text" class="form-control mb-4" placeholder="Search todos...">');

    _t.append(searchInput);

    searchInput.on('input', function () {
        const searchText = $(this).val().trim().toLowerCase(),
            todos = _t.find('.todo-item');

        todos.each(function () {
            const todoText = $(this).find('span').text().toLowerCase();

            if (useFuzzyMatch ? fuzzyMatch(todoText, searchText) : todoText.includes(searchText)) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });

    $(document).on('keydown', function (event) {
        if ((event.ctrlKey || event.metaKey) && event.key === 'f') {
            searchInput.focus();
            event.preventDefault();
        }
    });

    return _t;
};

function fuzzyMatch(text, pattern) {
    const patternLength = pattern.length;
    let patternIndex = 0;

    for (let i = 0; i < text.length && patternIndex < patternLength; i++) {
        if (text[i] === pattern[patternIndex]) {
            patternIndex++;
        }
    }

    return patternIndex === patternLength;
}

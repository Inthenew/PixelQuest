function append(were, text) {
    $(were).append(text);
}
var Div = {
    render: function (text, were) {
        String(text);
        append(were, text);
    },
    find: function (text, what) {
        String(text);

        for (var i = 0; i < text.length; i++) {
            if (text[i] === what) {
                return i;
            }
        }
    }
}

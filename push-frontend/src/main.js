var App = () => {
    const $ = require('jquery');

    $.get('http://localhost:3000/jobs', function (data, status) {
        $.each(data, function (i, item) {
            var s = JSON.stringify(item);
            $("#header div").append('<a href="#" class="list-group-item">' + s + '</a>');
        });
    });
}

module.export = App();
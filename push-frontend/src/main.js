var App = () => {
    const $ = require('jquery');

    $.get('http://localhost:3000/jobs', function (data, status) {
        $.each(data, function (i, item) {
            var s = JSON.stringify(item);
            $("#header ul").append('<li>' + s + '</li>');
        });
    });
}

module.export = App();
const 
    React = require('react'),
    Router = require('react-router'),
    Routes = require('./routes');

    Router.run(Routes, function(Handler){
        React.render(<Handler/>, document.getElementById('app'));
    })


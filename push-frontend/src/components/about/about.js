"use strict";
var React = require('react');

var Task = React.createClass({
    render: function () {
        return (<div className='jumbotron'>
            <h1>task </h1>
            <p> this is a task </p>
        </div>
        )
    }
})

module.exports = Task;
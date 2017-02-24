"use strict";
var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var homePage = React.createClass({
    render: function () {
        return (<div className='jumbotron'>
            <h1>Hi there </h1>
            <p> this is app </p>
            <Link to='about' className='btn btn-primary btn-lg'>Learn More</Link>
        </div>
        );
    }
})

module.exports = homePage;  
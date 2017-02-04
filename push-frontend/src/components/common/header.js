"use strict";
var React = require('react');

var Header = React.createClass({
    render: function () {
        return (
            <nav className='navbar navbar-default'>
                <div className='container-fluid'>
                    <a href='/' className='navbar-brand' />
                    <ul className='nav navbar-nav'>
                        <li><a href='/'>List</a></li>
                        <li><a href='/#task'>Task</a></li>
                        <li><a href='/#about'>About</a></li>
                    </ul>
                </div>
            </nav>
        );
    }
})

module.exports = Header;
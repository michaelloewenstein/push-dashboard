"use strict";
var React = require('react');
var TaskApi = require('../../api/taskApi');
var TaskList = require('./taskList');
var TaskPage = React.createClass({
    getInitialState: function () {
        return {
            authors: []
        };
    },
    componentDidMount: function () {
        if (this.isMounted()) {
            this.setState({ authors: TaskApi.getAllAuthors() });
        }
    },
    render: function () {
        return (<div>
            <h1>Task List</h1>
            <TaskList authors={this.state.authors} />
        </div>)
    }
})

module.exports = TaskPage;
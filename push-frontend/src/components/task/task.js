"use strict";
var React = require('react');
var TaskApi = require('../../api/taskApi');
var Task = React.createClass({
    getInitialState: function () {
        return {
            authors: []
        };
    },
    componentWillMount: function () {
        this.setState({ authors: TaskApi.getAllAuthors() });
    },
    render: function () {
        var createTaskRow = function (task) {
            return (<tr key={task.id}>
                <td><a href={'/#tasks/' + task.id}>{task.id}</a> </td>
                <td>{task.firstName} {task.lastName}</td>
            </tr>)
        };
        return (<div>
            <h1>Tasks</h1 >
            <table className='table'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                    </tr>
                </thead>
                <tbody>{this.state.authors.map(createTaskRow, this)}</tbody>
            </table>
        </div>
        )
    }
})

module.exports = Task;
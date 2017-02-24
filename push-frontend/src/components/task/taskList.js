"use strict";
var React = require('react');

var TaskList = React.createClass({
    render: function () {
        var createTaskRow = function (task) {
            return (<tr key={task.id}>
                <td><a href={'/#tasks/' + task.id}>{task.id}</a> </td>
                <td>{task.firstName} {task.lastName}</td>
            </tr>)
        };
        return (<div>
            <table className='table table-hover'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                    </tr>
                </thead>
                <tbody>{this.props.authors.map(createTaskRow, this)}</tbody>
            </table>
        </div>
        )
    }
})

module.exports = TaskList;
const $ = require('jquery'),
    React = require('react'),
    ReactDom = require('react-dom');
var Home = require('./components/homePage'),
    Task = require('./components/task/task'),
    About = require('./components/about/about'),
    Header = require('./components/common/header');
var App = React.createClass({
    render: function() {
        var Child;
        switch (this.props.route) {
            case 'about': Child = About; break;
            case 'task': Child = Task; break;
            default: Child = Home;
        }
        return (
            <div>
                <Header />
                <Child />
            </div>
        );
    }
});

function render() {
    var route = window.location.hash.substr(1);
    ReactDom.render(<App route={route} />, document.getElementById('app'))
}
window.addEventListener('hashchange', render);
render();


import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from "./app";
import 'bootstrap/dist/css/bootstrap.min.css';


class Root extends Component {
    render() {
        return (
            <App />
        )
    }
}

if (document.getElementById('root')) {
    ReactDOM.render(<Root />, document.getElementById('root'));
}

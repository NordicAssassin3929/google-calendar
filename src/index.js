import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import {Home} from "./containers/Home";
import {Login} from "./containers/Login";

function App() {
    return (
        <Router>
            <Route exact path="/" component={Login}  />
            <Route exact path="/home" component={Home} />
        </Router>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));


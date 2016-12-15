import React from 'react';
import {Router, Route, Redirect, hashHistory} from 'react-router';
import App from './App';

const Root = () => (
    <Router history={hashHistory}>
        <Route path='/category=(:categoryId)&task=(:taskId)&filter=(:filter)&search=(:search)' component={App}/>

        <Redirect from="/" to='/category=(:categoryId)&task=(:taskId)&filter=(:filter)&search=(:search)'/>
    </Router>
);

export default Root;

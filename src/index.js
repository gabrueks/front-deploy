import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import { LoginPage } from './pages/login-page/LoginPage';
import { RegisterPage } from './pages/register-page/RegisterPage';
import { HomePage } from './pages/home-page/HomePage';

import { Redirect } from 'react-router';

import './index.css';

const PrivateRoute = ({ component: Component, ...rest}) => (
    <Route {...rest} render={(props) => (
        (localStorage.getItem('x-access-token'))
            ? <Component {...props}/>
            : <Redirect to='/'/>
    )}/>
);

const NonPrivateRoute = ({ component: Component, ...rest}) => (
    <Route {...rest} render={(props) => (
        (!localStorage.getItem('x-access-token'))
            ? <Component {...props}/>
            : <Redirect to='/home/home'/>
    )}/>
);

ReactDOM.render(
    <BrowserRouter>
        <div>
            <NonPrivateRoute exact path="/" component={LoginPage} />
            <NonPrivateRoute exact path="/create-account" component={RegisterPage} />
            <PrivateRoute exact path="/home/:action" component={HomePage}/>
            <PrivateRoute exact path="/home" component={HomePage}/>
        </div>
    </BrowserRouter>,
     document.getElementById('root')
);

serviceWorker.unregister();

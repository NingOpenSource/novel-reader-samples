import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import BookList from './page/BookList'
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route } from 'react-router-dom';

/**
 * 
 */
ReactDOM.render(
    (<BrowserRouter>
        <div>
            <Route exact path="/" component={App} />
            <Route path="/books/:type" component={BookList}/>
        </div>
    </BrowserRouter>),
    document.getElementById('root'));
registerServiceWorker();

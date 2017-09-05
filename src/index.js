import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import BookListOfCategory from './page/BookListOfCategory'
import BookListOfRank from './page/BookListOfRank'
import BookListOfSearch from './page/BookListOfSearch'
import ChapterList from './page/ChapterList'
import ChapterContent from './page/ChapterContent'
import BookDetail from './page/BookDetail'
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route } from 'react-router-dom';

/**
 * 
 */
ReactDOM.render(
    (<BrowserRouter>
        <div>
            <Route exact path="/" component={App} />
            <Route path="/books/category" component={BookListOfCategory} />
            <Route path="/books/rank" component={BookListOfRank} />
            <Route path="/books/search" component={BookListOfSearch} />
            <Route path="/books/detail" component={BookDetail} />
            <Route path="/chapter/list" component={ChapterList} />
            <Route path="/chapter/content" component={ChapterContent} />
        </div>
    </BrowserRouter>),
    document.getElementById('root'));
registerServiceWorker();

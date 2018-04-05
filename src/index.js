import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import NewsPress from './NewsPress'
import NewsPressRedux from './NewsPressRedux'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<NewsPressRedux key='7' />, document.getElementById('root'));
registerServiceWorker();

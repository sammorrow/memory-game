import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/GameManager';
import registerServiceWorker from './utils/registerServiceWorker';
import { Provider } from 'react-redux';
import store from './store'
import './assets/style.css';

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();

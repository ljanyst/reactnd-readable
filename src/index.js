import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ReadableApp from './components/ReadableApp';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<ReadableApp />, document.getElementById('root'));
registerServiceWorker();

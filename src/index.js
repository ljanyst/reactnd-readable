import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ReadableApp from './components/ReadableApp';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <ReadableApp />
  </BrowserRouter>,
  document.getElementById('root'));
registerServiceWorker();

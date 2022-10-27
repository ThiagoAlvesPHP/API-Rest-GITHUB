// LIBs
import React from 'react';
import ReactDOM from 'react-dom';

// CONTEXT
import { ContextProvider } from './core/contexts';

// ROUTER
import Router from './core/router';

// STYLE
import './config.scss';

ReactDOM.render(
  <React.StrictMode>
    <ContextProvider>
      <Router />
    </ContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

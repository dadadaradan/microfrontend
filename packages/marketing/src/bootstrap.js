import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createMemoryHistory, createBrowserHistory } from 'history';

export const mount = (el, { onNavigate, defaultHistory, initialPath }) => {
  const history =
    defaultHistory || createMemoryHistory({ initialEntries: [initialPath] });

  history.listen(onNavigate);

  ReactDOM.render(<App history={history} />, el);

  return {
    onContainerNavigate({ pathname: nextPathname }) {
      if (history.location.pathname !== nextPathname) {
        history.push(nextPathname);
      }
    },
  };
};

if (process.env.NODE_ENV === 'development') {
  const elem = document.querySelector('#marketing-root');

  if (elem) {
    mount(elem, { defaultHistory: createBrowserHistory() });
  }
}

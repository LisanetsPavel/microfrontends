import React from 'react';
import ReactDom from 'react-dom';
import App from "./App";
import { createMemoryHistory, createBrowserHistory } from 'history';

const mount = (el, { onNavigate, defaultHistory }) => {
    const history = defaultHistory ||  createMemoryHistory();

    if (onNavigate) {
        history.listen(onNavigate);
    }

    ReactDom.render(<App history={history} />, el)

    return {
        onNavigateParent: ({ pathname: nextPathname }) => {
            if (history.location.pathname !== nextPathname) {
                history.push(nextPathname);
            }
        }
    }
}

if (process.env.NODE_ENV === 'development') {
   const el = document.querySelector('#_marketing-dev-root');

   if (el) {
       mount(el, { defaultHistory: createBrowserHistory()});
   }
}

export { mount };

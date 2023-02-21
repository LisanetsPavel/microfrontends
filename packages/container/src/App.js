import React, { lazy, Suspense, useEffect, useState } from 'react';
import Header from "./components/Header";
import { BrowserRouter, Redirect, Route, Router, Switch } from "react-router-dom";
import { createGenerateClassName, StylesProvider } from "@material-ui/core";
import Progress from "./components/Progress";
import { createBrowserHistory } from 'history';

const MarketingLazy = lazy(() => import('./components/MarketingApp'))
const AuthLazy = lazy(() => import('./components/AuthApp'))
const DashboardLazy = lazy(() => import('./components/DashboardApp'))

const generateClassName = createGenerateClassName({
    productionPrefix: 'co'
})

const history = createBrowserHistory();

export default () => {
    const [ isSignIn, setIsSignIn ] = useState(false);

    useEffect(() => {
       if (isSignIn) {
           history.push('/dashboard')
       }
    }, [isSignIn])

    return <StylesProvider generateClassName={generateClassName}>
        <Router history={history}>
            <div>
                <Header isSignIn={isSignIn} onSignOut={() => setIsSignIn(false)} />
                <Suspense fallback={<Progress />}>
                    <Switch>
                        <Route path='/auth'>
                        <AuthLazy onSignIn={() => setIsSignIn(true)} />
                        </Route>
                        <Route path='/dashboard'>
                            { !isSignIn && <Redirect to='/' /> }
                            <DashboardLazy />
                        </Route>
                        <Route path='/' component={MarketingLazy} />
                    </Switch>
                </Suspense>
            </div>
        </Router>
    </StylesProvider>
}

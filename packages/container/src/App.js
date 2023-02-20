import React, { lazy, Suspense, useState } from 'react';
import Header from "./components/Header";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { createGenerateClassName, StylesProvider } from "@material-ui/core";
import Progress from "./components/Progress";

const MarketingLazy = lazy(() => import('./components/MarketingApp'))
const AuthLazy = lazy(() => import('./components/AuthApp'))

const generateClassName = createGenerateClassName({
    productionPrefix: 'co'
})

export default () => {

    const [ isSignIn, setIsSignIn ] = useState(false);

    return <StylesProvider generateClassName={generateClassName}>
        <BrowserRouter>
            <div>
                <Header isSignIn={isSignIn} onSignOut={() => setIsSignIn(false)} />
                <Suspense fallback={<Progress />}>
                    <Switch>
                        <Route path='/auth'>
                        <AuthLazy onSignIn={() => setIsSignIn(true)} />
                        </Route>
                        <Route path='/' component={MarketingLazy} />
                    </Switch>
                </Suspense>
            </div>
        </BrowserRouter>
    </StylesProvider>
}

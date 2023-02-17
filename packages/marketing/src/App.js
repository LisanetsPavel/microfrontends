import React from 'react';
import { StylesProvider, createGenerateClassName } from "@material-ui/core";
import { Router, Route, Switch } from "react-router-dom";
import Pricing from "./components/Pricing";
import Landing from "./components/Landing";

const generateClassName = createGenerateClassName({
    productionPrefix: 'ma'
})

export default ({ history }) => {
    return <div>
        <StylesProvider generateClassName={generateClassName}>
            <Router history={history}>
                <Switch>
                    <Route exact path="/pricing" component={Pricing}/>
                    <Route path="/" component={Landing}/>
                </Switch>
            </Router>
        </StylesProvider>
    </div>
}

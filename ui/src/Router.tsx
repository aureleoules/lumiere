import React from 'react';
import history from './history';

import {Router, Switch, Route} from 'react-router-dom';

import Home from './pages/Home';
import Block from './pages/Block';
import Blocks from './pages/Blocks';
import Address from './pages/Address';
import Transaction from './pages/Transaction';

export default function(props: any) {
    return (
        <Router history={history}>
            <Switch>
                <Route exact path="/" component={Home}/>

                <Route exact path="/blocks" component={Blocks}/>
                <Route exact path="/block/:hash" component={Block}/>

                <Route exact path="/tx/:hash" component={Transaction}/>
                <Route exact path="/address/:address" component={Address}/>
            </Switch>
        </Router>
    )
}
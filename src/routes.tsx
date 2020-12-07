import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'


import HomesMap from './pages/HomesMap';

import Place from './pages/Place';
import CreatePlaces from './pages/CreatePlaces'




function Routes(){

    return(
        <BrowserRouter>
        <Switch>
       
            <Route exact path="/"  component={HomesMap} />
            <Route path="/places/create"  component={CreatePlaces}/>
            <Route path="/places/:id"  component={Place} />

        </Switch>
        </BrowserRouter>
    );
}

export default Routes
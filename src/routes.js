import React from 'react';
import { BrowserRouter,Switch,Route } from 'react-router-dom';
import mainpage from './Pages/mainpage/index';

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={mainpage} />
            </Switch>
        </BrowserRouter>
    );
}
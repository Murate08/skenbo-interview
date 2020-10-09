import React from 'react'

import {BrowserRouter, Route} from 'react-router-dom'
import Landing from './pages/Landing'
import LibraryForm from './pages/LibraryForm'
import WordsList from './pages/WordsList'


function Routes(){
    return(
        <BrowserRouter>
                <Route path="/" exact component={Landing} />
                <Route path="/find-words" component={WordsList} />
                <Route path="/library" component={LibraryForm} />
        </BrowserRouter>
    )
}
export default Routes;
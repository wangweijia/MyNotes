import React, {Component} from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import HomePage from './project/home/HomePage';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Route path="/home" component={HomePage}/>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;

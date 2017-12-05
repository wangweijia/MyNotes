import React, {Component} from 'react';
import { Route } from 'react-router-dom';

import Test3_1 from './test3_1/Test3_1';

export default class Test3 extends Component {
    render() {
        return (
            <div style={{display: 'flex', backgroundColor: 'yellow'}}>
                test3------------------
                <Route path='/home/test3/test3_1' component={Test3_1}/>
                test3++++++++++++++++++
            </div>
        );
    }
}

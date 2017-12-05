import React, {Component} from 'react';
import { Route } from 'react-router-dom';

import Test1 from '../notes/test1/Test1';
import Test2 from '../notes/test2/Test2';
import Test2_1 from '../notes/test2/test2_1/Test2_1';
import Test3 from '../notes/test3/Test3';

export default class RouteList extends Component {

    renderRoutes() {
        return (
            <div>
                <Route path={`${this.props.match.url}/test1`} component={Test1}/>
                <Route path={`${this.props.match.url}/test2`} component={Test2}/>
                <Route path={`${this.props.match.url}/test2/test2_1`} component={Test2_1}/>
                <Route path={`${this.props.match.url}/test3`} component={Test3}/>
            </div>
        )
    }

    render() {
        var height = window.innerHeight;
        return (
            <div style={{display: 'flex', flexDirection: 'column', flex: 1, backgroundColor: 'red', minHeight: height}}>
                {this.renderRoutes()}
            </div>
        );
    }
}

import React, {Component} from 'react';

import RouteList from '../src/RouteList';
import RouteContent from '../src/RouteContent';

export default class HomePage extends Component {
    render() {
        return (
            <div style={{display: 'flex', flex: 1}}>
                <RouteList match={this.props.match}/>
                <RouteContent match={this.props.match}/>
            </div>
        );
    }
}

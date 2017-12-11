import React, {Component} from 'react';
import { Route } from 'react-router-dom';
import { myRoutes } from './ComponentRoutes';

export default class RouteList extends Component {
    renderRoutes(items) {
        return (
            <div>
                {items.map((item, index)=>{
                    return (
                        <div key={index}>
                            <Route exact={item.exact} path={`${this.props.match.url}${item.path}`} component={item.component}/>
                            {item.haveChildern && this.renderRoutes(item.childern)}
                        </div>
                    )
                })}
            </div>
        )
    }

    render() {
        var height = window.innerHeight;
        return (
            <div style={{display: 'flex', flexDirection: 'column', flex: 1, backgroundColor: 'white', minHeight: height}}>
                {this.renderRoutes(myRoutes)}
            </div>
        );
    }
}

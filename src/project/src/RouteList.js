import React, {Component} from 'react';
import { Link, BrowserRouter } from 'react-router-dom';
import { myRoutes } from './ComponentRoutes';

export default class RouteList extends Component {
    renderList(items) {
        return (
            <div>
                {items.map((item, index)=>{
                    return (
                        <div key={index}>
                            <ListItem item={item} match={this.props.match}/>
                        </div>
                    )
                })}
            </div>
        )
    }

    render() {
        return (
            <div style={{display: 'flex', flexDirection: 'column', width: 250}}>
                {this.renderList(myRoutes)}
            </div>
        );
    }
}

class ListItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: true
        }
    }

    render() {
        var item = this.props.item;
        var paddingLeft = 10 * item.level + 15;
        var haveChildern = item.haveChildern;
        var open = this.state.open && haveChildern;
        return (
            <div style={{paddingLeft: paddingLeft, backgroundColor: 'white'}} onClick={(event)=>{
                this.setState({
                    open: !this.state.open
                })
                event.stopPropagation();
            }}>
                <Link to={`${this.props.match.url}${item.path}`}>{item.name}</Link>
                {open && item.childern.map((item, index)=>{
                    return (
                        <ListItem key={index} item={item} match={this.props.match}/>
                    )
                })}
            </div>
        );
    }
}

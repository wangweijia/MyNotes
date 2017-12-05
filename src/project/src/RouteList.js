import React, {Component} from 'react';
import { Link } from 'react-router-dom';

var routeJson = require('./route.json');

export default class RouteList extends Component {

    renderList(items) {
        return (
            <div>
                {items.map((item, index)=>{
                    return (
                        <div key={index}>
                            <ListItem item={item}/>
                        </div>
                    )
                })}
            </div>
        )
    }

    render() {
        return (
            <div style={{display: 'flex', flexDirection: 'column', width: 250}}>
                {this.renderList(routeJson)}
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
        var marginLeft = 15 * item.level + 15;
        var haveChildern = item.haveChildern;
        var open = this.state.open && haveChildern;
        return (
            <div style={{marginLeft: marginLeft}} onClick={()=>{
                console.log(`${item.name} onClick`);
                
            }}>
                <Link to={item.map}>{item.name}</Link>
                {open && item.childern.map((item, index)=>{
                    return (
                        <ListItem key={index} item={item}/>
                    )
                })}
            </div>
        );
    }
}

import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { myRoutes } from './ComponentRoutes';

export default class RouteList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showMenu: true
        }
    }

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
        var height = window.innerHeight;
        var width = this.state.showMenu?250:0;
        var padding = this.state.showMenu?15:0;
        return (
            <div style={{display: 'flex', heigh: height}}>
                <div style={{display: 'flex', flex:1, flexDirection: 'column', padding: padding, width: width}}>
                    {this.renderList(myRoutes)}
                </div>
                <div style={{display: 'flex', width: 15, backgroundColor: 'blue'}} onClick={(event)=>{
                    this.setState({
                        showMenu: !this.state.showMenu
                    })
                }}/>
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
        var paddingLeft = 10 * item.level;
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

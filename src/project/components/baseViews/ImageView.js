import React, {Component} from 'react';

export default class ImageView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <img style={{...this.props.style}} src={this.props.src}/>
            </div>
        );
    }
}

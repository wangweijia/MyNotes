import React, {Component} from 'react';
import {HttpHelper} from '../base/HttpHelper';

export default class CodeView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            codeText: '',
            codeArray: []
        }

        this.getCodeText(this.props.src);
    }

    getCodeText(path) {
        var url = window.origin + path;
        HttpHelper.getText(url,{}, (response)=>{
            var codes = response.split('\n');
            this.setState({
                codeText: response,
                codeArray: codes
            })
        }, (error)=>{
            console.log("error");
        })
    }

    renderCopyView() {
        return (
            <div>copy</div>
        )
    }

    render() {
        return (
            <pre style={{backgroundColor: '#f5f5f5', overflow: "auto", padding: 20, ...this.props.style}}>
                {
                    this.state.codeArray.map((item, index) => {
                        var str = `${item}\n`;
                        return (
                            <span key={index}>{str}</span>
                        )
                    })
                }
            </pre>
        );
    }
}

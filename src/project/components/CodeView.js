import React, {Component} from 'react';
import {HttpHelper} from '../base/HttpHelper';

export default class CodeView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            codeText: '',
            codeArray: []
        }

        this.getCodeText(this.props.path);
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
            <div style={{backgroundColor: '#f5f5f5', overflow: "auto", padding: 20, ...this.props.style}}>
                {
                    this.state.codeArray.map((item, index)=>{
                        if (item.length === 0) {
                            return (
                                <div key={index} style={{height: 8, width: 1}}/>
                            )
                        }
                        var nCount = 0;
                        for (var i = 0; i < item.length; i++) {
                            var c = item[i];
                            if (c === ' ') {
                                nCount ++;
                            } else {
                                break;
                            }
                        }

                        return (
                            <div style={{paddingLeft: nCount*8}} key={index}>{item}</div>
                        )
                    })
                }
                {this.renderCopyView()}
            </div>
        );
    }
}

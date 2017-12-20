import React, {Component} from 'react';

export default class PageView extends Component {
    constructor(props) {
        super(props);

        var children = this.props.children;
        var texts = [];
        if (typeof(children) === 'string') {
            texts = this.initText(children);
        }

        this.state = {
            baseText: children,
            texts: texts
        }
    }

    componentWillReceiveProps(nextProps) {
        var children = nextProps.children;
        if (this.state.baseText.length !== children.length) {
            var texts = [];
            if (typeof(children) === 'string') {
                texts = this.initText(children);
            }
            this.setState({
                texts: texts
            })
        }
    }

    initText(str) {
        var texts = str.split('\n');
        // texts = texts.filter((item) => {
        //     return item.length > 0;
        // })

        var newTexts = [];
        var flag = false;
        texts.map((item, index) => {
            if (!flag && item.length > 0) {
                flag = true;
            }
            if (flag) {
                newTexts.push(item);
            }
        })

        var nCount = 0;
        for (var i = 0; i < newTexts.length; i++) {
            var text = newTexts[i];

            if (i === 0) {
                for (var j = 0; j < text.length; j++) {
                    var c = text[j];
                    if (c === ' ') {
                        nCount = j + 1;
                    } else {
                        break;
                    }
                }
            }
            var t = text.substring(nCount);
            newTexts[i] = t + '\n';
        }

        return newTexts;
    }

    renderText(text) {
        return (
            <div>
                <pre>
                    {text.map((item, index) => {
                        return (
                            <span key={index}>
                                {item}
                            </span>
                        )
                    })}
                </pre>
            </div>
        )
    }

    render() {
        return (
            <div style={{...this.props.style}}>
                {this.renderText(this.state.texts)}
            </div>
        );
    }
}

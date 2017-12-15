import React, {Component} from 'react';

export default class PageView extends Component {
    constructor(props) {
        super(props);

        var children = this.props.children;
        var texts = [];
        if (typeof(children) == 'string') {
            console.log("message");

            texts = this.initText(children);
        }

        this.state = {
            texts: texts
        }
    }

    initText(str) {
        var texts = str.split('\n');
        texts = texts.filter((item) => {
            return item.length > 0;
        })

        var nCount = 0;
        for (var i = 0; i < texts.length; i++) {
            var text = texts[i];

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
            texts[i] = t + '\n';
        }

        return texts;
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

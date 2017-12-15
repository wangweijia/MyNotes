import React, {Component} from 'react';
import CodeView from '../../../components/CodeView';
import ImageView from '../../../components/ImageView';
import PageView from '../../../components/PageView';

export default class Com1513235259 extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={{display: 'flex', flex: 1, flexDirection: 'column', padding: 20}}>
                <div>
                    block 有如下3种类型：
                    <li>NSStackBlock    存储于栈区</li>
                    <li>NSGlobalBlock   存储于程序数据区</li>
                    <li>NSMallocBlock   存储于堆区</li>
                </div>
                <a href='http://www.jianshu.com/p/6568f245deb2'>具体说明</a>
                <div>
                    测试代码如下：
                    <CodeView src={require('./src/codeText1.m')} style={{height: 300}}/>
                </div>
                <div>
                    <div>
                        结果如下：
                    </div>
                    <ImageView src={require('./src/image1.png')} style={{width: 700}}/>
                </div>

                <PageView style={{fontSize: 20}}>
                    {`
                        1、如结果输出，在ARC的情况下，调用了外部变量的block，会自动copy到堆区，成为__NSMallocBlock__
                        2、__NSGlobalBlock__不受copy影响
                    `}
                </PageView>
            </div>
        );
    }
}

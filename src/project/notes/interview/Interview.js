import React, {Component} from 'react';

export default class Interview extends Component {
    render() {
        return (
            <div style={{display: 'flex', flex: 1, flexDirection: 'column', padding: 20}}>
                <div style={{margin: 20, fontSize: 35}}>
                    主要记录了各次面试碰到的问题
                </div>
                <div>
                    <li>iOS上打包方面的，描述文件（内部组成），app中包含描述文件的信息</li>
                    <li>内存泄露的检查，工具</li>
                    <li>lldb的一些简单使用</li>
                    <li>view 方面的问题（view与layout）</li>
                    <li>控制器的生命周期，loadview与viewdidload</li>
                    <li>
                        block方面的问题（block的3种类型）
                        <a href='http://www.jianshu.com/p/6568f245deb2'>answer</a>
                    </li>
                    <li>GCD多线程方面的问题，锁</li>
                    <li>绘画，动画</li>
                    <li>js 方法中变量的作用域</li>
                </div>
            </div>
        );
    }
}

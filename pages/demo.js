/**
 * Created by eatong on 18-1-27.
 */
import React, {Component} from 'react';
import {Page, Title, Footer} from '~components';


class Demo extends Component {

  static async init(ctx) {
  }

  render() {
    const {} = this.props;
    return (
      <div className="hero is-fullheight">
        <Title>demo列表</Title>
        <div className="hero-body">
          <div className="container">
            <ul>
              <li>
                <a href="/static/demo/summary/index.html">个人工作总结</a>
                <p className="content has-text-grey">2017年度工作总结及2018年度工作计划，采用 <code>impress.js</code>编制 </p>
                <br/>
              </li>
              <li>
                <a href="/static/demo/preview-image/index.html">m-preview-image</a>
                <p className="content has-text-grey"><code>m-preview-image</code>使用样例。<code>m-preview-image</code>是一个
                  纯js，不依赖任何库的小插件，用以在移动端进行图片预览。加入了平滑模式来保证体验性，并且为了保证不浪费流量，每次只加载相关的三个
                  （当前图片，上一张，下一张），可以利用smoothly参数进行关闭。
                </p>
              </li>
            </ul>
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}

Demo.propTypes = {};
export default Page(Demo);

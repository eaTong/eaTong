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

/**
 * Created by eatong on 17-11-23.
 */
import React, {Component} from 'react';
import {Page} from '~components';
import Link from 'next/link';
import Head from 'next/head'
import {inject, observer} from 'mobx-react'


@inject() @observer
class AboutMe extends Component {

  static async init() {
  }

  render() {
    const {} = this.props;
    return (
      <div className="hero">
        <div className="hero-body">
          <div className="container">
            <div className="title">Who am I?</div>
            <div className="column content">
              eaTong , a frontend engineer , maybe not only a frontend engineer .I graduated from NanChang Univisty at
              2012,Before being a fronted engineer,I had three jobs: <code>electric engineer</code> , <code>Operation
              Engineer</code> ,
              <code>Java Engineer</code> .My work is frontend and what I use is <code>React</code> ,
              <code>React-native</code> ,
              <code>nodejs</code> and so on.
              <br/>

            </div>
            <div className="column content">
              周夷东，前端开发工程师，希望自己不只是个前端。12年毕业于南昌大学，后分别从事过 <code>“电气工程师”</code>，
              <code>"运维工程师"</code>，<code>Java开发工程师</code>，目前职位为：<code>前端开发工程师</code>。主要技术栈为前端
              及相关衍生生态，如 <code>React</code> ，<code>React-native</code>，<code>electron</code>,<code>nodejs</code>等。
            </div>
            <div className="title">How I wrote this website?</div>
            <div className="column content">

            </div>
            <div className="column content">
              主要运用技术栈为 <code>koa</code> , <code>Next.js</code> , <code>mongodb</code> , <code>bulma</code>
              ，<code>Mobx</code>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AboutMe.propTypes = {};
export default Page(AboutMe);

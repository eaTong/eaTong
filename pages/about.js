/**
 * Created by eatong on 17-11-23.
 */
import React, {Component} from 'react';
import {Page, Footer} from '~components';
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
        <div className="hero-head">
          <Head>
            <title>关于</title>
          </Head>
          <div className="container">
            <nav className="breadcrumb">
              <ul className="column">
                <li><Link href="/"><a>首页</a></Link></li>
                <li className="is-active"><a aria-current="page">关于</a></li>
              </ul>
            </nav>

          </div>
        </div>
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
              I wrote this with <code>koa</code> , <code>Next.js</code> , <code>mongodb</code> , <code>bulma</code>
              ，<code>Mobx</code> , and then run with <code>pm2</code> , application is published to "Aliyun " ECS
              with <code>nginx</code>
            </div>
            <div className="column content">
              主要运用技术栈为 <code>koa</code> , <code>Next.js</code> , <code>mongodb</code> , <code>bulma</code>
              ，<code>Mobx</code>。程序开发完成后通过使用 <code>pm2</code>运行监控，并配置到阿里云服务器上，服务器上采用 <code>nginx</code>
              作为域名转发。
            </div>

            <div className="title">Where am I ?</div>
            <div className="column content">
              当前就职于 <b>深圳市艾可思信息技术有限公司</b> ,坐标昆明市，目前负责 <a href="https://www.yunzhizhuang.com">云智装</a>
              产品开发前端部分，职位是前端负责人，主要负责前端产品开发，技术探索等，探索范围包括但不限于前端部分。
            </div>
            <div className="title">What did I do</div>
            <div className="column content">
              <li>
                使用 <code>React</code>、 <code>ELectron</code>、 <code>antd</code>写了一个基于electron的脚手架：
                <a href="https://github.com/eaTong/electron-mobx">electron-mobx</a>
              </li>
              <li>基于<a href="https://github.com/eaTong/electron-mobx">electron-mobx</a>开发了个简易的会员管理系统（
                13年学习Java的练手项目，将其升级）:<a href="https://github.com/eaTong/electron-mobx-member">electron-mobx-member</a>
              </li>
              <li>
                <code>React</code>、 <code>React-native</code>开发了个加班记录（简单的CURD），主要目的为打通技术关卡
                <a href="https://github.com/eaTong/overtime">overtime </a>
              </li>
              <li>
                基于<code>Next.js</code>，<code>Mobx</code>搭建了个脚手架
                <a href="https://github.com/eaTong/next-mobx-starter">next-mobx-starter</a>。
              </li>
              <li>
                基于<a href="https://github.com/eaTong/next-mobx-starter">next-mobx-starter</a>脚手架的个人博客系统
                <a href="http://eatong.cn">eaTong</a>
              </li>
              <li>
                基于<a href="https://github.com/eaTong/next-mobx-starter">next-mobx-starter</a>脚手架的文档平台
                <a href="https://github.com/eaTong/document">document</a>
              </li>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}

AboutMe.propTypes = {};
export default Page(AboutMe);

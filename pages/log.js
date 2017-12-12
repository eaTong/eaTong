/**
 * Created by eatong on 17-12-12.
 */
import React, {Component} from 'react';
import {Page, Footer} from '~components';
import Link from 'next/link';
import Head from 'next/head'

class Log extends Component {

  render() {
    const {} = this.props;
    return (
      <div className="hero">
        <div className="hero-head">
          <Head>
            <title>网站日志</title>
          </Head>
          <div className="container">
            <nav className="breadcrumb">
              <ul className="column">
                <li><Link href="/"><a>首页</a></Link></li>
                <li className="is-active"><a aria-current="page">网站日志</a></li>
              </ul>
            </nav>

          </div>
        </div>
        <div className="hero-body">
          <div className="container">

          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}

Log.propTypes = {};
export default Page(Log);

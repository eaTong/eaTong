import React from 'react'
import Page from '../components/Page'
import Link from 'next/link';
import Head from 'next/head'
import {inject, observer} from 'mobx-react';
import ajax from '../util/ajaxUtil';

@inject('blog') @observer
class Index extends React.Component {

  static async init(ctx) {
    const {data} = await ajax({url: '/api/pub/blog/list', ctx});
    return {blog: {blogList: data}};
  }

  render() {
    const {blog} = this.props;
    return (
      <div className="hero is-medium">
        <Head>
          <title>周夷东(eaTong)个人站</title>
        </Head>
        <div className="hero-body">
          <div className="container">
            <h1 className="title">Personal Site written by eaTong with Next.js</h1>
            {blog.blogList.map((item, index) => (
              <div className="media" key={item._id}>
                <div className="media-content">
                  <Link href={{pathname: '/blog', query: {id: item._id}}}>
                    <a className="content">{item.title}</a>
                  </Link>
                  <p className="content has-text-grey">{item.info}</p>
                </div>
                <div className="media-right">
                  {new Date(item.publishTime).format()}
                  <p className="content has-text-grey">阅读量：{item.viewCount}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <footer className="footer">
          <div className="columns">
            <div className="column is-one-quarter  is-offset-one-quarter">
              <div>关于我</div>
              <Link href='/about'>
                <a>关于</a>
              </Link>
              <div>
                <a href='http://www.yunzhizhuang.com'>当前工作</a>
              </div>
            </div>
            <div className="column is-one-quarter">
              <div>个人项目</div>
              <div><a href="https://github.com/eaTong/electron-mobx-member">electron-mobx-member</a></div>
              <div><a href="https://github.com/eaTong/electron-mobx">electron-mobx</a></div>
              <div><a href="https://github.com/eaTong/document">document</a></div>
              <div><a href="https://github.com/eaTong/next-mobx-starter">next-mobx-starter</a></div>
            </div>
          </div>
          <div className="columns">
            <div className="column has-text-centered">
              <span>周夷东个人站</span>
              <a href="http://www.miitbeian.gov.cn">滇ICP备 17010764</a>
            </div>
          </div>
        </footer>

      </div>
    )
  }
}

export default Page(Index);

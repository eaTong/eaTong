import React from 'react'
import Page from '../components/Page'
import Link from 'next/link';
import Head from 'next/head'
import {inject, observer} from 'mobx-react';
import ajax from '../util/ajaxUtil';

@inject('blog') @observer
class Index extends React.Component {

  static async init(ctx) {
    const {data} = await ajax({url: '/api/blog/list', ctx});
    return {blog: {blogList: data}};
  }

  render() {
    const {blog} = this.props;
    return (
      <div className="hero is-medium">
        <Head>
          <title>eaTong write blog with Next.js</title>
        </Head>
        <div className="hero-body">
          <div className="container">
            <h1 className="title">eaTong write a blog with Next.js</h1>
            {blog.blogList.map((item, index) => (
              <Link href={{pathname: '/blog', query: {id: item._id}}} key={item._id}>
                <a className="media">
                  <div className="media-content">{item.title}</div>
                  <div className="media-right">
                    {new Date(item.publishTime).format()}
                  </div>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default Page(Index);

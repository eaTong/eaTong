/**
 * Created by eatong on 17-11-16.
 */
import React, {Component} from 'react';
import {Page} from '~components';
import Link from 'next/link';
import Head from 'next/head'
import {inject, observer} from 'mobx-react';
import ajax from '../../../util/ajaxUtil';


@inject('blogAdmin') @observer
class Blog extends Component {

  static async init(ctx) {
    const {data} = await ajax({url: '/api/blog/list', ctx});
    return {blogAdmin: {blogList: data}};
  }

  render() {
    const {blogAdmin} = this.props;
    return (
      <div className="container">
        <Head>
          <title>blog list</title>
        </Head>
        <nav className="breadcrumb" aria-label="todo">
          <ul className="column">
            <li><Link href="/admin"><a>admin</a></Link></li>
            <li className="is-active"><a aria-current="page">blog list</a></li>
          </ul>
        </nav>
        <div className="hero">
          <div className="hero-body">
            <div className="media">
              <div className="media-content"/>
              <div className="media-right">
                <Link href='/admin/blog/write'><a>write a new blog</a></Link>
              </div>
            </div>
            {blogAdmin.blogList.map((blog, index) => (
              <div className="media" key={blog._id}>
                <div className="media-content">
                  <p>{blog.title}</p>
                  <p className="content has-text-grey">{blog.info}</p>
                </div>
                <div className="media-right">
                  <Link href={`/admin/blog/write?id=${blog._id}`}>
                    <button className="button  is-primary is-inverted">编辑</button>
                  </Link>
                  <button className="button is-danger is-inverted">删除</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

Blog.propTypes = {};
export default Page(Blog);

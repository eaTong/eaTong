/**
 * Created by eatong on 17-11-16.
 */
import React, {Component} from 'react';
import {Page} from '~components';
import Link from 'next/link';
import Head from 'next/head'
import {inject, observer} from 'mobx-react'
import ajax from '../util/ajaxUtil';


@inject('blog') @observer
class Blog extends Component {

  static async init(ctx) {
    const {data} = await ajax({url: '/api/blog/pub/detail', data: {id: ctx.query.id}, ctx});
    return {blog: {blog: data}}
  }

  render() {
    const {blog} = this.props;
    return (
      <div className="container">
        <Head>
          <title>{blog.blog.title}</title>
        </Head>
        <nav className="breadcrumb">
          <ul className="column">
            <li><Link href="/"><a>home page</a></Link></li>
            <li className="is-active"><a aria-current="page">blog detail</a></li>
          </ul>
        </nav>
        <div className="hero">
          <div className="hero-body">
            <h1 className="title has-text-centered">{blog.blog.title}</h1>
            <div className="content">
              <div dangerouslySetInnerHTML={{__html: blog.blog.content || '<div></div>'}}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Blog.propTypes = {};
export default Page(Blog);

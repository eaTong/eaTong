/**
 * Created by eatong on 17-11-16.
 */
import React, {Component} from 'react';
import {Page} from '~components';
import Link from 'next/link';
import Head from 'next/head';
import {inject, observer} from 'mobx-react'
import ajax from '../util/ajaxUtil';
import ReactMarkdown from 'react-markdown';


@inject('blog') @observer
class Blog extends Component {

  static async init(ctx) {
    const {data} = await ajax({url: '/api/pub/blog/detail', data: {id: ctx.query.id}, ctx});
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
            <li><Link href="/"><a>首页</a></Link></li>
            <li className="is-active"><a aria-current="page">{blog.blog.title}</a></li>
          </ul>
        </nav>
        <div className="hero">
          <div className="hero-body">
            <h1 className="title has-text-centered">{blog.blog.title}</h1>
            <div className="content">
              {blog.blog.isMarkdown && (
                <ReactMarkdown source={blog.blog.content}/>
              )}
              {!blog.blog.isMarkdown && (
                <div dangerouslySetInnerHTML={{__html: blog.blog.publishedContent || '<div></div>'}}/>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Blog.propTypes = {};
export default Page(Blog);

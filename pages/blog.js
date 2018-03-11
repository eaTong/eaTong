/**
 * Created by eatong on 17-11-16.
 */
import React, {Component} from 'react';
import {findDOMNode} from 'react-dom';
import {Page, Title, Footer} from '~components';
import {notify} from '~bulma-components';
import Link from 'next/link';
import Head from 'next/head';
import {inject, observer} from 'mobx-react'
import ajax from '../util/ajaxUtil';
import ReactMarkdown from 'react-markdown';

import hljs from 'highlight.js/lib/highlight';

hljs.registerLanguage('javascript', require('highlight.js/lib/languages/javascript'));


@inject('blog') @observer
class Blog extends Component {

  static async init(ctx) {
    const {data} = await ajax({url: '/api/pub/blog/detail', data: {id: ctx.query.id}, ctx});
    return {blog: {blog: data}}
  }

  componentDidMount() {
    this.initialCode();
  }

  initialCode() {
    const contentEle = findDOMNode(this.content);
    const ele = contentEle.querySelector('blockquote>p');
    ele && hljs.highlightBlock(ele);
  }

  async addComment() {
    const content = this.content.value;
    const email = this.email.value;
    const nickname = this.nickname.value;
    const website = this.website.value;
    if (!nickname) {
      notify.error('大侠怎么称呼？');
      return;
    }
    if (!email) {
      notify.error('雁过留痕，人过留踪，留个邮箱吧。');
      return;
    }
    const emailReg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!emailReg.test(email)) {
      notify.error('别闹，有点诚意好不好。');
      return;
    }
    if (!content) {
      notify.error('别逗，还是输点内容吧！');
      return;
    }
    await this.props.blog.addComment({content, email, nickname, website});
    this.content.value = '';
    this.email.value = '';
    this.nickname.value = '';
    this.website.value = '';

  }

  render() {
    const {blog} = this.props;
    return (
      <div>
        <div className="container">

          <Head>

            <meta name="keywords" content={(blog.blog.keywords || []).join(',')}/>
            <meta name="description" content={blog.blog.info}/>
          </Head>
          <Title>{blog.blog.title}</Title>
          <nav className="breadcrumb">
            <ul className="column">
              <li><Link href="/"><a>首页</a></Link></li>
              <li className="is-active"><a aria-current="page">{blog.blog.title}</a></li>
            </ul>
          </nav>
          <div className="hero">
            <div className="hero-body">
              <h1 className="title has-text-centered">{blog.blog.title}</h1>
              <div className="content" ref={content => this.content = content}>
                {blog.blog.isMarkdown && (
                  <ReactMarkdown source={blog.blog.content}/>
                )}
                {!blog.blog.isMarkdown && (
                  <div dangerouslySetInnerHTML={{__html: blog.blog.publishedContent || '<div></div>'}}/>
                )}
              </div>

              {(blog.blog.comments || []).map(comment => (
                <section key={comment._id} className="column">
                  <p>
                    <strong>{comment.nickname}</strong>
                    <small className="has-text-gray">
                      {new Date(comment.time || new Date()).getTimeStr()}
                    </small>
                  </p>
                  <div className="content box">{comment.content}</div>
                </section>
              ))}
            </div>
            <div className="hero-footer">
              <h2 className="subtitle">发表评论：</h2>
              <div className="columns">

                <div className="column is-one-third">
                  <input type="text" className="input" ref={nickname => this.nickname = nickname} placeholder="显示昵称"/>
                </div>
                <div className="column is-one-third">
                  <input type="e-mail" className="input" ref={email => this.email = email} placeholder="联系邮箱"/>
                </div>
                <div className="column is-one-third">
                  <input type="text" className="input" ref={website => this.website = website} placeholder="个人主页"/>
                </div>
              </div>

              <textarea className="textarea" ref={content => this.content = content} placeholder="你的想法"/>

              <div className="column is-clearfix">
                <button className="button is-primary is-pulled-right" onClick={this.addComment.bind(this)}>发表</button>
              </div>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}

Blog.propTypes = {};
export default Page(Blog);

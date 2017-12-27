/**
 * Created by eatong on 17-12-12.
 */
import React, {Component} from 'react';
import Link from 'next/link';
import Head from 'next/head'
import {Page, MdEditor} from '~components';
import {inject, observer} from 'mobx-react'
import ajax from "../../../util/ajaxUtil";


@inject('blogAdmin') @observer
class MarkdownWrite extends Component {

  static async init(ctx) {
    if (ctx.query.id) {
      const {data} = await ajax({url: '/api/pub/blog/detail', data: {id: ctx.query.id, operate: 'edit'}, ctx});
      return {blogAdmin: {blogForm: data}}
    }
  }

  async onSaveBlog(publish) {
    console.log(publish);
    const query = this.props.query;
    if (query.id) {
      await this.props.blogAdmin.updateBlog(query.id, publish);
    } else {
      await this.props.blogAdmin.writeBlog(true, publish);
    }
  }

  render() {
    const {blogAdmin, query} = this.props;
    const {} = this.props;
    return (
      <div className="container">
        <Head>
          <title>write blog</title>
        </Head>
        <nav className="breadcrumb" aria-label="todo">
          <ul className="column">
            <li><Link href="/admin"><a>admin</a></Link></li>
            <li><Link href="/admin/blog"><a>blog list</a></Link></li>
            <li className="is-active"><a aria-current="page">write blog</a></li>
          </ul>
        </nav>
        <div className="column">
          <h2 className="title">标题：</h2>
          <input type="text"
                 className="input"
                 placeholder="标题"
                 value={blogAdmin.blogForm.title}
                 onChange={(event) => blogAdmin.updateForm('title', event.target.value)}/>
        </div>
        <div className="column">
          <h2 className="subtitle">正文：</h2>
          <MdEditor viewerClass="content"
                    onChange={(val) => blogAdmin.updateForm('content', val)}
                    value={blogAdmin.blogForm.content}/>
        </div>
        {query.id && (
          <div className="column">
            <h2 className="subtitle">编辑原因：</h2>
            <textarea
              className="textarea"
              onChange={(event) => blogAdmin.updateForm('commit', event.target.value)}/>
          </div>
        )}
        <div className="media">
          <div className="media-content"/>
          <div className="media-right">
            <button
              className="button"
              onClick={()=>this.onSaveBlog()}
            >
              保存
            </button>
            <button
              className="button is-primary"
              onClick={()=>this.onSaveBlog( true)}
            >
              保存并发布
            </button>
          </div>
        </div>
      </div>
    );
  }
}

MarkdownWrite.propTypes = {};
export default Page(MarkdownWrite);

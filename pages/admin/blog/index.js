/**
 * Created by eatong on 17-11-16.
 */
import React, {Component} from 'react';
import {Page} from '~components';
import Link from 'next/link';
import {inject, observer} from 'mobx-react';
import ajax from '../../../util/ajaxUtil';


@inject('blogAdmin') @observer
class Blog extends Component {

  static async init(ctx) {
    const {data} = await ajax({url: '/api/blog/get', ctx});
    return {blogAdmin: {blogList: data}};
  }

  render() {
    const {blogAdmin} = this.props;
    return (
      <div className="hero">
        <div className="hero-body">
          <div className="container">
            <div className="media">
              <div className="media-content"/>
              <div className="media-right">
                <Link href='/admin/blog/write'><a>write a new blog</a></Link>
              </div>
            </div>
            {blogAdmin.blogList.map((blog, index) => (
              <div className="media" key={blog._id}>
                <div className="media-content">{blog.title}</div>
                <div className="media-right">
                  <button className="button  is-primary is-inverted">编辑</button>
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

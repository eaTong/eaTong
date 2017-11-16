/**
 * Created by eatong on 17-11-16.
 */
import React, {Component} from 'react';
import {Page} from '~components';
import Link from 'next/link';
import {inject, observer} from 'mobx-react'
import ajax from '../util/ajaxUtil';


@inject('blog') @observer
class Blog extends Component {

  static async init(ctx) {
    if (ctx.req) {
      console.log(ctx.query);
      const {data} = await ajax({url: '/api/blog/detail', data: {id: ctx.query.id}, ctx});
      return {blog: {blog: data}}
    } else {
      debugger;
    }
  }

  render() {
    const {} = this.props;
    return (
      <div className="container">
        {JSON.stringify(this.props.blog)}
      </div>
    );
  }
}

Blog.propTypes = {};
export default Page(Blog);

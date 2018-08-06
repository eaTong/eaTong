/**
 * Created by eatong on 17-11-7.
 */
import React, {Component} from 'react';
import {inject, observer} from 'mobx-react'
import Link from 'next/link';
import Head from 'next/head'
import {Page} from '../../components';


@inject() @observer
class Admin extends Component {

  static async init(req) {
  }

  render() {
    const {} = this.props;
    return (
      <div className="container">
        <Head>
          <title>admin home page...</title>
        </Head>
        <aside className="menu">
          <p className="menu-label">
            admin menu
          </p>
          <ul className="menu-list">
            <li><Link href="/admin/blog"><a className="has-text-link">blog list</a></Link></li>
            <li><Link href="/admin/blog/md-write"><a className="has-text-link">write a blog with markdown</a></Link>
            </li>
            <li><Link href="/admin/blog/write"><a className="has-text-link">write a blog</a></Link></li>
            <li><Link href="/admin/analyse/visitLog"><a className="has-text-link">visit log</a></Link></li>
            <li><a href="/admin/console#/admin">admin-console</a></li>
          </ul>
        </aside>
      </div>
    );
  }
}

Admin.propTypes = {};
export default Page(Admin);

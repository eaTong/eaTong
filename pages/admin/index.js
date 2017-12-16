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
        admin page....
        <p>
          <Link href="/admin/blog"><a>blog list</a></Link>
        </p>
        <p>
          <Link href="/admin/blog/md-write"><a>write a blog with markdown</a></Link>
        </p>
        <p>
          <Link href="/admin/blog/write"><a>write a blog</a></Link>
        </p>
        <p>
          <Link href="/admin/analyse/visitLog"><a>visit log</a></Link>
        </p>
      </div>
    );
  }
}

Admin.propTypes = {};
export default Page(Admin);

/**
 * Created by eatong on 17-11-7.
 */
import React, {Component} from 'react';
import {inject, observer} from 'mobx-react'
import Link from 'next/link';
import {Page} from '../../components';


@inject() @observer
class Admin extends Component {

  static async init(req) {
  }

  render() {
    const {} = this.props;
    return (
      <div className="container">
        admin page....
        <p>
          <Link href="/admin/blog"><a>blog list</a></Link>
        </p>
        <p>
          <Link href="/admin/blog/write"><a>write a blog</a></Link>
        </p>
      </div>
    );
  }
}

Admin.propTypes = {};
export default Page(Admin);

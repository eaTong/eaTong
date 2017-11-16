/**
 * Created by eatong on 17-11-16.
 */
import React, {Component} from 'react';
import {Page} from '~components';
import Link from 'next/link';
import {inject, observer} from 'mobx-react'


@inject() @observer
class Blog extends Component {

  static async init() {
  }

  render() {
    const {} = this.props;
    return (
      <div className="container">

      </div>
    );
  }
}

Blog.propTypes = {};
export default Page(Blog);

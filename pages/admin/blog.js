/**
 * Created by eatong on 17-11-10.
 */
import React, {Component} from 'react';
import {Page, RichEditor} from '../../components';
import Link from 'next/link';
import {inject, observer} from 'mobx-react'
import ajax from '~util/ajaxUtil';


@inject() @observer
class Blog extends Component {

  render() {
    const {} = this.props;
    return (
      <div className="container">
        <RichEditor/>
      </div>
    );
  }
}

Blog.propTypes = {};
export default Page(Blog);

/**
 * Created by eatong on 17-12-12.
 */
import React, {Component} from 'react';
import {Page, MdEditor} from '~components';
import {inject, observer} from 'mobx-react'


@inject() @observer
class MarkdownWrite extends Component {

  static async init(ctx) {
  }

  render() {
    const {} = this.props;
    return (
      <div style={{height: '100vh', width: '100vw'}}>
        <MdEditor viewerClass="content"/>
      </div>
    );
  }
}

MarkdownWrite.propTypes = {};
export default Page(MarkdownWrite);

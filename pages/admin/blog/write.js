/**
 * Created by eatong on 17-11-10.
 */
import React, {Component} from 'react';
import {Page, RichEditor} from '../../../components/index';
import Link from 'next/link';
import {inject, observer} from 'mobx-react';


@inject('blogAdmin') @observer
class WriteBlog extends Component {

  render() {
    const {blogAdmin} = this.props;
    return (
      <div className="container">
        <div className="column">
          <h2 className="title">标题：</h2>
          <input type="text" className="input" placeholder="标题"
                 onChange={(event) => blogAdmin.updateForm('title', event.target.value)}/>
        </div>
        <div className="column">
          <h2 className="subtitle">正文：</h2>
          <RichEditor onChange={(val) => blogAdmin.updateForm('content', val)}/>
        </div>
        <div className="media">
          <div className="media-content"/>
          <div className="media-right">
            <button className="button is-primary" onClick={()=>blogAdmin.writeBlog()}>保存</button>
          </div>
        </div>
      </div>
    );
  }
}

WriteBlog.propTypes = {};
export default Page(WriteBlog);

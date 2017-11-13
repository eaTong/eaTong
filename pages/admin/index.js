/**
 * Created by eatong on 17-11-7.
 */
import React, {Component} from 'react';
import {Page} from '~components';
import {inject, observer} from 'mobx-react'
import ajax from '~util/ajaxUtil';


@inject() @observer
class Admin extends Component {

  static async init(req) {
  }

  render() {
    const {} = this.props;
    return (
      <div className="container">
        admin page....
      </div>
    );
  }
}

Admin.propTypes = {};
export default Page(Admin);

/**
 * Created by eatong on 17-11-5.
 */
import React, {Component} from 'react';
import {Page} from '../components';
import Link from 'next/link';
import {inject, observer} from 'mobx-react'
import ajax from '../util/ajaxUtil';


@inject('') @observer
class Login extends Component {

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

Login.propTypes = {};
export default Page(Login);

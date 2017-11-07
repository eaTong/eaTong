/**
 * Created by eatong on 17-11-5.
 */
import React, {Component} from 'react';
import {Page} from '../components';
import {inject, observer} from 'mobx-react';
import getFormData from 'get-form-data';
import ajax from '../util/ajaxUtil';


@inject('user') @observer
class Login extends Component {

  onSubmit(event) {
    event.preventDefault();
    this.props.user.login(getFormData(document.querySelector('form')));
  }

  render() {
    const {} = this.props;
    return (
      <div className="hero is-fullheight">
        <div className="hero-body">
          <div className="container">
            <form className="columns" onSubmit={this.onSubmit.bind(this)} name="login">
              <div className="column is-5">
                <input type="text" className="input" name="user"/>
              </div>
              <div className="column is-5">
                <input type="password" className="input" name="password"/>
              </div>
              <div className="column has-text-right">
                <button className="button is-primary" type="submit">登录</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {};
export default Page(Login);

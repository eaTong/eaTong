/**
 * Created by eatong on 18-2-11.
 */
import React, {Component} from 'react';
import {Layout, Menu, Icon, Tooltip} from 'antd'
import ajax from '../util/ajaxUtil';

const {Content, Sider} = Layout;
const menus = [
  {icon: '', path: '', name: ''}
];

class AdminLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menus: []
    };
  }

  onSelectMenu({key}) {
    window.localStorage.setItem('lastUrl', key);
    this.props.history.push(key);
  }

  async logout() {
    await ajax({url: '/api/user/logout'});
    this.props.history.push('/');
  }

  renderMenus() {
    return this.state.menus.map(menu => (
      <Menu.Item key={menu.path}>
        <Icon type={menu.icon}/>
        <span>{menu.name}</span>
      </Menu.Item>
    ))
  }

  render() {
    return (
      <Layout className="layout">
        <Sider breakpoint="lg">
          <Menu
            theme="dark"
            selectedKeys={[window.location.pathname]}
            onClick={this.onSelectMenu.bind(this)}
          >
            {this.renderMenus()}
          </Menu>
          <div className='personal-info'>
            <Tooltip title='退出'>
              <Icon type="poweroff" onClick={() => this.logout()}/>
            </Tooltip>
          </div>
        </Sider>
        <Content>
          {this.props.children}
        </Content>
      </Layout>
    )
  }
}

AdminLayout.propsType = {};

export default AdminLayout;

/**
 * Created by eatong on 18-2-8.
 */
import React from 'react';
import {HashRouter as Router, Route, Link,} from 'react-router-dom';
import {LocaleProvider} from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import PropTypes from 'prop-types';
import AdminLayout from './components/AdminLayout';
import {Provider} from 'mobx-react';

import '~/util/prototype';
import './styles/app.less';
import 'm-preview-image/dist/preview-image.css';
import './styles/ag-theme-antd.less';
import "ag-grid/dist/styles/ag-grid.css";
import stores from '~/stores';

import HomePage from './pages/HomePage';
import LoginPage from "~/pages/login/LoginPage";
import TestPage from './pages/test/TestPage';
//UPDATE_TAG:importPage

const routes = [
  {key: '/admin/test', component: TestPage},
//UPDATE_TAG:addPageRoute
];

function renderRoute() {
  return routes.map(item => <Route exact path={item.key} key={item.key} component={item.component}/>)
}

class App extends React.Component {

  render() {
    return (
      <LocaleProvider locale={zhCN}>
        <Provider {...stores}>
          <Router>
            <div className="main-body">
              <Route exact path={'/'} component={HomePage}/>
              <Route exact path="/login" component={LoginPage}/>
              <Route path="/admin" component={(props) => (
                <AdminLayout {...props}>
                  {renderRoute()}
                </AdminLayout>
              )}>
              </Route>
            </div>
          </Router>
        </Provider>
      </LocaleProvider>
    )
  }
}

App.propTypes = {
  children: PropTypes.element
};
export default App;

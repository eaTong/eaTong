/**
 * Created by eatong on 17-12-9.
 */
import React, {Component} from 'react';
import {Page} from '~components';
import {inject, observer} from 'mobx-react'
import ajax from "../../../util/ajaxUtil";


@inject('visitLog') @observer
class VisitLog extends Component {

  static async init(ctx) {
    const {data} = await ajax({url: '/api/visit-log/list', ctx});
    return {visitLog: {logs: data}};
  }

  render() {
    const {visitLog} = this.props;
    return (
      <div>
        <table className="table">
          <thead>
          <tr>
            <th>title</th>
            <th>ip</th>
            <th>user-agent</th>
            <th>time</th>
          </tr>
          </thead>
          <tbody>
          {visitLog.logs.map(log => (
            <tr key={log._id}>
              <td>{log.blog && log.blog.title}</td>
              <td>{log.ip}</td>
              <td>{log.userAgent}</td>
              <td>{log.time}</td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    );
  }
}

VisitLog.propTypes = {};
export default Page(VisitLog);

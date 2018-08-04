/**
 * Created by eaTong on 2018-04-08 .
 * Description: auto generated in  2018-04-08
 */

import React, {Component} from 'react';
import {Button, message, Input} from 'antd';
import AgTable from '~/components/AgTable';
import PasswordModal from "./PasswordModal";
import {inject, observer} from "mobx-react";

const ButtonGroup = Button.Group;
const columns = [
  {title: '名称', dataIndex: 'name'},
  {title: '地址', dataIndex: 'address'},
  {title: '帐号', dataIndex: 'account'},
  {title: '密码', dataIndex: 'password'},
  {title: '备注', dataIndex: 'remark'},
];

@inject('password') @observer
class PasswordPage extends Component {
  async componentDidMount() {
    await this.props.password.getDataList();
  }

  render() {
    const {dataList, operateType, showModal, selectedKeys, rowSelection, firstSelected} = this.props.password;
    return (
      <div className="base-layout password-page">
        <header className="header">
          <div className="label">
            帐号密码管理
          </div>
          <ButtonGroup className="buttons">
            <Button onClick={() => this.props.password.toggleModal('add')}>新建</Button>
            <Button onClick={() => this.props.password.toggleModal('edit')}
                    disabled={selectedKeys.length !== 1}>编辑</Button>
            <Button onClick={() => this.props.password.deleteData()} disabled={selectedKeys.length === 0}>删除</Button>
          </ButtonGroup>
        </header>
        <AgTable
          columns={columns}
          dataSource={dataList}
          rowKey="_id"
          tableId="password-table"
          pagination={this.props.password.pagination}
          rowSelection={{
            selectedRowKeys: selectedKeys,
            onChange: (keys) => this.props.password.onChangeSelection(keys)
          }}/>
        {showModal && (
          <PasswordModal
            onCancel={() => this.props.password.toggleModal()}
            onOk={(data) => this.props.password.onSaveData(data)}
            operateType={operateType}
            formData={firstSelected}
          />
        )}
      </div>
    );
  }
}

PasswordPage.propTypes = {};
export default PasswordPage;

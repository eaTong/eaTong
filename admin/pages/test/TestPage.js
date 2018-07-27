
/**
 * Created by eaTong on 2018-27-07 .
 * Description: auto generated in  2018-27-07
 */

import React, {Component} from 'react';
import {Button, message ,Input} from 'antd';
import AgTable from '~/components/AgTable';
import TestModal from "./TestModal";
import {inject, observer} from "mobx-react";

const ButtonGroup = Button.Group;
const columns = [
  {title: '名称', dataIndex: 'name', key: 'name'},
];

@inject('test') @observer
class TestPage extends Component {
  async componentDidMount() {
    await this.props.test.getDataList();
  }

  render() {
    const {dataList, operateType, showModal, selectedKeys,  firstSelected} = this.props.test;
    return (
      <div className="base-layout test-page">
        <header className="header">
          <div className="label">
            用户管理
            <Input.Search
              className={'search'}
              placeholder={'输入关键字搜索'}
              onSearch={(val) => this.props.test.searchData(val)}
            />
          </div>
          <ButtonGroup className="buttons">
            <Button onClick={() => this.props.test.toggleModal('add')}>新建</Button>
            <Button onClick={() => this.props.test.toggleModal('edit')}
                    disabled={selectedKeys.length !== 1}>编辑</Button>
            <Button onClick={() => this.props.test.deleteData()} disabled={selectedKeys.length === 0}>删除</Button>
          </ButtonGroup>
        </header>
        <AgTable
          columns={columns}
          dataSource={dataList}
          rowKey="_id"
          tableId="test-table"
          pagination={this.props.test.pagination}
          rowSelection={{
            selectedRowKeys: selectedKeys,
            onChange: (keys) => this.props.test.onChangeSelection(keys)
          }}/>
        {showModal && (
          <TestModal
            onCancel={() => this.props.test.toggleModal()}
            onOk={(data) => this.props.test.onSaveData(data)}
            operateType={operateType}
            formData={firstSelected}
          />
        )}
      </div>
    );
  }
}

TestPage.propTypes = {};
export default TestPage;

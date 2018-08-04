/**
 * Created by eaTong on 2018-04-08 .
 * Description: auto generated in  2018-04-08
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Modal, Form, Input, message} from 'antd';

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    xs: {span: 24},
    sm: {span: 6},
  },
  wrapperCol: {
    xs: {span: 24},
    sm: {span: 14},
  },
};

class PasswordModal extends Component {
  componentDidMount() {
    if (this.props.operateType === 'edit') {
      this.props.form.setFieldsValue(this.props.formData);
    }
  }

  onSaveData() {
    this.props.form.validateFields((errors, values) => {
      if (errors) {
        return;
      }
      this.props.onOk && this.props.onOk(values);
    });
  }

  render() {
    const {operateType} = this.props;
    const {getFieldDecorator} = this.props.form;
    return (
      <Modal title={(operateType === 'add' ? '新增' : '编辑') + ''}
             maskClosable={false}
             visible={true} onOk={this.onSaveData.bind(this)} onCancel={this.props.onCancel}>
        <Form>
          <FormItem {...formItemLayout} label="名称">
            {getFieldDecorator('name', {
              rules: [{
                required: true, message: '请填写名称!',
              }],
            })(
              <Input/>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="地址">
            {getFieldDecorator('address', {
              rules: [{
                required: true, message: '请填写地址!',
              }],
            })(
              <Input/>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="帐号">
            {getFieldDecorator('account', {
              rules: [{
                required: true, message: '请填写帐号!',
              }],
            })(
              <Input/>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="密码">
            {getFieldDecorator('password', {
              rules: [{
                required: true, message: '请填写密码!',
              }],
            })(
              <Input/>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="名称">
            {getFieldDecorator('remark')(
              <Input.TextArea/>
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

PasswordModal.propTypes = {
  operateType: PropTypes.string,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  formData: PropTypes.object
};
PasswordModal = Form.create()(PasswordModal);
export default PasswordModal;

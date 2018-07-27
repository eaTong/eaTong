/**
 * Created by eaTong on 2018/6/17 .
 * Description:
 */
const readline = require('readline');
const fs = require('fs');
const path = require('path');
const moment = require('moment');

const basePath = path.resolve(__dirname, '..');
const currentDate = moment().format('YYYY-DD-MM');
const schemaPath = path.resolve(basePath, 'server', 'schema');
const apiPath = path.resolve(basePath, 'server', 'apis');
const servicePath = path.resolve(basePath, 'server', 'services');
const routerPath = path.resolve(basePath, 'server', 'routers.js');
const initDbPath = path.resolve(basePath, 'bin', 'initDB.js');
const storePath = path.resolve(basePath, 'front', 'stores');
const storeIndexPath = path.resolve(basePath, 'front', 'stores', 'index.js');
const appPath = path.resolve(basePath, 'front', 'App.js');

const description = `
/**
 * Created by eaTong on ${currentDate} .
 * Description: auto generated in  ${currentDate}
 */
`;

function getModel(form) {
  return `
const {mongoose, Schema} = require('../mongoConfig');

const ${upperFirstLetter(form)}Schema = new Schema({
  name: String,
  enable: Boolean,
});

module.exports = mongoose.model('blog', BlogSchema);
`;
}

function getApi(form) {
  return `
const {LogicError} = require("../framework/errors");
const ${upperFirstLetter(form)}Service = require('../services/${upperFirstLetter(form)}Service');
const BaseApi = require('../framework/BaseApi');


class ${upperFirstLetter(form)}Api extends BaseApi {
  static async add${upperFirstLetter(form)}(ctx) {
    return await ${upperFirstLetter(form)}Service.add${upperFirstLetter(form)}(ctx.request.body);
  }

  static async update${upperFirstLetter(form)}s(ctx) {
    return await ${upperFirstLetter(form)}Service.update${upperFirstLetter(form)}s(ctx.request.body);
  }

  static async delete${upperFirstLetter(form)}s(ctx) {
    return await ${upperFirstLetter(form)}Service.delete${upperFirstLetter(form)}s(ctx.request.body.ids);
  }

  static async get${upperFirstLetter(form)}s(ctx) {
    const {pageIndex = 0, pageSize = 20} = ctx.request.body;
    return await ${upperFirstLetter(form)}Service.get${upperFirstLetter(form)}s(pageIndex, pageSize);
  }

  static async get${upperFirstLetter(form)}Detail(ctx) {
    return await ${upperFirstLetter(form)}Service.get${upperFirstLetter(form)}Detail(ctx.request.body);
  }

}

module.exports = ${upperFirstLetter(form)}Api;
  `;
}

function getService(form) {
  return `
const Form = require('../schema/FormSchema');
const ${upperFirstLetter(form)} = require('../schema/${upperFirstLetter(form)}Schema');

async function write${upperFirstLetter}(data) {
  const ${form} = new ${upperFirstLetter}(data);
  await ${form}.save();
  return ${form};
}

async function update${upperFirstLetter}(data) {
  const ${form} = await ${upperFirstLetter}.findById(data.id);
  Object.assign(${form}, data);
  await ${form}.save();
  return ${form};
}

async function get${upperFirstLetter}List() {
  return ${upperFirstLetter}.find()
}

async function delete${upperFirstLetter}(id) {
  await ${upperFirstLetter}.findById(id).remove();
}

async function get${upperFirstLetter}ById(id) {
  return await ${upperFirstLetter}.findById(id);
}

module.exports = {add${upperFirstLetter}, get${upperFirstLetter}List, get${upperFirstLetter}ById, update${upperFirstLetter}, delete${upperFirstLetter}};
 `;
}

function getImportApi(form) {
  return `const ${upperFirstLetter(form)}Api = require('./apis/${upperFirstLetter(form)}Api');`
}

function getDefineRouter(form) {
  return `
router.post('/api/${form}/add',checkArguments(['name']), ${upperFirstLetter(form)}Api.add${upperFirstLetter(form)});
router.post('/api/${form}/get', ${upperFirstLetter(form)}Api.get${upperFirstLetter(form)}s);
router.post('/api/${form}/update', checkArguments(['id', 'name']), ${upperFirstLetter(form)}Api.update${upperFirstLetter(form)}s);
router.post('/api/${form}/delete',  checkArguments(['ids']), ${upperFirstLetter(form)}Api.delete${upperFirstLetter(form)}s);  
router.post('/api/${form}/detail',  checkArguments(['id']), ${upperFirstLetter(form)}Api.get${upperFirstLetter(form)}Detail); \
`
}

function getImportModel(form) {
  return `const ${upperFirstLetter(form)} = require('../server/models/${upperFirstLetter(form)}');`;
}

function getAsyncModel(form) {
  return `  await ${upperFirstLetter(form)}.sync({alter: true});`;
}

function getFrontFormPath(form) {
  let finalPath = path.resolve(basePath, 'front', 'pages');

  if (module) {
    finalPath = path.resolve(finalPath);
    if (!fs.existsSync(finalPath)) {
      fs.mkdirSync(finalPath);
    }
  }
  finalPath = path.resolve(finalPath, form);
  if (!fs.existsSync(finalPath)) {
    fs.mkdirSync(finalPath);
  }
  return finalPath;
}

function getPage(form) {
  return `
import React, {Component} from 'react';
import {Button, message ,Input} from 'antd';
import AgTable from '~/components/AgTable';
import ${upperFirstLetter(form)}Modal from "./${upperFirstLetter(form)}Modal";
import {inject, observer} from "mobx-react";

const ButtonGroup = Button.Group;
const columns = [
  {title: '名称', dataIndex: 'name', key: 'name'},
];

@inject('${form}') @observer
class ${upperFirstLetter(form)}Page extends Component {
  async componentDidMount() {
    await this.props.${form}.getDataList();
  }

  render() {
    const {dataList, operateType, showModal, selectedKeys, rowSelection, firstSelected} = this.props.${form};
    return (
      <div className="base-layout ${form}-page">
        <header className="header">
          <div className="label">
            用户管理
            <Input.Search
              className={'search'}
              placeholder={'输入关键字搜索'}
              onSearch={(val) => this.props.${form}.searchData(val)}
            />
          </div>
          <ButtonGroup className="buttons">
            <Button onClick={() => this.props.${form}.toggleModal('add')}>新建</Button>
            <Button onClick={() => this.props.${form}.toggleModal('edit')}
                    disabled={selectedKeys.length !== 1}>编辑</Button>
            <Button onClick={() => this.props.${form}.deleteData()} disabled={selectedKeys.length === 0}>删除</Button>
          </ButtonGroup>
        </header>
        <AgTable
          columns={columns}
          dataSource={dataList}
          rowKey="id"
          tableId="${form}-table"
          pagination={this.props.${form}.pagination}
          rowSelection={{
            selectedRowKeys: selectedKeys,
            onChange: (keys) => this.props.${form}.onChangeSelection(keys)
          }}/>
        {showModal && (
          <${upperFirstLetter(form)}Modal
            onCancel={() => this.props.${form}.toggleModal()}
            onOk={(data) => this.props.${form}.onSaveData(data)}
            operateType={operateType}
            formData={firstSelected}
          />
        )}
      </div>
    );
  }
}

${upperFirstLetter(form)}Page.propTypes = {};
export default ${upperFirstLetter(form)}Page;
  `;
}

function getModal(form) {
  return `
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

class ${upperFirstLetter(form)}Modal extends Component {
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
          <FormItem
            {...formItemLayout}
            label="名称"
            hasFeedback>
            {getFieldDecorator('name', {
              rules: [{
                required: true, message: '请填写名称!',
              }],
            })(
              <Input/>
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

${upperFirstLetter(form)}Modal.propTypes = {
  operateType: PropTypes.string,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  formData: PropTypes.object
};
${upperFirstLetter(form)}Modal = Form.create()(${upperFirstLetter(form)}Modal);
export default ${upperFirstLetter(form)}Modal;`;
}

function getStore(form) {
  return `
import {observable, action} from 'mobx';
import ajax from "~/util/ajaxUtil";
import BaseStore from '~/stores/BaseStore'

export default class ${upperFirstLetter(form)}Store extends BaseStore {
  listApi = '/api/${form}/get';
  addApi = '/api/${form}/add';
  updateApi = '/api/${form}/update';
  deleteApi = '/api/${form}/delete';
  detailApi = '/api/${form}/detail';
  
  @action
  async searchData(keywords) {
    this.queryOption = {keywords};
    this.pageIndex = 0;
    await this.getDataList();
  }
}`;
}

function getImportStore(form) {
  return `import ${upperFirstLetter(form)}Store from './${upperFirstLetter(form)}Store';`;
}

function getRegisterStore(form) {
  return `${form}: new ${upperFirstLetter(form)}Store(),`;
}

function getImportPage(form) {
  return `import ${upperFirstLetter(form)}Page from './pages/${form}/${upperFirstLetter(form)}Page';`;
}

function getAddPageRoute(form) {
  return `  {key: '/admin/${form}', component: ${upperFirstLetter(form)}Page},`;
}

function upperFirstLetter(word) {
  return word.replace(/\w/, (a) => a.toUpperCase())
}

/**
 * 自动生成文件模板
 * @param filePath 文件地址
 * @param string 文件内容
 * @returns {Promise}
 */
function writeFile(filePath, string) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, description + string, (err) => {
      if (err) {
        console.log(err);
        reject('aaaa');
      }
      console.log(`自动生成文件：${filePath}`);
      resolve();
    });
  });
}

function updateFile(filePath, tag, string) {
  const str = fs.readFileSync(filePath).toString().replace(new RegExp(`\/\/UPDATE_TAG:${tag}`, 'g'), (str) => `${string}\n${str}`);

  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, str, (err) => {
      if (err) {
        console.log(err);
        reject(err);
      }
      console.log(`自动更新文件：${filePath} , tag:UPDATE_TAG:${tag}`);
      resolve();
    });
  });
}


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('What\'s the form name ?', async form => {
// generate code of backend
  await writeFile(path.resolve(schemaPath, `${upperFirstLetter(form)}.js`), getModel(form));
  await writeFile(path.resolve(apiPath, `${upperFirstLetter(form)}Api.js`), getApi(form));
  await writeFile(path.resolve(servicePath, `${upperFirstLetter(form)}Service.js`), getService(form));

  await updateFile(routerPath, 'importApi', getImportApi(form));
  await updateFile(routerPath, 'defineRouter', getDefineRouter(form));

// generate code of frontend
  const frontPath = getFrontFormPath(form);
  await writeFile(path.resolve(frontPath, `${upperFirstLetter(form)}Modal.js`), getModal(form));
  await writeFile(path.resolve(frontPath, `${upperFirstLetter(form)}Page.js`), getPage(form));
  await writeFile(path.resolve(storePath, `${upperFirstLetter(form)}Store.js`), getStore(form));
  await updateFile(storeIndexPath, 'importStore', getImportStore(form));
  await updateFile(storeIndexPath, 'registerStore', getRegisterStore(form));
  await updateFile(appPath, 'importPage', getImportPage(form));
  await updateFile(appPath, 'addPageRoute', getAddPageRoute(form));
  rl.close();

  process.exit();
});


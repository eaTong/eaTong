/**
 * Created by eatong on 17-11-16.
 */
import {observable, action, computed, toJS} from 'mobx';
import ajax from '../util/ajaxUtil';
import {notify} from '../bulma-components';

export default class BlogAdmin {
  @observable blogForm = {};
  @observable blogList = [];

  @action
  updateForm(field, val) {
    const blogForm = this.blogForm;
    blogForm[field] = val;
    this.blogForm = {...blogForm};
  }

  @action
  async writeBlog(isMarkdown) {
    const {success} = await ajax({url: '/api/blog/write', data: {...this.blogForm, isMarkdown: !!isMarkdown}});
    if (success) {
      notify.success({content: '新增博客成功'})
    }
  }

  @action
  async updateBlog(id) {
    const {success, data} = await ajax({url: '/api/blog/update', data: {...this.blogForm, id}});
    if (success) {
      notify.success({content: '编辑博客成功'})
    }
  }

  @action
  async getBlog() {
    const {success, data} = await ajax({url: '/api/blog/list'});
  }
}

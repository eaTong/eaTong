/**
 * Created by eatong on 17-11-16.
 */
import {observable, action, computed, toJS} from 'mobx';
import ajax from '../util/ajaxUtil';
import {notify} from '../bulma-components';
import router from 'next/router';

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
  async writeBlog(isMarkdown, publish) {
    const {success} = await ajax({
      url: '/api/blog/write',
      data: {...this.blogForm, isMarkdown: !!isMarkdown, publish: !!publish}
    });
    if (success) {
      notify.success({content: '新增博客成功'});
      window.history.go(-1);
    }
  }

  @action
  async updateBlog(id, publish) {
    const {success, data} = await ajax({url: '/api/blog/update', data: {...this.blogForm, id, publish: !!publish}});
    if (success) {
      notify.success({content: '编辑博客成功'});
      window.history.go(-1);
    }
  }

  @action
  async getBlog() {
    const {success, data} = await ajax({url: '/api/blog/list'});
  }
}

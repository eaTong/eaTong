/**
 * Created by eatong on 17-11-16.
 */
import {observable, action, computed, toJS} from 'mobx';
import {notify} from "../bulma-components";
import ajax from "../util/ajaxUtil";

export default class Blog {
  @observable blogList = [];
  @observable blog = [];

  @action
  async addComment(comment) {
    const {success} = await ajax({
      url: '/api/pub/blog/comment',
      data: {...comment, blog: this.blog._id}
    });
    if (success) {
      notify.success({content: '评论成功'});
      // window.history.go(-1);
      const {data} = await ajax({url: '/api/pub/blog/detail', data: {id: ctx.query.id}, ctx});
      return {blog: {blog: data}}
    }
  }
}

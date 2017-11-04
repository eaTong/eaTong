/**
 * Created by eatong on 17-10-28.
 */
import axios from 'axios';
import store from '../stores';

export default async function ajax(url, data) {
  store.app.loading();
  try {
    const result = await axios.post('http://localhost:3000' + url, data);
    store.app.cancelLoading();
    return result.data.data;
  } catch (ex) {
    store.app.cancelLoading();
  }
};

/**
 * Created by eatong on 17-10-28.
 */
import axios from 'axios';
import store from '../stores';

export default async function ajax(url, data) {
  store.app.loading();
  const result = await axios.post(url, data);
  store.app.cancelLoading();
  console.log(result);
  return result.data.data;
};

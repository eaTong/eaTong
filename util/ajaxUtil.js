/**
 * Created by eatong on 17-10-28.
 */
import axios from 'axios';
import store from '../stores';

export default async function ajax(url, data, req) {
  store.app.loading();
  try {
    let result;
    if (req) {
      const host = req.headers.host;
      result = await axios.post('http://' + host + url, data, {headers: req.headers});
    } else {
      result = await axios.post(url, data);
    }
    store.app.cancelLoading();
    return result.data.data;
  } catch (ex) {
    store.app.cancelLoading();
  }
};

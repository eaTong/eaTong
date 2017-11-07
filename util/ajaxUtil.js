/**
 * Created by eatong on 17-10-28.
 */
import axios from 'axios';
import store from '../stores';

export default async function ajax(config) {
  const {url, data, req} = config;
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
    return result.data;
  } catch (ex) {
    store.app.cancelLoading();
    return {message: ex.message, success: false, data: {}};
  }
};

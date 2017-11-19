import React from 'react'
import {Provider} from 'mobx-react';
import stores from '../stores';
import Loading from './Loading';
import stylesheet from 'styles/global.sass'
import '../util/prototypes';

export default Component => class Page extends React.Component {
  constructor(props) {
    super(props);
    this.stores = stores;
  }

  static async getInitialProps(ctx) {
    if (Component.init) {
      const result = await Component.init(ctx) || {};
      for (let key in result) {
        for (let dataKey in result[key]) {
          if (stores[key]) {
            stores[key][dataKey] = result[key][dataKey];
          }
        }
      }
      this.stores = stores;
      return {stores};
    }
    return {};
  }

  componentWillMount() {
    const propStore = this.props.stores || {};
    for (let key in propStore) {
      for (let dataKey in propStore[key]) {
        if (stores[key]) {
          stores[key][dataKey] = propStore[key][dataKey];
        }
      }
    }
    this.stores = stores;
  }

  render() {
    return (
      <Provider {...this.stores} >
        <div className="layout-default">
          <Loading/>
          <style dangerouslySetInnerHTML={{__html: stylesheet}}/>
          <Component />
        </div>
      </Provider>
    )
  }
}

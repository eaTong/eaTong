import React from 'react'
import {Provider} from 'mobx-react'
import stores from '../stores'

export default Component => class extends React.Component {
  constructor(props) {
    super(props);
    this.stores = stores;
  }

  render() {
    return (
      <Provider {...this.stores} >
        <Component/>
      </Provider>
    )
  }
}

/*
export default (props) => {
  let pageStore = {};
  if (props.inject && props.inject instanceof Array) {
    for (let key of props.inject) {
      pageStore[key] = store[key];
    }
  }
  console.log(pageStore);
  return (
    <Provider store={store}>
      {React.createElement('div', pageStore, props.children)}
    </Provider>
  )
}
*/

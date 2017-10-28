/**
 * Created by eatong on 17-10-28.
 */
import React, {Component} from 'react';
import {inject, observer} from 'mobx-react'

@inject('app') @observer
class Loading extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="">
        {this.props.app.loadingCount}
      </div>
    );
  }
}

Loading.propTypes = {};
export default Loading;

import React from 'react'
import Page from '../components/Page'
import {inject} from 'mobx-react'

@inject('task')
class Index extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props);
    return (
      <div>
        {JSON.stringify(this.props.task.itemList)}
      </div>
    )
  }
}

export default Page(Index);

import React from 'react'
import Page from '../components/Page'
import {inject , observer} from 'mobx-react'

@inject('task') @observer
class Index extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.task.getTaskList();
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

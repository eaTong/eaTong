import React from 'react'
import Page from '~components/Page'
import Link from 'next/link';

class Index extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
  }

  render() {
    console.log(this.props);
    return (
      <div className="hero is-medium">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">eaTong write a blog with Next.js</h1>
            <Link href="/todo">to todo page</Link>
          </div>
        </div>
      </div>
    )
  }
}

export default Page(Index);

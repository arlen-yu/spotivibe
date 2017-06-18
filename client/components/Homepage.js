import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import Input from './Input.js'

class Homepage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      redirect: false,
      artistData: null
    }
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.artistName !== this.props.artistName) {
      this.setState({redirect: false})
    }
  }

  onSubmit (artistData) {
    this.setState({redirect: true, artistData: artistData});
  }

  render () {
    if (this.state.redirect) {
      return <Redirect to={{
        pathname:'/visualize/' + this.state.artistData.name,
        state: {artistData: this.state.artistData}
      }} />;
    }

    return (
      <div>
        <h1>TEMPO</h1>
        <Input onSubmit={this.onSubmit} artistName={this.props.artistName || ''}/>
      </div>
    )
  }
}

export default Homepage

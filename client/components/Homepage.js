import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import Input from './Input.js'

class Homepage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      redirect: false,
      artistName: ''
    }
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.artistName !== this.props.artistName) {
      this.setState({redirect: false})
    }
  }

  onSubmit (artistName) {
    this.setState({redirect: true, artistName: artistName});
  }

  render () {
    if (this.state.redirect) {
      return <Redirect to={'/visualize/' + this.state.artistName} />;
    }

    return (
      <div style={{textAlign: 'center'}}>
        <h1>TEMPO</h1>
        <Input onSubmit={this.onSubmit} artistName={this.props.artistName || ''}/>
      </div>
    )
  }
}

export default Homepage

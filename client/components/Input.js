import React, { Component } from 'react';
import TextField from 'material-ui/TextField';

class Input extends Component {
  constructor (props) {
    super(props);

    this.state = {
      artistName: this.props.artistName || ''
    }

    this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
		var value = event.target.value;
		this.setState(function() {
			return {
				artistName: value
			}
		})
	}

	handleSubmit(event) {
		event.preventDefault();
		this.props.onSubmit(
			this.state.artistName
		)
	}

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <TextField
          hintText="Enter an artist"
          id='input'
          style = {{width: '50%'}}
          value={this.state.artistName}
				  onChange={this.handleChange}
        />
      </form>
    );
  }
}

export default Input;

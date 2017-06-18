import React, { Component } from 'react';
import { TextField } from 'material-ui';
import Autocomplete from 'react-autocomplete';

var styles = {
  item: {
    padding: '2px 6px',
    cursor: 'default'
  },

  highlightedItem: {
    color: 'white',
    background: 'hsl(200, 50%, 50%)',
    padding: '2px 6px',
    cursor: 'default'
  },

  menu: {
    border: 'solid 1px #ccc'
  }
}

class Input extends Component {
  constructor (props) {
    super(props);

    this.state = {
      artistName: this.props.artistName || '',
      dataSource: []
    }

    this.handleUpdateInput = this.handleUpdateInput.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUpdateInput(event) {
    var value = event.target.value
    this.setState({artistName: value})
    fetch('/artist/id/' + value)
      .then(res => res.json())
      .then(function (res) {
        this.setState({
          dataSource: res.data
        })
      }.bind(this))
		// this.setState(function() {
		// 	return {
		// 		artistName: value
		// 	}
		// })
	}

	handleSubmit(item) {
		event.preventDefault();
    // console.log(item)
		this.props.onSubmit(item)
	}

  renderItem(item, isHighlighted) {
    return (
      <div
        style={isHighlighted ? styles.highlightedItem : styles.item}
        key={item.id}
        id={item.name}
      >{item.name}</div>
    )
  }

  render() {
    console.log('rendering Input!')
    return (
      <Autocomplete
        getItemValue={(item) => {
          return item.name
        }}
        onSelect={(value, item) => {
         // set the menu to only the selected item
        //  console.log(item)
         this.handleSubmit(item)
         // or you could reset it to a default list again
         // this.setState({ unitedStates: getStates() })
       }}
        ref="autocomplete"
        items={this.state.dataSource}
        value={this.state.artistName}
        onChange={this.handleUpdateInput}
        renderItem={(item, isHighlighted) => this.renderItem(item, isHighlighted)}
      />
    );
  }
}

export default Input;

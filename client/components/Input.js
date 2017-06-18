import React, { Component } from 'react';
import Autocomplete from 'react-autocomplete';
import PropTypes from 'prop-types';

const styles = {
  item: {
    padding: '2px 6px',
    cursor: 'default',
  },

  highlightedItem: {
    color: 'white',
    background: 'hsl(200, 50%, 50%)',
    padding: '2px 6px',
    cursor: 'default',
  },
  menu: {
    border: 'solid 1px #ccc',
  },
};

function renderItem(item, isHighlighted) {
  return (
    <div
      style={isHighlighted ? styles.highlightedItem : styles.item}
      key={item.id}
      id={item.name}
    >{item.name}</div>
  );
}

class Input extends Component {
  constructor(props) {
    super(props);

    this.state = {
      artistName: this.props.artistName || '',
      dataSource: [],
    };

    this.handleUpdateInput = this.handleUpdateInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUpdateInput(event) {
    const value = event.target.value;
    this.setState({ artistName: value });
    fetch(`/artist/id/${value}`)
      .then(res => res.json())
      .then((res) => {
        this.setState({
          dataSource: res.data,
        });
      });
  }

  handleSubmit(item) {
    this.props.onSubmit(item);
  }

  render() {
    return (
      <Autocomplete
        getItemValue={item => item.name}
        onSelect={(value, item) => {
          this.handleSubmit(item);
        }}
        items={this.state.dataSource}
        value={this.state.artistName}
        onChange={this.handleUpdateInput}
        renderItem={renderItem}
      />
    );
  }
}

Input.propTypes = {
  artistName: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default Input;

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
    borderRadius: '3px',
    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
    background: 'rgba(255, 255, 255, 0.9)',
    padding: '2px 0',
    fontSize: '90%',
    position: 'fixed',
    overflow: 'auto',
    maxHeight: '50%',
    border: 'solid 1px #ccc',
    zIndex: 99,
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
      focus: false,
    };

    this.handleUpdateInput = this.handleUpdateInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onFocus(event) {
    event.preventDefault();
    this.setState({ focus: true });
  }

  onBlur(event) {
    event.preventDefault();
    this.setState({ focus: false });
  }

  handleSubmit(item) {
    this.props.onSubmit(item);
  }

  handleUpdateInput(event) {
    const value = event.target.value;
    this.setState({ artistName: value });
    fetch(`/artist/id/${value}`)
      .then(res => res.json())
      .then((res) => {
        if (res.data !== null) {
          this.setState({
            dataSource: res.data,
          });
        }
      });
  }

  render() {
    const inputStyle = {
      background: 'transparent',
      border: 'none',
      borderBottom: `2px solid ${this.state.focus ? '#E1F5FE' : '#FAFAFA'}`,
      width: '900',
      height: '30px',
      fontSize: '24px',
      color: '#FAFAFA',
      outline: 'none',
      padding: '0px 0px 0px 0px',
      fontStyle: 'italic',
    };


    return (
      <Autocomplete
        getItemValue={item => item.name}
        onSelect={(value, item) => {
          this.handleSubmit(item);
        }}
        inputProps={{
          style: inputStyle,
          onFocus: event => this.onFocus(event),
          onBlur: event => this.onBlur(event),
          placeholder: 'Enter an artist...',
        }}
        open={this.state.dataSource.length > 0 && this.state.focus}
        items={this.state.dataSource}
        value={this.state.artistName}
        onChange={this.handleUpdateInput}
        wrapperStyle={{ padding: 20 }}
        menuStyle={styles.menu}
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

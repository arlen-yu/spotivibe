import React, { Component } from 'react';
import Autocomplete from 'react-autocomplete';
import PropTypes from 'prop-types';
import { lightGreen, darkGrey } from '../../assets/colors';

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
      focus: false,
    };

    this.onChange = this.onChange.bind(this);
  }

  onFocus(event) {
    event.preventDefault();
    this.setState({ focus: true });
  }

  onBlur(event) {
    event.preventDefault();
    this.setState({ focus: false });
  }

  onKeyPress(event) {
    if (event.key === 'Enter') {
      this.props.onSubmit();
    }
  }

  onChange(event) {
    const value = event.target.value;
    this.props.onChange(value);
  }


  render() {
    const {
      artistName,
      dataSource,
      onSelect,
      open,
      inputStyles,
    } = this.props;

    return (
      <div style={{ paddingLeft: 100 }}>
        <Autocomplete
          getItemValue={item => item.name}
          onSelect={(value, item) => {
            onSelect(item);
          }}
          inputProps={{
            style: Object.assign(inputStyles, { borderBottom: `2px solid ${this.state.focus ? lightGreen : darkGrey}` }),
            onFocus: event => this.onFocus(event),
            onBlur: event => this.onBlur(event),
            onKeyPress: event => this.onKeyPress(event),
            placeholder: 'Enter an artist...',
          }}
          autoHighlight
          open={open}
          items={dataSource}
          value={artistName}
          onChange={this.onChange}
          wrapperStyle={{ padding: 20 }}
          menuStyle={styles.menu}
          renderItem={renderItem}
        />
      </div>
    );
  }
}

Input.propTypes = {
  artistName: PropTypes.string.isRequired,
  dataSource: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  open: PropTypes.bool,
  inputStyles: PropTypes.object,
};

Input.defaultProps = {
  inputStyles: {},
};

export default Input;

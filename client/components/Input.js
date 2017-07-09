import React, { Component } from 'react';
import Autocomplete from 'react-autocomplete';
import PropTypes from 'prop-types';
import { lightGreen, darkGrey } from '../../assets/colors';

const styles = {
  item: {
    cursor: 'default',
    textAlign: 'left',
    padding: 5,
    paddingTop: 10,
    paddingBottom: 10,
  },
  highlightedItem: {
    background: 'hsl(85, 63%, 70%)',
    padding: 5,
    paddingTop: 10,
    paddingBottom: 10,
    textAlign: 'left',
    cursor: 'default',
  },
  menu: {
    overflow: 'auto',
    maxHeight: '400',
    fontSize: 16,
    fontWeight: 600,
    borderRadius: '3px',
    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
    background: 'rgba(255, 255, 255, 0.9)',
    border: `2px solid ${lightGreen}`,
    fontFamily: 'San Francisco',
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
      <div style={{ width: '100%', height: 100 }}>
        <Autocomplete
          getItemValue={item => item.name}
          onSelect={(value, item) => {
            onSelect(item);
          }}
          inputProps={{
            style: Object.assign(inputStyles, { borderBottom: `4px solid ${this.state.focus ? lightGreen : darkGrey}` }),
            onFocus: event => this.onFocus(event),
            onBlur: event => this.onBlur(event),
            onKeyPress: event => this.onKeyPress(event),
            placeholder: 'Enter an artist...',
          }}
          autoHighlight
          open={open}
          items={dataSource.slice(0, 8)}
          value={artistName}
          onChange={this.onChange}
          wrapperStyle={{ position: 'absolute', zIndex: 99, paddingTop: 30 }}
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

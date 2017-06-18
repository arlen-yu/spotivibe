import { Paper } from 'material-ui';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

const paperStyle = {
  height: 200,
  width: 200,
  margin: 20,
};

class CustomTooltip extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.payload.length !== 0) {
      const uri = `https://open.spotify.com/embed?uri=${nextProps.payload[0].payload.uri}`;
      nextProps.onClick(uri);
    }
  }

  render() {
    if (this.props && this.props.payload.length !== 0) {
      // console.log('rendering tooltip!')
      const payload = this.props.payload[0].payload;
      return (
        <Paper style={paperStyle} zDepth={2}>
          <h2>{payload.name}</h2>
          <p>{`danceability: ${this.props.payload[0].value}`}</p>
          <p>{`energy: ${this.props.payload[1].value}`}</p>
        </Paper>
      );
    }
    return (<div>{'shit'}</div>);
  }
}

CustomTooltip.propTypes = {
  payload: PropTypes.arrayOf(PropTypes.any),
  onClick: PropTypes.func.isRequired,
};

CustomTooltip.defaultProps = {
  payload: [],
};

export default CustomTooltip;

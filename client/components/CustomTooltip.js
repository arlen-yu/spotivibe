import { Paper } from 'material-ui';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CustomTooltip extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.payload.length !== 0) {
      const uri = `https://open.spotify.com/embed?uri=${nextProps.payload[0].payload.uri}`;
      nextProps.onClick(uri);
    }
  }

  render() {
    const styles = {
      name: {
        fontSize: 18,
        padding: 0,
        fontWeight: 'bold',
        width: 170,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      },
      info: {
        fontSize: 14,
        padding: 0,
        fontStyle: 'italic',
      },
      paper: {
        height: 100,
        width: 200,
      },
    };
    if (this.props && this.props.payload.length !== 0) {
      const payload = this.props.payload[0].payload;
      return (
        <Paper style={styles.paper} zDepth={2}>
          <p style={styles.name}>{payload.name}</p>
          <p style={styles.info}>{`danceability: ${this.props.payload[0].value}`}</p>
          <p style={styles.info}>{`energy: ${this.props.payload[1].value}`}</p>
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

import { Paper } from 'material-ui';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CustomTooltip extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.payload.length !== 0 && nextProps.payload[0].payload.uri) {
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

    const {
      payload,
      onClick, // eslint-disable-line no-unused-vars
    } = this.props;

    if (this.props && payload.length !== 0) {
      return (
        <Paper style={styles.paper} zDepth={2}>
          <p style={styles.name}>{payload[0].payload.name}</p>
          <p style={styles.info}>{`danceability: ${payload[0].value}`}</p>
          <p style={styles.info}>{`energy: ${payload[1].value}`}</p>
        </Paper>
      );
    }
    return (<div>{'Error!'}</div>);
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

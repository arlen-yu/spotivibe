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
        padding: 5,
        fontWeight: 'bold',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        float: 'left',
        width: '100%',
      },
      info: {
        fontSize: 14,
        padding: 5,
        fontStyle: 'italic',
        float: 'left',
        width: '100%',
      },
      paper: {
        height: 100,
        width: 180,
      },
    };

    const {
      payload,
      onClick, // eslint-disable-line no-unused-vars
    } = this.props;

    if (this.props && payload.length !== 0) {
      return (
        <Paper style={styles.paper} zDepth={2}>
          <div style={styles.name}>{payload[0].payload.name}</div>
          <div style={styles.info}>{`danceability: ${payload[0].value}`}</div>
          <div style={styles.info}>{`energy: ${payload[1].value}`}</div>
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

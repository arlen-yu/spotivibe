import React, { Component } from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import IconButton from 'material-ui/IconButton';
import PlaylistAdd from 'material-ui/svg-icons/av/playlist-add';
import FlatButton from 'material-ui/FlatButton';
import PropTypes from 'prop-types';
import { lightGreen } from '../../assets/colors';
import Graph from './Graph';

class Billboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewBillboard: false,
    };
  }

  componentWillMount() {
    this.setState({ viewBillboard: false });
  }

  render() {
    const { onTooltipHover, handleAddBillboard } = this.props;
    const actionButton = (
      <IconButton
        onTouchTap={handleAddBillboard}
        style={{
          padding: 0,
        }}
        iconStyle={{
          width: 40,
          height: 40,
        }}
        tooltip={'Add to playlist'}
      >
        <PlaylistAdd color={lightGreen} />
      </IconButton>
    );

    let field;
    if (this.props.data && this.state.viewBillboard) {
      field = (<div style={{ width: 550, margin: 'auto', textAlign: 'center' }}>
        <div style={{ width: 300, margin: 'auto', height: 28 }}>
          <div style={{ fontSize: 28, float: 'left', fontWeight: 400 }}>Billboard Top 100</div>
          <div style={{ float: 'left', marginLeft: 10, marginTop: -5 }}>{actionButton}</div>
        </div>
        <Graph
          data={this.props.data}
          width={550}
          height={550}
          onClick={onTooltipHover}
        />
      </div>);
    } else if (!this.state.viewBillboard) {
      field = (<div style={{ width: 550, margin: 'auto', textAlign: 'center' }}>
        <FlatButton
          onTouchTap={() => {
            this.setState({ viewBillboard: true });
          }}
          label="view billboard top 100"
          style={{
            borderRadius: '32px',
            fontWeight: 600,
            fontSize: 32,
            backgroundColor: lightGreen,
          }}
        />
      </div>);
    } else {
      field = (<div style={{ width: 80, margin: 'auto', marginTop: '200px', textAlign: 'center' }}>
        <p>Loading... </p>
        <CircularProgress
          size={80}
          thickness={5}
          color="#212121"
        />
      </div>);
    }
    return (
      <div>
        {field}
      </div>
    );
  }
}

Billboard.propTypes = {
  onTooltipHover: PropTypes.func.isRequired,
  handleAddBillboard: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
};

export default Billboard;

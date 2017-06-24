import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom';
import IconButton from 'material-ui/IconButton';
import Share from 'material-ui/svg-icons/social/share';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import Input from './Input';

class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      artistData: null,
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.artistName !== this.props.artistName) {
      this.setState({ redirect: false });
    }
  }

  onSubmit(artistData) {
    this.setState({ redirect: true, artistData });
  }

  render() {
    if (this.state.redirect) {
      return (
        <Redirect to={{
          pathname: `/visualize/${this.state.artistData.name}`,
          state: { artistData: this.state.artistData },
        }}
        />
      );
    }

    return (
      <div>
        <Toolbar style={{ backgroundColor: '#212121', height: 80 }}>
          <ToolbarGroup firstChild>
            <ToolbarTitle text={
              <Link
                to="/"
                style={{
                  textDecoration: 'none',
                  fontSize: '36px',
                  fontFamily: 'Karla',
                  color: '#FAFAFA',
                  padding: 20,
                }}
              >
                <p className="header">SPOTIFY TEMPO</p>
              </Link>}
            />
            <Input onSubmit={this.onSubmit} artistName={this.props.artistName || ''} />
          </ToolbarGroup>
          <ToolbarGroup lastChild>
            <IconButton>
              <Share color={'#FAFAFA'} style={{ height: 40, width: 40 }} />
            </IconButton>
          </ToolbarGroup>
        </Toolbar>
      </div>
    );
  }
}

Homepage.propTypes = {
  artistName: PropTypes.string,
};

Homepage.defaultProps = {
  artistName: '',
  landing: true,
};

export default Homepage;

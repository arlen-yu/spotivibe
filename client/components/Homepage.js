import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
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

  componentWillReceiveProps() {
    this.setState({ redirect: false, artistData: null });
  }

  onSubmit(artistData) {
    if (artistData !== this.state.artistData) {
      this.setState({ redirect: true, artistData });
    }
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

    const {
      artistName,
      onToggleMenu,
    } = this.props;

    return (
      <div>
        <Toolbar style={{
          backgroundColor: '#212121',
          height: 50,
          position: 'fixed',
          top: 0,
          width: '100%',
          zIndex: 99,
        }}
        >
          <ToolbarGroup firstChild>
            <IconButton onTouchTap={onToggleMenu}>
              <MenuIcon color={'#FAFAFA'} style={{ height: 40, width: 40 }} />
            </IconButton>
            <ToolbarTitle text={
              <Link
                to="/"
                style={{
                  textDecoration: 'none',
                  fontSize: '24px',
                  fontFamily: 'Karla',
                  color: '#FAFAFA',
                  paddingLeft: 30,
                  paddingRight: 30,
                }}
              >
                <p className="header">SPOTIVIBE</p>
              </Link>}
            />
          </ToolbarGroup>
          <ToolbarGroup>
            <Input onSubmit={this.onSubmit} artistName={artistName || ''} />
          </ToolbarGroup>
        </Toolbar>
      </div>
    );
  }
}

Homepage.propTypes = {
  artistName: PropTypes.string,
  onToggleMenu: PropTypes.func.isRequired,
};

Homepage.defaultProps = {
  artistName: '',
};

export default Homepage;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom';
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
      <div className={this.props.landing ? 'mainHeadingLanding' : 'mainHeading'}>
        <div className="inputWrapper">
          <Link to="/" style={{ textDecoration: 'none' }}>
            <p className="header">tempo</p>
          </Link>
          <Input onSubmit={this.onSubmit} artistName={this.props.artistName || ''} />
        </div>
      </div>
    );
  }
}

Homepage.propTypes = {
  artistName: PropTypes.string,
  landing: PropTypes.bool,
};

Homepage.defaultProps = {
  artistName: '',
  landing: true,
};

export default Homepage;

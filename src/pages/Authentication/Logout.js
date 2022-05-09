import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../store/actions';

class Logout extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    // Fire Action for Remove all Item from localstorage and redirect to login page
    this.props.logout();
    localStorage.clear();
    this.props.history.push('/login');
  }

  render() {
    console.log(this.props.logout);
    return (
      <React.Fragment>
        <h1>&nbsp;</h1>
      </React.Fragment>
    );
  }
}

export default withRouter(connect(null, { logout })(Logout));

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { login } from './actions';

import './App.css';

const select = (state) => ({
  isValid: state.session.isValid,
});

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };
    
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }
  
  onFormSubmit(e) {
    e.preventDefault()
    if (this.props.isValid) {
      console.log('logging out');
    }
    else {
      this.props.login(this.state.username, this.state.password);
    }
  }

  render() {
    return (
      <div className="app">
        <div className="login">
          <div className="loginHeader">Login</div>
          <form className="loginForm" onSubmit={this.onFormSubmit}>
            <input className="input" placeholder='username' name='username' onChange={(e) => this.setState({ username: e.target.value })} />
            <input type='password' className="input" placeholder='password' name='password' onChange={(e) => this.setState({ password: e.target.value })} />
            <div className="button">
              <button type='submit'>{this.props.isValid ? 'Log out' : 'Login'}</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default connect(select, { login })(App);

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { login, logout } from './actions';

import './App.css';

const select = (state) => ({
  isValid: state.session.isValid,
  errors: state.session.errors,
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
    e.preventDefault();
    this.props.login(this.state.username, this.state.password);
  }

  render() {
    return (
      <div className="app">
        <div className="login">
          <div className="loginHeader">{this.props.isValid ? 'Welcome' : 'Login'}</div>
          <div className='errors'>{this.props.errors}</div>
          { this.props.isValid
              ? <div className="loginBody">
                  <div className='message'>Logged in.</div>
                  <div className="button">
                    <button onClick={this.props.logout}>Log out</button>
                  </div>
                </div>
              : <form className="loginBody" onSubmit={this.onFormSubmit}>
                  <input className="input" placeholder='username' name='username' onChange={(e) => this.setState({ username: e.target.value })} />
                  <input type='password' className="input" placeholder='password' name='password' onChange={(e) => this.setState({ password: e.target.value })} />
                  <div className="button">
                    <button type='submit'>Login</button>
                  </div>
                </form>
          }
        </div>
      </div>
    );
  }
}

export default connect(select, { login, logout })(App);

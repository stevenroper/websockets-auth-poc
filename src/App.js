import React, { Component } from 'react';
import { connect } from 'react-redux';

import { login, logout, updateCountdown } from './actions';

import { socket } from './index.js';

import './App.css';

const select = (state) => ({
  isValid: state.session.isValid,
  errors: state.session.errors,
  countdown: state.session.countdown,
});

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };
    
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onLogoutClick = this.onLogoutClick.bind(this);
  }
  
  onFormSubmit(e) {
    e.preventDefault();
    this.props.login(this.state.username, this.state.password)
      .then(res => {
        if (res.payload.status === 200) {
          this.setState({
            username: '',
            password: '',
          });
          socket.emit('loggedIn');
          socket.on('countdown', (countdown) => {
            this.props.updateCountdown(countdown);
          });
          socket.on('logout', () => {
            this.props.logout();
            socket.off('countdown');
          });
        }
      });
  }

  onLogoutClick() {
    socket.off('countdown');
    socket.off('logout');
    this.props.logout();
    socket.emit('manualLogout');
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
                  {this.props.countdown > 0
                    ? <div className='countdown'>You will be logged out in {this.props.countdown} seconds.</div>
                    : null
                  }
                  <div className="button">
                    <button onClick={this.onLogoutClick}>Log out</button>
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

export default connect(select, { login, logout, updateCountdown })(App);

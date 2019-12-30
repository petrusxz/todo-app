import React, { Component } from 'react';
import './SignIn.css';
import UserService from '../../services/UserService';
import { Link } from 'react-router-dom';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    try {
      await UserService.signIn(this.state.email, this.state.password);
      this.props.history.push('/home');
    } catch (error) {
      alert(error);
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="primary">
        <label>E-mail</label>
        <input
          type="email"
          name="email"
          value={this.state.email}
          onChange={this.handleChange}>
        </input>
        <label>Senha</label>
        <input
          type="password"
          name="password"
          value={this.state.password}
          onChange={this.handleChange}>
        </input>
        <input type="submit" value="Sign In" />
        <Link to="/sign-up" className="SignIn-nav">Sign Up</Link>
      </form>
    );
  }
}

export default SignIn;

import React, { Component } from 'react';
import './SignUp.css';
import UserService from '../../services/UserService';
import { Link } from 'react-router-dom';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
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
      await UserService.signUp(this.state.name, this.state.email, this.state.password);
      this.props.history.push('/home');
    } catch (error) {
      alert(error);
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="primary">
        <Link to="/sign-in" className="SignUp-nav">
          &larr;
          Back
          </Link>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={this.state.name}
          onChange={this.handleChange}>
        </input>
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
        <input type="submit" value="Sign Up" />
      </form>
    );
  }
}

export default SignUp;
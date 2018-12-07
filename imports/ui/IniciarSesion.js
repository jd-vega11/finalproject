import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import {FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
import {Redirect} from 'react-router-dom';


export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      error:'',
      redirectAppMain: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

  }

  validateForm() {
    return this.state.username.length > 0 && this.state.password.length > 0;
  }

  handleChange(event){
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit(event)
  {
    event.preventDefault();
    Meteor.loginWithPassword(this.state.username, this.state.password, (e) => {
      if (e) {
        console.log('[ERROR] No se realiza el login: ' + e.reason);
        this.setState({
          error: e.reason
        });
      }
      else {
        this.setState({
          error:'',
          redirectAppMain: !this.state.redirectAppMain
        });
      }
    });
  }

  appMainPage( )
  {
    if (this.state.redirectAppMain) {
      return <Redirect to={{
        pathname: '/produccioneslist'       
      }} />;
    } 

  }

  renderError( )
  {
    if(this.state.error !== '')
    {
      return(
        <div className="alert">      
          {this.state.error}
        </div>
      );   
    }
  }

  
  render() {
    return ( 
      <div className="submit">       
        <div className="content">          
          <div className="container">
            <div className="row justify-content-around banner-content center-items">
              {this.renderError()}
              <form onSubmit={this.handleSubmit} className="col-6 center-items">
                <FormGroup controlId="username" bsSize="large">
                  <ControlLabel className="auth-text">Username</ControlLabel>
                  <FormControl
                    type="text"
                    autoFocus
                    componentClass="input"                               
                    value={this.state.username}
                    onChange={this.handleChange}
                  />
                </FormGroup>
                <FormGroup controlId="password" bsSize="large">
                  <ControlLabel className="auth-text">Password</ControlLabel>
                  <FormControl
                    type="password"
                    value={this.state.password}
                    onChange={this.handleChange}                                
                  />
                </FormGroup>
                {this.appMainPage( )}                      

                <button type="submit" disabled={!this.validateForm()} className="btn btn-primary"> Sign In!</button>

                <div className="row">
                </div>
              </form>
            </div>               
          </div>
        </div>
      </div>
    );
  }
}
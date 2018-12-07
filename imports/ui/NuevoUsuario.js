import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import {Redirect} from 'react-router-dom';

class NuevoUsuario extends Component {


  constructor(props) {
    super(props);

    this.state = {
      error: '',
      redirectSignIn: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event){

    event.preventDefault();

    let newUser = {
      username: this.username.value,
      password: this.pass.value,
      profile: {
        nombre: this.nombre.value,
        profesion: this.profesion.value,
        intereses: this.intereses.value,
        descripcion: this.descripcion.value                  
      }
     
    };
    Accounts.createUser(newUser, (e) => {
      console.log(Meteor.user());
      if (!Meteor.user() || e) {
        console.log('[ERROR] No se realiza el signup: ' + e.reason);
        this.setState({
          error: e.reason
        });
      }
      else{
        console.log('Exito. Se agrego el usuario: ', newUser);
        //this.props.history.push('/');
        this.setState({
          error:'',
          redirectSignIn: !this.state.redirectSignIn
        });

        Meteor.call('artistas.insert', Meteor.userId(), newUser.profile,null,null,null,null,null,null,null,null,null,null);   
      }
    });


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

  signIn( )
  {
    if (this.state.redirectSignIn) {
      return <Redirect to={{
        pathname: '/iniciarsesion'       
      }} />;
    } 
  }
 
  render() { 
    return (      
      <div className="submit">       
        <div className="content">
          <div className="container">
            {this.renderError()}
            <div className="row">
              <form onSubmit={this.handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Username</label>
                      <input name="username" ref={(username) => this.username=username} className="form-control" required="required" type="text"/>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Password</label>
                      <input name="password" ref={(pass) => this.pass=pass} className="form-control" required="required" type="password"/>
                    </div>
                  </div>                 
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Nombre</label>
                      <input name="nombre" ref={(nombre) => this.nombre=nombre} className="form-control" required="required" type="text"/>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Profesion</label>
                      <input name="profesion" ref={(profesion) => this.profesion=profesion} className="form-control" required="required" type="text"/>
                    </div>
                  </div>                 
                </div>

                <div className="form-group">
                  <label>Tus intereses</label>
                  <textarea className="form-control" ref={(intereses) => this.intereses=intereses} rows="2"/>
                </div>

                <div className="form-group">
                  <label>¿Algo más que quieras decir sobre ti?</label>
                  <textarea className="form-control" ref={(descripcion) => this.descripcion=descripcion} rows="3"/>
                </div>   

                {this.signIn()}                  
                <button type="submit" className="btn btn-primary">Regístrate!</button>          
              
              </form>              
            </div>
          </div>
        </div>
      </div>);
  }
}

export default NuevoUsuario;

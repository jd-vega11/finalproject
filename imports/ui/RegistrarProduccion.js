import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

import ItemRol from './ItemRol.js';
import {Redirect} from 'react-router-dom';

// App component - represents the whole app

{/*
Considero que deberia existir un boton de ir hacia atras en caso en que uno no desee continuar con el registro de la produccion , 
tuve una duda con las producciones yo puedo registrar una produccion con fecha que ya paso ?  
*/}
class RegistrarProduccion extends Component {


  constructor(props) {
    super(props);

    this.state = {
      roles:[],
      consecutivoRoles:0, 
      error:'',
      redirectAppMain:false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNombreRol = this.handleNombreRol.bind(this);
    this.handleCantidadRol = this.handleCantidadRol.bind(this);

    this.agregarRol = this.agregarRol.bind(this);
  }

  
  handleSubmit(event){

    event.preventDefault();

    if(this.verificarRoles())
    {
      let nuevaProduccion = {
        nombre: this.nombre.value,
        tipo: this.tipo.value,
        fecha: this.fecha.value,
        hora: this.hora.value,
        lugar: this.lugar.value,
        duracion: parseInt(this.duracion.value, 10),
        genero: this.genero.value,
        grupo: this.grupo.value,
        descripcion: this.descripcion.value,
        roles:this.state.roles,
        usuario: Meteor.userId()             
      };     


      Meteor.call('producciones.insert', nuevaProduccion, (error, result) => {

        if(error)
        {
          console.log('Error al registrar la producción: ', error.reason);
          this.setState({
            error:error.reason         
          });
        }
        else {
          console.log('Se inserto una nueva produccion', nuevaProduccion);
          this.setState({
            error:'',
            redirectAppMain: !this.state.redirectAppMain
          });
        }

      }); 
    }
    else
    {
      this.setState({
        error: 'Debe tener por lo menos 1 rol registrado. Verifique y vuelva a intentar'
      });
    }
  }

  agregarRol(){

    var roles = this.state.roles.slice();

    roles.push(
      {
        rol:'',
        cantArtistas:0,
        key: this.state.consecutivoRoles
      });

    console.log('Se agrego nuevo rol vacio con key: ', this.state.consecutivoRoles);
      

    this.setState({
      roles: roles,
      consecutivoRoles: this.state.consecutivoRoles + 1
    });
  }

  handleNombreRol(key, rol){
    var roles = this.state.roles.slice();
    roles[key] = {
      rol:rol,
      cantArtistas:roles[key].cantArtistas,
      key: key
    };

    this.setState({
      roles: roles
    });

  }

  handleCantidadRol(key, number){
    var roles = this.state.roles.slice();
    roles[key] = {
      rol:roles[key].rol,
      cantArtistas:number,
      key: key
    };

    this.setState({
      roles: roles
    });
  }

  renderRoles()
  {

    return this.state.roles.map((rol)=>{

      console.log('Se renderiza rol con key: ', rol.key);
      return ( 
        <ItemRol 
          key = {rol.key}
          rolkey={rol.key}
          handleNombreRol = {this.handleNombreRol}
          handleCantidadRol = {this.handleCantidadRol}
          rol = {rol.rol}
          cant = {parseInt(rol.cantArtistas, 10)} 
        />        
      );
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

  verificarRoles( )
  {
   
    if(this.state.roles.length === 0)
    {
      return false;
    }

    var rta = true;
    for(const rol in this.state.roles)
    {
      if(rol.rol === '' || rol.cantArtistas <= 0)
      {
        rta = false;
      }
    }

    return rta;
  }

  appMainPage( )
  {
    if (this.state.redirectAppMain) {
      return <Redirect to={{
        pathname: '/produccioneslist'       
      }} />;
    } 

  }


  render() {
    return (
      <div className="container">
        {this.renderError()}           
        <div className="row">
          <div className="col-md-12">
            <form onSubmit={this.handleSubmit}>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Nombre</label>
                    <input name="nombre" ref={(nombre) => this.nombre=nombre} className="form-control" required="required" type="text"/>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Tipo</label>
                    <input name="tipo" ref={(tipo) => this.tipo=tipo} className="form-control" required="required" type="text"/>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Fecha</label>
                    <input name="fecha" ref={(fecha) => this.fecha=fecha} className="form-control" required="required" type="date"/>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Hora</label>
                    <input name="hora" ref={(hora) => this.hora=hora} className="form-control" required="required" type="time"/>
                  </div>
                </div> 
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Lugar</label>
                    <input name="lugar" ref={(lugar) => this.lugar=lugar} className="form-control" required="required" type="text"/>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Duración en minutos</label>
                    <input name="duracion" ref={(duracion) => this.duracion=duracion} className="form-control" type="number"/>
                  </div>
                </div> 
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Genero</label>
                    <input name="genero" ref={(genero) => this.genero=genero} className="form-control" required="required" type="text"/>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Grupo/Compañia</label>
                    <input name="grupo" ref={(grupo) => this.grupo=grupo} className="form-control" required="required" type="text"/>
                  </div>
                </div> 
              </div>
              <div className="form-group">
                <label>Descripción</label>
                <textarea className="form-control" ref={(descripcion) => this.descripcion=descripcion} rows="4"/>
              </div>

              {this.renderRoles()}

              <div className="row">
                <button type="button" className="" onClick={this.agregarRol}> Agregar rol</button>
              </div>
                       
              
              {this.appMainPage( )}    

              <div className="row">         
                <button type="submit" className="btn btn-submit"> Agregar Produccion </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }  

}

export default RegistrarProduccion;



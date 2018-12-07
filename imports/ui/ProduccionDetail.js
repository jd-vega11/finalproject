import React, {Component} from 'react';
import PropTypes from 'prop-types';
//import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Aplicaciones } from '../api/aplicaciones.js';
import {Link} from 'react-router-dom';

import { Artistas } from '../api/artistas.js';



class ProduccionDetail extends Component 
{

  constructor(props) {
    super(props);

    this.state = {
      error:'',
      aplicaciones:[],
      aplicacionNoRealizada:false
    };

    this.handleAplicar = this.handleAplicar.bind(this);

    this.verificarUnicaAplicacion = this.verificarUnicaAplicacion.bind(this);
  }

  handleAplicar(rol)
  {
    console.log('Nueva aplicacion en proceso user:', Meteor.userId());
    console.log('Nueva aplicacion en proceso prodId:', this.props.produccion._id);
    console.log('Nueva aplicacion en proceso prodNombre:',this.props.produccion.nombre);
    console.log('Nueva aplicacion en proceso rol:', rol);

    Meteor.call('aplicaciones.insert', this.props.produccion.usuario, this.props.produccion._id, this.props.produccion.nombre, rol, (error, result) => {

      if(error)
      {
        console.log('Error al registrar la aplicación: ', error.reason);        
        this.setState({
          error:'No fue posible enviar la solicitud: ' + error.reason                  
        });
      }
      else {
        var aplicaciones = this.state.aplicaciones;
        aplicaciones.push(rol.key);
        this.setState({
          error:'',
          aplicaciones:aplicaciones,
          aplicacionNoRealizada:true
        });
      }

    }); 
  }

  renderRoles( )
  {
    const roles = this.props.produccion.roles;

    const previaAplicacion = this.state.aplicacionNoRealizada || this.verificarUnicaAplicacion();

    return roles.map((rol)=>{
      return (
        <li key={rol.key} className="list-group-item d-flex justify-content-between align-items-center">
          
          <span id="info-produccion">{rol.rol}</span>

          <span className="badge badge-primary badge-pill">Cantidad requerida: {rol.cantArtistas}</span>
          { Meteor.userId() == null || 
            this.props.produccion.usuario == Meteor.userId() ||
            previaAplicacion ? '' : 
            <button type="button" className="btn btn-primary" onClick={()=>this.handleAplicar(rol)}>Aplicar</button>} 
        </li>
      );

    });
  }

  verificarUnicaAplicacion( )
  {
    const previaAplicacion = Aplicaciones.findOne({idProduccion:this.props.produccion._id, 
      idAplicante:Meteor.userId()});

    console.log('previaApp', previaAplicacion);

    return previaAplicacion !== undefined; 
  }

  verificarAplicacion(rol)
  {
    for(const aplicacion in this.state.aplicaciones)
    {
      console.log('verificando aplicacion guardada ', aplicacion);
      console.log('verificando rol ', rol.key);
      if(parseInt(aplicacion,10) === rol.key)
      {
        return true;
      }
      return false;
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
      <div>
        {this.renderError()}
        <div className="row">        
          <div className="col-md-4">
            <div className="card">        
              <div className="card-body">
                <h6 className="card-title" id="titulo-produccion">{this.props.produccion.nombre}</h6>
                <h6 className="card-subtitle mb-2 text-muted" id="subtitulo-produccion">Tipo: {this.props.produccion.tipo}</h6>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <span id="indicador-produccion">¿Cuándo? </span> 
                  <span id="info-produccion"> El {this.props.produccion.fecha} a las {this.props.produccion.hora}</span></li>
                <li className="list-group-item">
                  <span id="indicador-produccion">¿Dónde? </span>
                  <span id="info-produccion"> {this.props.produccion.lugar}</span></li>
                <li className="list-group-item">
                  <span id="indicador-produccion">Agrupación/compañia: </span>
                  <span id="info-produccion"> {this.props.produccion.grupo}</span></li>
              </ul>            
            </div>
          </div>
          <div className ="col-md-7">
            <div className="card">
              <Link to={{pathname: `/artistaslist/${this.props.produccion.usuario}`, state: {artista: Artistas.findOne({idArtista:this.props.produccion.usuario})}}}>
                <button type="button" className="btn" id="btn-masinfo-artista">
                  <i className="fas fa-search-plus" id="icono-masinfo"></i>
                  ¿Quién publica?
                </button>
              </Link>        
              <div className="card-body">
                <h6 className="card-title"> 
                  <span id="indicador-produccion">Genero: </span>
                  <span id="info-produccion"> {this.props.produccion.genero}</span></h6>
                <h6 className="card-subtitle">
                  <span id="indicador-produccion">Duracion: </span>
                  <span id="info-produccion"> {this.props.produccion.duracion} minutos</span></h6>
                <p className="card-text">
                  <span id="indicador-produccion">Descripcion: </span>
                  <span id="info-produccion">{this.props.produccion.descripcion}</span></p>
                <p className="card-text" id="indicador-produccion">Roles</p>
              </div>            
              <ul className="list-group">
                {this.renderRoles()}
              </ul>
            </div>
          </div>
          <div className = "col-md-1">
            <button type="button" className="btn" id="btn-cerrar" onClick={this.props.handleCerrarDetail}>X</button>
          </div>
        </div> 
      </div> 
    );
    
  }
}

ProduccionDetail.propTypes = {
  currentUser: PropTypes.object,
  produccion: PropTypes.object.isRequired,
  handleCerrarDetail: PropTypes.func.isRequired
};

export default ProduccionDetail;
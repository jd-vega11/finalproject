import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import { Artistas } from '../api/artistas.js';

export default class AplicantesCard extends Component {

  constructor(props) {
    super(props);

    this.state = {
      
    };

    this.removerAplicacion = this.removerAplicacion.bind(this);
    this.aceptarAplicacion = this.aceptarAplicacion.bind(this);
    this.rechazarAplicacion = this.rechazarAplicacion.bind(this);
    this.marcarComoLeida = this.marcarComoLeida.bind(this);
    this.marcarComoNoLeida = this.marcarComoNoLeida.bind(this);
    this.handleMasInformacionArtista = this.handleMasInformacionArtista.bind(this);
  }

  aceptarAplicacion() {
    Meteor.call('aplicaciones.aceptar', this.props.aplicacion._id);
  }

  rechazarAplicacion() {
    Meteor.call('aplicaciones.rechazar', this.props.aplicacion._id);
  }

  removerAplicacion() {
    Meteor.call('aplicaciones.remover', this.props.aplicacion._id);
  }

  marcarComoLeida( )
  {
    Meteor.call('aplicaciones.marcarcomoleida', this.props.aplicacion._id);
  }

  marcarComoNoLeida( )
  {
    Meteor.call('aplicaciones.marcarcomonoleida', this.props.aplicacion._id);
  }

  handleMasInformacionArtista()
  {
    return this.props.handleSeleccionDetail(this.props.aplicacion.idAplicante);
  }   

  renderBotones( )
  {
    if(this.props.aplicacion.idPublicador == this.props.currentUser)
    {
      if(this.props.aplicacion.aceptada)
      {
        return(<div className="card-body">
          <span className="badge badge-primary badge-pill">Aceptada</span>          
        </div>);

      }
      if(this.props.aplicacion.rechazada)
      {
        return(<div className="card-body">
          <span className="badge badge-primary badge-pill">Rechazada</span>          
        </div>);
      } 

      return(
        <div className="card-body">
          <a href="#" className="btn pr-sm-3 btn-primary"onClick={this.aceptarAplicacion}>Aceptar</a>
          <a href="#" className="btn btn-primary" onClick={this.rechazarAplicacion}>Rechazar</a>
        </div>
      );

    }
  }

  render() {
    return (
      <div className="card">        
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span id="indicador-produccion">Nombre Producción: </span> 
            <span id="info-produccion">{this.props.produccion.nombre}</span></li>
          
          <li className="list-group-item">
            <span id="indicador-produccion">Descripción: </span> 
            <span id="info-produccion">{this.props.produccion.descripcion}</span></li>
          
          <li className="list-group-item">
            <span id="indicador-produccion">Aplicante: </span>
            <Link to={{pathname: `/artistaslist/${this.props.aplicacion.idAplicante}`, state: {artista: Artistas.findOne({idArtista:this.props.aplicacion.idAplicante})}}}>
              <button type="button" className="btn btn-primary">
                <i className="fas fa-search-plus" id="icono-masinfo"></i>
                {this.props.aplicacion.usernameAplicante}
              </button>
            </Link> 
          </li>          
          
          <li className="list-group-item">
            <span id="indicador-produccion">Rol aplicado: </span>
            <span id="info-produccion">{this.props.aplicacion.rol.rol}</span></li>
        </ul>

        {this.renderBotones()}        

        {this.props.aplicacion.idPublicador = this.props.currentUser ?
          <div className="card-body">
              
            {this.props.aplicacion.leidaPublicador === false ? 
              <a href="#" className="btn btn-primary" onClick={this.marcarComoLeida}>Marcar como leída</a>
              :
              <a href="#" className="btn btn-primary" onClick={this.marcarComoNoLeida}>Dejar no leída</a>}
          </div> : ''}
      </div>
    );
  }
}

AplicantesCard.propTypes = {
  produccion: PropTypes.object.isRequired,
  aplicacion: PropTypes.object.isRequired,
  usuario:PropTypes.object.isRequired,
  currentUser: PropTypes.string.isRequired,
  handleSeleccionDetail:PropTypes.func
};
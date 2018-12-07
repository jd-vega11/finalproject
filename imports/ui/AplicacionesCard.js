import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import { Artistas } from '../api/artistas.js';

export default class AplicacionesCard extends Component {

  constructor(props) {
    super(props);
    this.removerAplicacion = this.removerAplicacion.bind(this);
    this.marcarComoLeida = this.marcarComoLeida.bind(this);
    this.marcarComoNoLeida = this.marcarComoNoLeida.bind(this);
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

  renderAceptado( )
  {
    if(this.props.aplicacion.idAplicante == this.props.currentUser)
    {
      if(this.props.aplicacion.aceptada)
      {
        return(
          <div>
            <span className="badge badge-primary badge-pill">Aceptada</span>  
            <br/>
          </div>        
        );

      }
      if(this.props.aplicacion.rechazada)
      {
        return(
          <div>
            <span className="badge badge-primary badge-pill">Rechazada</span> 
            
          </div>        
        );
      } 
      return(
        <div>
          <span className="badge badge-primary badge-pill">En espera</span> 
          
        </div>        
      );
    }
  }

  render() {
    return (
      <div className="card">            
        <ul className="list-group list-group-flush">        
          <li className="list-group-item">
            <span id="indicador-produccion">Estado solicitud:</span> {this.renderAceptado()}</li> 
          <li className="list-group-item">
            <span id="indicador-produccion">Nombre: </span> 
            <span id="info-produccion">{this.props.produccion.nombre}</span></li>          
          <li className="list-group-item">
            <span id="indicador-produccion">Rol aplicado: </span> 
            <span id="info-produccion">{this.props.aplicacion.rol.rol}</span></li>
          <li className="list-group-item">
            <span id="indicador-produccion">Descripción: </span> 
            <span id="info-produccion">{this.props.produccion.descripcion}</span></li>
          <li className="list-group-item">
            <span id="indicador-produccion">Fecha: </span>
            <span id="info-produccion">{this.props.produccion.fecha}</span></li>
          <li className="list-group-item">
            <span id="indicador-produccion">Hora: </span>
            <span id="info-produccion">{this.props.produccion.hora}</span></li>
          <li className="list-group-item">
            <span id="indicador-produccion">Lugar: </span>
            <span id="info-produccion">{this.props.produccion.lugar}</span></li>
          <li className="list-group-item">
            <span id="indicador-produccion">Tipo: </span>
            <span id="info-produccion">{this.props.produccion.tipo}</span></li>
          <li className="list-group-item">
            <span id="indicador-produccion">Genero: </span>
            <span id="info-produccion">{this.props.produccion.genero}</span></li>
          <li className="list-group-item">
            <span id="indicador-produccion">Duración: </span>
            <span id="info-produccion">{this.props.produccion.duracion}</span></li>
          <li className="list-group-item">
            <span id="indicador-produccion">Publicador:  </span>
            <Link to={{pathname: `/artistaslist/${this.props.aplicacion.idPublicador}`, state: {artista: Artistas.findOne({idArtista:this.props.aplicacion.idPublicador})}}}>
              <button type="button" className="btn btn-primary">
                <i className="fas fa-search-plus" id="icono-masinfo"></i>               
              </button>
            </Link> 
          </li> 
        </ul>

        {/*boton para borrar la aplicacion*/}
        {this.props.aplicacion.idAplicante = this.props.currentUser ?
          <div className="card-body">
            <a href="#" className="btn btn-primary" onClick={this.removerAplicacion}>Borrar aplicacion</a>
            {this.props.aplicacion.leidaAplicante === false ? 
              <a href="#" className="btn btn-primary" onClick={this.marcarComoLeida}>Marcar como leída</a>
              :
              <a href="#" className="btn btn-primary" onClick={this.marcarComoNoLeida}>Dejar no leída</a>
            }
          </div> : ''}
      </div>
    );
  }
}

AplicacionesCard.propTypes = {
  produccion: PropTypes.object.isRequired,
  aplicacion: PropTypes.object.isRequired,
  currentUser:PropTypes.string.isRequired
};
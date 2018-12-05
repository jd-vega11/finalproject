import React, {Component} from 'react';
import PropTypes from 'prop-types';
//import { withTracker } from 'meteor/react-meteor-data';
//import { Meteor } from 'meteor/meteor';
//import { Aplicaciones } from '../api/aplicaciones.js';

class ArtistaDetail extends Component 
{

  constructor(props) {
    super(props);

    this.state = {
      error:''
    };

    //this.handleAplicar = this.handleAplicar.bind(this);
  }

  /*handleAplicar(rol)
  {
    console.log('Nueva aplicacion en proceso user:', Meteor.userId());
    console.log('Nueva aplicacion en proceso prodId:', this.props.produccion._id);
    console.log('Nueva aplicacion en proceso prodNombre:',this.props.produccion.nombre);
    console.log('Nueva aplicacion en proceso rol:', rol);

    Meteor.call('aplicaciones.insert', Meteor.userId(), this.props.produccion._id, this.props.produccion.nombre, rol, (error, result) => {

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
          aplicaciones:aplicaciones         
        });
      }

    }); 
  }*/

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
        <div className="card-deck pb-sm-4">      
          
          <div className="card justify-content-between align-items-center w-50">
            <img className="card-img-top rounded-circle w-25" src="img.png" alt="Profile picture" />
            <div className="card-body">
              <h5 className="card-title">{this.props.artista.profile.nombre}</h5>
            </div>
            <div className="card-footer">
              <small className="text-muted">{this.props.artista.profile.profesion}</small>
            </div>
          </div>
          
         
          <div className="card">        
            <div className="card-body">
              <h6 className="card-title">Intereses</h6>               
              <p className="card-text">{this.props.artista.profile.intereses}</p>
            </div>                     
          </div>            
         
          
          <div className="card">        
            <div className="card-body">
              <h6 className="card-title"><b>Un poco más sobre </b>{this.props.artista.profile.nombre} </h6>               
              <p className ="tags">Descripción</p><p className="card-text">{this.props.artista.profile.descripcion}</p>
              {
                this.props.artista.headline != null ? 
                <div><p className ="tags">Encabezado</p><p className="card-text">{this.props.artista.headline}</p></div>
                  : ''
              }
              {
                this.props.artista.industry != null ? 
                  <div><p className ="tags">Nombre</p><p className="card-text">{this.props.artista.firstName}</p></div>
                  : ''
              }
              {
                this.props.artista.industry != null ? 
                  <div><p className ="tags">Apellido</p><p className="card-text">{this.props.artista.lastName}</p></div>
                  : ''
              }
              {
                this.props.artista.industry != null ? 
                  <div><p className ="tags">Industria</p><p className="card-text">{this.props.artista.industry}</p></div>
                  : ''
              }
              {
                this.props.artista.location != null ? 
                  <div><p className ="tags">Ubicación</p><p className="card-text">{this.props.artista.location}</p></div>
                  : ''
              }
              {
                this.props.artista.numPositions != null ? 
                  <div><p className ="tags">Número de posiciones</p><p className="card-text">{this.props.artista.numPositions}</p></div>
                  : ''
              }
            </div>                     
          </div>
        
          <div className = "col-md-1">
            <button type="button" className="btn btn-primary" onClick={this.props.handleCerrarDetail}>X</button>
          </div>
        </div> 
      </div> 
    );
    
  }
}

ArtistaDetail.propTypes = {
  artista: PropTypes.object.isRequired,
  handleCerrarDetail: PropTypes.func.isRequired
};

export default ArtistaDetail;
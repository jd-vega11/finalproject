import React, {Component} from 'react';
import PropTypes from 'prop-types';
//import { withTracker } from 'meteor/react-meteor-data';
//import { Meteor } from 'meteor/meteor';
//import { Aplicaciones } from '../api/aplicaciones.js';
import NavBar from './NavBar.js';

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

        <NavBar />

        {this.renderError()}  

        <div className="container">     

          <div className="row">  
            
            <div className="col-md-4">
              <div className="card justify-content-between align-items-center">            
                <img className="card-img-top rounded-circle w-50" src="img.png" alt="" />
                <div className="card-body">
                  <p id="item-artista-name">{this.props.location.state.artista.profile.nombre}</p>
                  <h1 id="item-artista-profesion">{this.props.location.state.artista.profile.profesion}</h1>          
                </div>
                <div className="card-footer">
                  {
                    this.props.location.state.artista.numPositions != null  ?                                  
                      <p className="card-text">Ha participado en {this.props.location.state.artista.numPositions} proyectos</p>
                           
                      : ''
                  }  
                  
                </div>           
              </div>

              {this.props.location.state.artista.email !=null ? 
                <div className="card">        
                  <div className="card-body"  id="linkedIn-artista">
                    <p id="titulo-infoartista">Contacto</p>               
                    <p className="card-text" id="email-artista">{this.props.location.state.artista.email}</p>
                    
                    <a href={this.props.location.state.artista.urlProfile} target="_blank">
                      <i className="fab fa-linkedin fa-5x"></i>
                    </a>
                    
                  </div>                     
                </div> 
                : ''}
              

            </div>          
           
            <div className="col-md-7">

              {
                this.props.location.state.artista.firstName != null && this.props.location.state.artista.lastName !=null ? 
                  <div className="card">        
                    <div className="card-body">
                      <p id="titulo-infoartista">Nombre completo</p>               
                      <p className="card-text">{this.props.location.state.artista.firstName} {this.props.location.state.artista.lastName}</p>
                    </div>                     
                  </div>                
                  : ''
              }    

              <div className="card">        
                <div className="card-body">
                  <p id="titulo-infoartista">Intereses</p>               
                  <p className="card-text">{this.props.location.state.artista.profile.intereses}</p>
                </div>                     
              </div> 

              <div className="card">        
                <div className="card-body">
                  <p id="titulo-infoartista">Un poco más sobre {this.props.location.state.artista.profile.nombre}</p>               
                  <p className="card-text">{this.props.location.state.artista.profile.descripcion}</p>
                </div>                     
              </div>

              {
                this.props.location.state.artista.headline != null ? 
                  <div className="card">        
                    <div className="card-body">
                      <p id="titulo-infoartista">Breve descripción</p>               
                      <p className="card-text">{this.props.location.state.artista.headline}</p>
                    </div>                     
                  </div>                
                  : ''
              }

              {
                this.props.location.state.artista.industry != null && this.props.location.state.artista.location != null ? 
                  <div className="card">        
                    <div className="card-body">
                      <p id="titulo-infoartista">Sector y Ubicación</p>               
                      <p className="card-text">{this.props.location.state.artista.industry}</p>
                      <p className="card-text">{this.props.location.state.artista.location}</p>
                    </div>                     
                  </div>                
                  : ''
              }  

            </div>
          
           {/* <div className = "col-md-1">
              <button type="button" id="btn-cerrar" className="btn" onClick={this.props.handleCerrarDetail}>X</button>
            </div>*/}
          </div> 
        </div> 
      </div>
    );
    
  }
}

ArtistaDetail.propTypes = {
  location: PropTypes.object
  //handleCerrarDetail: PropTypes.func
};

export default ArtistaDetail;
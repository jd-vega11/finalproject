import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Aplicaciones } from '../api/aplicaciones.js';
import { Artistas } from '../api/artistas.js';

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      RegistradoLinkedIn: false,
      mostrar: false
    };

    this.verificarLinkedIn = this.verificarLinkedIn.bind(this);
    this.cargarBoton = this.cargarBoton.bind(this);
    this.cargaMongo = this.cargaMongo.bind(this);
  }

  cerrarSesion() {
    if (Meteor.user()) {
      Meteor.logout((e) => {
        if (e !== undefined) {
          console.log('ERROR: no fue posible realizar un logout:' + e);
        }
      });
    }
  }

  cargarBoton() {
    if(this.state.mostrar===false)
    {
      if(typeof Artistas.find({idArtista: this.props.currentUser._id}).fetch()[0] !== "undefined" && Artistas.find({idArtista: this.props.currentUser._id}).fetch()[0].headline == null)
      {
        this.setState({ mostrar: true });
      }
    }
  }

  cargaMongo(data) {
    const firstName = data.firstName;
    const lastName = data.lastName;
    const headline = data.headline;
    const industry = data.industry;
    const location = data.location.name;
    const numConnections = data.numConnections;
    const numPositions = data.positions._total;
    const urlProfile = data.publicProfileUrl;
    const picture = data.pictureUrl;
    const email = data.emailAddress;
    Meteor.call('artistas.linkedInUpdate', Artistas.find({idArtista: this.props.currentUser._id}).fetch()[0]._id, firstName,lastName,headline,industry,location,numConnections,numPositions, picture, email, urlProfile); 
    this.setState({mostrar: false});  
  }

  verificarLinkedIn()
  {
    if (this.props.currentUser != null) {
      if(Artistas.find({}).fetch().length !== 0)
      {
        this.cargarBoton();
      }
    }
  }
  
  componentDidUpdate()
  {
    if (this.props.currentUser != null) {
      if(Artistas.find({}).fetch().length !== 0)
      {
        this.cargarBoton();
      }
    }
  }

  componentDidMount() {
    if(Artistas.find({}).fetch().length !== 0){
         this.verificarLinkedIn();
      }
    console.log(window.location.href);
    var url_string = window.location.href;
    var url = new URL(url_string);
    var c = url.searchParams.get("code");

    if (c != null) {
      this.setState({ RegistradoLinkedIn: true });

      Meteor.call('AccesoApi', c, (err, datos) => {console.log(datos);this.cargaMongo(datos);});

    }

    console.log(c);
  }

  render() {
    return (
      <nav className="navbar navbar-light bg-light sticky-top" id="minavbar">
        <a className="navbar-brand nav-link hvr-icon-grow linksnavbar" href="/">
          <i className="fas fa-theater-masks linksnavbar"></i>
          AdE
        </a>

        {this.props.currentUser ?

          <div className="row" id="linksnavbar">

            {this.state.mostrar ?
              <a href="https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=78thawjoan2g2s&redirect_uri=https://finalprojectr11.herokuapp.com&state=DCEeFWf45A53sdfKef424">
                <div className="col nav-item navbar-tab">
                  <p>Conéctate con LinkedIn</p>
                  <i className="fab fa-linkedin iconos"></i>
                </div>
              </a> : ''
            }
            <div className="col nav-item navbar-tab ">
              <Link className="nav-link hvr-underline-from-center linksnavbar" to="/produccioneslist">Producciones</Link>
              <i className="fas fa-palette iconos"></i>
            </div>

            <div className="col nav-item navbar-tab">
              <Link className="nav-link hvr-underline-from-center linksnavbar" to="/artistaslist">Artistas</Link>
              <i className="fab fa-pied-piper-hat iconos"></i>
            </div>

            <div className="col nav-item navbar-tab">
              <Link className="nav-link hvr-underline-from-center linksnavbar" to="/misaplicaciones">Aplicaciones</Link>
              <i className="fas fa-hand-pointer iconos">{this.props.misaplicaciones.length > 0 ?
                  <span className="badge badge-primary badge-pill">{this.props.misaplicaciones.length}</span>
                  : ''}
              </i>
            </div>

            <div className="col nav-item navbar-tab">
              <Link className="nav-link hvr-underline-from-center linksnavbar" to="/misaplicantes">Aplicantes</Link>
              <i className="fas fa-pen-fancy iconos">{this.props.aplicantes.length > 0 ?
                <span className="badge badge-primary badge-pill">{this.props.aplicantes.length}</span>
                : ''}
              </i>
            </div>

            <div className="col nav-item navbar-tab">
              <Link className="nav-link hvr-underline-from-center linksnavbar" to="/nuevaproduccion">Agregar producción</Link>
            </div>

            <div className="col nav-item navbar-tab">
              <button type="button" className="btn btn-primary" onClick={this.cerrarSesion.bind(this)}>Cerrar sesión</button>
            </div>
          </div>

          :
          <div className="row">
            <div className="col nav-item navbar-tab">
              <Link className="nav-link hvr-underline-from-center linksnavbar" to="/produccioneslist">Producciones</Link>
              <i className="fas fa-palette iconos"></i>
            </div>
            <div className="col nav-item navbar-tab">
              <Link className="nav-link hvr-underline-from-center linksnavbar" to="/nuevousuario">Registrarse</Link>
              <i className="fas fa-user-plus iconos"></i>
            </div>
            <div className="col nav-item navbar-tab">
              <Link className="nav-link hvr-underline-from-center linksnavbar" to="/iniciarsesion">Iniciar</Link>
              <i className="fas fa-sign-in-alt iconos"></i>
            </div>
          </div>

        }


      </nav>
    );
  }
}

NavBar.propTypes = {
  currentUser: PropTypes.object,
  aplicantes: PropTypes.array,
  misaplicaciones: PropTypes.array
};

export default withTracker(() => {

  Meteor.subscribe('aplicaciones');
  Meteor.subscribe('artistas');

  return {
    usuarios: Artistas.find({}).fetch(),
    aplicantes: Aplicaciones.find({ $and: [{ idPublicador: Meteor.userId() }, { leidaPublicador: false }] }).fetch(),
    misaplicaciones: Aplicaciones.find({ $and: [{ idAplicante: Meteor.userId() }, { leidaAplicante: false }] }).fetch(),
    currentUser: Meteor.user()
  };
})(NavBar);

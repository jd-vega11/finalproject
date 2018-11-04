import React, { Component } from 'react';
import { Aplicaciones } from '../api/aplicaciones.js';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import AccountsUIWrapper from './AccountsUIWrapper.js';
import PropTypes from 'prop-types';
import AplicacionesCard from './AplicacionesCard.js';

class AplicantesApp extends Component {

    constructor(props) {
        super(props);
        this.setRedirect = this.setRedirect.bind(this);
        this.renderRedirect = this.renderRedirect.bind(this);
        this.renderAplicantes = this.renderAplicantes.bind(this);
    }

    setRedirect() {
        this.setState({
            redirect: true
        });
    }

    renderRedirect() {
        if (this.state.redirect) {
            return <Redirect to={{
                pathname: '/'
            }} />;
        }
    }

    renderAplicantes() {
        let aplicacionesFiltradas = this.props.aplicaciones;
        let idUsuario = this.props.currentUser && this.props.currentUser._id;

        //se filtran las aplicaciones a las que el id publicador sea igual al mio
        aplicacionesFiltradas = aplicacionesFiltradas.filter(aplicacion => aplicacion.idPublicador == idUsuario);

        return aplicacionesFiltradas.map((aplicacion) => {
               
        //busco al usuario de esta aplicacion
        let usuario = Meteor.users.findOne(aplicacion.idPublicador);
          
          return (
                <AplicantesCard
                    key={aplicacion._id}
                    usuario={usuario}
                    aplicacion={aplicacion}
                    currentUser={this.props.currentUser && this.props.currentUser._id}
                />
            );
        });
    }

    render() {
        return (
            <div>
                {/*navvar*/}
                <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
                    <h3 className="navbar-brand">NOMBRE</h3>
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                        <li className="nav-item">
                            <AccountsUIWrapper />
                        </li>
                    </ul>
                </nav>

                <div className="container prueba">
                    {this.renderRedirect()}
                    <button className="btn btn-primary inicio btn-lg" onClick={this.setRedirect}>Devolverse</button>
                </div>

                {/*aplicaciones reenderizadas*/}
                <ul>
                    {this.renderAplicantes()}
                </ul>

            </div>
        );
    }
}

AplicantesApp.propTypes = {
    aplicaciones: PropTypes.array.isRequired,
    currentUser: PropTypes.object
};

export default withTracker(() => {
    //se suscribe a la coleccion aplicaciones y producciones
    Meteor.subscribe('aplicaciones');

    //se ordena del ultimo creado al mas viejo
    return {
        aplicaciones: Aplicaciones.find({}, { sort: { createdAt: -1 } }).fetch(),
        currentUser: Meteor.user()
    };
})(AplicantesApp);

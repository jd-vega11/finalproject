import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

class ItemArtista extends Component 
{

  constructor(props) {
    super(props);

/*    this.state = {
    };


    this.handleMasInformacion = this.handleMasInformacion.bind(this);*/
  }
  
 /* handleMasInformacion()
  {
    return this.props.handleSeleccionDetail(this.props.artista._id);
  } */   

  render() {
    return (
      <div className="card justify-content-between align-items-center">
        <Link to={{pathname: `/artistaslist/${this.props.artista.idArtista}`, state: {artista: this.props.artista}}}>
          <button type="button" className="btn" id="btn-masinfo-artista">
            <i className="fas fa-search-plus" id="icono-masinfo"></i>
          </button>
        </Link>
        {this.props.artista.picture !== undefined ?

          <img className="card-img-top rounded-circle w-50" src={this.props.artista.picture} alt="Profile picture" />
          :

          <img className="card-img-top rounded-circle w-50" src="img.png" alt="Profile picture" />
        }
        <div className="card-body">
          <p id="item-artista-name">{this.props.artista.profile.nombre}</p>
          <h1 id="item-artista-profesion">{this.props.artista.profile.profesion}</h1>          
        </div>
        <div className="card-footer">
          
        </div>           
      </div> 
                 
    );
    
  }
}

ItemArtista.propTypes = {
  artista: PropTypes.object.isRequired,
  //handleSeleccionDetail:PropTypes.func.isRequired
};

export default ItemArtista;
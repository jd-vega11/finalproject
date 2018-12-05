import React, {Component} from 'react';
import PropTypes from 'prop-types';

class ItemArtista extends Component 
{

  constructor(props) {
    super(props);

    this.state = {
    };


    this.handleMasInformacion = this.handleMasInformacion.bind(this);
  }
  
  handleMasInformacion()
  {
    return this.props.handleSeleccionDetail(this.props.artista._id);
  }    

  render() {
    return (
      
      <div className="card justify-content-between align-items-center w-50">
        <img className="card-img-top rounded-circle w-25" src="img.png" alt="Profile picture" />
        <div className="card-body">
        {this.props.artista.headline != null ? <div><i className="fab fa-linkedin iconoLink"></i><br/></div>:''}
          <a href="#"><button type="button" className="btn btn-primary" onClick = {this.handleMasInformacion}>
            <h5 className="card-title">{this.props.artista.profile.nombre}</h5>
          </button></a>
        </div>
        <div className="card-footer">
          <small className="text-muted">{this.props.artista.profile.profesion}</small>
        </div>
      </div>  
       
    );
    
  }
}

ItemArtista.propTypes = {
  artista: PropTypes.object.isRequired,
  handleSeleccionDetail:PropTypes.func.isRequired
};

export default ItemArtista;
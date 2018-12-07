import React, {Component} from 'react';
import PropTypes from 'prop-types';

class ItemProduccion extends Component 
{

  constructor(props) {
    super(props);

    this.state = {
    };


    this.handleMasInformacion = this.handleMasInformacion.bind(this);
  }

  handleMasInformacion()
  {
    return this.props.handleSeleccionDetail(this.props.produccion._id, this.props.rowNumber);
  }    

  render() {
    return (
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
        <div className="card-body">
          <button type="button" className="btn btn-primary" onClick={this.handleMasInformacion}>Más información</button>           
        </div>
      </div>  
    );
    
  }
}

ItemProduccion.propTypes = {
  produccion: PropTypes.object.isRequired,
  usuario: PropTypes.object,
  handleSeleccionDetail:PropTypes.func.isRequired,
  rowNumber: PropTypes.number
};

export default ItemProduccion;
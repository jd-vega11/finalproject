import React, {Component} from 'react';
import PropTypes from 'prop-types';

class ItemRol extends Component 
{

  constructor(props) {
    super(props);

    this.state = {
    };

    this.handleNombreRol = this.handleNombreRol.bind(this);
    this.handleCantidadRol = this.handleCantidadRol.bind(this);
  }

  handleNombreRol(event)
  {
    return this.props.handleNombreRol(this.props.rolkey, event.target.value);
  }

  handleCantidadRol(event)
  {
    return this.props.handleCantidadRol(this.props.rolkey, event.target.value);
  }    

  render() {
    return (
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label>Rol</label>
            <input name="rol" className="form-control" required="required" type="text" onChange={this.handleNombreRol}/>
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label>Cantidad artistas </label>
            <input name="cantArtistas" className="form-control" required="required" type="number" onChange={this.handleCantidadRol}/>
          </div>
        </div> 
      </div>   
    );
  }
}

ItemRol.propTypes = {
  handleNombreRol: PropTypes.func.isRequired,
  handleCantidadRol: PropTypes.func.isRequired,
  rolkey:PropTypes.number.isRequired,
  rol:PropTypes.string,
  cant: PropTypes.number   
};

export default ItemRol;
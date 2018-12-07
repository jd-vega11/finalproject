import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import ItemArtista from './ItemArtista.js';
//import ArtistaDetail from './ArtistaDetail.js';
import PropTypes from 'prop-types';
import NavBar from './NavBar.js';
import { Artistas } from '../api/artistas.js';


class ArtistasList extends Component {

  constructor(props) {
    super(props);

     this.state = {
      filter:''
    };
  /*   this.handleSeleccionDetail = this.handleSeleccionDetail.bind(this);
    this.handleCerrarDetail = this.handleCerrarDetail.bind(this);*/
  }

  renderArtistas( )
  {
    var filteredArtistas = this.props.usuarios;
    if(this.state.filter !== '')
    {

        filteredArtistas = this.props.usuarios.filter(
        (artista) => {
          return (artista.profile.nombre.toLowerCase().indexOf(this.state.filter.toLowerCase()) !== -1) ||
          (artista.profile.profesion.toLowerCase().indexOf(this.state.filter.toLowerCase()) !== -1) ||
          (artista.profile.intereses.toLowerCase().indexOf(this.state.filter.toLowerCase()) !== -1) ||
          (artista.profile.descripcion.toLowerCase().indexOf(this.state.filter.toLowerCase()) !== -1);
        });

    }

    return filteredArtistas.map((usuario)=>{

      /*  if(this.state.mostrarDetail)
      {
        if(this.state.mostrarDetail === usuario._id)
        {
          return <div key={usuario._id}></div>;
        }
      }     */ 
       
      return (
        <div key={usuario._id} className="col-md-3">
          <ItemArtista artista={usuario} handleSeleccionDetail={this.handleSeleccionDetail}/>
        </div>);
    });
  }

  /*  handleSeleccionDetail(artistaId)
  {
    //console.log('Selecciono el produccion con id: ', artistaId);
    this.setState({
      mostrarDetail:artistaId      
    });
  }*/

  /*  handleCerrarDetail()
  {
    this.setState({
      mostrarDetail:undefined      
    });
  }
*/
  /* renderDetail()
  {
    if(this.state.mostrarDetail)
    {

      return (<ArtistaDetail 
        artista={Artistas.findOne({_id:this.state.mostrarDetail})}
        handleCerrarDetail={this.handleCerrarDetail}/>        
      );
    }
  }*/

  updateFilter(evt) {
    this.setState({filter: evt.target.value.substr(0, 20)});
  }

  renderBarraBusqueda()
  {
    return (
      <div id="bloque-busquedas">
        <span id="busquedas">Busca por palabras clave:  </span>
        <input type="text" value={this.state.filter} placeholder='Ejemplo: bailarin' onChange={this.updateFilter.bind(this)}/>
      </div>);
  }

  render() {
    return (
      <div>  
        <NavBar />
        <div className="container pt-sm-3">
          {this.renderBarraBusqueda()} 
          <div className="row">
            {this.renderArtistas()}  
          </div>        
        </div>
          
      </div>
    );
  }  

}

ArtistasList.propTypes = {
  usuarios: PropTypes.array.isRequired
};


export default withTracker(() => {

  Meteor.subscribe('artistas');
  return {
    usuarios: Artistas.find({}).fetch()
  };
})(ArtistasList);



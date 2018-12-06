import React, { Component } from 'react';
import NavBar from './NavBar.js';
import '../../client/home.css';
export default class App extends Component {

  constructor(props) {
    super(props);
  }
  {/*
  Seria bueno que el usuario supiera que debe bajar para ver estas opciones , a primera vista parece que fuera una sola pagina de web  
  de home, no se intuye que hay que bajar 
  */}
  render() {
    return (
        <div className="header-2">
        <NavBar/>
        <div className="page-header h-80">
          <div className="filter"></div>
          <div className="content-center">
            <div className="container">
              <div className="row">
                <div className="col-md-12 text-left">              
                  <h1 className="title">El Arte de Encontrarnos</h1>
                    <div className="p6">
                    <p align="justify">Forma vínculos con artistas de todo el mundo
                    para sacar tus producciones adelante.</p>
                    <p align="justify">¡Todo el mundo está esperando para trabajar contigo!</p>
                  </div>                                                                                                       
                </div>
                <div className="row">
                </div>
              </div>              
            </div>
          </div>
        </div>
        <div className="section-gray">
          <div className="container">
            <div className="row">
              <div className="subtitle content-center col-lg-12 col-md-12 text-center">
                <h2>¿Qué te ofrecemos?</h2>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <div className="info">
                  <div className="icon icon-danger">
                    <i className="fas fa-edit"/>
                  </div>
                  <div className="description">
                    <h4 className="info-title">Registra producciones</h4>
                    <p className="description">Puedes publicar tus producciones para que otras personas las puedan ver.</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="info">
                  <div className="icon icon-danger">
                    <i className="fas fa-search"></i>
                  </div>
                  <div className="description">
                    <h4 className="info-title">Buscar producciones</h4>
                    <p className="description">Si deseas encontrar producciones de otros artistas, lo puedes hacer!</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="info">
                  <div className="icon icon-danger">
                    <i className="fas fa-hand-pointer"></i>
                  </div>
                  <div className="description">
                    <h4 className="info-title">Aplicar a producciones</h4>
                    <p> Puedes aplicar a producciones de otras personas para que ellos te acepten en sus obras.</p>
                  </div>
                </div>
              </div>  
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="info">
                  <div className="icon icon-danger">
                    <i className="fas fa-users"/>
                  </div>
                  <div className="description">
                    <h4 className="info-title">Ver aplicantes</h4>
                    <p className="description">Todos los aplicantes a tus obras están esperando a que los recibas!</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="info">
                  <div className="icon icon-danger">
                  <i className="far fa-id-card" aria-hidden="true"></i>
                  </div>
                  <div className="description">
                    <h4 className="info-title">Ver artistas</h4>
                    <p className="description">Los perfiles de los artistas están disponibles para que los revises.</p>
                  </div>
                </div>
              </div> 
            </div>
          </div>
        </div>
      </div>
    );
  }  
}

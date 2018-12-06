import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import { Producciones } from '../api/producciones.js';

import NavBar from './NavBar.js';
import ProduccionesList from './ProduccionesList.js';
import PropTypes from 'prop-types';

//
class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <div>        
        <ProduccionesList />          
      </div>
    );
  }  

}

App.propTypes = {
  producciones: PropTypes.array.isRequired,
  currentUser: PropTypes.object
};


export default withTracker(() => {

  Meteor.subscribe('producciones');
  
  return {
    producciones: Producciones.find({}).fetch(),
    currentUser: Meteor.user()
  };
})(App);



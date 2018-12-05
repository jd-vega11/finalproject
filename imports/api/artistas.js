import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { HTTP } from 'meteor/http'

export const Artistas = new Mongo.Collection('artistas');

if (Meteor.isServer) {
  // Se publica la coleccion de companies
  Meteor.publish('artistas', function artistasPublication() {
    return Artistas.find();
  });
}

Meteor.methods({

  //se inserta un nuevo artista. 
  'artistas.insert'(idArtista,profile,firstName,lastName,headline,industry,location,numConnections,numPositions) {

    check(idArtista, String);

    Artistas.insert({
      idArtista,
      profile,
      firstName,
      lastName,
      headline,
      industry,
      location,
      numConnections,
      numPositions     
    });
  },
  'artistas.linkedInUpdate'(idArtista,firstName,lastName,headline,industry,location,numConnections,numPositions) {

    check(idArtista, String);

    Artistas.update(idArtista, { $set: { firstName: firstName, lastName:lastName, headline:headline, industry:industry, location:location, numConnections:numConnections, numPositions:numPositions} });
  },

  'AccesoApi'(c) {
    let token =  HTTP.call('POST', 'https://www.linkedin.com/oauth/v2/accessToken?grant_type=authorization_code&code=' + c + '&redirect_uri=https://finalprojectr11.herokuapp.com&client_id=78thawjoan2g2s&client_secret=SstD4bmgYig2cTV0')
    let access = JSON.parse(token.content).access_token;
    
    let datos = HTTP.call('GET','https://api.linkedin.com/v1/people/~:(public-profile-url,id,positions,specialties,first-name,last-name,headline,num-connections,location,industry,summary,picture-url)?format=json&oauth2_access_token=' + access);
    let respuesta = JSON.parse(datos.content);

   return respuesta; 
  }
});
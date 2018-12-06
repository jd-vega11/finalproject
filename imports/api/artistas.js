import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

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
    //check(profile, String)
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
  }
});

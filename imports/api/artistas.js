import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { HTTP } from 'meteor/http';

export const Artistas = new Mongo.Collection('artistas');

if (Meteor.isServer) {
  // Se publica la coleccion de companies
  Meteor.publish('artistas', function artistasPublication() {
    return Artistas.find();
  });
}

Meteor.methods({

  //se inserta un nuevo artista. 
  'artistas.insert'(idArtista,profile,firstName,lastName,headline,industry,location,numConnections,numPositions, picture, email, urlProfile) {

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
      numPositions,
      picture,
      email,
      urlProfile     
    });
  },
  'artistas.linkedInUpdate'(idArtista,firstName,lastName,headline,industry,location,numConnections,numPositions, picture, email, urlProfile) {

    check(idArtista, String);

    Artistas.update(idArtista, { $set: { firstName: firstName, lastName:lastName, headline:headline, industry:industry, location:location, numConnections:numConnections, numPositions:numPositions, picture: picture, email:email, urlProfile:urlProfile} });
  },

  'AccesoApi'(c) {
    let token =  HTTP.call('POST', 'https://www.linkedin.com/oauth/v2/accessToken?grant_type=authorization_code&code=' + c + '&redirect_uri=https://finalprojectr11.herokuapp.com&client_id=78thawjoan2g2s&client_secret=SstD4bmgYig2cTV0');
    let access = JSON.parse(token.content).access_token;
    
    
    let datos = HTTP.call('GET','https://api.linkedin.com/v1/people/~:(public-profile-url,id,positions,specialties,first-name,last-name,headline,num-connections,location,industry,summary,picture-url,email-address)?format=json&oauth2_access_token=' + access);
    let respuesta = JSON.parse(datos.content);

    console.log('datos api', respuesta);

   /* let picture = HTTP.call('GET','https://api.linkedin.com/v1/people/~:(picture-url)?format=json&oauth2_access_token=' + access);
    let respuesta_picture = JSON.parse(picture.content);

    console.log('datos api', respuesta_picture);

    let email = HTTP.call('GET','https://api.linkedin.com/v1/people/~:(email-address)?format=json&oauth2_access_token=' + access);
    let respuesta_email = JSON.parse(email.content);

    console.log('datos api', respuesta_email);
  */
    return respuesta; 
  }
});
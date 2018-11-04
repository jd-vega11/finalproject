import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import './main.html';
import '../imports/startup/accounts-config.js';
import { AppRoutes } from '../imports/routes.js';

import NavBar from '../imports/ui/NavBar.js';

Meteor.startup(() => {
  render(<AppRoutes />, document.getElementById('render-target'));
});

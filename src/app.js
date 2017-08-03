'use strict';
import React, { Component } from 'react';
import {AppRegistry, View} from 'react-native';
import {StackNavigator} from 'react-navigation';

import ContactsActivity from './activities/contactsActivity';
import FavouriteActivity from './activities/favouriteActivity';
import {Tabbar} from './router';

export default class App extends Component {

  // Render Application
  render() {
   return (
     <Tabbar/>
   );
 }
};

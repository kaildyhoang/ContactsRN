import React from 'react';
import {StackNavigator,TabNavigator} from 'react-navigation';
import {Text, TouchableOpacity,Image} from 'react-native';

import styles from './styles/styles';
import ContactsActivity from './activities/contactsActivity';
import FavouriteActivity from './activities/favouriteActivity';
import AddNewContactActivity from './activities/addNewContact';
import EditContactActivity from './activities/editContact';
import ViewContactActivity from './activities/viewContact';

export const ContactsStack = StackNavigator({
  Contacts_Screen:{
    screen: ContactsActivity,
    navigationOptions: ({ navigation }) => ({
      title: 'Contacts',
      headerRight:
                  <TouchableOpacity
                    style = {{marginRight:15}}
                    onPress = {() => navigation.navigate('AddNewContact_Screen')}>
                    <Image
                      style={{width:30, height:30}}
                      source={require('./drawable/add.png')}
                    />
                  </TouchableOpacity>
    }),
  },
  AddNewContact_Screen:{
    screen: AddNewContactActivity,
    navigationOptions: {
      title: 'Add New Contact'
    }
  },
  ViewContact_Screen:{
    screen: ViewContactActivity,
    navigationOptions: {
      title: 'View Contact'
    }
  },
  EditContact_Screen:{
    screen: EditContactActivity,
    navigationOptions: {
      title: 'Edit Contact'
    }
  },
});
export const FavouriteStack = StackNavigator({
  Favourite_Screen:{
    screen: FavouriteActivity,
    navigationOptions: {
      title: 'Favourite'
    }
  },
});

export const Tabbar = TabNavigator({
  Cont: {
    screen: ContactsStack,
    navigationOptions:{
      tabBarLabel:
      <Image
       style={{width:30,height:30}}
       source={require('./drawable/contactlist.png')}
      />
    }
  },
  Fav: {
    screen: FavouriteStack,
    navigationOptions:{
      tabBarLabel:
      <Image
       style={{width:30,height:30}}
       source={require('./drawable/favouritelist.png')}
      />
    }
  },
},
{
  tabBarPosition:'bottom',
  tabBarOptions: {
		activeTintColor: 'white',
		inactiveTintColor: 'lightgray',
		labelStyle: {
			fontSize: 10,
		},
		style: {
			backgroundColor: '#002171',
			borderTopWidth: 5,
			borderTopColor: '#000051'
		},
	}

}
);

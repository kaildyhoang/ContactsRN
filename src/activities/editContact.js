import React, { Component } from 'react';
import {AppRegistry, StyleSheet, Image, Alert, Text, View, TextInput, Button, TouchableHighlight, ListView, TouchableOpacity} from 'react-native';
import CheckBox from 'react-native-checkbox';
var ImagePicker = require('react-native-image-picker');

import styles from '../styles/styles';

const Realm = require('realm');
const ContactSchema = { //Create Object
  name: 'ContactMngPerson',
  primaryKey: 'id',
  properties: {
    id: 'string',
    name: 'string',
    phoneNo: 'string',
    avatar:'string',
    fav:'bool'
  }
};

var options = {
  title: 'Select Avatar',
  customButtons: [
    
  ],
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};
let realm = new Realm({schema: [ContactSchema]});

let contactObj = realm.objects('ContactMngPerson');

export default class EditContact extends Component {
  constructor(props){
    super(props)
    this.state ={
      id:this.props.navigation.state.params.id,
      name:this.props.navigation.state.params.name,
      phoneNo:this.props.navigation.state.params.phoneNo,
      avatar:this.props.navigation.state.params.avatar,
      fav:this.props.navigation.state.params.fav,
    }
  }
  updateName = (text) =>{
    this.setState({name:text})
  }

  updatePhoneNo = (text) =>{
    this.setState({phoneNo:text})
  }

  updateFav = (checked) => {
    this.setState({fav:checked})
  }
  choiceImg = () => {
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        // let source = { uri: response.uri };

        let source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          avatar:response.data
        });
      }
    });
  }
  editContact = () => {
    realm.write(() => {
       realm.create('ContactMngPerson',{
         id: this.state.id,
         name: this.state.name,
         phoneNo: this.state.phoneNo,
         avatar: this.state.avatar,
         fav: this.state.fav
       }, true);
    });
    alert("Congrats! Edited");
    this.goBack();
  }

  deleteContact = () => {
    realm.write(() => {
       realm.delete(realm.create('ContactMngPerson',{id: this.props.navigation.state.params.id}, true));
    });
    alert("Congrats! Deleted");
    this.goBack();
  }
  goBack = () => {
    this.props.navigation.navigate('Contacts_Screen');
  }

  render() {
   return (
     <View style = {styles.editContainer}>
       <View style={styles.imageView}>
         <TouchableOpacity
           onPress = {() =>
              this.choiceImg()
            }>
          <Image
           style={{width:100,height:100, borderRadius:100, borderWidth:3, borderColor:'#002171'}}
           source={{uri: `data:image/gif;base64,${this.state.avatar}`}}
          />
         </TouchableOpacity>
       </View>
       <View style={styles.editContent}>
         <Text style = {styles.textNormal}>FULL NAME</Text>
         <TextInput
            style = {styles.addInput}
            autoCapitalize = 'none'
            value = {this.state.name}
            onChangeText = {this.updateName}
          />
          <Text style = {styles.textNormal}>PHONE NUMBER</Text>
          <TextInput
             style = {styles.addInput}
             autoCapitalize = 'none'
             value = {this.state.phoneNo}
             onChangeText = {this.updatePhoneNo}
          />

          <CheckBox
             label='Favourite'
             labelStyle={{
               fontSize: 15,
               marginLeft: 5,
               fontWeight: 'bold',
               marginTop:20,
             }}
             checkboxStyle = {{
               marginTop:20,
             }}
             underlayColor = {'transparent'}
             checked={!this.state.fav}
             onChange={(checked)=>  this.setState({fav:checked})}
           />
       </View>
       <View style = {styles.delContainer}>
         <Text style = {styles.textDel} onPress = {() => this.deleteContact(this.state.id)}>
            Delete Contact
         </Text>
       </View>
       <View style = {styles.editFooter}>
         <TouchableOpacity
           style = {styles.button}
           onPress = {() => this.editContact()}>
          <Text style = {styles.buttonText}>OK</Text>
         </TouchableOpacity>
       </View>
     </View> //End View parent
   );
 }
};

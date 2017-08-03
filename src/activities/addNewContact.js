'use strict';
import React, { Component } from 'react';
import {AppRegistry,Image, StyleSheet, Text, View, TextInput, Button, TouchableHighlight, ListView, TouchableOpacity} from 'react-native';
import CheckBox from 'react-native-checkbox';
import styles from '../styles/styles';
var ImagePicker = require('react-native-image-picker');
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

export default class AddNewContact extends Component {

  constructor(){
    super()
    this.state ={
      name:'',
      phoneNo:'',
      fav:true,
      avatarSource:require('../drawable/contact.png'),
      avatar:''
    }
  }

  updateName = (text) =>{
    this.setState({name:text})
  }

  updatePhoneNo = (text) =>{
    this.setState({phoneNo:text})
  }
  s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
   .toString(16)
   .substring(1);
  }
  getuid = () => {
    return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' +
    this.s4() + '-' + this.s4() + this.s4() + this.s4();
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
          avatarSource: source,
          avatar:response.data
        });
      }
    });
  }
  addnewContact = () => {
    var baseId = this.getuid();
    realm.write(() => {
       realm.create('ContactMngPerson',{
         id: baseId,
         name: this.state.name,
         phoneNo: this.state.phoneNo,
         avatar:this.state.avatar,
         fav: this.state.fav,
       });
    });
    alert("Congrats! Added");
    this.props.navigation.navigate('Contacts_Screen');
  }
  render() {
   return (
     <View style = {styles.addContainer}>
       <View style={styles.imageShow}>
         <TouchableOpacity
         onPress = {() =>
            this.choiceImg()
          }>
          <Image
           style={{width:100,height:100, borderRadius:100, borderWidth:3, borderColor:'#002171'}}
           source={this.state.avatarSource}
          />
         </TouchableOpacity>

       </View>
       <View style = {styles.addContent}>
         <Text style = {styles.textNormal}>FULL NAME</Text>
         <TextInput
           style = {styles.addInput}
           placeholder = 'Full Name...'
           autoCapitalize = 'none'
           onChangeText = {this.updateName}/>
         <Text style = {styles.textNormal}>PHONE NUMBER</Text>
         <TextInput
           style = {styles.addInput}
           placeholder = 'Phone number... '
           autoCapitalize = 'none'
           onChangeText = {this.updatePhoneNo} />

           <CheckBox
              label='Favourite'
              onChange={(checked) =>this.setState({fav:checked})}
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
            />
       </View>
       <View style = {styles.addFooter}>
         <TouchableOpacity
         style = {styles.button}
         onPress = {() =>
            this.addnewContact(this.state.name,this.state.phoneNo,this.state.avatar,this.state.fav)
          }>
         <Text style = {styles.buttonText}>ADD</Text>
         </TouchableOpacity>
       </View>
     </View> //End View parent
   );
 }
}

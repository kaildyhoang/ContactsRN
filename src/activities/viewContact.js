import React, { Component } from 'react';
import {AppRegistry, StyleSheet, Image, Text,
  View, TextInput, Button, TouchableHighlight,
  ListView, TouchableOpacity} from 'react-native';

import Communications from 'react-native-communications';
import styles from '../styles/styles';

export default class ViewContact extends Component {
  render() {
   return (
     <View style = {styles.viewContainer}>

       <View style={styles.imageView}>
         <Image
          style={{width:100,height:100,marginTop:20, borderRadius:100, borderWidth:3, borderColor:'#002171'}}
          source={{uri: `data:image/gif;base64,${this.props.navigation.state.params.avatar}`}}
         />
         <Text style = {styles.imageTextView}>{this.props.navigation.state.params.name}</Text>
       </View>
       <View style = {styles.communicationsMng}>
        <TouchableOpacity onPress = {() =>  {Communications.phonecall(this.props.navigation.state.params.phoneNo, true)} }>
         <Image
          style={{width:40,height:40,marginRight:20}}
          source={require('../drawable/phonecall.png')}
         />
        </TouchableOpacity>
        <TouchableOpacity onPress = {() =>  {Communications.text(this.props.navigation.state.params.phoneNo)} }>
           <Image
            style={{width:40,height:40}}
            source={require('../drawable/sendmes.png')}
           />
         </TouchableOpacity>
       </View>
       <View style = {styles.viewContent}>

         <Text style = {styles.textView}>phone number</Text>
         <Text style = {styles.textView2}
          onPress = {() =>  {Communications.phonecall(this.props.navigation.state.params.phoneNo, true)} }>{this.props.navigation.state.params.phoneNo}</Text>

         <Text>{this.props.navigation.state.params.fav}</Text>
       </View>

       <View style = {styles.viewFooter}>
         <TouchableOpacity
         style = {styles.button}
         onPress = {() => this.props.navigation.navigate('EditContact_Screen',
         {
           id:this.props.navigation.state.params.id,
           name:this.props.navigation.state.params.name,
           phoneNo:this.props.navigation.state.params.phoneNo,
           avatar:this.props.navigation.state.params.avatar,
           fav:this.props.navigation.state.params.fav,
         }
         )}>
         <Text style = {styles.buttonText}>EDIT</Text>
         </TouchableOpacity>
       </View>
     </View> //End View parent
   );
 }
};

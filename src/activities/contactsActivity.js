'use strict';
import React, { Component } from 'react';
import {AppRegistry,RefreshControl, Image, StyleSheet, Text, View, TextInput, Button, TouchableHighlight, ListView, TouchableOpacity} from 'react-native';
import { Kaede } from 'react-native-textinput-effects';

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

let realm = new Realm({schema: [ContactSchema]});

let contactObj = realm.objects('ContactMngPerson');

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class ContactsActivity extends Component {

  constructor(){
    super()
    this.state = {
      reached: 5,
      dataSource: ds,
      refreshing: false,
    }
  }

  genRows = () => {
    var data = [];
    for (var i = 0; i < contactObj.length; i++) {
      data.push({
        'id':contactObj[i].id ,
        'name': contactObj[i].name,
        'phoneNo': contactObj[i].phoneNo,
        'avatar':contactObj[i].avatar,
        'fav': contactObj[i].fav,
         }
     ); //End Push
    }
    return data.slice(0,6);
  };

  searchedByName = (searchedText) => {
    var data = [];
    var searching;
    var end = false;
    for (var i = 0; i < contactObj.length; i++) {
      searching = contactObj[i].name.indexOf(searchedText);
      if(searching > -1){
        data.push({
          'id':contactObj[i].id ,
          'name': contactObj[i].name,
          'phoneNo': contactObj[i].phoneNo,
          'avatar':contactObj[i].avatar,
          'fav': contactObj[i].fav,
           }
       ); //End Push
     }
    }
      this.setState({dataSource: this.state.dataSource.cloneWithRows(data)});
  };
  _onEndReached = () => {
    var data = [];
    var reachedPlus = this.state.reached + 1;
    if(this.state.reached < contactObj.length){
      for (var i = 0; i < this.state.reached; i++) {
        data.push({
          'id':contactObj[i].id ,
          'name': contactObj[i].name,
          'phoneNo': contactObj[i].phoneNo,
          'avatar':contactObj[i].avatar,
          'fav': contactObj[i].fav,
           }
       ); //End Push
     }
     this.setState({reached: reachedPlus,dataSource: this.state.dataSource.cloneWithRows(data)});
   }
  }
  _onRefresh() {
     this.setState({refreshing: true});
       var data = [];
       var reachedPlus = this.state.reached + 1;
       if(this.state.reached < contactObj.length){
         for (var i = 0; i < this.state.reached; i++) {
           data.push({
             'id':contactObj[i].id ,
             'name': contactObj[i].name,
             'phoneNo': contactObj[i].phoneNo,
             'avatar':contactObj[i].avatar,
             'fav': contactObj[i].fav,
              }
          ); //End Push
         }
        this.setState({reached: reachedPlus,dataSource: this.state.dataSource.cloneWithRows(data)});
       }
       this.setState({refreshing: false});
   }
  componentDidMount = () => {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.genRows()),
    });
  }

  render() {
   return (
        <View style = {styles.container}>
          <Kaede
             style = {styles.inputCustom}
             onChangeText = {this.searchedByName}
             placeholder = 'Search something...'
             label={
              <Image
                style={{width:80,height:80}}
                source={require('../drawable/search.png')}
              />
            }
            labelStyle={{
              color: 'white',
              backgroundColor: '#002171',
              height: 40
            }}
            inputStyle={{
              color: '#000051',
              backgroundColor: '#b3e5fc',
            }}
          />
          <ListView style = {styles.listView}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
            />}
          onEndReached={this._onEndReached.bind(this)}
          onEndReachedThreshold={10}
          dataSource={this.state.dataSource}
          enableEmptySections={true}
          renderSeparator={(sectionID, rowID, adjacentRowHighlighted) => {
             return (
               <View key = {`${sectionID}-${rowID}`} style = {{ height: 3, backgroundColor: adjacentRowHighlighted ? 'blue' : '#002171',}}/>
             );
           }}

           renderRow={(rowData, sectionID, rowID) =>
               <TouchableOpacity  underlayColor = '#4FC3F7'
                                  key = {rowID}
                                  data = {rowData}
                                  onPress = {() => this.props.navigation.navigate('ViewContact_Screen',
                                  {
                                    id : rowData.id,
                                    name: rowData.name,
                                    phoneNo: rowData.phoneNo,
                                    avatar: rowData.avatar,
                                    fav: rowData.fav,
                                  }
                                )}>
                <View style = {styles.listItem}>
                  <View style={styles.imageContact}>
                    <Image
                     style={{width:60,height:60, margin:2, borderRadius:100, borderWidth:1, borderColor:'white'}}
                     source={{uri: `data:image/gif;base64,${rowData.avatar}`}}
                    />
                  </View>
                  <View style = {styles.textInfo}>
                    <Text style = {styles.item}>{rowData.name}</Text>
                    <Text style = {styles.item}>{rowData.phoneNo}</Text>
                  </View>
                </View>
              </TouchableOpacity>
           }
           //End ListView
          />
            <View>
            <Text style = {styles.item}>{contactObj.length} Contacts</Text>
            </View>
      </View>
   );
 }
}

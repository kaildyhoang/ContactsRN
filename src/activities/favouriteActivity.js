'use strict';
import React, { Component } from 'react';
import {AppRegistry,Image,RefreshControl
  , StyleSheet, Text, View, TextInput, Button,
  TouchableHighlight, ListView, TouchableOpacity} from 'react-native';

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

export default class FavouriteActivity extends Component {

  constructor(){
    super()
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      visibleModal: null,
      name:'',
      phoneNo:'',
      avatar:'',
      fav:'',
      dataSource: ds.cloneWithRows(this.genRows()),
      refreshing: false,
    }
  }

  genRows = () => {
    var data = [];
    for (var i = 0; i < contactObj.length; i++) {
      if(contactObj[i].fav.toString() == 'false'){
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
    return data;
  };

  alertSth = (id,name,phoneNo,fav) => {
   //  var sth = this.state.dataSource.map.index;
   var key = id+'\n'+name+'\n'+phoneNo + '\n' + fav;
    alert(key)
  }

  _onRefresh() {
    this.setState({refreshing: true});
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.genRows()),
    });
    this.setState({refreshing: false});
   }
  render() {
   return (
     <View>
       <View>
         <Text style = {styles.swipeItem}>Swipe to Refresh</Text>
       </View>
        <ListView style = {styles.listView1}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
            />}
          dataSource={this.state.dataSource}
          enableEmptySections={true}
          renderSeparator={(sectionID, rowID, adjacentRowHighlighted) => {
             return (
               <View key = {`${sectionID}-${rowID}`} style = {{ height: 3, backgroundColor: adjacentRowHighlighted ? 'blue' : '#002171',}}/>
             );
           }}

           renderRow={(rowData, sectionID, rowID) =>
               <TouchableOpacity underlayColor = '#4FC3F7' key = {rowID} data = {rowData}
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
                     <View style = {styles.imageFav}>
                       <Image
                        style={{width:20,height:20,backfaceVisibility :'hidden'}}
                        source={require('../drawable/favourite.png')}
                       />
                     </View>
                   </View>
                 </View>
              </TouchableOpacity>
           }
         //End ListView
        />
     </View> //End View parent
   );
 }
}

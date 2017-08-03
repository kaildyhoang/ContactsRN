import { StyleSheet } from 'react-native';
export default StyleSheet.create ({
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    marginTop:10,
    paddingTop:10
  },
  box:{
    alignItems:'center',
    justifyContent:'center',
    marginTop:10,
    width:200
  },
  inputCustom:{
    marginBottom:10,
    width:400,
    height:50,
    backgroundColor: '#000051'
  },
   item: {
      fontSize: 15,
      marginLeft: 10,
      fontWeight: 'bold',
      textAlign: 'left',
   },
   swipeItem: {
      fontSize: 12,
      textAlign: 'center',
   },
   imageContact:{
     backgroundColor: '#002171',
   },
   imageFav:{
     flex:1,
    alignItems: 'flex-end'
   },
   textShow:{
     textAlign: 'center',
   },
   listItem: {
    justifyContent: 'center',
    flex:2,
    flexDirection: 'row',
    marginTop: 5,
    backgroundColor: '#b3e5fc'
   },
   textInfo:{
    justifyContent: 'center',
    flex:1,
    flexDirection: 'column',
   },
   listView: {
     flexDirection: 'row',
     flex:1,
     marginLeft:5,
     marginRight:5
   },
   listView1: { //in FavouriteActivity
     // backgroundColor: 'red',
     flexDirection: 'column',
    //  flex:1,
     marginLeft:5,
     marginRight:5
   },
   longClick:{
     backgroundColor:'#4FC3F7',
   },
   button: {
    width: 70,
    height:40,
    padding:5,
   backgroundColor: '#000051',
   justifyContent: 'center',
   alignItems: 'center',
   borderRadius: 4,
   borderColor: 'rgba(0, 0, 0, 0.1)',
   },
   buttonText:{
      fontSize: 15,
      fontWeight: 'bold',
      color:'white'
   },
   modalContent: {
     backgroundColor: 'white',
     padding: 22,
     justifyContent: 'center',
     alignItems: 'center',
     borderRadius: 4,
     borderColor: 'rgba(0, 0, 0, 0.1)',
   },
   textNormal:{
     textAlign:'center',
     fontSize: 15,
     fontWeight: 'bold',
     marginTop:10
   },
   addContainer:{
       flex:1,
       flexDirection:'column',
       alignItems:'center',
   },
   addContent:{
     flex:3,
     flexDirection:'column',
     alignItems:'center',
   },
   addFooter:{
     flex:2,
    justifyContent: 'center',
   },
   addInput:{
     margin:10,
     width:400,
     height:50,
     fontSize:15,
     color:'#000051',
     borderBottomWidth:2,
     borderColor:'#000051',
     fontWeight: 'bold',
   },
   imageShow:{
    justifyContent: 'center',
    flex:2
   },
   bottomModal: {
     justifyContent: 'flex-end',
     margin: 0,
   },
   viewContainer:{
     flex:1,
     flexDirection:'column',
   },
   viewContent:{
     marginLeft:10,
     flex:3,
     flexDirection:'column',
     alignItems:'flex-start',
   },
   imageView:{
    alignItems:'center',
    justifyContent: 'center',
    flex:2
   },
   viewFooter:{
    flex:2,
    justifyContent: 'center',
     alignItems:'center',
   },
   communicationsMng:{
    marginTop:20,
    flex:1,
    justifyContent: 'center',
    flexDirection:'row'
   },
   textView:{
     fontSize: 15,
     fontWeight: 'bold',
     marginTop:10
   },
   textView2:{
     color:'#00b2ee',
     fontSize: 15,
     fontWeight: 'bold',
     marginTop:10,
     marginLeft:20,
   },
   imageTextView:{
     fontSize: 25,
     fontWeight: 'bold',
     marginTop:5
   },
   editContainer:{
     flex:1,
     flexDirection:'column',
   },
   editContent:{
     flex:3,
     flexDirection:'column',
     alignItems:'center',
   },
   editFooter:{
    flex:2,
    justifyContent: 'center',
    alignItems:'center',
   },
   delContainer:{
     marginLeft: 25,
     flex:2,
     marginTop:100,
     justifyContent: 'center',
     alignItems:'flex-start',
   },
   textDel:{
   fontWeight: 'bold',
     fontSize: 15,
     marginTop:10,
     color:'#ff3030'
   },
})

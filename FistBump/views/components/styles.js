import { StyleSheet, Platform } from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';




export let customStyles = StyleSheet.create({
  root: {  minHeight: 300 },
  title: { textAlign: 'center', fontSize: 30 },
  codeFieldRoot: { marginTop: 20 ,backgroundColor: 'transparent',zIndex:999,opacity:0.99,width:200},
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderColor: '#00000030',
    textAlign: 'center',backgroundColor:'white'

  },
  focusCell: {
    borderColor: '#000',
  },
  container: {
    flex: 1,
    backgroundColor: Colors.lighter,
  },
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginTop: 20,
    height: 50,
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#7CDB8A',
    shadowColor: 'rgba(0,0,0,0.4)',
    shadowOffset: {
      width: 1,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
  },
  redColor: {
    backgroundColor: '#F57777'
  },
  message: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 20,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  headers: {
    ...Platform.select({
      ios: { marginTop: '2%' },
      android: { marginTop: '2%' }
    })
  },
  buttonNavBack: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 100
  },
  buttonNavBackContainer: {
    position: 'absolute',
    zIndex: 10,
    top: 10,
    left: 10
  },
  fullStretch: {
    width: '100%',
    height: '100%'
  },
  animationActionButton: {
    width: 70,
    height: 70
  },
  image:{
    flex:1,
    alignSelf:'center',
    width:500,
    height:400,
    resizeMode:'stretch',
    aspectRatio:4,
    fontSize:200
  },
});
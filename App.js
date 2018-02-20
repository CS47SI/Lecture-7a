import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppNavigation from './App/Navigation/AppNavigation';
import firebase from 'firebase';
// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAtML_W7jPmF3VfwBhL7VWWha2GC_9ZLrA",
  authDomain: "cs47si-chatroom.firebaseapp.com",
  databaseURL: "https://cs47si-chatroom.firebaseio.com",
  projectId: "cs47si-chatroom",
  storageBucket: "cs47si-chatroom.appspot.com",
  messagingSenderId: "1075955648443"
};

firebase.initializeApp(firebaseConfig);

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <AppNavigation/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

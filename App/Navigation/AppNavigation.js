import { TabNavigator, StackNavigator } from 'react-navigation'
import React from 'react';
import { Images, Colors, Metrics } from '../Themes'
import { StyleSheet, Image } from 'react-native';
import ChatRoomsScreen from '../Screens/ChatRooms';
import RoomMessagesScreen from '../Screens/RoomMessages';

const ChatRoomsNav = StackNavigator({
  ChatRoomsScreen: { screen: ChatRoomsScreen },
  RoomMessagesScreen: { screen: RoomMessagesScreen },
}, {
  // Default config for all screens
  headerMode: 'float',
  initialRouteName: 'ChatRoomsScreen',
})

// const BookmarkNav = StackNavigator({
//   BookmarkScreen: { screen: BookmarkScreen },
//   BookmarkViewerScreen : { screen: BookmarkViewerScreen },
// }, {
//   // Default config for all screens
//   headerMode: 'float',
//   initialRouteName: 'BookmarkScreen',
// })

// Manifest of possible screens
const PrimaryNav = TabNavigator({
  ChatRooms: { screen: ChatRoomsNav },
}, {
  // Default config for all screens
  initialRouteName: 'ChatRooms',
  tabBarOptions: {
    activeTintColor: Colors.black,
    showLabel: false,
  },
})

export default PrimaryNav

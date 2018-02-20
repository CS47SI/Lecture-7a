import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { material } from 'react-native-typography';
import { Metrics, Colors } from '../Themes';
import { Entypo } from '@expo/vector-icons';
import firebase from 'firebase';

export default class ChatRooms extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};
    return {
      headerTitle: "Chat Rooms",
      tabBarIcon: ({ tintColor }) => (
        <Entypo name="home"
          size={Metrics.icons.medium}
          color={tintColor} />
      ),
    };
  };

  state = {
    text: "",
    rooms: []
  }

  componentWillMount() {
    firebase.database().ref('rooms').on('child_added', (snapshot) => {
        var childKey = snapshot.key;
        var childData = snapshot.val();
        childData.key = childKey;
        var list = this.state.rooms.slice();
        list.push(childData);
        this.setState({rooms: list});
        console.log(childData);
    });
  }

  add = () => {
    var roomsList = firebase.database().ref('rooms').push();
    roomsList.set({
      roomName: this.state.text,
      count: 0
    }).then(() => this.setState({text: ""}));

    console.log("lol");
  }

  onProfileRequested = (username) => {
    const { navigate } = this.props.navigation;

    navigate('UserProfileScreen', { username: username });
    console.log("Requested: " + username);
  }

  _renderItem = ({item}) => {

    return (
      <TouchableOpacity onPress={() => this.props.navigation.navigate('RoomMessagesScreen', {name: item.roomName, key: item.key})}>
        <View style={[styles.addChatContainer,{borderTopWidth: 0, borderBottomWidth: 1}]}>
          <Text style={material.subheading}> {item.roomName} </Text>
          <Text style={material.subheading}> Messages: {item.count} </Text>
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container}
        behavior={"padding"}
        keyboardVerticalOffset={Metrics.bottomBarHeight}>
        <FlatList
          data={this.state.rooms}
          renderItem={this._renderItem}
          style={styles.container}/>
        <View style={styles.addChatContainer}>
          <TextInput
            style={styles.newRoom}
            value={this.state.text}
            onChangeText={(text) => this.setState({text})}
            placeholder="Create a new chat room..."/>
          <Button
            title="Add"
            onPress={this.add}/>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addChatContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: Metrics.doubleBaseMargin,
    paddingRight: Metrics.doubleBaseMargin,
    borderTopWidth: Metrics.horizontalLineHeight,
    paddingBottom: Metrics.marginVertical,
    paddingTop: Metrics.marginVertical
  },
  newRoom: {
    borderBottomWidth: Metrics.horizontalLineHeight,
    flex: 1,
    borderBottomColor: Colors.border,
    marginRight: Metrics.marginHorizontal
  },
  listItem: {

  }
});

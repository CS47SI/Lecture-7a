import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList, KeyboardAvoidingView, AlertIOS } from 'react-native';
import { material } from 'react-native-typography';
import { Metrics, Colors } from '../Themes';
import { Entypo } from '@expo/vector-icons';
import firebase from 'firebase';

export default class RoomMessages extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};
    return {
      headerTitle: params.name,
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

  proceedWithName = async (name) => {
    this.setState({name});
    var params = this.props.navigation.state.params;
    await this.setState({key: params.key});
    firebase.database().ref('convos').child(this.state.key).on('child_added', (snapshot) => {
        var childKey = snapshot.key;
        var childData = snapshot.val();
        childData.key = childKey;
        var list = this.state.rooms.slice();
        list.push(childData);
        this.setState({rooms: list});
        console.log(childData);
    });
  }

  getUserName = () => {
    AlertIOS.prompt(
      'Enter name',
      'Enter your name for this channel',
      [
        {
          text: 'Cancel',
          onPress: () => this.props.navigation.goBack(),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: (name) => name.length === 0 ? this.getUserName() : this.proceedWithName(name),
        },
      ]
    );
  }

  componentWillMount() {
    this.getUserName();
  }

  componentWillUnmount() {
    firebase.database().ref('convos').child(this.state.key).off();
  }

  send = () => {
    var roomsList = firebase.database().ref('convos').child(this.state.key).push();
    roomsList.set({
      message: this.state.text,
      sender: this.state.name
    });
    firebase.database().ref('rooms').child(this.state.key).child("count").transaction(function(currentCount) {
      return currentCount + 1;
    }).then(() => this.setState({text: ""}));
  }

  onProfileRequested = (username) => {
    const { navigate } = this.props.navigation;

    navigate('UserProfileScreen', { username: username });
    console.log("Requested: " + username);
  }

  _renderItem = ({item}) => {
    const additionalStyle = item.sender === this.state.name ? {justifyContent: 'flex-end', marginRight: Metrics.doubleBaseMargin, marginLeft: Metrics.doubleBaseMargin*2}
                                                            : {justifyContent: 'flex-start', marginLeft: Metrics.doubleBaseMargin, marginRight: Metrics.doubleBaseMargin*2};

    return (
      <View style={[{flexDirection: 'row', marginTop: Metrics.marginVertical},additionalStyle]}>
        <View style={{flexDirection: 'column'}}>
          <Text> {item.sender} </Text>
          <View style={styles.chatBubble}>
            <Text style={[material.subheading,{color: Colors.silver}]}> {item.message} </Text>
          </View>
        </View>
      </View>
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
          style={styles.container}
          />
        <View style={styles.sendChatContainer}>
          <TextInput
            style={styles.newRoom}
            value={this.state.text}
            onChangeText={(text) => this.setState({text})}
            placeholder="Be part of the conversation..."/>
          <Button
            title="Send"
            onPress={this.send}/>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sendChatContainer: {
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
  chatBubble: {
    paddingLeft: Metrics.marginVertical,
    paddingRight: Metrics.marginVertical,
    paddingBottom: Metrics.marginVertical,
    paddingTop: Metrics.marginVertical,
    borderRadius: Metrics.marginVertical,
    backgroundColor: Colors.terquoise
  }
});

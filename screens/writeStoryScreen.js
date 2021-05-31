import * as React from "react";
import { Header } from "react-native-elements";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView ,
ToastAndroid
} from "react-native";

import db from "../config"
import firebase from 'firebase'
export default class WriteStoryScreen extends React.Component {
  constructor(){
    super();
    this.state={
      title: '',
      author: '',
      story: ''
    }
  }
  submitStory = async() =>{
     await db.collection("stories").add({
      'title': this.state.title,
      'author': this.state.author,
      'story': this.state.story
    })
     ToastAndroid.show("Your story is saved in Database", ToastAndroid.SHORT);

  }
  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#white",
        }}
      >
        
      <KeyboardAvoidingView style={styles.container} behavior= "padding" enabled/>
        <Header
          backgroundColor={"#fbc0cc"}
         style={{marginTop : 100}}
          centerComponent={{
            text: "STORY HUB",
            style: { fontSize: 28, color: "white",fontFamily: "Comic Sans MS"},
          }}
        />
        <TextInput style={styles.inputBox} placeholder="Story Title" placeholderTextColor = 'pink' />
        <TextInput style={styles.inputBox} placeholder="Author" placeholderTextColor = 'pink'/>
        <TextInput
          style={styles.inputBoxMultiline}
          placeholder="Write your Story"
          placeholderTextColor = 'pink'
          multiline={true}

        />
        
        <TouchableOpacity style={styles.button}
        
        onPress={async()=>{
          this.submitStory();
          this.setState({ 
            title: '',
            author: '',
            story: ''})
          }}
        >
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputBox: {
    width: "90%",
    height: 50,
    borderWidth: 2,
    margin: 20,
    padding: 5,
    borderRadius : 20
  },
  inputBoxMultiline: {
    width: "90%",
    height: "35%",
    borderWidth: 2,
    margin: 20,
    padding: 5,
    borderRadius : 20
  },
  button: {
    margin: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "pink",
    width: 200,
    height: 50,
    alignSelf: "center",
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color : 'white'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});
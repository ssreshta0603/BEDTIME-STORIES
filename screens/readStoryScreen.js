import React from 'react';
import { StyleSheet, Text, View, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import { SearchBar } from 'react-native-elements';
import db from '../config';

export default class ReadStoryScr extends React.Component {
  constructor() {
    super();
    this.state = {
      storiesList: [],
      dataSource: [],
      search: '',
    };
  }
  componentDidMount() {
    this.retrieveStories();
  }

  updateSearch = (search) => {
    this.setState({ search });
  };

  retrieveStories = () => {
    try {
      var storiesList = [];
      var stories = db
        .collection('User Stories')
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            storiesList.push(doc.data());
            console.log('User Stories', storiesList);
          });
          this.setState({ storiesList });
        });
    } catch (error) {
      console.log(error);
    }
  };

  SearchFilterFunction(text) {
    const newData = this.state.storiesList.filter((item) => {
      const itemData = item.title ? item.title.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      dataSource: newData,
      search: text,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View styles={{ height: 20, width: '100%', }}>
          <SearchBar style = {styles.searchBar}
            placeholder="Write title of the story here."
            onChangeText={(text) => this.SearchFilterFunction(text)}
            onClear={(text) => this.SearchFilterFunction('')}
            value={this.state.search}
          />
        </View>

        <ScrollView>
          <View>
            {this.state.search === ''
              ? this.state.storiesList.map((item) => (
                  <View
                    style={{
                      borderColor: 'black',
                      borderWidth: 3,
                      padding: 10,
                      alignItems: 'center',
                      margin: 10,
                      backgroundColor:'#efddf7'
                    }}>
                    <TouchableOpacity>
                    <Text style = {styles.story}>Title : {item.title}</Text>
                    <Text style = {styles.story}>Author : {item.author}</Text>
                    </TouchableOpacity>
                  </View>
                ))
              : this.state.dataSource.map((item) => (
                  <View
                    style={{
                      borderColor: 'black',
                      borderWidth: 3,
                      padding: 10,
                      alignItems: 'center',
                      margin: 30,
                      backgroundColor:'#efddf7'
                    }}>
                    <TouchableOpacity>
                    <Text style = {styles.story}>Title : {item.title}</Text> 
                    <Text style = {styles.story}>Author : {item.author}</Text>
                    </TouchableOpacity>
                  </View>
                ))}
          </View>
        </ScrollView>
        <FlatList 
            data={this.state.book}
            renderItem={({item}) => (
              <View style={{borderBottomWidth: 2, marginTop: 20, marginBottom: 20}}>
                <Text>{"Story Name: " + item.title}</Text>
                <Text>{"Story Author: " + item.author}</Text>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
            onEndReached={this.fetchMoreStories}
            onEndReachedThreshold={0.7}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
  },
story:{
  fontFamily:'monospace',
  fontSize:20,
},
searchBar:{
 
  fontFamily:'monospace',
  color:'white',
  marginTop : 20,
  padding:10,
},

});
 
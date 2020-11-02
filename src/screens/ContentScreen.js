import React, {useState, useLayoutEffect, useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  Button,
  Image,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import database from '@react-native-firebase/database';
import Loading from '../components/Loading';

const ContentScreen = ({navigation}) => {
  const [posts, setPosts] = useState([]);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{marginRight: 5}}>
          <TouchableOpacity onPress={() => navigation.navigate('Post Form')}>
            <Icon name="add" size={25} color="rgb(0, 205, 251)" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    database()
      .ref('/posts')
      .on('value', (snapshot) => {
        var value = snapshot.val();
        if (value) {
          var post = Object.values(value);
          setPosts(post);
        }
      });
  };
  console.log('posts', posts);
  return (
    <SafeAreaView style={{flex: 1}}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => {
          return (
            <View style={{borderWidth: 1}}>
              <View
                style={{flexDirection: 'row', alignItems: 'center', margin: 10}}>
                <View style={{ borderWidth: 1, borderRadius: 100,height: 33, width: 33, }}>
                  <Image
                    source={item.author.image}
                    style={{height: '100%', width: '100%', borderRadius: 100}}
                  />
                </View>
                <Text style={{paddingLeft:10, fontSize: 18}}>{item.author.name}</Text>
              </View>
              <View>
                <Image
                  source={item.photo}
                  style={{height: 250, width: '100%'}}
                />
              </View>
              <View style={{ margin: 15}}>
                <Text>{item.text}</Text>
              </View>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default ContentScreen;

import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, StyleSheet,Image, Dimensions} from 'react-native';
import database from '@react-native-firebase/database';
import { useSelector } from 'react-redux'
let deviceWidth = Dimensions.get('window').width

const UserPostList = () => {
  const state = useSelector((state) => state.auth);

  const [posts, setPosts] = useState([]);
  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = () => {
    database()
      .ref('/user-posts/' + state.user.uid)
      .on('value', (snapshot) => {
        var value = snapshot.val();
        if (value) {
          var post = Object.values(value);
          setPosts(post);
        }
      });
  };
  return (
    <View>
      <FlatList
          data={posts}
          keyExtractor={(item) => item.id}
          numColumns={3}
          renderItem={({item}) => {
            return(
              <View style={{borderWith: 1, borderColor: 'black'}}>
                <Image source={item.photo} style={styles.image}/>
              </View>
            )
          }}
          
        />
    </View>
  );
};

const styles = StyleSheet.create({
    image: {
        width: deviceWidth/3,
        height: deviceWidth/3,
    }
});

export default UserPostList;

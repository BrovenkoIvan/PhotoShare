import React, {useContext, useLayoutEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Button,
  TextInput,
} from 'react-native';
import {Context} from '../context/AuthContext';
import database from '@react-native-firebase/database';
import ImagePicker from 'react-native-image-picker';
import uuid from 'react-native-uuid';
import storage from '@react-native-firebase/storage'
import Loading from '../components/Loading'
const PostFormScreen = ({navigation}) => {
  const [textInput, setTextInput] = useState('');
  const [imageSource, setImageSource] = useState({});
  const {state} = useContext(Context);
  const[loadingImage, setLoadingImage] = useState(false)
  

  const pickImage = () => {
    ImagePicker.showImagePicker({title: 'Select Photo'}, (response) => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = {uri: response.uri};
        setImageSource(source);
        uploadAvatar(response.uri)
      }
    });
  };

  console.log(state.dataUser)

  const uploadAvatar = (uri) => {
    const fileName = uri;
    var storageRef = storage().ref(
      `/users/${state.user.uid}/images/posts/${fileName}`,
    );
    storageRef.putFile(uri).on(
      storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        console.log('snapshot: ' + snapshot.state);
        setLoadingImage(true)
        console.log(
          'progress: ' +
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
        );

        if (snapshot.state === storage.TaskState.SUCCESS) {
          console.log('Success');
          setLoadingImage(false)
        }
      },
      (error) => {
        unsubscribe();
        console.log('image upload error: ' + error.toString());
      },
      () => {
        storageRef.getDownloadURL().then((downloadUrl) => {
          setImageSource({uri:downloadUrl})
        });
      },
    );
  };
  console.log('state.dataUser.userName',state.dataUser.userName)
  console.log('state.dataUser.uri',state.dataUser.userAvatarImage.uri)
  
  const submit  = () => {
    var postData = {
      author: {name: state.dataUser.userName, image: {uri: state.dataUser.userAvatarImage.uri}},
      text: textInput,
      photo: imageSource,
      id: uuid.v1(),
      starCount: 0,
      uid: state.user.uid,
    };
    var newPostKey = database().ref().child('posts').push().key;
    var updates = {};
    updates['/posts/' + newPostKey] = postData;
    updates['/user-posts/' + state.user.uid + '/' + newPostKey] = postData;
    database().ref().update(updates);
    navigation.navigate('Content');
  };
  
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Add Post</Text>
      </View>
      <View style={styles.imageContainer}>
        { loadingImage ? <Loading/> : <Image source={imageSource} style={styles.image} />}
      </View>
      <Button title="Add photo" onPress={pickImage} />
      <View>
        <TextInput
          style={styles.input}
          maxLength={150}
          multiline={true}
          onChangeText={setTextInput}
        />
      </View>
      <Button title="Add" onPress={submit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 35,
  },
  imageContainer: {
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#eee',
    width: '80%',
    height: 220,
    marginTop: 20,
  },
  input: {
    padding: 10,
    height: 65,
    width: 300,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 10,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
export default PostFormScreen;

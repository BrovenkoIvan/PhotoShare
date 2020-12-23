import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  TextInput,
} from 'react-native';

import database from '@react-native-firebase/database';
import ImagePicker from 'react-native-image-picker';
import uuid from 'react-native-uuid';
import storage from '@react-native-firebase/storage'
import Loading from '../components/Loading'
import { useSelector} from 'react-redux';
const PostFormScreen = ({navigation}) => {
  const [textInput, setTextInput] = useState('');
  const [imageSource, setImageSource] = useState({});
  const[loadingImage, setLoadingImage] = useState(false)
  const state = useSelector((state) => state.auth);

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
        // uploadAvatar(response.uri)
      }
    });
  };

  const uploadAvatar = () => {
    console.log('imageSource',imageSource)
    const uri = imageSource.uri
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
          const source = {uri: downloadUrl}
          // setImageSource({uri:downloadUrl})
          onSubmit(source)

        });
      },
    );
  };
  console.log('imageSource',imageSource)
  
  const onSubmit  = (source) => {
    var postData = {
      author: {name: state.dataUser.userName, image: {uri: state.dataUser.userAvatarImage.uri}},
      text: textInput,
      photo: source,
      id: uuid.v1(),
      starCount: 0,
      uid: state.user.uid,
    };
    var newPostKey = database().ref().child('posts').push().key;
    var updates = {};
    updates['/posts/' + newPostKey] = postData;
    updates['/user-posts/' + state.user.uid + '/' + newPostKey] = postData;
    database().ref().update(updates)
    navigation.navigate('Content')
  };
  if (loadingImage){
    return <Loading/>
  }
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Add Post</Text>
      </View>
      <View style={styles.imageContainer}>
        {/* { loadingImage ? <Loading/> : <Image source={imageSource} style={styles.image} />} */}
        <Image source={imageSource} style={styles.image} />
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
      {/* { loadingImage ? <View><Loading/></View> : <Button title="Add" onPress={uploadAvatar} />} */}
      <Button title="Add" onPress={uploadAvatar} />
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

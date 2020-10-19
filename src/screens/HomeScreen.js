import React, {useContext, useState, useEffect, useLayoutEffect} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Context} from '../context/AuthContext';
import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Feather';

const AccountScreen = ({navigation}) => {
  const {signOut, state} = useContext(Context);

  const [userData, setUserData] = useState([]);
  const [avatarSourse, setAvatarSource] = useState({});

  console.log('home screen');

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{marginRight: 5}}>
          <TouchableOpacity onPress={() => signOut()}>
            <Icon name="log-out" size={25} color='rgb(0, 205, 251)' />
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
      .ref('/users/' + state.user.uid)
      .once('value')
      .then((snapshot) => {
        setUserData(snapshot.val());
      });
  };

  useEffect(() => {
    if (userData.userAvatarImage) setAvatarSource(userData.userAvatarImage);
  }, [userData]);

  const uploadAvatar = (uri) => {
    const fileName = uri;
    var storageRef = storage().ref(
      `/users/${state.user.uid}/images/avatar/${fileName}`,
    );
    storageRef.putFile(uri).on(
      storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        console.log('snapshot: ' + snapshot.state);
        console.log(
          'progress: ' +
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
        );

        if (snapshot.state === storage.TaskState.SUCCESS) {
          console.log('Success');
        }
      },
      (error) => {
        unsubscribe();
        console.log('image upload error: ' + error.toString());
      },
      () => {
        storageRef.getDownloadURL().then((downloadUrl) => {
          database()
            .ref('/users/' + state.user.uid)
            .update({
              userAvatarImage: {uri: downloadUrl},
            });
        });
      },
    );
  };

  const pickImage = () => {
    ImagePicker.showImagePicker({title: 'Select Avatar'}, (response) => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = {uri: response.uri};
        setAvatarSource(source);
        uploadAvatar(response.uri);
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={avatarSourse} style={styles.avatarImage} />
      </View>
      <Button title="Edit photo" onPress={pickImage} />
      <Text>{userData.userName}</Text>
      <Text>{userData.email}</Text>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    marginTop: 30,
  },
  imageContainer: {
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#eee',
    width: 120,
    height: 120,
    borderRadius: 100,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 70,
  },
});
export default AccountScreen;

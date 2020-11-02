import React, {useContext, useState, useEffect, useLayoutEffect} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {Context} from '../context/AuthContext';
import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Feather';
import {useTheme} from '@react-navigation/native';
import Loading from '../components/Loading';

const AccountScreen = ({navigation}) => {
  const {signOut, state} = useContext(Context);
  const {colors} = useTheme();
  const [userData, setUserData] = useState([]);
  const [avatarSourse, setAvatarSource] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loadingImage, setLoadingImage] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{marginRight: 5}}>
          <TouchableOpacity onPress={() => signOut()}>
            <Icon name="log-out" size={25} color="rgb(0, 205, 251)" />
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
      .on('value', (snapshot) => {
        var data = snapshot.val();
        setUserData(data);
        state.dataUser = data;
      });
  };

  useEffect(() => {
    if (userData.userAvatarImage) {
      setAvatarSource({uri: userData.userAvatarImage.uri});
    }
  }, [userData]);
  console.log(state.dataUser);

  const deleteAvatar = () => {
    if (userData.userAvatarImage) {
      var name = userData.userAvatarImage.prevUri;
      var desertRef = storage().ref(
        `/users/${state.user.uid}/images/avatar/${name}`,
      );
      desertRef
        .delete()
        .then(() => {
          console.log('file deleted successfully');
        })
        .catch(function (error) {
          console.log(error);
        });
      database()
        .ref('/users/' + state.user.uid + '/userAvatarImage/')
        .remove();
      setAvatarSource(null);
    }
  };

  const uploadAvatar = (uri) => {
    if (userData.userAvatarImage) {
      var name = userData.userAvatarImage.prevUri;
      var desertRef = storage().ref(
        `/users/${state.user.uid}/images/avatar/${name}`,
      );
      desertRef
        .delete()
        .then(() => {
          console.log('file deleted successfully');
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    const fileName = uri;
    var storageRef = storage().ref(
      `/users/${state.user.uid}/images/avatar/${fileName}`,
    );
    storageRef.putFile(uri).on(
      storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        console.log('snapshot: ' + snapshot.state);
        setLoadingImage(true);
        console.log(
          'progress: ' +
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
        );

        if (snapshot.state === storage.TaskState.SUCCESS) {
          console.log('Success');
          setLoadingImage(false);
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
              userAvatarImage: {uri: downloadUrl, prevUri: uri},
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
  console.log(avatarSourse);
  console.log(loadingImage);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        {loadingImage ? (
          <View>
            <Loading />
          </View>
        ) : (
          <Image source={avatarSourse} style={styles.avatarImage} />
        )}
      </View>
      <Button
        title={avatarSourse ? 'Edit Avatar' : 'Add Avatar'}
        onPress={pickImage}
      />
      {avatarSourse ? (
        <Button title={'Delete Avatar'} onPress={deleteAvatar} />
      ) : null}
      <Text style={{color: colors.text}}>{userData.userName}</Text>
      <Text style={{color: colors.text}}>{userData.email}</Text>
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 70,
  },
});
export default AccountScreen;

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
import {useDispatch, useSelector} from 'react-redux';
import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Feather';
import {useTheme} from '@react-navigation/native';
import Loading from '../components/Loading';
import UserPostList from '../components/UserPostList';
import {setDataUser, signOut} from '../redux/actions';

const AccountScreen = ({navigation}) => {
  const {colors} = useTheme();
  const [userData, setUserData] = useState([]);
  const [avatarSourse, setAvatarSource] = useState(null);
  const [loadingImage, setLoadingImage] = useState(false);

  const state = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{marginRight: 5}}>
          <TouchableOpacity onPress={() => dispatch(signOut())}>
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
        console.log('asdfasdfaskdjfjlasbdfbasmndfb,asbdnfmnsad', data);
        setUserData(data);
        dispatch(setDataUser(data));
      });
  };

  useEffect(() => {
    if (userData.userAvatarImage) {
      setAvatarSource({uri: userData.userAvatarImage.uri});
    }
  }, [userData]);

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
  console.log(state);
  if (state.loading) return <Loading />;
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ marginLeft: 20}}>
        <Text style={{color: colors.text, fontSize: 20, fontFamily:'AvenirNext-DemiBold'}}>{userData.userName}</Text>
      </View>
      <View style={{alignItems: 'center'}}>
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
      </View>
      <UserPostList />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    // alignItems: 'center',
    marginTop: 10,
    
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

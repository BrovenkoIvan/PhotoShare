import React, {useState,useLayoutEffect} from 'react';
import {SafeAreaView, Text, Button, Image,TouchableOpacity,View} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';

const ContentScreen = ({navigation}) => {
  console.log('content screen')

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{marginRight: 5}}>
          <TouchableOpacity onPress={() => navigation.navigate('Post Form')}>
            <Icon name="add" size={25} color='rgb(0, 205, 251)' />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);


  const [avatarSource, setAvatarSource] = useState([]);
  const options = {
    title: 'Select Avatar',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };
  const takePhoto = () => {
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = {uri: response.uri};
        setAvatarSource(source);
      }
    });
  };
  // const uploadFood
  console.log(avatarSource);
  return (
    <SafeAreaView>
      <Text> Content Screen </Text>
    </SafeAreaView>
  );
};

export default ContentScreen;

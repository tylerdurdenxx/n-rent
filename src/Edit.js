import React, { useState } from 'react';
import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { useRoute, useNavigation } from '@react-navigation/native';

const Edit = () => {
  const route = useRoute();
  const navigation = useNavigation();

  // Extract the token from route params
  const { token } = route.params;

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  // Handle saving the profile data
  const handleSaveProfile = async () => {
    try {
      // API call to update the profile
      const response = await axios.post('http://52.184.84.66:8080/api/v1/profile', {
        firstName,
        lastName,
      }, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.status === 200) {
        Alert.alert('Success', 'Your profile has been updated!');
        
        // Navigate to the home screen and pass the token and user data
        navigation.navigate('Home', { 
          token, 
          firstName, 
          lastName 
        });
      } else {
        Alert.alert('Error', 'Failed to update profile.');
      }
    }catch (error) {
        console.error('Error updating profile:', {
          message: error.message,
          responseData: error.response?.data,
          status: error.response?.status
        });
        Alert.alert('Error', 'Failed to update profile.');
      }
  };

  return (
    <View style={{ flex: 1, flexDirection: 'column', backgroundColor: 'white' }}>
      <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
        <Image
          source={{ uri: profileImage || require('../assets/profile/red.png') }}
          style={{
            width: 420,
            height: 380,
            top: -165,
            position: "absolute",
          }}
        />
        <Image
          style={{ position: 'absolute', alignSelf: 'center', top: 40 }}
          source={require('../assets/profile/pfp.png')}
        />
        <Image
          source={require('../assets/profile/pfpcam.png')}
          style={{
            position: 'absolute', alignSelf: 'center', top: 105,
            backgroundColor: '#FFFFFF99', borderRadius: 6,
            height: 30, width: 30, left: 230,
          }}
        />
        <Text style={{
          position: 'absolute',
          alignSelf: 'center', top: 145,
          fontWeight: '700', fontSize: 18, color: 'white'
        }}>
          {`${firstName} ${lastName}`}
        </Text>
      </View>

      <View style={{ alignItems: 'center', top: 180 }}>
        <View style={{
          flexDirection: 'column',
          borderRadius: 8,
          backgroundColor: 'white',
          height: 272,
          width: 335,
          shadowColor: '#00000026',
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 100,
          shadowRadius: 10
        }}>
          <View>
            <Text style={{ fontWeight: 700, fontSize: 16, padding: 10 }}>
              Basic Information
            </Text>
          </View>

          <View style={{ top: 10 }}>
            <TextInput
              style={styles.input}
              value={firstName}
              onChangeText={setFirstName}
              placeholder="First Name"
            />
            <TextInput
              style={styles.input}
              value={lastName}
              onChangeText={setLastName}
              placeholder="Last Name"
            />
          </View>
        </View>

        <View style={{ top: 150 }}>
          <TouchableOpacity style={styles.saveButton} onPress={handleSaveProfile}>
            <Text style={{ alignSelf: 'center', fontWeight: 600, fontSize: 18 }}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    color: '#FF4949',
    fontSize: 14,
    marginBottom: 30,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: '#666666',
    paddingVertical: 8,
    marginHorizontal: 10
  },
  saveButton: {
    borderRadius: 27,
    backgroundColor: '#E1E1E2',
    width: 337,
    height: 43,
    justifyContent: 'center'
  },
});

export default Edit;

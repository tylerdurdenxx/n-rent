import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';
import { useEffect, useState, } from 'react';
import axios from 'axios';

import Background from './Background';
import Btn from './Btn';
import { TouchableOpacity } from 'react-native';
import Passfield from './Passfield';
import { Alert, Platform } from 'react-native'; // Don't forget to import these if not done already


export default function Signup({ navigation }) {


  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');


  const handleSignup = async () => {
    try {
      console.log("Signup initiated");
      const response = await axios.post('http://52.184.84.66:8080/api/v1/signup', {
        email,
        phoneNumber,
        password,
        fullName,
        deviceType: Platform.OS.toUpperCase(),
        deviceToken: 'abc123xyz456token',
        latitude: 37.7749,
        longitude: -122.4194
      });
      Alert.alert('Success', 'You have successfully signed up!');
      console.log("Response received", response.data);
      navigation.navigate('Otp', { email, phoneNumber, token: response.data.token }); // Pass token to OTP page
      // After successful signup and before navigating to the OTP page


      // const { token } = response.data;

      // if (token) {
      //   Alert.alert('Success', 'You have successfully signed up!');
      //   console.log("Navigating to OTP page with token:", token);
      //   navigation.navigate('Otp', { token: response.data.token });
      // } else {
      //   Alert.alert('Error', 'Signup was successful but no token received.');
      // }
    }

    catch (error) {
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      } else if (error.request) {
        console.error('Request data:', error.request);
      } else {
        console.error('Error message:', error.message);
      }
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };


  return (
    <Background>
      <View style={styles.container}>
        <View style={styles.centeredBox}>
          <Text style={styles.login}>Sign Up</Text>
          <View style={{ top: -45, margin: -15, right: -9, position: 'relative', paddingHorizontal: 12 }}>
            <View style={{
              position: 'absolute', left: -2, resizeMode: 'contain', top: 111, left: 35,
            }}>
            </View>

            <Passfield
              placeholder="Full Name"
              placeholderTextColor="#666666"
              secureTextEntry={false}
              leftImg={require('../assets/user.png')}
              value={fullName}
              onChangeText={setFullName}  // Update fullName state
            />

            <Passfield
              placeholder="Email"
              placeholderTextColor="#666666"
              secureTextEntry={false}
              leftImg={require('../assets/email.png')}
              keyboardType={'email-address'}
              value={email}
              onChangeText={setEmail}  // Update email state
            />

            <Passfield
              placeholder="Password"
              placeholderTextColor="#666666"
              isPassword={true}
              leftImg={require('../assets/password.png')}
              value={password}
              onChangeText={setPassword}  // Update password state
            />

            <Passfield
              placeholder="Mobile Number"
              placeholderTextColor="#666666"
              secureTextEntry={false}
              leftImg={require('../assets/flag.png')}
              // keyboardType={'numeric'}
              value={phoneNumber}
              onChangeText={setPhoneNumber}  // Update phoneNumber state
            />

          </View>
          <View style={{ top: 72 }}>
            <Btn textColor='white' bgColor='#FF4949' btnLabel="Register" Press={handleSignup} />
          </View>
        </View>
      </View>

      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: "center", top: 190, left: 45 }}>
        <Text style={{ fontSize: 14, }}>Already have an account ? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={{ color: '#FF4949', fontSize: 14, }}>Login here</Text>
        </TouchableOpacity>
      </View>
    </Background>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',


  },
  centeredBox: {
    backgroundColor: 'white',
    width: 316,
    height: 434,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    top: 110,
    left: 50

  },
  login: {
    color: 'black',
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 10,
    top: 36,
    left: 36,


  },
  input: {
    borderBottomColor: '#666666',
    borderBottomWidth: 1,
    paddingVertical: 10,
    marginVertical: 10,
    color: 'black',
  },
}
)
  ;


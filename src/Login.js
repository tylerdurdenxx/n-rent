import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Background from './Background';
import Btn from './Btn';
import Passfield from './Passfield';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

export default function Login() {

  const [phoneNumber, setPhoneNumber] = useState('');
  const navigation = useNavigation(); // Use useNavigation hook
  const handleLogin = async () => {
    try {
      console.log("Login initiated");
      const response = await axios.post('http://52.184.84.66:8080/api/v1/login', {
        phoneNumber,
      });
  
      console.log("Response received", response.data);
      const { message, status, token } = response.data;
  
      if (status === 'SUCCESS' && message.includes('OTP sent successfully')) {
        Alert.alert('Success', 'OTP has been sent to your phone number!');
        // Navigate to OTP verification page or handle as needed
        navigation.navigate('Otp', {token, phoneNumber }); // Pass phoneNumber to OTP page if needed
      } else {
        Alert.alert('Error', 'Login was successful but no OTP was received.');
      }
    } catch (error) {
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
          <Text style={styles.login}>Login</Text>

          <View style={{

          }}>
            <View style={{
              position: 'absolute', resizeMode: 'contain', top: 32, left: 36,
            }}>

            </View>
            <View style={{ top: -35, left: 8 }}>



              <Passfield
                placeholder="Phone Number"
                placeholderTextColor="#666666"
                secureTextEntry={false}
                leftImg={require('../assets/flag.png')}
                value={phoneNumber}
                onChangeText={setPhoneNumber} // Update phoneNumber state                
                />
  


            </View>
          </View>

          <View style={{ alignItems: 'flex-end', marginTop: 10 }}>
            <View style={{ top: 50, right: 35 }}>
              <TouchableOpacity onPress={() => navigation.navigate("Forgot")}>
                <Text style={{ color: '#999999', fontSize: 12, }}>
                  Forgot Password ?
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ top: 100 }}>
            <Btn textColor='white' bgColor='#FF4949' btnLabel="Login"  Press={handleLogin} />
          </View>
        </View>
      </View>
      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: "center", top: 190, left: 45 }}>
        <Text style={{ fontSize: 14, color: 'black' }}>Don't have an account ? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text style={{ color: '#FF4949', fontSize: 14 }}>Signup</Text>
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
});

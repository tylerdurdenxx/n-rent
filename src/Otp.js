import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useState, useEffect } from 'react';
import Background from './Background';
import Btn from './Btn';
import axios from 'axios';

export default function Otp({ navigation, route }) {
  const [otp, setOtp] = useState('');
  const [phoneNumber, setPhoneNumber] = useState(route.params.phoneNumber);
  const [isResending, setIsResending] = useState(false);
  const [timer, setTimer] = useState(60);

  // Start the timer when the component mounts
  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer > 0) {
          return prevTimer - 1;
        } else {
          clearInterval(countdown);
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(countdown); // Cleanup the interval on unmount
  }, []);

  const handleVerifyOtp = async () => {
    if (otp.length !== 5) {
      Alert.alert('Error', 'Please enter a valid 5-digit OTP.');
      return;
    }

    try {
      console.log("OTP verification initiated");
      const response = await axios.post('http://52.184.84.66:8080/api/v1/verify', {
        otp,
        phoneNumber
      });

      console.log("Response received", response.data);

      if (response.data.status === 'SUCCESS') {
        const token = response.data.token; // Extract the token from the response
        Alert.alert('Success', 'OTP verified successfully!');
        navigation.navigate('Edit', { token }); // Pass the token to the Edit screen
      } else {
        Alert.alert('Error', 'Invalid OTP. Please try again.');
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

  const handleResendOtp = async () => {
    if (timer > 0) return; // Prevent resending if the timer is still running

    setIsResending(true);
    try {
      console.log("Resend OTP initiated");
      const response = await axios.post('http://52.184.84.66:8080/api/v1/resend', {
        phoneNumber
      });

      console.log("Response received", response.data);

      if (response.data.status === 'SUCCESS') {
        Alert.alert('Success', 'OTP resent successfully!');
        setTimer(60); // Reset the timer after resending OTP
      } else {
        Alert.alert('Error', 'Failed to resend OTP. Please try again.');
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
    } finally {
      setIsResending(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Background>
        <View style={styles.container}>
          <View style={styles.centeredBox}>
            <Text style={styles.login}>OTP Verification</Text>
            <Text style={{ top: 30, paddingHorizontal: 20, paddingLeft: 35, paddingTop: 10 }}>
              Enter the 5-digit OTP we sent to
              <Text style={{ color: '#FF4949' }}> {phoneNumber} </Text>
            </Text>

            <TextInput
              keyboardType='numeric'
              placeholder='Enter OTP'
              maxLength={5}
              style={{
                borderBottomColor: '#666666',
                borderBottomWidth: 1,
                borderRadius: 5,
                paddingHorizontal: 10,
                width: 250,
                height: 48,
                marginVertical: 10,
                marginHorizontal: 6.5
              }}
              onChangeText={setOtp}
              value={otp}
            />

            <View style={{ top: 90 }}>
              <Btn textColor='white' bgColor='#FF4949' btnLabel="Verify" Press={handleVerifyOtp} />
            </View>

            <TouchableOpacity onPress={handleResendOtp} disabled={timer > 0} style={styles.resendButton}>
              <Text style={styles.resendText}>
                {timer > 0 ? `Resend OTP in ${timer}s` : (isResending ? 'Resending...' : 'Resend OTP')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: "center", top: 190, left: 45 }}>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>Remember password? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={{ color: '#FF4949', fontWeight: 'bold', fontSize: 16 }}>Login here</Text>
          </TouchableOpacity>
        </View>
      </Background>
    </TouchableWithoutFeedback>
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
  resendButton: {
    marginTop: 90,
    padding: 10,
    backgroundColor: '#FF4949',
    borderRadius: 5,
    alignItems: 'center',
  },
  resendText: {
    color: 'white',
    fontSize: 16,
  },
});

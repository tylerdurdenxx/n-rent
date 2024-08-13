import React, { useState, useMemo } from 'react'
import { TextInput, View, Image, Text, TouchableOpacity, ScrollView, StyleSheet, Button } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import RadioGroup from 'react-native-radio-buttons-group';

const Rentout3 = ({ navigation }) => {

  const [count, setCount] = useState(0);


  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };
  const [selectedId, setSelectedId] = useState();

  const radioButtons = useMemo(() => ([
    {
      id: '1', // acts as primary key, should be unique and non-empty string
      label: 'No Late Penalty',
      value: 'option1'
    },
    {
      id: '2',
      label: 'Apply Late Penalty',
      value: 'option2'
    }
  ]), []);



  return (
    <ScrollView style={{ width: 370 , alignSelf: 'center' , }}>
      <View style={{ }}>
        <View style={{
          backgroundColor: '#FFC7C7', height: 178, width: 334, justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
          alignSelf: 'center',
          borderRadius: 8,
          flexDirection: 'row',
          gap: 5
        }}>
          <Image source={require('../assets/Rent3/RedAdd.png')} />
          <Text style={{ fontSize: 16, fontWeight: 800 }}>Add Image</Text>
        </View>

      </View>


      <View style={{}}>
        <Text style={{ fontSize: 16, fontWeight: 700 }}>
          Category
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image style={{ borderRadius: 8, borderColor: '#FFC7C7', borderWidth: 1 }} source={require('../assets/camera.png')} />
          <View>
            <Text style={{ fontSize: 16, fontWeight: 700 }}>Cameras</Text>
            <Text style={{ fontSize: 16, fontWeight: 500, color: '#666666' }}>Digital Cameras</Text>
          </View>

        </View>
      </View>

      <View style={{}}>
        <Text style={{ fontSize: 16, fontWeight: 700 }}>Project Title</Text>
        <TextInput placeholder=''
          style={{
            borderBottomWidth: 1,
            width: 335,
            alignSelf: 'center'
          }}
        />
      </View>
      <View style={{}}>
        <Text style={{ fontSize: 16, fontWeight: 700 }}> Product Description </Text>
        <TextInput placeholder='' style={{width: 335, height: 95, borderRadius: 6,
        borderWidth: 1, alignSelf: 'center'}} />
      </View>

      <View>
        <View style={{}} >
          <Text style={{ fontSize: 16, fontWeight: 700 }}>Product Rental Price</Text>
        </View>
        <View style={{flexDirection: 'row' ,}}>
          <Text style={{color: '#FF4949', fontSize: 16, fontWeight: 600}}>Rs</Text>
          <TextInput placeholder='' style={{width: 118, borderBottomWidth: 1,

          }} />
        

        </View>
      </View>

      <View style={{}}>
        <Text style={{ fontSize: 16, fontWeight: 700 }}>Location</Text>
        <View style={{flexDirection: 'row'}}>
          <Text>Choose a location</Text>
          <Image source={require('../assets/downred.png')} />
        </View>
      </View>

      <View style={{ }}>
        <Text style={{ fontSize: 16, fontWeight: 700 }}>
          Deposite
        </Text>
        <View style={{ flexDirection: 'row' }}>
          <Text>Rs</Text>
          <TextInput placeholder='__________' />
        </View>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
        <Text style={{ fontSize: 16, fontWeight: 700 }}>Quantity </Text>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Button title="-" onPress={decrement} color='#FF4949' />
          <Text style={{ color: '#FF4949' }}>{count}</Text>
          <Button title="+" onPress={increment} color='#FF4949' />
        </View>
      </View>


      <View>
        <Text style={{ fontSize: 16, fontWeight: 700 ,}}>Select Rental Period</Text>
        <View style={{
          shadowColor: '#E1E1E2',
          shadowOffset: { width: 7, height: 7 },
          shadowOpacity: 0.5,
          shadowRadius: 5,
          borderRadius: 6,
        }}>

          <View style={{
            width: 350,
            height: 66,

            borderRadius: 6,
            marginVertical: 3.5,
            flexDirection: 'row',
            justifyContent: 'space-between'
            , alignItems: 'center'
          }}>
            <TouchableOpacity onPress={() => navigation.navigate('Calendar1')}>
              <Image source={require('../assets/desc/startdate.png')} />
            </TouchableOpacity>
            <TouchableOpacity>

              <Image source={require('../assets/desc/enddate.png')} />
            </TouchableOpacity>


          </View>
        </View>
      </View>

      <View>
        <Text style={{ fontSize: 16, fontWeight: 700, }}>Penalty</Text>
        <RadioGroup
          radioButtons={radioButtons}
          onPress={setSelectedId}
          selectedId={selectedId}
          containerStyle={{ alignItems: 'flex-start' }}
          buttonContainerStyle={{}}
          labelStyle={{ fontSize: 14, fontWeight: 500, }}
          activeButtonColor="#FF4949" 
        />
      </View>


      <View>
        <TouchableOpacity style={{
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 27,
          backgroundColor: '#E1E1E2',
          height: 43,
          width: 337
        }}>
          <Text style={{fontSize: 18 , fontWeight: 600}}>List Product</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}





export default Rentout3

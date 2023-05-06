import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert } from 'react-native'
import { BASE_URL } from '../../link_api/meta'
import AsyncStorage from '@react-native-async-storage/async-storage'
import DatePicker from 'react-native-date-picker'
const SignUpScreen = ({navigation}:any) => {

    const [fistName, setfistName] = useState('')
    const [lastName, setlastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [birthday, setBirthday] = useState('2002-02-01')
    const [gender, setGender] = useState('MALE')
    const [img1, setImg1] = useState('a')
    const [img2, setImg2] = useState('a')
    const [img3, setImg3] = useState('a')
    const [img4, setImg4] = useState('a')
    const [img5, setImg5] = useState('a')
    const [date, setDate] = useState(new Date());

    const options = [
        { value: "female", label: "Female" },
        { value: "male", label: "Male" },
        { value: "other", label: "Other" }
      ];

    const [selectedDate, setSelectedDate] = useState(new Date());
      
  const signUp = () => {
    fetch(BASE_URL+'signup', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({fname: fistName, lname: lastName, gender: gender, birthday: birthday, img1:img1, img2:img2, img3:img3, img4:img4, img5:img5, email:email, password:password})
    })
    .then((resp) => {
        return resp.json();
    })
    .then((jsonData) => {
        if(jsonData == "success"){
            console.log(jsonData)
            navigation.navigate("Home")
        }
        else{
          console.log(jsonData)
            alert(jsonData);
        }
        })
        .catch((error) => {
        console.log(error);
    })
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Image
          style={styles.inputIcon}
          source={{ uri: 'https://img.icons8.com/ios-glyphs/512/user-male-circle.png' }}
        />
        <TextInput
          style={styles.inputs}
          placeholder="First name"
          keyboardType="email-address"
          underlineColorAndroid="transparent"
          onChangeText={setfistName}
        />
    </View>

    <View style={styles.inputContainer}>
        <Image
          style={styles.inputIcon}
          source={{ uri: 'https://img.icons8.com/ios-glyphs/512/user-male-circle.png' }}
        />
        <TextInput
          style={styles.inputs}
          placeholder="Last name"
          keyboardType="email-address"
          underlineColorAndroid="transparent"
          onChangeText={setlastName}
        />
    </View>

    <View style={styles.inputContainer}>
          <Image
            style={styles.inputIcon}
            source={{ uri: 'https://img.icons8.com/?size=2x&id=3522&format=png' }}
          />
    </View>

    <View style={styles.inputContainer}>
        <Image
          style={styles.inputIcon}
          source={{ uri: 'https://img.icons8.com/?size=512&id=6564&format=png' }}
        />
        
    </View>



    <View style={styles.inputContainer}>
        <Image
          style={styles.inputIcon}
          source={{ uri: 'https://img.icons8.com/ios-filled/512/circled-envelope.png' }}
        />
        <TextInput
          style={styles.inputs}
          placeholder="Email"
          keyboardType="email-address"
          underlineColorAndroid="transparent"
          onChangeText={setEmail}
        />
    </View>

    <View style={styles.inputContainer}>
        <Image
          style={styles.inputIcon}
          source={{ uri: 'https://img.icons8.com/ios-glyphs/512/key.png' }}
        />
        <TextInput
          style={styles.inputs}
          placeholder="Password"
          secureTextEntry={true}
          underlineColorAndroid="transparent"
          onChangeText={setPassword}
        />
    </View>
    <TouchableOpacity
        style={[styles.buttonContainer, styles.signupButton]}
        onPress={signUp}>
        <Text style={styles.signUpText}>Sign up</Text>
    </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#B9D7EA',
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 250,
    height: 45,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  genderinput:{
    width: 250,
    height: 45,
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: 'center',
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
  },
  signupButton: {
    backgroundColor: '#769FCD',
  },
  signUpText: {
    color: 'white',
  },
})

export default SignUpScreen
import { useTheme } from '@react-navigation/native'
import * as React from 'react'
import { Image, Pressable, Text, View } from 'react-native'
import Button from '../../components/Button/Button'
import Input from '../../components/Input/Input'
import color from '../../styles/color'
import text from '../../styles/text'
import { useDispatch, useSelector } from 'react-redux'
import styles from './styles'
import { BASE_URL } from '../../link_api/meta'
import AsyncStorage from '@react-native-async-storage/async-storage'

const LoginScreen = ({ navigation }: any): JSX.Element => {
    const [email, setEmail] = React.useState<string>('')
    const [password, setPassword] = React.useState<string>('')
    const [pressed, setPressed] = React.useState<boolean>(false)
    const theme = useTheme()
    const checkLogin = () =>{
        fetch(BASE_URL+'login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: 'anhduc123@gmail.com', password: '123'})
        })
        .then((resp) => {
            return resp.json();
        })
        .then((jsonData) => {
            if(jsonData['result'] == true){
                alert("You are: "+jsonData['Fname']);
                AsyncStorage.setItem('AccessToken', JSON.stringify(jsonData))
                console.log(jsonData['UserID'])
                if(jsonData['UserID'] === 1) {navigation.navigate("HomeHost")}
                else {
                    console.log('Im here')
                    navigation.navigate("HomeMember")
                }
            }
            else{
                alert("Wrong username or password. Try again");
            }
            })
            .catch((error) => {
            console.log(error);
        })
    }
    return (
        <View
            style={[
                styles.container,
                {
                    backgroundColor: 'white',
                },
            ]}
        >
            <Image
                source={
                    theme.dark
                        ? require('../../../assets/imgs/login_background_dark.png')
                        : require('../../../assets/imgs/login_background_light.png')
                }
                style={styles.logo}
            />
            <View style={styles.loginForm}>
                <Input
                    value={email}
                    onChange={setEmail}
                    placeholder={'Email'}
                />
                <Input
                    value={password}
                    onChange={setPassword}
                    placeholder={'Password'}
                />
                <Pressable
                    onPress={() => {
                        setPressed(!pressed)
                        // dispatch(updateLogin())
                        checkLogin()
                    }}
                    style={[
                        styles.containerBtn,
                        styles.extend,
                        pressed ? styles.onPress : null,
                    ]}
                >
                    <Text style={styles.title}>Login</Text>
                </Pressable>
            </View>
        </View>
    )
}

export default LoginScreen

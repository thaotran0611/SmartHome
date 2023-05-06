import * as React from 'react'
import { Pressable, View, Text } from 'react-native'
import styles from './styles'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { updateLogin } from '../../redux/slice/loginSlice'
import { BASE_URL } from '../../link_api/meta'
const LoginButton = (props: { extend?: boolean | undefined, email: string, password: string}): JSX.Element => {
    const [pressed, setPressed] = React.useState<boolean>(false)
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const checkLogin = () =>{
        fetch(BASE_URL+'login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email:props.email, password:props.password})
        })
        .then((resp) => {
            return resp.json();
        })
        .then((jsonData) => {
            // console.log(JSON.stringify(jsonData));
            if(jsonData['result'] == true){
                alert("You are: "+jsonData['user']);
                console.log("here",jsonData)
                console.log(navigation.navigate('Home', {params: jsonData}))
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
        <Pressable
            onPress={() => {
                setPressed(!pressed)
                // dispatch(updateLogin())
                checkLogin()
            }}
            style={[
                styles.container,
                props.extend ? styles.extend : null,
                pressed ? styles.onPress : null,
            ]}
        >
            <Text style={styles.title}>Login</Text>
        </Pressable>
    )
}

export default LoginButton

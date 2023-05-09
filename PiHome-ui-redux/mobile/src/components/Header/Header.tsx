import { useTheme } from '@react-navigation/native'
import * as React from 'react'
import { Image, Pressable, Text, View } from 'react-native'
import { useSelector } from 'react-redux'
import BellIcon from '../../../assets/svg/bell_icon.svg'
import { notifyListSelector } from '../../redux/selector'
import text from '../../styles/text'
import IconWrapper from '../IconWrapper/IconWrapper'
import VoiceButton from '../VoiceButton/index'
import styles from './styles'
import { BASE_URL } from '../../link_api/meta'
import AsyncStorage from '@react-native-async-storage/async-storage'
const Header = ({navigation}: any): JSX.Element => {
    const themeColor = useTheme()
    const list = useSelector(notifyListSelector)
    const [data, setData] = React.useState('')
    const images = [
        require('../../../Photo/ad2.jpg'),
        require('../../../Photo/img5.jpg'),
        require('../../../Photo/img68.jpg')
    ]
    const [noti, setNoti] = React.useState([])
    React.useEffect(()=>{
        const interval = setInterval(()=>{
            fetch(BASE_URL+'noti', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then((resp) => {
                return resp.json();
            })
            .then((jsonData) => {
                setNoti(jsonData)
            })  
            .catch((error) => {
                console.log(error);
            })
        }, 10000)
    },[])

    React.useEffect(()=>{
        AsyncStorage 
        .getItem('AccessToken')
        .then((res) => {
            if (res !== null) {
                setData(JSON.parse(res))
            }
        })
        .catch((err) => {
            console.log('err', err)
        })
    },[])
    
    // console.log(data)
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={images[data['UserID']-1]}
                    style={styles.image}
                />
                <View style={styles.btn}>
                    <VoiceButton />
                    <Pressable
                        onPress={() => {
                            navigation.navigate('Notification', {'passengers': noti})
                        }}
                    >
                        <IconWrapper color='white' isBell={noti.length !== 0}>
                            <BellIcon width={25} height={20} />
                        </IconWrapper>
                    </Pressable>
                </View>
            </View>
            <Text
                style={[
                    styles.title,
                    text.bold,
                    { color: themeColor.colors.text },
                ]}
            >Xin chào {data['Lname']} {data['Fname']}!
            </Text>
        </View>
    )
}

export default Header

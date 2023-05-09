import * as React from 'react'
import { View, Button, Pressable, Text } from 'react-native'
import DeviceTabBar from '../../components/DeviceTabBar/DeviceTabBar'
import PowerButton from '../../components/PowerButton/PowerButton'
import Title from '../../components/Title/Title'
import socket from '../../utils/socket'
import styles from './styles'
import { BASE_URL } from '../../link_api/meta'

const LivingRoomScreen = ({navigation, route}: any): JSX.Element => {
    const [device, setDevice] = React.useState<string>('light')
    const [lightStatus, setLightStatus] = React.useState<boolean>(false)
    const [fanSpeed, setFanSpeed] = React.useState<number>(0)
    const [fanStatus, setFanStatus] = React.useState<boolean>(false)
    const [light1,setLight1] = React.useState(false)
    const [fan1,setFan1] = React.useState(false)
    React.useEffect(() => {
        fetch(BASE_URL+'device', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({RoomID: route.params.RoomID})
        })
        .then((resp) => {
            return resp.json();
        })
        .then((jsonData) => {
            console.log(jsonData)
            setLightStatus(jsonData[1])
            if (jsonData[0] == 0 ) {
                setFanSpeed(0)
                setFanStatus(false)
            }
            else {
                setFanSpeed(jsonData[0])
                setFanStatus(true)
            }
        })  
        .catch((error) => {
            console.log(error);
        })
    }, [])
    const handleClickLightPower = (status: boolean) => {
        if(light1){
            console.log("auto call")
            let temp = 0
            if (status) {temp = 1}
            const data = {
                from: 'client',
                to: 'lightController',
                data: {
                    RoomID: route.params.RoomID,
                    type: 'LED',
                    command: temp,
                },
            }
            fetch(BASE_URL+'control', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data['data'])
            })
            .then((resp) => {
                return resp.json();
            })
            .then((jsonData) => {
                console.log(jsonData)

            })  
            .catch((error) => {
                console.log(error);
            })
        }
        else {
            setLight1(true)
        }
    }

    const handleClickFanPower = (speed: number) => {
        if(fan1)
        {
            let temp = 0
            if (!fanStatus) {temp = 0}
            else {temp = speed}
            const data = {
                from: 'client',
                to: 'fanController',
                data: {
                    RoomID: route.params.RoomID,
                    type: 'FAN',
                    status: fanStatus,
                    command: temp,
                },
            }
            fetch(BASE_URL+'control', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data['data'])
            })
            .then((resp) => {
                return resp.json();
            })
            .then((jsonData) => {
                console.log(jsonData)

            })  
            .catch((error) => {
                console.log(error);
            })
        }
        else {
            setFan1(true)
        }
    }

    

    React.useEffect(() => {
        // console.log('state of light',lightStatus)
        handleClickLightPower(lightStatus)
    }, [lightStatus])

    React.useEffect(() => {
        handleClickFanPower(fanSpeed)
        if(fanSpeed > 0) {setFanStatus(true)}
        else {setFanStatus(false)}
    }, [fanSpeed])

    React.useEffect(() => {
        if (fanStatus && fanSpeed == 0){
            setFanSpeed(1)
        }
        else if (!fanStatus) {
            setFanSpeed(0)
        }
        else handleClickFanPower(fanSpeed)
    }, [fanStatus])

    return (
        <View style={styles.container}>
            <Title name='Phòng Khách' />
            <Pressable onPress={() => navigation.navigate('Blog', {RoomID: route.params.RoomID})} style={styles.floorBtn}>
                <Text style={styles.title}>Blog</Text>
            </Pressable>
            <DeviceTabBar device={device} setDevice={setDevice} />
            <View>
                {device === 'light' ? (
                    <PowerButton.Light
                        status={lightStatus}
                        setStatus={setLightStatus}
                    />
                ) : (
                    <PowerButton.Fan
                        speed={fanSpeed}
                        status={fanStatus}
                        setSpeed={setFanSpeed}
                        setStatus={setFanStatus}
                    />
                )}
            </View>
        </View>
    )
}

export default LivingRoomScreen

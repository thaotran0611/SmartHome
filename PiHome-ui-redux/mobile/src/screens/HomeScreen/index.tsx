import * as React from 'react'
import { FlatList, ListRenderItemInfo, Pressable, View, Text, ScrollView } from 'react-native'
import DoorCard from '../../components/DoorCard/DoorCard'
import EnvironmentStatusCard from '../../components/EnvironmentStatusCard/EnvironmentStatusCard'
import Header from '../../components/Header/Header'
import DeviceCard from '../../components/RoomCard/RoomCard'
import styles from './styles'
import MemberInHome from '../../components/MemberInHome/MemberInHome'
const dataG = [
    {
        id: '1',
        color: '#F7DBDB',
        room: 'Sân vườn',
        device: '6',
    },
    {
        id: '2',
        color: '#F7F2DB',
        room: 'Nhà bếp',
        device: '6',
    },
    {
        id: '3',
        color: '#C6E6FD',
        room: 'Phòng khách',
        device: '6',
    },
    {
        id: '4',
        color: '#F7DBF4',
        room: 'Phòng Toilet',
        device: '6',
    },
    {
        id: '5',
        color: '#F7DBF4',
        room: 'Phòng ăn',
        device: '6',
    },
]

const data1 = [
    {
        id: '1',
        color: '#F7DBDB',
        room: 'Phòng ngủ',
        device: '6',
    },
    {
        id: '2',
        color: '#F7F2DB',
        room: 'Phòng ngủ',
        device: '6',
    },
    {
        id: '3',
        color: '#C6E6FD',
        room: 'Phòng Toilet',
        device: '6',
    },
    {
        id: '4',
        color: '#F7DBF4',
        room: 'Nhà kho',
        device: '6',
    },
]

type DeviceProps = {
    id: string
    color: string
    room: string
    device: string
}

const HomeScreen = ( {navigation, route}: any): JSX.Element => {
    const [changeFloor, setChangefloor] = React.useState<boolean>(true);
    return (
        <View style={styles.container}>
            <Header navigation={navigation} route ={route}/>
            <EnvironmentStatusCard />
            <MemberInHome />
            <DoorCard />
            <View style={[styles.containFloorBtn]}>
                <Pressable 
                onPress={()=>{
                    setChangefloor(true)
                }}
                style={[
                    styles.floorBtn,
                    changeFloor ? styles.onPress : null
                ]}>
                    <Text style={[styles.title]}>Tầng G</Text>
                </Pressable>
                <Pressable 
                onPress={()=>{
                    setChangefloor(false)
                }}
                style={[
                    styles.floorBtn,
                    !changeFloor ? styles.onPress : null
                ]}>
                    <Text style={[styles.title]}>Tầng 1</Text>
                </Pressable>
            </View>
            <FlatList style={{marginBottom: 22}}
                data={changeFloor? dataG : data1}
                ItemSeparatorComponent={() => (
                    <View style={{ width: 10, height: 10}} />
                )}
                renderItem={({ item }: ListRenderItemInfo<DeviceProps>) => (
                    <Pressable
                        onPress={() => navigation.navigate('LivingRoom', {name:'anh duc'})}
                    >
                        <DeviceCard
                            color={item.color}
                            room={item.room}
                            device={item.device}
                        />
                    </Pressable>
                )}
                keyExtractor={(item: DeviceProps) => item.id}
                numColumns={2}
            />
            {/* <View style={{height: 1}}></View> */}
        </View>
    )
}

export default HomeScreen

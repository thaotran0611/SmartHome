import * as React from 'react'
import { Text, View } from 'react-native'
import BedIcon from '../../../assets/svg/bed_icon.svg'
import CakeIcon from '../../../assets/svg/cake_icon.svg'
import ToiletIcon from '../../../assets/svg/toilet_icon.svg'
import TVIcon from '../../../assets/svg/tv_icon.svg'
import text from '../../styles/text'
import IconWrapper from '../IconWrapper/IconWrapper'
import styles from './styles'
import RiceIcon from '../../../assets/svg/rice_icon.svg'
import YardIcon from '../../../assets/svg/tree_icon.svg'

type DeviceProps = {
    color: string
    room: string
    device: string
}

const RoomCard = ({ color, room, device }: DeviceProps): JSX.Element => {
    return (
        <View style={styles.container}>
            <IconWrapper color={color}>
                {room === 'Phòng ngủ' ? (
                    <BedIcon width={25} height={25} />
                ) : room === 'Phòng khách' ? (
                    <TVIcon width={25} height={25} />
                ) : room === 'Nhà bếp' ? (
                    <CakeIcon width={25} height={25} />
                ) : room === 'Phòng ăn' ? (
                    <RiceIcon width={40} height={40} />
                ) : room === 'Sân vườn' ? (
                    <YardIcon width={40} height={40}/>
                ) : (
                    <ToiletIcon width={25} height={25} />
                )}
            </IconWrapper>
            <Text style={[styles.room, text.bold]}>{room}</Text>
            <Text style={[styles.device, text.semiBold]}>
                {device} thiết bị
            </Text>
        </View>
    )
}

export default RoomCard

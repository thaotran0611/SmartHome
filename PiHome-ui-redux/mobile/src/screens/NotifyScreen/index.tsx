import * as React from 'react'
import { ScrollView, Text, View, Image } from 'react-native'
import { useSelector } from 'react-redux'
import NotifyCard from '../../components/NotifyCard/NotifyCard'
import Title from '../../components/Title/Title'
import { notifyListSelector } from '../../redux/selector'
import { NotifyElement } from '../../redux/slice/notificationSlice'
import text from '../../styles/text'
import styles from './styles'
import { BASE_URL } from '../../link_api/meta'
import color from '../../styles/color'

const NotifyScreen = ({navigation, route}: any): JSX.Element => {
    const list = useSelector(notifyListSelector)
    const passengers = route.params['passengers']
    console.log(passengers)

    const images = [
        require('../../../Passengers/passenger2.jpg')
    ]

    return (
        <View style={styles.container}>
            <Title name='Thông báo' />
            <ScrollView contentContainerStyle={styles.notify}>
                {passengers.length > 0 &&
                    passengers.map((element: any, i: number) => (
                        <View>
                            <Image 
                                source={images[i]}
                                style = {styles.img}
                            />
                            <Text style={[text.medium, text.size_medium, {color: color.yellow}]}>{element.status == 1? 'Guest want to go in' : 'Guest want to go out'}</Text>
                            <Text style={[text.medium, text.size_small, {color: color.primary}]}>Arrived at {element.TIM}</Text>
                            {/* <NotifyCard
                                key={i}
                                type={element.status == 0? "Guest want to go inside" : "Guest want to go out"}
                                message={element.timeline}
                                id={i}
                            /> */}
                        </View>
                    ))}
                {passengers.length == 0 && (
                    <Text style={[text.medium, text.color_back, styles.text]}>
                        Không có thông báo mới
                    </Text>
                )}
            </ScrollView>
        </View>
    )
}

export default NotifyScreen

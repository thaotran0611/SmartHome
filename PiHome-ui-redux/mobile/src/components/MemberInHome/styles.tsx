import { StyleSheet } from 'react-native'
import color from '../../styles/color'

const styles = StyleSheet.create({
    container: {
        width: '90%',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 20,
        backgroundColor: color.primary,
        gap: 18,
        height: 160,
    },

    MemberContainer: {
        width: 180,
        height: 90,
        paddingVertical: 9,
        borderRadius: 10,
        backgroundColor: '#656EC7',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10,
        gap: 15,
        marginRight:5,
    },

    image: {
        width: 50,
        height: 50,
        borderRadius: 50,
    },

    // statusContainer: {
    //     display: 'flex',
    //     flexDirection: 'row',
    //     justifyContent: 'space-between',
    // },
    // statusCard: {
    //     display: 'flex',
    //     flexDirection: 'row',
    // },
    // statusCardBackground: {
    //     paddingHorizontal: 20,
    //     borderRadius: 50,

    //     alignItems: 'center',
    //     justifyContent: 'center',
    // },
    // statusCardContent: {
    //     marginLeft: 10,
    //     display: 'flex',
    //     flexDirection: 'column',
    //     gap: -13,
    // },
    // statusCardBackground__red: {
    //     backgroundColor: color.red,
    // },
    // statusCardBackground__blue: {
    //     backgroundColor: color.blue,
    // },
    // marginTop: {
    //     marginTop: 10,
    // }
})

export default styles

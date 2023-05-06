import { Dimensions, StyleSheet } from 'react-native'
import color from '../../styles/color'

var maxWidth = Dimensions.get('window').width //full width
var maxHeight = Dimensions.get('window').height //full height

const styles = StyleSheet.create({
    container: {
        width: maxWidth,
        height: maxHeight,
        flexDirection: 'column',
        alignItems: 'center',
        gap: maxHeight * 0.03,
    },

    containFloorBtn: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    floorBtn: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginLeft: 5,
        marginRight: 5,
        borderRadius: 10,
        alignItems: 'center',
        backgroundColor: color.primary,
        width: (maxWidth - 70) / 2,
    },

    title: {
        fontWeight: 'bold',
        fontSize: 20,
        lineHeight: 18,
        color: color.lightText,
        padding: 5,
    },

    onPress: {
        backgroundColor: color.focusPrimary,
    },
})

export default styles

import { Dimensions, StyleSheet } from 'react-native'
import color from '../../styles/color'

var maxWidth = Dimensions.get('window').width //full width
var maxHeight = Dimensions.get('window').height //full height

const styles = StyleSheet.create({
    container: {
        width: maxWidth,
        height: maxHeight,
        position: 'relative',
        alignItems: 'center',
    },
    notify: {
        width: maxWidth,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 15,
        paddingBottom: 80,
    },
    text: {
        fontSize: 20,
        color: color.darkBackground,
    },
    img: {
        width: 400,
        height: 400,
        marginTop: 10,
        borderRadius: 20,
    }
})

export default styles

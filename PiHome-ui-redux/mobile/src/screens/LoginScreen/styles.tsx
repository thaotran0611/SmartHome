import { StyleSheet, Dimensions } from 'react-native'
import color from '../../styles/color'
var maxWidth = Dimensions.get('window').width //full width
var maxHeight = Dimensions.get('window').height //full height
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: maxWidth,
        height: 410,
        position: 'absolute',
        left: 0,
        top: 0,
        borderBottomLeftRadius: 100,
        borderBottomRightRadius: 100,
        resizeMode: 'cover',
    },
    loginForm: {
        position: 'absolute',
        width: maxWidth - 10,
        flexDirection: 'column',
        alignItems: 'center',
        gap: 20,
        top: 506,
    },
    containerBtn: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 20,
        backgroundColor: color.primary,
    },
    onPress: {
        backgroundColor: color.focusPrimary,
    },
    extend: {
        paddingHorizontal: '30%',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        lineHeight: 18,
        color: color.lightText,
        padding: 5,
    },
})

export default styles

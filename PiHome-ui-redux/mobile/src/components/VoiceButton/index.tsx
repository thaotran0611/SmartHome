import * as React from 'react'
import { Pressable, Text, View } from 'react-native'
import styles from './styles'
import * as Speech from 'expo-speech'

const VoiceButton = (props: { extend?: boolean | undefined }): JSX.Element => {
    const [pressed, setPressed] = React.useState<boolean>(false)
    const checkspeaker = async() => {
        setPressed(!pressed)
        if(!pressed) {
            for (let index = 0; index < 5; index++) {
                Speech.speak("The speaker is checking    ")
            }  
        }
    }
    return (
        <Pressable
            onPress={() => {checkspeaker()}}
            style={[
                styles.container,
                props.extend ? styles.extend : null,
                pressed ? styles.onPress : null,
            ]}
        >
            {!pressed ? (
                <Text style={styles.title}>Kiểm tra loa</Text>
            ) : (
                <Text style={styles.title}>Dừng kiểm tra</Text>
            )}
        </Pressable>
    )
}

export default VoiceButton

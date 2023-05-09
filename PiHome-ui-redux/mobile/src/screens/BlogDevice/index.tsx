import * as React from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import styles from './styles'
import { BASE_URL } from '../../link_api/meta';
import color from '../../styles/color'
import text from '../../styles/text'
import { Line } from 'react-native-svg';
import Fan from '../../components/PowerButton/Fan';
const Blog = ({ navigation, route }: any): JSX.Element => {
    console.log(route.params.RoomID)
    const [light, setLight] = React.useState([])
    const [fan, setFan] = React.useState([])
    React.useEffect(() => {
        fetch(BASE_URL+'blog', {
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
            setFan(jsonData[0])
            setLight(jsonData[1])
        })  
        .catch((error) => {
            console.log(error);
        })
    }, [])
    return (
        <View style={styles.container}>
            <View style={styles.containerTable}>
                <Text style={[text.size_large, {color: color.focusPrimary, marginBottom:5}]}>Fan Blog</Text>
                <View style={styles.header}>
                    <Text style= {[styles.cell, text.size_medium, text.medium, {color: '#ccc'}]}>Value</Text>
                    <Text style = {[styles.cell, text.size_medium, text.medium, {color: '#ccc'}]}>Time</Text>
                </View>
                <View
                    style={{
                        borderBottomColor: '#cccc',
                        borderBottomWidth: StyleSheet.hairlineWidth,
                        marginBottom: 10,
                    }}
                />
                <ScrollView>
                { fan?.map(function (item:any) { return (
                    <View style={styles.row}>
                        {item['value']=='0'?
                            <Text style= {[styles.cell, text.size_medium, text.medium, {color: 'red'}]}>off</Text>:
                            <Text style= {[styles.cell, text.size_medium, text.medium, {color: 'blue'}]}>{item['value']}</Text>
                        }
                        <Text style= {[styles.cell, text.size_medium, text.medium, {color: '#ddd'}]}>{item['created_at']}</Text>
                    </View>
                )})}
                    
                </ScrollView>
            </View>

            <View style={styles.containerTable2}>
                <Text style={[text.size_large, {color: color.focusPrimary, marginBottom:5}]}>Light Blog</Text>
                <View style={styles.header}>
                    <Text style= {[styles.cell, text.size_medium, text.medium, {color: '#ccc'}]}>Value</Text>
                    <Text style = {[styles.cell, text.size_medium, text.medium, {color: '#ccc'}]}>Time</Text>
                </View>
                <View
                    style={{
                        borderBottomColor: '#cccc',
                        borderBottomWidth: StyleSheet.hairlineWidth,
                        marginBottom: 10,
                    }}
                />
                <ScrollView>
                { light?.map(function (item:any) { return (
                    <View style={styles.row}>
                        {item['value']=='0'?
                            <Text style= {[styles.cell, text.size_medium, text.medium, {color: 'red'}]}>off</Text>:
                            <Text style= {[styles.cell, text.size_medium, text.medium, {color: 'blue'}]}>on</Text>
                        }
                        <Text style= {[styles.cell, text.size_medium, text.medium, {color: '#ddd'}]}>{item['created_at']}</Text>
                    </View>
                )})}
                </ScrollView>
            </View>
        </View>
    )
}
export default Blog

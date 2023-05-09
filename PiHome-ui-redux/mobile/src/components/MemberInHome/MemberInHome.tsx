import * as React from 'react'
import { Text, View, ScrollView, Image } from 'react-native'
import { BASE_URL } from '../../link_api/meta'
// import { Image } from 'react-native-svg'
import text from '../../styles/text'
import styles from './styles'

const MemberInHome = (): JSX.Element => {
    const [members, SetMembers] = React.useState([])
    React.useEffect(() => {
        const interval = setInterval(()=>{
            fetch(BASE_URL+'users', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then((resp) => {
                return resp.json();
            })
            .then((jsonData) => {
                SetMembers(jsonData)
            })  
            .catch((error) => {
                console.log(error);
            })
        }, 10000)
    }, [])
    console.log(members)
    const images = [
        require('../../../Photo/ad2.jpg'),
        require('../../../Photo/img5.jpg'),
        require('../../../Photo/img68.jpg')
    ]
    
    return (
        <View style={styles.container}>
            <Text style={[text.semiBold, text.size_small, text.color_white]}>Members</Text>
            <ScrollView horizontal>
            { members?.map((item:any, index) => {
                return (
                <View style={styles.MemberContainer}>
                    {/* {<img src={src} style={styles.image} />} */}
                    <Image
                        source={images[index]}
                        style={styles.image}
                    />
                    <ScrollView>
                        <Text style={[text.regular, text.size_small, text.color_white]}>{item.LName}</Text>
                        {item['isAthome']?
                            <Text style={[text.regular, text.size_extraSmall, {color:'cyan'}]}>at home</Text> : 
                            <Text style={[text.regular, text.size_extraSmall, {color:'red'}]}>go out</Text>
                        }
                        <Text style={[text.regular, text.size_extraExtraSmall, {color:'#ccc'}]}>{item['timeline']}</Text>
                    </ScrollView>
                </View>
                )})
            }
            </ScrollView>
        </View>
    )
}
export default MemberInHome

import * as React from 'react';
import { ScrollView, Text, View } from 'react-native';
import styles from './styles'
import Header from '../../components/Header/Header';
import Chart from '../../components/LineChart/LineChart';
import text from '../../styles/text';
import PChart from '../../components/PieChart/PieChart';
const DashBoardScreen = ({ navigation }: any): JSX.Element => {
    const data2 = {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
          {
            data: [20, 45, 28, 80, 99, 43]
          }
        ]
    };
    const data = [
        {
          name: "Seoul",
          population: 21500000,
          color: "rgba(131, 167, 234, 1)",
          legendFontColor: "#7F7F7F",
          legendFontSize: 15
        },
        {
          name: "Toronto",
          population: 2800000,
          color: "#F00",
          legendFontColor: "#7F7F7F",
          legendFontSize: 15
        },
        {
          name: "Beijing",
          population: 527612,
          color: "red",
          legendFontColor: "#7F7F7F",
          legendFontSize: 15
        },
        {
          name: "New York",
          population: 8538000,
          color: "#ffffff",
          legendFontColor: "#7F7F7F",
          legendFontSize: 15
        },
        {
          name: "Moscow",
          population: 11920000,
          color: "rgb(0, 0, 255)",
          legendFontColor: "#7F7F7F",
          legendFontSize: 15
        }
    ];
    return (
        <View style={styles.container}>
            <Header navigation={navigation} />
            <ScrollView>
            {/* <View style={{backgroundColor: '#3333'}}> */}
                {/* <Button><Text>Barchart</Text></Button> */}
            <Text style={[text.size_medium, text.semiBold]}>Temperature</Text>
            <Chart data={data2} color="rgba(241, 56, 56, 0.8)" labelcolor="rgba(252, 62, 74, 1)"/>
            <Text style={[text.size_medium, text.semiBold]}>Humidity</Text>
            <Chart data={data2} color="rgba(24, 111, 242, 0.8)" labelcolor="rgba(44, 125, 220, 1)"/>
            <Text style={[text.size_medium, text.semiBold]}>Electricity consumption</Text>
            <PChart data={data} color="rgba(241, 56, 56, 0.8)" labelcolor="rgba(252, 62, 74, 1)" />
            {/* <View style={{height: 50}}></View> */}
            </ScrollView>
        </View>
    )
}
export default DashBoardScreen
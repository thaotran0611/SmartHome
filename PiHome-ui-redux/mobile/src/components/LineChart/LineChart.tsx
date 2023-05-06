import * as React from 'react';
// import { LineChart } from 'react-native-chart-kit';
import { ScrollView, Text, View } from 'react-native';
// import LineChart from 'react-native-chart-kit/dist/line-chart';
import LineChart from "D:/HK222/DA_HTTT/SmartHomeApp/SmartHome/PiHome-ui-redux/mobile/node_modules/react-native-chart-kit/dist/line-chart/index";
import { Dimensions } from 'react-native';
import styles from './styles';

const Chart = (props: { data: any, color: any, labelcolor: any }) => {
    return (
        <View>
            <LineChart
                data={props.data}
                width={Dimensions.get('screen').width - 10} // from react-native
                height={180}
                yAxisLabel="$"
                yAxisSuffix="k"
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                backgroundGradientFromOpacity: 0,
                backgroundGradientToOpacity: 0.1,
                // backgroundColor: "#fff",
                backgroundGradientFrom: "#fff",
                backgroundGradientTo: "#fff",
                decimalPlaces: 2, // optional, defaults to 2dp
                color: () => props.color,
                // color: (opacity = 1) => `rgba(241, 56, 56, ${opacity})`,
                labelColor: () => props.labelcolor,
                // labelColor: (opacity = 1) => `rgba(252, 62, 74, ${opacity})`,
                style: {
                    // borderRadius: 16,
                    padding: 20
                },
                propsForDots: {
                    r: "6",
                    strokeWidth: "1",
                    stroke: "#ffa726"
                }
                }}
                bezier
                style={{
                marginVertical: 8,
                borderRadius: 16
                }}
            />  
        </View>
    )
}

export default Chart;
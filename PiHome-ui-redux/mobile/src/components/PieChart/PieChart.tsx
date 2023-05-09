import * as React from 'react';
// import { LineChart } from 'react-native-chart-kit';
import { ScrollView, Text, View } from 'react-native';
// import LineChart from 'react-native-chart-kit/dist/line-chart';
import { PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const PChart = (props: { data: any, color: any, labelcolor: any }) => {
    return (
    <PieChart
    data={props.data}
    width={Dimensions.get('screen').width - 10}
    height={220}
    backgroundColor={"transparent"}
    accessor={"Value"}
    paddingLeft={"15"}
    // center={[10, 50]}
    absolute
    chartConfig={{
        backgroundGradientFromOpacity: 0,
        backgroundGradientToOpacity: 0.1,
        decimalPlaces: 2,
        color: () => props.color,
        labelColor: () => props.labelcolor,
    }}
    />
    )
}

export default PChart

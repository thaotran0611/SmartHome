import * as React from 'react';
import { ScrollView, Text, View } from 'react-native';
import styles from './styles'
import Header from '../../components/Header/Header';
import Chart from '../../components/LineChart/LineChart';
import text from '../../styles/text';
import PChart from '../../components/PieChart/PieChart';
import { BASE_URL } from '../../link_api/meta';
const DashBoardScreen = ({ navigation }: any): JSX.Element => {

    const [data2, setData2] = React.useState({
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
          {
            data: [20, 45, 28, 80, 99, 43]
          }
        ]
    });

    const [data3, setData3] = React.useState({
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
          {
            data: [20, 45, 28, 80, 99, 43]
          }
        ]
    });

    const tempdata = {
        labels: ["0h"],
        datasets: [
            {
                data: [0]
            }
        ]
    }

    const luxdata = {
        labels: ["0h"],
        datasets: [
            {
                data: [0]
            }
        ]
    }
    const [temp, setTemp] = React.useState([])
    const [lux, setLux] = React.useState([])

    React.useEffect(() => {
        for (let index = 0; index < temp.length; index++) {
            tempdata.labels.push(temp[index].hour)
            tempdata.datasets[0].data.push(temp[index].value)
        }
        tempdata.labels.shift()
        tempdata.datasets[0].data.shift()
        setData2(tempdata)
    },[temp])

    React.useEffect(() => {
        for (let index = 0; index < lux.length; index++) {
            luxdata.labels.push(lux[index].hour)
            luxdata.datasets[0].data.push(lux[index].value)
        }
        luxdata.labels.shift()
        luxdata.datasets[0].data.shift()
        setData3(luxdata)
    },[lux])

    const [data, setData] = React.useState([])
    React.useEffect(() => {
        fetch(BASE_URL+'roundChart', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then((resp) => {
            return resp.json();
        })
        .then((jsonData) => {
            console.log(jsonData)
            setData(jsonData)
        })  
        .catch((error) => {
            console.log(error);
        })
    }, [])

    React.useEffect(() => {
        fetch(BASE_URL+'sensor', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then((resp) => {
            return resp.json();
        })
        .then((jsonData) => {
            console.log(jsonData[0], jsonData[1])
            setTemp(jsonData[0])
            setLux(jsonData[1])
        })  
        .catch((error) => {
            console.log(error);
        })
    }, [])

    // React.useEffect(() => {
    //     fetch(BASE_URL+'sensor', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({sensor: 'lux', step: 2})
    //     })
    //     .then((resp) => {
    //         return resp.json();
    //     })
    //     .then((jsonData) => {
    //         console.log(jsonData)
    //         setLux(jsonData)
    //     })  
    //     .catch((error) => {
    //         console.log(error);
    //     })
    // }, [])
    const color = ['rgba(131, 167, 234, 1)','#F00', '#a00', '#ab8', '#adf', '#addd', '#eabc']

    for (let index = 0; index < data.length; index++) {
      data[index].color = color[index]
      data[index].legendFontColor = "#7F7F7F"
      data[index].legendFontSize = 15
    }
  
    return (
        <View style={styles.container}>
            <Header navigation={navigation} />
            <ScrollView>
            {/* <View style={{backgroundColor: '#3333'}}> */}
                {/* <Button><Text>Barchart</Text></Button> */}
            <Text style={[text.size_medium, text.semiBold]}>Temperature</Text>
            <Chart data={data2} color="rgba(241, 56, 56, 0.8)" labelcolor="rgba(252, 62, 74, 1)" unit={"C"}/>
            <Text style={[text.size_medium, text.semiBold]}>Light Intension</Text>
            <Chart data={data3} color="rgba(24, 111, 242, 0.8)" labelcolor="rgba(44, 125, 220, 1)" unit={"lx"}/>
            <Text style={[text.size_medium, text.semiBold]}>Electricity consumption</Text>
            <PChart data={data} color="rgba(241, 56, 56, 0.8)" labelcolor="rgba(252, 62, 74, 1)" />
            {/* <View style={{height: 50}}></View> */}
            </ScrollView>
        </View>
    )
}
export default DashBoardScreen
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from '../screens/HomeScreen'
import LoginScreen from '../screens/LoginScreen/index'
// import TabNavigator from './TabNavigator'
import TabNavigatorHost from './TabNavigator'
import TabNavigatorMember from './TabNavigatorMember'
const Stack = createStackNavigator()

const AuthNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Login' component={LoginScreen} />
            <Stack.Screen name='HomeHost' component={TabNavigatorHost} />
            <Stack.Screen name='HomeMember' component={TabNavigatorMember} />
        </Stack.Navigator>
    )
}

export default AuthNavigator

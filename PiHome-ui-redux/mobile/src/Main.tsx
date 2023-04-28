import { NavigationContainer } from '@react-navigation/native'
import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useNotifications from './hook/useNotification'
import useSocket from './hook/useSocket'
import AuthNavigator from './navigation/AuthNavigator'
import TabNavigator from './navigation/TabNavigator'
import {
    earthquakeSelector,
    fireSelector,
    loginSelector,
    themeSelector,
    thiefSelector,
} from './redux/selector'
import {
    addNotify,
    updateEarthquakeStatus,
    updateFireStatus,
    updateThiefStatus,
} from './redux/slice/notificationSlice'
import socket from './utils/socket'

const Main = (): JSX.Element => {
    const theme = useSelector(themeSelector)
    useSocket(socket)
    // const { schedulePushNotification } = useNotifications()
    const dispatch = useDispatch()

    const thiefStatus = useSelector(thiefSelector)
    const fireStatus = useSelector(fireSelector)
    const earthquakeStatus = useSelector(earthquakeSelector)
    const login = useSelector(loginSelector)

    React.useEffect(() => {
        const sendNotify = async (title: string, message: string) => {
            // await schedulePushNotification(title, message)
            dispatch(addNotify({ title, message }))
        }

        if (thiefStatus) {
            sendNotify('Warning', 'Có kẻ đột nhập')
            dispatch(updateThiefStatus({ status: false }))
        }
    }, [thiefStatus])

    React.useEffect(() => {
        const sendNotify = async (title: string, message: string) => {
            // await schedulePushNotification(title, message)
            dispatch(addNotify({ title, message }))
        }

        if (fireStatus) {
            sendNotify('Alert', 'Có cháy !!!')
            dispatch(updateFireStatus({ status: false }))
        }
    }, [fireStatus])

    React.useEffect(() => {
        const sendNotify = async (title: string, message: string) => {
            // await schedulePushNotification(title, message)
            dispatch(addNotify({ title, message }))
        }

        if (earthquakeStatus) {
            sendNotify('Alert', 'Có động đất !!!!')
            dispatch(updateEarthquakeStatus({ status: false }))
        }
    }, [earthquakeStatus])

    return (
        <NavigationContainer theme={theme}>
            {login.isLogin ? <TabNavigator /> : <AuthNavigator />}
        </NavigationContainer>
    )
}
export default Main

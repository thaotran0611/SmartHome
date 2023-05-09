import { NavigatorScreenParams } from '@react-navigation/native'

type HomeStackParamList = {
    Home: undefined
    Notification: undefined
    LivingRoom: undefined
    Kitchen: undefined
    Bedroom: undefined
    Toilet: undefined
    Login: undefined
    None: undefined
    Blog: undefined
}

type AppTabParamList = {
    HomeStack: NavigatorScreenParams<HomeStackParamList>
    Setting: undefined
    DashBoard: undefined
    NewUser: undefined
}

export { AppTabParamList, HomeStackParamList }

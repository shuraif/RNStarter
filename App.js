/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useEffect} from 'react';
import {View, ActivityIndicator,useColorScheme} from 'react-native';
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native';
import BackgroundFetch from "react-native-background-fetch";
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme,
} from 'react-native-paper';

import {DrawerContent} from './src/screens/DrawerContent';

import MainTabScreen from './src/screens/MainTabScreen';
import SupportScreen from './src/screens/SupportScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import BookmarkScreen from './src/screens/BookmarkScreen';

import SampleScreen1 from './src/screens/drawerscreens/SampleScreen1'
import SampleScreen2 from './src/screens/drawerscreens/SampleScreen2'

import HomeScreen from './src/screens/HomeScreen'

import {AuthContext} from './src/components/context';

import RootStackScreen from './src/screens/RootStackScreen';

import AsyncStorage from '@react-native-async-storage/async-storage';

import NotificationService from './src/service/NotificationService'

import {ENABLE_THEMING,ENABLE_BOTTOM_TAB,ENABLE_NAV_DRAWER,ENABLE_LOGIN} from './src/configs/Config'

const Drawer = createDrawerNavigator();
const Tab =  createStackNavigator();

const App = () => {

 const notificationService=new NotificationService()
  const isDarkTheme = useColorScheme() === 'dark';
  const [events,setEvents]=React.useState([{taskId:'0',timestamp:(new Date()).toString()}]);


  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };

  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      text: '#2d334a',
      placeholdertext: '#a7a9be',
      btnBackground:'#7f5af0',
      btnText:'#fffffe',
      iconColor:'#2cb67d',

      background: '#f8f5f2',
      headLine:'#232323',
      paragraph: '#222525',
      button :'#078080',
      buttonText : '#232323',
      stroke : '#232323',
      highlight :'#078080',
      seccondary :'#f45d48',
      teritory : '#f8f5f2'


    }
  }
  
  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      text: '#a7a9be',
      placeholdertext :'#72757e',
      btnBackground:'#7f5af0',
      btnText:'#fffffe',
      iconColor:'#2cb67d',

      background: '#010101',
      headLine:'#fffffe',
      paragraph: '#94a1b2',
      button :'#7f5af0',
      buttonText : '#fffffe',
      stroke : '#16161a',
      highlight :'#7f5af0',
      seccondary :'#72757e',
      teritory : '#2cb67d'
    }
  }



  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState,
  );

  const authContext = React.useMemo(
    () => ({
      signIn: async foundUser => {
        // setUserToken('fgkj');
        // setIsLoading(false);
        const userToken = String(foundUser.userToken);
        const userName = foundUser.username;

        try {
          await AsyncStorage.setItem('userToken', userToken);
        } catch (e) {
          console.log(e);
        }
        // console.log('user token: ', userToken);
        dispatch({type: 'LOGIN', id: userName, token: userToken});
      },
      signOut: async () => {
        // setUserToken(null);
        // setIsLoading(false);
        try {
          await AsyncStorage.removeItem('userToken');
        } catch (e) {
          console.log(e);
        }
        dispatch({type: 'LOGOUT'});
      },
      signUp: () => {
        // setUserToken('fgkj');
        // setIsLoading(false);
      },

      // toggleTheme:async () => {
       //write any application context change here  

      // },
    }),
    [],
  );


  useEffect(() => {
    let darkTheme = '';
    initBackgroundFetch()
    setTimeout(async () => {
      // setIsLoading(false);
      let userToken;
      userToken = null;
   
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        console.log(e);
      }
      dispatch({type: 'RETRIEVE_TOKEN', token: userToken});
    }, 1000);


  }, []);
  const initBackgroundFetch=async () =>{
    console.log('registering bg')
    // BackgroundFetch event handler.
    const onEvent = async (taskId) => {
      console.log('inside bg task')

      try {
        const value = await AsyncStorage.getItem('@storage_Key')
        if(value !== null) {
          // value previously stored
         // notificationService.localNotification(value)
        }else{
         // notificationService.localNotification("running first time")
        }
      } catch(e) {
        console.log('unable to fetch async')
      }

      try {
        await AsyncStorage.setItem('@storage_Key', formatAMPM())
      } catch (e) {
        // saving error
        console.log('unable to save async')
      }




      // notificationService.localNotification()
      console.log('[BackgroundFetch] task: ', taskId);
      // Do your background work...
      await addEvent(taskId);
      // IMPORTANT:  You must signal to the OS that your task is complete.
      BackgroundFetch.finish(taskId);
    }

    // Timeout callback is executed when your Task has exceeded its allowed running-time.
    // You must stop what you're doing immediately BackgorundFetch.finish(taskId)
    const onTimeout = async (taskId) => {
      console.warn('[BackgroundFetch] TIMEOUT task: ', taskId);
      BackgroundFetch.finish(taskId);
    }

    // Initialize BackgroundFetch only once when component mounts.
    let status = await BackgroundFetch.configure({minimumFetchInterval: 15,
      periodic :true,
      stopOnTerminate :false,
      forceAlarmManager :true,startOnBoot :true
    }, onEvent, onTimeout);

    console.log('[BackgroundFetch] configure status: ', status);
  }
    // Add a BackgroundFetch event to <FlatList>
    const addEvent=(taskId)=> {
      // Simulate a possibly long-running asynchronous task with a Promise.
      return new Promise((resolve, reject) => {
        //setEvents(events => ({events: [events, {taskId: taskId,timestamp:formatAMPM() }] }));
        setEvents(oldArray => [...oldArray, {taskId: taskId,timestamp:formatAMPM() }]);
        resolve();
      });
    }

    
    const  formatAMPM=()=> {
      var date=new Date();
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0'+minutes : minutes;
      var strTime = hours + ':' + minutes + ' ' + ampm;
      console.log(strTime)
      return strTime;
    }


  const theme = isDarkTheme&&ENABLE_THEMING? CustomDarkTheme : CustomDefaultTheme;


  if (loginState.isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <PaperProvider theme={theme}>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer theme={theme}>
          {loginState.userToken !== null || !ENABLE_LOGIN? (

          // <MainTabScreen/>
            
            <Drawer.Navigator
              drawerContent={props => <DrawerContent {...props} />}>
                {
                  ENABLE_BOTTOM_TAB? <Drawer.Screen name="HomeDrawer" component={MainTabScreen} />:null
                }
             

              <Drawer.Screen name="SampleScreen1" component={SampleScreen1} />
              <Drawer.Screen name="SettingsScreen" component={SettingsScreen} />
              <Drawer.Screen name="BookmarkScreen" component={BookmarkScreen} />
            </Drawer.Navigator>
              
          ) : (
            <RootStackScreen />
          )}
        </NavigationContainer>
      </AuthContext.Provider>
    </PaperProvider>
  );
};

export default App;

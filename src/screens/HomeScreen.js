import React from 'react';
import { View, Text, Button, StyleSheet, StatusBar } from 'react-native';
import { useTheme } from '@react-navigation/native';
import NotificationService from './../service/NotificationService'
const HomeScreen = ({navigation}) => {
  const notificationService=new NotificationService()
  const { colors } = useTheme();

  const theme = useTheme();
  
    return (
      <View style={styles.container}>
        <StatusBar barStyle= { theme.dark ? "light-content" : "dark-content" }/>
        <Text style={{color: colors.text}}>Home Screen</Text>
      <Button
        title="Go to details screen"
        onPress={() => navigation.navigate("Details")}
      />
       <View style={styles.body}>
                  <Button title={"Local Notification"} onPress={() => notificationService.localNotification() } />
                  <Button title={"Scheduled (30s) Notification"} onPress={() =>notificationService.scheduleNotification() } />
                </View>
      </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});

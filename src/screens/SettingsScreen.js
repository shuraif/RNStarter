import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';
const SettingsScreen = ({navigation}) => {
    return (
      <View style={styles.container}>
          <Appbar.Header>
        <Appbar.Action icon="menu" onPress={()=>navigation.openDrawer()} />
   
      <Appbar.Content title="Title" subtitle="Subtitle" />
      
    
    </Appbar.Header>
        <Text>Settings Screen</Text>
        <Button
          title="Click Here"
          onPress={() => alert('Button Clicked!')}
        />
      </View>
    );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
   
  },
});

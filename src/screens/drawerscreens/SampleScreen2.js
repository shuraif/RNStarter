import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';
const SampleScreen2 = ({navigation}) => {
    return (
      <View style={styles.container}>
        <Appbar.Header>
        <Appbar.Action icon="menu" onPress={()=>navigation.openDrawer()} />
   
      <Appbar.Content title="SampleScreen2" subtitle="Subtitle" />
      
    
    </Appbar.Header>
        <Text>SampleScreen2 </Text>
        <Button
          title="Click Here"
          onPress={() => alert('SampleScreen2 Button Clicked!')}
        />
      </View>
    );
};

export default SampleScreen2;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    
  },
});
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';
const SampleScreen1 = ({navigation}) => {
    return (
      <View style={styles.container}>
        <Appbar.Header>
        <Appbar.Action icon="menu" onPress={()=>navigation.openDrawer()} />
   
      <Appbar.Content title="SampleScreen1" subtitle="Subtitle" />
      
    
    </Appbar.Header>
        <Text>SampleScreen1 </Text>
        <Button
          title="Click Here"
          onPress={() => alert('SampleScreen1 Button Clicked!')}
        />
      </View>
    );
};

export default SampleScreen1;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    
  },
});
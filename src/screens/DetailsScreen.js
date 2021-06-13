import React, {useEffect} from 'react';
import {
  View,
  Button,
  StyleSheet,
  FlatList,
  TouchableHighlight,
  RefreshControl,
  SafeAreaView,ScrollView
} from 'react-native';
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
  Appbar,
  withTheme,
} from 'react-native-paper';

import ApiService from './../service/ApiService';

const wait = (timeout) => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

const DetailsScreen = ({navigation}) => {
  const [messages, setMessages] = React.useState([]);
  const {colors} = useTheme();
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    setRefreshing(true);
    console.log('inside useeffect ');
    fetchMessages();
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchMessages();
   // wait(2000).then(() => setRefreshing(false));
  }, []);


  const fetchMessages = async () => {
    console.log('inside fetch data');
    await ApiService.post('apiendpoint', {}, true)
      .then(res => {
        // console.log(res.data);
        setMessages(res.data);
        console.log(JSON.stringify(messages));
        setRefreshing(false)
      })
      .catch(error => {
        console.log(error);
        //console.log(error.response.status);
      });
  };

  return (
    <View style={styles.container}>
      <FlatList
        enableEmptySections={true}
        numColumns={1}
        keyExtractor={item => item.id}
        data={messages}

        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }

        renderItem={({item}) => (
          <View
            style={{
              borderColor: colors.highlight,
              borderBottomWidth: 1,
              borderRadius: 2,
             
              paddingLeft: 5,
            }}>
            <View stye={styles.sectionContainer}>
              <Text
                style={[styles.sectionTitle, {color: colors.headLine}]}>
                {item.name}
              </Text>
              <Text  style={[styles.sectionDescription, {color: colors.paragraph}]}>
                {item.message}</Text>
             
            </View>
          </View>
        )}
      />



{/* <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Text>Pull down to see RefreshControl indicator</Text>
      </ScrollView>
    </SafeAreaView> */}
     
    </View>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
  },
  scrollView: {
    // backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    // backgroundColor: Colors.white,
  },
  sectionContainer: {
    margin: 10,
  },
  sectionTitle: {
    fontSize: 18,
    paddingTop: 15,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 14,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    // color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

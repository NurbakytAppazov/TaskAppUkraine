import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Tasks } from '../components/Tasks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { signIn } from '../redux/actions';

export const MainScreen = ({ navigation, route }) => {
   const dispatch = useDispatch()

   const loadToken = async () => {
      const userToken = await AsyncStorage.getItem('user_token');
      userToken !== null && dispatch(signIn(JSON.parse(userToken).token));
   }

   useEffect(() => {
      loadToken()
   }, [])

   return (
      <View style={styles.container}>
         <Tasks
            navigation={navigation}
            route={route}
         />
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#fefefe',
   },
});
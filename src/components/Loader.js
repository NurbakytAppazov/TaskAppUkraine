import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppText } from './ui/AppText';

export const Loader = () => {
   return (
      <View style={styles.container}>
         <AppText>Подождите...</AppText>
      </View>
   );
};
const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
   },
});
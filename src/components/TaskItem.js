import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { status } from '../redux/actions';
import { AppButton } from './ui/AppButton';
import { AppText } from './ui/AppText';
import { AppTextBold } from './ui/AppTextBold';

export const TaskItem = ({navigation, item}) => {

   const token = useSelector(state => state.auth)

   return (
      <View style={styles.container}>
         <AppTextBold style={styles.name}>{ item.username }</AppTextBold>
         <AppText style={styles.email}>{ item.email }</AppText>
         <AppText>{ item.text }</AppText>
         <AppText style={styles.status}>{ 'Статус: ' + status(item.status) }</AppText>
         {token !== null && (
            <AppButton
               onPress={() => navigation.navigate('Edit', {
                  id: item.id,
                  text: item.text,
                  status: item.status
               })}
            >Изменить</AppButton>
         )}
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      minWidth: '100%',
      alignItems: 'flex-start',
      padding: 15,
      marginVertical: 7,
      borderRadius: 5,
      borderColor: '#ccc',
      borderWidth: 1
   },
   name: {
      fontSize: 18,
      marginBottom: 5
   },
   email: {
      marginBottom: 10
   },
   status: {
      fontSize: 14,
      marginVertical: 10
   },
});
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppButton } from './ui/AppButton';
import { AppText } from './ui/AppText'
import RNPickerSelect from 'react-native-picker-select'
import { useDispatch, useSelector } from 'react-redux';
import { signOut, sortByDirection, sortByField } from '../redux/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ListHeader = (props) => {
   const dispatch = useDispatch();
   const sortDirection = useSelector(state => state.sort.sortDirection)
   const sortField = useSelector(state => state.sort.sortField)

   const userToken = useSelector(state => state.auth)

   const logOut = async () => {
      await AsyncStorage.clear();
      dispatch(signOut())
   }

   return (
      <View style={styles.container}>
         <View style={styles.headerItem}>
            <AppButton
               onPress={() => props.navigation.navigate('Create')}
               style={{
                  width: '47%',
                  backgroundColor: 'green'
               }}
               textStyle={{color: '#fff'}}
            >+ Создать задачу</AppButton>
            <AppButton
               onPress={() => {
                  userToken === null
                  ? props.navigation.navigate('Login')
                  : logOut()
               }}
               style={{
                  backgroundColor: userToken === null ? 'darkviolet' : 'grey',
                  paddingHorizontal: 25
               }}
               textStyle={{color: '#fff', textTransform: 'uppercase'}}
            >{userToken === null ? 'Войти' : 'Выход'}</AppButton>
         </View>
         <AppText style={{marginVertical: 10}}>Сортировка:</AppText>
         <View style={styles.headerItem} >
            <RNPickerSelect
               value={sortDirection}
               useNativeAndroidPickerStyle={false}
               style={{
                  inputAndroid: styles.picker,
                  inputIOS: styles.picker,
               }}
               onValueChange={(val) => dispatch(sortByDirection(val))}
               items={[
                  {label: 'По возрастанию', value: 'asc'},
                  {label: 'По убыванию', value: 'desc'}
            ]}
            />
            <RNPickerSelect
               value={sortField}
               useNativeAndroidPickerStyle={false}
               style={{
                  inputAndroid: styles.picker,
                  inputIOS: styles.picker,
               }}
               onValueChange={(val) => dispatch(sortByField(val))}
               items={[
                  {label: 'по имени', value: 'username'},
                  {label: 'по e-mail', value: 'email'},
                  {label: 'по статусу', value: 'status'}
            ]}
            />
         </View>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      width: '100%',
      marginBottom: 15,
      alignItems: 'flex-start',
   },
   headerItem: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between'
   },
   btn: {
      padding: 10,
      backgroundColor: 'orange',
      borderRadius: 4
   },
   picker: {
      minWidth: '47%',
      color: '#000',
      fontSize: 18,
      padding: 0,
      paddingLeft: 10,
      paddingRight: 30,
      borderWidth: 1,
      borderColor: '#bbb',
      borderRadius: 4
   }
});
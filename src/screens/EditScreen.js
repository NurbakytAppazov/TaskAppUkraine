import React, { useState } from 'react';
import { View, StyleSheet, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { AppText } from '../components/ui/AppText';
import RNPickerSelect from 'react-native-picker-select'
import { AppButton } from '../components/ui/AppButton';
import { useSelector } from 'react-redux';

export const EditScreen = ({ navigation, route }) => {
   const [loading, setLoading] = useState(false);
   const oldText = route.params.text;
   const oldStatus = route.params.status;
   const [text, setText] = useState(oldText);
   const [status, setStatus] = useState(oldStatus);

   const token = useSelector(state => state.auth)

   const saveHandler = async () => {
      setLoading(true)
      let formData = new FormData()
      formData.append('text', text)
      formData.append('status', status)
      formData.append('token', token)
      
      let response = await fetch(`https://uxcandy.com/~shapoval/test-task-backend/v2/edit/${route.params.id}?developer=Nurbakyt1`, {
         method: 'POST',
         body: formData
      })
      let result = await response.json()

      console.log(result)

      setLoading(false)
      if (result.status === 'ok') {
         navigation.navigate('Main')
      }
      else {
         navigation.navigate('Main', {
            message: result.message.token
         })
      }
   }

   return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} >
         <View style={styles.container}>
            <View style={styles.inputWrap}>
               <AppText style={{fontSize: 18, marginBottom: 5}} >Текст задачи:</AppText>
               <TextInput
                  style={{...styles.input, ...{
                     textAlignVertical: 'top'
                  }}}
                  onChangeText={setText}
                  value={text}
                  placeholder='Ваша задача'
                  multiline
                  numberOfLines={4}
                  autoCapitalize='none'
               />
            </View>
            <View style={styles.inputWrap}>
               <AppText style={{fontSize: 18, marginBottom: 5}} >Статус:</AppText>
               <RNPickerSelect
                  value={status}
                  useNativeAndroidPickerStyle={false}
                  style={{
                     inputAndroid: styles.picker,
                     inputIOS: styles.picker,
                  }}
                  onValueChange={(val) => setStatus(val)}
                  items={[
                     {label: 'задача не выполнена', value: 0},
                     {label: 'задача не выполнена, отредактирована админом', value: 1},
                     {label: 'задача выполнена', value: 10},
                     {label: 'задача отредактирована админом и выполнена', value: 11}
               ]}
               />
            </View>
            <View style={styles.btnWrap}>
               <AppButton
                  onPress={() => navigation.navigate('Main')}
                  disabled={loading}
                  style={{
                     width: '47%', backgroundColor: 'grey'
                  }}
                  textStyle={styles.btnText}
               >Отменить</AppButton>
               <AppButton
                  onPress={() => saveHandler()}
                  disabled={loading}
                  style={{
                     width: '47%',
                     backgroundColor: 'green',
                  }}
                  textStyle={styles.btnText}
               >{loading === true ? 'Подождите...' : 'Сохранить'}</AppButton>
            </View>
         </View>
      </TouchableWithoutFeedback>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 15
   },
   inputWrap:{
      width: '100%',
      marginBottom: 15
   },
   input:{
      width: '100%',
      padding: 10,
      paddingLeft: 15,
      fontSize: 18,
      fontFamily: 'Lato-Regular',
      borderWidth: 1,
      borderColor: '#bbb',
      borderRadius: 4
   },
   picker: {
      minWidth: '47%',
      color: '#000',
      fontSize: 18,
      padding: 5,
      paddingLeft: 10,
      paddingRight: 30,
      borderWidth: 1,
      borderColor: '#bbb',
      borderRadius: 4
   },
   btnWrap: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between'
   },
   btnText: {
      color: '#fff',
      textTransform: 'uppercase',
      textAlign: 'center'
   }
});
import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TextInput } from 'react-native';
import { AppButton } from '../components/ui/AppButton';
import { AppText } from '../components/ui/AppText';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { signIn } from '../redux/actions';

export const LoginScreen = ({ navigation }) => {
   const [loading, setLoading] = useState(false)
   const [name, setName] = useState('');
   const [password, setPassword] = useState('');

   const [error, setError] = useState({
      username: null, password: null
   })

   const dispatch = useDispatch()

   const login = async () => {
      setLoading(true)
      let formData = new FormData();
      formData.append('username', name)
      formData.append('password', password)

      let response = await fetch(`https://uxcandy.com/~shapoval/test-task-backend/v2/login?developer=Nurbakyt1`, {
         method: 'POST',   
         body: formData
      })
      let result = await response.json();

      console.log(result)

      if (result.status === 'ok') {
         await AsyncStorage.setItem(
            'user_token',
            JSON.stringify({
               token: result.message.token
            })
         )
         dispatch(signIn(result.message.token))
         
         navigation.navigate('Main')
      }
      else {
         setError({
            username: result.message.username,
            password: result.message.password
         })
      }
      setLoading(false)
   }



   return (
      <ScrollView
         style={styles.container}
         showsVerticalScrollIndicator={false}
      >
         <View style={styles.inputWrap}>
            <TextInput
               style={styles.input}
               onChangeText={setName}
               value={name}
               placeholder='Ваше имя'
            />
            {error.username !== null && <AppText style={{color: 'red'}}>{error.username}</AppText>}
         </View>
         <View style={styles.inputWrap}>
            <TextInput
               style={styles.input}
               onChangeText={setPassword}
               value={password}
               placeholder='Пароль'
               secureTextEntry
            />
            {error.password !== null && <AppText style={{color: 'red'}}>{error.password}</AppText>}
         </View>
         <AppButton
            onPress={() => login()}
            disabled={loading}
            style={{backgroundColor: 'skyblue'}}
            textStyle={{
               textAlign: 'center',
               textTransform: 'uppercase'
            }}
         >
            {
               loading === true ? 'Подождите...' : 'Войти'
            }
         </AppButton>
      </ScrollView>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      padding: 15,
      backgroundColor: '#fff',
   },
   inputWrap:{
      width: '100%',
      marginBottom: 15
   },
   icon:{
      position: 'absolute',
      left: 16,
      bottom: 14,
   },
   input:{
      width: '100%',
      padding: 10,
      paddingLeft: 15,
      fontSize: 18,
      fontFamily: 'Lato-Regular',
      // backgroundColor: '#fff',
      borderWidth: 1,
      borderColor: '#bbb',
      borderRadius: 4
   },
});
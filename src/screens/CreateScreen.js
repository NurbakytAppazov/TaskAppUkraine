import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { createTask } from '../redux/actions';
import { AppButton } from '../components/ui/AppButton';
import { AppText } from '../components/ui/AppText';

export const CreateScreen = ({navigation}) => {
   const [loading, setLoading] = useState(false)

   const [name, setName] = useState('');
   const [email, setEmail] = useState('');
   const [text, setText] = useState('');

   const [error, setError] = useState(null)

   const validateEmail = (value) => {
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (reg.test(value) === false) {
        setError({value: "Неправильный e-mail", color: 'red'});
        setEmail(value);
        return false;
      }
      else {
         setLoading(true);
         setEmail(value);
         setError({text: "Правильный e-mail", color: 'green'});
         createTask(name, email, text)
         setLoading(false);
         navigation.navigate('Main', { message: 'Ваша задача успешно добавлена!' });
      }
   }
   const create = () => {
      if ( name === '' ) {
         Alert.alert('Ошибка!', 'Введите имя!')
      }
      else if ( email === '' ) {
         Alert.alert('Ошибка!', 'Введите email!')
      }
      else if ( text === '' ) {
         Alert.alert('Ошибка!', 'Введите задачу!')
      }
      else{
         validateEmail(email);
      }
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
         </View>
         <View style={styles.inputWrap}>
            <TextInput
               style={styles.input}
               onChangeText={error !== null ? validateEmail : setEmail}
               value={email}
               placeholder='Ваш e-mail'
               autoCapitalize='none'
            />
            {error !== null && <AppText style={{color: error.color}}>{error.text}</AppText>}
         </View>
         <View style={styles.inputWrap}>
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
         <AppButton
            onPress={() => create()}
            style={{backgroundColor: 'skyblue'}}
            textStyle={{
               textAlign: 'center',
               textTransform: 'uppercase'
            }}
         >
            {loading === true ? 'Подождите...' : 'Создать'}
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
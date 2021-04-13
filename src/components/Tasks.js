import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, View} from 'react-native';
import { Pager } from './Pager';
import { TaskItem } from './TaskItem';
import { Loader } from './Loader';
import { ListHeader } from './ListHeader';
import { useDispatch, useSelector } from 'react-redux';
import { loadPages, loadTasks } from '../redux/actions';
import { AppText } from './ui/AppText';
import { AppButton } from './ui/AppButton';

export const Tasks = ({navigation, route}) => {
   const [loading, setLoading] = useState(true)
   const [message, setMessage] = useState(null)

   const dispatch = useDispatch()

   const tasks = useSelector(state => state.task.data)
   const currentPage = useSelector(state => state.page)
   const sortField = useSelector(state => state.sort.sortField)
   const sortDirection = useSelector(state => state.sort.sortDirection)

   const getAllTask = async () => {
      setLoading(true);
      let response = await fetch(`https://uxcandy.com/~shapoval/test-task-backend/v2/?developer=Nurbakyt1&page=${currentPage}&sort_field=${sortField}&sort_direction=${sortDirection}`);
      let result = await response.json();
      setLoading(false);

      // if (pages.length === 0) {
      let pages = []
      let counter = 0;
      for (let i = 0; i < result.message.total_task_count; i+=3) {
         counter ++;
         pages.push(counter)
      }
      // }
      dispatch(loadPages(pages))
      dispatch(loadTasks(result.message.tasks))
   }

   useEffect(() => {
      getAllTask();
      console.log('render')
   }, [currentPage, sortField, sortDirection])

   useEffect(() => {
      if(route.params !== (null || undefined)){
         setMessage(route.params.message);
         console.log('success');
      }
   }, [route.params])

   return (
      loading !== true ? (
         <View>
            {message !== null && (
               <View style={{...styles.message, ...{
                  backgroundColor: message === 'Токен истёк' && '#faa'
               }}}>
                  <AppText>{message}</AppText>
                  <AppButton onPress={() => setMessage(null)} style={styles.close}>X</AppButton>
               </View>
            )}
            <FlatList
               contentContainerStyle={{...styles.container, ...{
                  paddingBottom: message !== null ? 75 : 15
               }}}
               showsVerticalScrollIndicator={false}
               ListHeaderComponent = {
                  <ListHeader navigation={navigation} />
               }
               keyExtractor={item => 'key' + item.id}
               data={tasks !== [] && tasks}
               renderItem={({item}) => 
                  <TaskItem
                     item={item}
                     navigation={navigation}
                  />
               }
               ListFooterComponent={
                  <Pager />
               }
            />
         </View>
      ) : <Loader/>
   );
};

const styles = StyleSheet.create({
   container: {
      alignItems: 'flex-start',
      padding: 15
   },
   message: {
      padding: 20,
      width: '100%',
      backgroundColor: '#afa',
      position: 'relative'
   },
   close: {
      position: 'absolute',
      top: 5,
      right: 15,
   }
});
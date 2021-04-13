import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { next, page, prev } from '../redux/actions';
import { AppButton } from './ui/AppButton';

export const Pager = () => {
   const dispatch = useDispatch();
   const pages = useSelector(state => state.task.pages)
   const currentPage = useSelector(state => state.page)
   // console.log(currentPage)

   return (
      <View style={styles.container}>
         <AppButton
            style={styles.pager}
            disabled={currentPage === 1 && true }
            onPress={() => dispatch(prev())}
         >Пред.</AppButton>

         { pages !== [] && pages.map((item, index) => 
            <AppButton
               key={'page-' + index + 1}
               style={{...styles.pager, ...{
                  backgroundColor: index === currentPage - 1 ? 'skyblue' : '#ccc'
               }}}
               onPress={() => dispatch(page((index + 1)))}
            >
               {item}
            </AppButton>
         )}

         <AppButton
            style={styles.pager}
            disabled={currentPage === pages.length && true }
            onPress={() => dispatch(next())}
         >След.</AppButton>
      </View>
   );
};
const styles = StyleSheet.create({
   container: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 10
   },
   pager: {
      backgroundColor: '#ccc',
      marginHorizontal: 3
   }
});
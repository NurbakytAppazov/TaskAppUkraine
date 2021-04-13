import React from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import { AppText } from './AppText'

export const AppButton = (props) => (
   <TouchableOpacity
      disabled={props.disabled}
      onPress={props.onPress}
      style={{...styles.default, ...props.style, ...{opacity: props.disabled === true ? 0.5 : 1 }}}
      activeOpacity={0.8}
   >
      <AppText style={props.textStyle}>{props.children}</AppText>
   </TouchableOpacity>
)
const styles = StyleSheet.create({
   default:{
      padding: 10,
      backgroundColor: 'gold',
      borderRadius: 4
   }
})
import React from 'react';
import { StyleSheet } from 'react-native';
import MaskedView from '@react-native-community/masked-view';

const maskedView = (props) => {

    return (
        <MaskedView
            style={styles.container}
            maskElement={props.element}
            >
            {props.children}
        </MaskedView>
    )
}

export default maskedView

const styles = StyleSheet.create({
 container: {
  flex: 1, 
  flexDirection: 'row', 
  height: '100%',
 }
});
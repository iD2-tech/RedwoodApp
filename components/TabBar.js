import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Dimensions, Animated } from 'react-native';
import { opacity } from 'react-native-redash';
import { useTabBar } from '../components/TabBarProvider'
import Tab from './Tab';

const { width, height } = Dimensions.get('screen');

const TabBar = ({ state, navigation }) => {
  const [selected, setSelected] = useState('Friends');
  const { routes } = state;
  const renderColor = currentTab => (currentTab === selected ? '#C3A699' : '#785444');

  const handlePress = (activeTab, index) => {
    // console.log(routes)
    if (state.index !== index) {
      setSelected(activeTab);
      navigation.navigate(activeTab);
    }
  };

  return (
    <View style={styles.wrapper}>
      <View
        style={styles.container}
      >
        {routes.map((route, index) => (
          <Tab
            tab={route}

            onPress={() => handlePress(route.name, index)}
            color={renderColor(route.name)}
            key={route.key}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: height * 0.03,
    width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: '#fff',
    width: 250,
    borderRadius: 100,
    elevation: 2,
    borderColor: '#785444',
    borderWidth: 6,
    backgroundColor: '#785444',
    
  },
});

export default TabBar;
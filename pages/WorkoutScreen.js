import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../css/styles';

export default function WorkoutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.robotoSlabText}>Scegli allenamento</Text>
    </View>
  );
}

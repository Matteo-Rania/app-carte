import React from 'react';
import { View, Text, Button } from 'react-native';
import { styles } from '../css/styles';

type ScreenProps = {
  navigate: (screenName: string) => void;
};


export default function HomeScreen({ navigate }: ScreenProps): JSX.Element {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={styles.platypiText}>Home Screen</Text>
      <Text style={styles.robotoSlabText}>Home Screen</Text>
      <Text >Home Screen</Text>
      <Button title="Go to Other Screen" onPress={() => navigate('Other')} />
    </View>
  );
}

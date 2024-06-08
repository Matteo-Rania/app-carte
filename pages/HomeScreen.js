import React from 'react';
import { View, Button, Text, StatusBar } from 'react-native'; // Assicurati di importare StatusBar se non è già stato importato
import { styles } from '../css/styles';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Questo è un testo con il font Platypi</Text> {/* Incapsula il testo all'interno di un componente <Text> */}
      <StatusBar style="auto" />
    </View>
  );
}

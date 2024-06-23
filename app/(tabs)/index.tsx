// app/(tabs)/index.tsx
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeTab() {
  const router = useRouter();

  const handleStartPress = () => {
    router.push('/pages/WorkoutScreen');
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.cardText}>Start</Text>
        <Button title="Start" onPress={handleStartPress} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  card: {
    width: 200,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  cardText: {
    fontSize: 20,
    marginBottom: 10,
  },
});

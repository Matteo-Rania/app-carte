import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import globalStyles from '../../assets/styles/globalStyles';

export default function HomeTab() {
  const router = useRouter();

  const handleStartPress = () => {
    router.push('/pages/WorkoutScreen');
  };

  return (
    <View style={globalStyles.container}>
      <View style={globalStyles.card}>
        {/* Angolo in alto a sinistra */}
        <View style={styles.cardCornerTopLeft}>
          <Text style={styles.cardCornerText}>
            K
          </Text>
          <Text style={styles.cardCornerSymbol}>♠</Text>

        </View>

        {/* Angolo in basso a destra */}
        <View style={styles.cardCornerBottomRight}>
          <Text style={styles.cardCornerText}>
            K
          </Text>
          <Text style={styles.cardCornerSymbol}>♠</Text>
        </View>
  
        <TouchableOpacity style={globalStyles.buttonContainer} onPress={handleStartPress}>
          <Text style={globalStyles.buttonText}>Start</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardCornerTopLeft: {
    position: 'absolute',
    top: 10,
    left: 10,
    flexDirection: 'column',
    alignItems: 'center',
  },
  cardCornerSymbol: {
    fontSize: 16,
  },
  cardCornerBottomRight: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    flexDirection: 'column',
    alignItems: 'center',
    transform: [{ rotate: '180deg' }],
  },
  cardCornerText: {
    fontSize: 20,
    fontWeight: 'bold',
  }
});

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import globalStyles from '../../assets/styles/globalStyles';
import { useRouter } from 'expo-router';

type SuitType = '♠' | '♥' | '♦' | '♣';

interface CardState {
  flipped: boolean;
  rotation: Animated.Value;
}

export default function NewPage() {
  const router = useRouter();
  
  const suits: SuitType[] = ['♠', '♥', '♦', '♣'];
  const [selectedValues, setSelectedValues] = useState<Record<SuitType, string>>({
    '♠': '',
    '♥': '',
    '♦': '',
    '♣': '',
  });

  const [cardStates, setCardStates] = useState<Record<SuitType, CardState>>({
    '♠': { flipped: false, rotation: new Animated.Value(0) },
    '♥': { flipped: false, rotation: new Animated.Value(0) },
    '♦': { flipped: false, rotation: new Animated.Value(0) },
    '♣': { flipped: false, rotation: new Animated.Value(0) },
  });

  const options = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
  ];

  const handleValueChange = (suit: SuitType, itemValue: string) => {
    setSelectedValues(prevState => ({
      ...prevState,
      [suit]: itemValue,
    }));
  };

  const handleCardFlip = (suit: SuitType) => {
    const cardState = cardStates[suit];
    const toValue = cardState.flipped ? 0 : 180;

    Animated.timing(cardState.rotation, {
      toValue,
      duration: 800,
      useNativeDriver: true,
    }).start();

    setCardStates(prevState => ({
      ...prevState,
      [suit]: {
        ...prevState[suit],
        flipped: !prevState[suit].flipped,
      },
    }));
  };

  const handleStartPress = () => {
    router.push('/pages/WorkoutScreen'); 
  };

  const allOptionsSelected = Object.values(selectedValues).every(value => value !== '');

  const cards = suits.map((suit, index) => {
    const cardState = cardStates[suit];
    const rotateYFront = cardState.rotation.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg'],
    });
    const rotateYBack = cardState.rotation.interpolate({
      inputRange: [0, 180],
      outputRange: ['180deg', '360deg'],
    });

    const isFrontVisible = !cardState.flipped;

    return (
      <View key={index} style={styles.cardContainer}>
        {/* Fronte carta */}
        <Animated.View
          style={[
            styles.card,
            { 
              transform: [{ rotateY: rotateYFront }], 
              zIndex: isFrontVisible ? 1 : 0, 
              opacity: isFrontVisible ? 1 : 0 
            },
          ]}
        >
          <View style={styles.cardFront}>
            <View style={styles.cardCornerTopLeft}>
              <Text style={styles.cardCornerSymbol}>{suit}</Text>
            </View>
            <View style={styles.cardCornerBottomRight}>
              <Text style={styles.cardCornerSymbol}>{suit}</Text>
            </View>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={selectedValues[suit]}
                style={styles.picker}
                onValueChange={(itemValue) => handleValueChange(suit, itemValue)}
              >
                <Picker.Item label="Select an option..." value="" />
                {options.map(option => (
                  <Picker.Item key={option.value} label={option.label} value={option.value} />
                ))}
              </Picker>
            </View>
          </View>
        </Animated.View>

        {/* Retro carta */}
        <Animated.View
          style={[
            styles.card,
            styles.cardBack,
            { 
              transform: [{ rotateY: rotateYBack }], 
              zIndex: isFrontVisible ? 0 : 1, 
              opacity: isFrontVisible ? 0 : 1 
            },
          ]}
        >
          <Text>Retro carta {suit}</Text>
        </Animated.View>

        <TouchableOpacity style={styles.questionMark} onPress={() => handleCardFlip(suit)}>
          <MaterialCommunityIcons name="help-circle-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
    );
  });

  return (
    <View style={[globalStyles.container, styles.container]}>
      <View style={styles.row}>{cards.slice(0, 2)}</View>
      <View style={styles.row}>{cards.slice(2, 4)}</View>

      {allOptionsSelected && (
        <TouchableOpacity style={globalStyles.buttonContainer} onPress={handleStartPress}>
          <Text style={globalStyles.buttonText}>Start</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  cardContainer: {
    position: 'relative',
    margin: 10,
  },
  card: {
    width: 140,
    height: 240,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backfaceVisibility: 'hidden',
  },
  cardFront: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardBack: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backfaceVisibility: 'hidden',
  },
  pickerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  picker: {
    width: 120,
    height: 50,
  },
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
  questionMark: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
});

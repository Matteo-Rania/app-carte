import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { MaterialCommunityIcons } from '@expo/vector-icons'; // Importa l'icona desiderata
import globalStyles from '../../assets/styles/globalStyles';
import levelPageStyles from '../../assets/styles/LevelPage';

type SuitType = '♠' | '♥' | '♦' | '♣';

interface CardState {
  flipped: boolean;
}

export default function NewPage() {
  const suits: SuitType[] = ['♠', '♥', '♦', '♣'];
  const [selectedValues, setSelectedValues] = useState<Record<SuitType, string>>({
    '♠': 'option1',
    '♥': 'option1',
    '♦': 'option1',
    '♣': 'option1',
  });
  const [cardStates, setCardStates] = useState<Record<SuitType, CardState>>({
    '♠': { flipped: false },
    '♥': { flipped: false },
    '♦': { flipped: false },
    '♣': { flipped: false },
  });

  const options = [
    { label: 'select dsadasdas', value: 'option1' },
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
    setCardStates(prevState => ({
      ...prevState,
      [suit]: { flipped: !prevState[suit].flipped },
    }));
  };

  const renderCardBack = (suit: SuitType) => {
    return (
      <View style={styles.cardBack}>
        <Text>Retro carta {suit}</Text>
      </View>
    );
  };

  const cards = suits.map((suit, index) => {
    const isFlipped = cardStates[suit].flipped;
    return (
      <View key={index} style={styles.card}>
        {/* Angolo in alto a sinistra */}
        <View style={styles.cardCornerTopLeft}>
          <Text style={styles.cardCornerSymbol}>{suit}</Text>
        </View>
        {/* Angolo in basso a destra */}
        <View style={styles.cardCornerBottomRight}>
          <Text style={styles.cardCornerSymbol}>{suit}</Text>
        </View>
        {/* Punto interrogativo cerchiato in alto a destra */}
        <TouchableOpacity style={styles.questionMark} onPress={() => handleCardFlip(suit)}>
          <MaterialCommunityIcons name="help-circle-outline" size={24} color="black" />
        </TouchableOpacity>
        {/* Select Picker */}
        {isFlipped ? renderCardBack(suit) : (
          <Picker
            selectedValue={selectedValues[suit]}
            style={levelPageStyles.picker}
            onValueChange={(itemValue) => handleValueChange(suit, itemValue)}
          >
            {options.map((option) => (
              <Picker.Item key={option.value} label={option.label} value={option.value} />
            ))}
          </Picker>
        )}
      </View>
    );
  });

  return (
    <View style={[globalStyles.container, styles.container]}>
      <View style={styles.row}>{cards.slice(0, 2)}</View>
      <View style={styles.row}>{cards.slice(2, 4)}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
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
    position: 'relative', 
    margin: 10,
  },
  cardBack: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#ccc',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    transform: [{ rotateY: '180deg' }], 
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
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
});

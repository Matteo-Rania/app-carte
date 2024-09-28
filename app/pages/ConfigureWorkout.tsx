import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import globalStyles from '../../assets/styles/globalStyles';
import configureWorkoutStyle from '../../assets/styles/ConfigureWorkout';
import { useRouter } from 'expo-router';
import CardFlip from 'react-native-card-flip';

type SuitType = '♠' | '♥' | '♦' | '♣';

export default function NewPage() {
  const router = useRouter();

  const suits: SuitType[] = ['♠', '♥', '♦', '♣'];
  const [selectedValues, setSelectedValues] = useState<Record<SuitType, string>>({
    '♠': '',
    '♥': '',
    '♦': '',
    '♣': '',
  });

  const options = [
    { label: 'Option 1', value: 'option1', url: 'https://www.youtube.com/watch?v=N4fzbBv4BFI' },
    { label: 'Option 2', value: 'option2', url: 'https://www.youtube.com/watch?v=N4fzbBv4BFI' },
    { label: 'Option 3', value: 'option3', url: 'https://www.youtube.com/watch?v=57Cl_ANP1LY' },
  ];

  // Stato per tenere traccia se la carta è girata o no
  const [flippedStates, setFlippedStates] = useState<Record<SuitType, boolean>>({
    '♠': false,
    '♥': false,
    '♦': false,
    '♣': false,
  });

  const handleValueChange = (suit: SuitType, itemValue: string) => {
    setSelectedValues(prevState => ({
      ...prevState,
      [suit]: itemValue,
    }));

    // Se l'utente seleziona l'opzione vuota, controlla se la carta è girata
    if (itemValue === '') {
      // Se la carta è girata, la rigiriamo al fronte
      if (flippedStates[suit]) {
        cardRefs.current[suit]?.flip();
        setFlippedStates(prevState => ({
          ...prevState,
          [suit]: false,
        }));
      }
    }
  };

  const handleStartPress = () => {
    router.push('/pages/WorkoutScreen');
  };

  const allOptionsSelected = Object.values(selectedValues).every(value => value !== '');

  // Creiamo un riferimento per ogni carta
  const cardRefs = useRef<Record<SuitType, CardFlip>>({
    '♠': null,
    '♥': null,
    '♦': null,
    '♣': null,
  });

  const handleCardFlip = (suit: SuitType) => {
    cardRefs.current[suit]?.flip();
    setFlippedStates(prevState => ({
      ...prevState,
      [suit]: !prevState[suit],
    }));
  };

  const cards = suits.map((suit, index) => {
    const selectedOption = options.find(option => option.value === selectedValues[suit]);
    const displayBackText = selectedOption ? selectedOption.url : '';

    return (
      <View key={index} style={configureWorkoutStyle.cardContainer}>
        <CardFlip
          style={configureWorkoutStyle.cardFlip}
          ref={(card) => (cardRefs.current[suit] = card)}
        >
          {/* Fronte carta */}
          <View style={[configureWorkoutStyle.card, configureWorkoutStyle.cardFront]}>
            <View style={configureWorkoutStyle.cardCornerTopLeft}>
              <Text style={configureWorkoutStyle.cardCornerSymbol}>{suit}</Text>
            </View>
            <View style={configureWorkoutStyle.cardCornerBottomRight}>
              <Text style={configureWorkoutStyle.cardCornerSymbol}>{suit}</Text>
            </View>
            <View style={configureWorkoutStyle.pickerContainer}>
              <Picker
                selectedValue={selectedValues[suit]}
                style={configureWorkoutStyle.picker}
                onValueChange={(itemValue) => handleValueChange(suit, itemValue)}
              >
                <Picker.Item label="Select an option..." value="" />
                {options.map(option => (
                  <Picker.Item key={option.value} label={option.label} value={option.value} />
                ))}
              </Picker>
            </View>
            {selectedValues[suit] !== '' && (
              <TouchableOpacity
                style={configureWorkoutStyle.iconButton}
                onPress={() => handleCardFlip(suit)}
              >
                <MaterialCommunityIcons name="help-circle-outline" size={24} color="black" />
              </TouchableOpacity>
            )}
          </View>

          {/* Retro carta */}
          <View style={[configureWorkoutStyle.card, configureWorkoutStyle.cardBack]}>
            <Text>{displayBackText}</Text>
            <TouchableOpacity
              style={configureWorkoutStyle.iconButton}
              onPress={() => handleCardFlip(suit)}
            >
              <MaterialCommunityIcons name="close-circle-outline" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </CardFlip>
      </View>
    );
  });

  return (
    <View style={[globalStyles.container, configureWorkoutStyle.container]}>
      <View style={configureWorkoutStyle.row}>{cards.slice(0, 2)}</View>
      <View style={configureWorkoutStyle.row}>{cards.slice(2, 4)}</View>

      {allOptionsSelected && (
        <TouchableOpacity style={globalStyles.buttonContainer} onPress={handleStartPress}>
          <Text style={globalStyles.buttonText}>Start</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

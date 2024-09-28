import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import globalStyles from '../../assets/styles/globalStyles';
import configureWorkoutStyle from '../../assets/styles/ConfigureWorkout';
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
    { label: 'Option 1', value: 'option1', url: 'https://www.youtube.com/watch?v=N4fzbBv4BFI' },
    { label: 'Option 2', value: 'option2', url: 'https://www.youtube.com/watch?v=N4fzbBv4BFI' },
    { label: 'Option 3', value: 'option3', url: 'https://www.youtube.com/watch?v=57Cl_ANP1LY' },
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

    const selectedOption = options.find(option => option.value === selectedValues[suit]);
    const displayBackText = selectedOption ? selectedOption.url : `Retro carta ${suit}`;

    return (
      <View key={index} style={configureWorkoutStyle.cardContainer}>
        {/* Fronte carta */}
        <Animated.View
          style={[
            configureWorkoutStyle.card,
            { 
              transform: [{ rotateY: rotateYFront }], 
              zIndex: isFrontVisible ? 1 : 0, 
              opacity: isFrontVisible ? 1 : 0 
            },
          ]}
        >
          <View style={configureWorkoutStyle.cardFront}>
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
          </View>
        </Animated.View>

        {/* Retro carta */}
        <Animated.View
          style={[
            configureWorkoutStyle.card,
            configureWorkoutStyle.cardBack,
            { 
              transform: [{ rotateY: rotateYBack }], 
              zIndex: isFrontVisible ? 0 : 1, 
              opacity: isFrontVisible ? 0 : 1 
            },
          ]}
        >
          <Text>{displayBackText}</Text>
        </Animated.View>

        <TouchableOpacity style={configureWorkoutStyle.questionMark} onPress={() => handleCardFlip(suit)}>
          <MaterialCommunityIcons name="help-circle-outline" size={24} color="black" />
        </TouchableOpacity>
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


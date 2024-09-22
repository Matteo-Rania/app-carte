import React, { useState } from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import globalStyles from '../../assets/styles/globalStyles';
import levelPageStyles from '../../assets/styles/LevelPage';
import { useRouter } from 'expo-router';


export default function SelectWorkoutType() {
  const [selectedOption1, setSelectedOption1] = useState(null);
  const [selectedOption2, setSelectedOption2] = useState(null);

  const options1 = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
  ];

  const options2 = [
    { label: 'Option A', value: 'optionA' },
    { label: 'Option B', value: 'optionB' },
    { label: 'Option C', value: 'optionC' },
  ];
  const router = useRouter();


  const handleStartPress = () => {
    router.push('/pages/ConfigureWorkout');
  };

  return (
    <View style={[globalStyles.container, levelPageStyles.container]}>
      <Text style={levelPageStyles.label}>Select Option 1:</Text>
      <View style={levelPageStyles.pickerContainer}>
        <Picker
          selectedValue={selectedOption1}
          style={levelPageStyles.picker}
          onValueChange={(itemValue) => setSelectedOption1(itemValue)}
        >
          <Picker.Item label="Select an option..." value={null} />
          {options1.map((option) => (
            <Picker.Item key={option.value} label={option.label} value={option.value} />
          ))}
        </Picker>
      </View>

      <Text style={levelPageStyles.label}>Select Option 2:</Text>
      <View style={levelPageStyles.pickerContainer}>
        <Picker
          selectedValue={selectedOption2}
          style={levelPageStyles.picker}
          onValueChange={(itemValue) => setSelectedOption2(itemValue)}
        >
          <Picker.Item label="Select an option..." value={null} />
          {options2.map((option) => (
            <Picker.Item key={option.value} label={option.label} value={option.value} />
          ))}
        </Picker>
      </View>

      {selectedOption1 && selectedOption2 && (
       <TouchableOpacity style={globalStyles.buttonContainer} onPress={handleStartPress}>
       <Text style={globalStyles.buttonText}>Start</Text>
     </TouchableOpacity>
      )}
    </View>
  );
}

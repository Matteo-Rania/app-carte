import React, { useState } from 'react';
import { View, Button, Text } from 'react-native';
import HomeScreen from './pages/HomeScreen';

type ScreenProps = {
  navigate: (screenName: string) => void;
};



function OtherScreen({ navigate }: ScreenProps): JSX.Element {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Other Screen</Text>
      <Button title="Go back" onPress={() => navigate('Home')} />
    </View>
  );
}

export default function App(): JSX.Element {
  const [currentScreen, setCurrentScreen] = useState<string>('Home');

  const navigate = (screenName: string): void => {
    setCurrentScreen(screenName);
  };

  let screenComponent;
  if (currentScreen === 'Home') {
    screenComponent = <HomeScreen navigate={navigate} />;
  } else if (currentScreen === 'Other') {
    screenComponent = <OtherScreen navigate={navigate} />;
  }

  return <View style={{ flex: 1 }}>{screenComponent}</View>;
}

import { StyleSheet } from 'react-native';


export default function useCustomFonts() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    RobotoSlab_400Regular,
  });

  return fontsLoaded;
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  platypiText: {
    fontFamily: 'Platypi-Regular',
    fontSize: 60,
  },
  robotoSlabText: {
    fontFamily: 'RobotoSlab-Regular',
  },
});

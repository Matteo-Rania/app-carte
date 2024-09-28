import { StyleSheet } from 'react-native';

const configureWorkoutStyle = StyleSheet.create({
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

export default configureWorkoutStyle;

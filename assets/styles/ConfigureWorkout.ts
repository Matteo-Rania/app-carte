import { StyleSheet } from 'react-native';

const configureWorkoutStyle = StyleSheet.create({
  container: {
    padding: 20,
  },
  cardContainer: {
    margin: 10,
    alignItems: 'center',
  },
  cardFlip: {
    width: 160, // Aumentato da 140 a 160 per dare più spazio al Picker
    height: 240,
  },
  card: {
    width: 160, // Aumentato da 140 a 160
    height: 240,
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  cardFront: {
    backgroundColor: '#fff',
  },
  cardBack: {
    backgroundColor: '#ccc',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%', // Assicura che il contenitore prenda tutta la larghezza disponibile
    paddingHorizontal: 10, // Aggiunge un po' di padding orizzontale
  },
  picker: {
    width: '100%', // Il Picker prende tutta la larghezza del contenitore
    height: 50,
  },
  cardCornerTopLeft: {
    position: 'absolute',
    top: 10,
    left: 10,
    flexDirection: 'column',
    alignItems: 'center',
  },
  cardCornerBottomRight: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    flexDirection: 'column',
    alignItems: 'center',
    transform: [{ rotate: '180deg' }],
  },
  cardCornerSymbol: {
    fontSize: 16,
  },
  iconButton: {
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

export default configureWorkoutStyle;

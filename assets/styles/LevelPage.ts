import { StyleSheet } from 'react-native';

const levelPageStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  label: {
    marginTop: 20,
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
  },
  pickerContainer: {
    height: 60,
    width: '100%',
    borderColor: '#007aff',
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
    marginTop: 10,
    backgroundColor: '#fff',
    elevation: 3,
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  picker: {
    height: '100%',
    width: '100%',
  },
  text: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginVertical: 20,
  },
  buttonContainer: {
    marginTop: 20,
    width: '100%',
    paddingHorizontal: 16,
  }
});

export default levelPageStyles;

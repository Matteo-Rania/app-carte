import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import globalStyles from '../../assets/styles/globalStyles';

type SuitType = '♠' | '♥' | '♦' | '♣';
type Card = {
  suit: SuitType;
  value: number;
};

const suits: SuitType[] = ['♠', '♥', '♦', '♣'];

const generateDeck = (): Card[] => {
  const deck: Card[] = [];
  suits.forEach(suit => {
    for (let value = 1; value <= 10; value++) {
      deck.push({ suit, value });
    }
  });
  return deck;
};

export default function WorkoutScreen() {
  const [deck, setDeck] = useState<Card[]>(generateDeck());
  const [currentCard, setCurrentCard] = useState<Card | null>(null);
  const [cardOpacity] = useState(new Animated.Value(1));

  useEffect(() => {
    drawRandomCard(); // Pesca la prima carta casuale all'inizio
  }, []);

  const drawRandomCard = () => {
    if (deck.length > 0) {
      const randomIndex = Math.floor(Math.random() * deck.length);
      const selectedCard = deck[randomIndex];

      setCurrentCard(selectedCard);
      setDeck(prevDeck => prevDeck.filter((_, index) => index !== randomIndex)); // Rimuovi la carta dal mazzo

      Animated.timing(cardOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      setCurrentCard(null); // Nessuna carta rimasta
    }
  };

  const handlePress = () => {
    Animated.timing(cardOpacity, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      drawRandomCard(); // Pesca una nuova carta
      cardOpacity.setValue(1); // Ripristina l'opacità
    });
  };

  return (
    <View style={[globalStyles.container, styles.container]}>
      <View style={styles.cardContainer}>
        {currentCard ? (
          <TouchableOpacity onPress={handlePress}>
            <Animated.View style={[styles.card, { opacity: cardOpacity }]}>
              <Text style={styles.cardText}>{currentCard.value}{currentCard.suit}</Text>
            </Animated.View>
          </TouchableOpacity>
        ) : (
          <Text style={styles.cardText}>Allenamento finito</Text>
        )}
      </View>
      <View style={styles.messageContainer}>
        <Text style={styles.messageText}>Mancano {deck.length} carte</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  cardContainer: {
    justifyContent: 'center',
    alignItems: 'center',
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
  },
  cardText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  messageContainer: {
    marginTop: 20,
  },
  messageText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

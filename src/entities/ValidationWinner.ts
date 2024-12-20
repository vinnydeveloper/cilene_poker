import Card from "./Card";
import Player from "./Player";

export default class ValidationWinner {
  handsOptions = {
    "10": this.royalFlush,
    "9": this.straightFlush,
    "8": this.fourOfAKind,
    "7": this.fullHouse,
    "6": this.flush,
    "5": this.straight,
    "4": this.threeOfAKind,
    "3": this.twoPair,
    "2": this.pair,
    "1": this.highCard,
  } as const;

  validatePlayerWinners(players: Player[], communityCards: Card[]) {
    const playersWithHands = players.map((player) => {
      const hand = player.hand;
      const handValue = this.validateHand(hand, communityCards);
      return { player, handValue };
    });

    const winningHandValue = Math.max(
      ...playersWithHands.map((player) => player.handValue)
    );

    const winners = playersWithHands.filter(
      (player) => player.handValue === winningHandValue
    );

    if (winners.length > 1) {
      const winnersWithKickers = winners.map(({ player, handValue }) => {
        const hand = player.hand;
        const kicker = this.kickers(hand);
        return { player, handValue, kicker };
      });

      const winningKicker = Math.max(
        ...winnersWithKickers.map((player) => player.kicker)
      );

      const winnersWithKicker = winnersWithKickers.filter(
        (player) => player.kicker === winningKicker
      );

      return winnersWithKicker;
    }

    return winners;
  }

  validateHand(hand: Card[], communityCards: Card[]) {
    const handResult = Object.keys(this.handsOptions).filter((key) => {
      if (
        this.handsOptions[key as keyof typeof this.handsOptions](
          hand,
          communityCards
        )
      ) {
        return key;
      }
      return false;
    });
    return Math.max(...handResult.map((hand) => parseInt(hand)));
  }

  royalFlush(hand: Card[], communityCards: Card[]) {
    const allCards: Card[] = [...hand, ...communityCards];
    const suits = allCards.reduce((acc, card) => {
      if (!acc[card.suit]) {
        acc[card.suit] = [];
      }
      acc[card.suit].push(card);
      return acc;
    }, {} as Record<string, Card[]>);

    const flush = Object.values(suits).find((suit) => suit.length >= 5);
    if (!flush) {
      return false;
    }

    const straight = this.straight(hand, communityCards);
    if (!straight) {
      return false;
    }

    const straightFlush = this.straightFlush(hand, communityCards);
    if (!straightFlush) {
      return false;
    }

    const highCard = this.highCard(hand, communityCards);
    return highCard.faceValue === "A";
  }

  highCard(hand: Card[], communityCards: Card[]) {
    const allCards: Card[] = [...hand, ...communityCards];
    return allCards.sort((a, b) => b.numericValue - a.numericValue)[0];
  }

  straightFlush(hand: Card[], communityCards: Card[]) {
    const allCards = [...hand, ...communityCards];
    const suits = allCards.reduce((acc, card) => {
      if (!acc[card.suit]) {
        acc[card.suit] = [];
      }
      acc[card.suit].push(card);
      return acc;
    }, {} as Record<string, Card[]>);

    const flush = Object.values(suits).find((suit) => suit.length >= 5);
    if (!flush) {
      return false;
    }

    return this.straight(hand, communityCards);
  }

  fourOfAKind(hand: Card[], communityCards: Card[]) {
    const allCards: Card[] = [...hand, ...communityCards];
    const pairs = allCards.reduce((acc, card) => {
      if (!acc[card.faceValue]) {
        acc[card.faceValue] = [];
      }
      acc[card.faceValue].push(card);
      return acc;
    }, {} as Record<string, Card[]>);

    const fourOfAKind = Object.values(pairs).find((pair) => pair.length === 4);
    return !!fourOfAKind;
  }

  fullHouse(hand: Card[], communityCards: Card[]) {
    const allCards: Card[] = [...hand, ...communityCards];
    const pairs = allCards.reduce((acc, card) => {
      if (!acc[card.faceValue]) {
        acc[card.faceValue] = [];
      }
      acc[card.faceValue].push(card);
      return acc;
    }, {} as Record<string, Card[]>);

    const threeOfAKind = Object.values(pairs).find((pair) => pair.length === 3);
    const pair = Object.values(pairs).find((pair) => pair.length === 2);
    return !!threeOfAKind && !!pair;
  }

  flush(hand: Card[], communityCards: Card[]) {
    const allCards = [...hand, ...communityCards];
    const suits = allCards.reduce((acc, card) => {
      if (!acc[card.suit]) {
        acc[card.suit] = [];
      }
      acc[card.suit].push(card);
      return acc;
    }, {} as Record<string, Card[]>);

    const flush = Object.values(suits).find((suit) => suit.length >= 5);
    return !!flush;
  }

  straight(hand: Card[], communityCards: Card[]) {
    const allCards: Card[] = [...hand, ...communityCards];
    const sortedCards = allCards.sort(
      (a, b) => b.numericValue - a.numericValue
    );

    //veirficar se existe uma sequencia de 5 numeros
    const result = sortedCards.reduce((acc, card, index) => {
      if (index === 0) {
        return acc;
      }
      const previousCard = sortedCards[index - 1];
      if (previousCard.numericValue - card.numericValue === 1) {
        acc.push(card);
      } else {
        acc = [card];
      }
      return acc;
    }, [] as Card[]);

    return result.length === 5;
  }

  threeOfAKind(hand: Card[], communityCards: Card[]) {
    const allCards: Card[] = [...hand, ...communityCards];
    const pairs = allCards.reduce((acc, card) => {
      if (!acc[card.faceValue]) {
        acc[card.faceValue] = [];
      }
      acc[card.faceValue].push(card);
      return acc;
    }, {} as Record<string, Card[]>);

    const threeOfAKind = Object.values(pairs).find((pair) => pair.length === 3);
    return !!threeOfAKind;
  }

  twoPair(hand: Card[], communityCards: Card[]) {
    const allCards: Card[] = [...hand, ...communityCards];
    const pairs = allCards.reduce((acc, card) => {
      if (!acc[card.faceValue]) {
        acc[card.faceValue] = [];
      }
      acc[card.faceValue].push(card);
      return acc;
    }, {} as Record<string, Card[]>);

    const twoPairs = Object.values(pairs).filter((pair) => pair.length === 2);
    return twoPairs.length >= 2;
  }

  pair(hand: Card[], communityCards: Card[]) {
    const allCards: Card[] = [...hand, ...communityCards];
    const pairs = allCards.reduce((acc, card) => {
      if (!acc[card.faceValue]) {
        acc[card.faceValue] = [];
      }
      acc[card.faceValue].push(card);
      return acc;
    }, {} as Record<string, Card[]>);

    const pair = Object.values(pairs).find((pair) => pair.length === 2);
    return !!pair;
  }

  kickers(hand: Card[]) {
    return Math.max(...hand.map((card) => card.numericValue));
  }
}

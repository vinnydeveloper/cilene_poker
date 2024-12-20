import SUITS from "../constants/suits";
import Card from "./Card";
import MersenneTwister from "mersenne-twister";

const FACE_VALUES = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
];

export default class Deck {
  cards: Card[];
  public set seed(value: number) {
    this.generator = new MersenneTwister(123);
  }
  discardPile: Card[] = [];
  private generator = new MersenneTwister();

  constructor() {
    this.cards = freshDeck();
  }

  get numberOfCards() {
    return this.cards.length;
  }

  //rather than use Array.sort(), which is predictable even when using Math.random(),
  //we will create our own random sorting algorithm
  // ALTERAR PARA OUTRO METODOS DE SUFLLE
  shuffle() {
    for (let i = this.numberOfCards - 1; i > 0; i--) {
      //starting at the top of the deck, look for any card less than the current index.
      const newIndex = Math.floor(this.generator.random() * (i + 1));
      //save what that card value was:
      const oldValue = this.cards[newIndex];
      //then swap the values:
      this.cards[newIndex] = this.cards[i];
      this.cards[i] = oldValue;
    }
  }

  dealCard(numberOfCards: number) {
    const result = this.cards.splice(0, numberOfCards);
    this.discardPile.push(...result);

    return result;
  }
}

function freshDeck() {
  return Object.values(SUITS).flatMap((suit) => {
    return FACE_VALUES.map((value) => {
      return new Card(suit, value);
    });
  });
}

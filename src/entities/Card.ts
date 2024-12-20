const NUMERIC_VALUE_MAP = {
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14,
};

export default class Card {
  faceUp: boolean = false;
  winningCard: boolean = false;

  constructor(
    public suit: string,
    public faceValue: string | number,
    public deckStyles = "DEFAULT"
  ) {}

  get imagePath() {
    return `/images/${this.deckStyles}/${this.faceValue}${this.suit}.svg`;
  }

  get cardBackImagePath() {
    return `/images/${this.deckStyles}/B.svg`;
  }

  get numericValue() {
    return NUMERIC_VALUE_MAP[this.faceValue as keyof typeof NUMERIC_VALUE_MAP];
  }
}

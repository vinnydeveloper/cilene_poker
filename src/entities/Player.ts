import Card from "./Card";

export default class Player {
  private _hand: Card[] = [];
  constructor(public name: string) {}

  set hand(value: Card[]) {
    this._hand = value;
  }

  get hand(): Card[] {
    return this._hand;
  }
}

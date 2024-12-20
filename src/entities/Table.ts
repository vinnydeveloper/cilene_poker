import Card from "./Card";
import Deck from "./Deck";
import Player from "./Player";
import ValidationWinner from "./ValidationWinner";

export default class Table {
  private _deck?: Deck;
  players: Player[] = [];
  communityCards: any[] = [];
  currentPlayerIndex = 0;
  validationWinner = new ValidationWinner();
  gameSteps = {
    preFlop: () => {
      console.log("preflop");
      this.deck = new Deck();
      this.deck.shuffle();

      this.players.forEach((player, index) => {
        player.hand = this.deck.dealCard(2).map((card: Card) => {
          card.faceUp = true;
          return card;
        });
        console.log("player-" + index + 1);
        document.getElementById(`player-${index + 1}`)!.innerHTML = `
          <img src="${player.hand[0].imagePath}" />
          <img src="${player.hand[1].imagePath}" />
        `;
      });

      this.communityCards = this.deck.dealCard(5);
      console.log(this.players);
      console.log(this.communityCards);
    },
    flop: () => {
      console.log("flop");
      for (let index = 0; index <= 2; index++) {
        const card = this.communityCards[index];
        card.faceUp = true;
      }
      console.log(this.players);
      console.log(this.communityCards);
    },
    turn: () => {
      console.log("turn");
      this.communityCards[3].faceUp = true;
      console.log(this.players);
      console.log(this.communityCards);
    },
    river: () => {
      console.log("RIVER");
      this.communityCards[4].faceUp = true;
      console.log(this.players);
      console.log(this.communityCards);
    },
    finish: () => {
      console.log("FINISH");
      const playersWinners = this.validationWinner.validatePlayerWinners(
        this.players,
        this.communityCards
      );
      console.log(playersWinners);
    },
    resetGame: () => {
      this.players.forEach((player) => {
        player.hand = [];
      });
      this.communityCards = [];
      this.currentPlayerIndex = 0;
    },
  };

  set deck(value: Deck) {
    this._deck = value;
  }

  get deck(): Deck {
    return this._deck || new Deck();
  }

  addPlayer(player: Player) {
    this.players.push(player);
  }

  removePlayer(player: Player) {
    const index = this.players.indexOf(player);
    if (index > -1) {
      this.players.splice(index, 1);
    }
  }

  get currentPlayer() {
    return this.players[this.currentPlayerIndex];
  }

  get nextPlayer() {
    return this.players[this.currentPlayerIndex + 1] || this.players[0];
  }

  get previousPlayer() {
    return (
      this.players[this.currentPlayerIndex - 1] ||
      this.players[this.players.length - 1]
    );
  }

  nextTurn() {
    this.currentPlayerIndex++;
    if (this.currentPlayerIndex >= this.players.length) {
      this.currentPlayerIndex = 0;
    }
  }
}

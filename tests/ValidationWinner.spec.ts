describe("ValidationWinner", () => {
  it("should validate royalFlush hand winner", () => {
    const validationWinner = new ValidationWinner();
    const hand: Card[] = [new Card("A", "H"), new Card("K", "H")];
    const communityCards: Card[] = [
      new Card("Q", "H"),
      new Card("J", "H"),
      new Card("T", "H"),
      new Card("9", "H"),
      new Card("8", "H"),
    ];
    const result = validationWinner.royalFlush(hand, communityCards);
    expect(result).toBe(true);
  });
});

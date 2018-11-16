const VendingMachine = require("../lib/vending-machine");

describe("VendingMachine", () => {
  beforeEach(() => {
    vendingMachine = new VendingMachine(100, 10, 10, 10, 10);
    vendingMachine1 = new VendingMachine(0, 10, 10, 10, 10);
    vendingMachine2 = new VendingMachine(100, 10, 10, 10, 10);
    vendingMachine3 = new VendingMachine(100, 0, 10, 10, 10);
  });
  describe("User buys a bag of chips with a five dollar bill", () => {
    it("should return chips 1.75 loonie * 1 quarter * 3", () => {
      expect(vendingMachine.dispenseItem("chips", 5.0)).toBe(
        "chips 1.75 loonie * 1 quarter * 3 "
      );
    });
    describe("Vending machine is out of change", () => {
      it("should return no change in machine", () => {
        expect(vendingMachine1.dispenseItem("chips", 5.0)).toBe(
          "chips 1.75 Not enough change in machine"
        );
      });
    });
    describe("Vending machine is out of chips", () => {
      it("should return no change in machine", () => {
        expect(vendingMachine3.dispenseItem("chips", 5.0)).toBe("None left");
      });
    });
    describe("User buys a soda with 100,000 dollars", () => {
      it("should return ", () => {
        expect(vendingMachine.dispenseItem("soda", 100000.0)).toBe(
          "soda 99997.8 Not enough change in machine"
        );
      });
    });
    describe("After Vending machine item refill", () => {
      it("should return 40", () => {
        expect(vendingMachine.refillMachineItems()).toBe(40);
      });
    });
    describe("After Vending machine change refill", () => {
      it("should return 100", () => {
        expect(vendingMachine.refilMachineChange()).toBe(100);
      });
    });
    describe("User gives 0  dollars", () => {
      it("should return Insufficient funds", () => {
        expect(vendingMachine.dispenseItem("soda", 0)).toBe(
          "Insufficient funds"
        );
      });
    });
    describe("User gives -100 dollars", () => {
      it("should return Insufficient funds", () => {
        expect(vendingMachine.dispenseItem("soda", -100)).toBe(
          "Insufficient funds"
        );
      });
    });
    describe("User doesn't choose a snack", () => {
      it("should return Insufficient funds", () => {
        expect(vendingMachine.dispenseItem(10)).toBe(
          "Please give money and choose and item"
        );
      });
    });
    describe("User doesn't provide any funds", () => {
      it("should return Insufficient funds", () => {
        expect(vendingMachine.dispenseItem("candyBar")).toBe(
          "Please give money and choose and item"
        );
      });
    });
  });
});

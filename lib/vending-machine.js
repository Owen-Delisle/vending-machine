class VendingMachine {
  constructor(
    availableChange,
    availableChips,
    availableCookies,
    availableSoda,
    availableCandyBars
  ) {
    this.availableChange = availableChange;

    this.chips = new Item("chips", 3.25, availableChips);
    this.soda = new Item("soda", 2.2, availableSoda);
    this.cookie = new Item("cookie", 1.5, availableCookies);
    this.candyBar = new Item("candyBar", 2.0, availableCandyBars);

    this.items = [this.chips, this.soda, this.cookie, this.candyBar];
  }

  dispenseItem(name, paymentAmount) {
    let itemName = "";
    let itemAmountAvailable = 0;
    let returnedChange = 0;
    let itemPrice = 0;

    this.items.forEach(item => {
      if (item.name === name) {
        returnedChange = paymentAmount - item.price;
        itemName = item.name;
        item.amountAvailable--;
        itemAmountAvailable = item.amountAvailable;
        itemPrice = item.price;
      }
    });
    if (itemAmountAvailable > 0 && itemPrice <= paymentAmount) {
      return (
        itemName +
        " " +
        returnedChange +
        " " +
        this.calculateChange(returnedChange)
      );
    } else if (name === undefined || paymentAmount === undefined) {
      return "Please give money and choose an item";
    } else if (itemAmountAvailable <= 0) {
      return "Vending machine is out of " + itemName;
    } else if (itemPrice > paymentAmount) {
      return "Insufficient funds";
    }
  }

  calculateChange(amount) {
    let a = amount;
    const denominations = [
      {
        name: "hundred dollar bill",
        value: 100
      },
      {
        name: "fifty dollar bill",
        value: 50
      },
      {
        name: "twenty dollar bill",
        value: 20
      },
      {
        name: "ten dollar bill",
        value: 10
      },
      {
        name: "five dollar bill",
        value: 5
      },
      {
        name: "toonie",
        value: 2
      },
      {
        name: "loonie",
        value: 1
      },
      {
        name: "quarter",
        value: 0.25
      },
      {
        name: "dime",
        value: 0.1
      },
      {
        name: "nickle",
        value: 0.05
      }
    ];
    let message = "";
    let counter = 0;

    denominations.forEach(n => {
      counter = 0;
      while (n.value <= a) {
        a -= n.value;
        counter++;
      }
      if (counter > 0) {
        message += n.name + " * " + counter + " ";
      }
    });

    if (amount < this.availableChange) return message;
    else return "Not enough change in machine";
  }

  refillMachineItems() {
    let totalItemAmount = 0;
    this.items.forEach(item => {
      if (item.amountAvailable < 10) {
        item.amountAvailable = 10;
      }
      totalItemAmount += item.amountAvailable;
    });
    return totalItemAmount;
  }

  refilMachineChange() {
    if (this.availableChange < 100) {
      this.availableChange = 100;
    }
    return this.availableChange;
  }

  printInventory() {
    let message = [];
    this.items.forEach(i => {
      message.push(`${i.name} : ${i.amountAvailable}`);
    });
    return message.join(", ");
  }
}

class Item {
  constructor(name, price, amountAvailable) {
    this.name = name;
    this.price = price;
    this.amountAvailable = amountAvailable;
  }
}

module.exports = VendingMachine;

class Bot {
  constructor(name) {
    this.name = name;
    this.actionCount = 0;
  }
  buyAction(actionQuantity) {
    if (actionQuantity > actionAvailable) {
      console.warn(`${this.name}: Not enough actions to buy`);
      return;
    }
    trNumber++;
    actionAvailable -= actionQuantity;
    this.actionCount += actionQuantity;
    actionPrice *= 1 + (actionQuantity * actionQuantity) / actionTotal / 1000;
  }
  sellAction(actionQuantity) {
    if (actionQuantity > actionCount) {
      console.warn(`${this.name}: Not enough actions to buy`);
      return;
    }
    trNumber++;
    actionAvailable += actionQuantity;
    this.actionCount -= actionQuantity;
    actionPrice *= 1 - (actionQuantity * actionQuantity) / actionTotal / 1000;
  }

  createEvent() {
    switch (Math.floor(Math.random() * 3) + 1) {
      case 1: {
        console.log(this.name + " is passing");
        break;
      }
      case 2: {
        console.log(this.name + " is buying");
        // randomNumber(1, actionAvailable)

        //if warned - should break;
        this.buyAction(50);
        Update("bought", this.name);
        break;
      }
      case 3: {
        console.log(this.name + " is selling");
        // randomNumber(1, this.actionCount)

        //if warned - should break;
        this.sellAction(50);
        Update("sold", this.name);
        break;
      }
    }
  }
}

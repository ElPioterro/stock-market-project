class Bot {
  constructor(name) {
    this.name = name;
    this.actionCount = 0;
  }

  buyAction(actionQuantity) {
    if (actionQuantity > actionAvailable) {
      console.warn(
        `${this.name}: Not enough actions to buy. Trying to buy ${actionQuantity}`
      );
      return false;
    }
    trNumber++;
    actionAvailable -= actionQuantity;
    this.actionCount += actionQuantity;
    actionPrice *= 1 + (actionQuantity * actionQuantity) / actionTotal / 1000;
    return true;
  }

  sellAction(actionQuantity) {
    if (actionQuantity > this.actionCount) {
      console.warn(
        `${this.name}: Not enough actions to sell. Trying to sell ${actionQuantity}`
      );
      return false;
    }
    trNumber++;
    actionAvailable += actionQuantity;
    this.actionCount -= actionQuantity;
    actionPrice *= 1 - (actionQuantity * actionQuantity) / actionTotal / 1000;
    return true;
  }

  createEvent() {
    switch (Math.floor(Math.random() * 3) + 1) {
      case 1: {
        console.log(this.name + " is passing");
        break;
      }
      case 2: {
        if (actionAvailable === 0) {
          break;
        }
        if (
          !this.buyAction(Math.floor(randomNumber(0, actionAvailable / 2)) + 1)
        ) {
          break;
        }

        console.log(this.name + " is buying");
        Update("bought", this.name);
        break;
      }
      case 3: {
        if (this.actionCount === 0) {
          break;
        }
        if (
          !this.sellAction(
            Math.floor(randomNumber(0, this.actionCount / 2)) + 1
          )
        ) {
          break;
        }

        console.log(this.name + " is selling");
        Update("sold", this.name);
        break;
      }
    }
  }
}

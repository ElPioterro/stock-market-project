class Bot {
  constructor(name) {
    this.name = name;
  }
  Update() {
    switch (randomNumber(1, 3)) {
      case 1:
        console.log(this.name + " is doing nothing");
        break;
      case 2:
        console.log(this.name + " is 2");
        Update("bought", this.name);
        break;
      case 3:
        console.log(this.name + " is 3");
        Update("sold", this.name);
        break;
    }
  }
}

class MyStaticClass {
  static previousVideoOptionMenuDiv = null;
  static savedVideoOptionMenuBtn = null;

  static setPreviousVideoOptionMenuDiv(value) {
    this.previousVideoOptionMenuDiv = value;
  }

  static setSavedVideoOptionMenuBtn(value) {
    this.savedVideoOptionMenuBtn = value;
  }

  static getPreviousVideoOptionMenuDiv() {
    return this.previousVideoOptionMenuDiv;
  }

  static getSavedVideoOptionMenuBtn() {
    return this.savedVideoOptionMenuBtn;
  }
}

export { MyStaticClass };

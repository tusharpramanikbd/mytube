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

class FetchedData {
  static filterDataList = null;
  static navigationMenuDataList = null;
  static subscriptionDataList = null;
  static videoDataList = null;
  static videoOptionMenuDataList = null;


  static setFilterDataList(value){
    this.filterDataList = value;
  }

  static getFilterDataList(){
    return this.filterDataList;
  }

  static setNavigationMenuDataList(value){
    this.navigationMenuDataList = value;
  }

  static getNavigationMenuDataList(){
    return this.navigationMenuDataList;
  }

  static setSubscriptionDataList(value){
    this.subscriptionDataList = value;
  }

  static getSubscriptionDataList(){
    return this.subscriptionDataList;
  }

  static setVideoDataList(value){
    this.videoDataList = value;
  }

  static getVideoDataList(){
    return this.videoDataList;
  }

  static setVideoOptionMenuDataList(value){
    this.videoOptionMenuDataList = value;
  }

  static getVideoOptionMenuDataList(){
    return this.videoOptionMenuDataList;
  }

}

export { MyStaticClass, FetchedData };

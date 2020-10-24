var uiController = (function(){

    var DOMstrings={
        inputType: ".add__type",
        inputDescription: ".add__description",
        inputValue: ".add__value",
        addBtn: ".add__btn"
    }
    return{
    getDomStrings: function () {
        return DOMstrings;
    },
    getInput: function () {
        return {
           type: document.querySelector(DOMstrings.inputType).value,
           description: document.querySelector(DOMstrings.inputDescription).value,
           value: document.querySelector(DOMstrings.inputValue).value
        }
    }
 }
})()
var financeController = (function(){
  var Income = function(id, description, value) {
      this.id = id;
      this.description= description;
      this.value = value;
  }
  var Expense = function(id, description, value) {
    this.id = id;
    this.description= description;
    this.value = value;
  }

var data = {
    allItems: {
        inc: [],
        exp: []
    },
    totals: {
        inc: 0,
        exp: 0
    }
}
  
})()
var appController = ( function (uiController, financeController){
 
 var ctrlAddItem = () => {
     // 1. оруулах өгөгдлүүдийг дэлгэцээс олж авна.
    console.log(uiController.getInput());
    // 2. Олж аесан өгөгдлүүдийг санхүүгийн контроллэрт дамжуулж тэнд хадгална.

    // 3. олж  авсан өгөгдлүүдээ вэб дээрээ тохирох хэсэгт гаргана.

    // 4. Төсвийг тооцоолно.

    // 5. эцсийн үлдэгдэл, тооцоог дэлгэцэнд гаргана.

 }
var setUpEventListener = function () {
    var DOM = uiController.getDomStrings();
    document.querySelector(DOM.addBtn).addEventListener('click', function(){
        ctrlAddItem();
     })
     document.addEventListener("keypress", function(event){
        if (event.keyCode === 13 || event.which === 13) {
            ctrlAddItem();
        }
     })
 }
 return {
     init: function () {
        console.log('Application started......');
        setUpEventListener()
     }
 }
})(uiController, financeController)
appController.init();
var uiController = (function(){

    var DOMstrings={
        inputType: ".add__type",
        inputDescription: ".add__description",
        inputValue: ".add__value",
        addBtn: ".add__btn",
        incomeList: '.income__list',
        expensesList: '.expenses__list'
            }
    return{


    getDomStrings: function () {
        return DOMstrings;
    },


    clearFields: function(){
       var fields = document.querySelectorAll(DOMstrings.inputDescription + ", " + DOMstrings.inputValue)
       //convert list to array
       var fieldsArr = Array.prototype.slice.call(fields);

    //    for ( var i = 0; i < fieldsArr.length; i++) {
    //        fieldsArr[i].value = '';
    //    }
    fieldsArr.forEach(function(el, index, array){
        el.value = ""
    })
    DOMstrings.inputType.value = "inc"
    fieldsArr[0].focus();
    },

    getInput: function () {
        return {
           type: document.querySelector(DOMstrings.inputType).value,
           description: document.querySelector(DOMstrings.inputDescription).value,
           value: parseInt(document.querySelector(DOMstrings.inputValue).value)
        }
    },
    addListItem: function (item, type) {

      //Орлого зарлагын элементийг агуулсан html ийг бэлтгэнэ.
           var html, list;
           if(type==='inc'){
               list = DOMstrings.incomeList
               html = '<div class="item clearfix" id="income-%id%"><div class="item__description">$description$</div><div class="right clearfix"><div class="item__value">$value$</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
           }else{
               list = DOMstrings.expensesList
            html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">$description$</div><div class="right clearfix">   <div class="item__value">$value$</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
           }
      //Тэр HTML дотроо орлого зарлагын утгуудыг REPLACE ашиглаж өөрчилнө.
       html = html.replace('%id%', item.id)
       html = html.replace('$description$', item.description)
       html = html.replace('$value$', item.value)
      // Бэлтгэсэн  HTML ээ DOM руу хийж өгнө.
      document.querySelector(list).insertAdjacentHTML('beforeend', html);
    }
 }
})()


//==============================================================finance Controller==========================================================================//


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
  var calculateTotal = function(type){
      var sum = 0
      data.items[type].forEach(function(el){
          sum= sum + el.value;
      })

      data.totals[type]= sum;
  }

var data = {
    items: {
        inc: [],
        exp: []
    },
    totals: {
        inc: 0,
        exp: 0
    },

    budget: 0,

    percent: 0
}
 var seeData = data
return {
    seeData,
    calculateBudget : function (){
        // нийт орлогын нийлбэрийг тооцоолно.
        calculateTotal('inc');

        // нийт зарлагын нийлбэрийг тооцоолно.
        calculateTotal('exp');

        //нийт төсөвийг шинээр тооцоолно.
        data.budget = data.totals.inc - data.totals.exp;

        //орлого зарлагын хувийг тооцоолно.
        data.percent = Math.round(data.totals.exp / data.totals.inc * 100)
      },
      takeInfoOfBudget : function(){
      return{
          budget : data.budget,
          huvi : data.huvi,
          totalInc: data.totals.inc,
          totalExp: data.totals.exp
      }
      },

    addItem: function(type, desc, val){
    var item, id=1;
    if(data.items[type].length === 0){
        id=1;
    } else{
       id = data.items[type][data.items[type].length-1].id + 1
    }
    if (type === 'inc') {
        item = new Income(id, desc, val)
    } else{
        item = new Expense(id, desc, val)
    }
      data.items[type].push(item);
      return item
    },
    
    
}
  
})()


//=======================================================App Controller============================================================================//


var appController = ( function (uiController, financeController){
 
 var ctrlAddItem = () => {
     // 1. оруулах өгөгдлүүдийг дэлгэцээс олж авна.
    var input = uiController.getInput();

    if(input.description !== '' && input.value !== ''){
      // 2. Олж аесан өгөгдлүүдийг санхүүгийн контроллэрт дамжуулж тэнд хадгална.
  var item = financeController.addItem(input.type, input.description, input.value);
  // 3. олж  авсан өгөгдлүүдээ вэб дээрээ тохирох хэсэгт гаргана.
  uiController.addListItem(item, input.type);
  uiController.clearFields()
  // 4. Төсвийг тооцоолно.
  financeController.calculateBudget()
  //5. эцсийн үлдэгдэл тооцоолох
  var budget = financeController.takeInfoOfBudget()
  // 6. эцсийн үлдэгдэл, тооцоог дэлгэцэнд гаргана.
  
    }
  

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
        setUpEventListener()
     }
 }
})(uiController, financeController)
appController.init();
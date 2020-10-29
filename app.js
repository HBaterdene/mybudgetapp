var uiController = (function(){

    var DOMstrings={
        inputType: ".add__type",
        inputDescription: ".add__description",
        inputValue: ".add__value",
        addBtn: ".add__btn",
        incomeList: '.income__list',
        expensesList: '.expenses__list',
        budgetValue: '.budget__value',
        incomeValue: '.budget__income--value',
        expenseValue:'.budget__expenses--value',
        expensePercentage:'.budget__expenses--percentage',
        containerDiv: '.container',
        expensePercentageLabel: '.item__percentage',
        dateLabel: ".budget__title--month"
            }
    var nodeListForEach = function(list, callback){
        for (var i = 0; i< list.length; i++){
            callback(list[i], i)
        }
    }
    var formatMoney = (too, type) =>{
        
        too = "" + too
        var x = too.split("").reverse().join("");
        
        y = "";
        var count = 1;
        
        for (var i = 0; i < x.length; i++){
          
           y = y + x[i];
        
           if (count%3 === 0) y = y + ',';
           count++
        }
        
        var z = y.split("").reverse().join("");
        
        if(z[0] === ',')z = z.substr(1, z.length-1);
        
        if(type ==='inc') {z= "+ " +z;}
        else if (type === "exp"){z= "- " + z;}
        else {z}

        return z
    }
    
    return{

    displayDate: function(){
     var today = new Date()
      document.querySelector(DOMstrings.dateLabel).textContent = today.getFullYear() + " оны " + (today.getMonth()+ 1) + " сарын "
    },

    getDomStrings: function () {
        return DOMstrings;
    },
    changeType: function(){
        var fields = document.querySelectorAll(DOMstrings.inputType + ", " + DOMstrings.inputDescription + ", " + DOMstrings.inputValue);

        nodeListForEach(fields, function(el){
           el.classList.toggle("red-focus")
        })
    },

    displayPercentages: function(allPercentages) {
        var elements = document.querySelectorAll(DOMstrings.expensePercentageLabel)
        nodeListForEach(elements, function(el, index){ 
            el.textContent = Math.round(allPercentages[index]) + (Math.round(allPercentages[index]) !== 0 ? "%" : '')
        })
    },
    

    clearFields: function(){
       var fields = document.querySelectorAll(DOMstrings.inputDescription + ", " + DOMstrings.inputValue)
       //convert list to array
       var fieldsArr = Array.prototype.slice.call(fields);

    //    for ( var i = 0; i < fieldsArr.length; i++) {
    //        fieldsArr[i].value = '';
    //    }
    fieldsArr.forEach(function(el){
        el.value = ""
    })
    DOMstrings.inputType.value = "inc"

    fieldsArr[0].focus();
    },

    //show Budget
   
    showBudget: function(budget) {
        var type;
        if(budget.budget>0) type = 'inc'
        else if (budget.budget < 0 ) type === 'exp'
        else type === "first"
      document.querySelector(DOMstrings.budgetValue).textContent = formatMoney(budget.budget, type);
      document.querySelector(DOMstrings.incomeValue).textContent = formatMoney(budget.totalInc, budget.totalInc !== 0 ? 'inc' : 'first');
      document.querySelector(DOMstrings.expenseValue).textContent = formatMoney(budget.totalExp, budget.totalExp !== 0 ? 'exp' : 'first');

      document.querySelector(DOMstrings.expensePercentage).textContent = budget.percentage + (budget.percentage !==0 ? '%' : '');
    
},

    getInput: function () {
        return {
           type: document.querySelector(DOMstrings.inputType).value,
           description: document.querySelector(DOMstrings.inputDescription).value,
           value: parseInt(document.querySelector(DOMstrings.inputValue).value)
        }
    },

    deleteListItem: function(id){
      var el = document.getElementById(id);
      el.parentNode.removeChild(el);
    },
    addListItem: function (item, type) {

      //Орлого зарлагын элементийг агуулсан html ийг бэлтгэнэ.
           var html, list;
           if(type==='inc'){
               list = DOMstrings.incomeList
               html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">$description$</div><div class="right clearfix"><div class="item__value">$value$</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
           }else{
               list = DOMstrings.expensesList
            html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">$description$</div><div class="right clearfix">   <div class="item__value">$value$</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
           }
      //Тэр HTML дотроо орлого зарлагын утгуудыг REPLACE ашиглаж өөрчилнө.
       html = html.replace('%id%', item.id)
       html = html.replace('$description$', item.description)
       html = html.replace('$value$', formatMoney(item.value, type))
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
    this.percentage= -1;
  }

  Expense.prototype.calcPercentage = function(totalIncome){
    if(totalIncome > 0)
   this.percentage = (this.value / totalIncome*100);
   else this.percentage = 0;
  };
  Expense.prototype.getPercentage = function(){
      return this.percentage;
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
        inc: [ ],
        exp: []
    },
    totals: {
        inc: 0,
        exp: 0
    },

    budget: 0,

    percentage: 0
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
        if (data.totals.inc > 0) {
        data.percentage = Math.round((data.totals.exp / data.totals.inc)* 100)
        }else{
            data.percentage = 0
        }
      },
      calculatePercentages: function(){
          data.items.exp.forEach(function(el){
              el.calcPercentage(data.totals.inc)
          })
      },
      getPercentages: function(){
        var allPercentages = data.items.exp.map(function(el){
            return el.getPercentage()
        })

        return allPercentages
      },
      takeInfoOfBudget : function(){
      return{
          budget : data.budget,
          totalInc: data.totals.inc,
          totalExp: data.totals.exp,
          percentage : data.percentage,
      }
      },

      deleteItem: function(type, id){
var ids = data.items[type].map(function(el){
    return el.id;
});

var index = ids.indexOf(id)

 if (index !== -1){
      data.items[type].splice(index, 1)
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
  updateBudget()
} else{
    alert('Та тайлбар болон дүн хэсгийг бүрэн бөглөөгүй байна.')
}
  }

  function updateBudget() {
    // 4. Төсвийг тооцоолно.
financeController.calculateBudget()
//5. эцсийн үлдэгдэл тооцоолох
var budget = financeController.takeInfoOfBudget()
// 6. эцсийн үлдэгдэл, тооцоог дэлгэцэнд гаргана.
uiController.showBudget(budget)
// 7. Элемэнтүүдийн хувийг тооцоолно
financeController.calculatePercentages()
// 8. Элемэнтүүдийн хувийг  хүлээж авна.
var allPercentages = financeController.getPercentages();
// 9. Эдгээр хувийг дэлгэцэнд гаргана.
uiController.displayPercentages(allPercentages);
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
     document.querySelector(DOM.inputType).addEventListener('change', uiController.changeType())
     document.querySelector(DOM.containerDiv).addEventListener('click', function(event){
         var id = event.target.parentNode.parentNode.parentNode.parentNode.id
        if(id){
            var arr = id.split("-");
            var type = arr[0];
            var itemId = parseInt(arr[1]);

            //console.log(type + " ===>" + itemId);
            //1.  Санхүүгийн модулиас type, id ашиглаад устагна.
                 financeController.deleteItem(type, itemId)
            // 2. Дэлгэц дээрээс энэ элэментийг устгана.
                 uiController.deleteListItem(id);
            // 3. Үлдэгдэл тооцоог  шинэчилж харуулна.
               updateBudget()
        }
     })
 }
 return {
     init: function () {
         uiController.displayDate();
        uiController.showBudget({
            budget :0,
            totalInc:0,
            totalExp:0,
            percentage :0
        })
        setUpEventListener()
     }
 }
})(uiController, financeController)
appController.init();
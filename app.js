var uiController = (function(){



   

})()
var financeController = (function(){

})()
var appController = ( function (uiController, financeController){
 var ctrlAddItem = () => {
     // 1. оруулах өгөгдлүүдийг дэлгэцээс олж авна.
    console.log('haha');
    // 2. Олж аесан өгөгдлүүдийг санхүүгийн контроллэрт дамжуулж тэнд хадгална.

    // 3. олж  авсан өгөгдлүүдээ вэб дээрээ тохирох хэсэгт гаргана.

    // 4. Төсвийг тооцоолно.

    // 5. эцсийн үлдэгдэл, тооцоог дэлгэцэнд гаргана.

 }
 document.querySelector(".add__btn").addEventListener('click', function(){
    ctrlAddItem();
 })
 document.addEventListener("keypress", function(event){
    if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
    }
 })
})(uiController, financeController)
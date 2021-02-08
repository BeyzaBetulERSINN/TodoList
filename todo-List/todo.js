
//ilk önce elementlerimizi seçiyoruz.
// Tüm Elementleri Seçerken

const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group"); //ul
const firstCardBody = document.querySelectorAll(".card-body")[0];/* 2 tane card bady var ilkini almak için 0. indexi seçtim */
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");

eventListeners();

function eventListeners(){ // Tüm event listenerlar
    form.addEventListener("submit",addTodo);// tüm addEvent Listenerlarımı buraya eklemeye çalışacağım
    //submit olayı olduğunda addTodo yu çalıştır diyorum
    document.addEventListener("DOMContentLoaded",loadAllTodosToUI);
    secondCardBody.addEventListener("click",deleteTodo);
    filter.addEventListener("keyup",filterTodos);
    clearButton.addEventListener("click",clearAllTodos);

}
function clearAllTodos(e){
    if (confirm("Tümünü silmek istediğinize emin misiniz ?")) {
        // Arayüzden todoları temizleme
        // todoList.innerHTML = ""; // Yavaş

        
        while(todoList.firstElementChild != null) {//Bütün child lar silinene kadar
            todoList.removeChild(todoList.firstElementChild);
        }
        localStorage.removeItem("todos"); //local storage de keyi silersek bütün todlarıda silmiş oluyorduk.
        //key todos olduğu için
        
       


    }
    
    



}
function filterTodos(e){
    const filterValue = e.target.value.toLowerCase(); //Büyük küçük harf farkı olmasın diye bütün harfleri küçültüyorum
    const listItems = document.querySelectorAll(".list-group-item"); //Listedekileri aldı

    listItems.forEach(function(listItem){
        const text = listItem.textContent.toLowerCase();// Listedeki isimleride küçülttü
        if (text.indexOf(filterValue) === -1){ //Filtrelenecek değer yok
            // Bulamadı
            
            listItem.setAttribute("style","display : none !important");
            //d-flex display: none özelliğini baskılamıştı.
            //display : none !important yaptığımızda bunu kesinlikle display : none yapmış oluyoruz.
        }
        else {
            listItem.setAttribute("style","display : block");
        }

        

    });

}
function deleteTodo(e){

    if (e.target.className === "fa fa-remove"){
        e.target.parentElement.parentElement.remove(); //Burada arayüzden siliyor.
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);//Burada storageden siliyor

        showAlert("success","Todo başarıyla silindi...");

    }

}
function deleteTodoFromStorage(deletetodo){
    let todos = getTodosFromStorage();

    todos.forEach(function(todo,index){
        if (todo === deletetodo){
            todos.splice(index,1); // Arrayden değeri silebiliriz.
        }

    });

    localStorage.setItem("todos",JSON.stringify(todos));

}
function loadAllTodosToUI(){
    let todos = getTodosFromStorage();

    todos.forEach(function(todo){
        addTodoToUI(todo);


    })

}
function addTodo(e){
    const newTodo = todoInput.value.trim();
//Burada aldığımız todo yu list element olarak ekleyeceğiz
    if (newTodo === "") {
        
          /* 
        <div class="alert alert-danger" role="alert">
  <strong> Oh Snap!</strong> Charge a few things up
</div>

        */
       //showAlert(type,message);
        showAlert("danger","Lütfen bir todo girin...");
    }
    else {
        addTodoToUI(newTodo); 
        addTodoToStorage(newTodo);

        showAlert("success","Todo başarıyla eklendi...");

    }
    




    e.preventDefault();

}
function getTodosFromStorage(){ //Storage'dan bütün todoları alan  fonksiyon
    let todos;

    if (localStorage.getItem("todos") === null){ //todos şeklinde bir key var mı diye kontrollerimi yapıyorum.
        todos = [];  //eğer yoksa boş bir arreyde kontrollerimi yapıyorum
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos")); //arreye çeviriyorum

    }
    return todos;


}
function addTodoToStorage(newTodo){
    let todos = getTodosFromStorage();

    todos.push(newTodo); //bize gönderilen stringi (newTodo) buraya ekliyoruz.

    localStorage.setItem("todos",JSON.stringify(todos));



}
function showAlert(type,message){
    const alert = document.createElement("div");

    alert.className = `alert alert-${type}`;

    alert.textContent = message;

    firstCardBody.appendChild(alert);

    // setTimeout
    //setTimeout metodu ile alertin birkaç saniye gözüküp gitmesini sağlayacağız.
    //window.setTimeout ---- şeklindede kullanılabilir
    setTimeout(function(){
        alert.remove();

    },1000);



}
function addTodoToUI(newTodo){ // String değerini list item olarak UI'ya ekleyecek.
    /*

    <li class="list-group-item d-flex justify-content-between">
                            Todo 1
                            <a href = "#" class ="delete-item">
                                <i class = "fa fa-remove"></i>
                            </a>

                        </li>
    */
     //Burada list-item gibi bir tane item oluşturmamaız lazım burdaki yapıyı kurmamaz lazım.
   //List item Oluşturma
   const listItem = document.createElement("li"); //li elementi oluşturduk
   //List oluşturma
   
   const link = document.createElement("a");  // a elementi oluşturduk
   link.href = "#"; // oluşturduğum linke href özelliği veriyorum.
   link.className = "delete-item";
   link.innerHTML = "<i class = 'fa fa-remove'></i>";

   listItem.className = "list-group-item d-flex justify-content-between";
   //d-flex butonların sağ tarafa yaslanmasını sağlıyor

   // Text Node Ekleme

   listItem.appendChild(document.createTextNode(newTodo)); // Yukarıda aldığımız newTodo yu gönderiyoruz bu bize bir tane text node oluşturacak
   listItem.appendChild(link);

   // Todo List'e List Item'ı ekleme

   todoList.appendChild(listItem);
   todoInput.value = "";  // Değer alınan yerdeki yazıyı temizlemek için


   


}




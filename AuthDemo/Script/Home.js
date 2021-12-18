// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDq2Xxsu2wEi6LaIXy4c5lcKOEPK6ZkvBg",
  authDomain: "sohagfrontend.firebaseapp.com",
  databaseURL: "https://sohagfrontend-default-rtdb.firebaseio.com",
  projectId: "sohagfrontend",
  storageBucket: "sohagfrontend.appspot.com",
  messagingSenderId: "528100423945",
  appId: "1:528100423945:web:ac124e61613b9cf6c27bd8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

onAuthStateChanged(auth,(user)=>{
    if(user)
        document.getElementById("Name").innerText = user.email
    else
        location.assign("./Register.html")
})

window.Logout = Logout;
function Logout(){
    signOut(auth);
}

var xhr = new XMLHttpRequest();
xhr.open("GET","https://fakestoreapi.com/products",true);
xhr.onreadystatechange = function(){
    if(xhr.readyState == 4 && xhr.status == 200){
        var products  = JSON.parse(xhr.responseText);
        for(var item of products){
            CreateCard(item);
        }
    }
}
xhr.send();

function CreateCard(item){
    var card = document.createElement("div");
    card.classList.add("card")
    card.classList.add("border-warning")
    card.classList.add("mb-3")
    card.style.maxWidth = "20rem";
    card.innerHTML = `<div class="card-header">
    <img src="${item.image}" height="80%">
    </div>
    <div class="card-body">
      <div class="card-subtitle">${item.title}</div>
      <p class="card-subtitle text-muted">${item.price}</p>
      <button type="button" class="btn btn-warning" onclick="AddToCart(${item.id},'${item.title}','${item.image}','${item.price}')">Add to Cart</button>
    </div>`
    document.querySelector("#Products>div").appendChild(card);
}

window.AddToCart = AddToCart;
function AddToCart(id, title, image, price){
    var items = {};
    if(localStorage.Cart){
        items = JSON.parse(localStorage.Cart);
        if(items[title])
            items[title].count++;
        else
            items[title] = {id: id, image: image, price: price, count:1};
        
        localStorage.Cart = JSON.stringify(items);
    }
    else{
        items[title] = {id: id, image: image, price: price, count:1};
        localStorage.Cart = JSON.stringify(items);
    }

    var counter = 0;
    for(i in items){
        counter+= items[i].count;
    }
    document.getElementById("itemCount").innerText = counter;
}

window.OpenCartWindow = OpenCartWindow;
function OpenCartWindow(){
    var win = window.open("cart.html","_blank","width=1500,height=1000");
}
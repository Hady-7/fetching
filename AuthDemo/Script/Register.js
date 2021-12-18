function ValidateName(name){
    var nameRegex = /^[a-zA-Z\s]{3,}$/;
    if(nameRegex.test(name))
        return true;
    else
        throw new Error("Name should be at least 3 char, and letters only");
}

function ValidateEmail(email){
    var emailRegex = /^[a-zA-Z0-9\.]+\@[a-z]{2,}\.[a-z]{3,}$/;
    if(emailRegex.test(email))
        return true;
    else
        throw new Error("Email Invalid Form");
}

function ValidatePassword(password){
    var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
    if(passwordRegex.test(password))
        return true;
    else
        throw new Error("Password must contain a, A, 0, * and at least 8 Char");
}

function ValidatePhone(phone){
    var phoneRegex = /^(01)[0|1|2|5][0-9]{8}$/;
    if(phoneRegex.test(phone))
        return true;
    else
        throw new Error("Phone Should be 01[0|1|2|5]00000000");
}

document.getElementById("FullName").onblur = function(){
    try{
        ValidateName(this.value);
        this.classList.remove("is-invalid");
    }catch(e){
        document.querySelector("#FullName+div").innerText  = e.message;
        this.classList.add("is-invalid");
        this.focus();
    }
}

document.getElementById("Email").onblur = function(){
    try{
        ValidateEmail(this.value);
        this.classList.remove("is-invalid");
    }catch(e){
        document.querySelector("#Email+div").innerText  = e.message;
        this.classList.add("is-invalid");
        this.focus();
    }
}

document.getElementById("Password").onblur = function(){
    try{
        ValidatePassword(this.value);
        this.classList.remove("is-invalid");
    }catch(e){
        document.querySelector("#Password+div").innerText  = e.message;
        this.classList.add("is-invalid");
        this.focus();
    }
}

document.getElementById("Phone").onblur = function(){
    try{
        ValidatePhone(this.value);
        this.classList.remove("is-invalid");
    }catch(e){
        document.querySelector("#Phone+div").innerText  = e.message;
        this.classList.add("is-invalid");
        this.focus();
    }
}

window.Done = Done;
function Done(ev){
    ev.preventDefault();
    debugger;
    var name = document.getElementById("FullName").value;
    var email = document.getElementById("Email").value;
    var password = document.getElementById("Password").value;
    var phone = document.getElementById("Phone").value;
    try{
        ValidateName(name);
        ValidateEmail(email);
        ValidatePassword(password);
        ValidatePhone(phone);
        Register(email,password);
        //location.assign("./Home.html")
    }catch(e){
        alert(e);
    }
}

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-auth.js";

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

function Register(email,password){
    createUserWithEmailAndPassword(auth,email,password).then((uc)=>{
        console.log(uc.user.uid);
    }).catch((error)=>{
        console.log(error.message);
    });
}

onAuthStateChanged(auth,(user)=>{
    if(user)
        location.assign("./Home.html")
})
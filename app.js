// ===========================
// GG COLOR APP.JS PART 1
// ===========================

// Elements

const loginTab = document.getElementById("loginTab");
const registerTab = document.getElementById("registerTab");

const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

const goLogin = document.getElementById("goLogin");

// ===========================
// Login Tab
// ===========================

if(loginTab){

loginTab.addEventListener("click",()=>{

loginTab.classList.add("active");
registerTab.classList.remove("active");

loginForm.style.display="block";
registerForm.style.display="none";

});

}

// ===========================
// Register Tab
// ===========================

if(registerTab){

registerTab.addEventListener("click",()=>{

registerTab.classList.add("active");
loginTab.classList.remove("active");

registerForm.style.display="block";
loginForm.style.display="none";

});

}

// ===========================
// Bottom Login Link
// ===========================

if(goLogin){

goLogin.addEventListener("click",()=>{

loginTab.click();

});

}

// ===========================
// Button Animation
// ===========================

document.querySelectorAll(".main-btn").forEach(btn=>{

btn.addEventListener("click",()=>{

btn.style.transform="scale(.96)";

setTimeout(()=>{

btn.style.transform="scale(1)";

},150);

});

});

// ===========================
// Welcome
// ===========================

window.addEventListener("load",()=>{

console.log("GG COLOR Loaded");

});
// ===========================
// GG COLOR APP.JS PART 2
// Firebase Authentication
// ===========================

import { auth, db } from "./firebase.js";

import {
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
signOut,
onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
doc,
setDoc,
getDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// ===========================
// REGISTER
// ===========================

if(registerForm){

registerForm.addEventListener("submit",async(e)=>{

e.preventDefault();

const name=document.getElementById("registerName").value.trim();
const email=document.getElementById("registerEmail").value.trim();
const password=document.getElementById("registerPassword").value.trim();
const invite=document.getElementById("inviteCode").value.trim();

try{

const result=await createUserWithEmailAndPassword(auth,email,password);

await setDoc(doc(db,"users",result.user.uid),{

name:name,
email:email,
inviteCode:invite,
balance:0,
vip:0,
createdAt:new Date()

});

alert("Account Created Successfully");

window.location.href="home.html";

}catch(error){

alert(error.message);

}

});

}

// ===========================
// LOGIN
// ===========================

if(loginForm){

loginForm.addEventListener("submit",async(e)=>{

e.preventDefault();

const email=document.getElementById("loginEmail").value.trim();
const password=document.getElementById("loginPassword").value.trim();

try{

await signInWithEmailAndPassword(auth,email,password);

window.location.href="home.html";

}catch(error){

alert(error.message);

}

});

}

// ===========================
// USER SESSION
// ===========================

onAuthStateChanged(auth,(user)=>{

if(user){

console.log("Logged In :",user.email);

}else{

console.log("No User Logged In");

}

});

// ===========================
// LOGOUT
// ===========================

const logoutBtn=document.getElementById("logoutBtn");

if(logoutBtn){

logoutBtn.addEventListener("click",async()=>{

await signOut(auth);

window.location.href="index.html";

});

}
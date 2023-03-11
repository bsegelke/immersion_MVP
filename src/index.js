import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import axios from "axios";

let userName = prompt("Hello, Monster Feeder, Whats Your Name?");
let monsterStyle;
async function ifUuser(){
const existingUser = await axios.get(`http://localhost:3000/api/save-monster/${userName}`);
if (existingUser.data) {
console.log(existingUser)
  alert(`Welcome back ${userName}, I hope you've remembered to feed your monster!`)
  monsterStyle = 'dont matter now'
}else{
  monsterStyle = prompt(`Howdy ${userName}!, what kinda monster do you want to feed today?`)
  console.log(userName, monsterStyle)
}
}
ifUuser()
while(userName.toLowerCase() === "") {
  alert("We have to know your name, stranger!");
  userName = prompt("Hello, Monster Feeder, Whats Your Name?");
}
  



const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App userName = {userName} monsterStyle={monsterStyle}/>);
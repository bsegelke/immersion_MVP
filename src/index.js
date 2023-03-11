import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

let userName = prompt("Hello, Monster Feeder, Whats Your Name?");

while(userName.toLowerCase() === "") {
  alert("We have to know your name, stranger!");
  userName = prompt("Hello, Monster Feeder, Whats Your Name?");
}
  let monsterStyle = prompt(`Howdy${userName}, what kinda monster do you want to feed today?`)
  console.log(userName, monsterStyle)



const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import axios from "axios";

async function getUserInfo() {
  let userName = prompt("Hello, Monster Feeder, What's Your Name?");
  let monsterStyle;

  const existingUser = await axios.get(`http://localhost:3000/api/save-monster/${userName}`);
  if (existingUser.data !== 'monsterTime') {
    console.log(existingUser);
    alert(`Welcome back ${userName}, I hope you've remembered to feed your monster!`);
    monsterStyle = 'dont matter now';
  } else {
    while (userName.toLowerCase() === "") {
      alert("We have to know your name, stranger!");
      userName = prompt("Hello, Monster Feeder, What's Your Name?");
    }
    monsterStyle = prompt(`Howdy ${userName}!, what kinda monster do you want to feed today?`);
  }
  
  return { userName, monsterStyle };
}

async function renderApp() {
  const { userName, monsterStyle } = await getUserInfo();
  const container = document.getElementById("root");
  const root = createRoot(container);
  root.render(<App userName={userName} monsterStyle={monsterStyle} />);
}

renderApp();
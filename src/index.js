import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import axios from "axios";
import '../public/style.css';


async function getUserInfo() {
  let userName = prompt("Hello, Monster Feeder, What's Your Name?");
  let monsterStyle = '';

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
    alert(`Howdy ${userName}! In order to summon a monster fit for someone as cool, as you, I'll need you to answer a few questions, keep your answers short, preferbably one word.`);
    monsterStyle += `${prompt(`When ordering a frenchfry do you get a small or a massive?`)}`;
    monsterStyle += `, ${prompt(`Oh? I never would have guessed, do people ever describe you as, cute, funny, intense, bulbous, or furry?`)}`;
    monsterStyle += `, ${prompt(`Whats your favorite color?`)}`;
    monsterStyle+= `, ${prompt(`Whats your favorite animal? Or Whats your favorite food`)}-like`
    monsterStyle+= `, with huge ${prompt(`Whats your favorite bodypart, hehe?`)}`
    alert("Thats incredible, I think i know just the monster for you, Summon them to take a look!");
    alert(`And one more thing ${userName}, dont forget to feed your monster before the countdown ends, or they will Die! You can always come back with the same username to see how your monster is doing!`);
  }
  console.log(monsterStyle)
  return { userName, monsterStyle };
}

async function renderApp() {
  const { userName, monsterStyle } = await getUserInfo();
  const container = document.getElementById("root");
  const root = createRoot(container);
  root.render(<App userName={userName} monsterStyle={monsterStyle}  />);
}

renderApp();
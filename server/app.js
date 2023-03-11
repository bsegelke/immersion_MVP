
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
//import { midjourney } from midjourney-client
const  {saveMonsterToDatabase } = require('./db')
const PORT = 3000;
const app = express();

// Serve static assets from the "public" directory
app.use(express.static(path.join(__dirname, '..', 'build')));
app.use(bodyParser.json())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Route all other requests to your React application
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

app.listen(PORT, () => {
  
  console.log(`Server is now listening at port ${PORT}`);
});

app.post("/api/save-monster", async (req, res) => {
  try {
    console.log(req.body)
    const monsterData = req.body;
    const savedMonster = await saveMonsterToDatabase(monsterData);
    res.status(201).json(savedMonster);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to save monster" });
  }
});



console.log('test')
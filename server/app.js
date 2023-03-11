
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
//import { midjourney } from midjourney-client
const  {saveMonsterToDatabase } = require('./db')
const { Monster } = require('./db')
const PORT = 3000;
const app = express();

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
// Serve static assets from the "public" directory
app.use(express.static(path.join(__dirname, '..', 'build')));

// Route all other requests to your React application
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
// });

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


app.get("/api/save-monster/:username", async(req,res)=>{
  const username = req.params.username;
  console.log('username', username)
  const user = await Monster.findOne({ username })
  if(user){
    const imageBuffer = Buffer.from(user.monster_image, 'base64');
    res.setHeader('Content-Type', 'image/jpeg');
    res.send(imageBuffer).status(200)
  }
})


console.log('test')
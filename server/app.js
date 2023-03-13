
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
//import { midjourney } from midjourney-client
const  {saveMonsterToDatabase } = require('./db')
const { Monster } = require('./db')
const PORT = 3000;
const app = express();
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // Allow requests from any origin
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE"); // Allow the following HTTP methods
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); // Allow the following headers
  next();
});
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
    console.log(';bad spot')
    const imageBuffer =  Buffer.from(user.monster_image, 'base64');
    res.setHeader('Content-Type', 'image/jpeg');
    res.send(imageBuffer).status(200)
  }else{
    console.log('good spot')
    res.send('monsterTime').end()
  }

})


app.put("/api/monster", async (req, res)=>{
  // console.log(req)
  const { username, alive } = req.body;
  console.log(req.body)
  try{
  const updatedMonster = await Monster.findOneAndUpdate({ username }, { alive: alive }, { new: true });
  console.log('updated a success!', updatedMonster)
  res.json(updatedMonster)
  }catch(err){
    console.log('failed to update monster to dead', err);
    res.sendStatus(500)
  }
})


app.get('/api/living-status/:username', async(req,res)=>{
  const { username } = req.params
  try{
const monster = await Monster.findOne({ username });
if(!monster){
  return res.sendDate(404)
}
console.log('sending living status to client')
return res.json(monster.alive)
  }catch(err){
    console.log('could not get the monster living status')
  }
})
console.log('test')
const mongoose = require('mongoose');




mongoose.connect('mongodb://localhost/monsterfeederdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  
})
.then(() => console.log('Connected to monsterFeeder database'))
.catch(error => console.error('Failed to connect to db', error));

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));


const MonsterFeederSchema = new mongoose.Schema({
  username: String,
  monster_image: String,
  descriptors: String,
  alive: Boolean
});


 const Monster = mongoose.model('Monster', MonsterFeederSchema);



 //function to save a monst toDb
 async function saveMonsterToDatabase(monsterData) {
  const existingMonster = await Monster.findOne({username: monsterData.username});
  if (existingMonster) {
    console.log('this monster already exists!');
    return existingMonster;
  }else{
  const newMonster = new Monster(monsterData);
  await newMonster.save();
  console.log('Saved monster to database:', newMonster);
  return newMonster
  }
}


module.exports = {
  saveMonsterToDatabase
};
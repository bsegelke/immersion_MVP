
const express = require('express');
const path = require('path');
//import { midjourney } from midjourney-client

const PORT = 3000;
const app = express();

// Serve static assets from the "public" directory
app.use(express.static(path.join(__dirname, '..', 'build')));

// Route all other requests to your React application
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

app.listen(PORT, () => {
  
  console.log(`Server is now listening at port ${PORT}`);
});





console.log('test')
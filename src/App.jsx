
import React from "react";
//import midjourney from "midjourney-client";
import { API_KEY } from "../config"
import axios from "axios";
// const App = () => <h1>Welcome to Monster Feeder Yo mama!!</h1>;

// export default App;

class App extends React.Component{
constructor(props){
  super(props);

this.state = {
imageSrc: '',

}


this.generateImage = this.generateImage.bind(this);

};

async generateImage() {

  var prompt = document.getElementById("prompt").value;

  const encodedParams = new URLSearchParams();
  encodedParams.append("prompt", prompt);

  const options = {
      method: 'POST',
      headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'X-RapidAPI-Key': API_KEY,
          'X-RapidAPI-Host': 'dezgo.p.rapidapi.com'
      },
      body: encodedParams
  };

  var response = await fetch('https://dezgo.p.rapidapi.com/text2image', options)
  var pngBlob = await response.blob();    
  
  console.log("Got the image as a blob:", pngBlob)
  this.setState({imageSrc: URL.createObjectURL(pngBlob)})
  //document.getElementById("my-image").src = URL.createObjectURL(pngBlob);
}


render(){

return ( 
<div>
<h1>Welcome to Monster Feeder!!</h1>
<input type="text" id="prompt" />
<button onClick={this.generateImage}>Create Your Monster</button>
<hr/>
<img src={this.state.imageSrc} id="my-image"/>
</div>
)

}


};
export default App;
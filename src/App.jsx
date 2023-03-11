
import React from "react";
//import midjourney from "midjourney-client";
import axios from "axios";
// const App = () => <h1>Welcome to Monster Feeder Yo mama!!</h1>;

// export default App;

class App extends React.Component{
constructor(props){
  super(props);

this.state = {

}


this.imageGenerator = this.imageGenerator.bind(this);

};


imageGenerator(prompt) {
  console.log('hi')
}


render(){

return ( 
<div>
<h1>Welcome to Monster Feeder!!</h1>
<input type="text" id="prompt" />
<button onClick={this.generateImage}>Create Your Monster</button>
<hr/>
<img id="my-image"/>
</div>
)

}


};
export default App;
import React from "react";
import { API_KEY } from "../config";
import axios from "axios";
import Timer from "./Timer";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageSrc: '',
      isButtonClicked: false
    };
    this.generateImage = this.generateImage.bind(this);
  }

  async generateImage() {
    const { monsterStyle } = this.props;
    const { userName } = this.props;
    this.setState({isButtonClicked: true})
    // Check if the user already exists in the database
    try {
      const existingUser = await axios.get(`http://localhost:3000/api/save-monster/${userName}`, { responseType: 'arraybuffer' });
      if (existingUser.data.byteLength > 100) {
        console.log(existingUser.headers.ce)
        const base64data = btoa(new Uint8Array(existingUser.data).reduce((data, byte) => data + String.fromCharCode(byte), ''));
        const imageSrc = `data:image/png;base64,${base64data}`;
        this.setState({ imageSrc });
        return;
      }
    } catch (error) {
      console.log('Error occurred while checking for existing user', error);
    }
  
    // If the user doesn't exist, generate the monster image and save it to the database
    const encodedParams = new URLSearchParams();
    encodedParams.append("prompt", `${monsterStyle}, full body monster, highly-detailed masterpiece trending HQ,  in the style of GooseBumps`);
    encodedParams.append("width", '320');
    encodedParams.append("height", '320');
    encodedParams.append("negative_prompt", "background,tiling, poorly drawn hands, poorly drawn feet, poorly drawn face, out of frame, extra limbs, disfigured, deformed, body out of frame, blurry, bad anatomy, blurred, watermark, grainy, signature, cut off, draft, human, landscape" );
    encodedParams.append("model", 'dreamshaper');
    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': 'dezgo.p.rapidapi.com'
      },
      body: encodedParams
    };
  
    try {
      const response = await fetch('https://dezgo.p.rapidapi.com/text2image', options);
      const pngBlob = await response.blob();
      const reader = new FileReader();
      reader.readAsDataURL(pngBlob)
  
      reader.onloadend = async () => {
        const base64data = reader.result.replace(/^data:image\/png;base64,/, '');
        const monsterData = {
          username: userName,
          monster_image: base64data,
          descriptors: `${monsterStyle}`,
          alive: true
        };
        const headers = {
          'Content-Type': 'application/json'
        }
        try {
          await axios.post('/api/save-monster', monsterData);
          console.log('Saved your monster to database', monsterData);
          this.setState({ imageSrc: URL.createObjectURL(pngBlob) });
        } catch (error) {
          console.log('Error occurred while saving monster to database', error);
        }
      } 
    } catch (error) {
      console.log('Error occurred while generating image', error);
    }
  }

  render() {
    const { imageSrc } = this.state
    const { isButtonClicked } = this.state
    return (
      <div>
      <Timer></Timer>
        <h1>Welcome to Monster Feeder!!</h1>
        
       
        <div id="imageborder">
        {isButtonClicked ? null : (
            <button onClick={this.generateImage}>Summon Your Monster</button>
          )}
        <img src={imageSrc} id="my-image"/>
        </div>
      </div>
    );
  }
}

export default App;
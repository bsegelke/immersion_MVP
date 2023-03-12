import React from "react";
import axios from "axios";

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
    };


    this.monsterDeath=this.monsterDeath.bind(this)
  }


  async monsterDeath(monsterData) {
    try{
      const reponse = await axios.put('/api/monster', {
        username: monsterData,
        alive: false
       
      })
      // console.log('Monster Status Updated')
    }catch(err){
      console.log('failed to update monster', err)
    }
    }



  //when timer is on the dom update the timer 
 
    componentDidMount() {
      const endTime = new Date().getTime() + 30000;
      localStorage.setItem("endTime", endTime);
      this.updateTimer();
    }
  
//when the timer changes, update the timer
  componentDidUpdate() {
    this.updateTimer();
  }
//clear it so it doesnt keep running on and on
  componentWillUnmount() {
    clearInterval(this.timerInterval);
  }

  updateTimer() {
  
    const endTime = localStorage.getItem("endTime");
    if (endTime && new Date().getTime() < parseInt(endTime, 10)) {

      clearInterval(this.timerInterval);

      this.timerInterval = setInterval(() => {
        const remaining = parseInt(endTime, 10) - new Date().getTime();
        if (remaining >= 0) {
          //decrement by 1 secind
          this.setState({ time: Math.floor(remaining / 1000) });
          localStorage.setItem("endTime", endTime);
        } else {
          //clear the localstorage
          clearInterval(this.timerInterval);

          localStorage.removeItem("endTime");
          this.setState({ time: 0 });
        }
      }, 100);
    } else {
      this.monsterDeath(this.props.userName)
    }
  }
//reset to 30 seconds
reset = () => {
  const endTime = localStorage.getItem("endTime");
  if (endTime && new Date().getTime() < parseInt(endTime, 10)) {
    // Timer has not expired yet
    this.setState({ time: 30 });
  } else {
    // Timer has expired, update alive status to false
    axios.put('/api/monster', {
      username: this.props.userName,
      alive: true
    })
    .then(response => {
      console.log('Monster Status Updated')
    })
    .catch(err => {
      console.log('failed to update monster', err)
    })
    this.setState({ time: 30 });
  }
  localStorage.setItem("endTime", new Date().getTime() + 30000);
};

  render() {
    return (
      <div id="#timer">
        <span id="timer">{this.state.time}</span>
        <button id="feedbutton" onClick={(this.reset)}>Feed Monster</button>
      </div>
    );
  }
}

export default Timer;
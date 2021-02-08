import  React, {Component} from 'react';
import './About.css';

class About extends Component {

  render() {  
    return (
      <>
        <h2>About</h2>
        <div className="about">
        <p>This is a basic app for dinner planning</p>
        <br/>
        <h3>At the top, click on:</h3>
        <p>&nbsp;&nbsp;&nbsp;'menu' to see your weekly menu</p>
        <p>&nbsp;&nbsp;&nbsp;'reset' to wipe your menu and start over</p>
        <p>&nbsp;&nbsp;&nbsp;'about' to return to the instructions page</p>
        <br/>
        <h3>On the Menu Screen</h3>
        <h4>When adding a new dish to your menu:</h4>
        <p>&nbsp;&nbsp;&nbsp;select a day, a category and type in the name of the dish</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;or</p>
        <p>&nbsp;&nbsp;&nbsp;select a day, a category and press the random button</p>
        <br/>
        <p>&nbsp;&nbsp;&nbsp;Click on the '-' button to remove a dish from its respective day</p>
        <br/>
        <h4>On smaller display widths:</h4>
        <p>&nbsp;&nbsp;&nbsp;Click on the name of a day to shrink or expand it</p>
        <br/>
        </div>
      </>
    );
  }  
}

export default About;
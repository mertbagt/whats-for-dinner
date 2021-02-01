import  React, {Component} from 'react';
import './About.css';

class About extends Component {

  render() {  
    return (
      <>
        <h2>About</h2>
        <p>This is a basic app for dinner planning</p>
        <br/>
        <p>At the top, click on:</p>
        <p>&nbsp;&nbsp;&nbsp;'menu' to see your weekly menu</p>
        <p>&nbsp;&nbsp;&nbsp;'reset' to wipe your menu and start over</p>
        <p>&nbsp;&nbsp;&nbsp;'about' to return to the instructions page</p>
        <br/>
        <p>On the Menu Screen</p>
        <p>When adding a new dish to your menu:</p>
        <p>&nbsp;&nbsp;&nbsp;select a day, a category and type in the name of the dish</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;or</p>
        <p>&nbsp;&nbsp;&nbsp;select a day, a category and press the random button</p>
        <br/>
        <p>Click on the '-' button to remove a dish from its respective day</p>
        <br/>
        <p>On smaller display widths:</p>
        <p>Click on the name of a day to shrink or expand it</p>
        <br/>
      </>
    );
  }  
}

export default About;
import  React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Context from '../Context';
import './Nav.css';

class Nav extends Component {
  static contextType = Context;
    
  handleClickReset = e => {
    e.preventDefault()
    this.context.reset()
    }

  render() {
    return (
      <>
        <h1>What's For Dinner</h1>
        <Link to={`/`}>about</Link>
        &nbsp;
        <Link to={`/weekmenu`}>menu</Link>
        &nbsp;
        <button
          className='Reset'
          type='button'
          onClick={this.handleClickReset}
        >reset</button>
      </>
    );
  }  
}

export default Nav;
import  React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Context from '../Context';
import config from '../config';
import './Nav.css';

class Nav extends Component {
  static contextType = Context;
    
  handleClickReset = e => {
    e.preventDefault()

    fetch(`${config.API_ENDPOINT}/assignments/`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
    })
    .then(res => {
      if (!res.ok)
        return res.then(e => Promise.reject(e))
      return res
    })
    .then(() => {
      this.context.reset()
    })
    .catch(error => {
      console.error({ error })
    })
  }

  render() {
    return (
      <>
        <h1>What's For Dinner</h1>
        <div className={"navbar"}>
          <div className={"navitem"}>
            <Link to={`/`}>about</Link>
          </div>
          <div className={"navitem"}>
            <Link to={`/weekmenu`}>menu</Link>
          </div>
          <div className={"navitem"}>
            <Link
              to={`/weekmenu`}
              className='Reset'
              onClick={this.handleClickReset}
            >reset</Link>
          </div>
        </div>
      </>
    );
  }  
}

export default Nav;
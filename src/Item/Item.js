import  React, {Component} from 'react';
import Context from '../Context'
import config from '../config';
import './Item.css';

class Item extends Component {
  static contextType = Context;

  handleDeleteItem = e => {
    e.preventDefault();

    const duplicateError = "";
    this.context.setDuplicateError(duplicateError);

    const id = this.props.assignment;
    const dayId = this.props.day;
    const dishId = this.props.id;

    fetch(`${config.API_ENDPOINT}/assignments/${id}`, {
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
      this.context.deleteItem(dayId, dishId)
    })
    .catch(error => {
      console.error({ error })
    })
  }

  render() {
    return (
      <tr key={this.props.subkey}>
        <td className={"right"}>
          <button
            className='Delete'
            type='button'                    
            onClick={this.handleDeleteItem}
          >-</button>
        </td> 
        <td className={"right"}>
          {this.props.category}:
        </td>
        <td className={"left"}>
          {this.props.name}
        </td>            
      </tr>
    );
  }  
}

export default Item;
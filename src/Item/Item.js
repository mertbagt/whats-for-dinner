import  React, {Component} from 'react';
import Context from '../Context'
import './Item.css';

class Item extends Component {
  static contextType = Context;

  handleDeleteItem = e => {
    e.preventDefault();
    const dayId = this.props.day;
    const dishId = this.props.id;
    const duplicateError = "";
    this.context.deleteItem(dayId, dishId)
    this.context.setDuplicateError(duplicateError);
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
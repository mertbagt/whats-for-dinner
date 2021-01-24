import  React, {Component} from 'react';
import Context from '../Context';
import ValidationError from '../ValidationError/ValidationError';
import './AddItem.css';

class AddItem extends Component {
  static contextType = Context;

  state = {
    dayId: 1,
    dishCategory: 'Drink',
    dishName: {value: '', touched: false} 
  };

  updateDay(day) {
    day = parseInt(day, 10);
    this.setState({dayId: day})
  }

  updateCategory(category) {
    this.setState({dishCategory: category})
  }

  updateName(name) {
    this.setState({dishName: {value: name, touched: true}});
  }

  validateName() {
    const name = this.state.dishName.value.trim();

    if (name.length === 0) {
      return "A dish name is required";
    } else if (name.length < 3) {
      return "Dish name must be at least 3 characters long";
    }
  }

  handleSubmit(event) {
    event.preventDefault();

    const day = this.state.dayId;
    const category = this.state.dishCategory;
    const name = this.state.dishName.value;

    const currentDishes = this.context.dishes;
    const x = (this.context.dishes.length - 1);
    let id = (currentDishes[x].dishId) + 1;

    let isDuplicate = false;

//  check for duplicate entries

    for (let i = 0; i < currentDishes.length; i++) {
      if (currentDishes[i].dishName === name) {
        isDuplicate = true;
        id = currentDishes[i].dishId
      }
    }

//  submit new dish entry only if not a duplicate

    if (isDuplicate === false) {
      const newItem = {dishId: id, dishCategory: category, dishName: name}
      this.context.addItem(newItem);
    }

//  submit new assignemt

    const newAssignment = {dayId: day, dishId: id}
    this.context.addAssignment(newAssignment);
  }

  handleRandom(event) {
    const dishes = this.context.dishes;
    const byCategory = dishes.filter(dish => dish.dishCategory === this.state.dishCategory);
    console.log(byCategory);

    const x = (byCategory.length);
    let y = Math.floor(Math.random() * x);
    console.log(y);

    const day = this.state.dayId;
    const id = byCategory[y].dishId;

    console.log('Day Id: ' + day);
    console.log('Dish Id: ' + id);

    const newAssignment = {dayId: day, dishId: id}
    this.context.addAssignment(newAssignment);
  }

  render() {
    const nameError = this.validateName();

    return (
      <section className='AddItem'>
        <form className="AddItemForm" onSubmit={e => this.handleSubmit(e)}>
          <h3>New Item:</h3>
          <select 
            name="day"
            id="day"
            onChange={e => this.updateDay(e.target.value)}
          >
            <option value="1">Sunday</option>
            <option value="2">Monday</option>
            <option value="3">Tuesday</option>
            <option value="4">Wednesday</option>
            <option value="5">Thursday</option>
            <option value="6">Friday</option>
            <option value="7">Saturday</option>
          </select>
          <select 
            name="category"
            id="category"
            onChange={e => this.updateCategory(e.target.value)}
          >
            <option value="Drink">Drink</option>
            <option value="Main">Main</option>
            <option value="Side">Side</option>
            <option value="Dessert">Dessert</option>
          </select>                
          <input
            type="text"
            className="AddItem_input"
            name="name"
            id="name"
            onChange={e => this.updateName(e.target.value)}
            placeholder="enter a dish"
            required
          />
          <button
            type="submit"
            className="AddNote_button"
            disabled={this.validateName()}
          >Save
          </button>
          <div className="AddItem_error_group">
            {this.state.dishName.touched && <ValidationError message={nameError} />}
          </div>
        </form>
        <button
            type="button"
            className="AddNote_random"
            onClick={e => this.handleRandom(e)}
          >Random
        </button>
      </section>
    );
  }  
}

export default AddItem;
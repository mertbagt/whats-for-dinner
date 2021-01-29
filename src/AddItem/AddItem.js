import  React, {Component} from 'react';
import Context from '../Context';
import ValidationError from '../ValidationError/ValidationError';
import config from '../config';
import './AddItem.css';

class AddItem extends Component {
  static contextType = Context;

  state = {
    dayId: 1,
    dishCategory: 'Drink',
    dishName: {value: '', touched: false},
  };

  updateDay(day) {
    const duplicateError = "";
    this.context.setDuplicateError(duplicateError);

    day = parseInt(day, 10);
    this.setState({dayId: day})
  }

  updateCategory(category) {
    const duplicateError = "";
    this.context.setDuplicateError(duplicateError);
    
    this.setState({dishCategory: category})
  }

  updateName(name) {
    const duplicateError = "";
    this.context.setDuplicateError(duplicateError);
    
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
    
    const duplicateError = "";
    this.context.setDuplicateError(duplicateError);
    
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

    const newDbAssignment = {day_id: day, dish_id: id}
    const newAssignment = {dayId: day, dishId: id}
    
//  submit new dish entry only if not a duplicate

    if (isDuplicate === false) {
      const newDbItem = {id: id, dish_category: category, dish_name: name}
      const newItem = {dishId: id, dishCategory: category, dishName: name}

      fetch(`${config.API_ENDPOINT}/dishes`, {
        method: 'POST',
        body: JSON.stringify(newDbItem),
        headers: {
          'content-type': 'application/json'
        },
      })
      .then(res => {
        if(!res.ok) {
          throw new Error('Something went wrong, please try again later');
        }
        return res.json();
      })
      .then(data => {
        this.context.addItem(newItem);
        this.handleAssignment(newDbAssignment, newAssignment);
      })  
      .catch(error => {
        this.setState({
          error: error.message
        });
      })   
    } else {
      this.handleAssignment(newDbAssignment, newAssignment);
    }
  }

  handleAssignment(newDbAssignment, newAssignment) {
    fetch(`${config.API_ENDPOINT}/assignments`, {
      method: 'POST',
      body: JSON.stringify(newDbAssignment),
      headers: {
        'content-type': 'application/json'
      },
    })
    .then(res => {
      if(!res.ok) {
        throw new Error('Something went wrong, please try again later');
      }
      return res.json();
    })
    .then(data => {
      this.setState({
        dayId: 1,
        dishCategory: 'Drink',
        dishName: {value: '', touched: false}
      })
      this.context.addAssignment(newAssignment);   
    })
    .catch(error => {
      this.setState({
        error: error.message
      });
    })
  }

  handleRandom(event) {
//  implemented user feedback request to not have random button duplicate existing entries for the selected day    

//  reset the related error; will be set later in this function if applicable

    const duplicateError = "";
    this.context.setDuplicateError(duplicateError);

//  narrowing all dishes down to dishes by user selected category to generate possible results

    const dishes = this.context.dishes;
    const byCategory = dishes.filter(dish => dish.dishCategory === this.state.dishCategory);

//  building the current menu of dishes for the user selected day    

    const assignments = this.context.assignments
    const dayAssignments = assignments.filter(assignment => assignment.dayId === this.state.dayId);

//  filtering the current menu out of the possible results

    let noDuplicateByCategory = byCategory;

    dayAssignments.forEach(assignment => {
      noDuplicateByCategory = noDuplicateByCategory.filter(dish => assignment.dishId !== dish.dishId)
    })

//  check for no possible results and set error if true

    if (noDuplicateByCategory.length === 0) {
      let duplicateError = "No new non duplicate entries for this day and category; add more dishes"
      this.context.setDuplicateError(duplicateError)
    } else {

//  randomly select a possible result and update the assignments table

      const x = (noDuplicateByCategory.length);

      let y = Math.floor(Math.random() * x);

      const day = this.state.dayId;
      const id = noDuplicateByCategory[y].dishId;
      const newAssignment = {dayId: day, dishId: id}

      this.context.addAssignment(newAssignment);
    }
  }

  render() {
    const nameError = this.validateName();
    const error = this.context.error
          ? <div className="error">{this.context.error}</div>
          : "";

    return (
      <section className='AddItem'>
        <form id="AddItemForm" className="AddItemForm" onSubmit={e => this.handleSubmit(e)}>
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
            value={this.state.dishName.value}
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
            {error}
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
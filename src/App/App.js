import  React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Nav from '../Nav/Nav';
import About from '../About/About';
import WeekMenu from '../WeekMenu/WeekMenu';
import Context from '../Context';
import './App.css';

const days = [
  {
    dayId: 1,
    dayName: 'Sunday'
  },
  {
    dayId: 2,
    dayName: 'Monday'
  },
  {
    dayId: 3,
    dayName: 'Tuesday'
  },
  {
    dayId: 4,
    dayName: 'Wednesday'
  },
  {
    dayId: 5,
    dayName: 'Thursday'
  },
  {
    dayId: 6,
    dayName: 'Friday'
  },
  {
    dayId: 7,
    dayName: 'Saturday'
  }
];

const dishes = [
  {
    dishId: 0,
    dishCategory: 'Drink',
    dishName: 'water'
  },
  {
    dishId: 1,
    dishCategory: 'Drink',
    dishName: 'juice'
  },
  {
    dishId: 2,
    dishCategory: 'Main',
    dishName: 'spaghetti'
  },
  {
    dishId: 3,
    dishCategory: 'Main',
    dishName: 'steak'
  },
  {
    dishId: 4,
    dishCategory: 'Main',
    dishName: 'pizza'
  },
  {
    dishId: 5,
    dishCategory: 'Side',
    dishName: 'salad'
  },
  {
    dishId: 6,
    dishCategory: 'Side',
    dishName: 'green beans'
  },
  {
    dishId: 7,
    dishCategory: 'Dessert',
    dishName: 'ice cream'
  }
];

const assignments = [
  {
    dayId: 1,
    dishId: 0
  },
  {
    dayId: 1,
    dishId: 2
  },
  {
    dayId: 1,
    dishId: 5
  },
  {
    dayId: 1,
    dishId: 7
  },
  {
    dayId: 2,
    dishId: 1
  },
  {
    dayId: 2,
    dishId: 3
  },
  {
    dayId: 2,
    dishId: 6
  },  
];

class App extends Component {
  state = {
    days: days,
    dishes: dishes,
    assignments: assignments,
    error: "",
  };

  handleReset = () => {
    this.setState({
        assignments: []
    });
  };

  handleSetDuplicateError = (duplicateError) => {
    this.setState({
      error: duplicateError
    });
  }

  handleDeleteItem = (dayId, dishId) => {
    this.setState({
      assignments: this.state.assignments.filter(assignment => ((assignment.dayId !== dayId) || (assignment.dishId !== dishId)))
    });
  }

  handleAddItem = (newItem) => {
    this.setState({
      dishes: [...this.state.dishes, newItem ],
    })
  }

  handleAddAssignment = (newAssignment) => {
    this.setState({
      assignments: [...this.state.assignments, newAssignment],
    })
  }

  renderNavRoutes() {
    return (
        <>
          <Route path="/" component={Nav} />
        </>
    );
  }

  renderMainRoutes() {
    return (
        <>
          <Route exact path="/" component={About} />
          <Route path="/weekmenu" component={WeekMenu} />          
        </>
    );
  }

  render() {
    const value = {
      days: this.state.days,
      dishes: this.state.dishes,
      assignments: this.state.assignments,
      reset: this.handleReset,
      deleteItem: this.handleDeleteItem,
      addItem: this.handleAddItem,
      addAssignment: this.handleAddAssignment,
      setDuplicateError: this.handleSetDuplicateError,
      error: this.state.error,
    };
    return (
      <Context.Provider value={value}>
        <div className="App">
          <nav className="App__nav">{this.renderNavRoutes()}</nav>
          <main className='App'>{this.renderMainRoutes()}</main>
        </div>
      </Context.Provider>
    );
  }  
}

export default App;
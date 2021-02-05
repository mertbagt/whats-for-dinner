import  React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Nav from '../Nav/Nav';
import About from '../About/About';
import WeekMenu from '../WeekMenu/WeekMenu';
import Context from '../Context';
import config from '../config';
import './App.css';

class App extends Component {
  state = {
    days: [],
    dishes: [],
    assignments: [],
    error: "",
  };

  componentDidMount() {
    Promise.all([
      fetch(`${config.API_ENDPOINT}/days`),
      fetch(`${config.API_ENDPOINT}/dishes`),
      fetch(`${config.API_ENDPOINT}/assignments`),
    ])
        .then(([daysRes, dishesRes, assignmentsRes]) => {
            if (!daysRes.ok)
              return daysRes.json().then(e => Promise.reject(e));
            if (!dishesRes.ok)
              return dishesRes.json().then(e => Promise.reject(e));
            if (!assignmentsRes.ok)
              return assignmentsRes.json().then(e => Promise.reject(e));     
            return Promise.all([daysRes.json(), dishesRes.json(), assignmentsRes.json()]);
        })
        .then(([days, dishes, assignments]) => {
            this.setState({days, dishes, assignments});
        })
        .catch(error => {
            console.error({error});
        });
  }

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
    fetch(`${config.API_ENDPOINT}/assignments`)
      .then(res => {
        if(!res.ok) {
          throw new Error('Something went wrong, please try again later');
        }
        return res.json();
      })  
    .then(assignments => {
        this.setState({assignments});
    })
    .catch(error => {
        console.error({error});
    });
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
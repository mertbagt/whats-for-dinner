import  React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Context from '../Context';
import Item from '../Item/Item';
import './WeekMenuList.css';

class WeekMenuList extends Component {
  static contextType = Context;

  handleMenuToggle = e => {
    e.preventDefault();

    let y = document.getElementById(this.props.name + "__id")
    
    if (y.style.display === "none") {
      y.style.display = "block";
    } else {
      y.style.display = "none";
    }
  }

  render() {
    const { dishes, assignments } = this.context
    const dayMenu = []
  
    const dayAssignments = assignments.filter(assignment => assignment.dayId === this.props.day);

    dayAssignments.forEach(assignment => {
      dishes.forEach(dish => {

        if (assignment.dishId === dish.dishId) {
          let menuItem = {};
          
          menuItem["assignmentId"] = assignment.assignmentId;
          menuItem["dishId"] = dish.dishId;
          menuItem["dishCategory"] = dish.dishCategory;
          menuItem["dishName"] = dish.dishName;
          dayMenu.push(menuItem);
        }
      })
    })

    return (
      <div>
        <h2>
          <Link 
            to={`/weekmenu`}
            onClick={this.handleMenuToggle}
          >
            {this.props.name}
          </Link>  
        </h2>
        <table className={this.props.name + "__list"} id={this.props.name + "__id"}>
          <tbody>
            {dayMenu.map((menuItem, index) => 
              <Item key={index} subkey={index} id={menuItem.dishId} assignment={menuItem.assignmentId} category={menuItem.dishCategory} name={menuItem.dishName} day={this.props.day}></Item>
            )}
          </tbody>
        </table>
      </div>
    );
  }  
}

export default WeekMenuList;
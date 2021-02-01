import React, {Component} from 'react';
import Context from '../Context';
import AddItem from '../AddItem/AddItem';
import WeekMenuList from '../WeekMenuList/WeekMenuList';
import './WeekMenu.css';

class WeekMenu extends Component {
  static contextType = Context;

  render() {
    const { days } = this.context

    return (
      <>
        <AddItem></AddItem>
        <div className="WeekManu">
          {days.map(day => 
            <WeekMenuList key={day.dayName} day={day.dayId} name={day.dayName}></WeekMenuList>    
          )}
        </div>
      </>
    );
  }  
}

export default WeekMenu;
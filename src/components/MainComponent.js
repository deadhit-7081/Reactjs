import React, { Component } from 'react';
import Menu from './MenuComponent';
import DishDetail from './DishDetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import {DISHES} from '../shared/dishes';

class Main extends Component {
  constructor(props)
  {
    super(props)
    {
      this.state=
      {
        dishes :DISHES,
        selectedDish:null
      };
    }
}
    onDishSelect(dishId)
    {
      this.setState({

        selectedDish:dishId
      })
    }
  render () {
  return (
    <div>
      <Header/>
      <Menu jai={this.state.dishes} clk={(dishId) => this.onDishSelect(dishId)}/>
      <DishDetail ddetail={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]}/>
      <Footer/>
    </div>
  );
  }
}

export default Main;

import React, { Component } from 'react';
import Menu from './MenuComponent';
import {Navbar, NavbarBrand } from 'reactstrap';
import DishDetail from './DishDetailComponent';
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
    <div className="App">
      <Navbar dark color="primary">
      <div class="container">
        <NavbarBrand href="/">Webhit</NavbarBrand>
      </div>
      </Navbar>
      <Menu jai={this.state.dishes} clk={(dishId) => this.onDishSelect(dishId)}/>
      <DishDetail ddetail={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]}/>
    </div>
  );
  }
}

export default Main;

import React, { Component } from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import DishDetail from './DishDetailComponent';
import About from './AboutusComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import {Switch,Route,Redirect,withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { addComment } from '../redux/ActionCreator';

const mapStateToProps = state =>
{
  return{
    dishes:state.dishes,
    comments:state.comments,
    promotions:state.promotions,
    leaders:state.leaders
};
}

const mapDispatchToProps = (dispatch) => ({
  addComment:(dishId,rating,author,comment) => dispatch(addComment(dishId,rating,author,comment) )
})

class Main extends Component {
  constructor(props)
  {
    super(props)
  }
  render () {
    const HomePage = () => 
    {
      return(
        <Home featuredish={this.props.dishes.filter((di) => di.featured)[0]}
        featurepromotion={this.props.promotions.filter((promo) => promo.featured)[0]}
        featureleader={this.props.leaders.filter((leader) => leader.featured)[0]}
        />
      )
    }

    const DishWithId = ({match}) =>
    {
      return(
        <DishDetail ddetail={this.props.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
         cmnts={this.props.comments.filter((cmnt) => cmnt.dishId === parseInt(match.params.dishId,10))}
         addComment={this.props.addComment}/>
     
         )
    }
  return (
    <div>
      <Header/>
      <Switch>
        <Route path="/home" component={HomePage}/>
        <Route path="/aboutus" component={() => <About leaders={this.props.leaders}/>}/>
        <Route exact path="/menu" component={() => <Menu jai={this.props.dishes}/>}/>
        <Route path="/menu/:dishId" component={DishWithId}/>
        <Route exact path="/contactus" component={Contact}/>
        <Redirect to="/home"/>
      </Switch>
      <Footer/>
    </div>
  );
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));

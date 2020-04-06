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
import { addComment , fetchDishes} from '../redux/ActionCreator';
import { actions } from 'react-redux-form';

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
  addComment:(dishId,rating,author,comment) => dispatch(addComment(dishId,rating,author,comment) ),
  fetchDishes: () => {dispatch(fetchDishes())},
  restFeedbackForm: () => {dispatch(actions.reset('feedback'))}
})

class Main extends Component {
  constructor(props)
  {
    super(props)
  }

  componentDidMount()
  {
    this.props.fetchDishes();
  }

  render () {
    const HomePage = () => 
    {
      return(
        <Home featuredish={this.props.dishes.dishes.filter((di) => di.featured)[0]}
        dishesLoading={this.props.dishes.isLoading}
        dishesErrMess={this.props.dishes.errMess}
        featurepromotion={this.props.promotions.filter((promo) => promo.featured)[0]}
        featureleader={this.props.leaders.filter((leader) => leader.featured)[0]}
        />
      )
    }

    const DishWithId = ({match}) =>
    {
      return(
        <DishDetail ddetail={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
         isLoading={this.props.dishes.isLoading}
         errMess={this.props.dishes.errMess}
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
        <Route exact path="/contactus" component={() => <Contact resetFeedbackForm={this.props.restFeedbackForm}/>}/>
        <Redirect to="/home"/>
      </Switch>
      <Footer/>
    </div>
  );
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));

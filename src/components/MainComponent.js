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
import { postComment , fetchDishes , fetchComments,fetchPromos,fetchLeader,postFeedback} from '../redux/ActionCreator';
import { actions } from 'react-redux-form';
import { TransitionGroup,CSSTransition } from 'react-transition-group';

const mapStateToProps = state =>
{
  return{
    dishes:state.dishes,
    comments:state.comments,
    promotions:state.promotions,
    leaders:state.leaders,
};
}

const mapDispatchToProps = (dispatch) => ({
  postComment:(dishId,rating,author,comment) => dispatch(postComment(dishId,rating,author,comment) ),
  fetchDishes: () => {dispatch(fetchDishes())},
  restFeedbackForm: () => {dispatch(actions.reset('feedback'))},
  fetchComments: () => {dispatch(fetchComments())},
  fetchPromos: () => {dispatch(fetchPromos())},
  fetchLeader: () => {dispatch(fetchLeader())},
  postFeedback:(firstname,lastname,telnum,email,agree,contactType,message) => 
  {dispatch(postFeedback(firstname,lastname,telnum,email,agree,contactType,message))}
})

class Main extends Component {
  constructor(props)
  {
    super(props)
  }

  componentDidMount()
  {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeader();
  }

  render () {
    const HomePage = () => 
    {
      return(
        <Home featuredish={this.props.dishes.dishes.filter((di) => di.featured)[0]}
        dishesLoading={this.props.dishes.isLoading}
        dishesErrMess={this.props.dishes.errMess}
        featurepromotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
        promosLoading={this.props.promotions.isLoading}
        promosErrMess={this.props.promotions.errMess}
        featureleader={this.props.leaders.leader.filter((leader) => leader.featured)[0]}
        leaderLoading={this.props.leaders.isLoading}
        leaderErrMess={this.props.leaders.errMess}
        />
      )
    }

    const DishWithId = ({match}) =>
    {
      return(
        <DishDetail ddetail={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
         isLoading={this.props.dishes.isLoading}
         errMess={this.props.dishes.errMess}
         cmnts={this.props.comments.comments.filter((cmnt) => cmnt.dishId === parseInt(match.params.dishId,10))}
         commentsErrMess={this.props.comments.errMess}
         postComment={this.props.postComment}/>
         )
    }
  return (
    <div>
      <Header/>
      <TransitionGroup>
        <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
      <Switch>
        <Route path="/home" component={HomePage}/>
        <Route path="/aboutus" component={() => <About leaders={this.props.leaders}/>}/>
        <Route exact path="/menu" component={() => <Menu jai={this.props.dishes}/>}/>
        <Route path="/menu/:dishId" component={DishWithId}/>
        <Route exact path="/contactus" component={() => <Contact resetFeedbackForm={this.props.restFeedbackForm}
        postFeedback={this.props.postFeedback}/>}/>
        <Redirect to="/home"/>
      </Switch>
      </CSSTransition>
      </TransitionGroup>
      <Footer/>
    </div>
  );
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));

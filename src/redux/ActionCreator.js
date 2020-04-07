import * as ActionType from './ActionTypes';
import { DISHES } from '../shared/dishes';
import { basrUrl, baseUrl } from '../shared/baseUrL';//to communicate with server

export const addComment = (dishId,rating,author,comment) => ({
    type :ActionType.ADD_COMMENT,
    payload:{
        dishId:dishId,
        rating:rating,
        author:author,
        comment:comment
    }
});
//thunk
export const fetchDishes = () => (dispatch) =>
{
    dispatch(dishesLoading(true));

    return fetch(baseUrl+'dishes')
        .then(response => response.json())
        .then(dishes => dispatch(addDishes(dishes)));
};

export const dishesLoading = () => ({
    type:ActionType.DISHES_LOADING
});

export const dishesFailed= (errmess) => ({
    type:ActionType.DISHES_FAILED,
    payload:errmess
});

export const addDishes = (dishes) => ({
    type:ActionType.ADD_DISHES,
    payload:dishes
});

export const fetchComments = () => (dispatch) =>
{

    return fetch(baseUrl+'comments')
        .then(response => response.json())
        .then(comments => dispatch(addComments(comments)));
};
export const commentsFailed= (errmess) => ({
    type:ActionType.COMMENTS_FAILED,
    payload:errmess
});

export const addComments = (comments) => ({
    type:ActionType.ADD_COMMENTS,
    payload:comments
});

export const fetchPromos = () => (dispatch) =>
{
    dispatch(promosLoading(true));

    return fetch(baseUrl+'promotions')
        .then(response => response.json())
        .then(promos => dispatch(addPromos(promos)));
};

export const promosLoading = () => ({
    type:ActionType.PROMOS_LOADING
});

export const promosFailed= (errmess) => ({
    type:ActionType.PROMOS_FAILED,
    payload:errmess
});

export const addPromos = (promos) => ({
    type:ActionType.ADD_PROMOS,
    payload:promos
});
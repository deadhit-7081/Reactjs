import * as ActionType from './ActionTypes';
import {  baseUrl } from '../shared/baseUrL';//to communicate with server

export const addComment = (comment) => ({
    type :ActionType.ADD_COMMENT,
    payload:comment
});

export const postComment = (dishId,rating,author,comment) => (dispatch) =>
{
    const newComment = 
    {
        dishId:dishId,
        rating:rating,
        author:author,
        comment:comment
    };
    newComment.date = new Date().toISOString();

    return fetch(baseUrl + 'comments' , {
        method:'POST',
        body:JSON.stringify(newComment),
        headers:
        {
            'Content-Type':'application/json'
        },
        credentials:'same-origin'
    })
    .then(response => 
        {
            if(response.ok)
            {
                return response;
            }
            else{
                var error = new Error('Error '+response.status + ': '+response.statusText)
                error.response = response;
                throw error;
            }
        },
        error => {
            var errmess= new Error(error.message);
            throw errmess;
        }
        )
        .then(response => response.json())
        .then(response => dispatch(addComment(response)))
        .catch(error => {console.log('Post Comments ',error.message);
        alert('Your Comment Could not be posted')})
}
//thunk
export const fetchDishes = () => (dispatch) =>
{
    dispatch(dishesLoading(true));

    return fetch(baseUrl+'dishes')
        .then(response => 
            {
                if(response.ok)
                {
                    return response;
                }
                else{
                    var error = new Error('Error '+response.status + ': '+response.statusText)
                    error.response = response;
                    throw error;
                }
            },
            error => {
                var errmess= new Error(error.message);
                throw errmess;
            }
            )
        .then(response => response.json())
        .then(dishes => dispatch(addDishes(dishes)))
        .catch(error => dispatch(dishesFailed(error.message)));
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
    .then(response => 
        {
            if(response.ok)
            {
                return response;
            }
            else{
                var error = new Error('Error '+response.status + ': '+response.statusText)
                error.response = response;
                throw error;
            }
        },
        error => {
            var errmess= new Error(error.message);
            throw errmess;
        }
        )
        .then(response => response.json())
        .then(comments => dispatch(addComments(comments)))
        .catch(error => dispatch(commentsFailed(error.message)));
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
    .then(response => 
        {
            if(response.ok)
            {
                return response;
            }
            else{
                var error = new Error('Error '+response.status + ': '+response.statusText)
                error.response = response;
                throw error;
            }
        },
        error => {
            var errmess= new Error(error.message);
            throw errmess;
        }
        )
        .then(response => response.json())
        .then(promos => dispatch(addPromos(promos)))
        .catch(error => dispatch(promosFailed(error.message)));
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

export const fetchLeader = () => (dispatch) =>
{
    dispatch(leaderLoading(true));

    return fetch(baseUrl+'leaders')
    .then(response => 
        {
            if(response.ok)
            {
                return response;
            }
            else{
                var error = new Error('Error '+response.status + ': '+response.statusText)
                error.response = response;
                throw error;
            }
        },
        error => {
            var errmess= new Error(error.message);
            throw errmess;
        }
        )
        .then(response => response.json())
        .then(leader => dispatch(addLeader(leader)))
        .catch(error => dispatch(leaderFailed(error.message)));
};

export const leaderLoading = () => ({
    type:ActionType.LEADER_LOADING
});

export const leaderFailed= (errmess) => ({
    type:ActionType.LEADER_FAILED,
    payload:errmess
});

export const addLeader = (leader) => ({
    type:ActionType.ADD_LEADER,
    payload:leader
});
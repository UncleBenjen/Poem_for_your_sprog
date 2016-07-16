import fetch from 'isomorphic-fetch'
const constants = require('../constants')

function fetchComments(url, sort = 'new') {
  return dispatch => {
    dispatch({ type: constants.FETCH_COMMENTS })
    return fetch(url + '/api/comments?sort=' + sort)
      .then(req => req.json())
      .then(json => dispatch(receiveComments(json)))
  }
}

function receiveComments(json) {

  return {
    type: constants.RECEIVE_COMMENTS,
    json: json,
    receivedAt: Date.now()
  }
}
/****/
function fetchComment(url, depth = 1){
  return dispatch => {
    dispatch({ type: constants.FETCH_COMMENTS_COMMENT })
    return fetch(url + '/api/comments?sort=' + sort)
      .then(req => req.json())
      .then(json => dispatch(receiveComments(json)))
  }
}

function receiveComment(json){
  return {
    type: constants.RECEIVE_COMMENT,
    json: json,
    receivedAt: Date.now()
  }
}
/****/
function changeFilter(url, filter){
  return dispatch => {
    dispatch({
      type: constants.CHANGE_FILTER,
      filter: filter,
      receivedAt: Date.now()
    })
   return fetch(url + '/api/comments?sort=' + filter)
      .then(req => req.json())
      .then(json => dispatch(receiveComments(json)))
  }
}

function selectComment(id){
  return{
    type: constants.SELECT_COMMENT,
    id: id,
    receivedAt: Date.now()
  }
}

function nextComment(){

  return{type: constants.NEXT_COMMENT}
}
function prevComment(){
  
  return{type: constants.PREV_COMMENT}
}

module.exports = { fetchComments, receiveComments, fetchComment, receiveComment, selectComment, changeFilter, nextComment, prevComment }

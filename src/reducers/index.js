import { combineReducers } from 'redux'
import {
  SELECT_SUBREDDIT,
  SELECT_POST,
  INVALIDATE_SUBREDDIT,
  REQUEST_POSTS,
  RECEIVE_POSTS, 
  REQUEST_COMMENTS,
  RECEIVE_COMMENTS,
  ADD_POST
} from '../actions'


function selectedPost(state = '0000', action) {
  //debugger
  switch (action.type) {
    case SELECT_POST:
      return action.post.id
    case REQUEST_COMMENTS: 
      return action.post.id
    default:
      return state
  }
}
function selectedSubreddit(state = 'react', action) {
  switch (action.type) {
    case SELECT_SUBREDDIT:
      return action.subreddit
    default:
      return state
  }
}

function comments (
  state = {
    isFetching: false,
    didInvalidate: false,
    items: []
  },
  action
) {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
      return Object.assign({}, state, {
        didInvalidate: true
      })
    case REQUEST_COMMENTS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case RECEIVE_COMMENTS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.comments,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}

function posts(
  state = {
    isFetching: false,
    didInvalidate: false,
    items: []
  },
  action
) {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
      return Object.assign({}, state, {
        didInvalidate: true
      })
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case RECEIVE_POSTS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.posts,
        lastUpdated: action.receivedAt
      })
      case ADD_POST:
       return [
          ...state,
          {
            id: action.id,
            title: action.title,
            deleted: action.deleted
          }
       ]
    default:
      return state
  }
}

function commentsByPost(state = {}, action) {
  //debugger
  switch (action.type) {

    case INVALIDATE_SUBREDDIT:
    case RECEIVE_COMMENTS:
    case REQUEST_COMMENTS:
      debugger
      return Object.assign({}, state, {
        [action.post.id]: comments(state[action.post.id], action)
      })
    default:
      return state
  }
}
function postsBySubreddit(state = {}, action) {
 // debugger
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
    case RECEIVE_POSTS:
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        [action.subreddit]: posts(state[action.subreddit], action)
      })
    default:
      return state
  }
}

const rootReducer = combineReducers({
  postsBySubreddit,
  commentsByPost,
  selectedSubreddit,
  selectedPost
})

export default rootReducer
import fetch from 'isomorphic-fetch'

export const ADD_POST = 'ADD_POST'
export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const REQUEST_COMMENTS = 'REQUEST_COMMENTS'
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'
export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT'
export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT'

let nextPostId = Date.now().toString()

export function addPost(category) {
  return {
    type: ADD_POST,
    id: nextPostId++,
    deleted: false,
    category
  }
}

export function selectSubreddit(subreddit) {
  return {
    type: SELECT_SUBREDDIT,
    subreddit
  }
}

export function invalidateSubreddit(subreddit) {
  return {
    type: INVALIDATE_SUBREDDIT,
    subreddit
  }
}

function requestComments(post) {
	return{
		type: REQUEST_COMMENTS,
		post
	}
}

function receiveComments(post, json){
	return {
		type: RECEIVE_COMMENTS,
		post,
		comments: json,
		receivedAt:Date.now()
	}
}

function requestPosts(subreddit) {
  return {
    type: REQUEST_POSTS,
    subreddit
  }
}

function receivePosts(subreddit, json) {
  return {
    type: RECEIVE_POSTS,
    subreddit,
    posts: json,
    receivedAt: Date.now()
  }
}


function createPost(category) {
  return dispatch => {
    dispatch(addPost(category))
    return fetch(`http://localhost:3001/posts/comments`,
      {
        headers: { 'Authorization': 'whatever-you-want' }
      })
      .then(response => response.json())
      .then(json => dispatch(receivePosts(category, json)))
  }
}
function fetchComments(subreddit) {
  return dispatch => {
    dispatch(requestComments(subreddit))
    return fetch(`http://localhost:3001/posts/8xf0y6ziyjabvozdd253nd/comments`,
      {
        headers: { 'Authorization': 'whatever-you-want' }
      })
      .then(response => response.json())
      .then(json => dispatch(receiveComments(subreddit, json)))
  }
}

function fetchPosts(subreddit) {
  return dispatch => {
    dispatch(requestPosts(subreddit))
    return fetch(`http://localhost:3001/${subreddit}/posts`,{
          headers: { 'Authorization': '1234abc' }
      })
      .then(response => response.json())
      .then(json => dispatch(receivePosts(subreddit, json)))
  }
}

function shouldFetchComments(state, subreddit) {
  const comments = state.commentsByPost[subreddit]
  if (!comments) {
    return true
  } else if (comments.isFetching) {
    return false
  } else {
    return comments.didInvalidate
  }
}

export function fetchCommentsIfNeeded(subreddit) {
	debugger;
  return (dispatch, getState) => {
    if (shouldFetchComments(getState(), subreddit)) {
      return dispatch(fetchComments(subreddit))
    }
  }
}
function shouldFetchPosts(state, subreddit) {
  const posts = state.postsBySubreddit[subreddit]
  if (!posts) {
    return true
  } else if (posts.isFetching) {
    return false
  } else {
    return posts.didInvalidate
  }
}

export function fetchPostsIfNeeded(subreddit) {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), subreddit)) {
      return dispatch(fetchPosts(subreddit))
    }
  }
}
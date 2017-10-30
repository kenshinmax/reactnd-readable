import React, { Component } from 'react'
import PostItem from './PostItem'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
  fetchCommentsIfNeeded
} from '../actions'

class Posts extends Component {

  constructor(props) {
    super(props)
  }
 
  render() {
  	var classes = "accordion " + this.props.theme;
    const { comments, getComments } = this.props
    return (

     <div className={classes} role="tablist">
      
        {this.props.posts.map((post, i) => (
          
        	<PostItem 
             key={i} 
             itemId={i}
             item={post}
             comments={ () => getComments(post) }/>
        	))
        }
      
     </div>
    )
  }
}

Posts.propTypes = {
  posts: PropTypes.array.isRequired
}

function mapStateToProps(state) {
  const { commentsByPost } = state
  const { items: comments } = commentsByPost || { items: [] }
  return {
    comments
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getComments: (data) => dispatch(fetchCommentsIfNeeded(data))
  }
} 


export default connect(mapStateToProps,  mapDispatchToProps)(Posts)
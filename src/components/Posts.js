import React, { Component } from 'react'
import PostItem from './PostItem'

import PropTypes from 'prop-types'

export default class Posts extends Component {
  render() {
  	var classes = "accordion " + this.props.theme;
    return (
     
     <div className={classes} role="tablist">

      
        {this.props.posts.map((post, i) => (
          
        	<PostItem key={i} itemId={i} title={post.title} />
        	))
        }
      
     </div>
    )
  }
}

Posts.propTypes = {
  posts: PropTypes.array.isRequired
}
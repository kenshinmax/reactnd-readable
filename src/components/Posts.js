import React, { Component } from 'react'
import PostItem from './PostItem'
import PropTypes from 'prop-types'


 export default class Posts extends Component {

  constructor(props) {
    super(props)
  }
 
  render() {
  	var classes = "accordion " + this.props.theme;
    return (

     <div className={classes} role="tablist">
      
        {this.props.posts.map((post, i) => (
          
        	<PostItem 
             key={i} 
             itemId={i}
             item={post} />
        	))
        }
      
     </div>
    )
  }


}
Posts.propTypes = {
  posts: PropTypes.array.isRequired
}


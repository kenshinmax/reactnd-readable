import React, { Component } from 'react'
import styles from './postitem.css';
import Comments from './Comments'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  selectPost,
  fetchCommentsIfNeeded
} from '../actions'

class PostItem extends Component {

   constructor(props) {
   	  super(props)
   	  this.state={
   	  	expanded: this.props.expanded,
   	  	itemId: this.props.itemId,
   	  	post: this.props.item
   	  }
   	  this.handleClick = this.handleClick.bind(this)
   }
  componentDidMount() {
   	const { choosePost, getComments, item} = this.props
   	//debugger
    choosePost(item)
    getComments(item)
  }
  componentDidUpdate(prevProps) {
    console.log("PostItem is updating!!")

  }
  /*
  componentWillMount() {
    const { selectPosted, choosePost, getComments, item } = this.props
    choosePost(item)
    getComments(item)
  }
  */
  expand(){
   	  this.setState({ expanded:true })
   }
   collapse() {
   	  this.setState( { expanded:false })
   }
   toggleExpansion() {
   	  this.setState({ expanded: !this.state.expanded })
   }
   handleClick(post) {
   	  this.toggleExpansion()
   }
   handleKeyPress(event) {
   	var key = event.keyCode;
			console.log(event);
				
			// Enter
			if (key === 13) {
					this.toggleExpansion(); 
			}
				
			// Esc
			if (key === 27) {
					this.collapse();
			}
   }
   render() {
   	    var classes = "accordion " + this.props.theme;
				var expandState = this.state.expanded ? 'is-collapsed' : 'is-expanded',
				hiddenState = this.state.expanded ? '' : 'hidden',
				hiddenClass = this.state.expanded ? 'visually-hidden' : 'visually-hiddenz',
				ariaHiddenState = this.state.expanded ? 'false' : 'true',
				ariaExpandedState = this.state.expanded ? 'true' : 'false',
				tabState = this.state.expanded ? '0' : '-1',
				classes = "accordion-item " + expandState,
				selectedState = this.state.expanded ? 'true' : 'false',
				uniqueId = this.state.itemId,
				title = this.state.post.title,
				body = this.state.post.body

				const { selectedPost, comments, item } = this.props
                
   	  return (
      
			<div id={uniqueId} className={classes}>
			    <h2>{selectedPost}</h2>
          <h2>{item.id}</h2>         
				<header value={item.id} onClick={this.handleClick} onKeyDown={this.handleKeyPress} tabIndex="0" role="tab" aria-selected={selectedState} aria-controls={uniqueId} aria-expanded={ariaExpandedState}>
					<span>{title}</span>
				</header>
				<section id={uniqueId} aria-hidden={ariaHiddenState} onKeyDown={this.handleKeyPress}>
						<p>{body}</p>
						{ comments !== 'undefined' &&
				          <div>
				            <div id="comment-container">
				               <Comments comments={comments}/>
				            </div>
				          </div>}
				</section>
				
			</div>
   	  )
   }
}

PostItem.propTypes = {
  selectedPost: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired
}

function mapStateToProps(state) {
  const { selectedPost, commentsByPost, post } = state
  const { items: comments } = commentsByPost[selectedPost] || { isFetching: true, items: [] }
  return {
    selectedPost,
    comments
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getComments: (data) => dispatch(fetchCommentsIfNeeded(data)),
    choosePost: (data) => dispatch(selectPost(data))
  }
} 


export default connect(mapStateToProps, mapDispatchToProps)(PostItem)


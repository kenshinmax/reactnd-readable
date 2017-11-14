import React, { Component } from 'react'

import PropTypes from 'prop-types'

export default class Comments extends Component {

	constructor(props) {
		super(props)
		//debugger
	}
	
	render() {
		return(

	      <ul className='comments-list'>
	        {this.props.comments.map((comment, i) => <li key={i}> {comment.body}</li>)}
	      </ul>
		)
	}
}

Comments.propTypes = {
	comments: PropTypes.array.isRequired
}

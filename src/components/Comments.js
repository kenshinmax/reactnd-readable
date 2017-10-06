import React, { Component } from 'react'


export default class Comments extends Component {
	render() {
		return(
	      <ul className='comments-list'>
	        {this.props.comments.map((comment, i) => <li key={i}> {comment.body}</li>)}
	      </ul>
		)
	}
}


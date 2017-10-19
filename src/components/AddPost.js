import React from 'react'
import { connect } from 'react-redux'
import { addPost } from '../actions'

let AddPost = ({ dispatch }) => {
  let input

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault()
          if (!input.value.trim()) {
            return
          }
          debugger;
          dispatch(addPost(input.value))
          input.value = ''
        }}
      >
        <input
          ref={node => {
            input = node
          }}
        />
        <button type="submit">
          Add Post
        </button>
      </form>
    </div>
  )
}
AddPost = connect()(AddPost)

export default AddPost
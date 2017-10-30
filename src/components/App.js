import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  selectSubreddit,
  fetchPostsIfNeeded,
  invalidateSubreddit
} from '../actions'
import Picker from '../components/Picker'
import Posts from '../components/Posts'
import AddPost from '../components/AddPost'

class AsyncApp extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleRefreshClick = this.handleRefreshClick.bind(this)
  }

  componentDidMount() {
    const { selectedSubreddit, selectPost } = this.props
    selectPost(selectedSubreddit)
  }

  componentDidUpdate(prevProps) {
    if (this.props.selectedSubreddit !== prevProps.selectedSubreddit) {
      const { selectPost, selectedSubreddit } = this.props
      selectPost(selectedSubreddit)
    }
  }

  handleChange(nextSubreddit) {
    const { chooseSubreddit } = this.props
    chooseSubreddit(nextSubreddit)
    //selectPost(nextSubreddit)
  }

  handleRefreshClick(e) {
    e.preventDefault()
    const {selectPost, selectedSubreddit } = this.props
    invalidateSubreddit(selectedSubreddit)
    selectPost(selectedSubreddit)
  }

  render() {
    const { selectedSubreddit, posts, isFetching, lastUpdated} = this.props
    return (
      <div className="container">
        <Picker
          value={selectedSubreddit}
          onChange={this.handleChange}
          options={['react', 'frontend', 'redux']}
        />
        <p>
          {lastUpdated &&
            <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
              {' '}
            </span>}
          {!isFetching &&
            <a href="#" onClick={this.handleRefreshClick}>
              Refresh
            </a>}
        </p>
        <AddPost />
        {isFetching && posts.length === 0 && <h2>Loading...</h2>}
        {!isFetching && posts.length === 0 && <h2>Empty.</h2>}
        {posts.length > 0 &&
          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <div id="accordions">
               <Posts theme="blue" toggleType="all" posts={posts} />
            </div>
          </div>}
      </div>
    )
  }
}

AsyncApp.propTypes = {
  selectedSubreddit: PropTypes.string.isRequired,
  posts: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number
}

function mapStateToProps(state) {
  const { selectedSubreddit, postsBySubreddit } = state
  const {
    isFetching,
    lastUpdated,
    items: posts
  } = postsBySubreddit[selectedSubreddit] || {
    isFetching: true,
    items: []
  }

  return {
    selectedSubreddit,
    posts,
    isFetching,
    lastUpdated
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    selectPost: (data) => dispatch(fetchPostsIfNeeded(data)),
    chooseSubreddit: (data) => dispatch(selectSubreddit(data)),
    invalidateSubreddit: (data) => dispatch(invalidateSubreddit(data))
  }
}

export default connect(mapStateToProps,  mapDispatchToProps)(AsyncApp)
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Navbar from '../Navbar'
import StoriesSlick from '../StoriesSlick'
import Post from '../Post'
import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProcess: 'INPROCESS',
}

class Home extends Component {
  state = {
    storiesArray: [],
    postsArray: [],
    apiStoriesStatus: apiConstants.initial,
    apiPostStatus: apiConstants.initial,
    searchText: '',
    showSearchResult: false,
  }

  componentDidMount() {
    this.getStoryDetails()
    this.getPostDetails()
  }

  changeInput = event => {
    this.setState({searchText: event.target.value})
  }

  searchPosts = async () => {
    const {searchText} = this.state

    if (searchText.trim() === '') {
      this.getPostDetails()
      return
    }
    this.setState(prev => ({
      apiPostStatus: apiConstants.inProcess,
      showSearchResult: true,
    }))

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/insta-share/posts?search=${searchText}`
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }

    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updatedResults = data.posts.map(each => ({
        postId: each.post_id,
        userId: each.user_id,
        userName: each.user_name,
        profilePic: each.profile_pic,
        postImage: each.post_details.image_url,
        caption: each.post_details.caption,
        likesCount: each.likes_count,
        comments: each.comments,
        createdAt: each.created_at,
      }))

      this.setState({
        postsArray: updatedResults,
        apiPostStatus: apiConstants.success,
      })
    } else {
      this.setState({apiPostStatus: apiConstants.failure})
    }
  }

  getPostDetails = async () => {
    this.setState({
      apiPostStatus: apiConstants.inProcess,
      showSearchResult: false,
    })

    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }

    const response = await fetch(
      'https://apis.ccbp.in/insta-share/posts',
      options,
    )
    if (response.ok) {
      const data = await response.json()
      const updatedPosts = data.posts.map(each => ({
        postId: each.post_id,
        userId: each.user_id,
        userName: each.user_name,
        profilePic: each.profile_pic,
        postImage: each.post_details.image_url,
        caption: each.post_details.caption,
        likesCount: each.likes_count,
        comments: each.comments,
        createdAt: each.created_at,
      }))
      this.setState({
        postsArray: updatedPosts,
        apiPostStatus: apiConstants.success,
      })
    } else {
      this.setState({apiPostStatus: apiConstants.failure})
    }
  }

  getStoryDetails = async () => {
    this.setState({apiStoriesStatus: apiConstants.inProcess})

    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }

    const response = await fetch(
      'https://apis.ccbp.in/insta-share/stories',
      options,
    )
    if (response.ok) {
      const data = await response.json()
      const storiesList = data.users_stories.map(each => ({
        userId: each.user_id,
        userName: each.user_name,
        storyUrl: each.story_url,
      }))
      this.setState({
        storiesArray: storiesList,
        apiStoriesStatus: apiConstants.success,
      })
    } else {
      this.setState({apiStoriesStatus: apiConstants.failure})
    }
  }

  renderSearchResultsHeading = () => <h1>Search Results</h1>

  renderPosts = () => {
    const {apiPostStatus, postsArray, searchText, showSearchResult} = this.state

    switch (apiPostStatus) {
      case apiConstants.success:
        if (searchText.trim() !== '' && postsArray.length === 0) {
          return (
            <div className="failure-container">
              <img
                src="https://res.cloudinary.com/dyfu3aiar/image/upload/v1764512391/Group_bug6oa.png"
                alt="search not found"
                className="no-search-image"
              />
              <h1>Search Not Found</h1>
              <p>Try different keyword or search again</p>
            </div>
          )
        }

        return (
          <>
            {showSearchResult && this.renderSearchResultsHeading()}
            {postsArray.map(eachPost => (
              <Post key={eachPost.postId} eachPost={eachPost} />
            ))}
          </>
        )

      case apiConstants.failure:
        return (
          <div className="failure-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
              alt="failure view"
            />
            <p>Something went wrong. Please try again</p>
            <button type="button" onClick={this.searchPosts}>
              Try again
            </button>
          </div>
        )

      case apiConstants.inProcess:
        return (
          <div className="spinner-container" testid="loader">
            <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
          </div>
        )

      default:
        return null
    }
  }

  renderStories = () => {
    const {apiStoriesStatus, storiesArray} = this.state
    switch (apiStoriesStatus) {
      case apiConstants.success:
        return <StoriesSlick storiesArray={storiesArray} />
      case apiConstants.failure:
        return (
          <div className="failure-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
              alt="failure view"
            />
            <p>Something went wrong. Please try again</p>
            <button type="button" onClick={this.getStoryDetails}>
              Try again
            </button>
          </div>
        )
      case apiConstants.inProcess:
        return (
          <div className="spinner-container" testid="loader">
            <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
          </div>
        )
      default:
        return null
    }
  }

  render() {
    const {showSearchResult} = this.state
    return (
      <div className="home-page">
        <Navbar
          isActive="home"
          changeInput={this.changeInput}
          searchPosts={this.searchPosts}
        />
        {!showSearchResult && (
          <div className="stories-container">{this.renderStories()}</div>
        )}
        <ul className="post-list">{this.renderPosts()}</ul>
      </div>
    )
  }
}

export default Home

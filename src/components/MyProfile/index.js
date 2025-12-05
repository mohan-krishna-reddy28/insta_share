import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import {BsGrid3X3} from 'react-icons/bs'
import {BiCamera} from 'react-icons/bi'
import Loader from 'react-loader-spinner'

import Navbar from '../Navbar'
import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProcess: 'INPROCESS',
}

const ProfileStories = props => {
  const {stories} = props
  return (
    <ul className="stories-container">
      {stories.map(eachStory => (
        <li className="story-item" key={eachStory.id}>
          <img
            src={eachStory.image}
            alt="my story"
            className="profile-stories"
          />
        </li>
      ))}
    </ul>
  )
}

const ProfilePosts = props => {
  const {posts} = props

  if (posts.length === 0) {
    return (
      <div className="no-post-container">
        <BiCamera size={30} />
        <h1 className="no-post">No Posts</h1>
      </div>
    )
  }

  return (
    <ul className="profile-post-container">
      {posts.map(eachPost => (
        <li className="profile-post-item" key={eachPost.id}>
          <img
            src={eachPost.image}
            alt="my post"
            className="profile-post-image"
          />
        </li>
      ))}
    </ul>
  )
}

class MyProfile extends Component {
  state = {myProfile: {}, apiStatus: apiConstants.initial}

  componentDidMount() {
    this.getDetails()
  }

  getDetails = async () => {
    this.setState({apiStatus: apiConstants.inProcess})

    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/insta-share/my-profile'
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }

    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const {profile} = data

      const updated = {
        userName: profile.user_name,
        userId: profile.user_id,
        userBio: profile.user_bio,
        profilePic: profile.profile_pic,
        postsCount: profile.posts_count,
        followersCount: profile.followers_count,
        followingCount: profile.following_count,
        posts: profile.posts.map(each => ({id: each.id, image: each.image})),
        stories: profile.stories.map(each => ({
          id: each.id,
          image: each.image,
        })),
      }

      this.setState({myProfile: updated, apiStatus: apiConstants.success})
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  renderSuccess = () => {
    const {myProfile} = this.state

    return (
      <div className="profile-container">
        <div className="profile-section">
          <img
            src={myProfile.profilePic}
            alt="my profile"
            className="profile-img"
          />
          <div className="profile-content">
            <h1 className="profile-name">{myProfile.userName}</h1>
            <div className="counts-section">
              <img
                src={myProfile.profilePic}
                alt="my profile"
                className="mobile-profile-img"
              />
              <p className="follower-count">{myProfile.postsCount} posts</p>
              <p className="follower-count">
                {myProfile.followersCount} Followers
              </p>
              <p className="follower-count">
                {myProfile.followingCount} Following
              </p>
            </div>
            <p className="profile-id">{myProfile.userId}</p>

            <p className="profile-bio">{myProfile.userBio}</p>
          </div>
        </div>

        <ProfileStories stories={myProfile.stories} />
        <hr />

        <div className="posts-title">
          <BsGrid3X3 />
          <h1 className="post-heading">Posts</h1>
        </div>

        <ProfilePosts posts={myProfile.posts} />
      </div>
    )
  }

  renderFailure = () => (
    <div className="failure-container">
      <img
        src="https://res.cloudinary.com/dyfu3aiar/image/upload/v1764485563/alert-triangle_un64un.png"
        alt="failure view"
      />

      <p>Something went wrong. Please try again</p>

      <button type="button" onClick={this.getDetails}>
        Try again
      </button>
    </div>
  )

  renderLoader = () => (
    <div testid="loader" className="loader-view">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  renderProfile = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.success:
        return this.renderSuccess()
      case apiConstants.failure:
        return this.renderFailure()
      case apiConstants.inProcess:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }

    return (
      <div className="profile-page">
        <Navbar
          isActive="profile"
          changeInput={this.changeInput}
          searchPosts={this.searchPosts}
        />
        {this.renderProfile()}
      </div>
    )
  }
}

export default MyProfile

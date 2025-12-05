import {Component} from 'react'
import Cookies from 'js-cookie'
import {withRouter} from 'react-router-dom'
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
            alt="user story"
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
            alt="user post"
            className="profile-post-image"
          />
        </li>
      ))}
    </ul>
  )
}
class UserProfile extends Component {
  state = {userProfile: {}, apiStatus: apiConstants.initial}

  componentDidMount() {
    this.getUserProfile()
  }

  getUserProfile = async () => {
    this.setState({apiStatus: apiConstants.inProcess})

    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {userId} = match.params

    const url = `https://apis.ccbp.in/insta-share/users/${userId}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)

    if (response.ok) {
      const data = await response.json()
      const userDetails = data.user_details

      const updatedProfile = {
        id: userDetails.id,
        userId: userDetails.user_id,
        userName: userDetails.user_name,
        profilePic: userDetails.profile_pic,
        followersCount: userDetails.followers_count,
        followingCount: userDetails.following_count,
        userBio: userDetails.user_bio,
        posts: userDetails.posts.map(p => ({
          id: p.id,
          image: p.image,
        })),
        stories: userDetails.stories.map(s => ({
          id: s.id,
          image: s.image,
        })),
        postsCount: userDetails.posts_count,
      }

      this.setState({
        userProfile: updatedProfile,
        apiStatus: apiConstants.success,
      })
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  renderSuccess = () => {
    const {userProfile} = this.state

    return (
      <div className="profile-container">
        <div className="profile-section">
          <img
            src={userProfile.profilePic}
            alt="user profile"
            className="profile-img"
          />
          <div className="profile-content">
            <h1 className="profile-name">{userProfile.userName}</h1>
            <div className="counts-section">
              <img
                src={userProfile.profilePic}
                alt="user profile"
                className="mobile-profile-img"
              />
              <p className="follower-count">{userProfile.postsCount} posts</p>
              <p className="follower-count">
                {userProfile.followersCount} Followers
              </p>
              <p className="follower-count">
                {userProfile.followingCount} Following
              </p>
            </div>
            <p className="profile-id">{userProfile.userId}</p>

            <p className="profile-bio">{userProfile.userBio}</p>
          </div>
        </div>

        <ProfileStories stories={userProfile.stories} />
        <hr />

        <div className="posts-title">
          <BsGrid3X3 />
          <h1 className="post-heading">Posts</h1>
        </div>

        <ProfilePosts posts={userProfile.posts} />
      </div>
    )
  }

  renderProcess = () => (
    <div className="loading-container" testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  renderFailure = () => (
    <div className="loading-container">
      <img
        src="https://res.cloudinary.com/dyfu3aiar/image/upload/v1764485563/alert-triangle_un64un.png"
        alt="failure view"
      />
      <p>Something went wrong. Please try again.</p>
      <button onClick={this.getUserProfile} type="button">
        Try Again
      </button>
    </div>
  )

  renderSwitch = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.success:
        return this.renderSuccess()
      case apiConstants.failure:
        return this.renderFailure()
      case apiConstants.inProcess:
        return this.renderProcess()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="my-profile-page">
        <Navbar isActive="profile" />
        {this.renderSwitch()}
      </div>
    )
  }
}

export default withRouter(UserProfile)

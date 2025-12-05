import {BiCamera} from 'react-icons/bi'
import './index.css'

const UserProfilePost = props => {
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
        <li key={eachPost.id} className="profile-post-item">
          <img
            src={eachPost.image}
            alt="user post" // Test Case 147: Alt attribute
            className="profile-post-image"
          />
        </li>
      ))}
    </ul>
  )
}
export default UserProfilePost

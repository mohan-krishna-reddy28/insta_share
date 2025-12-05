import {useState} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {BsHeart, BsHeartFill} from 'react-icons/bs'
import {FaRegComment} from 'react-icons/fa'
import {BiShareAlt} from 'react-icons/bi'
import './index.css'

const Post = ({eachPost}) => {
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(eachPost.likesCount)

  const toggleLike = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/insta-share/posts/${eachPost.postId}/like`
    const body = {like_status: !isLiked}

    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }

    await fetch(url, options)

    setIsLiked(prev => !prev)
    setLikeCount(prev => (isLiked ? prev - 1 : prev + 1))
  }

  const {
    postId,
    userId,
    userName,
    profilePic,
    postImage,
    caption,
    comments,
    createdAt,
  } = eachPost

  return (
    <li key={postId} className="post-item">
      <Link to={`/users/${userId}`} className="post-name-container">
        <div className="image-container">
          <img
            src={profilePic}
            alt="post author profile"
            className="profile-pic"
          />
        </div>
        <h1 className="post-username">{userName}</h1>
      </Link>

      <div className="post-image-container">
        <img src={postImage} alt="post" className="post-pic" />
      </div>

      <div className="more-details">
        <div className="post-icons-container">
          {isLiked ? (
            <button
              type="button"
              className="like-icon-btn"
              onClick={toggleLike}
              testid="unLikeIcon"
            >
              <BsHeartFill size={20} />
            </button>
          ) : (
            <button
              type="button"
              className="like-icon-btn"
              onClick={toggleLike}
              testid="likeIcon"
            >
              <BsHeart size={20} />
            </button>
          )}

          <FaRegComment size={20} />
          <BiShareAlt size={20} />
        </div>

        <p className="likes-count">{likeCount} likes</p>
        <p className="caption">{caption}</p>

        <ul className="comments-list">
          {comments.map(eachComment => (
            <li className="comment-item" key={eachComment.user_id}>
              <span className="comment-name">{eachComment.user_name}</span>
              <p className="comment-msg">{eachComment.comment}</p>
            </li>
          ))}
        </ul>

        <p className="created-at">{createdAt}</p>
      </div>
    </li>
  )
}

export default Post

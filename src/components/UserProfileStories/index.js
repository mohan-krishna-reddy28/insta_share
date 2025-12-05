import './index.css'

const UserProfileStories = props => {
  const {stories} = props
  return (
    <ul className="stories-container">
      {stories.map(eachStory => (
        <li key={eachStory.id} className="story-item">
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
export default UserProfileStories

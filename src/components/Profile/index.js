import './index.css'

const Profile = props => {
  const {profileDetails} = props
  const {name, profileImageUrl, shortBio} = profileDetails
  return (
    <div className="profile-container">
      <img src={profileImageUrl} alt="profile" />
      <h1 className="profile-name">{name}</h1>
      <p className="short-bio">{shortBio}</p>
    </div>
  )
}

export default Profile

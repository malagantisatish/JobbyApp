import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {ImLocation} from 'react-icons/im'
import {FaShoppingBag} from 'react-icons/fa'
import './index.css'

const JobItems = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobDetails

  return (
    <Link to={`/jobs/${id}`} className="link-item">
      <li className="job-item-container">
        <div className="title-section">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="company-logo-img"
          />
          <div className="heading-rating-container">
            <h1 className="job-title">{title}</h1>
            <div className="rating-container">
              <AiFillStar className="star" />
              <p className="rating-text">{rating}</p>
            </div>
          </div>
        </div>
        <div className="location-salary-type">
          <div className="about-job">
            <ImLocation className="location-icon" />
            <p className="text">{location}</p>
            <div className="about-job">
              <FaShoppingBag className="bag-icon" />
              <p className="text">{employmentType}</p>
            </div>
          </div>

          <p className="text">{packagePerAnnum}</p>
        </div>
        <hr className="h-line" />
        <h1 className="description-heading">Description</h1>
        <p className="description">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobItems

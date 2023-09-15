import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {ImLocation} from 'react-icons/im'
import {FaShoppingBag} from 'react-icons/fa'
import './index.css'

const SimilarJobs = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    rating,
    title,
  } = jobDetails
  return (
    <Link to={`/jobs/${id}`} className="similar-products-link">
      <li className="similar-job-card">
        <div className="company-details">
          <img
            src={companyLogoUrl}
            alt="similar job company logo"
            className="image-size"
          />
          <div>
            <h1 className="title">{title}</h1>
            <div className="rating-container">
              <AiFillStar className="star" />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>
        <hr className="h-line" />
        <h1 className="headings">Description</h1>
        <p className="description">{jobDescription}</p>
        <div className="location-job-type">
          <div className="location-job">
            <ImLocation className="icons" />
            <p className="text">{location}</p>
          </div>
          <div className="location-job">
            <FaShoppingBag className="icons" />
            <p className="text">{employmentType}</p>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default SimilarJobs

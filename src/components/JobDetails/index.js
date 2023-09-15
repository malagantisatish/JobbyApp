import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {v4 as uuidv4} from 'uuid'
import {AiFillStar} from 'react-icons/ai'
import {FiExternalLink} from 'react-icons/fi'
import {ImLocation} from 'react-icons/im'
import {FaShoppingBag} from 'react-icons/fa'
import Cookies from 'js-cookie'
import Header from '../Header'
import SimilarJobs from '../SimilarJobs'
import './index.css'

const apiStatusConstants = {
  intial: 'INITIAL',
  inProcess: 'PROCESS',
  success: 'SUCCESS',
  failure: 'FAIL',
}

class JobDetails extends Component {
  state = {
    jobData: [],
    apiStatus: apiStatusConstants.intial,
    similarJobsList: [],
    skillSet: [],
    lifeAtCompany: [],
  }

  componentDidMount() {
    this.getTheJobDetails()
  }

  getTheLifeAtCompany = data => ({
    description: data.description,
    imageUrl: data.image_url,
  })

  getTheSkills = data => ({
    name: data.name,
    imageUrl: data.image_url,
    id: uuidv4(),
  })

  getTheFormattedData = data => ({
    companyLogoUrl: data.company_logo_url,
    companyWebsiteUrl: data.company_website_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    lifeAtCompany: this.getTheLifeAtCompany(data.life_at_company),
    location: data.location,
    packagePerAnnum: data.package_per_annum,
    rating: data.rating,
    title: data.title,
    skills: data.skills.map(each => this.getTheSkills(each)),
  })

  getTheSimilarJobs = each => ({
    companyLogoUrl: each.company_logo_url,
    employmentType: each.employment_type,
    id: each.id,
    jobDescription: each.job_description,
    location: each.location,
    rating: each.rating,
    title: each.title,
  })

  getTheJobDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const token = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    this.setState({apiStatus: apiStatusConstants.inProcess})

    const response = await fetch(url, options)
    const data = await response.json()
    // console.log(data)

    if (response.ok) {
      const formattedData = this.getTheFormattedData(data.job_details)
      // console.log(formattedData)
      const similarJobs = data.similar_jobs.map(each =>
        this.getTheSimilarJobs(each),
      )
      // console.log(similarJobs)

      this.setState({
        jobData: formattedData,
        similarJobsList: similarJobs,
        apiStatus: apiStatusConstants.success,
        skillSet: formattedData.skills,
        lifeAtCompany: formattedData.lifeAtCompany,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderTheJobDetails = () => {
    const {jobData, skillSet, lifeAtCompany} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      title,
      id,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
    } = jobData

    return (
      <div className="job-details-card">
        <div className="company-details-container">
          <img
            src={companyLogoUrl}
            alt="job details company logo"
            className="company-logo"
          />
          <div className="heading-rating-container">
            <h1>{title}</h1>
            <div className="rating-container">
              <AiFillStar className="star" />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="location-job-type">
          <div className="location-job-items">
            <ImLocation className="icons" />
            <p className="text">{location}</p>
            <div className="location-job-items">
              <FaShoppingBag className="icons" />
              <p className="text">{employmentType}</p>
            </div>
          </div>

          <div className="location-job-items">
            <p className="text">{packagePerAnnum}</p>
          </div>
        </div>
        <hr className="h-line" />
        <div>
          <div className="description-visit-list">
            <h1 className="headings">Description</h1>
            <div className="company-url-container">
              <a href={companyWebsiteUrl} className="link">
                Visit
              </a>
              <FiExternalLink className="icons" />
            </div>
          </div>
          <p className="description">{jobDescription}</p>
          <h1 className="headings">Skills</h1>
          <ul className="skills-container">
            {skillSet.map(each => (
              <li className="skill-card" key={each.id}>
                <img
                  src={each.imageUrl}
                  alt={each.name}
                  className="skill-image-sizes"
                />
                <p className="skills">{each.name}</p>
              </li>
            ))}
          </ul>
          <div className="life-at-company">
            <div>
              <h1 className="headings">Life at Company</h1>
              <p className="description">{lifeAtCompany.description}</p>
            </div>
            <img
              src={lifeAtCompany.imageUrl}
              alt="life at company"
              className="company-image"
            />
          </div>
        </div>
      </div>
    )
  }

  renderTheSimilarJobs = () => {
    const {similarJobsList} = this.state

    return (
      <>
        <h1 className="similar-job-heading">Similar Jobs</h1>
        <ul className="similar-jobs-container">
          {similarJobsList.map(each => (
            <SimilarJobs key={each.id} jobDetails={each} />
          ))}
        </ul>
      </>
    )
  }

  renderTheSuccessView = () => (
    <>
      <div className="job-details">{this.renderTheJobDetails()}</div>
      {this.renderTheSimilarJobs()}
    </>
  )

  renderTheLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  failureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button
        className="retry-btn"
        type="button"
        onClick={this.getTheJobDetails}
      >
        Retry
      </button>
    </div>
  )

  renderTheView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProcess:
        return this.renderTheLoadingView()
      case apiStatusConstants.success:
        return this.renderTheSuccessView()
      case apiStatusConstants.failure:
        return this.failureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="job-details-container">
        <Header />
        {this.renderTheView()}
      </div>
    )
  }
}

export default JobDetails

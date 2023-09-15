import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Header from '../Header'
import Profile from '../Profile'
import Filter from '../Filter'
import JobItems from '../JobItems'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  intial: 'INITIAL',
  inProcess: 'PROCESS',
  success: 'SUCCESS',
  failure: 'FAIL',
}

class JobRoute extends Component {
  state = {
    apiStatus: apiStatusConstants.intial,
    profileData: [],
    jobsList: [],
    apiStatusForProfile: apiStatusConstants.intial,
    searchInput: '',
    salaryRange: '',
    employmentTypeList: [],
  }

  componentDidMount() {
    this.getTheProfileData()
    this.getTheJobData()
  }

  getSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  getTheProfileData = async () => {
    const token = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    this.setState({apiStatusForProfile: apiStatusConstants.inProcess})

    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const formattedData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }

      console.log(formattedData)
      this.setState({
        apiStatusForProfile: apiStatusConstants.success,
        profileData: formattedData,
      })
    } else {
      this.setState({apiStatusForProfile: apiStatusConstants.failure})
    }
  }

  getTheJobData = async () => {
    const {searchInput, employmentTypeList, salaryRange} = this.state
    const employmentTypes = employmentTypeList.join(',')
    console.log(employmentTypes)

    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentTypes}&minimum_package=${salaryRange}&search=${searchInput}`
    const token = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    this.setState({apiStatus: apiStatusConstants.inProcess})

    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const formattedData = data.jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))
      console.log(formattedData)
      this.setState({
        jobsList: formattedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderTheFailureViewForProfile = () => (
    <div className="profile-failure-view">
      <button
        type="button"
        className="retry-button"
        onClick={this.getTheProfileData}
      >
        Retry
      </button>
    </div>
  )

  renderTheProfile = () => {
    const {profileData} = this.state
    return <Profile profileDetails={profileData} />
  }

  setTheSalaryRange = id => {
    console.log(id)
    this.setState({salaryRange: id}, this.getTheJobData)
  }

  searchTheJob = () => {
    this.getTheJobData()
  }

  setTheEmploymentTypesList = id => {
    const {employmentTypeList} = this.state
    if (employmentTypeList.includes(id)) {
      const updatedList = employmentTypeList.filter(each => each !== id)
      this.setState({employmentTypeList: updatedList}, this.getTheJobData)
    } else {
      this.setState(
        prevState => ({
          employmentTypeList: [...prevState.employmentTypeList, id],
        }),
        this.getTheJobData,
      )
    }
  }

  renderTheNoJobsView = () => (
    <div className="no-job-found">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="no-job-view"
      />
      <h1>No Jobs Found</h1>
      <p>We could not find any jobs. Try other filters</p>
    </div>
  )

  renderTheFailureView = () => (
    <div className="no-job-found">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="no-job-view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button
        type="button"
        className="retry-button"
        onClick={this.getTheJobData}
      >
        Retry
      </button>
    </div>
  )

  renderTheJobs = () => {
    const {jobsList, searchInput} = this.state

    const lengthOfJobList = jobsList.length
    return (
      <div className="jobs-container">
        <div className="search-container-md">
          <input
            type="search"
            className="search-input-md"
            placeholder="Search"
            value={searchInput}
            onChange={this.getSearchInput}
          />
          <button
            type="button"
            className="search-btn"
            data-testid="searchButton"
            onClick={this.searchTheJob}
          >
            <BsSearch />
          </button>
        </div>
        {lengthOfJobList > 0 ? (
          <ul className="job-list">
            {jobsList.map(each => (
              <JobItems key={each.id} jobDetails={each} />
            ))}
          </ul>
        ) : (
          this.renderTheNoJobsView()
        )}
      </div>
    )
  }

  renderTheLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderTheLoaderForProfile = () => (
    <div className="loader-container-for-profile" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderTheJobsStatus = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProcess:
        return this.renderTheLoader()
      case apiStatusConstants.failure:
        return this.renderTheFailureView()
      case apiStatusConstants.success:
        return this.renderTheJobs()

      default:
        return null
    }
  }

  renderTheProfileView = () => {
    const {searchInput} = this.state
    return (
      <div className="profile-and-filter-container">
        <div className="search-container-sm">
          <input
            type="search"
            className="search-input-sm"
            placeholder="Search"
            value={searchInput}
            onChange={this.getSearchInput}
          />
          <button
            type="button"
            className="search-btn"
            data-testid="searchButton"
            onClick={this.searchTheJob}
          >
            <BsSearch />
          </button>
        </div>
        {this.renderTheProfileStatus()}
        <hr className="line" />
        <Filter
          employmentTypesList={employmentTypesList}
          salaryRangesList={salaryRangesList}
          setTheSalaryRange={this.setTheSalaryRange}
          setTheEmploymentTypesList={this.setTheEmploymentTypesList}
        />
      </div>
    )
  }

  renderTheProfileStatus = () => {
    const {apiStatusForProfile} = this.state
    switch (apiStatusForProfile) {
      case apiStatusConstants.inProcess:
        return this.renderTheLoaderForProfile()
      case apiStatusConstants.failure:
        return this.renderTheFailureViewForProfile()
      case apiStatusConstants.success:
        return this.renderTheProfile()

      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="jobs-route-bg-container">
          {this.renderTheProfileView()}
          {this.renderTheJobsStatus()}
        </div>
      </>
    )
  }
}

export default JobRoute

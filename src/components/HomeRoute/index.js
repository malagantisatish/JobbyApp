import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Header from '../Header'
import './index.css'

class HomeRoute extends Component {
  getTheJobsPage = () => {
    const token = Cookies.get('jwt_token')
    const {history} = this.props

    if (token !== undefined) {
      history.replace('/jobs')
    } else {
      history.replace('./login')
    }
  }

  render() {
    return (
      <>
        <div className="bg-container-home-lg-device">
          <Header />
          <h1 className="home-heading">Find The Job That Fits Your Life</h1>
          <p className="home-description">
            Millions of people are searching for jobs,salary,information,company
            reviews.Find the job that fits your abilities and potential.
          </p>
          <Link to="/jobs">
            <button
              type="button"
              className="find-job-button"
              onClick={this.getTheJobsPage}
            >
              Find Jobs
            </button>
          </Link>
        </div>
        <div className="bg-container-home-sm-device">
          <Header />
          <h1 className="home-heading">Find The Job That Fits For Your Life</h1>
          <p className="home-description">
            Millions of people searching for jobs,salary,information,company
            reviews.Find the job that fits your abilities and potential.
          </p>
          <Link to="/jobs">
            <button type="button" className="find-job-button">
              Find Jobs
            </button>
          </Link>
        </div>
      </>
    )
  }
}

export default HomeRoute

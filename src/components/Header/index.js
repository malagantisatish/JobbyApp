import {Link, withRouter} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {FiLogOut} from 'react-icons/fi'
import {FaShoppingBag} from 'react-icons/fa'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const LogoutTheUser = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <nav className="navbar-container">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="website-logo-in-navbar"
        />
      </Link>
      <div className="navbar-laptop-device">
        <ul className="navbar-options-container-for-md">
          <Link to="/" className="link-items">
            <li className="nav-items">
              <h1>Home</h1>
            </li>
          </Link>
          <Link to="/jobs" className="link-items">
            <li className="nav-items">
              <h1>Home</h1>
            </li>
          </Link>
        </ul>
        <button type="button" className="logout-btn" onClick={LogoutTheUser}>
          Logout
        </button>
      </div>
      <div className="navbar-mobile-device">
        <ul className="home-jobs-container">
          <Link to="/">
            <li>
              <AiFillHome className="navbar-image" size={30} />
            </li>
          </Link>

          <Link to="/jobs">
            <li>
              <FaShoppingBag className="navbar-image" size={30} />
            </li>
          </Link>
        </ul>
        <button type="button" className="logout-btn-sm" onClick={LogoutTheUser}>
          <FiLogOut size={30} />
        </button>
      </div>
    </nav>
  )
}

export default withRouter(Header)

import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
    showErrorMsg: false,
  }

  getTheUsername = event => {
    this.setState({username: event.target.value})
  }

  getThePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = token => {
    const {history} = this.props
    Cookies.set('jwt_token', token, {expires: 30, path: '/'})
    history.replace('/')
  }

  onSubmitFailure = error => {
    this.setState({errorMsg: error, showErrorMsg: true})
  }

  submitTheLogin = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}

    const url = 'https://apis.ccbp.in/login'

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, errorMsg, showErrorMsg} = this.state
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-page-container">
        <div className="login-form-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
          />
          <form onSubmit={this.submitTheLogin}>
            <label htmlFor="username" className="label-text">
              USERNAME
            </label>
            <br />
            <input
              id="username"
              type="text"
              className="input-element"
              placeholder="Username"
              value={username}
              onChange={this.getTheUsername}
            />
            <br />
            <label htmlFor="password" className="label-text">
              PASSWORD
            </label>
            <br />
            <input
              id="password"
              type="password"
              className="input-element"
              placeholder="Password"
              value={password}
              onChange={this.getThePassword}
            />
            <br />
            <button type="submit" className="login-btn">
              Login
            </button>
          </form>
          {showErrorMsg && <p className="error-msg">*{errorMsg}</p>}
        </div>
      </div>
    )
  }
}

export default LoginForm

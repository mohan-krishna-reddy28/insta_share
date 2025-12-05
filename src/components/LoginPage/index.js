import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class LoginPage extends Component {
  state = {username: '', password: '', status: false, errorMsg: ''}

  SubmitDetails = async event => {
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
      const {history} = this.props
      Cookies.set('jwt_token', data.jwt_token, {expires: 2})
      history.replace('/')
    } else {
      this.setState({status: true, errorMsg: data.error_msg})
    }
  }

  changeUsername = event => {
    this.setState({username: event.target.value})
  }

  changePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {username, password, status, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-page">
        <div className="login-container">
          <img
            className="login-image"
            src="https://res.cloudinary.com/dyfu3aiar/image/upload/v1764254696/Illustration_mibqid.png"
            alt="website login"
          />

          <form className="login-form" onSubmit={this.SubmitDetails}>
            <div className="logo-container">
              <img
                className="company-logo"
                src="https://res.cloudinary.com/dyfu3aiar/image/upload/v1764256838/logo_ukrjmc.png"
                alt="website logo"
              />
              <h1 className="company-name">Insta Share</h1>
            </div>

            <label htmlFor="inputUsername" className="label-content">
              USERNAME
            </label>
            <input
              id="inputUsername"
              type="text"
              placeholder="Username"
              className="input-field"
              value={username}
              onChange={this.changeUsername}
            />

            <label htmlFor="inputPassword" className="label-content">
              PASSWORD
            </label>
            <input
              id="inputPassword"
              type="password"
              placeholder="Password"
              className="input-field"
              value={password}
              onChange={this.changePassword}
            />

            <button className="login-btn" type="submit">
              Login
            </button>

            {status && <p className="error-msg">{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default LoginPage

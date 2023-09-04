import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {userId: '', pin: '', errorMsg: '', showError: false}

  onChangeUserId = e => {
    this.setState({userId: e.target.value})
  }

  onChangePinId = e => {
    this.setState({pin: e.target.value})
  }

  onSubmitForm = async e => {
    e.preventDefault()
    const {userId, pin} = this.state
    const api = 'https://apis.ccbp.in/ebank/login'
    const details = {
      user_id: userId,
      pin,
    }
    const option = {
      method: 'POST',
      body: JSON.stringify(details),
    }
    const response = await fetch(api, option)
    const data = await response.json()
    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    history.replace('/')
  }

  onSubmitFailure = error => {
    this.setState({errorMsg: error, showError: true})
  }

  render() {
    const {userId, pin, errorMsg, showError} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-main-container">
        <div className="sub-container">
          <div className="left-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png "
              alt="website login"
              className="website-logo"
            />
          </div>

          <div className="right-container">
            <h1 className="login-heading">Welcome Back!</h1>
            <form onSubmit={this.onSubmitForm} className="form-container">
              <div className="input-container">
                <label className="input-label" htmlFor="user-id">
                  User ID
                </label>
                <input
                  className="input"
                  id="user-id"
                  placeholder="Enter User ID"
                  type="text"
                  onChange={this.onChangeUserId}
                  value={userId}
                />
              </div>
              <div className="input-container">
                <label className="input-label" htmlFor="pin-id">
                  PIN
                </label>
                <input
                  className="input"
                  placeholder="Enter PIN"
                  id="pin-id"
                  type="password"
                  onChange={this.onChangePinId}
                  value={pin}
                />
              </div>
              <button className="login-button" type="submit">
                Login
              </button>
              {showError ? <p className="error-msg">*{errorMsg}</p> : ''}
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Login

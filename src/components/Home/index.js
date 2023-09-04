import {Component} from 'react'
import Header from '../Header'
import './index.css'

class Home extends Component {
  render() {
    return (
      <>
        <Header />
        <div className="home-main-container">
          <h1 className="main-heading">Your Flexibility, Our Excellence</h1>
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png "
            alt="digital card"
            className="card-image"
          />
        </div>
      </>
    )
  }
}

export default Home

import {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import {FaSearch} from 'react-icons/fa'
import Cookies from 'js-cookie'
import './index.css'

class Navbar extends Component {
  state = {showMenu: false, showSearch: false}

  toggleMenu = () => {
    this.setState(prev => ({showMenu: !prev.showMenu}))
  }

  toggleSearch = () => {
    this.setState(prev => ({showSearch: !prev.showSearch}))
  }

  logout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  render() {
    const {isActive, changeInput, searchPosts} = this.props
    const {showMenu, showSearch} = this.state

    return (
      <nav className="nav-container">
        <div className="nav-logo-section">
          <Link to="/" className="logo-link">
            <img
              src="https://res.cloudinary.com/dyfu3aiar/image/upload/v1764256838/logo_ukrjmc.png"
              alt="website logo"
              className="nav-logo"
            />
            <h1 className="logo-name">Insta Share</h1>
          </Link>

          <button type="button" className="hamburger" onClick={this.toggleMenu}>
            <img
              src="https://res.cloudinary.com/dyfu3aiar/image/upload/v1764304006/menu_lbegws.svg"
              alt="hamburger menu"
            />
          </button>
        </div>

        <ul className="nav-options">
          <li>
            <div className="search-container">
              <input
                type="search"
                placeholder="Search Caption"
                className="search-input"
                onChange={changeInput}
              />
              <button
                className="search-btn"
                type="button"
                testid="searchIcon"
                onClick={searchPosts}
              >
                <FaSearch size={15} />
              </button>
            </div>
          </li>
          <li>
            <Link to="/" className="link">
              <h1
                className={
                  isActive === 'home' ? 'link-name active' : 'link-name'
                }
              >
                Home
              </h1>
            </Link>
          </li>
          <li>
            <Link to="/my-profile" className="link">
              <h1
                className={
                  isActive === 'profile' ? 'link-name active' : 'link-name'
                }
              >
                Profile
              </h1>
            </Link>
          </li>
          <li>
            <button type="button" className="logout-btn" onClick={this.logout}>
              Logout
            </button>
          </li>
        </ul>

        {showMenu && (
          <>
            <ul className="mobile-view">
              <li>
                <Link to="/" className="link">
                  <h1
                    className={
                      isActive === 'home' ? 'link-name active' : 'link-name'
                    }
                  >
                    Home
                  </h1>
                </Link>
              </li>
              <li>
                <Link to="/my-profile" className="link">
                  <h1
                    className={
                      isActive === 'profile' ? 'link-name active' : 'link-name'
                    }
                  >
                    Profile
                  </h1>
                </Link>
              </li>

              <li>
                <button
                  className={`show-btn ${
                    showSearch ? 'search-button blue' : 'search-button'
                  }`}
                  type="button"
                  onClick={this.toggleSearch}
                >
                  Search
                </button>
              </li>

              <li>
                <button
                  type="button"
                  className="logout-btn"
                  onClick={this.logout}
                >
                  Logout
                </button>
              </li>

              <li>
                <button
                  className="close-btn"
                  type="button"
                  onClick={this.toggleMenu}
                >
                  <img
                    src="https://res.cloudinary.com/dyfu3aiar/image/upload/v1764498736/Solid_twgx57.png"
                    alt="close menu"
                  />
                </button>
              </li>
            </ul>

            {showSearch && (
              <div className="search-container mobile-search">
                <input
                  type="search"
                  placeholder="Search Caption"
                  className="search-input"
                  onChange={changeInput}
                />
                <button
                  className="search-btn"
                  type="button"
                  testid="searchIcon"
                  onClick={searchPosts}
                >
                  <FaSearch size={15} />
                </button>
              </div>
            )}
          </>
        )}
      </nav>
    )
  }
}

export default withRouter(Navbar)

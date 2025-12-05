import {Link} from 'react-router-dom' // Import Link

const NotFound = () => (
  <div>
    <img
      src="https://res.cloudinary.com/dyfu3aiar/image/upload/v1764486150/erroring_1_pvniuz.png"
      alt="page not found"
    />
    <h1>Page Not Found</h1>
    <p>
      we are sorry, the page you requested could not be found.Please go back to
      the homepage.
    </p>
    <Link to="/">
      <button type="button">Home Page</button>
    </Link>
  </div>
)

export default NotFound

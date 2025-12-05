import {Route, Switch, Redirect} from 'react-router-dom'
import LoginPage from './components/LoginPage'
import Home from './components/Home'
import MyProfile from './components/MyProfile'
import UserProfile from './components/UserProfile'
import NotFound from './components/NotFound'
import ProtectedPath from './components/ProtectedPath'
import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginPage} />
    <ProtectedPath exact path="/" component={Home} />
    <ProtectedPath exact path="/my-profile" component={MyProfile} />
    <ProtectedPath exact path="/users/:userId" component={UserProfile} />
    <Route exact path="/bad-path" component={NotFound} />
    <Redirect to="/bad-path" />
  </Switch>
)

export default App

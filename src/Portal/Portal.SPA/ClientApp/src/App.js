import React, { Component } from 'react'
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import './App.scss'

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>

const DefaultLayout = React.lazy(() => import('./common/DefaultLayout'))
const Login = React.lazy(() => import('./dashboard/Login'))

class App extends Component {
    render() {
        return (
            <Router>
                <React.Suspense fallback={loading()}>
                    <Switch>
                        <Route exact path="/login" name="Login Page" render={props => <Login {...props} />} />
                        <Route path="/" name="Home" render={props => <DefaultLayout {...props} />} />
                    </Switch>
                </React.Suspense>
            </Router>
        )
    }
}

export default App

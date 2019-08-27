import React, { Component } from 'react'
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import './App.scss'

if (process.env.NODE_ENV === 'development') {
    const whyDidYouRender = require('@welldone-software/why-did-you-render')
    whyDidYouRender(React)
}

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>

const DefaultLayout = React.lazy(() => import('./common/components/DefaultLayout'))

class App extends Component {
    render() {
        return (
            <Router>
                <React.Suspense fallback={loading()}>
                    <Switch>
                        <Route path="/" name="Home" render={props => <DefaultLayout {...props} />} />
                    </Switch>
                </React.Suspense>
            </Router>
        )
    }
}

export default App

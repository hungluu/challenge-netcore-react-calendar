import 'bootstrap/dist/css/bootstrap.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import AppStore from './common/config/store'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

const rootElement = document.getElementById('root')

ReactDOM.render(
    <Provider store={AppStore}>
        <App />
    </Provider>,
  rootElement)

registerServiceWorker()

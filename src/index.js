import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import Root from './Root'
import './index.css'
import { createStore } from 'redux'
import rootReducer from './reducers/rootReducer'

const store = createStore(rootReducer, 
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

ReactDOM.render(<Root store={store} />, document.getElementById("root"))

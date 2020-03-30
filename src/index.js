import React from 'react'
import ReactDOM from 'react-dom' // since react isn't used just in web application, this module needs to be imported to specify we are going to be use react to deal with the DOM in a browser environment
import App from './App'
import './index.css'
import {BrowserRouter as Router} from 'react-router-dom'

ReactDOM.render(<Router>
 <App/>
</Router>
, document.getElementById("root"))

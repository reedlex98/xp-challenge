import React, { Component } from 'react'
import "regenerator-runtime/runtime.js";
import Auth from './components/Auth'
import Main from './components/Main'
import Albums from './components/Albums'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'

class App extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { isAuth } = this.props
        return <>
            <div className="spotify-icon"></div>
            { !isAuth 
            ? <Route path="/" component={Auth}/> 
            : <>
                <Route path="/" exact component={Main} />
                <Route path="/albums/:albumId" exact component={Albums} />
            </>
            }
        </>
    }
}

function mapStateToProps({isAuth}) {
    return {
        isAuth
    }
}

export default connect(mapStateToProps)(App);
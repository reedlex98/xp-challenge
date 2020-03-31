import React, { Component } from 'react'
import { getHashParams, isTokenExpired, handleTokenRequest } from './helpers'
import "regenerator-runtime/runtime.js";
import Auth from './components/Auth'
import Main from './components/Main'
import __ from 'lodash'
import {connect} from 'react-redux'
import { auth, setToken, failToAuth} from './actions/actionCreators'

class App extends Component {
    constructor(props) {
        super(props)
        this.authStateKey = 'SPOTIFY_AUTH_STATE';
    }

    componentDidMount() {
        const {dispatch} = this.props
        const params = getHashParams()
        if (!__.isEmpty(params)) {
            const { access_token, state: receivedAuthState, expires_in} = params
            const storedState = localStorage.getItem(this.authStateKey)

            if (access_token && (receivedAuthState == null || receivedAuthState !== storedState)) {
                dispatch(failToAuth())
            } else {
                localStorage.removeItem(this.authStateKey);
                if (access_token){
                    const token = {
                        access_token,
                        expires_in,
                        created_at: new Date()
                    }
                    localStorage.setItem("token", JSON.stringify(token))
                    dispatch(auth(token))
                    dispatch(setToken(token))
                }
                else{
                    dispatch(failToAuth())
                }
            }
            window.history.pushState("", "", "/");
        }
    }

    render() {
        const {isAuth, failToAuth} = this.props
        return <>
            <div className="spotify-icon"></div>
            { !isAuth 
            ? <Auth handleTokenRequest={handleTokenRequest} failToAuth={failToAuth} /> 
            : <Main token={this.props.token}></Main>
            }
        </>
    }
}

function mapStateToProps(reduxState) {
    return {
        token: reduxState.token,
        isAuth: reduxState.isAuth,
        failToAuth: reduxState.failToAuth
    }
}

export default connect(mapStateToProps)(App);
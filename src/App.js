import React, { Component } from 'react'
import { getHashParams, generateRandomString, isTokenExpired } from './helpers'
import "regenerator-runtime/runtime.js";
import Auth from './components/Auth'
import Main from './components/Main'
import __ from 'lodash'

class App extends Component {
    constructor(props) {
        super(props)
        const storedToken = JSON.parse(localStorage.getItem("token"))
        this.state = {
            token: __.isEmpty(storedToken) ? {} : storedToken,
            failToAuth: false,
            isAuth: __.isEmpty(storedToken) ? false : !isTokenExpired(storedToken)
        }
        this.authStateKey = 'spotify_auth_state';
        this.handleTokenRequest = this.handleTokenRequest.bind(this)
    }

    componentDidMount() {
        const params = getHashParams()
        if (!__.isEmpty(params)) {
            const { access_token, state: receivedAuthState, expires_in} = params
            const storedState = localStorage.getItem(this.authStateKey)

            if (access_token && (receivedAuthState == null || receivedAuthState !== storedState)) {
                this.setState({failToAuth: true, isAuth: false})
            } else {
                localStorage.removeItem(this.authStateKey);
                if (access_token){
                    const token = {
                        value: access_token,
                        expires_in,
                        created_at: new Date()
                    }
                    localStorage.setItem("token", JSON.stringify(token))
                    this.setState({isAuth: true, token, failToAuth: false})
                }
                else{
                    this.setState({failToAuth: true, isAuth: false})
                }
            }
            window.history.pushState("", "", "/");
        }
    }
    handleTokenRequest() {
        const client_id = process.env.CLIENT_ID; // Your client id
        const redirect_uri = process.env.APP_URI; // Your redirect uri

        const authState = generateRandomString(16)
        localStorage.setItem(this.authStateKey, authState);

        const scope = 'user-read-private user-read-email streaming';

        let url = 'https://accounts.spotify.com/authorize';
        url += '?response_type=token';
        url += '&client_id=' + encodeURIComponent(client_id);
        url += '&scope=' + encodeURIComponent(scope);
        url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
        url += '&state=' + encodeURIComponent(authState);

        window.location = url;
    }
    render() {
        const {isAuth, failToAuth} = this.state
        return <>
            <div className="spotify-icon"></div>
            { !isAuth 
            ? <Auth handleTokenRequest={this.handleTokenRequest} failToAuth={failToAuth} /> 
            : <Main token={this.state.token}></Main>
            }
        </>
    }
}

export default App;
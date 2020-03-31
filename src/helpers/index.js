/**
 * Obtains parameters from the hash of the URL
 * @return Object
 */
import moment from 'moment'

export function getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while (e = r.exec(q)) {
        hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
}

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
export function generateRandomString(length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

export function isTokenExpired(token) {
    const storedToken = localStorage.getItem("token")
    if (storedToken) {
        token = JSON.parse(storedToken)
    }
    token.expires_in = parseInt(token.expires_in)
    const currentDate = new Date()
    return moment(currentDate).diff(token.created_at, 'seconds') > token.expires_in
}

export function handleTokenRequest() {

    const client_id = process.env.CLIENT_ID
    const redirect_uri = process.env.APP_URI
    const scope = 'user-read-private user-read-email streaming'
    const authState = generateRandomString(15)
    const authStateKey = "SPOTIFY_AUTH_STATE"
    
    localStorage.setItem(authStateKey, authState);

    let url = 'https://accounts.spotify.com/authorize';
    url += '?response_type=token';
    url += '&client_id=' + encodeURIComponent(client_id);
    url += '&scope=' + encodeURIComponent(scope);
    url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
    url += '&state=' + encodeURIComponent(authState);

    window.location = url;
}

import {AUTH, SET_TOKEN,FAIL_TO_AUTH} from './actionTypes'

export function setToken(token) {
    return {
        token,
        type: SET_TOKEN
    }
}

export function auth(token) {
    return {
        token,
        type: AUTH
    }
}
export function failToAuth() {
    return {
        type: FAIL_TO_AUTH
    }
}


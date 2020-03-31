import {AUTH, SET_TOKEN,FAIL_TO_AUTH, CASH_RESULTS} from './actionTypes'

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

export function cashResults(localStorageKey, dataToBeCashed) {
    return {
        type: CASH_RESULTS,
        localStorageKey,
        dataToBeCashed
    }
}


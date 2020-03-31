import {AUTH, CASH_RESULTS, UNSET_AUTH} from './actionTypes'

export function auth(hashParams) {
    return {
        hashParams,
        type: AUTH
    }
}

export function cashResults(localStorageKey, dataToBeCashed) {
    return {
        type: CASH_RESULTS,
        localStorageKey,
        dataToBeCashed
    }
}

export function unsetAuth(){
    return {
        type: UNSET_AUTH
    }
}


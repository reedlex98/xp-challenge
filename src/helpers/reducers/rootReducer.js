import { AUTH, CASH_RESULTS, UNSET_AUTH } from '../actions/actionTypes'
import __ from 'lodash'
import { isTokenExpired } from '..'
import { handleAuth } from '../../helpers'

const storedToken = JSON.parse(localStorage.getItem("token"))

const initialState = {
  token: storedToken,
  failToAuth: false,
  isAuth: !__.isEmpty(storedToken) && !isTokenExpired(storedToken),
  cachedResults: localStorage.getItem("cachedResults") && JSON.parse(localStorage.getItem("cachedResults"))
}

export default function rootReducer(state = initialState, action) {
  const { localStorageKey, dataToBeCashed, hashParams } = action
  let { cachedResults } = state
  let newState
  
  switch (action.type) {
    case AUTH:
      newState = handleAuth(hashParams, state, "SPOTIFY_AUTH_STATE")
      return { ...newState }
    case CASH_RESULTS:
      if (cachedResults) {
        cachedResults[localStorageKey] = dataToBeCashed
      }
      else {
        cachedResults = {
          [localStorageKey]: dataToBeCashed
        }
      }
      newState = {...state, cachedResults}
      cachedResults = JSON.stringify(cachedResults)
      localStorage.setItem("cachedResults", cachedResults)
      return newState
    case UNSET_AUTH:
      localStorage.removeItem("token")
      return {...state, isAuth: false, failToAuth: false, token: null}
    default:
      return state;
  }
}
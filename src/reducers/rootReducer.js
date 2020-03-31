import { AUTH, SET_TOKEN, FAIL_TO_AUTH, CASH_RESULTS } from '../actions/actionTypes'
import __ from 'lodash'
import { isTokenExpired } from '../helpers'

const storedToken = JSON.parse(localStorage.getItem("token"))

const initialState = {
  token: storedToken,
  failToAuth: false,
  isAuth: !__.isEmpty(storedToken) && !isTokenExpired(storedToken),
  cachedResults: localStorage.getItem("cachedResults") && JSON.parse(localStorage.getItem("cachedResults"))
}

export default function rootReducer(state = initialState, action) {
  const { token, localStorageKey, dataToBeCashed } = action
  let { cachedResults } = state
  
  switch (action.type) {
    case AUTH:
      return { ...state, isAuth: !__.isEmpty(token) && !isTokenExpired(token) }
    case SET_TOKEN:
      return { ...state, token }
    case FAIL_TO_AUTH:
      return { ...state, failToAuth: true, isAuth: false }
    case CASH_RESULTS:
      if (cachedResults) {
        cachedResults[localStorageKey] = dataToBeCashed
      }
      else {
        cachedResults = {
          [localStorageKey]: dataToBeCashed
        }
      }
      let newState = {...state, cachedResults}
      cachedResults = JSON.stringify(cachedResults)
      localStorage.setItem("cachedResults", cachedResults)
      return newState
    default:
      return state;
  }
}
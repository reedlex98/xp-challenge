import { AUTH, SET_TOKEN, FAIL_TO_AUTH } from '../actions/actionTypes'
import __ from 'lodash'
import { isTokenExpired } from '../helpers'

const storedToken = JSON.parse(localStorage.getItem("token"))

const initialState = {
  token: storedToken,
  failToAuth: false,
  isAuth: !__.isEmpty(storedToken) && !isTokenExpired(storedToken)
}

export default function rootReducer(state = initialState, action) {
  const { token } = action
  switch (action.type) {
    case AUTH:
      return { ...state, isAuth: !__.isEmpty(token) && !isTokenExpired(token) }
    case SET_TOKEN:
      return { ...state, token }
    case FAIL_TO_AUTH:
      return { ...state, failToAuth: true, isAuth: false}
    default:
      return state;
  }
}
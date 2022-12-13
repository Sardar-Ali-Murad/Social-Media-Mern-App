import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  LOGOUT_USER,
  UPLOAD_IMAGE,
  HANDLE_CHANGE,
  CLEAR_UPLOADS,
  CHANGE_PAGE,
  SUBMIT_PIN_ERROR,
  SUBMIT_PIN_SUCCESS,
  GET_ALL_PINS,
  SINGLE_PIN,
  CREATE_REVIEW_ERROR,
  CREATE_REVIEW_SUCCESS,
  GET_SINGLE_PIN_REVIEWS,
  CURRENT_USER_PINS,
  ALL_SAVED_PINS,
  CURRENT_USER_SAVEDPINS,
  DELETE_IMAGE

} from './actions'

import { initialState } from './appContext'

const reducer = (state, action) => {
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: 'danger',
      alertText: 'Please provide all values!',
    }
  }
  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertType: '',
      alertText: '',
    }
  }

  if (action.type === SETUP_USER_BEGIN) {
    return { ...state, isLoading: true }
  }
  if (action.type === SETUP_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      showAlert: true,
      alertType: 'success',
      alertText: action.payload.alertText,
    }
  }
  if (action.type === SETUP_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    }
  }

  if(action.type===LOGOUT_USER){
    return{
      ...initialState,
      token:null,
      user:null
    }
  }

  if(action.type===UPLOAD_IMAGE){
    return{
      ...state,
      image:action.payload.image
    }
  }

  if(action.type===HANDLE_CHANGE){
    return{
      ...state,
      [action.payload.name]:action.payload.value
    }
  }

  if(action.type===CLEAR_UPLOADS){
    return{
      ...state,
      // image:"",
      // tag:"",
      // title:"",
      // message:"",
    }
  }


  if(action.type===CHANGE_PAGE){
    return{
      ...state,
      page:action.payload.page
    }
  }

  if(action.type===SUBMIT_PIN_SUCCESS){
    return{
      ...state,
      showAlert:true,
      alertText:"Post Subbmited Successfully",
      alertType:"success"
    }
  }
  if(action.type===SUBMIT_PIN_ERROR){
    return{
      ...state,
      showAlert:true,
      alertText:action.payload.msg,
      alertType:"danger"
    }
  }

  if(action.type===GET_ALL_PINS){
    return{
      ...state,
      allPins:action.payload.Pins
    }
  }

  if(action.type===SINGLE_PIN){
    return{
      ...state,
      singlePin:action.payload.pin
    }
  }


  
  if(action.type===CREATE_REVIEW_SUCCESS){
    return{
      ...state,
      showAlert:true,
      alertText:"ReviewSubbmited Successfully",
      alertType:"success"
    }
  }
  if(action.type===CREATE_REVIEW_ERROR){
    return{
      ...state,
      showAlert:true,
      alertText:action.payload.msg,
      alertType:"danger"
    }
  }


  if(action.type===GET_SINGLE_PIN_REVIEWS){
    return{
      ...state,
      singlePinReviewsArray:action.payload.data
    }
  }

  if(action.type===CURRENT_USER_PINS){
    return{
      ...state,
      currentUserPins:action.payload.data
    }
  }



  if(action.type===ALL_SAVED_PINS){
    return{
      ...state,
      allSavedPins:action.payload.data
    }
  }


  if(action.type===CURRENT_USER_SAVEDPINS){
    return{
      ...state,
      currentUserSavedPins:action.payload.data
    }
  }

  if(action.type===DELETE_IMAGE){
    return{
      ...state,
      image:""
    }
  }


  throw new Error(`no such action : ${action.type}`)
}

export default reducer

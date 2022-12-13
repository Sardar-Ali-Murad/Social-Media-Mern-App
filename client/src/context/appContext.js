import React, { useReducer, useContext } from 'react'

import reducer from './reducer'
import axios from 'axios'

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
  DELETE_PIN,
  SINGLE_PIN,
  GET_SINGLE_PIN_REVIEWS,
  CREATE_REVIEW_SUCCESS,
  CREATE_REVIEW_ERROR,
  CURRENT_USER_PINS,
  ALL_SAVED_PINS,
  CURRENT_USER_SAVEDPINS,
  DELETE_IMAGE
 
} from './actions'
import { typographyClasses } from '@mui/material'
import { Action } from 'history'

const token = localStorage.getItem('token')
const user = localStorage.getItem('user')


const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
  user: user ? JSON.parse(user) : null,
  token: token,
  image:"",
  totalPages:1,
  page:1,

  
  allPins:[],

  singlePin:{},

  singlePinReviewsArray:[],

  homeSearch:"",

  currentUserPins:[],

  allSavedPins:[],
  currentUserSavedPins:[]
}

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const authFetch = axios.create({
    baseURL: '/api/v1',
  })
  // request

  authFetch.interceptors.request.use(
    (config) => {
      config.headers.common['Authorization'] = `Bearer ${state.token}`
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )
  // response

  authFetch.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      // console.log(error.response)
      // if (error.response.status === 401) {
      //   logoutUser()
      // }
      return Promise.reject(error)
    }
  )

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT })
    clearAlert()
  }

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT })
    }, 3000)
  }

  const addUserToLocalStorage = ({ user, token }) => {
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token', token)
    
  }

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  
  }

  const setupUser = async ({ currentUser, endPoint, alertText }) => {
    dispatch({ type: SETUP_USER_BEGIN })
    try {
      const { data } = await axios.post(`/api/v1/auth/${endPoint}`, currentUser)

      const { user, token } = data
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: { user, token, alertText },
      })
      addUserToLocalStorage({ user, token })
    } catch (error) {
      dispatch({
        type: SETUP_USER_ERROR,
        payload: { msg: error.response.data.msg },
      })
    }
    clearAlert()
  }
  

  function logoutUser(){
    dispatch({type:LOGOUT_USER})
    removeUserFromLocalStorage()
  }



  const uploadImage=async (event)=>{
    const imageFile = event.target.files[0];
    const formData = new FormData();
    formData.append('image',imageFile)
    try {
    //  const {data:{image:{src}}} = await axios.post("/api/v1/post/upload"

     const {data:{image:{src}}} = await axios.post("/api/v1/pins/upload"
    
     ,formData,{
      headers:{
       'Content-Type':'multipart/form-data'
      }
     }
     )
     dispatch({type:UPLOAD_IMAGE,
      payload:{
        image:src
      }
    })

    // console.log(src)
    } catch (error) {
      
     console.log(error.response.data.msg);
    }
  }

  function changeFunction(e){
    dispatch({type:HANDLE_CHANGE,
    payload:{
      name:e.target.name,
      value:e.target.value
    }})

    Pins()
  }


  function clearuploads(){
    dispatch({type:CLEAR_UPLOADS})
  }



  function changepage(page){
      dispatch({type:CHANGE_PAGE,payload:{page:page}})
  }


  const submitPin=async ({name,title,description,category})=>{
    try {
      await authFetch.post("/pins",{name,title,description,category,image:state.image})
      dispatch({type:SUBMIT_PIN_SUCCESS})
    } catch (error) {
      
      dispatch({type:SUBMIT_PIN_ERROR,payload:{msg:error.response.data.msg}})
    }

    clearAlert()
    delImage()
  }


  const Pins=async ()=>{
    try {
      let {data}=await authFetch.get("/pins",{homeSearch:state.homeSearch})
      // console.log(data)
      dispatch({type:GET_ALL_PINS,payload:{Pins:data.allPins}})
    } catch (error) {
      // console.log(error.response.data.msg)
    }
  }

  const deletePin=async (id)=>{
    try {
      await authFetch.delete(`/pins/${id}`)
    } catch (error) {
      // console.log(error.response.data.msg)
    }
    Pins()
    CurrentUserAllPins()
    AllSavedPins()
    CurrentUserSavedPins()
  }

  const deleteSavedPin=async (id)=>{
    try {
      await authFetch.delete(`/save/${id}`)
    } catch (error) {
      // console.log(error.response.data.msg)
    }
    // Pins()
    CurrentUserAllPins()
    // AllSavedPins()
    CurrentUserSavedPins()
  }
  
  
  const singlePinDetails=async (id)=>{
    try {
      let {data}=await authFetch(`/pins/${id}`)
      // console.log(data)
      dispatch({type:SINGLE_PIN,payload:{pin:data.singlePin}})
    } catch (error) {
      // console.log(error.response.data.msg)
    }
  }
  
  const singlePinReviews=async (id)=>{
    try {
      let {data}=await authFetch(`/reviews/${id}`)
      // console.log(data)
      dispatch({type:GET_SINGLE_PIN_REVIEWS,payload:{data:data.reviews}})
   } catch (error) {
    //  console.log(error.response.data.msg)
     
   }
 }


  const  createReview=async ({review,id})=>{
    try {
      await authFetch.post("/reviews",{review,pinId:id})
      dispatch({type:CREATE_REVIEW_SUCCESS})
      singlePinReviews(id)
    } catch (error) {
      dispatch({type:CREATE_REVIEW_ERROR,payload:{msg:error.response.data.msg}})
      
    }
    clearAlert()
 }


 const CurrentUserAllPins=async ()=>{
  try {
    let {data}=await authFetch.get("/pins/currentUser")
    // console.log(data)
    dispatch({type:CURRENT_USER_PINS,payload:{data:data.pins}})
  } catch (error) {
    // console.log(error.response.data.msg)
  }
}


const SavePin=async ({pinId})=>{
    try {
      await authFetch.post("/save",{pinId})
      Pins()
      CurrentUserSavedPins()
    } catch (error) {
      // console.log(error.response.data.msg)
    }
  }
  
  const AllSavedPins=async ()=>{
  try {
    let {data}=await authFetch("/save")
    dispatch({type:ALL_SAVED_PINS,payload:{data:data.allSaves}})
  } catch (error) {
    
    // console.log(error.response.data.msg)
  }
}

const CurrentUserSavedPins=async ()=>{
  try {
    let {data}=await authFetch("/save/currentUser")
    dispatch({type:CURRENT_USER_SAVEDPINS,payload:{data:data.saves}})
   } catch (error) {
    //  console.log(error.response.data.msg)
   }
  }


  function delImage(){
    dispatch({type:DELETE_IMAGE})
  }






  

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        setupUser,
        logoutUser,
        uploadImage,
        changeFunction,
        clearuploads,
        changepage,
        submitPin,
        Pins,
        deletePin,
        singlePinDetails,
        createReview,
        singlePinReviews,
        CurrentUserAllPins,
        AllSavedPins,
        CurrentUserSavedPins,
        SavePin,
        deleteSavedPin
    
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

const useAppContext = () => {
  return useContext(AppContext)
}

export { AppProvider, initialState, useAppContext }

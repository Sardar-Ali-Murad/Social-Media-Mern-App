import React from 'react'
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange, deepPurple } from '@mui/material/colors';
import "./index.css"
import DeleteIcon from '@mui/icons-material/Delete';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { useAppContext } from '../context/appContext';
import {Link} from "react-router-dom"
import { tablePaginationUnstyledClasses } from '@mui/base';


const HomePins = ({data}) => {
  let {user,deletePin,homeSearch,CurrentUserAllPins, AllSavedPins, currentUserSavedPins,
    CurrentUserSavedPins, SavePin,Pins}=useAppContext()

  React.useEffect(()=>{
    CurrentUserAllPins()
    AllSavedPins()
    CurrentUserSavedPins()
    Pins()
  },[])

  function del(id){
    deletePin(id)
  }
  return (
    <div className='pin__Main'>

      {data.filter((all)=>all.name.toUpperCase().includes(homeSearch.toUpperCase())).map((all,i)=>{
        return(
            
            <div className='single__Pin' key={i} >
                <Link to={`/pinsDetail/${all._id}`}>
            <img src={all.image} style={{height:"170px"}} />
                </Link>

            <div style={{display:"flex",textAlign:"center"}}>
             {/* {all.creatorName===user.name  && <DeleteIcon onClick={()=>del(all._id)} className="delete"/>  } */}

              <a href={`${all.image}?dl=`}   onClick={(e) => {
                    e.stopPropagation();
                  }} download traget="_blank"><FileDownloadIcon className='download'/></a> 

                <div style={{background:"wheat",height:"32px",padding:"2px",marginTop:"30px"}}  className="save" onClick={()=>SavePin({pinId:all._id})}>{currentUserSavedPins.find((pins)=>pins.pinId===all._id)?<p style={{color:"blue"}}>Saved</p>:<p style={{color:"red"}}>Save</p>}</div>

               <a className='image__Link'   onClick={(e) => {
                    e.stopPropagation();
                  }} href={all.image} target="_blank">{all.image.slice(0,15)}...</a>



            <Link to={`/userPins/${all.createdBy}`}>
               <Avatar style={{marginRight:"20px"}} sx={{ bgcolor: deepOrange[500] }}>{all.creatorName.charAt(0)}</Avatar>
            </Link>



            <p className='p__Sans'>{all.creatorName}</p>
            </div>
        </div>
      )
      })}
      </div>
  )
}

export default HomePins

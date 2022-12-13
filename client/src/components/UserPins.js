import React from 'react'
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange, deepPurple } from '@mui/material/colors';
import "./index.css"
import DeleteIcon from '@mui/icons-material/Delete';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { useAppContext } from '../context/appContext';
import {Link,useParams} from "react-router-dom"
// import { Typography } from '@mui/material';
import Typography from '@mui/material/Typography';

const UserPins = () => {
    let {allPins, Pins,user,deletePin, SavePin,homeSearch,CurrentUserAllPins, AllSavedPins, currentUserSavedPins,
      CurrentUserSavedPins, }=useAppContext()
  

    React.useEffect(()=>{
       Pins()
       CurrentUserAllPins()
    },[])
    
 

    function del(id){
        deletePin(id)
      }

    let {userId}=useParams()


   let userAllPins=allPins.filter((all)=>all.createdBy===userId)

  //  console.log(userAllPins)
  let onePin=userAllPins.find((all)=>all.createdBy===userId)
  // console.log(onePin)

  let url="https://source.unsplash.com/random/?nature"

  return (
    <div className=''>
      <img src={url} style={{height:"40vh",width:"100%"}}/>
    
           { onePin &&   <Avatar style={{marginLeft:"50%",position:"absolute",top:"37vh"}} sx={{ bgcolor: deepOrange[500] }}>{onePin.creatorName.charAt(0)}</Avatar>  }


      <div className='pin__Main section__padding'>
        {userAllPins.length<1 && <Typography variant='h3'>This User Have NO Pin To Show!!</Typography>}

        {

        userAllPins?.map((all)=>{
          
        return(
            
            <div className='single__Pin user__Pins' >
                <Link to={`/pinsDetail/${all._id}`}>
            <img src={all.image} style={{height:"170px"}} />
                </Link>

            <div style={{display:"flex",textAlign:"center"}}>
             {/* {all.creatorName===user.name  && <DeleteIcon onClick={()=>del(all._id)} className="delete"/>  } */}

              <a href={`${all.image}?dl=`}   onClick={(e) => {
                    e.stopPropagation();
                  }} download traget="_blank"><FileDownloadIcon className='download'/></a> 

                {/* <p style={{background:"white",color:"red",padding:"5px"}}  className=" user__Save" onClick={()=>SavePin({pinId:all._id})}>Save</p> */}

                <p style={{background:"wheat",height:"32px",padding:"2px",marginTop:"30px"}}    className=" user__Save" onClick={()=>SavePin({pinId:all._id})}>{currentUserSavedPins.find((pins)=>pins.pinId===all._id)?<p style={{color:"blue"}}>Saved</p>:<p style={{color:"red"}}>Save</p>}</p>

               <a className='user__Image'   onClick={(e) => {
                 e.stopPropagation();
                  }} href={all.image} target="_blank">{all.image.slice(0,15)}...</a>


{/* 
            <Link to={`/userPins/${all.createdBy}`}>
               <Avatar style={{marginRight:"20px"}} sx={{ bgcolor: deepOrange[500] }}>{all.creatorName.charAt(0)}</Avatar>
            </Link>



            <p className='p__Sans'>{all.creatorName}</p> */}
            </div>
        </div>
      )
      })}
      </div>
    </div>
  )
}

export default UserPins
